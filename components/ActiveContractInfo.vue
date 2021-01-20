<template>
  <div class="ActiveContractInfo contractSection row">  
    <div
      class="fieldset formContent"
      id="fieldsetContractView"
      v-if="activeContractId"
    >
      <label>Active Contract </label>
      <div class="row">
        <div class="column col-66">
          <div id="userContractAddress">{{ activeContractId }}</div>
        </div>
      </div>
      <div class="row actions">
        <Button
            mode="hollow"
            size="small"
            @click="goTo('/user?selected=contracts')"
          >
            <IconEdit :strokeClass="contrastMode" size="small" /> Change Contract
          </Button>
        <Button
            mode="hollow"
            size="small"
            @click="goToGallery(activeContractId)"
          >
            <IconGallery :strokeClass="contrastMode" size="small" /> View Gallery
          </Button>
        <Button
            mode="hollow"
            size="small"
            @click="goTo('/user?selected=drafts')"
          >
            <IconUser :strokeClass="contrastMode" size="small" /> View Drafts
          </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";


export default {
  name: "ActiveContractInfo",
  data() {
    return {
      
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
.ActiveContractInfo{
  flex-basis: 100%;
  // border-bottom: 1px solid var(--line-color, #ddd);
  #fieldsetContractView {
    margin-bottom: 0.5rem;
    // background: var(--ui-color);
    // color: var(--background-color);
    padding: 0.5rem;
  } 
  #fieldsetContractView .col-66 {
    text-align: left;
    flex-grow: false;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.75rem;
  }
  .contractSection #fieldsetContractView .col-33 {
    text-align: right;
    padding: 2px;
  }
  .contractSection #fieldsetContractView .btn.light {
    border-radius: 0;
    color: var(--ui-color);
    font-size: 0.875rem;
    background: var(--background-color) !important;
  }
}

/* CONTRACT SETION */
.contractSection {


}
#userContractAddress {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}


</style>
