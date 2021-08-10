<template>
  <div
    id="deployForm"
    class="form deploy column "
    :class="`${deployStatus === 'error' ? 'hasError' : ''} ${displayMode === 'inline' ? 'noshadow' : 'shadow'}`"
  >
  <div v-if="!walletAddress" class="small">
    WalletAddress: Missing wallet Address. This simetimes occurs when your browser security stops access to your wallet. Try disconnect/reconnect in the settings section.
  </div>
    <DeployStatusInformation v-if="deployStatus !== 'ready' && deployStatus !== 'competed'" />
    <div class="fieldset error" v-if="deployStatus === 'error'" >
      <h4>Error</h4>
    </div>
    <div class="fieldset metaContent" v-if="deployStatus !== 'completed'" :class="`${(deployStatus === 'ready' || deployStatus === 'error') ? '' : 'hidden'}`">
      <!-- <ValidationProvider rules="required|min:3"> -->
        <ValidationProvider rules="required|min:3">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Symbol</label>
          <div>
            <input
              name="Symbol"
              id="j"
              class="w3-input small"
              type="string"
              max="99"
              required
              placeholder="Eg. ETH"
              style="text-transform: uppercase"
              v-model="symbol"
            />
            <div>
              <span class="validationMessage">{{ errors && errors[0] }}</span>
            </div>
          </div>
          <FormItemHelp
            required="true"
            message="Min length: 3. This is the symbol associated with the tokens created by your
                personalized contract."
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
          <label>NFT Name</label>
          <div>
            <input
              name="NFT Name"
              id="i"
              class="w3-input"
              type="string"
              required
              placeholder="Eg. Crypt0 Kytty Punkz"
              v-model="name"
            />
            <div>
              <span class="validationMessage">{{ errors[0] }}</span>
            </div>
          </div>
          <FormItemHelp
            required="true"
            message="This is the name of your own personal contract."
            data="{test: 'nice'}"
          />
        </div>
      </ValidationProvider>


    </div>
    <!-- OPTIONAL SECTION -->
    <div v-if="devMode" class="fieldset" :class="`${(deployStatus === 'ready' || deployStatus === 'error') ? '' : 'hidden'}`">
      <div class="formItem">
        <h6>Custom Meta Templates</h6>
      </div>
      <div class="row">
        <div class="column columnHeader"><label>ID</label></div>
        <div class="column columnHeader"><label>TYPE</label></div>
        <div class="column columnHeader">
          <label> REQUIRED </label>
        </div>
        <div class="column columnHeader"><label>Help Text</label></div>
        <div class="column columnHeader btn-column">
          <label style="min-width: 80px; display: inline-block">&nbsp;</label>
        </div>
      </div>
      <div v-for="(item, index) in metaTemplatesObj" :key="index">
        <MetaTemplateView
          :removeAction="removeMetaTemplate"
          :template="item"
        />
      </div>
      <div class="metaFieldsWrap">
        <div id="templateFields"></div>
      </div>
      <div v-if="showNewMetaTemplate">
        <MetaTemplateAdd
          :addAction="addMetaTemplate"
          :cancelAction="setShowNewMetaTemplate"
        />
      </div>
      <!-- META TEMPLATE -->
      <div id="newMetaTemplate" class="hidden" style="padding-top: 1rem">
        <div class="divider"></div>
        <div class="formItem">
          <h6>New Meta Template</h6>
          <p class="help">
            Templates allow you to define data fields that will appear on the
            minting form when this contract is used. This does NOT save data,
            but rather defines a template for collecting data.
          </p>
          <div class="formItem required">
            <label>Unique ID</label>
            <p class="help"></p>
            <input
              id="newId"
              class="w3-input small"
              type="string"
              max="999"
              onChange='updateTemplateField(event, "id");'
            />
            <div class="itemHelp">
              <div class="helpIcon"><IconHelp strokeClass="light" /></div>
              <div class="helpContent">
                <p>
                  A unique id string used to identify this content. No spaces
                  or special characters. Eg. "infourl"
                </p>
              </div>
            </div>
          </div>
          <div class="formItem required">
            <label>Display Title</label>
            <input
              id="newId"
              class="w3-input"
              type="string"
              max="999"
              onChange='updateTemplateField(event, "name");'
            />
            <div class="itemHelp">
              <div class="helpIcon"><IconHelp strokeClass="light" /></div>
              <div class="helpContent">
                <p>
                  The label that will appear above the field. Can be the same
                  as ID. Eg. "Info Url"
                </p>
              </div>
            </div>
          </div>

          <div class="formItem required">
            <label>Type</label>
            <div class="buttonGroup">
              <button
                class="btn btn-small w3-black selected"
                onClick='alert("body", "lemon")'
              >
                Text
              </button>
              <button class="btn btn-small" onClick='alert("body", "lemon")'>
                Long Text
              </button>
              <button class="btn btn-small" onClick='alert("body", "lemon")'>
                Number
              </button>
            </div>
            <div class="itemHelp">
              <div class="helpIcon"><IconHelp strokeClass="light" /></div>
              <div class="helpContent">
                <p>
                  The type of data if you wish to restrict input values. Most
                  meta will be text string, so if in doubt leave it as string.
                </p>
              </div>
            </div>
          </div>
          <div class="formItem optional">
            <label>Help Text</label>
            <input
              id="newHelpText"
              class="w3-input"
              type="string"
              max="999"
              onChange='updateTemplateField(event, "helpText");'
            />
            <div class="itemHelp">
              <div class="helpIcon"><IconHelp strokeClass="light" /></div>
              <div class="helpContent">
                <p>
                  Text to remind you what this data is for. Eg "The link to
                  more information for the token.
                </p>
              </div>
            </div>
          </div>

          <div style="padding-top: 1rem">
            <button
              class="w3-black btn btn-large"
              onClick="addMetaTemplate()"
            >
              Add
            </button>
            <button
              class="w3-black btn btn-large"
              onClick="hideNewMetaTemplate()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <Button class="w3-black btn" @click="setShowNewMetaTemplate(true)"
          >New Meta Template</Button
        >
      </div>
    </div>
    <div class="devContent fieldSet" v-if="devMode" >
      <div class="divider" />

      <div class="row">
        <button @click="setDeployStatus('confirming')">set confirming</button>
        <button @click="setDeployStatus('working')">set working</button>
        <button @click="setDeployStatus('stillWorking')">
          set stillWorking
        </button>
        <button @click="setDeployStatus('checkTransaction')">
          set checkTransaction
        </button>
        <button @click="setDeployStatus('error', 'example text')">
          set error
        </button>
        <button @click="setDeployStatus('completed')">completed</button>
      </div>
      <div>
        <button
          @click="
            setContractData({
              contractAddress: 'aaabbbccc',
              activeContractName: 'test',
              activeContractSymbol: 'TEST',
            })
          "
        >
          st fake data
        </button>
      </div>
    </div>
    <div
      class="fieldset actionContent formContent"
      :class="`${(deployStatus === 'ready' || deployStatus === 'error') ? '' : 'hidden'}`"
      id="fieldsetAction"
      style="padding-top: 0.5rem"
    >
      <h1 class="w3-xlarge" style="max-width: 1000px; margin: auto">
        <button
          id="h"
          class="w3-button w3-block w3-padding-large w3-black w3-margin-bottom"
          :disabled="!canDeploy"
          @click="handleDeploy2"
        >
          CREATE CONTRACT
        </button>
      </h1>
      <Button mode="secondary" size="medium" @click="resetDeployForm">
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

