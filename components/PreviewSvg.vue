<template>

<div class=" previewColumn svgPreviewColumn">
  <div class="svgPreviewWrap" v-if="previewMode === 'edit'">
    <div id="svg" ref="svg" class="svgPreviewWrap" />
  </div>
  <v-btn v-if="previewMode === 'edit'" @click="() => handleConstruct(this.svgData.width, this.svgData.height, this.$refs.svg)" >re-render</v-btn>
  <div
      id="previewWrap"
      class="previewWrap"
      v-if="previewMode === 'view'"
    >
    <div class="preview svgPreview previewBackground">
      <div
        id="svgPreveiw"
        class="svgPreviewWrap"
        v-html="code"
      />
      <div class="previewContent" v-if="previewMode==='view'">
            <div class="row">
              <div class="previewElement title col-50">
                <label>Title</label>
                <div id="preview_title">{{ previewData && previewData.svgTitle }}</div>
              </div>
              <div class="previewElement">
                <label>By</label>
                <div id="preview_artistName">
                  {{ previewData && previewData.svgCreator }}
                </div>
              </div>
              
            </div>
            <div class="previewElement">
              <label>Description</label>
              <div id="preview_artistNote">
                {{ previewData && previewData.svgDescription }}
              </div>
            </div>
            <div class="row">
              <div class="previewElement column">
                <label>Bytes</label>
                <div :class="previewBytes && previewBytes > 15000 ? 'danger' : ''">
                  {{previewBytes}}
                </div>
                <div v-if="previewBytes && previewBytes > 15000"
                  class="small"
                  :class="previewBytes && previewBytes > 15000 ? 'danger' : ''"
                  >
                  TOO BIG! The contract will not work with code > 15000 bytes.
                </div>
              </div>
              <div class="previewElement column" >
                <label>Mint Cost Estimate</label>
                <div v-if="calculatedFee">
                  <div><strong>Ξ</strong>{{calculatedFee}} (@30 gas)</div>
                  <div size="xsmall">(+ <strong>Ξ</strong>{{svgFee}} base fee)</div>

                </div>
              </div>
            </div>

      </div>
    </div>
  </div>
</div>

</template>

<style lang="scss">
.svgPreviewColumn{
  display: flex;
  flex-basis: 400px;
  flex-grow: 0;
  flex-direction: column;
}
  .svgPreviewWrap{
    // background: #fff;
    width: 400px;
    height: 400px;
    .svgPreview{

    }
    svg {
      width: 100%;
      height: 100%;
    }
  }
  #svg{
    // background: pink;
    // width: 50vmin;
    // height: 50vmin;
    display: block;
  }
  .danger{
    color: var(--danger-color, red);
  }
</style>

<script>

import { mapMutations, mapGetters, mapActions } from "vuex";
import { SVG } from '@svgdotjs/svg.js';
import { spline } from '@georgedoescode/spline';

