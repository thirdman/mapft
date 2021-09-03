<template>
  <div class="newElement panel edit">
    <v-card >
      <v-card-title>
        <div class="row ma-0 pa-0" style="width: 100%">
          <div class="col">
            <label>{{mode}} Rule{{tempElementOptions.label}} - {{tempElementOptions.type}}</label>
              <v-btn @click="handleReset">reset</v-btn>
          </div>
        
          <div clas="col col1">
            <v-btn @click="handleClose" v-if="handleClose">x</v-btn>
          </div>
        </div>
        </v-card-title>
        <v-card-text class="panelrow row pa-0 ma-0">     
          <div class="panelitem previewpanel col  ma-0"> 
            <div class="previewcontainer">
              <PreviewSvg previewMode="edit" :elements="[newRuleElement]" svgRef="previewSvg" :useGrid="true" />
            </div>
          </div>
          <div class="panelitem col  ma-0 ">
            <div class="tabrow row ma-0">
              <v-btn   
                x-small
                depressed
                :color="tabView === 'meta' ? 'primary':'secondary'"
                @click="setRuleView('meta')"
                class="newRuleTabButton"
              >
                META
              </v-btn>
              <v-btn   
                x-small
                depressed
                elevation="0"
                :disabled="isNaN(toggle_type)"
                :color="tabView === 'position' ? 'primary':'secondary'"
                @click="setRuleView('position')"
                class="newRuleTabButton"
              >
                position
              </v-btn>
              <v-btn   
                x-small
                depressed
                :disabled="isNaN(toggle_type)"
                :color="tabView === 'transform' ? 'primary':'secondary'"
                @click="setRuleView('transform')"
                class="newRuleTabButton"
              >
                TRANSFORM
              </v-btn>
              <v-btn   
                x-small
                depressed
                :disabled="isNaN(toggle_type)"
                :color="tabView === 'animation' ? 'primary':'secondary'"
                @click="setRuleView('animation')"
                class="newRuleTabButton"
              >
                ANIMATION
              </v-btn>
            </div>
            <rule-info
              v-if="tabView === 'meta'"
              :type="tempElementOptions.type"
              :mode="mode"
              :rule="ruledata"
              :value.sync="tempElementOptions"
              />
              <!-- :value.sync="ruleOptions" -->
            <!-- <div class="row" v-if="tabView === 'meta'">
              <div class="col">
              <label>Type</label><br />
              <v-btn-toggle 
                v-model="toggle_type"
                dense
                @change="handleType"
                class="typeSelectWrap"
              >
                <v-btn small v-for="(item, index) in typeArray" :key="index" class="typeSelectButton">
                  <v-icon small v-if="item==='background'">mdi-square</v-icon>
                  <v-icon small v-if="item==='polygon'">mdi-vector-polygon</v-icon>
                  <v-icon small v-if="item==='circle'">mdi-vector-circle</v-icon>
                  <v-icon small v-if="item==='triangle'">mdi-vector-triangle</v-icon>
                  <v-icon small v-if="item==='rectangle'">mdi-vector-rectangle</v-icon>
                  <v-icon small v-if="item==='line'">mdi-vector-line</v-icon>
                  <v-icon small v-if="item==='blob'">mdi-vector-ellipse</v-icon>
                  <v-icon small v-if="item==='art'">mdi-cloud</v-icon>
                  {{item}}
                </v-btn>
              </v-btn-toggle>
              </div>
            </div> -->
            
            <div class="row" v-if="tabView === 'meta'">
              <div class="col">
                <label>Mode</label><br />
                <v-btn-toggle 
                  v-model="toggle_mode"
                  dense
                >
                  <v-btn
                    small
                    v-for="(item, index) in modeArray"
                    :key="index"
                    :color="toggle_mode === index ? 'primary' : 'secondary'"
                    @click="() => tempElementOptions.mode = item"
                    >
                    {{item}}
                  </v-btn>
                </v-btn-toggle>
                
                <p class="text-body2" v-if="modeArray[toggle_mode] === 'static'">A single element</p>
                <p class="text-body2" v-if="modeArray[toggle_mode] === 'repeating'">Repeat element with offset values</p>
                <p class="text-body2" v-if="modeArray[toggle_mode] === 'generative'">Randomly positioned elements</p>
              </div>
              <div class="col">
                <label>Count</label><br />
                <v-text-field  filled outlined dense v-model="tempElementOptions.count" />
              </div>
            </div>
            <div class="row" v-if="tabView=== 'position'">
              <div class="col">
              <recipe-background :value.sync="backgroundElementOptions" v-if="typeArray[toggle_type] === 'background'" />
              <recipe-rectangle :value.sync="newElementOptions" v-if="typeArray[toggle_type] === 'rectangle'" />
              <recipe-triangle :value.sync="newElementOptions" v-if="typeArray[toggle_type] === 'triangle'" />
              <recipe-circle :value.sync="newElementCircleOptions" v-if="typeArray[toggle_type] === 'circle'" />
              <recipe-line :value.sync="newElementLineOptions" v-if="typeArray[toggle_type] === 'line'" />
              <recipe-art :value.sync="newElementArtOptions" v-if="typeArray[toggle_type] === 'art'" />
              </div>
            </div>
            <div class="row" v-if="tabView=== 'position'">
              <div class="col">
                <rule-offset :value.sync="newElementOffsets" />
              </div>
            </div>
            <div class="row" v-if="tabView=== 'transform'">
              <div class="col">
                <rule-transform :value.sync="newElementTransforms" />
              </div>
            </div>
            <div class="row" v-if="tabView=== 'animation'">
              <div class="col">
                <rule-animation :value.sync="newElementAnimations" />
              </div>
            </div>
          </div>
              
        </v-card-text>
      <v-card-actions>
          <v-btn
          color="red" 
          small
          @click="() => handleUpdateRule()"
          v-if="mode === 'edit'"
          :disabled="isNaN(toggle_type)"
          >Update
          </v-btn>
        <v-btn outlined small @click="handleClose" v-if="handleClose">Cancel</v-btn> 
        <!-- <span class="body-2 pl-4" v-if="isNaN(toggle_type)">Select a rule type</span> -->
      </v-card-actions>          
    </v-card>
  </div>
