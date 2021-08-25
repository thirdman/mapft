<template>
  <div class="optionsControl  pa-2">
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
                </div>
              </div>
           </div>
        </template>
            </v-slide-y-transition>
             <v-btn block @click="() => {this.showNew = !this.showNew}"><v-icon>mdi-plus-box</v-icon>add element</v-btn> 
          </div>
          <v-slide-x-reverse-transition>
          <div class="newElement panel" v-if="showNew">
            <v-card >
            <v-card-title><label>New Element</label></v-card-title>
            <v-card-text>
              <div class="col pa-0">
                <label>Label</label><br />
                  <v-text-field filled clearable dense v-model="newElementLabel" hint="text identifier for clarity">
                </v-text-field>
              </div>
              <div class="row">
                <div class="col">
                <label>Type</label><br />
                <v-btn-toggle 
                  v-model="toggle_type"
                  dense
                  @change="handleType"
                >
                  <v-btn small v-for="(item, index) in typeArray" :key="index" class="typeSelectButton">
                    <v-icon small v-if="item==='background'">mdi-square</v-icon>
                    <v-icon small v-if="item==='polygon'">mdi-vector-polygon</v-icon>
                    <v-icon small v-if="item==='circle'">mdi-vector-circle</v-icon>
                    <v-icon small v-if="item==='triangle'">mdi-vector-triangle</v-icon>
                    <v-icon small v-if="item==='rectangle'">mdi-vector-rectangle</v-icon>
                    <v-icon small v-if="item==='line'">mdi-vector-line</v-icon>
                    <v-icon small v-if="item==='blob'">mdi-vector-ellipse</v-icon>
                    {{item}}
                  </v-btn>
                </v-btn-toggle>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label>Mode</label><br />
                  <v-btn-toggle 
                    v-model="toggle_mode"
                    dense
                  >
                    <v-btn small v-for="(item, index) in modeArray" :key="index">
                      {{item}}
                    </v-btn>
                  </v-btn-toggle>
                </div>
                <div class="col" v-if="toggle_mode === 0 || toggle_mode === 2">
                  <label>Count</label><br />
                  <v-text-field  filled outlined dense v-model="newElementCount" />
                </div>
              </div>

              <v-divider />
              <recipe-background :value.sync="backgroundElementOptions" v-if="typeArray[toggle_type] === 'background'" />
              <recipe-rectangle :value.sync="newElementOptions" v-if="typeArray[toggle_type] === 'rectangle'" />
              <recipe-triangle :value.sync="newElementOptions" v-if="typeArray[toggle_type] === 'triangle'" />
              <recipe-circle :value.sync="newElementCircleOptions" v-if="typeArray[toggle_type] === 'circle'" />
              <recipe-line :value.sync="newElementLineOptions" v-if="typeArray[toggle_type] === 'line'" />
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" small @click="() => handleAddElement()">Add</v-btn> 
              <v-btn outlined small @click="() => {this.showNew = false}">Cancel</v-btn> 
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
  overflow: scroll;
  position: relative;
  flex-basis: 100%;
  flex-shrink: 1;
  flex-grow: 0;
}
.newElement.panel{
  
  height: 100%;
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
</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { v4 as uuidv4 } from 'uuid';
import RecipeTriangle from './RecipeTriangle.vue';
import RecipeRectangle from './RecipeRectangle.vue';
import { dialog } from '@devlop-ab/dialog';
export default {
  components: { RecipeTriangle, RecipeRectangle },
  data() {
    return {
      showNew: false,
      newElementLabel: "sdf",
      newElementCount: 1,
      newElementX: 100,
      newElementY: 100,
      newElementW: 40,
      newElementH: 30,
      modeArray: ['generative', 'static', 'repeating'],
      typeArray: ['rectangle', 'circle', 'polygon', 'line', 'triangle', 'blob', 'background'],
      toggle_type: 1,
      toggle_mode: 0,
      toggle_count: 1,
      elements: [],
      newElementOptions: {
        hue: null,
        x: 0,
        y: 0,
        w: 50,
        h: 110,
        rotation: 0,
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
      },
      backgroundElementOptions: {   
        type: 'gradient',
        "color": {},
        hex: "#609CD8",
        h: 200,
        l: 0.61,
        s: 0.60,
        angle: 45,
      }
    };
  },
  created(){
    const {svgData} = this;
    console.log('svgData', svgData)
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
    handleRemoveElement(id){
      if (!id) {return}
      const {svgData } = this;
      const {elements} = svgData;
      const temp = [...elements];
      const newArray = temp.filter(el => el.id !== id);
      this.setSvgElements(newArray);
    },
    handleAddElement(){
      const {svgData, toggle_mode, toggle_type, typeArray, modeArray, newElementLabel, newElementCount = 1, newElementOptions, newElementCircleOptions, backgroundElementOptions, newElementLineOptions} = this;
      const {elements} = svgData;
      const selectedType = typeArray[toggle_type];
      const selectedMode = modeArray[toggle_mode];
      let selectedOptions = selectedType === 'circle' ? newElementCircleOptions : newElementOptions;
      if(selectedType === 'background') {
        selectedOptions = backgroundElementOptions;
      }
      if(selectedType === 'line') {
        selectedOptions = newElementLineOptions
      }
        console.log('handleAddElement selectedOptions', selectedOptions)
      const newId = uuidv4();
      
      const tempObject = {
        label: newElementLabel,
        id: newId,
        mode: selectedMode,
        count: newElementCount,
        type: selectedType,
        options: selectedOptions
      }
      const newArray = elements.slice()
      newArray.push(tempObject)
      
      // this.elements = newArray
      this.setSvgElements(newArray);
      this.showNew = false
    },
    setNewElementOptions(){
      const {svgData} = this;
      this.newElementOptions.w = svgData.width;
      this.newElementOptions.h = svgData.height;
    },
    async moveElement(fromIndex, direction){

      console.log('fromINdex', fromIndex, direction)
      const {svgData} = this;
      const {elements} = svgData;
      const tempElements = [...elements];
      console.log('svgData tempElements', tempElements);
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