export default {
  props: ['code', 'previewData', 'previewMode'],
  data(){
    return {
      svgElement: null,
      // theSvg: this.SVG()
    }
  },
  created() {
   
  },
  mounted() {
    this.$nextTick(function() {
    
    const {svg} = this.$refs
    const target = svg;
    console.log('target', target);
    
    if(!target){return}
    this.handleConstruct(this.svgData.width, this.svgData.height, target);
      // this.drawPath();
    });
    
  },
  
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      //SVG
      svgData: "svgFormStore/svgData",
      previewBytes: "svgFormStore/previewBytes",
      calculatedFee: "svgFormStore/calculatedFee",
      svgFee: "svgFormStore/svgFee",
    }),
    characterCount() {
      console.log(this.code)
        var chars = this.code.length;
            // limit = 140;
          //return (limit - char) + " / " + limit + "characters remaining";
          return chars
      },
  },
  methods: {
    handleConstruct(width, height, target){
      const {svgData} = this;
      const childNode = target.firstChild;
      console.log('childNode', childNode)
      if(childNode){
       target.removeChild(childNode);
      }
      console.log('target', target)
      const theSvg =  SVG()
      .addTo(target) // mount instance to our target
      .viewbox(0, 0, svgData.width, svgData.height); // set the <svg /> viewBox attribute
      theSvg.clear();
        this.drawBackground(theSvg, svgData);
        if(svgData.elements){
          console.log('svgData.elements', svgData.elements);
          const el = svgData.elements[0];
          const count = el.options && el.options.count;
          const {options} = el;
            if(!count){return}
          [...Array(count)].map((_, i) => {
            this.drawBody(theSvg, svgData, options)
          })
        } else{

          [...Array(svgData.elementCount)].map((_, i) => {
            this.drawBody(theSvg, svgData)
          })
        }
        const el2 = svgData.elements[1]
        if(el2){
          [...Array(el2.options.count)].map((_, i) => {
            this.drawCircles(theSvg, svgData, el2.options)
          })
          
        }
      console.log('theSvg', theSvg);
      console.log('children()', theSvg.children())
    },
    drawBackground(svg, svgData){
      const hue1 = this.random(0, 256, false); // hue range
      const hue2 = this.random(0, 256, false); // hue range
      const color1 = `hsl(${hue1}, 70%, 50%)`
      const color2 = `hsl(${hue2}, 70%, 50%)`
      var gradient = svg.gradient('linear', function(add) {
        // add.stop(0, '#cc2b5e')
        // add.stop(1, '#753a88')
        add.stop(0, color1)
        add.stop(1, color2)
      })
      svg.rect(svgData.width, svgData.height).move(0, 0).fill(gradient)
    },
    drawBody(svg, svgData, options = {}){
       const hue = options && options.hue || this.random(0, 256, false); // hue range
       const color = `hsl(${hue}, 50%, 50%)`
       const colorStroke = `hsl(${hue}, 90%, 70%)`
      // choose a random number of points
      const numPoints = this.random(5, 22);
      // step used to place each point at equal distances
      const angleStep = (Math.PI * 2) / numPoints;

      // keep track of our points
      const points = [];
      const size = this.random(svgData.width / 15, svgData.width / 7);
      const constraintW = svgData.width
      const constraintH = svgData.height
      // const startX = svgData.width / 2 - size / 2;
      // const startY = svgData.height / 2 - size / 2;
      const startX = this.random(0 - size / 2, constraintW - size / 2, true);
      const startY = this.random(0 - size / 2, constraintH - size / 2, true);
      const wobbleMin = options.wobbleMin || 0.5;
      const wobbleMax = options.wobbleMax || 1;
      let currentValue = {x: startX, y: startY};
      [...Array(numPoints)].map((_, i) => {
        const pull = this.random(wobbleMin, wobbleMax, true);
        console.log('pull', pull)
          // x & y coordinates of the current point
          const x = currentValue.x + Math.cos(i * angleStep) * (size * pull);
          const y = currentValue.y + Math.sin(i * angleStep) * (size * pull);
          const temp = {x: x, y: y}

          // push the point to the points array
          points.push({ x, y });
          currentValue = temp
        // console.log(i * 10)
        // return i * 10;
      });
      console.log('points', points)

      const pathData = spline(points, 1, true);
      
      svg
        .path(pathData)
        .stroke({
          width: 10,
          color: colorStroke
        })
        .fill(color);
      return pathData;
    },
    drawCircles(svg, svgData, options = {}){
       const hue = options && options.hue || this.random(0, 256, false); // hue range
       const color = `hsl(${hue}, 50%, 50%)`
       const colorStroke = `hsl(${hue}, 90%, 70%)`
      // choose a random number of points
      
      // keep track of our points
      const points = [];
      // const size = options.w || 100;
      const size = this.random(options.wobbleMin, options.wobbleMax, false);
      
      const constraintW = svgData.width
      const constraintH = svgData.height
      // const startX = svgData.width / 2 - size / 2;
      // const startY = svgData.height / 2 - size / 2;
      const startX = this.random(0 - size / 2, constraintW - size / 2, true);
      const startY = this.random(0 - size / 2, constraintH - size / 2, true);
      svg.ellipse(size, size)
        .move(startX, startY)
        .stroke({
          width: 10,
          color: colorStroke
        })
        
        .fill(color);

    },
    random(min, max, float = false) {
      const val = Math.random() * (max - min) + min;
      if (float) {
        return val;
      }
      return Math.floor(val);
    }
  }

};
</script>


