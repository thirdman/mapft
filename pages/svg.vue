<template>
  <div class="pageContainer">
    <Header />
      <section id="mint" class="mint markerNot borderBottom">
        <div class="tertiary">
          <h2>SVG Minting</h2>
          <div class="aside">
            <p>Purely onchain SVG</p>
          </div>
        </div>
      <div class="primary">
        <div class="row">
          <SvgForm />
          
            <PreviewSvg :code="svgCode" v-if="showPreview" :previewData="previewData" />
          
        </div>
        
      </div>
      <!-- <div class="secondary">
      </div> -->
    </section>
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "SvgPage",
  head: {
    title: 'InfinNFT: Mint That SVG',
    meta: [
      { hid: 'description', name: 'description', content: 'Mint That SVG.' },
    ],
  },
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      // SVG
      showPreview: "svgFormStore/showPreview",
      previewData: "svgFormStore/previewData",
      svgCode: "svgFormStore/svgCode",
      svgFormStatusMessage: "svgFormStore/svgFormStatusMessage",
    }),
  },
  methods: {
   
  }
}
</script>

<style></style>
