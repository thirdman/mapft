<template>
  <div class="optionsControl">
        
          <label>SVG Code</label>
          <div class="">
           blah
          </div>
          
        
      
      
    
      
  </div>
</template>

<style lang="scss">
.optionsControl{
  width: 100%;
}
</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      // These are the validation arrays
    };
  },
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      // SVG
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
    
    
    
  },
};
</script>


