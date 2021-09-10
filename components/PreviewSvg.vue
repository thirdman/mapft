<template>
<div :class="`preview-position ${previewMode}`">
  <div class="svgPreviewWrap" >
    <div :id="svgRef || 'svg'" :ref="svgRef || 'svg'" :style="`${canvasStyle}`" :class="`${useGrid ? 'svgPreviewGrid' : ''}`" />
    <div class="reloadPosition">
    <v-btn 
      small
      depressed
      v-if="previewMode === 'edit'" 
      class="reloadBtn"
      @click="() => handleConstruct()" 
      >
        <v-icon small>mdi-reload</v-icon> re-load
      </v-btn>
      </div>
  </div>
</div>

</template>

<style lang="scss">
.reloadBtn{
  margin: 0 auto;
}
.reloadPosition{
  width: 100%;
  text-align: center;
}
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
  
  props: ['code', 'previewData', 'previewMode', 'elements', 'svgRef', 'calculateCode', 'setBytes', 'useGrid'],
  data(){
    return {
      svgElement: null,
      loading: false,
      // theSvg: this.SVG()
    }
  },
  created() {
   this.loading = true;
   if(this.previewData){
     console.log('previewData', this.previewData)
   }
  },
  mounted() {
    this.$nextTick(function() {
      console.log('previewSVG mounted:', this.$refs)
      // const {svg} = this.$refs
      // const ref = this.svgRef
      // const propElements = this.elements;
      // const propsExist = !!propElements;
      // const target = propsExist ? ref : svg;
      // console.log('propElements', propElements, propsExist, target);
      // if(!target){return}
      // console.log('here')
      this.handleConstruct();
    });
    this.loading = false;
   if(this.calculateCode){
     console.log('should calculate code')
     this.countBytes();
   } 
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
        this.handleConstruct(target);
        this.countBytes()
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
    ...mapMutations({
      setSvgCode: "svgFormStore/setSvgCode",
    }),
    ...mapActions({
      getColor: "svgFormStore/getColor",
    }),
    
    async handleConstruct(){
      const {svgData, elements, previewData} = this;
      const {svg, previewSvg} = this.$refs
      const propElements = this.elements;
      const propsExist = !!propElements;
      const target = previewSvg || svg;
      const data = previewData || svgData;
      let theme = data.theme || this.activeTheme;
      console.log('this.$refs', this.$refs);
      // console.log('svg ', data)
      console.log('svg theme', theme)
      
      if(!theme){
         alert('ERROR: no theme')
         return
      }
      console.log('data', theElements)
      const theElements = elements || data.elements;
      console.log('theElements', theElements)
      const childNode = target.firstChild;
      if(childNode){
       target.removeChild(childNode);
      }
      
      const theSvg =  SVG()
      .addTo(target) // mount instance to our target
      .viewbox(0, 0, data.canvasWidth, data.canvasHeight); // set the <svg /> viewBox attribute
      
      
      theSvg.clear();
      theSvg.attr({
        'preserveAspectRatio': "xMidYMid slice"
      });
      // TODO: 
      // 1. creat a container group
      // 2. create count the items in the grid;
      // 3. for each grid item, run the elements and make an object.
      // 4. make an array and assign these object into the array.
      // 5. attach the elements to each grid item in order. (forEach)
      const {canvasHeight = 1600, canvasWidth = 1600, gridRows = 1, gridCols = 1} = data;
      const patternWidth = Number(canvasWidth) / Number(gridCols); 
      const patternHeight = Number(canvasHeight) / Number(gridRows); 
      const gridItems = Number(gridRows) * Number(gridCols) || 1;
      const gridArray  = [...Array(gridItems || 1)];
      // gridArray.map((_, i) => {
      //   const theGroup = theSvg.group().attr({id: `g${i}`})
      //   // .rect().size(patternWidth, patternHeight);
      //   const patternContainer = theSvg.rect().size(patternWidth, patternHeight).fill('rgba(0,0,0,.3)').addTo(theGroup);
      //   const thePattern = theSvg
      //   .pattern(0, 0)
      //   .size(patternWidth, patternHeight)
      //   .attr({
      //     id: `p${i}`, x: 0, y: 0,
      //     patternUnits: "userSpaceOnUse",
      //     patternContentUnits: "userSpaceOnUse"
      //   })
      //   theSvg.circle().move(200, 200).size(400, 400).fill('lime').addTo(thePattern);
      //   patternContainer.attr({ fill: thePattern })
        
      //   this.renderRules(thePattern, data, null, theSvg)
      // })
      // console.log('gridArray', gridArray)
      // const theGroup = theSvg.group().attr({id: 'g1'})
      // const thePattern = theSvg
      //   .pattern(0, 0)
      //   .size(patternWidth, patternHeight)
      //   .attr({
      //     id: 'p1', x: 0, y: 0,
      //     patternUnits: "userSpaceOnUse",
      //     patternContentUnits: "userSpaceOnUse"
      //   })
      // const patternContainer = theSvg.rect().size(patternWidth, patternHeight).fill('#eee').addTo(theGroup);
      // theSvg.circle().move(200, 200).size(400, 400).fill('lime').addTo(thePattern);
      // patternContainer.attr({ fill: thePattern })
  //     <pattern id="pattern-circles" 
  //          x="0" 
  //          y="0" 
  //          width="20" 
  //          height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
  //    <circle id="pattern-circle" cx="10" cy="10" r="10" fill= "#f06d06" />
  // </pattern>
      
     
        
      // theElements.map(recipe => {
      //   console.log('recipe', recipe)
      //   const recipeType = recipe.type;
      //   if(!recipeType){
      //     console.error('no recipe type');
      //     return
      //   }
      //   const selectedMethod =  methodArray[recipeType];
        
      //   if(!selectedMethod){return }
      //   const iterationsArray = [...Array(Number(recipe.count || 1))];
      //   iterationsArray.map((_, i) => {
      //     this[selectedMethod](thePattern, data, recipe.options, recipe.mode)
      //   })        
      // })
      const gridWidthPercent = 1 / Number(gridRows);
      const gridHeightPercent = 1 / Number(gridCols);
      const gridUnitH = canvasWidth * gridWidthPercent;
      const gridUnitV = canvasHeight * gridHeightPercent;
      const gridTranslateH = gridWidthPercent * 100;
      // console.log('gridWidthPercent', gridWidthPercent, canvasWidth, gridUnitH, gridTranslateH)
      // console.log('gridWidthPercent gridTranslateH',  gridTranslateH)
      const isGrid = gridRows > 1 || gridCols > 1;
      if(isGrid){
        // CALCULATE GRID POSITIONS
        for(let i = 0; i <= gridRows -1; i++){
          console.log('gridRow: ', i, gridRows)
            for(let j=0; j <= gridCols -1; j++){
              const thisLeftAmount = j * gridUnitV
              const thisTopAmount = i * gridUnitH
                // console.log('thisleft, thisTop' , thisLeftAmount, thisTopAmount)
                const theGroup = theSvg.group('sdf').transform({scale: gridWidthPercent, translateX:thisLeftAmount, translateY: thisTopAmount})
                this.renderRules(theGroup, data, elements, theSvg)
                // let s = new Slot();
                // let gStyle = s.graph.style;
                // gStyle.left = j * SLOT_WIDTH + "px";
                // gStyle.top = i * SLOT_HEIGHT + "px";
                // gStyle.position = "absolute";
                // g.appendChild(s.graph);
            }
        }
      } else {
         // const theGroup = theSvg.group('sdf').transform({scale: gridWidthPercent, translateX:thisLeftAmount, translateY: thisTopAmount})
        this.renderRules(theSvg, data, elements, theSvg)
      }

      // const theGroup = theSvg.group().transform({scale: gridWidthPercent, translateX:0, translateY: 0})
      // this.renderRules(theGroup, data, elements, theSvg)
      // const group2 = theSvg.group().transform({scale: gridWidthPercent, translateX:gridUnitH, translateY: 0})
      // this.renderRules(group2, data, elements, theSvg)
      // const group3 = theSvg.group().transform({scale: gridWidthPercent, translateX:0, translateY: gridUnitV})
      // this.renderRules(group3, data, elements, theSvg)
      // const group4= theSvg.group().transform({scale: gridWidthPercent, translateX:gridUnitH, translateY: gridUnitV})
      // this.renderRules(group4, data, elements, theSvg)
    },
    renderRules(reference, data, elements, theSvg){
      const theElements = elements || data.elements;
      
      const methodArray = {
        background: 'drawBackground',
        line: 'drawLine',
        circle: 'drawCircle',
        rectangle: 'drawRectangle',
        triangle: 'drawTriangle',
        blob: 'drawBody',
      }
      
      if(!theElements){return}
      const groupElements =  theElements.map(recipe => {
        console.log('recipe', recipe)
        
        const recipeType = recipe.type;
        if(!recipeType){
          console.error('no recipe type');
          return
        }
        
        const selectedMethod =  methodArray[recipeType];
        
        if(!selectedMethod){return }
        const iterationsArray = [...Array(Number(recipe.count || 1))];
        return iterationsArray.map((_, i) => {
          return this[selectedMethod](reference, data, recipe.options, recipe.mode, theSvg)
        })        
      })
      console.log('groupElements', groupElements)
    },
    renderAnimation(reference, data, options, className){
      const {animationMode = 'generative',
        animationOffsetX,
        animationOffsetY,
        animationScale,
        animationRotation} = options
      // console.log('renderAnimation', reference, data, options, className);
      const randomCoordX = this.random(0 - data.canvasWidth / 4, data.canvasWidth / 4, true)
      const randomCoordY = this.random(0 - data.canvasHeight / 4, data.canvasHeight / 4, true)
      const randomScale = this.random(-0.5, 0.5, true)
      const generativeAnimationToString = `transform:  translateX(${randomCoordX || 0}px) translateY(${randomCoordY  || 0}px) scale(${1 + randomScale  || 1}) rotate(0deg);`
      const animationToString = `transform:  translateX(${animationOffsetX || 0}px) translateY(${animationOffsetY  || 0}px) scale(${animationScale  || 1}) rotate(${animationRotation}deg);`
      reference.attr({class: className})
        .style(`@keyframes test${className} { from {transform:  translateX(${0}px) translateY(${0}px) scale(1) rotate(0deg) ;} to { ${animationMode === 'generative' ? generativeAnimationToString : animationToString} }}`)
        .style(`.${className}`, {animation: `2s cubic-bezier(.65,0,.39,1) 0s infinite alternate test${className}`})
    },
    renderColor(reference, data, options, svg, theSvg){
      const {
        hasStroke = false, 
        hasFill = true, 
        useGradient = true,
        fillType = 'theme',
        fillColor,
        strokeColor,
        strokeSize,
        } = options
      const {settings, theme} = data
      const activeTheme = theme || this.activeTheme;
      // const hue = options && options.hue || this.random(0, 256, false); // hue range
      // const color = `hsl(${hue}, 50%, 50%)`
      const tempThemeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
      const reducedColors = activeTheme.colors.slice().filter(col => col !== tempThemeColor);
      const tempStrokeColor = strokeColor ||  reducedColors[this.random(0, reducedColors.length, false)]
      const tempStrokeSize = strokeSize || this.random(5, 30, false);
      let color1 = tempThemeColor;
      let color2 = tempStrokeColor;
      if(fillType === 'custom' && fillColor){
        color1 = fillColor;
      }
      // console.log('rendercolor color1', color1, useGradient)
      // console.log('rendercolor hasStroke', hasStroke, hasFill, fillType)
      // console.log('rendercolor fillColor', hasFill, fillColor, fillType)
      // const colorStroke = strokeColor || `hsl(${hue}, 90%, 70%)`
      // const size = mode === 'generative' ? this.random(Number(options.minSize), Number(options.maxSize), false) : Number(options.w);
      // const constraintW = data.canvasWidth
      // const constraintH = data.canvasHeight
      // const offsetX = 0 - size / 2;
      // const offsetY =0 - size / 2;
      // const startX =  mode === 'generative' ? this.random(offsetX, constraintW - size / 2, true) : Number(options.x);
      // const startY = mode === 'generative' ? this.random(offsetY, constraintH - size / 2, true) : Number(options.y);
      if(useGradient){
        var gradient = theSvg && theSvg.move(0,0).gradient('linear', function(add) {
          add.stop(0, tempThemeColor)
          add.stop(1, tempStrokeColor)
        })
        reference
          .stroke({
            width: hasStroke ? tempStrokeSize : 0,
            color: color2
          })
            // .fill('#2e2e2e')
          .fill(gradient)
        // console.log('renderColor color1', svg, theSvg);
      } else{
          reference
            .fill(hasFill ? color1 : 'transparent')
            .stroke({
              width: hasStroke ? tempStrokeSize : 0,
              color: color2
            })
        }
    },
    drawBackground(svg, data, options = {}, mode){
      const {settings, theme} = data
      const activeTheme = theme || this.activeTheme;
      const {width, height} = data;
      const centerX = width / 2 || 800;
      const centerY = height / 2 || 800;
      const {h, s, l, a, hex, fillColor, useGradient = false, fillType = 'theme', angle} = options;
      
      const hue1 = mode === 'generative' ? this.random(0, 256, false) : h; // hue range
      const hue2 = this.random(0, 256, false); // hue range
      const themeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
      // const themeColor = activeTheme.colors[0]
      const reducedColors = activeTheme.colors.slice().filter(col => col !== themeColor);
      const themeColor2 = reducedColors[this.random(0, reducedColors.length, false)]
console.log('drawbackground fillColor, fillType', fillColor, fillType)
      // const color1 = mode === 'generative' ? `hsl(${hue1}, ${s * 100}%, ${l * 100}%)` : `hsl(${hue1}, ${s * 100}%, ${l * 100}%)`;
      //const color2 = mode === 'generative' ? `hsl(${hue2}, ${s * 100}%, ${l * 100}%)` : `hsl(${hue2}, ${s * 100}%, ${l * 100}%)`;
      let color1 = fillColor || '#ffffff' || mode === 'generative' ? themeColor : `hsl(${hue1}, ${s * 100}%, ${l * 100}%)`;
      const color2 = mode === 'generative' ? themeColor2 : `hsl(${hue2}, ${s * 100}%, ${l * 100}%)`;
      if(fillType === 'custom' && fillColor){
        color1 = fillColor;
      }
      // const rotationAngle = 135 || settings.rotationOptions && 45 + Number(settings.rotationOptions[2]) || angle;
      const randomRotation = settings.rotationOptions && Math.floor(Math.random() * settings.rotationOptions.length) || 0
      const rotationAngle = 135 + settings.rotationOptions[randomRotation] || angle;
      const rotation = options.rotation || settings.rotationOptions[randomRotation];
      const directions = [
        // tl to br
        {
          x1: "0",
          y1: "0",
          x2: "100%",
          y2: "100%"
        },
        // top right to bottom left
        {
          x1: "100%",
          y1: "0",
          x2: "0%",
          y2: "100%"
        },
        // bottom left to top right
        {
          x1: "0%",
          y1: "100%",
          x2: "100%",
          y2: "0%"
        },
        // bottom right to top left
        {
          x1: "100%",
          y1: "100%",
          x2: "0%",
          y2: "0%"
        },
      ]
      const selectedDirection = directions[randomRotation] || directions[0]
      var gradient = svg.move(centerX, centerY).gradient('linear', function(add) {
        add.stop(0, color1)
        add.stop(1, color2)
      }).attr({
        ...selectedDirection
      }).transform({
        // rotate: rotationAngle,
      })
      //.attr('x', 50).
      console.log('drawBackground', useGradient, gradient, color1)
      svg.rect(data.canvasWidth, data.canvasHeight).move(0, 0)
      .fill(useGradient ? gradient : color1)
      .attr({
        class: 'bg'
      })
    },
    drawBody(svg, data, options = {}){
      const {theme} = data;
      const activeTheme = theme || this.activeTheme;
       const hue = options && options.hue || this.random(0, 256, false); // hue range
       const color = `hsl(${hue}, 50%, 50%)`
       const colorStroke = `hsl(${hue}, 90%, 70%)`
      // choose a random number of points
      const numPoints = this.random(5, 22);
      // step used to place each point at equal distances
      const angleStep = (Math.PI * 2) / numPoints;

      // keep track of our points
      const points = [];
      const size = this.random(data.canvasWidth / 20, data.canvasWidth / 4);
      const constraintW = data.canvasWidth
      const constraintH = data.canvasHeight
      // const startX = data.canvasWidth / 2 - size / 2;
      // const startY = data.canvasHeight / 2 - size / 2;
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
   
    async drawCircle(reference, data, options = {}, mode, theSvg){
      
      
      const {theme} = data;
      const activeTheme = theme || this.activeTheme;
      const {
        // hasStroke = false, 
        // hasFill = true, 
        useAnimation = false,
        
        } = options
      // const hue = options && options.hue || this.random(0, 256, false); // hue range
      // const color = `hsl(${hue}, 50%, 50%)`
      // const themeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
      // // const reducedColors = activeTheme.colors.slice().filter(col => col !== themeColor);
      // const strokeColor = reducedColors[this.random(0, reducedColors.length, false)]
      // const strokeSize = options.strokeSize || this.random(5, 30, false);
      // const colorStroke = strokeColor || `hsl(${hue}, 90%, 70%)`
      const size = mode === 'generative' ? this.random(Number(options.minSize), Number(options.maxSize), false) : Number(options.w);
      const constraintW = data.canvasWidth
      const constraintH = data.canvasHeight
      const offsetX = 0 - size / 2;
      const offsetY =0 - size / 2;
      const startX =  mode === 'generative' ? this.random(offsetX, constraintW - size / 2, true) : Number(options.x);
      const startY = mode === 'generative' ? this.random(offsetY, constraintH - size / 2, true) : Number(options.y);

      // var gradient = svg.move(0,0 ).gradient('linear', function(add) {
      //   add.stop(0, themeColor)
      //   add.stop(1, strokeColor)
      // })
      
      const thisClass = `dot${this.random(0, 2560000, false)}`;
      const thisCircle =  reference.ellipse(size, size)
        .move(startX, startY)
        // .stroke({
        //   width: hasStroke ? strokeSize : 0,
        //   color: colorStroke
        // })
        // .fill(hasFill ? gradient : 'transparent')

      console.log('about to drawcircle', svg, theSvg)
        this.renderColor(thisCircle, data, options, svg, theSvg)

        //// ANIAMTION /////
        if(useAnimation){
          // const randomCoordX = this.random(0 - data.canvasWidth / 4, data.canvasWidth / 4, true)
          // const randomCoordY = this.random(0 - data.canvasHeight / 4, data.canvasHeight / 4, true)
          // const randomScale = this.random(-0.5, 0.5, true)
          // console.log('randomScale', randomScale)
          // const generativeAnimationToString = `transform:  translateX(${randomCoordX || 0}px) translateY(${randomCoordY  || 0}px) scale(${1 + randomScale  || 1}) rotate(0deg);`
          // const animationToString = `transform:  translateX(${animationOffsetX || 0}px) translateY(${animationOffsetY  || 0}px) scale(${animationScale  || 1}) rotate(${animationRotation}deg);`
          this.renderAnimation(thisCircle, data, options, thisClass);
          // thisCircle.attr({class: thisClass})
          //     .style(`@keyframes test${thisClass} { from {transform:  translateX(${0}px) translateY(${0}px) scale(1) rotate(0deg) ;} to { ${animationMode === 'generative' ? generativeAnimationToString : animationToString} }}`)
          //     .style(`.${thisClass}`, {fill: themeColor, animation: `2s ease-in-out 0s infinite alternate test${thisClass}`})
        }
        console.log('thisCircle', thisCircle)
      return thisCircle   
    },
    
    async drawTriangle(svg, data, options = {}, mode){
      const {theme} = data;
      const activeTheme = theme || this.activeTheme;
      const hue = options && options.hue || this.random(0, 256, false); // hue range
      const {settings} = data;
      const { hasStroke = false, hasFill = true} = options;
      const themeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
      const strokeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
      const strokeSize = options.strokeSize || this.random(5, 30, false);
      const colorStroke = strokeColor || `hsl(${hue}, 90%, 70%)`
      const randomRotation = settings.rotationOptions && Math.floor(Math.random() * settings.rotationOptions.length);
      const rotation = options.rotation || settings.rotationOptions[randomRotation];
      const {x, y, w, h} = options;
      const size = mode === 'generative' ? this.random(Number(0), Number(Number(w)), true) : Number(options.w);
      const constraintW = data.canvasWidth
      const constraintH = data.canvasHeight
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
            .stroke({
              width: hasStroke ? strokeSize : 0,
              color: colorStroke
            })
            .rotate(tempRotationOffset)
          })
          
        } else {
          const color = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
       
          let trianglePath = `M${startX},${startY} L`;
          trianglePath = trianglePath + ` ${w},${h}`
          trianglePath = trianglePath + ` ${startX},${h}`
          trianglePath = trianglePath + ` Z`
          const theTriangle = svg
            .path(trianglePath)
              .fill(hasFill ? themeColor : 'transparent')
              .stroke({
                width: hasStroke ? strokeSize : 0,
                color: colorStroke
              })
              .rotate(rotation)
              // .class('dot')
              // .style('.dot', {fill: 'blue', animation: 'moveAcross 1s both ease-in-out'})
              // .style(`@keyframes moveAcross to {transform: translateX(400px);}`)
              // .animate({
              //     duration: 2000,
              //     delay: 1000,
              //     when: 'now',
              //     // swing: true,
              //     // times: 5,
              //     wait: 2000
              //   }).ease().rotate(rotation).loop(true, true);
              // this.renderAnimation(thisCircle, data, options, thisClass);
              this.renderColor(theTriangle, data, options, svg)
        }

      
    },
   async drawRectangle(svg, data, options = {}, mode){
     const {settings} = data;
     const {theme} = data;
      const activeTheme = theme || this.activeTheme;
     const {useAnimation = false, hasStroke = false, hasFill = true} = options;

      //  const hue = options && options.hue || this.random(0, 256, false); // hue range
      //  const color = `hsl(${hue}, 50%, 50%)`
      //  const themeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
      //  const strokeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
      // const strokeSize = options.strokeSize || this.random(5, 30, false);
      // const colorStroke = strokeColor || `hsl(${hue}, 90%, 70%)`
       const randomRotation = settings.rotationOptions && Math.floor(Math.random() * settings.rotationOptions.length);
       const rotation = mode === 'generative' ? settings.rotationOptions[randomRotation] : (options.rotation || 0);
      const {x, y, w, h} = options;
      let rectanglePath = `M${Number(x)},${Number(y)} L`;
      rectanglePath = rectanglePath + ` ${Number(x) + Number(w)},${Number(y)}`
      rectanglePath = rectanglePath + ` ${Number(x) + Number(w)},${Number(y) + Number(h)}`
      rectanglePath = rectanglePath + ` ${Number(x)},${Number(y) + Number(h)}`
      rectanglePath = rectanglePath + ` Z`
        const thisClass = `dot${this.random(0, 2560000, false)}`;
        const thisRect = svg.path(rectanglePath)
          // .fill(hasFill ? themeColor : 'transparent')
          // .stroke({
          //   width: hasStroke ? strokeSize : 0,
          //   color: colorStroke
          // })
          // .attr({
          //   style: 'fill: red'
          // })
          // .rotate(rotation)
        this.renderColor(thisRect, data, options, svg, svg)
        if(useAnimation){
          this.renderAnimation(thisRect, data, options, thisClass);
        }
    },
    async drawLine(svg, data, options = {}, mode){
      const {settings} = data;
      const {theme} = data;
      const {useAnimation = false, hasFill, hasStroke} = options
      const activeTheme = theme || this.activeTheme;
       const hue = options && options.hue || this.random(0, 256, false); // hue range
       const themeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
       const color = themeColor || options.strokecolor || `hsl(${hue}, 50%, 50%)`
       const colorStroke = themeColor || options.strokeColor || `hsl(${hue}, 90%, 70%)`
       const randomRotation = settings.rotation || settings.rotationOptions && Math.floor(Math.random() * settings.rotationOptions.length);
      const rotation = Number(0) || options.rotation || settings.rotationOptions[randomRotation];
      
      const {x, y, w, h} = options;
      const size = mode === 'generative' ? this.random(Number(0), Number(Number(w)), true) : Number(options.w);
      const constraintW = Number(data.canvasWidth)
      const constraintH = Number(data.canvasHeight)
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
          let tempRotationOffset = options.rotation || Number(options.rotationOffset);
          // const randomRotation = settings.rotationOptions && Math.floor(Math.random() * settings.rotationOptions.length);
          const rotation = options.rotation || settings.rotationOptions[randomRotation];
          
          svg
            .line(pointX, pointY, tempEndX, tempEndY)
            .stroke({ width: options.strokeSize || 10, color: colorStroke })
            .attr({'stroke-linecap':'round'})
            .rotate(tempRotationOffset || 0)
          })
          
        } else {
        const thisClass = `line${this.random(0, 2560000, false)}`;
        const thisLine = svg
          .line(startX, startY, endX, endY)
          .stroke({ width: options.strokeSize || 10, color: colorStroke })
          .attr({'stroke-linecap':'round'})
          // .rotate(rotation)
          .rotate(rotation)
        if(useAnimation){
          this.renderAnimation(thisLine, data, options, thisClass);
        }
      }
    },
    random(min, max, float = false) {
      const val = Math.random() * (max - min) + min;
      if (float) {
        return val;
      }
      return Math.floor(val);
    },
    countBytes(){
      const {svg, previewSvg} = this.$refs
      const propElements = this.elements;
      const propsExist = !!propElements;
      const target = propsExist ? previewSvg : svg;
      const source = target.innerHTML;
      console.log('source', source.innerHTML)
      this.setSvgCode(source)
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
    }
  }

};
</script>


