<template>
  <video class="videoItem" :src="src" :autoplay="autoPlay ? true : false"  loop :controls="controls ? true : false" :poster="poster"></video>
</template>

<style>
.videoItem {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  /* height: 100%; */
  width: 100%;
}
</style>

<script>
export default {
  props: ['src', 'autoPlay', 'loop', 'controls', "poster"],
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
