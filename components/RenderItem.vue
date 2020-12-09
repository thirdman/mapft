<template>
  <div
    class="renderItem"
    :class="`${getContentType(fileType)} ${mode}`"
    v-if="item && item.fileIpfsUrl"
  >
      <img
        @load="onLoad"
        @error="imageLoadError"
        :src="hasImageOptimization ? `${imageOptimizationUrl}${item.fileIpfsUrl}/?${optimization ? optimization : 'width=300'}` : item.fileIpfsUrl"
        v-if="!hideWorkingImage && getContentType(fileType) === 'image'"
        id="result"
        :class="`tokenImage ${isLoading ? 'isLoading' : ''} ${notFound ? 'notFoundImage' : ''} ${hasImageOptimization ? 'optimized' : 'fullresolution'} `"
        width="800"
        height="800"
      />
      
    
    <client-only>
      <ModelViewer
        v-if="getContentType(fileType) === 'threed'"
        :src="item.fileIpfsUrl"
        :mode="mode"
        :data="data"
      />
    </client-only>
    <client-only>
      <VoxelViewer
        v-if="getContentType(fileType) === 'voxel'"
        :src="item.fileIpfsUrl"
        :mode="mode"
        :data="data"
        model="~/assets/models/chicken.vox"
      />
    </client-only>
    <RenderImage
      v-if="getContentType(fileType) === 'image'"
      :src="item.fileIpfsUrl"
      :optimisedSrc="`${imageOptimizationUrl}${item.fileIpfsUrl}/?${optimization ? optimization : 'width=300'}`"
      :thumbnailSrc="`${imageOptimizationUrl}${item.fileIpfsUrl}/?width=200`"
      :hasImageOptimization="hasImageOptimization"
      :resolution="resolution"
    />
    <Video v-if="getContentType(fileType) === 'video'" :src="item.fileIpfsUrl" :controls="true" :autoPlay="true" />
    <RenderPdf v-if="getContentType(fileType) === 'pdf'" :src="item.fileIpfsUrl" />
    <RenderAudio
      v-if="getContentType(fileType) === 'audio'"
      :src="item.fileIpfsUrl"
      :title="item.title"
      :imageSrc="item.thumbnailUrl"
      :thumbnailSrc="item.thumbnailUrl"
      :thumbnailHash="item.thumbnailHash"
    />
    <RenderText
      v-if="getContentType(fileType) === 'text'"
      :src="item.fileIpfsUrl"
    />
  </div>
</template>

<style lang="scss">
.renderItem {
  flex-direction: column;
  &.default{

  }
  
}

.renderItem.preview, .renderItem.preview.threed {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
  max-width: 300px;
  max-height: 400px;
  z-index: 999;
}
.renderItem.preview .modelWrapper{
  width: 100%;
  height: 100%; 
}
.renderItem.preview .modelWrapper .loadingContainer{
  position: relative;
  left: auto;
  right: auto;
  width: unset;
  width: 80%;
  margin-left: auto;
  margin-right: auto;

} 
.renderItem.image {
  display: flex;
  justify-content: center;
}
// .renderItem.image #result {
//   // width: unset;
//   // height: 100%;
//   object-fit: contain;
//   max-height: 80vh;
//   max-width: 100%;
//   &.optimized{
    
//   }
//   &.full{
//     max-height: unset;
//   }  
//   &.fullresolution{
//     max-height: unset;
//   }
// }
.renderItem img.tokenImage{
  object-fit: contain;
  max-height: 80vh;
  max-width: 100%;
  &.optimized{
    
  }
  &.full{
    max-height: unset;
  }  
  &.fullresolution{
    max-height: unset;
  }
  
}
.imageLoadingWrap{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  
}
.renderItem .notFoundImage{
  background: rgba(0,0,0,.1);
  font-size: .75rem;
}
.renderItem.threed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  max-width: unset;
  max-height: unset;
  z-index: -1;
}

.devImageContent{
  position: absolute;
  bottom: 2rem;
  border: 1px dashed orange;
}
</style>

<script>
import { contentSwitch } from '../utils/misc'
export default {
  props: ['item', 'fileType', 'mode', "resolution", "data", "hasImageOptimization", "imageOptimizationUrl", "optimization"],
  data() {
    return {
      hideWorkingImage: true,
      isActive: false,
      notFound: false,
      isLoading: true,
    }
  },
 
  computed: {

  },
  methods: {
    getContentType(fileType){
      const type = contentSwitch(fileType);
      return type
    },
    onLoad(event){
      // this.loadingStatus = 'loaded';
      // console.log('loaded:', event)
      const imgEl = event.target;
      // console.log('loaded: imgEl', imgEl)
      // console.log('loaded: imgEl', imgEl.naturalHeight)
      // console.log('loaded: imgEl', imgEl.naturalWidth)
      imgEl.width = imgEl.naturalWidth
      imgEl.width = imgEl.naturalHeight
        // alert(this.width + 'x' + this.height);
        this.isLoading = false;
    },
    imageLoadError(event){
      console.log('imageLoadError', event);
      this.notFound = true;
      this.isLoading = false;
    },
    
    
  },
}
</script>

<!-- <div v-if="notFound" class="notFoundImage">
      not found
    </div> -->