<template>
  <div class="galleriesElsewhere">
    
      <a
        href="https://www.cryptovoxels.com/play?coords=W@125E,303N"
        target="_blank"
        class="outLink"
        ><img src="~/assets/images/cvlogo.png" alt="cryptovoxelslogo" class="imgLogo"/>Cryptovoxels</a
      >
    
      <a
        :href="'https://opensea.io/assets/' + galleryContractId"
        target="_blank"
        class="outLink"
        ><IconOpensea size="medium" :strokeClass="contrastMode" :fillClass="contrastMode" />Opensea</a
      >
    
      <a
        href="https://twitter.com/nft4ever"
        target="_blank"
        class="outLink"
        ><IconTwitter :strokeClass="contrastMode" />Twitter</a
      >
    
      <a
        href="https://discord.gg/WPpD2X5"
        target="_blank"
        class="outLink"
        ><IconDiscord size="small" :fillClass="contrastMode" />Discord</a
      >
    
    
    <!-- <label>ALPHA SERIES</label>
    <div>
      <nuxt-link to="/alpha" class="active">Alpha InfiNFT Series</nuxt-link>
    </div> -->
  </div>
</template>

<style lang="scss">
.galleriesElsewhere {
  display: flex;
  flex-direction: column;
  a.outLink{
    line-height: 1.5;
     text-decoration: none;
     border-bottom: 0px solid white !important;
     margin-bottom: .5rem;
     padding: 2px;
     color: var(--text-color, #111);
     &:hover{
       background: var(--fill-color);
     }
  }
  .outLink:before{
    display: none;
   
  }
  .outLink svg, .outLink img{
    margin-right: .5rem;
    display: inline-block;
    vertical-align: middle;
  }
  .imgLogo{
    width: 1rem;
    height: 1rem;
    display: inline-block;
    border-radius: 1rem;
  }
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
