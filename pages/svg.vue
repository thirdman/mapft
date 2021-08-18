<template>
  <div class="pageContainer appPage">
    <Header />
      <section id="appSection" class="">
        
      
        <div class="row ma-0 pa-0" >
          <div class="col col-6 svgColumn pa-0">
            <PreviewToggle :code="svgCode" :previewData="previewData"/>
            <client-only>
              <PreviewSvg :code="svgCode" :previewData="previewData" :previewMode="previewMode"  />
            </client-only>
          </div>
          <div class="col col-6 controlsColumn pa-0">
            <ControlsToggle :code="svgCode" :previewData="previewData"  />
            <ControlsOptions v-if="controlMode === 'options' " />
            <ControlsCode v-if="controlMode === 'code' " />
            <SvgForm v-if="controlMode === 'meta' "/>
          </div>
        </div>
        
      
      
    </section>
    <!-- <section>
      <div class="row">
        <div class="col col-6">
          <h2>SVG Minting</h2>
          <div class="aside">
            <h4>Notes:</h4>
            <ul style="margin: 0; padding: 0;">
              <li class="small">Beta functionality: use at your own risk</li>
              <li class="xsmall">needs to have somthing like: <br /><code>xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink"</code> or an xml declaration?</li>
              <li class="small">Must be less than 15000 bytes</li>
              <li class="small">Minting Fee: 0.1</li>
            </ul>
          </div>
        </div>
      </div>
    </section> -->
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
      walletAddress: "ui/walletAddress",
      // SVG
      controlMode: "svgFormStore/controlMode",
      previewBytes: "svgFormStore/previewBytes",
      previewMode: "svgFormStore/previewMode",
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

<style>
.appSection{}
.svgColumn{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border-right: 1px solid var(--line-color);
}
.controlsColumn{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
}
</style>
