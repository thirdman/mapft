<template>
  <div class="pageContainer">
    <Header />
      <section id="mint" class="mint markerNot borderBottom">
        <div class="tertiary">
          <h2>SVG Minting</h2>
          <div class="aside">
            <p>Purely onchain SVG</p>
            <h4>Notes:</h4>
            <ul style="margin: 0; padding: 0;">
              <li class="small">Beta functionality: use at your own risk</li>
              <li class="xsmall">needs to have somthing like: <br /><code>xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink"</code> or an xml declaration?</li>
              <li class="small">Must be less than 15000 bytes</li>
              <li class="small">Minting Fee: 0.1</li>
            </ul>
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
      previewBytes: "svgFormStore/previewBytes",
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