</template>

<style lang="scss">

</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { v4 as uuidv4 } from 'uuid';
import RuleInfo from './RuleInfo.vue';
export default {
  props: {
    mode: { type: String, default: "new" },
    ruledata: { type: Object, default: null },
    handleClose: {type: Function, default: null},
  },
  data() {
    return {
      tabView: 'meta',
      showNew: false,
      newElementLabel: "New Rule",
      newElementCount: 1,
      newElementX: 100,
      newElementY: 100,
      newElementW: 40,
      newElementH: 30,
      modeArray: [ 'static', 'generative', 'repeating'],
      typeArray: ['rectangle', 'circle', 'polygon', 'line', 'triangle', 'blob', 'background', 'art'],
      toggle_type: null,
      toggle_mode: 0,
      toggle_count: 1,
      elements: [],
      editElement: null,
      ruleOptions: {
        rotationOffset: null,
        offsetX: 0,
        offsetY: 0,
        example: "goffset"
      },
      newElementAnimations: {
        useAnimation: false,
        animationMode: 'generative',
        animationOffsetX: 100,
        animationOffsetY: 100,
        animationScale: 1,
        animationRotation: 0,
      },
      newElementTransforms:{
        rotation: null,
        minSize: 100,
        maxSize: 900,
        
      },
      newElementOffsets:{
        rotationOffset: null,
        offsetX: 0,
        offsetY: 0,
        example: "goffset"
      },
      tempElementOptions: {
        hue: null,
        x: 0,
        y: 0,
        w: 50,
        h: 110,
        rotation: 0,
        hasStroke: true,
        hasFill: true,
        rotationOptions: [0, 90, 180, 270],
      },
      newElementOptions: {
        hue: null,
        x: 0,
        y: 0,
        w: 50,
        h: 110,
        rotation: 0,
        hasStroke: true,
        hasFill: true,
        rotationOptions: [0, 90, 180, 270],
      },
      newElementCircleOptions: {
        hue: null,
        x: 0,
        y: 0,
        w: 400,
        h: 400,
        minSize: 100,
        maxSize: 900,
        rotation: 0,
        hasStroke: true,
        hasFill: true,
        useGradient: true,
        rotationOptions: [0, 90, 180, 270],
      },
      newElementLineOptions: {
        x: 0,
        y: 0,
        w: 103,
        hex: '#ff00ff',
        h: 1,
        s: 50,
        l: 50,
        rotation: 0,
        rotationOffset: 0,
        type: 'gradient',
        offsetX: 0,
        offsetY: 20,
        strokeSize: 10,
        strokeColor: "#ff00ff",
        rotationOptions: [0, 90, 180, 270],
        transformX: 0,
        transformY: 0,
        iterations: 10,
        lineCap: 'round',
        hasStroke: true,
        hasFill: false,
      },
      backgroundElementOptions: {   
        type: 'gradient',
        "color": {},
        hex: "#609CD8",
        h: 200,
        l: 0.61,
        s: 0.60,
        angle: 45,
        hasStroke: true,
        hasFill: true,
      },
      newElementArtOptions: {   
        type: 'static',
        "color": {},
        hex: "#609CD8",
        h: 200,
        l: 0.61,
        s: 0.60,
        angle: 45,
        hasStroke: true,
        hasFill: true,
      },
    };
  },
  created(){
    const {ruledata} = this;
    const {svgData} = this;
    if(ruledata){
      console.log('ruledata', ruledata)
      const tempOptions = {...ruledata.options, 
        type: ruledata.type, 
        count: ruledata.count  || ruledata.options.label, 
        label: ruledata.label || ruledata.options.label, 
        // canvasWidth: ruledata.canvasWidth, 
        // canvasHeight: ruledata.canvasHeight
      }
      console.log('tempOptions', tempOptions)
      if(!tempOptions.label){
        tempOptions.label = "test"
      }
      this.ruleOptions = tempOptions;
      this.tempElementOptions = tempOptions;
      console.log('tempElementOptions is now: ',  this.tempElementOptions)
      const {elements} = ruledata;
      console.log('elements is now: ', elements)
      this.elements = elements;
      // this.setRuleOptions(ruledata);  
    }
    if(!svgData){return}
    const {elements} = svgData
    this.elements = elements;
    this.setRuleOptions(svgData);
  },
  // watch: {
  //   tempElementOptions: {
  //     handler(newValue) {
  //       console.log('tempElementOptions Updated', newValue)
  //     },
  //     immediate: true,
  //   },
  // },
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      // SVG
      svgData: "svgFormStore/svgData",
      previewBytes: "svgFormStore/previewBytes",
    }),
    compileOptions(){
      const {
      typeArray, 
      toggle_type, 
      newElementOptions, 
      newElementOffsets, 
      newElementAnimations,
      backgroundElementOptions, 
      newElementLineOptions, 
      newElementCircleOptions, 
      newElementArtOptions, 
      newElementCount
      } = this
      const type = typeArray[toggle_type]
      
      if(!type){return}
      let selectedOptions = newElementOptions; // default
      if(type === 'circle') {
        selectedOptions = newElementCircleOptions;
      }
      if(type === 'background') {
        selectedOptions = backgroundElementOptions;
      }
      if(type === 'line') {
        selectedOptions = newElementLineOptions
      }
      if(type === 'art') {
        selectedOptions = newElementArtOptions
      }
      const selectedTranforms = this.newElementTransforms;
      const mergedSelectedOptions = {...selectedOptions, ...selectedTranforms, ...newElementAnimations, ...newElementOffsets, count: newElementCount };
      
      return mergedSelectedOptions
    },
    newRuleElement(){
      const { mode,  ruledata, typeArray, toggle_type, modeArray, toggle_mode, newElementLabel, newElementCount } = this
      let source = ruledata || this.svgData;
      
      console.log('mode is', mode, source);
      if(mode === 'new'){
      const type = typeArray[toggle_type]
      const mode = modeArray[toggle_mode]
      console.log('newRule', {type, mode})
      const selectedOptions = this.compileOptions;
      const tempValue = {
        label: "test",
        id: newElementLabel || 'new rule',
        mode: mode,
        count: newElementCount ,
        type,
        options: selectedOptions,
      }
      console.log('newRule', tempValue)
      return !isNaN(toggle_type) ? tempValue : null
      } else {
        const {options} = ruledata
        const tempOptions = {...options}
        // this.ruleOptions = tempOptions;
        return tempOptions
      }
    }
    
    
    // The `mapFields` function takes an array of
    // field names and generates corresponding
    // computed properties with getter and setter
    // functions for accessing the Vuex store.
    
  },

  methods: {
    ...mapMutations({
      setSvgStatus: "svgFormStore/setSvgStatus",
      setSvgElements: "svgFormStore/setSvgElements",
      resetSvgForm: "svgFormStore/resetSvgForm",
      setShowPreview: "svgFormStore/setShowPreview",  
      setBytes: "svgFormStore/setBytes"
    }),
    ...mapActions({
      handleMintSvg: "svgFormStore/handleMintSvg",
      getColor: "svgFormStore/getColor",
      // setContractData: "svgFormStore/setContractData",
    }),
    handleType(){
      const {typeArray, toggle_type} = this;
      const typeValue = typeArray[toggle_type];
      this.newElementLabel = `new ${typeValue}`
    },
    setRuleView(tab){
      console.log('tab', tab)
      this.tabView = tab
    },
    handleRemoveElement(id){
      if (!id) {return}
      const {svgData } = this;
      const {elements} = svgData;
      const temp = [...elements];
      const newArray = temp.filter(el => el.id !== id);
      this.setSvgElements(newArray);
    },
    handleAddElement(){
      const {svgData, toggle_mode, toggle_type, typeArray, modeArray, newElementLabel, newElementOptions, newElementCircleOptions, backgroundElementOptions, newElementLineOptions} = this;
      const {elements} = svgData;
      const selectedType = typeArray[toggle_type];
      const selectedMode = modeArray[toggle_mode];
      console.log('add element newRuleElement', this.newRuleElement)
      
      const newId = uuidv4();
      
      const tempObject = {
        ...this.newRuleElement,
        id: newId,
      }
      const newArray = elements.slice()
      newArray.push(tempObject)
      this.setSvgElements(newArray);
      this.showNew = false
    },
    handleDuplicateElement(index){
      const {svgData} = this;
      const {elements} = svgData;
      const newId = uuidv4();
      const sourceElement = elements[index];
      const tempObject = {
        ...sourceElement,
        id: newId,
      }
      const newArray = elements.slice()
      newArray.push(tempObject)
      this.setSvgElements(newArray);
      this.showNew = false
    },
    handleEditElement(index){
      const {svgData} = this;
      const {elements} = svgData;
      const sourceElement = elements[index];
      this.editElement = sourceElement
      this.showNew = true
    },
    setRuleOptions(data){
      this.ruleOptions = data.options
      this.newElementOptions.w = data.canvasWidth;
      this.newElementOptions.h = data.canvasHeight;
    },
    async moveElement(fromIndex, direction){

      console.log('fromINdex', fromIndex, direction)
      const {svgData} = this;
      const {elements} = svgData;
      const tempElements = [...elements];
      // console.log('svgData tempElements', tempElements);
      if(!tempElements) {return}
      let sorted = [];
      if(direction === 'up'){
        sorted = this.arrayMove(tempElements, fromIndex, fromIndex - 1)
      }
      if(direction === 'down'){
        sorted = this.arrayMove(tempElements, fromIndex, fromIndex + 1)
      }
      console.log('sorted', sorted)
    //   await dialog.alert('Sorted.', {
    //     title: 'Array updated!',
    //     okText: 'ok!',
    // });
      this.setSvgElements(sorted);
    },
    handleUpdateRule(){
      const {elements} = this.svgData;
      console.log('handleupdate', this.tempElementOptions)
      // console.log('add element newRuleElement', this.newRuleElement)
      const sourceOptions = this.tempElementOptions;
      const tempObject = {
        ...this.ruledata,
        label: sourceOptions.label || this.ruledata.label,
        type: sourceOptions.type || this.ruledata.type,
        mode: sourceOptions.mode || this.ruledata.mode,
        count: sourceOptions.count || this.ruledata.count,
        options: sourceOptions,
      }
      console.log('tempObject', tempObject)
      if(!this.ruledata){ return};
      const tempArray = elements.slice()
      const indexToUpdate =  tempArray.findIndex(el => el.id === this.ruledata.id );
      if (indexToUpdate < 0){return}
      tempArray[indexToUpdate] = tempObject;
      console.log('tempArray', tempArray)
      this.setSvgElements(tempArray);
      this.handleReset()
      this.handleClose()
    },
    handleReset(){
      if(this.ruledata){
        this.tempElementOptions = this.ruledata.options
      }
    },
    arrayMove(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      return arr
    }
    
    
  },
};
</script>


