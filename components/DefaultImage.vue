<template>
  <div class="defaultImage" :class="contentType(fileType)">
    <span v-if="contentType(fileType) !== 'image'">{{ contentType(fileType) }}</span>
     <img
          class="defaultImageImg"
          style="width: auto; height: 4rem;"
          src="~/assets/images/defaultImageTransparent.png"
          alt="logo"
          v-if="contentType(fileType) === 'image'"
        />
  </div>
</template>

<style lang="scss">
.defaultImage {
  width: 6rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--fill-color, rgba(255, 255, 255, 0.1));
  &.image{
    width: 100%;
    height: 100%;
  }
}
.defaultImage .defaultImageImg{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.defaultImage span {
  font-size: 0.75rem;
  opacity: 0.8;
}
</style>

<script>
export default {
  props: ['item', 'fileType'],
  data() {
    return {
      // isActive: false,
    }
  },
  computed: {
    // nothing to see here
  },
  methods: {
    contentType: (fileType) => {
      switch (fileType) {
        case "glb":
        case "obj":
        case "usdz":
        case "gltf":
          return "threed";
          break;
        case "vox":
          return "voxel";
          break;
        case "mp4":
        case "mov":
          return "video";
          break;
        case "mp3":
          return "audio";
          break;
        case "pdf":
          return "pdf";
          break;
        case "rtf":
        case "txt":
          return "text";
          break;
        default:
          return "image";
      }
    },
  },
}
</script>
