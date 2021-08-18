<template>
  <div class="pageContainer">
    <Header />

    <!-- HERO Container -->
    <section id="intro" class="row  ma-0">
      
      <div class=" col col6 alternate">
        <div class style="max-width: 700px;">
           
          <h1>
            SVG Token
            <span class="betaFlag">beta</span>
          </h1>
          <h3>On-Chain art generation</h3>
          <!-- <ul class="heroList">
            <li>
              <IconLogo size="small" :fillClass="contrastMode" />On-Chain Metadata
            </li>
            <li>
              <IconLogo size="small" :fillClass="contrastMode" />On-Chain Image Storage
            </li>
            <li>
              <IconLogo size="small" :fillClass="contrastMode" />3D, Audio, and other file types
            </li>
            <li class="soon">
              <IconLogo size="small" :fillClass="contrastMode" />Multiple Images
            </li>
            <li class="soon">
              <IconLogo size="small" :fillClass="contrastMode" />Custom Meta
            </li>
          </ul> -->
          <div class="ctaWrap">
            <nuxt-link to="/mint" class="btn hero">Get Started »</nuxt-link>
            <a href="#about" class="btn hollow asButton">What is this?</a>
          </div>
          
          <br />
          <nuxt-link to="/flow" class="btn hero asButton" v-if="hasChainSelect">Flow Test »</nuxt-link>
        </div>
      </div>
      <div class="col col-6">
        <HeroImages />
      </div>
    </section>


    <!-- About Container -->
    <section id="about" class="ow">
      <div class="tertiary col col-6">
        <h2>About</h2>
        <div class="aside">
          <p>
            {{siteName}} is a token minting platform that allows users to create NFTs
            with fully on-chain metadata. Files are stored on Arweave and IPFS.
          </p>
        </div>
      </div>
      <div class="col col6 alternate">
        <div class style="max-width: 700px;">
          <h3>NFT Freedom</h3>
          <p>
            SVGToken is a generator for creating NFT with onchain SVG art.
          </p>
          
          
        </div>
      </div>
      
    </section>

    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const BASE_URL = process.env.tempUrl || "https://infinft.app"
import ogImagePreview from '~/assets/images/preview.jpg'

 
export default {
  name: 'ViewPageParams',
  data() {
    return {
      baseUrl: "https://localhost:3333",
      previewUrl: `images/preview.jpg`,
      siteName: "SVG Tokens"
    }
  },
  created(){
    // this.baseUrl = this.$config.rootUrl
    
  },
  head: {
    title: 'SVG Tokens',
    meta: [
      { hid: 'description', name: 'description', content: 'A NFT platform with a focus on extendability, flexibility, and on-chain data.' },
      { hid: "og:title", name: "og:title", content: "SVG Tokens" },
      { hid: "og:site_name", name: "og:site_name", content: "SVG Tokens" },
      { hid: "og:type", name: "og:type", content: "website" },
      {
          hid: "og:image",
          property: "og:image",
          content: BASE_URL + ogImagePreview
        },
        
    ],
  },
  computed: {
    ...mapGetters({
      contrastMode: 'ui/contrastMode',
      hasChainSelect: 'ui/hasChainSelect',
      hasVerticalGridLines: 'ui/hasVerticalGridLines'
    }),
  },
}
</script>

<style lang="scss">
#intro{
  min-height: 90vh;;
}
.row{
  // display: flex;
  // flex-direction: row;
  // align-items: stretch;
  // justify-content: flex-start;
  // width: 100%;
  
  }

</style>
