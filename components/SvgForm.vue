<template>
  <div
    id="svgForm"
    class="col formnot svgFormColumn"
    :class="svgStatus === 'error' ? 'error' : ''"
  >
    
    <StatusInformationSvg
      displayMode="inline"
      :title="svgStatus"
      :status="svgStatus"
      :message="
        svgStatusMessage"
      :mintTransactionId="svgTransactionId"
      v-if="
        svgStatus === 'confirming' ||
        svgStatus === 'working' ||
        svgStatus === 'stillWorking' ||
        svgStatus === 'stillWorkingMore' ||
        svgStatus === 'checkTransaction' ||
        svgStatus === 'noContract' ||
        svgStatus === 'error'
      "
    />
    
    <div class="fieldset codeContent" v-if="svgStatus !== 'completed'">
      <div class="sectionNumber">1.</div>
      <div class="sectionTitle">
        <h6>Source Code</h6>
      </div>
      <div v-if="!svgCode">
        <v-btn color="primary" @click="compileCode">Compile Code</v-btn>
      </div>
      <ValidationProvider rules="required">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>SVG Code</label>
          <div class="validatedInputWrap">
            <textarea
              max="999"
              name="Svg Code"
              id="svgCreator"
              class="base-input codeInput"
              type="string"
              required
              placeholder=""
              v-model="svgCode"
              rows="14"
              style="font-size: .675rem"
              @change="countBytes"
            ></textarea>
          </div>

          <div>
            
            
          
              <span class="validationMessage">{{ errors[0] }}</span>
          
          </div>
          <FormItemHelp
            required="false"
            message="This is the SVG Code"
            data="{test: 'nice'}"
          />
        </div>
      </ValidationProvider>
      <div v-if="this.countBytes()">
        Length: {{this.countBytes()}} bytes / {{previewBytes}}
      </div>
    </div>
    <div class="row">
      <div class="col">
        <settings-meta :value.sync="tempMeta" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <v-btn 
          x-small 
          color="primary"
          @click="applySettings">Apply</v-btn>
      </div>
    </div>
    <div class="fieldset metaContent" v-if="svgStatus !== 'completed'">
      <div class="sectionNumber">2.</div>
      <div class="sectionTitle">
        <h6>Required Data</h6>
      </div>
      <ValidationProvider rules="required|min:3">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Title</label>
          <div>
            <input
              name="Title"
              id="svgTitle"
              class="base-input"
              type="string"
              max="99"
              required
              placeholder="Eg. My Cool Svg"
              v-model="svgTitle"
            />
            <div>
              <span class="validationMessage">{{ errors && errors[0] }}</span>
            </div>
          </div>
          <FormItemHelp
            required="true"
            message="The Name of the SVG"
            data="{test: 'nice'}"
          />
        </div>
      </ValidationProvider>
      <ValidationProvider rules="required">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>NFT Descrption</label>
          <div>
             <textarea
              name="NFT Name"
              id="svgDescription"
              class="base-input"
              type="string"
              required
              placeholder="Eg. This is my cool SVG"
              v-model="svgDescription"
            ></textarea>
            <div>
              <span class="validationMessage">{{ errors[0] }}</span>
            </div>
          </div>
          <FormItemHelp
            required="false"
            message="Describe your svg NFT."
            data="{test: 'nice'}"
          />
        </div>
      </ValidationProvider>


      <ValidationProvider rules="required">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>NFT Creator</label>
          <div>
            <input
              name="NFT Creator"
              id="svgCreator"
              class="base-input"
              type="string"
              required
              placeholder="My Cool Name"
              v-model="svgDescription"
            />
            <div>
              <span class="validationMessage">{{ errors[0] }}</span>
            </div>
          </div>
          <FormItemHelp
            required="false"
            message="Your name."
            data="{test: 'nice'}"
          />
        </div>
      </ValidationProvider>
    </div>

    <div class="devContent fieldset" v-if="devMode">
      <div class="row">
        <button @click="setSvgStatus({status: 'confirming'})">set confirming</button>
        <button @click="setSvgStatus({status: 'working'})">set working</button>
        <button @click="setSvgStatus({status: 'completed'})">set completed</button>
        
      </div>
    </div>
    <div
        class="fieldset actionContent formContent"
        id="fieldsetAction"
        style="padding-top: 0.5rem"
      >
        <!-- <Button
          :disabled="!this.svgCode"
          mode="primary"
          size="medium"
          @click="() => setShowPreview(true)"
          >
            Update Preview
        </Button> -->
        <h1 class="hero" style="">
          <v-btn
            large
            color="primary"
            id="h"
            class=""
            :disabled="!canMintSvg || previewBytes > 15000"
            @click="handleMintSvg(this)"
          >
            MINT NFT
          </v-btn>
        </h1>
        
        <Button mode="secondary" size="medium" @click="resetSvgForm">
          Reset Form
        </Button>
    </div>
      
  </div>
