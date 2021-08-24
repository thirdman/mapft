<template>
  <div class="codeControl">
        
          <label>SVG Code</label>
          <div class="validatedInputWrap">
            <textarea
              max="999"
              name="Svg Code"
              id="svgCreator"
              class="w3-input codeInput"
              type="string"
              required
              placeholder=""
              v-model="svgCode"
              rows="14"
              style="font-size: .675rem"
              @change="countBytes"
            ></textarea>
          </div>
          
        
      
      <div v-if="this.countBytes()">
        Length: {{this.countBytes()}} bytes / {{previewBytes}}
      </div>
    
    
    <div
        class="fieldset actionContent formContent"
        id="fieldsetAction"
        style="padding-top: 0.5rem"
      >
        <Button
          :disabled="!this.svgCode"
          mode="primary"
          size="medium"
          @click="() => setShowPreview(true)"
          >
            Update Preview
        </Button>
        
        
        
      </div>
      
  </div>
</template>

<style lang="scss">
.codeControl{
  width: 100%;
.codeInput{
  border: 1px solid var(--line-color);
  background: #222;
  color: #eee;
  font-family: monospace;
}
}
</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";


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
    ...mapFields("svgFormStore", [ "svgCode"
  ]),
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
    
    updatePreview() {

      console.log('test');
      

      // this.$store.commit("deployFormStore/addMetaTemplate", obj);
    },
    
    countBytes(){
      const source = this.svgCode;
      // const bytes = new TextEncoder().encode(source).length; 
      // const bytes = this.svgCode.length
      const bytes = Buffer.byteLength(source);
      const gasFee = 30;
      const transactionFee = bytes / 1000000 * gasFee;
      // const roundedFee = Math.round((transactionFee + Number.EPSILON) * 100) / 100;
      const roundedFee =parseFloat(transactionFee).toFixed(5);
      this.$store.commit("svgFormStore/setBytes", bytes);
      this.$store.commit("svgFormStore/setCalculatedFee", roundedFee);
      return bytes
    }
  },
};
</script>


