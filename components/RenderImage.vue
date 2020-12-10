<template>
  <div class="renderImage">
    <div class="imageLoadingWrap" v-if="resolution === 'full' && this.imageProgress && this.imageProgress < 100">
      <Loading :message="`Loading...`" :fillClass="contrastMode" />
      <ProgressBar
      :percentage="this.imageProgress"
      
      :showNumber="true"
      :totalSize="this.totalSize"
      />
    </div>
    <!-- <div class="imageItem" id="imageElement">
      
    </div> -->
    <!-- :src="hasImageOptimization ? `${imageOptimizationUrl}${item.fileIpfsUrl}/?${optimization ? optimization : 'width=300'}` : item.fileIpfsUrl" -->
    <div v-if="devMode">
    <br /><br />
      <div class="xsmall">optimisedSrc: {{thumbnailSrc}}</div>
      <div class="small">loading status: {{this.loadingStatusThumbnail}}</div>
      <div class="small">resolution: {{resolution}}</div>
    </div>
    <img
        id="thumbnailImageElement"
        v-if="resolution === 'thumbnail'"
        :src="thumbnailSrc"
        :class="`imageItem tokenImageThumbnail thumbnail`"
        width="200"
        height="200"
        @load="onLoad('thumbnail')"
        @error="imageLoadError('thumbnail')"
      />
    <div v-if="devMode">
      <br /><br />
    <div class="xsmall">optimisedSrc: {{optimisedSrc}}</div>
    <div class="small">loading status: {{this.loadingStatusOptimized}}</div>
    <div class="small">resolution: {{resolution}}</div>
    </div>
    <transition name="fade" appear>
    <img
        id="lowResImageElement"
        v-if="resolution === 'preview'"
        :src="optimisedSrc"
        :class="`imageItem tokenImage optimized`"
        width="600"
        height="600"
        @load="onLoad('optimized')"
        @error="imageLoadError('optimized')"
      />
    </transition>
      <div v-if="devMode">
      <br /><br />
    <div class="small">full src: {{src}}</div>
    <div class="small">loading status: {{this.loadingStatus}}</div>
    <div class="small">resolution: {{resolution}}</div>
      </div>
      <transition name="fade" appear>
    <img
        v-if="resolution === 'full' && loadedSrc"
        :src="loadedSrc"
        @load="onLoad('full')"
        @error="imageLoadError('full')"
        id="imageElement"
        :class="`imageItem tokenImage ${notFound ? 'notFoundImage' : ''} fullresolution`"
        width="800"
        height="800"
      />
      </transition>
    

    <!-- <progress id="progress" value="0" max="100" style="width: 100%;"></progress> -->

   
    <div class="devImageContent2" v-if="devMode">
     
      <Button @click="setLoadingStatus('created')" >set Created</Button>
      <Button @click="setLoadingStatus('mounted')" >set mounted</Button>
      <Button @click="setLoadingStatus('loaded')" >set loaded</Button>
      <Button @click="setRandomProgress()" >set random</Button>
      <Button @click="setImageUrl()" >generate url</Button>
      <br/>
      imageurl: {{this.imageUrl}}
      <br/>
      image progress: {{this.imageProgress}}
      
      </div>
  </div>
</template>
<style lang="scss">
.renderImage{
  width: 100%;
  height: 100%;
  .imageLoadingWrap{
    flex-direction: column;
  }
}

.devImageContent2{
  position: relative;
}

</style>

