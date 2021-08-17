<template>
  <div class="element panel">
    <label>Triangle Element</label>
    <div class="row">
      <div class="col">
        <label>X</label><br />
          <v-text-field filled outlined dense v-model="localOptions.x" />
      </div>
      <div class="col">
        <label>Y</label><br />
          <v-text-field filled outlined dense v-model="localOptions.y" />
      </div>
      <div class="col">
        <label>W</label><br />
          <v-text-field filled outlined dense v-model="localOptions.w" />
      </div>
      <div class="col">
        <label>H</label><br />
          <v-text-field filled outlined dense v-model="localOptions.h" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Rotation</label><br />
          <!-- <v-text-field filled outlined dense v-model="localOptions.rotation" /> -->
          <v-btn-toggle 
            dense
          >
            <v-btn small v-for="(item, index) in rotationOptions" :key="index" @click="() => handleRotate(item)">
              {{item}}
            </v-btn>
          </v-btn-toggle>
      </div>
      <div class="col">
        
      </div>
      <div class="col">
        
      </div>
      <div class="col">
        
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { v4 as uuidv4 } from 'uuid';
export default {
  props: ['value'],
  data() {
    return {
      localOptions: {
        x: 101,
        y: 102,
        w: 103,
        h: 104,
        rotation: 0
      },
      rotationOptions: [0, 90, 180, 270],
      newElementX: 100,
      newElementY: 100,
      newElementW: 40,
      newElementH: 30,
      toggle_count: 1,
      elements: [],
      // These are the validation arrays
    };
  },
  created(){
    // const {svgData} = this;
    // if(!this.value ){
    //   console.log('NO VALUE');

    // }
  },
  
  watch: {
    value: {
      handler(newValue) {
        // this.internalTags = [...newValue];
        console.log('newValue', newValue)
        this.localOptions = newValue;
      },
      immediate: true,
    },
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(container) {
        this.$emit('input', elOptions)
      }
    },
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
    updateValue: function (value) {
      this.$emit('input', value);
    },
    handleRotate(rotation){
      console.log('rotation', rotation);
      this.localOptions.rotation = rotation
    },
    handleCancel(){
      console.log('cancel')
    },
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


