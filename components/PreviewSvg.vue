<template>
<div :class="`preview-position ${previewMode}`">
  <div class="svgPreviewWrap" >
    <div :id="svgRef || 'svg'" :ref="svgRef || 'svg'" :style="`${canvasStyle} ${showGrid ? 'svgsPreviewGrid' : ''}`" />
    <v-btn 
      v-if="previewMode === 'edit'" 
      @click="() => handleConstruct(_, _, this.$refs.svg)" >reload</v-btn>
  </div>
</div>

</template>

<style lang="scss">
  .preview-position{
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
  
  props: ['code', 'previewData', 'previewMode', 'elements', 'svgRef', 'calculateCode', 'setBytes', 'showGrid'],
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
    // console.log('mounted refs:', this.$refs)
    this.$nextTick(function() {
      const {svg} = this.$refs
      const ref = this.svgRef
      const propElements = this.elements;
      const propsExist = !!propElements;
      const target = propsExist ? ref : svg;
      // console.log('propElements', propElements, propsExist, target);
      if(!target){return}
        this.handleConstruct(_, _, target);
    });
    this.loading = false;
   if(this.calculateCode){
     console.log('should calculate code')
     this.countBytes()
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
        this.handleConstruct(_, _, target);
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
    ...mapActions({
      getColor: "svgFormStore/getColor",
    }),
    
    async handleConstruct(width, height, nottarget){
      const {svgData, elements, previewData} = this;
      const {svg, previewSvg} = this.$refs
      const propElements = this.elements;
      const propsExist = !!propElements;
      const target = propsExist ? previewSvg : svg;
      const data = previewData || svgData;
      // console.log('propElements', propElements, propsExist, target);
      const {theme} = data;

      console.log('svg theme', theme)
      const theElements = elements || data.elements;
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
      const methodArray = {
        background: 'drawBackground',
        line: 'drawLine',
        circle: 'drawCircle',
        rectangle: 'drawRectangle',
        triangle: 'drawTriangle',
        blob: 'drawBody',
      }
      // console.log('elements', target, theElements)
      if(!theElements){return}
      theElements.map(recipe => {
        const recipeType = recipe.type;
        const selectedMethod =  methodArray[recipeType];
        
        if(!selectedMethod){return }
        // console.log('recipe.count', recipe, recipe.count)
        const iterationsArray = [...Array(Number(recipe.count))];
        // console.log('iterationsArray', iterationsArray)
        iterationsArray.map((_, i) => {
          this[selectedMethod](theSvg, data, recipe.options, recipe.mode)
        })        
      })
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
    renderColor(reference, data, options, svg){
      const {
        hasStroke = false, 
        hasFill = true, 
        useGradient = true,
        } = options
      const {settings, theme} = data
      const activeTheme = theme || this.activeTheme;
      // const hue = options && options.hue || this.random(0, 256, false); // hue range
      // const color = `hsl(${hue}, 50%, 50%)`
      const themeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
      const reducedColors = activeTheme.colors.slice().filter(col => col !== themeColor);
      const strokeColor = reducedColors[this.random(0, reducedColors.length, false)]
      const strokeSize = options.strokeSize || this.random(5, 30, false);
      // const colorStroke = strokeColor || `hsl(${hue}, 90%, 70%)`
      // const size = mode === 'generative' ? this.random(Number(options.minSize), Number(options.maxSize), false) : Number(options.w);
      // const constraintW = data.canvasWidth
      // const constraintH = data.canvasHeight
      // const offsetX = 0 - size / 2;
      // const offsetY =0 - size / 2;
      // const startX =  mode === 'generative' ? this.random(offsetX, constraintW - size / 2, true) : Number(options.x);
      // const startY = mode === 'generative' ? this.random(offsetY, constraintH - size / 2, true) : Number(options.y);
      if(useGradient){
        var gradient = svg.move(0,0).gradient('linear', function(add) {
          add.stop(0, themeColor)
          add.stop(1, strokeColor)
        })
        reference
          // .fill('#2e2e2e')
          .stroke({
            width: hasStroke ? strokeSize : 0,
            color: strokeColor
          })
          .fill(gradient)
        }
        else{
          reference
            .fill(hasFill ? themeColor : 'transparent')
            .stroke({
              width: hasStroke ? strokeSize : 0,
              color: strokeColor
            })
        }
    },
    drawBackground(svg, data, options = {}, mode){
      const {settings, theme} = data
      const activeTheme = theme || this.activeTheme;
      const {width, height} = data;
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
      
      svg.rect(data.canvasWidth, data.canvasHeight).move(0, 0)
      .fill(type === 'gradient' ? gradient : color1)
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
   
    async drawCircle(svg, data, options = {}, mode){
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
      const thisCircle =  svg.ellipse(size, size)
        .move(startX, startY)
        // .stroke({
        //   width: hasStroke ? strokeSize : 0,
        //   color: colorStroke
        // })
        // .fill(hasFill ? gradient : 'transparent')

        this.renderColor(thisCircle, data, options, svg)
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
        this.renderColor(thisRect, data, options, svg)
        if(useAnimation){
          this.renderAnimation(thisRect, data, options, thisClass);
        }
    },
    async drawLine(svg, data, options = {}, mode){
      const {settings} = data;
      const {theme} = data;
      const {useAnimation = false} = options
      const activeTheme = theme || this.activeTheme;
       const hue = options && options.hue || this.random(0, 256, false); // hue range
       const themeColor = activeTheme.colors[this.random(0, activeTheme.colors.length, false)]
       const color = themeColor || options.strokecolor || `hsl(${hue}, 50%, 50%)`
       const colorStroke = themeColor || options.strokeColor || `hsl(${hue}, 90%, 70%)`
       
       // const randomRotation = settings.rotationOptions && settings.rotationOptions[Math.floor(Math.random() * settings.rotationOptions.length)];
       // const rotation = mode === 'generative' ? settings.rotationOptions[randomRotation] : (options.rotation || 0);
       // const rotation = options.rotation ? options.rotation : settings.rotationOptions[randomRotation] || 0;
       
       const randomRotation = settings.rotationOptions && Math.floor(Math.random() * settings.rotationOptions.length);
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
      // const bytes = new TextEncoder().encode(source).length; 
      // const bytes = this.svgCode.length
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


