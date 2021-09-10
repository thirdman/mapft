<template>
  <div class="col codeControl">
    <div class="row">
      <div class="col">
        <label>SVG Code</label>
        <div class="validatedInputWrap">
          <textarea
            max="999"
            name="Svg Code"
            id="svgCreator"
            class="base-input code-input"
            type="string"
            required
            placeholder=""
            v-model="localSvgCode"
            rows="14"
            style="font-size: .675rem"
          ></textarea>
            <!-- @change="countBytes" -->
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <v-btn @click="applyCode">Apply</v-btn>
        <v-btn @click="resetSvgForm">Reset</v-btn>
      </div>
    </div>
      
      <!-- <div v-if="this.countBytes()">
        Length: {{this.countBytes()}} bytes / {{previewBytes}}
      </div> -->
    
    
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
}
  .code-input{
    border: 1px solid var(--line-color);
    background: #222;
    color: #eee;
    font-family: monospace;
  }
</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";


export default {
  data() {
    return {
      // These are the validation arrays
      localSvgCode: ''
    };
  },
  mounted(){
    this.supplyCode()
  },
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      // SVG
      defaultCode: "svgFormStore/defaultCode",
      svgCode: "svgFormStore/svgCode",
      previewBytes: "svgFormStore/previewBytes",
    }),
  },

  methods: {
    ...mapMutations({
      setSvgCode: "svgFormStore/setSvgCode",
      setSvgStatus: "svgFormStore/setSvgStatus",
      resetSvgForm: "svgFormStore/resetSvgForm",
      setShowPreview: "svgFormStore/setShowPreview",  
      setBytes: "svgFormStore/setBytes"
    }),
    ...mapActions({
      handleMintSvg: "svgFormStore/handleMintSvg",
      // setContractData: "svgFormStore/setContractData",
    }),
    
    // updatePreview() {
    //   console.log('test');
    //   // this.$store.commit("deployFormStore/addMetaTemplate", obj);
    // },
    supplyCode() {
      console.log('test', this.svgCode);
      this.localSvgCode = this.svgCode
      // this.$store.commit("deployFormStore/addMetaTemplate", obj);
    },
    applyCode() {
      console.log('test', this.localSvgCode);
      this.setSvgCode(this.localSvgCode)
      // this.$store.commit("deployFormStore/addMetaTemplate", obj);
    },
    
    countBytes(){
      const source = this.svgCode;
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


