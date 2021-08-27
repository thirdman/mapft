<template>
  <div class="col">
    <label>Settings</label>
    
  </div>
</template>

<style lang="scss">


</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";


export default {
  data() {
    return {
      
    };
  },
  
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      // SVG
      svgData: "svgFormStore/svgData",
    }),
    ...mapFields("svgFormStore", [ "svgCode"
  ]),
  },
  
  methods: {
    ...mapMutations({
      setActiveTheme: "svgFormStore/setActiveTheme",      
    }),
    ...mapActions({
      // handleMintSvg: "svgFormStore/handleMintSvg",
      // setContractData: "svgFormStore/setContractData",
    }),
    handleSelectTheme(index){
      console.log(index)
      const  {themes} = this
      const selectedTheme = themes[index]
      this.setActiveTheme(selectedTheme);
    }
    
    
  },
};
</script>


