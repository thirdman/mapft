<template>
  <div class="optionsControl  pr-2">
          <div class="" v-if="!showNew">
           <div v-for="(element, index) in svgData.elements" :key="`element${index}`" class="elementRow">
             <v-icon small v-if="element.type==='polygon'">mdi-vector-polygon</v-icon>
              <v-icon small v-if="element.type==='circle'">mdi-vector-circle</v-icon>
              <v-icon small v-if="element.type==='triangle'">mdi-vector-triangle</v-icon>
              <v-icon small v-if="element.type==='rectangle'">mdi-vector-rectangle</v-icon>
              <v-icon small v-if="element.type==='line'">mdi-vector-line</v-icon>
              <v-icon small v-if="element.type==='blob'">mdi-vector-ellipse</v-icon>
              {{element.label}}: {{element.type}}  ({{element.mode}} {{element.count}})
              <div><v-btn @click="() => handleRemoveElement(element.id)">x</v-btn></div>
           </div>
             <v-btn block @click="() => {this.showNew = !this.showNew}"><v-icon>mdi-plus-box</v-icon>add element</v-btn> 
          </div>
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
                >
                  <v-btn small v-for="(item, index) in typeArray" :key="index">
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
                <div class="col" v-if="toggle_mode === 0">
                  <label>Count</label><br />
                  <v-text-field  filled outlined dense v-model="newElementCount" />
                </div>
              </div>
              <v-divider />
              <!-- <div class="row">
                <div class="col">
                  <label>X</label><br />
                    <v-text-field filled outlined dense v-model="newElementX" />
                </div>
                <div class="col">
                  <label>Y</label><br />
                    <v-text-field filled outlined dense v-model="newElementY" />
                </div>
                <div class="col">
                  <label>W</label><br />
                    <v-text-field filled outlined dense v-model="newElementW" />
                </div>
                <div class="col">
                  <label>H</label><br />
                    <v-text-field filled outlined dense v-model="newElementH" />
                </div>
              </div> -->
              <recipe-triangle :value.sync="newElementOptions" />
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" small @click="() => handleAddElement()">Add</v-btn> 
              <v-btn outlined small @click="() => {this.showNew = false}">Cancel</v-btn> 
            </v-card-actions>
              
            </v-card>
          </div>
          
        
      <div>
        <ul>
          <li>Iterations</li>
          <li>postions</li>
          <li>colors: fill, stroke</li>
          <li>generative</li>
        </ul>
      </div>
      
    
      
  </div>
</template>

<style lang="scss">
.optionsControl{
  width: 100%;
}
.elementRow{
  margin: .5rem 0;
  background: var(--line-color);
  padding: .5rem;
  border-radius: .5rem;;
}
</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { v4 as uuidv4 } from 'uuid';
import RecipeTriangle from './RecipeTriangle.vue';
export default {
  components: { RecipeTriangle },
  data() {
    return {
      showNew: false,
      newElementLabel: "sdf",
      newElementCount: 1,
      newElementX: 100,
      newElementY: 100,
      newElementW: 40,
      newElementH: 30,
      modeArray: ['generative', 'static'],
      typeArray: ['rectangle', 'circle', 'polygon', 'line', 'triangle', 'blob'],
      toggle_type: 1,
      toggle_mode: 0,
      toggle_count: 1,
      elements: [],
      newElementOptions: {
        x: 0,
        y: 0,
        w: 50,
        h: 110,
        rotation: 0
      }
      // These are the validation arrays
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
      // setContractData: "svgFormStore/setContractData",
    }),
    handleRemoveElement(id){
      if (!id) {return}
      const {svgData } = this;
      const {elements} = svgData;
      const temp = [...elements];
      const newArray = temp.filter(el => el.id !== id);
      this.setSvgElements(newArray);
    },
    handleAddElement(){
      const {svgData, toggle_mode, toggle_type, typeArray, modeArray, newElementLabel, newElementCount = 1, newElementOptions} = this;
      const {elements} = svgData;
      const selectedType = typeArray[toggle_type];
      const selectedMode = modeArray[toggle_mode];
      const newId = uuidv4();
      
      const tempObject = {
        label: newElementLabel,
        id: newId,
        mode: selectedMode,
        count: newElementCount,
        type: selectedType,
        options: newElementOptions
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
    }
    
    
  },
};
</script>


