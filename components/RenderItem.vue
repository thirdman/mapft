<template>
  <div
    class="renderItem"
    :class="`${contentType(fileType)} ${mode}`"
    v-if="item && item.fileIpfsUrl"
  >
  
    <img
      :src="item.fileIpfsUrl"
      v-if="contentType(fileType) === 'image'"
      id="result"
    />
    <client-only>
      <ModelViewer
        v-if="contentType(fileType) === 'threed'"
        :src="item.fileIpfsUrl"
        :mode="mode"
        :data="data"
      />
    </client-only>

    <Video v-if="fileType === 'mp4'" :src="item.fileIpfsUrl" />
    <RenderPdf v-if="contentType(fileType) === 'pdf'" :src="item.fileIpfsUrl" />
    <RenderAudio
      v-if="contentType(fileType) === 'audio'"
      :src="item.fileIpfsUrl"
      :title="item.title"
      :imageSrc="item.thumbnailUrl"
      :thumbnailHash="item.thumbnailHash"
    />
    <RenderText
      v-if="contentType(fileType) === 'text'"
      :src="item.fileIpfsUrl"
    />
  </div>
</template>

<style>
.renderItem {
  /* max-width: 100%;
  max-height: 80vh; */
}
.renderItem.default {
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
  width: unset;
  height: 100%;
  max-height: 80vh;
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
.renderItem .userInput {
  /* outline: 1px solid pink; */
}
.userInput:focus {
  /* outline: 1px auto pink; */
}
</style>

<script>
export default {
  props: ['item', 'fileType', 'mode', "data"],
  data() {
    return {
      isActive: false,
    }
  },
  computed: {},
  methods: {
    contentType: (fileType) => {
      switch (fileType) {
        case 'glb':
        case 'obj':
        case 'gltf':
          return 'threed'
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
  },
}
</script>