extend("min", (value) => {
  // ...min,
  // return true if it passes
  if (value.length >= 3) {
    return true;
  }
  // messge if it fails
  return `Value must be greater than ${3}`
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
  props: ['displayMode'],
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
      walletAddress: "ui/walletAddress",
      activeContractId: "ui/activeContractId",
      activeContractName: "ui/activeContractName",
      activeContractSymbol: "ui/activeContractSymbol",
      // DEPLOY
      canDeploy: "deployFormStore/canDeploy",
      deployStatus: "deployFormStore/deployStatus",
      deployStatusMessage: "deployFormStore/deployStatusMessage",
    }),
    showNewMetaTemplate() {
      return this.$store.state.deployFormStore.showNewMetaTemplate;
    },
    metaTemplatesJson() {
      return this.$store.state.deployFormStore.metaTemplatesJson;
    },
    metaTemplatesObj() {
      return JSON.parse(this.$store.state.deployFormStore.metaTemplatesJson);
    },
    // The `mapFields` function takes an array of
    // field names and generates corresponding
    // computed properties with getter and setter
    // functions for accessing the Vuex store.
    ...mapFields("deployFormStore", ["name", "symbol", "another"]),
  },

  methods: {
    addMetaTemplate(obj) {
      if (!obj) {
        console.error("no obj supplied");
        return null;
      }
      this.$store.commit("deployFormStore/addMetaTemplate", obj);
    },
    setShowNewMetaTemplate(newState) {
      this.$store.commit("deployFormStore/setShowNewMetaTemplate", newState);
    },
    handleDeploy2() {
      // this is to pass through context. Probably can be refctored
      const state = this.$store.state.mintFormStore;
      const walletAddress = this.walletAddress
      this.$store.dispatch("deployFormStore/handleDeploy",  {walletAddress});
    },
    ...mapMutations({
      setDeployStatus: "deployFormStore/setDeployStatus",
      resetDeployForm: "deployFormStore/resetDeployForm",
      removeMetaTemplate: "deployFormStore/removeMetaTemplate",
    }),
    ...mapActions({
      handleDeploy: "deployFormStore/handleDeploy",
      setContractData: "deployFormStore/setContractData",
    }),
  },
};
</script>
<!-- 
export default {
  data() {
    return {
      test: '',
    }
  },
  computed: {
    ...mapFields({
      fields: ['name', 'symbol', 'another'],
      base: 'deployForm',
      mutation: 'deployForm.updateDeployForm',
    }),
  },
  mutations: {
    updateDeployForm(value) {
      console.log('value', value)
      this.$store.commit('deployFormStore/updateDeployForm', value)
    },
  },

  -->
