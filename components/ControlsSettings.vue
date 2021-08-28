<template>
  <div class="col">
    <h3>Settings</h3>
    <settings-canvas :value.sync="tempSettings" />
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
      },
    };
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
      console.log('here')
      const {
        svgData, 
        tempSettings
      } = this;
      const {canvasWidth, canvasHeight}= tempSettings
      // const {elements} = svgData;
      // const selectedType = typeArray[toggle_type];
      // const selectedMode = modeArray[toggle_mode];
      console.log('applySettings ', tempSettings,)
      const newData = {...svgData, canvasWidth: Number(canvasWidth), canvasHeight: Number(canvasHeight)}
      this.setSvgData(newData);
    }
  },
};
</script>


