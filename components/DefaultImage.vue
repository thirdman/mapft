<template>
  <div class="defaultImage" :class="contentType(fileType)">
    <!-- <img :src="item.fileIpfsUrl" /> -->
    <span>{{ contentType(fileType) }}</span>
  </div>
</template>

<style>
.defaultImage {
  width: 6rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--fill-color, rgba(255, 255, 255, 0.1));
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
        default:
          return 'image'
      }
    },
  },
}
</script>
