<template>
  <div class="optionsControl  pa-2">
    <v-slide-x-reverse-transition>
      <edit-element
        v-if="showEdit" 
        :handleClose="handleClose" 
        :ruledata="editData"
        mode="edit"
        />
    </v-slide-x-reverse-transition>
    <div class="" v-if="!showNew">
      <v-slide-y-transition
        class="py-0"
        group
        tag="v-list"
      >
        <template v-for="(element, index) in svgData.elements"  >
           <div class="elementRow row" :key="`element${index}`" >
             <div class="col-1 col">
             <v-icon medium v-if="element.type==='background'">mdi-square</v-icon>
             <v-icon medium v-if="element.type==='polygon'">mdi-vector-polygon</v-icon>
              <v-icon medium v-if="element.type==='circle'">mdi-vector-circle</v-icon>
              <v-icon medium v-if="element.type==='triangle'">mdi-vector-triangle</v-icon>
              <v-icon medium v-if="element.type==='rectangle'">mdi-vector-rectangle</v-icon>
              <v-icon medium v-if="element.type==='line'">mdi-vector-line</v-icon>
              <v-icon medium v-if="element.type==='blob'">mdi-vector-ellipse</v-icon>
             </div>
             <div class="col col-6">
               <label>{{element.type}}</label>
               <div>{{element.label}}</div>
               <div>({{element.mode}} {{element.count}})</div>
             </div>
            
              <div class="col col-5">
                <div class="buttonRow">
                <v-btn
                  rounded
                  small
                  depressed
                  @click="() => handleRemoveElement(element.id)">x
                </v-btn>
                <v-btn
                  rounded
                  small
                  depressed
                  @click="() => handleDuplicateElement(index)"
                  >
                    <v-icon small>mdi-content-copy</v-icon>
                </v-btn>
                <v-btn
                  rounded
                  small
                  depressed
                  @click="moveElement(index, 'up')"
                  >
                    <v-icon  small>mdi-arrow-up-bold</v-icon>
                </v-btn>
                <v-btn
                  rounded
                  small
                  depressed
                  @click="moveElement(index, 'down')"
                  >
                    <v-icon small>mdi-arrow-down-bold</v-icon>
                </v-btn>
                <v-btn
                  rounded
                  small
                  depressed
                  @click="() => handleEditElement(index)"
                  >
                    <v-icon small>mdi-cog</v-icon>
                </v-btn>
                </div>
              </div>
           </div>
        </template>
            </v-slide-y-transition>
             <v-btn block @click="() => {this.showNew = !this.showNew}" ><v-icon>mdi-plus-box</v-icon>add element</v-btn> 
          </div>


          <v-slide-x-reverse-transition>
          <div class="newElement panel" v-if="showNew">
            <v-card >
            <v-card-title><label>New Element</label></v-card-title>
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
                
                <div class="row" v-if="tabView === 'meta'">
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
                </div>
                <div class="row" v-if="tabView === 'meta'">
                  <div class="col ">
                    <label>Label</label><br />
                      <v-text-field small filled clearable outlined dense v-model="newElementLabel" hint="text identifier for clarity">
                    </v-text-field>
                  </div>
                </div>
                <div class="row" v-if="tabView === 'meta'">
                  <div class="col">
                    <label>Mode</label><br />
                    <v-btn-toggle 
                      v-model="toggle_mode"
                      dense
                    >
                      <v-btn small v-for="(item, index) in modeArray" :key="index" :color="toggle_mode === index ? 'primary' : 'secondary'">
                        {{item}}
                      </v-btn>
                    </v-btn-toggle>
                    
                    <p class="text-body2" v-if="modeArray[toggle_mode] === 'static'">A single element</p>
                    <p class="text-body2" v-if="modeArray[toggle_mode] === 'repeating'">Repeat element with offset values</p>
                    <p class="text-body2" v-if="modeArray[toggle_mode] === 'generative'">Randomly positioned elements</p>
                  </div>
                  <div class="col">
                    <label>Count</label><br />
                    <v-text-field  filled outlined dense v-model="newElementCount" />
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
              <v-btn color="primary" small @click="() => handleAddElement()" :disabled="isNaN(toggle_type)">Add</v-btn> 
              <v-btn outlined small @click="() => {this.showNew = false}">Cancel</v-btn> 
              <span class="body-2 pl-4" v-if="isNaN(toggle_type)">Select a rule type</span>
            </v-card-actions>
              
            </v-card>
          </div>
          </v-slide-x-reverse-transition> 
  
  
  </div>