<script>
import { loadImage, humanFileSize } from '../utils/misc'
import { mapGetters } from 'vuex'
export default {
  props: ['src', 'optimisedSrc', 'thumbnailSrc', 'hasImageOptimization', "resolution"],
  
  data: () => ({ 
    text: 'sdfsdf',
    loadedSrc: null,
    totalSize: null,
    loadingStatus: '',
    loadingStatusOptimized: '',
    loadingStatusThumbnail: '',
    imageUrl: 'https://placekitten.com/g/2000/2000',
    imageProgress: '0',
    notFound: false,
    notFoundOptimized: '',
    notFoundThumbnail: '',
    
    }),
  created() {
    this.loadingStatus = 'created'
    this.loadingStatusOptimized = 'created'
  },
  mounted() {
    this.loadingStatus = 'mounted'
    this.loadingStatusOptimized = 'mounted'
    this.initImage();
  },
  computed: {
    ...mapGetters({
      devMode: "ui/devMode",
      contrastMode: "ui/contrastMode",
    })
  },
  methods: {
    initImage(){
      // var imgContainer = document.getElementById('imageElement');
      // var progressBar = document.getElementById('progress');
      var imageUrl = this.src || this.optimisedSrc || this.imageUrl;
      
      // console.log('Init image loadImage:', loadImage)
      loadImage(imageUrl, this.handleProgress)
      .then(imgSrc => {
        // Loading successfuly complete; set the image and probably do other stuff.
        console.log('loading complete', imgSrc)
        // imgContainer.src = imgSrc;
        this.loadedSrc = imgSrc
      }, xhr => {
        // An error occured. We have the XHR object to see what happened.
        console.error('xhr: ', xhr);
      });
    },
    handleProgress(payload){
      
      var progressBar = document.getElementById('progress');
      const {
        mode = "file",
        type = "ipfs",
        ProgressEvent,
        progressObj,
      } = payload;

      if (!progressObj) {
        return;
      }
      const percentLoaded =
        progressObj.percent || (ProgressEvent.loaded / ProgressEvent.total) * 100;
        console.log('precentLoaded', percentLoaded);
      const tempFileSize = progressObj.total && humanFileSize(progressObj.total)
      
      console.log('tempFileSize', tempFileSize)
      // const isNumber =  !isNaN(parseFloat(tempFileSize)) && isFinite(tempFileSize);
      // console.log('is number: ', isNumber)
      if (type === "image" && mode === "image") {
          this.imageProgress = percentLoaded;
          if(tempFileSize){
            console.log('is number so tempFileSize: ', tempFileSize);
            this.totalSize = tempFileSize;
          }
        } 
    },
    // handleProgress2(ratio){
    //   var progressBar = document.getElementById('progress');
    //   console.log('handle progress ratio: ', ratio);
    //     if (ratio == -1) {
    //       // Ratio not computable. Let's make this bar an undefined one.
    //       // Remember that since ratio isn't computable, calling this function
    //       // makes no further sense, so it won't be called again.
    //       progressBar.removeAttribute('value');
    //     } else {
    //       // We have progress ratio; update the bar.
    //       progressBar.value = ratio;
    //     }
    // },
    setLoadingStatus(value){
      this.loadingStatus = value;
    },
    setRandomProgress(){
      const number = this.getRandomInt(1, 99)
      this.imageProgress = number;
    },
    setImageUrl(value){
      console.log('setimageurl', value);
      const minNumber = 3800;
      const maxNumber = 4200;
      const width = this.getRandomInt(minNumber, maxNumber);
      const height = this.getRandomInt(minNumber, maxNumber);
      if(!value){
        const tempUrl = `https://placekitten.com/g/${width}/${height}`;
        console.log('tempUrl', tempUrl)
        this.imageUrl = tempUrl;
      } else {
        this.imageUrl = value;
      }
      this.initImage();
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    onLoad(mode){
      console.log('iamge loaded  mode:', mode)
      if(mode === 'full'){
        this.loadingStatus = "loaded";
      } else if (mode ==='optimized'){
        this.loadingStatusOptimized = "loaded";
      } else if (mode ==='thumbnail'){
        this.loadingStatusThumbnail = "loaded";
      } else {
        console.log('something went wrong loading iamge', mode)
      }
    },
    imageLoadError(event, mode){
      console.log('imageLoadError', event, mode);
      if(mode === 'full'){
        this.notFound = true;
        this.loadingStatus = "error";
      } else if (mode ==='optimized'){
        this.notFoundOptimized = true;
        this.loadingStatusOptimized = "error";
      } else if (mode ==='thumbnail'){
        this.notFoundThumbnail = true;
        this.loadingStatusThumbnail = "error";
      }
    },
    


  },
}
</script>