</template>

<style>
.menu {
  display: flex;
  flex-direction: row;
}

</style>

<script>
import { mapFields } from "vuex-map-fields";
import { mapMutations, mapGetters, mapActions } from "vuex";
import { ValidationProvider, extend } from "vee-validate";
import { required, min, email } from "vee-validate/dist/rules";

extend("min", {
  // (value) => {
  ...min,
  // return value.length >= 3
});
extend("required", {
  ...required,
  message: "This field is required",
});

export default {
  // name: 'DeployForm',
  components: {
    ValidationProvider,
  },
  data() {
    return {
      // These are the validation arrays
      errors: [],
      classes: [],
      
      tempMeta: {
        label: '',
        description: '',
        creator: '',
      },
    };
  },
  created(){
    const {label, description, creator}  = this.svgData;
    const newTempObj = {
      label, description, creator
    }
    this.tempMeta = newTempObj;
  },
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      activeContractId: "ui/activeContractId",
      activeContractName: "ui/activeContractName",
      activeContractSymbol: "ui/activeContractSymbol",
      // SVG
      svgData: "svgFormStore/svgData",
      showPreview: "svgFormStore/showPreview",
      previewBytes: "svgFormStore/previewBytes",
      canMintSvg: "svgFormStore/canMintSvg",
      svgStatus: "svgFormStore/svgStatus",
      svgStatusMessage: "svgFormStore/svgStatusMessage",
      svgFormStatusMessage: "svgFormStore/svgStatusMessage",
      svgTransactionId: "svgFormStore/svgTransactionId",
    }),
    
    
    // The `mapFields` function takes an array of
    // field names and generates corresponding
    // computed properties with getter and setter
    // functions for accessing the Vuex store.
    ...mapFields("svgFormStore", [ "svgFee", "svgTitle", "svgCreator", "svgDescription", "svgCode"
  ]),
  },

  methods: {
    ...mapMutations({
      setSvgStatus: "svgFormStore/setSvgStatus",
      resetSvgForm: "svgFormStore/resetSvgForm",
      setShowPreview: "svgFormStore/setShowPreview",  
      setBytes: "svgFormStore/setBytes",
      setSvgData: "svgFormStore/setSvgData",
      setSvgDescription: "svgFormStore/setSvgDescription",
      setSvgTitle: "svgFormStore/setSvgTitle",
      setSvgCreator: "svgFormStore/setSvgCreator",
    }),
    ...mapActions({
      handleMintSvg: "svgFormStore/handleMintSvg",
      // setContractData: "svgFormStore/setContractData",
    }),
    applySettings(){
      const {
        svgData, 
        tempMeta
      } = this;
      console.log('tempMata', tempMeta)
      const newData = {...svgData, ...tempMeta}
      if(newData.description){
        this.setSvgDescription(newData.description)
      }
      if(newData.creator){
        this.setSvgCreator(newData.creator)
      }
      if(newData.label){
        this.setSvgTitle(newData.label)
      }
      this.setSvgData(newData);
    },
    updatePreview() {
      alert('up')
      // this.$store.commit("deployFormStore/addMetaTemplate", obj);
    },
    compileCode(){
      console.log('here')
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


