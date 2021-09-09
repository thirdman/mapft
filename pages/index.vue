<template>
  <div class="pageContainer">
    <Header />

    <!-- HERO Container -->
    <section id="intro" class="row ma-0 ">
      <div class=" col col-3 alternate">
        
           
          <!-- <h1>
            Chain Tokens
          </h1> -->
            <!-- <span class="betaFlag">beta</span> -->
          <h3>Generative vector art, stored directly on-chain</h3>
          <p class="text-body-2">Exploring the boundaries of on-chain art.</p>
          
          <div class="ctaWrap">
            <nuxt-link to="/svg" class="btn hero">Get Started »</nuxt-link>
            <a href="#about" class="btn hollow asButton">What is this?</a>
          </div>
        
      </div>
      <div class="col col-9 ">
        <client-only>
          <Loading text="Loading" v-if="imagesStatus === 'loading'" />
          <div class=" introGalleryColumn">
            <div class="galleryGrid grid panel "  v-if="binData && binData.images">
              <div v-for="(image, index) in binData.images" :key="index" class="galleryItem gridItem">
                <div class="preview-position" :class="showFull && index === fullIndex ? 'full' : '' " v-html="image.src"></div>
                <label>BY {{image.creator}}</label>
                <v-btn x-small depressed @click="handleFull(index)" v-if="!showFull"><v-icon small>mdi-arrow-expand-all</v-icon></v-btn>
                <v-btn x-small depressed @click="handleClose(index)" class="closeBtn" v-if="showFull && index === fullIndex"><v-icon small>mdi-arrow-collapse</v-icon></v-btn>
                <v-btn x-small depressed @click="handleRemoveItem(index)" class="" v-if="walletAddress === devAddress"><v-icon small>mdi-close</v-icon></v-btn>
                
              </div>
            </div>
          </div>
          <v-btn x-small depressed @click="saveImages" class="" v-if="walletAddress === devAddress">Update gallery</v-btn>
        </client-only>
      </div>
    </section>


    <!-- About Container -->
    <section id="about" class="ow">
      <div class="tertiary col col-6">
        <h2>About</h2>
        <div class="aside">
          <p>
            {{siteName}} provides an interface for creating and storing vector art on chain.
          </p>
        </div>
      </div>
      <div class="col col6 alternate">
        <div class style="max-width: 700px;">
          <h3>NFT Art Forever</h3>
          <p>
            This app provides two things:
          </p>
          <p>
            1. An interface for minting SVG art directly to the ethereum chain as a NFT.
          </p>
          <p>
            2. A generator for creating vector art.
          </p>
          <v-divider />
          <h3>Art Generation</h3>
          <ul>
            <li>
              Rule based generation
            </li>
            <li>
              Gradients
            </li>
            <li>
              Animation
            </li>
            <li>
              Grid
            </li>
            <li>
              Repetition
            </li>
          </ul>
          <v-divider />
          <h3>NFT MINTING</h3>
          <p>
            Users are free to paste their own SVG code and mint. 
          </p>
          
          
        </div>
      </div>
      
    </section>

    <Footer />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
const BASE_URL = process.env.tempUrl || "https://infinft.app"
import ogImagePreview from '~/assets/images/preview.jpg'

 
export default {
  name: 'ViewPageParams',
  data() {
    return {
      baseUrl: "https://localhost:3333",
      previewUrl: `images/preview.jpg`,
      siteName: "SVG Tokens",
      images: null,
      imagesStatus: 'loading',
      fullIndex: null,
      showFull: false,
      devAddress: '0xd1c248d1c9879dc3b5a846d4dccc5b7aa8fbf432'
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
  mounted(){
    const params = this.$route.params;
    if(this.binData && this.binData.images){
      console.log('this.bindata', this.binData.images)
      this.images = this.binData.images;
    }
    const id = '1234'
    this.loadImages(id)
  },
  computed: {
    ...mapGetters({
      contrastMode: 'ui/contrastMode',
      hasChainSelect: 'ui/hasChainSelect',
      hasVerticalGridLines: 'ui/hasVerticalGridLines',
      binData: "ui/binData",
      binStatus: "ui/binStatus",
      walletAddress: "ui/walletAddress",
    }),
  },
  methods: {
    ...mapMutations({
      setBinData: "ui/setBinData",
    }),
    ...mapActions({
      getImages: "ui/getImages",
      saveImages: "ui/saveImages",
      updateConfig: "ui/updateConfig"
    }),
     async loadImages(id){
      console.log('loadimages this', this.binData)
      if(!this.binData){
        const newImages = await this.getImages();
        // console.log('after await, this.binData', newImages)
        // this.images = newImages.images.reverse();
        this.imagesStatus = 'completed'
      } else {
        const theImages = await this.getImages();
        console.log('theImages', theImages)
        // this.images = theImages.images.reverse();
        this.imagesStatus = 'completed'
      }
      if(!id){
        this.imagesStatus = null
        return
        }
    },
    handleFull(index){
      console.log('index', index)
      this.showFull = true;
      this.fullIndex = index;
    },
    handleClose(){
      console.log('close')
      this.showFull = false,
      this.fullIndex = null
    },
    handleRemoveItem(index){
      console.log('remove', index, this.binData, this)
      const currentData = this.binData;
      console.log('currentData', currentData)
      if(!currentData){ return}
      const tempArray = currentData.images.slice();
      const newArray = tempArray.filter((img, i) => i !== index);
      const newData = {...currentData, images: newArray}
      this.setBinData(newData)
      this.images = newArray
      this.showFull = false,
      this.fullIndex = null
      console.log('this.binData', this.binData)
      // const tempArray = this.images.slice()
      // console.log('newArray', newArray)
    },
    handleUpdateGallery(){
      // cosnt 
      // this.binData images - 
      console.log('do it')
    }
  }
}
</script>

<style lang="scss">
#intro{
  min-height: 90vh;;
}
.introGalleryColumn{
  overflow: visible;
  .preview-position{
    &.full{
      position: fixed;
      background: blue;
      z-index: 999999;
      lefT: 0;
      top: 0;
      right: 0;
      bottom: 0;
      svg{
        width: 100%;
        height: 100%;
      }
      // width: 100%;
      // height: 100%;
    }
  }
  .closeBtn{
    position: fixed;
    z-index: 999999099999;
    left: 0;
    top: 1rem;
    background: black;
    background-color: black;
    width: 2rem;
    height: 2rem !important;
    border-radisu: 0 4px 4px 0;
  }
}

</style>
