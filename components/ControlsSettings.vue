<template>
  <div class="col">
    <h3>Settings</h3>
    <settings-canvas :value.sync="tempSettings" />
    <settings-grid :value.sync="tempSettings" />
    <div class="row">
      <div class="col">
        <v-btn 
          x-small 
          color="primary"
          @click="applySettings">Apply</v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">


</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
import SettingsCanvas from './SettingsCanvas.vue';


export default {
  components: { SettingsCanvas },
  data() {
    return {
      tempSettings: {
        canvasWidth: 1600,
        canvasHeight: 1600,
        rotationOptions: [0, 90, 180, 270],
        grid: "1/1",
        gridCols: 1,
        gridRows: 1,
      },
      // tempMeta: {
      //   label: '',
      //   description: '',
      //   creator: '',
      // },
    };
  },
  created(){
    const sourceData = this.svgData;
    const newTempObj = {
      canvasWidth: sourceData.canvasWidth,
      canvasHeight: sourceData.canvasHeight,
      rotationOptions: sourceData.rotationOptions,
      gridCols: sourceData.gridCols || 1,
      gridRows: sourceData.gridRows || 1,
    }
    this.tempSettings = newTempObj
  },
  computed: {
    ...mapGetters({
      // SVG
      svgData: "svgFormStore/svgData",
    }),
    ...mapFields("svgFormStore", [ "svgCode"
  ]),
  },
  
  methods: {
    ...mapMutations({
      setSvgData: "svgFormStore/setSvgData",
    }),
    ...mapActions({
      // setContractData: "svgFormStore/setContractData",
    }),
    handleSelectTheme(index){
      console.log(index)
      const  {themes} = this
      const selectedTheme = themes[index]
      this.setActiveTheme(selectedTheme);
    },
    
    applySettings(){
      console.log('here', this)
      const {
        svgData, 
        tempSettings,
        // tempMeta
      } = this;
      const {canvasWidth, canvasHeight, gridRows, gridCols}= tempSettings
      // const {elements} = svgData;
      // const selectedType = typeArray[toggle_type];
      // const selectedMode = modeArray[toggle_mode];
      console.log('applySettings ', tempSettings,)
      const newData = {...svgData, canvasWidth: Number(canvasWidth), canvasHeight: Number(canvasHeight),  gridRows, gridCols}
      this.setSvgData(newData);
    }
  },
};
</script>


