<template>
  <div class="codeItem preview-position" :class="`${useGrid ? 'svgPreviewGrid' : ''}`">
    <div v-html="code" v-if="code" class="svgPreviewWrap"></div>
    <label v-if="showTitle">{{image.title}}</label>
  </div>
<!-- <div :class="`preview-position ${previewMode}`">
  <div class="svgPreviewWrap" >
    <div :id="svgRef || 'svg'" :ref="svgRef || 'svg'" :style="`${canvasStyle}`" :class="`${useGrid ? 'svgPreviewGrid' : ''}`" />
    <v-btn 
      v-if="previewMode === 'edit'" 
      @click="() => handleConstruct()" >reload</v-btn>
  </div>
</div> -->

</template>

<style lang="scss">
  .preview-position{
    display: flex;
    justify-content: center;
    &.full {
      background: white;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 99999;
      .svgPreviewWrap{
        width: 100% !important;
        height: 100% !important;
        #svg{
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .svgPreviewWrap{
    width: 400px;
    height: 400px;
    .svgPreview{
    }
    svg {
      width: 100%;
      height: 100%;  
      display: block;
    }
  }
  #svg{
    display: block;
    
  }
  
</style>

<script>

import { mapMutations, mapGetters, mapActions } from "vuex";
import { SVG } from '@svgdotjs/svg.js';
import { spline } from '@georgedoescode/spline';


export default {
  
  props: ['code', 'showTitle', 'useGrid'],
  data(){
    return {
      svgElement: null,
      loading: false,
    }
  },
  created() {
   this.loading = true;
  // console.log('previewData this.svgCode', this.svgCode)
   // const hasCode = this.svgCode
   if(this.previewData){
     console.log('previewData', this.previewData)
   }
  },
  mounted() {
    this.loading = false;
   
  },
  
  watch: {
    svgCode: {
      deep: true,
      handler(newValue) {
        // TODO: target is now set in handleConstruct
        // remove unnecc variables
        
        // const target = propsExist ? propsExist : svg;
        console.log('svgCode changed');
        // if(!target){return};
        // this.handleConstruct(target);
        // this.countBytes()
      },
      // immediate: true,
    },
  },
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      //SVG
      activeTheme: "svgFormStore/activeTheme",
      recipeTypes: "svgFormStore/recipeTypes",
      svgData: "svgFormStore/svgData",
      previewBytes: "svgFormStore/previewBytes",
      calculatedFee: "svgFormStore/calculatedFee",
      svgFee: "svgFormStore/svgFee",
    }),
    canvasStyle(){
      const {canvasWidth, canvasHeight} = this.svgData;
      const uiValue = 400;
      const aspect = canvasWidth  / canvasHeight;
      // const wRatio = uiValue * aspect;
      const hRatio = uiValue / canvasHeight;
      const calculatedW = uiValue * aspect;
      const calculatedH = canvasHeight * hRatio;
      // console.log('calculatedValue',  {canvasHeight, aspect, hRatio , calculatedW, calculatedH});
      return {
        width: `${calculatedW}px`,
        height: `${calculatedH}px`
      }
    },
    characterCount() {
      var chars = this.code.length;
      // limit = 140;
      //return (limit - char) + " / " + limit + "characters remaining";
        return chars
      },
  },

  methods: {
    ...mapActions({
      getColor: "svgFormStore/getColor",
    }),
    
  }

};
</script>


