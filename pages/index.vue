<template>
  <div class="pageContainer">
    <Header />

    <!-- HERO Container -->
    <section id="intro" class="row ma-0 ">
      <div class=" col col-3 alternate">
        
           
          <h1>
            Chain Dungeons, Rooms, and maps
          </h1>
          <h3>Exploring NFT based social gaming</h3>
          <!-- <p class="text-body-2">Exploring the boundaries of on-chain art.</p> -->
          
          <div class="ctaWrap">
            <nuxt-link to="/svg" class="btn hero">Get Started »</nuxt-link>
            <a href="#about" class="btn hollow asButton">What is this?</a>
          </div>
        
      </div>
      <div class="col col-9 ">
        <client-only>
          <!-- <Loading text="Loading" v-if="imagesStatus === 'loading'" /> -->
          <div class=" grid-wrap">
            <div v-for="(tile, index) in tiles" :key="index" class="grid-tile">
              <img :src="tile.src" width="300px" />
            </div>
          </div>
        </client-only>
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
    
    // if(this.binData && this.binData.images){
    //   console.log('this.bindata', this.binData.images)
    //   this.images = this.binData.images;
    // }
    // const id = '1234'
    // this.loadImages(id)
  },
  computed: {
    ...mapGetters({
      contrastMode: 'ui/contrastMode',
      hasChainSelect: 'ui/hasChainSelect',
      hasVerticalGridLines: 'ui/hasVerticalGridLines',
      binData: "ui/binData",
      binStatus: "ui/binStatus",
      walletAddress: "ui/walletAddress",
      tiles: "ui/tiles",
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
.grid-wrap{
  width: 604px !important;
  display: flex;
  flex-wrap: wrap;
  

  .grid-tile{
    width: 300px;
    height: 300px;
    flex-shrink: 0;
  }
}

</style>
