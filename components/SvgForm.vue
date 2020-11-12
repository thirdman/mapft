<template>
  <div
    id="svgForm"
    class="form column shadow"
    :class="svgMintStatus === 'error' ? 'error' : ''"
  >
    <!-- <DeployStatusInformation v-if="deployStatus !== 'ready'" /> -->
    <div class="fieldset metaContent" v-if="svgMintStatus !== 'completed'">
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
              class="w3-input"
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
            <input
              name="NFT Name"
              id="svgDescription"
              class="w3-input"
              type="string"
              required
              placeholder="Eg. This is my cool SVG"
              v-model="svgDescription"
            />
            <div>
              <span class="validationMessage">{{ errors[0] }}</span>
            </div>
          </div>
          <FormItemHelp
            required="false"
            message="Describe your svg."
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
              class="w3-input"
              type="string"
              required
              placeholder="My Cool Name"
              v-model="svgCreator"
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
              class="w3-input"
              type="string"
              required
              placeholder=""
              v-model="svgCode"
              rows="8"
              style="font-size: .675rem"
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

      
      
      <div class="devContent" v-if="devMode">
        <div class="divider" />

        <div class="row">
          <button @click="setDeployStatus('confirming')">set confirming</button>
          
          
        </div>
      </div>

    </div>
      <div
        class="fieldset actionContent formContent"
        id="fieldsetAction"
        style="padding-top: 0.5rem"
      >
        <h1 class="w3-xlarge" style="max-width: 1000px; margin: auto">
          <button
            id="h"
            class="w3-button w3-block w3-padding-large w3-black w3-margin-bottom"
            :disabled="!canMintSvg"
            @click="handleMintSvg"
          >
            MINT SVG TOKEN
          </button>
        </h1>
        <Button mode="secondary" size="medium" @click="() => setShowPreview(true)">
          Preview
        </Button>
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
    };
  },
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      activeContractId: "ui/activeContractId",
      activeContractName: "ui/activeContractName",
      activeContractSymbol: "ui/activeContractSymbol",
      // SVG
      showPreview: "svgFormStore/showPreview",
      canMintSvg: "svgFormStore/canMintSvg",
      svgMintStatus: "svgFormStore/svgMintStatus",
      svgFormStatusMessage: "svgFormStore/svgFormStatusMessage",
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
      setSvgMintStatus: "svgFormStore/setSvgMintStatus",
      resetSvgForm: "svgFormStore/resetSvgForm",
      setShowPreview: "svgFormStore/setShowPreview",
    }),
    ...mapActions({
      handleMintSvg: "svgFormStore/handleMintSvg",
      // setContractData: "svgFormStore/setContractData",
    }),
    updatePreview() {
      alert('up')
      // this.$store.commit("deployFormStore/addMetaTemplate", obj);
    }
  },
};
</script>


