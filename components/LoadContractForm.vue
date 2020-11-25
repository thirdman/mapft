<template>
  <div class="LoadContractForm">    
    <div
      class="fieldset formContent"
      id="fieldsetContractView"
      v-if="!showEditContract"
    >
      <label>Active Contract </label>
      <div class="row">
        <div class="column col-66">
          <div id="userContractAddress">{{ activeContractId }}</div>
        </div>
        <div class="column col-33">
          <button
            class="btn"
            id="editUserContractButton"
            @click="handleAccountModal(true)"
          >
            <IconEdit strokeClass="light" size="small" />
          </button>
        </div>
      </div>
    </div>

    <!-- FORM FOR LOADING CONTRACT-->
    <div
      class="fieldset contractContent"
      id="fieldsetContract"
      v-if="showEditContract"
    >
      <ValidationProvider rules="required">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Contract Id</label>
          <div>
            <input
              name="Contract ID"
              oldId="j"
              id="temporaryContractId"
              class="w3-input"
              type="string"
              max="99"
              required
              placeholder="Eg. 0x1235..."
              style="text-transform: uppercase"
              v-model="temporaryContractId"
            />
            <div>
              <span class="validationMessage">{{ errors && errors[0] }}</span>
            </div>
          </div>
          <FormItemHelp
            required="true"
            message="Tokens will be minted using this contract. If you do not have one,
              use the section below to create."
          />
        </div>
      </ValidationProvider>
      <div class="row  marginBottom" v-if="usedContracts">
        <ToggleSection :colorMode="contrastMode" :active="true">
          <span slot="header">Previously Used Contracts</span>
          <div slot="content">
            <div v-for="(item, index) in usedContracts" :key="index">
              <div class="row between contractRow">
                <span class="column col-66">{{ item }}</span>
                <div class="column col-33 actions" v-if="item !== activeContractId">
                  <button class="btn inactive" @click="setTempActiveContractId(item)">
                    Select
                  </button>
                  
                  <button class="btn inactive" @click="setActiveContractId(item)">
                    Load
                  </button>
                  <button class="btn inactive" @click="goToGallery(item)">
                    View
                  </button>
                  
                </div>
                <div class="column col-33" v-if="item === activeContractId">
                  <div class="activeTag">ACTIVE</div>
                </div>
              </div>
            </div>
          </div>
        </ToggleSection>
      </div>
      <div>
        <Button
          id="loadContractButton"
          fill
          primary
          size="large"
          :disabled="!temporaryContractId"
          @click="setActiveContractId(temporaryContractId)"
        >
          Load Contract
        </Button>
      </div>
    </div>
    </div>
    
</template>

<style>
.LoadContractForm{
  flex-basis: 100%;
  width: 100%;
  
}
</style>

<script>
import { mapFields } from "vuex-map-fields";
import { mapMutations, mapGetters } from "vuex";
import { ValidationProvider, extend } from "vee-validate";
import { required, min, max, email } from "vee-validate/dist/rules";

extend("min", {
  // (value) => {
  ...min,
  // return value.length >= 3
});
extend("max", {
  ...max,
});
extend("required", {
  ...required,
  message: "This field is required",
});

export default {
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
      // ui
      hasWallet: "ui/hasWallet",
      devMode: "ui/devMode",
      contrastMode: "ui/contrastMode",
      activeContractId: "ui/activeContractId",
      usedContracts: "ui/usedContracts",
      // showEditContract: "mintFormStore/showEditContract",
      
    }),

    showEditContract() {
      console.log('activeContractId: ', this.activeContractId)
      console.log('showEditContract: ', this.$store.state.mintFormStore.showEditContract)
      if (this.activeContractId) {
        console.log('no active contract Id, should NOT show')
        return false;
      } else {
        console.log('no active contract Id, should NOT show')
        return true 
        // this.$store.state.mintFormStore.showEditContract;
      }
    },

    ...mapFields("mintFormStore", [
      "temporaryContractId",
    ]),
  },
  methods: {
    ...mapMutations({
      setShowEditContract: "mintFormStore/setShowEditContract",
      setTempActiveContractId: "mintFormStore/setTempActiveContractId",
    }),

    handleAccountModal() {
      this.$modal.show("account-modal");
    },

    handleStatusModal(newState) {
      this.$store.commit("mintFormStore/setShowStatusModal", newState);
    },
    
    setActiveContractId(value) {
      this.$store.commit("ui/setActiveContractId", value);
    },
    clearActiveContractId(value) {
      this.$store.commit("ui/clearActiveContractId", value);
    },
    goToGallery(contractId){
      this.$router.push({
        path: `/gallery/${contractId}`,
      })
    }
  },
};
</script>
