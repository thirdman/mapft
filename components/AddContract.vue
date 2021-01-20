<template>
  <div class="AddContract contentRow row actions">  
    <Button
      @click="toggleAddInterface(true)"
      size="small"
      mode="secondary"
      v-if="!showAddInterface"
    >
      Add Existing Contract Id...
    </Button>
    <Button
      @click="() => {
        clearActiveContractId(null);
        goTo('/mint?selected=new');
        }"
      size="small"
      mode="secondary"
    >
      Generate New Contract
    </Button>
    <div class="addInterface row" v-if="showAddInterface">
      <div class="column col-66">
        <input
          name="Custom Contract ID"
          id="customTokenId"
          class="w3-input"
          type="string"
          max="99"
          required
          placeholder="Eg. 0xd0c402bcbcb5e701576..."
          v-model="customContractId"
        />
      </div>
      <div class="column col-33">
        <Button @click="handleAddContract">Add</Button>
        <Button @click="toggleAddInterface(false)" mode="secondary"
          >Cancel</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";


export default {
  name: "AddContract",
  data() {
    return {
      showAddInterface: false,
      customContractId: "",
    };
  },
  mounted() {
  },
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      walletName: "ui/walletName",
      uiMode: "ui/uiMode",
      contrastMode: "ui/contrastMode",
      uiTheme: "ui/uiTheme",
      activeContractId: "ui/activeContractId",
      deployStatus: "deployFormStore/deployStatus"
    }),
  },
  methods: {
    ...mapMutations({
      
    }),
    handleAccountModal() {
      this.$modal.show("account-modal");
    },
    handleAddContract() {
      console.log("adding contract", this.customContractId);
      this.$store.commit("ui/setActiveContractId", this.customContractId);
      this.showAddInterface = false;
    },
    toggleAddInterface(newState) {
      this.showAddInterface = newState;
    },
    clearActiveContractId(value) {
      this.$store.commit("ui/clearActiveContractId", value);
    },
    goToGallery(contractId){
      this.$router.push({
        path: `/gallery/${contractId}`,
      })
    },
    goTo(route){
      this.$router.push({
        path: route,
      })
    } 
  }
};
</script>

<style lang="scss">
.addInterface {
  padding: 0.5rem;
  margin-bottom: .5rem;
  align-items: center;
  background: var(--line-color, #eee);
  width: 100%;
}
.addInterface .btn {
  margin-left: 0.5rem;
}
.borderTop{
  border-top: 1px solid var(--line-color);
  padding-top: .5rem;
}
</style>