</template>

<style lang="scss">
.optionsControl{
  // width: 100%;
  // background: #333;
  height: 100%;
  // overflow: scroll;
  // position: relative;
  flex-basis: 100%;
  flex-shrink: 1;
  flex-grow: 0;
}
.newElement.panel{
  box-shadow: 0 0 1rem black;
  position: absolute;
  z-index: 99999;
  left: 1rem;
  right: 1rem;
  bottom: 2rem;
  top: 1rem;
  &.edit{
    background: #333;
    border-radius: .5rem;
    border: 1px solid var(--line-color);
  }
  
  // height: 100%;
  &:before{
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    content: "";
  }
  .panelrow{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .panelitem{
    flex-basis: 50%;
    flex-shrink: 0;
    &.previewpanel{
      border-right: 1px solid var(--line-color);
      .previewcontainer{
        width: 100%;
        justify-content: center;
        display: flex;
      }
    }
  }
  .v-card.v-sheet{
    height: 100%;
    border: 1px solid var(--line-color);
    display: flex;
    flex-direction: column;
    .v-card__title{
      padding-top: .25rem;
      padding-bottom: .25rem;
      border-bottom: 1px solid var(--line-color);
    }
    .v-card__text{
      overflow: scroll;
      border-bottom: 1px solid var(--line-color);
      
    }
  }
}
.elementRow{
  margin: .25rem 0;
  background: var(--line-color);
  padding: .25rem;
  border-radius: .5rem;
}
.v-btn.typeSelectButton{
  height: 40px !important;
}
.typeSelectButton .v-btn__content{
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.buttonRow{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  > .v-btn{
    // border: 1px solid var(--line-color);
    border-radius: 2px;
    &:first-child{
      border-radius: .75rem 0 0 .75rem;
    }
    &:last-child{
      border-radius: 0 .75rem  .75rem 0 ;
    }
  }
}
.typeSelectWrap{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(10rem, 100%), 1fr));
  grid-auto-rows: 1fr; 
  gap: 0px 0px; 
}
.tabrow{
  display: flex;
  align-items: center;
  justify-content: center;
  .newRuleTabButton{
    border-radius: 0px;
    background-color: #333;
    &:first-child{
      border-radius: 4px 0 0 4px;
    }
    &:last-child{
      border-radius: 0 4px  4px 0 ;
    }
  }
}
</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { v4 as uuidv4 } from 'uuid';
import RecipeTriangle from './RecipeTriangle.vue';
import RecipeRectangle from './RecipeRectangle.vue';
import { dialog } from '@devlop-ab/dialog';
import RuleTransform from './RuleTransform.vue';
import RuleOffset from './RuleOffset.vue';
export default {
  components: { RecipeTriangle, RecipeRectangle, RuleTransform, RuleOffset },
  data() {
    return {
      tabView: 'meta',
      showNew: false,
      showEdit:false,
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
      editData: null,
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
    const {svgData} = this;
    // console.log('svgData', svgData)
    if(!svgData){return}
    const {elements} = svgData
    this.elements = elements;
    this.setNewElementOptions();
  },
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      // SVG
      svgData: "svgFormStore/svgData",
      previewBytes: "svgFormStore/previewBytes",
    }),
    newRuleOptions(){
      const {typeArray, 
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
      // console.log('newRuleoptions type', type, typeArray, toggle_type)
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
      const {  typeArray, toggle_type, modeArray, toggle_mode, newElementLabel, newElementCount } = this
      const type = typeArray[toggle_type]
      const mode = modeArray[toggle_mode]
      console.log('newRule', {type, mode})
      // const selectedTranforms = this.newElementTransforms;
      // const {rotation, minSize, maxSize, example} = selectedTranforms
      const selectedOptions = this.newRuleOptions;
      console.log('newrule selectedOptions', selectedOptions)
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
      this.showEdit = false
    },
    handleEditElement(index){
      const {svgData} = this;
      const {elements} = svgData;
      const sourceElement = elements[index];
      this.editData = sourceElement
      this.showNew = false
      this.showEdit = true
    },
    handleClose(){
      this.showEdit = false
      this.editData = null
    },
    setNewElementOptions(){
      const {svgData} = this;
      this.newElementOptions.w = svgData.canvasWidth;
      this.newElementOptions.h = svgData.canvasHeight;
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
    arrayMove(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      return arr
    }
    
    
  },
};
</script>


