<template>
  <embed class="pdfItem" :src="src" type="application/pdf" width="100%" height="100%" />
</template>

<style>
.pdfItem {
  /* object-fit: contain; */
  height: 500px;
  width: 100%;
}
</style>

<script>
export default {
  props: ['src'],
  data() {
    return {
      // isActive: false,
    }
  },
  computed: {
    //
  },
  methods: {},
}
</script>
