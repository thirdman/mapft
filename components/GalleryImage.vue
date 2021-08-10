<template>
  <div class="galleryImageWrapInner" :class="this.previewImage ? 'moviePreview' : ''">
    <transition name="fade" appear>
    <Video :src="src" :autoplay="false" :controls="false" v-if="this.isVideo" :poster="poster" />
    <img
      :src="src"
      @error="imageLoadError()"
      @load="imageLoad()"
      class="galleryItemImage"
      v-if="!notFound && !this.isVideo"
    />
    </transition>
    <transition name="fade" appear>
    <DefaultImage v-if="notFound"/>
    </transition>
  </div>
</template>

<style lang="scss">
.galleryImageWrapInner {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%; 
  flex-basis: 80%;
  flex-shrink: 0;
  flex-grow: 1;
  overflow: hidden;
  &.moviePreview{
    background: transparent;
  }
}
.fade-enter-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter {
  opacity: 0;
}
</style>

<script>
// import { mapMutations, mapGetters, mapActions } from 'vuex'
import movieImage from "~/assets/images/defaultImageMovie.png"
const BASE_URL = process.env.tempUrl || "https://infinft.app"
export default {
  props: ['src', 'thumbnail', 'poster'],
  data() {
    return {
      // nothing to see here
      notFound: false,
      isLoaded: false,
      defaultMovieImageString: '/_nuxt/assets/images/defaultImageMovie.png',
      previewImage: '',
      isVideo: false,
    }
  },
  created(){
    // console.log('gallery image created: ', this.src)
    const tempSrc = this.src;
    if(tempSrc){
      this.initFileType(tempSrc);
    }
  },
  mounted(){
    // console.log('gallery image created: ', this.src)
  },
  computed: {
   
  },

  methods: {
    
    imageLoadError (index) {
      // console.group('error')
      // console.log(`GalleryImage failed to load, ${index}`);
      // console.log('this.thumbnail', this.thumbnail)
      // console.log('this.src', this.src)
      // console.log('image load error')
      this.notFound = true
      this.isLoaded = false
    },
    imageLoad () {
      // console.log('load')
      this.notFound = false
      this.isLoaded = true
    },
    initFileType(src){
      const movieTypes = ['mp4', 'mov', 'mpg', 'mpeg', 'avi', 'mpv', 'm4v']
      const fileType = src.split('.').pop();
      const fileTypeLower = fileType && fileType.toLowerCase();
      const previewImageUrl = '/_nuxt/assets/images/defaultImageMovie.png';
      // console.log('previewImageUrl', previewImageUrl);
      if(movieTypes.includes(fileTypeLower)){
        this.previewImage = previewImageUrl
        this.isVideo = previewImageUrl
      } else {
        // console.log('nope')
      }
      

    }
    
  },
}
</script>
