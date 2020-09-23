<template>
  <video class="videoItem" :src="src" autoplay loop controls></video>
</template>

<style>
.videoItem {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  height: 100%;
  width: 100%;
}
</style>

<script>
export default {
  props: ['src', 'autoPlay', 'loop', 'controls'],
  data() {
    return {
      // isActive: false,
    }
  },
  computed: {
    //
  },
  methods: {
    // toggleActive: function () {
    //   this.isActive = !this.isActive
    // },
  },
}
</script>
