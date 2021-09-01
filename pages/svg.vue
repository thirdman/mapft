<template>
  <div class="pageContainer appPage">
    <Header />
      <section id="appSection" class="">
        
      
        <div class="sectionRow row ma-0 pa-0" >
          <div class="col col-6 svgColumn pa-0">
            <PreviewToggle :code="svgCode" :previewData="previewData"/>
            <div class=" previewColumn svgPreviewColumn col">
              <client-only>
                  <PreviewSvg :code="svgCode" :showGrid="false" :previewMode="previewMode" v-if="previewMode === 'edit' || previewMode === 'full'" :calculateCode="true" :setBytes="setPreviewBytes" />
                  <!-- :previewData="previewData" -->
                  <div v-if="previewMode === 'full'" class="fullPreviewControls">
                    <v-btn 
                      color="primary"
                      plain
                      @click="() => setPreviewMode('edit')"
                      >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
              </client-only>
              <v-divider />
              <div class="previewMetaBox col" v-if="previewMode === 'edit' && previewBytes">
                <div class="row" >
                  <div class="col">
                    <label>Bytes</label>
                    <div>{{previewBytes}}</div>
                  </div>
                  <div class="col">
                    <label>Estimated Fee</label>  
                    <div>{{calculatedFee}} Eth</div>
                  </div>
                </div>
              </div>
              <div class="previewMetaBox col" v-if="svgData">
                <div class="row">
                  <div class="col">
                    <label>Title</label>
                    <div>{{svgData.label}}</div>
                  </div>
                  <div class="col">
                    <label>Creator</label>
                    <div>{{svgData.creator}}</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label>Description</label>
                    <div>{{svgData.description}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class=" galleryColumn" v-if="previewMode === 'gallery'">
              <div class="newElement panel " >
                <v-card >
                  <v-card-title>
                    <label>Gallery Preview</label>
                    <v-btn x-small depressed @click="() => {this.setPreviewMode('edit')}">
                      <v-icon small>
                        mdi-close
                      </v-icon>
                      </v-btn>
                  </v-card-title>
                  <v-card-text class="grid">
                    <div v-for="index in 14" :key="index" class="gridItem">
                    <client-only>
                        <PreviewSvg :code="svgCode" :previewData="previewData"  />
                        
                    </client-only>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </div>
          <div class="col col-6 controlsColumn pa-0">
            <ControlsToggle :code="svgCode" :previewData="previewData"  />
            <ControlsRules v-if="controlMode === 'rules' " />
            <ControlsTheme v-if="controlMode === 'theme' " />
            <ControlsSettings v-if="controlMode === 'settings' " />
            <ControlsMeta v-if="controlMode === 'meta' " />
            <ControlsCode v-if="controlMode === 'code' " />
            <SvgForm v-if="controlMode === 'mint' "/>
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
  data() {
    return{
      loading: true
    }
  },
  asyncData() {
      return {
        loading: false
      }
    },
  mounted(){
console.log('this', this.svgData)
  },
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      walletAddress: "ui/walletAddress",
      // SVG
      controlMode: "svgFormStore/controlMode",
      calculatedFee: "svgFormStore/calculatedFee",
      previewBytes: "svgFormStore/previewBytes",
      previewMode: "svgFormStore/previewMode",
      showPreview: "svgFormStore/showPreview",
      previewData: "svgFormStore/previewData",
      svgData: "svgFormStore/svgData",
      svgCode: "svgFormStore/svgCode",
      svgFormStatusMessage: "svgFormStore/svgFormStatusMessage",
    }),
  },
  methods: {
    ...mapMutations({
      setPreviewMode: "svgFormStore/setPreviewMode",
      setPreviewBytes: "svgFormStore/setBytes",
    }),
    
  }
}
</script>

<style lang="scss">
  .previewMetaBox{
    width: 100%;
    flex-basis: 100%;
    bordeR: 1px solid var(--line-color);
    padding: .5rem;
  }
  .fullPreviewControls{
    position: absolute;
    z-index: 9999999;
    left: 0;
    bottom: 1rem;
    height: 2rem;
    width: auto;
    background: #fff;
  }

.sectionRow{
  width: 100%;
}
// .svgPreviewColumn{
//   display: flex;
//   flex-basis: 400px;
//   flex-grow: 0;
//   flex-direction: column;
//   align-items: center;
//   padding-top: .5rem;
// }
.svgColumn{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border-right: 1px solid var(--line-color);
  flex-basis: 50%;
}
.controlsColumn{
  flex-basis: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
}
.grid{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .gridItem{
    flex-basis: 40%;
    padding: .5rem;
    margin: .5rem;
    background: #fff;
    box-shadow: 0 2px 1rem rgba(0,0,0,1);
    .svgPreviewWrap{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
