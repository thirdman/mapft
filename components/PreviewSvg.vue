<template>
<div>
  <div class="svgPreviewWrap" >
    <div :id="svgRef || 'svg'" :ref="svgRef || 'svg'" class="svgPreviewGrid" :style="canvasStyle" />
  <v-btn 
    v-if="previewMode === 'edit'" 
    @click="() => handleConstruct(this.svgData.canvasWidth, this.svgData.canvasHeight, this.$refs.svg)" >reload</v-btn>
  </div>
  <!-- <div
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
  </div> -->
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
    
    // max-width: 400px;
    .svgPreview{

    }
    svg {
      width: 100%;
      height: 100%;  
      display: block;
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
  
  props: ['code', 'previewData', 'previewMode', 'elements', 'svgRef'],
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
    console.log('mounted refs:', this.$refs)
    this.$nextTick(function() {
      const {svg} = this.$refs
      const ref = this.svgRef
      const propElements = this.elements;
      const propsExist = !!propElements;
      const target = propsExist ? ref : svg;
      console.log('propElements', propElements, propsExist, target);
      if(!target){return}
      this.handleConstruct(this.svgData.canvasWidth, this.svgData.canvasHeight, target);
    });
    this.loading = false;
    
  },
  
  watch: {
    svgData: {
      deep: true,
      handler(newValue) {
        // TODO: target is now set in handleConstruct
        // remove unnecc variables
        const {svg} = this.$refs
        const propElements = this.elements;
        const propsExist = !!propElements;
        const target = propsExist ? propsExist : svg;
        console.log('propElements target', propElements, propsExist, target);
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
      console.log('calculatedValue',  {canvasHeight, aspect, hRatio , calculatedW, calculatedH});
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
    
    async handleConstruct(width, height, nottarget){
      const {svgData, activeTheme, elements} = this;
      const {svg, previewSvg} = this.$refs
      const propElements = this.elements;
      const propsExist = !!propElements;
      const target = propsExist ? previewSvg : svg;
      // console.log('propElements', propElements, propsExist, target);
      const theElements = elements || svgData.elements;
      console.log('handleConstruct svgData', svgData)
      console.log('handleConstruct elements', theElements)
      const childNode = target.firstChild;
      
      if(childNode){
       target.removeChild(childNode);
      }
      
      const theSvg =  SVG()
      .addTo(target) // mount instance to our target
      .viewbox(0, 0, svgData.canvasWidth, svgData.canvasHeight); // set the <svg /> viewBox attribute
      theSvg.clear();
      const methodArray = {
        background: 'drawBackground',
        line: 'drawLine',
        circle: 'drawCircle',
        rectangle: 'drawRectangle',
        triangle: 'drawTriangle',
        blob: 'drawBody',
      }
      console.log('elements', target, theElements)
      if(!theElements){return}
      theElements.map(recipe => {
        // console.log('RECIPE', recipe)
        const recipeType = recipe.type;
        const selectedMethod =  methodArray[recipeType];
        if(!selectedMethod){return }
        const iterationsArray = [...Array(Number(recipe.count))];
          iterationsArray.map((_, i) => {
          this[selectedMethod](theSvg, svgData, recipe.options, recipe.mode)
        })        
      })
      
      console.log('theSvg', theSvg);
    },
//       var results = await Promise.all(arr.map(async (item)=> {
//     await callAsynchronousOperation(item);
//     return item + 1;
// }));
    drawBackground(svg, svgData, options = {}, mode){
      const {settings} = svgData
      const {activeTheme} = this;
      const {width, height} = this.svgData;
      const centerX = width / 2 || 800;
      const centerY = height / 2 || 800;

      const {h, s, l, a, color, isGradient = true, type = 'gradient', angle} = options;
      const hue1 = mode === 'generative' ? this.random(0, 256, false) : h; // hue range
      const hue2 = this.random(0, 256, false); // hue range
      const themeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
      // const themeColor = activeTheme.colors[0]
      const reducedColors = activeTheme.colors.slice().filter(col => col !== themeColor);
      const themeColor2 = reducedColors[this.random(0, reducedColors.length, false)]

      // const color1 = mode === 'generative' ? `hsl(${hue1}, ${s * 100}%, ${l * 100}%)` : `hsl(${hue1}, ${s * 100}%, ${l * 100}%)`;
      //const color2 = mode === 'generative' ? `hsl(${hue2}, ${s * 100}%, ${l * 100}%)` : `hsl(${hue2}, ${s * 100}%, ${l * 100}%)`;
      const color1 = '#ffffff' || mode === 'generative' ? themeColor : `hsl(${hue1}, ${s * 100}%, ${l * 100}%)`;
      const color2 = mode === 'generative' ? themeColor2 : `hsl(${hue2}, ${s * 100}%, ${l * 100}%)`;
      // console.log('drawBackground hue1', hue1, h);
      // console.log('drawBackground color1', color1);
      const rotationAngle = 135 || settings.rotationOptions && 45 + Number(settings.rotationOptions[2]) || angle;
      var gradient = svg.move(centerX, centerY).gradient('linear', function(add) {
        add.stop(0, color1)
        add.stop(1, color2)
      }).transform({
        rotate: rotationAngle,
      })
      //.attr('x', 50).
      
      svg.rect(svgData.canvasWidth, svgData.canvasHeight).move(0, 0)
      .fill(type === 'gradient' ? gradient : color1)
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
      const size = this.random(svgData.canvasWidth / 20, svgData.canvasWidth / 4);
      const constraintW = svgData.canvasWidth
      const constraintH = svgData.canvasHeight
      // const startX = svgData.canvasWidth / 2 - size / 2;
      // const startY = svgData.canvasHeight / 2 - size / 2;
      const startX = 800 || this.random(0 - size / 2, constraintW - size / 2, true);
      const startY = 800 || this.random(0 - size / 2, constraintH - size / 2, true);
      const wobbleMin = 1 || options.wobbleMin || 0.5;
      const wobbleMax = 2 || options.wobbleMax || 1;
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
   
    async drawCircle(svg, svgData, options = {}, mode){
      const {activeTheme} = this;
      const {hasStroke = false, hasFill = true} = options
      const hue = options && options.hue || this.random(0, 256, false); // hue range
      const color = `hsl(${hue}, 50%, 50%)`
      const themeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
      const strokeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
      const strokeSize = options.strokeSize || this.random(5, 30, false);
      const colorStroke = strokeColor || `hsl(${hue}, 90%, 70%)`
      const size = mode === 'generative' ? this.random(Number(options.minSize), Number(options.maxSize), false) : Number(options.w);
      const constraintW = svgData.canvasWidth
      const constraintH = svgData.canvasHeight
      const offsetX = 0 - size / 2;
      const offsetY =0 - size / 2;
      const startX =  mode === 'generative' ? this.random(offsetX, constraintW - size / 2, true) : Number(options.x);
      const startY = mode === 'generative' ? this.random(offsetY, constraintH - size / 2, true) : Number(options.y);
      svg.ellipse(size, size)
        .move(startX, startY)
        .stroke({
          width: hasStroke ? strokeSize : 0,
          color: colorStroke
        })
        
        .fill(hasFill ? themeColor : 'transparent');

    },
    async drawTriangle(svg, svgData, options = {}, mode){
       const hue = options && options.hue || this.random(0, 256, false); // hue range
       const {settings} = svgData;
       const {type} = options;
       console.log()
       const {activeTheme} = this;
       // const color = `hsl(${hue}, 50%, 50%)`
       // const colorStroke = `hsl(${hue}, 90%, 70%)`
       const colorStroke = `hsl(${hue}, 90%, 70%)`
       const randomRotation = settings.rotationOptions && Math.floor(Math.random() * settings.rotationOptions.length);
       // const rotation = mode === 'generative' ? settings.rotationOptions[randomRotation] : (options.rotation || 0);
       // const rotation = !isNaN(options.rotation) ? options.rotation : settings.rotationOptions[randomRotation];
       const rotation = options.rotation || settings.rotationOptions[randomRotation];
       // console.log('tri options', options)
       
      const {x, y, w, h} = options;
      const size = mode === 'generative' ? this.random(Number(0), Number(Number(w)), true) : Number(options.w);
      const constraintW = svgData.canvasWidth
      const constraintH = svgData.canvasHeight
      const startX =  mode === 'generative' ? this.random(0, constraintW - size, true) : Number(x);
      const startY = mode === 'generative' ? this.random(0, constraintH - size, true) : Number(y);
      // const points = [];
      // points.push({startX, y})
      // points.push({w, startY})
      // points.push({startX, w})
      // console.log('triangle points', points)
      // const pathData = spline(points, 0, true);
      let trianglePath = `M${startX},${startY} L`;
      trianglePath = trianglePath + ` ${w},${h}`
      trianglePath = trianglePath + ` ${startX},${h}`
      trianglePath = trianglePath + ` Z`
      
      if(mode === 'repeating'){
        
        const iterationCount = Number(options.count) || 10;
        let tempStartX = Number(startX);
        let tempStartY = Number(startY);
        let tempStartRotation = rotation;
        
        [...Array(iterationCount)].map((_, i) => {
          const color = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]  
          const thisOffsetX = i * options.offsetX
          const thisOffsetY = i * options.offsetY
          const pointX = tempStartX + thisOffsetX
          const pointY = tempStartY + thisOffsetY
          
          const endPointX = pointX + Number(w)
          const endPointY = pointY + Number(h)
          let tempRotationOffset = tempStartRotation +  Number(options.rotationOffset);
          // console.log('iteration', {pointX, pointY, endPointX, endPointY, thisOffsetX, thisOffsetY, tempRotationOffset});
          let tempTrianglePath = `M${pointX},${pointY} L`;
          tempTrianglePath = tempTrianglePath + ` ${endPointX},${endPointY}`
          tempTrianglePath = tempTrianglePath + ` ${pointX},${endPointY}`
          tempTrianglePath = tempTrianglePath + ` Z`
          tempStartX = pointX
          tempStartY = pointY
          tempStartRotation = tempRotationOffset

          svg
            .path(tempTrianglePath)
              .fill(color)
              .rotate(tempRotationOffset)
          })
          
        } else {
          const color = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
       
          let trianglePath = `M${startX},${startY} L`;
          trianglePath = trianglePath + ` ${w},${h}`
          trianglePath = trianglePath + ` ${startX},${h}`
          trianglePath = trianglePath + ` Z`
          svg
            .path(trianglePath)
              .fill(color)
              .rotate(rotation)
        }

      
    },
   async drawRectangle(svg, svgData, options = {}, mode){
     const {settings} = svgData;
       const hue = options && options.hue || this.random(0, 256, false); // hue range
       const color = `hsl(${hue}, 50%, 50%)`
       const colorStroke = `hsl(${hue}, 90%, 70%)`
       
       const randomRotation = settings.rotationOptions && Math.floor(Math.random() * settings.rotationOptions.length);
       const rotation = mode === 'generative' ? settings.rotationOptions[randomRotation] : (options.rotation || 0);
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
          // .rotate(rotation)
        // .stroke({
        //   width: 10,
        //   color: colorStroke
        // })
    },
    async drawLine(svg, svgData, options = {}, mode){
      const {settings} = svgData;
      const {activeTheme}= this
       const hue = options && options.hue || this.random(0, 256, false); // hue range
       const themeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
       const color = themeColor || options.strokecolor || `hsl(${hue}, 50%, 50%)`
       const colorStroke = themeColor || options.strokeColor || `hsl(${hue}, 90%, 70%)`
       
       const randomRotation = settings.rotationOptions && settings.rotationOptions[Math.floor(Math.random() * settings.rotationOptions.length)];
       // const rotation = mode === 'generative' ? settings.rotationOptions[randomRotation] : (options.rotation || 0);
       // const rotation = options.rotation ? options.rotation : settings.rotationOptions[randomRotation] || 0;
       console.log('randomRotation', randomRotation)
       const rotation = 0;
      const {x, y, w, h} = options;
      const size = mode === 'generative' ? this.random(Number(0), Number(Number(w)), true) : Number(options.w);
      const constraintW = Number(svgData.canvasWidth)
      const constraintH = Number(svgData.canvasHeight)
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
          // .rotate(rotation)
          .rotate(randomRotation)
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


