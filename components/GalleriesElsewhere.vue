<template>
  <div class="galleriesElsewhere">
    <!-- <label>Cryptovoxels</label> -->
    <div class>
      <a
        href="https://www.cryptovoxels.com/play?coords=W@125E,303N"
        target="_blank"
        class="outLink"
        >InfiNFT in Cryptovoxels</a
      >
    </div>

    <div>
      <a
        :href="'https://opensea.io/assets/' + galleryContractId"
        target="_blank"
        class="outLink"
        ><IconOpensea size="small" :strokeClass="contrastMode" :fillClass="contrastMode" /> InfiNFT Alpha on Opensea</a
      >
    </div>
    <label>ALPHA SERIES</label>
    <div>
      <nuxt-link to="/alpha" class="active">Alpha InfiNFT Series</nuxt-link>
    </div>
  </div>
</template>

<style>
.galleriesElsewhere {
}
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['galleryContractId'],
  computed: {
  ...mapGetters({
      contrastMode: 'ui/contrastMode',
    })
  }
}
</script>
