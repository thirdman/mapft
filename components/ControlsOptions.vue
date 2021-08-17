<template>
  <div class="optionsControl">
          <div class="" v-if="!showNew">
           <div v-for="(element, index) in elements" :key="`element${index}`" class="elementRow">
             <v-icon small v-if="element.options.type==='polygon'">mdi-vector-polygon</v-icon>
              <v-icon small v-if="element.options.type==='circle'">mdi-vector-circle</v-icon>
              <v-icon small v-if="element.options.type==='triangle'">mdi-vector-triangle</v-icon>
              <v-icon small v-if="element.options.type==='rectangle'">mdi-vector-rectangle</v-icon>
              <v-icon small v-if="element.options.type==='line'">mdi-vector-line</v-icon>
              {{element.label}}: {{element.options.type}}  ({{element.mode}} {{element.options.count}})
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
              </div>
              <div class="col pa-0">
              <label>Type</label><br />
              <v-btn-toggle 
                v-model="toggle_type"
                dense
              >
              <!-- background-color="primary"
                dark -->
                <v-btn x-small v-for="(item, index) in typeArray" :key="index">
                  <v-icon small v-if="item==='polygon'">mdi-vector-polygon</v-icon>
                  <v-icon small v-if="item==='circle'">mdi-vector-circle</v-icon>
                  <v-icon small v-if="item==='triangle'">mdi-vector-triangle</v-icon>
                  <v-icon small v-if="item==='rectangle'">mdi-vector-rectangle</v-icon>
                  <v-icon small v-if="item==='line'">mdi-vector-line</v-icon>
                  {{item}}
                  
                </v-btn>
                <!-- <v-btn x-small>
                  rectangle
                </v-btn>

                <v-btn x-small>
                  Circle
                </v-btn >
                <v-btn x-small>
                  Polygon
                </v-btn>
                <v-btn x-small>
                  line
                </v-btn> -->
              </v-btn-toggle>
              </div>
              <div class="col pa-0">
              <label>Mode</label><br />
              <v-btn-toggle 
                v-model="toggle_mode"
                dense
              >
                <v-btn x-small v-for="(item, index) in modeArray" :key="index">
                  {{item}}
                </v-btn>
              </v-btn-toggle>
              </div>
              <div class="col pa-0">
              <label>Count</label><br />
              <v-btn-toggle 
                v-model="toggle_count"
                dense
              >
              <!-- background-color="primary"
                dark -->
                <v-btn>
                  1
                </v-btn>

                <v-btn>
                  2
                </v-btn>
                <v-btn>
                  3
                </v-btn>
                
              </v-btn-toggle>
              </div>
              <div>
                <ul>
                  <li>Iterations</li>
                  <li>postions</li>
                  <li>colors: fill, stroke</li>
                  <li>generative</li>
                </ul>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" small @click="() => handleAddElement()">Add</v-btn> 
              <v-btn outlined small @click="() => {this.showNew = false}">Cancel</v-btn> 
            </v-card-actions>
              
            </v-card>
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
export default {
  data() {
    return {
      showNew: false,
      newElementLabel: "sdf",
      newElementX: 100,
      newElementY: 100,
      newElementW: 40,
      newElementH: 30,
      modeArray: ['static', 'generative'],
      typeArray: ['rectangle', 'circle', 'polygon', 'line', 'triangle'],
      toggle_type: 1,
      toggle_mode: 0,
      toggle_count: 1,
      elements: [],
      // These are the validation arrays
    };
  },
  created(){
    const {svgData} = this;
    console.log('svgData', svgData)
    if(!svgData){return}
    const {elements} = svgData
    this.elements = elements
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
      resetSvgForm: "svgFormStore/resetSvgForm",
      setShowPreview: "svgFormStore/setShowPreview",  
      setBytes: "svgFormStore/setBytes"
    }),
    ...mapActions({
      handleMintSvg: "svgFormStore/handleMintSvg",
      // setContractData: "svgFormStore/setContractData",
    }),
    handleAddElement(){
      const {elements, toggle_mode, toggle_type, typeArray, modeArray, newElementLabel} = this;
      const selectedType = typeArray[toggle_type];
      const selectedMode = modeArray[toggle_mode];
      const newId = uuidv4();
      
      const tempObject = {
        label: newElementLabel,
        id: newId,
        mode: selectedMode,
        options: {
          type: selectedType,
        }
      }
      const newArray = elements.slice()
      newArray.push(tempObject)
      this.elements = newArray
      this.showNew = false
    }
    
    
  },
};
</script>


