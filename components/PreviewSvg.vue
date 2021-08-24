<template>

<div class=" previewColumn svgPreviewColumn">
  <!-- <div>{{loading ? "loading" : "bnot loading"}}<Loading /></div> -->
  
  <div class="svgPreviewWrap" v-if="previewMode === 'edit'">
    <div id="svg" ref="svg" class="svgPreviewWrap" />
  </div>
  <v-btn 
    
    v-if="previewMode === 'edit'" 
    @click="() => handleConstruct(this.svgData.width, this.svgData.height, this.$refs.svg)" >reload</v-btn>
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
  align-items: center;
  padding-top: .5rem;
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
      loading: false,
      // theSvg: this.SVG()
    }
  },
  created() {
   this.loading = true;
  },
  mounted() {
    this.$nextTick(function() {
    const {svg} = this.$refs
    const target = svg;
    if(!target){return}
    this.handleConstruct(this.svgData.width, this.svgData.height, target);
      // this.drawPath();
    });
    this.loading = false;
    
  },
  
  watch: {
    svgData: {
      deep: true,
      handler(newValue) {
        // this.internalTags = [...newValue];
        console.log('svgData newValue', newValue)
        // this.localOptions = newValue;
        const {svg} = this.$refs
        const target = svg;
        if(!target){return};
        this.handleConstruct(_, _, target);
      },
      // immediate: true,
    },
  },
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      //SVG
      recipeTypes: "svgFormStore/recipeTypes",
      svgData: "svgFormStore/svgData",
      previewBytes: "svgFormStore/previewBytes",
      calculatedFee: "svgFormStore/calculatedFee",
      svgFee: "svgFormStore/svgFee",
    }),
  
    characterCount() {
      // console.log(this.code)
        var chars = this.code.length;
            // limit = 140;
          //return (limit - char) + " / " + limit + "characters remaining";
         return chars
      },
  },


  methods: {
    
    handleConstruct(width, height, target){
      const {svgData} = this;
      console.log('handleConstruct elements', svgData)
      const childNode = target.firstChild;
      
      if(childNode){
       target.removeChild(childNode);
      }
      
      const theSvg =  SVG()
      .addTo(target) // mount instance to our target
      .viewbox(0, 0, svgData.width, svgData.height); // set the <svg /> viewBox attribute
      theSvg.clear();
      // const backgroundElements = svgData.elements.filter(el => el.type === 'background')
      // const blobElements = svgData.elements.filter(el => el.type === 'blob')
      // const circleElements = svgData.elements.filter(el => el.type === 'circle')
      // const triangleElements = svgData.elements.filter(el => el.type === 'triangle')
      // const rectangleElements = svgData.elements.filter(el => el.type === 'rectangle')
       
      //  if(backgroundElements && backgroundElements.length > -1){
      //     backgroundElements.map(recipe => {
      //       [...Array(Number(recipe.count))].map((_, i) => {
      //         this.drawBackground(theSvg, svgData, recipe.options, recipe.mode)
      //       })  
      //     })
      //   }
      //   if(circleElements && circleElements.length > -1){
      //     circleElements.map(recipe => {
      //       console.log('circleELements recipe', recipe);
      //       [...Array(Number(recipe.count))].map((_, i) => {
      //         this.drawCircle(theSvg, svgData, recipe.options, recipe.mode)
      //       })  
      //     })
      //   }
      //   if(blobElements){
      //     blobElements.map(recipe => {
      //       [...Array(Number(recipe.count))].map((_, i) => {
      //         this.drawBody(theSvg, svgData, recipe.options)
      //       })  
      //     })
      //   }
      //   if(triangleElements){
      //     triangleElements.map(recipe => {
      //       console.log('recipe', recipe);
      //       [...Array(Number(recipe.count))].map((_, i) => {
      //         console.log('i', i)
      //         this.drawTriangle(theSvg, svgData, recipe.options, recipe.mode)
      //       })  
      //     })
      //   }
      //   if(rectangleElements){
      //     rectangleElements.map(recipe => {
      //       [...Array(Number(recipe.count))].map((_, i) => {
      //         console.log('i', i)
      //         this.drawRectangle(theSvg, svgData, recipe.options, recipe.mode)
      //       })  
      //     })
      //   }
      const methodArray = {
        line: 'drawLine',
        background: 'drawBackground',
        circle: 'drawCircle',
        rectangle: 'drawRectangle',
        triangle: 'drawTriangle',
        blob: 'drawBody',
      }
      
        svgData.elements && svgData.elements.map(recipe => {
          const recipeType = recipe.type;
          const selectedMethod =  methodArray[recipeType];
          if(selectedMethod){
            [...Array(Number(recipe.count))].map((_, i) => {
              this[selectedMethod](theSvg, svgData, recipe.options, recipe.mode)
            })
          }
        
          // if(recipeType === 'background'){
          //   [...Array(Number(recipe.count))].map((_, i) => {
          //     this.drawBackground(theSvg, svgData, recipe.options, recipe.mode)
          //   })  
          // }
          // if(recipeType === 'rectangle'){
          //   [...Array(Number(recipe.count))].map((_, i) => {
          //     this.drawRectangle(theSvg, svgData, recipe.options, recipe.mode)
          //   })  
          // }
          // if(recipeType === 'circle'){
          //   [...Array(Number(recipe.count))].map((_, i) => {
          //     this.drawCircle(theSvg, svgData, recipe.options, recipe.mode)
          //   })  
          // }
          // if(recipeType === 'blob'){
          //   [...Array(Number(recipe.count))].map((_, i) => {
          //     this.drawBody(theSvg, svgData, recipe.options, recipe.mode)
          //   })  
          // }
          // if(recipeType === 'triangle'){
          //   [...Array(Number(recipe.count))].map((_, i) => {
          //     this.drawTriangle(theSvg, svgData, recipe.options, recipe.mode)
          //   })  
          // }
          // if(recipeType === 'line'){
          //   [...Array(Number(recipe.count))].map((_, i) => {
          //     this.drawLine(theSvg, svgData, recipe.options, recipe.mode)
          //   })  
          // }
          // [...Array(Number(recipe.count))].map((_, i) => {
          //     console.log('i', i)
          //     this.drawRectangle(theSvg, svgData, recipe.options, recipe.mode)
          //   })  
        })
      console.log('theSvg', theSvg);
      console.log('children()', theSvg.children())
    },
    drawBackground(svg, svgData, options = {}, mode){
      console.log('drawBackground', options);
      const {width, height} = this.svgData;
      const centerX = width / 2 || 800;
      const centerY = height / 2 || 800;

      const {h, s, l, a, color, isGradient = true, type = 'gradient', angle} = options;
      const hue1 = mode === 'generative' ? this.random(0, 256, false) : h; // hue range
      const hue2 = this.random(0, 256, false); // hue range
      const color1 = mode === 'generative' ? `hsl(${hue1}, ${s * 100}%, ${l * 100}%)` : `hsl(${hue1}, ${s * 100}%, ${l * 100}%)`;
      const color2 = mode === 'generative' ? `hsl(${hue2}, ${s * 100}%, ${l * 100}%)` : `hsl(${hue2}, ${s * 100}%, ${l * 100}%)`;
      console.log('drawBackground hue1', hue1, h);
      console.log('drawBackground color1', color1);
      
      var gradient = svg.move(centerX, centerY).gradient('linear', function(add) {
        // add.stop(0, '#cc2b5e')
        // add.stop(1, '#753a88')
        add.stop(0, color1)
        add.stop(1, color2)
      }).transform({
        rotate: angle,
      })
      
      svg.rect(svgData.width, svgData.height).move(0, 0).fill(type === 'gradient' ? gradient : color1)
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
    // drawCircles(svg, svgData, options = {}){
    //    const hue = options && options.hue || this.random(0, 256, false); // hue range
    //    const color = `hsl(${hue}, 50%, 50%)`
    //    const colorStroke = `hsl(${hue}, 90%, 70%)`
    //   // choose a random number of points
      
    //   // keep track of our points
    //   const points = [];
    //   // const size = options.w || 100;
    //   const size = this.random(options.wobbleMin, options.wobbleMax, false);
      
    //   const constraintW = svgData.width
    //   const constraintH = svgData.height
    //   // const startX = svgData.width / 2 - size / 2;
    //   // const startY = svgData.height / 2 - size / 2;
    //   const startX = this.random(0 - size / 2, constraintW - size / 2, true);
    //   const startY = this.random(0 - size / 2, constraintH - size / 2, true);
    //   svg.ellipse(size, size)
    //     .move(startX, startY)
    //     .stroke({
    //       width: 10,
    //       color: colorStroke
    //     })
        
    //     .fill(color);

    // },
    drawCircle(svg, svgData, options = {}, mode){
      const hue = options && options.hue || this.random(0, 256, false); // hue range
      const color = `hsl(${hue}, 50%, 50%)`
      const colorStroke = `hsl(${hue}, 90%, 70%)`
      const size = mode === 'generative' ? this.random(Number(options.minSize), Number(options.maxSize), false) : Number(options.w);
      const constraintW = svgData.width
      const constraintH = svgData.height
      const offsetX = 0 - size / 2;
      const offsetY =0 - size / 2;
      const startX =  mode === 'generative' ? this.random(offsetX, constraintW - size / 2, true) : Number(options.x);
      const startY = mode === 'generative' ? this.random(offsetY, constraintH - size / 2, true) : Number(options.y);
      svg.ellipse(size, size)
        .move(startX, startY)
        .stroke({
          width: 10,
          color: colorStroke
        })
        
        .fill(color);

    },
    drawTriangle(svg, svgData, options = {}, mode){
       const hue = options && options.hue || this.random(0, 256, false); // hue range
       const color = `hsl(${hue}, 50%, 50%)`
       const colorStroke = `hsl(${hue}, 90%, 70%)`
       const randomRotation = options.rotationOptions && Math.floor(Math.random() * options.rotationOptions.length);
       // const rotation = mode === 'generative' ? options.rotationOptions[randomRotation] : (options.rotation || 0);
       const rotation = options.rotation ? options.rotation : options.rotationOptions[randomRotation];
      const {x, y, w, h} = options;
      const size = mode === 'generative' ? this.random(Number(0), Number(Number(w)), true) : Number(options.w);
      const constraintW = svgData.width
      const constraintH = svgData.height
      const startX =  mode === 'generative' ? this.random(0, constraintW - size, true) : Number(x);
      const startY = mode === 'generative' ? this.random(0, constraintH - size, true) : Number(y);
      // const points = [];
      // points.push({startX, y})
      // points.push({w, startY})
      // points.push({startX, w})
      // console.log('triangle points', points)
      // const pathData = spline(points, 0, true);
      let trianglePath = `M${startX},${startY} L`;
      // trianglePath = trianglePath + ` ${startX},${startY}`
      trianglePath = trianglePath + ` ${w},${h}`
      trianglePath = trianglePath + ` ${startX},${h}`
      trianglePath = trianglePath + ` Z`
      svg
        .path(trianglePath)
          .fill(color)
          .rotate(rotation)
        // .stroke({
        //   width: 10,
        //   color: colorStroke
        // })
    },
    drawRectangle(svg, svgData, options = {}, mode){
       const hue = options && options.hue || this.random(0, 256, false); // hue range
       const color = `hsl(${hue}, 50%, 50%)`
       const colorStroke = `hsl(${hue}, 90%, 70%)`
       const randomRotation = options.rotationOptions && Math.floor(Math.random() * options.rotationOptions.length);
       const rotation = mode === 'generative' ? options.rotationOptions[randomRotation] : (options.rotation || 0);
      const {x, y, w, h} = options;
      // const points = [];
      // points.push({x, y})
      // points.push({w, y})
      // points.push({w, h})
      // points.push({x, h})
      // console.log('rectangle points', points)
      let rectanglePath = `M${Number(x)},${Number(y)} L`;
      // rectanglePath = rectanglePath + ` ${Number(x)},${Number(y)}`
      rectanglePath = rectanglePath + ` ${Number(x) + Number(w)},${Number(y)}`
      rectanglePath = rectanglePath + ` ${Number(x) + Number(w)},${Number(y) + Number(h)}`
      rectanglePath = rectanglePath + ` ${Number(x)},${Number(y) + Number(h)}`
      rectanglePath = rectanglePath + ` Z`
      console.log('rectanglePath', rectanglePath);
      svg
        .path(rectanglePath)
          .fill(color)
          .rotate(rotation)
        // .stroke({
        //   width: 10,
        //   color: colorStroke
        // })
    },
    drawLine(svg, svgData, options = {}, mode){
       const hue = options && options.hue || this.random(0, 256, false); // hue range
       const color = options.strokecolor || `hsl(${hue}, 50%, 50%)`
       const colorStroke = options.strokeColor || `hsl(${hue}, 90%, 70%)`
       const randomRotation = options.rotationOptions && Math.floor(Math.random() * options.rotationOptions.length);
       // const rotation = mode === 'generative' ? options.rotationOptions[randomRotation] : (options.rotation || 0);
       // const rotation = options.rotation ? options.rotation : options.rotationOptions[randomRotation] || 0;
       const rotation = 0;
      const {x, y, w, h} = options;
      const size = mode === 'generative' ? this.random(Number(0), Number(Number(w)), true) : Number(options.w);
      const constraintW = Number(svgData.width)
      const constraintH = Number(svgData.height)
      const startX =  mode === 'generative' ? this.random(0, constraintW - size, true) : Number(x);
      const startY = mode === 'generative' ? this.random(0, constraintH - size, true) : Number(y);
      // const endX =  mode === 'generative' ? this.random(0, constraintW - size, true) : startX + 100;
      // const endY = mode === 'generative' ? this.random(0, constraintH - size, true) : startY + 100;
      const endX = startX + constraintW;
      const endY = startY ;
      const type = options.type || 'single';
      if(type === 'repeating'){
        const iterationCount = Number(options.count) || 10;
        let tempStartX = Number(startX);
        let tempStartY = Number(startY);
        let tempEndX = Number(endX);
        let tempEndY = Number(endY);
        
        [...Array(iterationCount)].map((_, i) => {
          
          const thisOffsetX = i * options.offsetX
          const thisOffsetY = i * options.offsetY
          const pointX = startX + thisOffsetX
          const pointY = startY + thisOffsetY
          // tempStartX = startX; //  + i * thisOffsetX
          // tempStartY = startY + i * thisOffsetY
          console.log('iteration', {pointX, pointY, thisOffsetX, thisOffsetY, tempStartX, tempStartY});
          console.log('tempStartX', tempStartX);
          tempEndX = pointX + endX;
          tempEndY = pointY; //  + i *  thisOffsetY + size
          // tempRotationOffset = options.rotationOffset + i * options.rotationOffset 
          // console.log('tempStartX', tempStartX);
          let tempRotationOffset = Number(options.rotationOffset);
          
          svg
            .line(pointX, pointY, tempEndX, tempEndY)
            .stroke({ width: options.strokeSize || 10, color: colorStroke })
            .rotate(tempRotationOffset || 0)
          })
          
        } else {
        svg
          .line(startX, startY, endX, endY)
          .stroke({ width: options.strokeSize || 10, color: colorStroke })
          .rotate(rotation)
        }
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


