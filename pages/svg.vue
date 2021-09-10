<template>
  <div class="pageContainer appPage">
    <Header />
      <section id="appSection" class="">
        
      
        <div class="sectionRow row ma-0 pa-0" >
          <div class="col col-6 svgColumn pa-0">
            <PreviewToggle :code="svgCode" :previewData="previewData"/>
            <div class=" previewColumn svgPreviewColumn col">
              <client-only>
                    <!-- ref="test" -->
                    <!-- :svgRef="this.$refs.test" -->
                  <PreviewSvg
                    ref="test"
                    :code="svgCode"
                    :useGrid="false"
                    :previewMode="previewMode"
                    v-if="(!svgCode && previewMode === 'edit') || (!svgCode && previewMode === 'full')"
                    :calculateCode="true"
                    :setBytes="setPreviewBytes" />
                    <div v-if="previewMode === 'full'" class="fullPreviewControls">
                    <v-btn 
                      color="primary"
                      plain
                      @click="() => setPreviewMode('edit')"
                      >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                  <RenderCode
                    ref="codepreview"
                    :code="svgCode"
                    :useTItle="false"
                    :useGrid="true"
                    v-if="svgCode"
                    />
                  
              </client-only>
              <v-divider />
              <div class="previewMetaBox col" v-if="svgData">
                <v-btn x-small @click="handleSaveFile" v-if="walletAddress === devAddress">Save Image</v-btn>
                <v-btn x-small outlined @click="handleConvertToCode">Convert to Code</v-btn>
                <v-btn x-small outlined @click="() => countBytes(svgCode ? 'code' : 'generated')">Calculate</v-btn>
              </div>
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
            <SvgForm v-if="controlMode === 'mint'" :target="this.$refs.previewSvg || this.$refs.svg"/>
            <div v-if="controlMode === 'mint'"> Mint form will be here</div>
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
import { dialog } from '@devlop-ab/dialog';
export default {
  name: "SvgPage",
  head: {
    title: 'SVG Tokens',
    meta: [
      { hid: 'description', name: 'description', content: 'Mint That SVG.' },
    ],
  },
  data() {
    return{
      loading: true,
      devAddress: '0xd1c248d1c9879dc3b5a846d4dccc5b7aa8fbf432'
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
      svgFormStatusMessage: "svgFormStore/svgStatusMessage",
    }),
  },
  methods: {
    ...mapMutations({
      setPreviewMode: "svgFormStore/setPreviewMode",
      setPreviewBytes: "svgFormStore/setBytes",
      setSvgCode: "svgFormStore/setSvgCode",
    }),
    ...mapActions({
      saveSvgFile: "svgFormStore/saveSvgFile",
    }),
    async handleSaveFile(){
      console.log('here', this.svgData)
      console.log('here', this.$refs.test)
      const code = this.svgCode;
      const nameResult = await dialog.prompt('Enter your name', 'example name', {
          title: 'Your name',
          input: {
              placeholder: 'Your full name please',
          },
      });

      if(code){
        const viewBox = this.getViewBox();
        const options = {
          node : this.$refs.test,
          width: viewBox.width || 1600,
          height: viewBox.height || 1600,
          name: nameResult,
          code 
        }
        this.saveSvgFile(options)
      }
      if(this.$refs.test){
        const options = {
          node : this.$refs.test,
          width: 1600,
          height: 1600,
          name: nameResult
        }
        this.saveSvgFile(options)
      } 
    },
    getViewBox(){
      const code = this.svgCode;
      if(code){
        const viewBoxString = this.getSvgAttribute(this.svgCode, 'viewBox')
        const viewBoxAsArray = viewBoxString.split(" ");
        const viewBoxWidth = Number(viewBoxAsArray[2]) - Number(viewBoxAsArray[0])
        const viewBoxHeight = Number(viewBoxAsArray[3]) - Number(viewBoxAsArray[1])
        console.log('viewBoxString', viewBoxString, viewBoxAsArray,  viewBoxWidth, viewBoxHeight)
        return {
          width: viewBoxWidth,
          height: viewBoxHeight,
        }
      } else {
        console.log('not a code iamge')
      }
    },
    countBytes(type){
      if(type = 'code'){
        if(!this.svgCode){return}
        
        const source = this.svgCode;
        const bytes = Buffer.byteLength(source);
        this.setPreviewBytes(bytes);
        return bytes
      }
      const {svg, previewSvg} = this.$refs
      const propElements = this.elements;
      const propsExist = !!propElements;
      const target = propsExist ? previewSvg : svg;
      const source = target.innerHTML;
      console.log('source', source.innerHTML)
      const bytes = Buffer.byteLength(source);
      // const gasFee = 30;
      // const transactionFee = bytes / 1000000 * gasFee;
      // // const roundedFee = Math.round((transactionFee + Number.EPSILON) * 100) / 100;
      // const roundedFee =parseFloat(transactionFee).toFixed(5);
      // this.$store.commit("svgFormStore/setBytes", bytes);
      // this.$store.commit("svgFormStore/setCalculatedFee", roundedFee);
      console.log('bytes', bytes, source)
      if(this.setBytes){
        this.setBytes(bytes);
      }
      return bytes
    } ,
    getSvgAttribute(htmlContent, attribute) {
      var tmpDiv = document.createElement("div");
      tmpDiv.innerHTML  = htmlContent;
      // tmpDiv = temp.firstElementChild.attributes; 
      const value = tmpDiv.querySelector('svg').getAttribute(attribute);
      //put the attributes in a an array
      return value;
    },
    async handleConvertToCode(){
      console.log('here', this.$refs.test)
      const result = await dialog.confirm(`This action cannot be reversed. You may view/edit result in the code tab`, {
          title: 'Convert?',
          okText: 'Yes, I understand',
          cancelText: 'No',
      });
      // console.log('result', result);
      if(result){
        // const {test} = this.$refs;
        const test = this.$refs.test
        console.log('this.$refs, ', this.$refs)
        console.log('test, ', test)
        const target = test && test.$refs.svg;
        if(!target){
          dialog.alert(`SVG ref not found`);
          return
          }
        
          console.log('test2, ', test.$refs.svg)
          
          
        const source = target.innerHTML;
        // console.log('source', source.innerHTML)
        // const bytes = Buffer.byteLength(source);
        console.log('source: ', source)
        this.setSvgCode(source)
      }
    }
    // getTagContent(htmlContent, tag) {
    //     var tmpDiv = document.createElement("div");
    //     tmpDiv.innerHTML  = htmlContent;
    //     //put the attributes in a an array
    //     var list = Object.keys(tmpDiv).map( function( index ) { return temp[ index ] } );

    //     console.log( list );
    //     var parser = new DOMParser();
    //     var parsedHtml = parser.parseFromString(htmlContent, 'text/html'); //mimeType of html is text/html
    //     var listEls = parsedHtml.all
    //     let value = ""
    //   //all property is [HTMLCollection] holding all the elements (nested or otherwise) that are in the DOM tree
    
    //   for (var i = 0; i < listEls.length; i++) {
    //     if (listEls[i].tagName.toLowerCase() == tag) {
    //       console.log(listEls[i],'listEls[i]');
    //       // tagFound = true;
    //       value = listEls[i]
    //     }
    //   }
    //   return value;
    // },
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
  .svgPreviewColumn{
    overflow: scroll;
  }
  .controlsColumn{
    overflow: scroll;
  }
}
  .svgFormColumn{
    overflow: scroll;
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
    // background: #fff;
    // box-shadow: 0 2px 1rem rgba(0,0,0,1);
    .svgPreviewWrap{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
