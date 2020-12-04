<template>
  <div
    class="renderItem"
    :class="`${contentType(fileType)} ${mode}`"
    v-if="item && item.fileIpfsUrl"
  >
      <img
        @load="onLoad"
        @error="imageLoadError"
        :src="hasImageOptimization ? `${imageOptimizationUrl}${item.fileIpfsUrl}/?${optimization ? optimization : 'width=300'}` : item.fileIpfsUrl"
        v-if="contentType(fileType) === 'image'"
        id="result"
        :class="`tokenImage ${isLoading ? 'isLoading' : ''} ${notFound ? 'notFoundImage' : ''} ${hasImageOptimization ? 'optimized' : 'fullresolution'}`"
        width="800"
        height="800"
      />
    
    <client-only>
      <ModelViewer
        v-if="contentType(fileType) === 'threed'"
        :src="item.fileIpfsUrl"
        :mode="mode"
        :data="data"
      />
    </client-only>
    <client-only>
      <VoxelViewer
        v-if="contentType(fileType) === 'voxel'"
        :src="item.fileIpfsUrl"
        :mode="mode"
        :data="data"
        model="~/assets/models/chicken.vox"
      />
    </client-only>

    <Video v-if="contentType(fileType) === 'video'" :src="item.fileIpfsUrl" />
    <RenderPdf v-if="contentType(fileType) === 'pdf'" :src="item.fileIpfsUrl" />
    <RenderAudio
      v-if="contentType(fileType) === 'audio'"
      :src="item.fileIpfsUrl"
      :title="item.title"
      :imageSrc="item.thumbnailUrl"
      :thumbnailSrc="item.thumbnailUrl"
      :thumbnailHash="item.thumbnailHash"
    />
    <RenderText
      v-if="contentType(fileType) === 'text'"
      :src="item.fileIpfsUrl"
    />
  </div>
</template>

<style lang="scss">
.renderItem {
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
.renderItem.image #result {
  // width: unset;
  // height: 100%;
  object-fit: contain;
  max-height: 80vh;
  max-width: 100%;
  &.optimized{
    
  }
  &.fullresolution{
    max-height: unset;
  }
}
.renderItem .tokenImage{
  background: rgba(0,0,0,.1);
  /* background: var(--shadow-color, rgba(0,0,0,.05)); */
  // &.isLoading, &.notFound{
  // &:before{
  //   content: "Loading...";
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   right: 0;
  //   bottom: 0;
  // }
  // }
  
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


</style>

<script>
export default {
  props: ['item', 'fileType', 'mode', "data", "hasImageOptimization", "imageOptimizationUrl", "optimization"],
  data() {
    return {
      isActive: false,
      notFound: false,
      isLoading: true,
    }
  },
  computed: {},
  methods: {
    contentType: (fileType) => {
      switch (fileType) {
        case 'glb':
        case 'obj':
        case 'usdz':
        case 'gltf':
          return 'threed'
        break
        case 'vox':
          return 'voxel'
          break
        case 'mp4':
        case 'mov':
          return 'video'
          break
        case 'mp3':
          return 'audio'
          break
        case 'pdf':
          return 'pdf'
          break
        case 'rtf':
        case 'txt':
          return 'text'
          break
        default:
          return 'image'
      }
    },
    onLoad(event){
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
    }
  },
}
</script>

<!-- <div v-if="notFound" class="notFoundImage">
      not found
    </div> -->