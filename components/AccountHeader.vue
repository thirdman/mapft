<template>
  <div class="account-header" v-if="walletAddress">
        <div class="row titleRow">
          <div class="userAvatar shadow">
            <IconUser
              :strokeClass="contrastMode"
              size="large"
            />
          </div>
          <h4>User</h4>
        </div>
        <div class="subtitle row contentRow between">
          <div class="column">{{ walletName }}</div>
          <Button
            @click="handleDisconnect"
            size="small"
            mode="secondary"
            v-if="walletAddress"
          >
            Disconnect
          </Button>
        </div>
      </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";


export default {
  name: "AccountHeader",
  data() {
    return {
      showAddInterface: false,
      customContractId: "",
      hasVerticalGrid: false,
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
      
    }),
  },
  methods: {
    ...mapMutations({
      setWallet: "ui/setWallet",
      setWalletChain: "ui/setWalletChain",
      setWalletStatus: "ui/setWalletStatus",
      setNetworkName: "ui/setNetworkName",
      setWalletChain: "ui/setWalletChain",
    }),
    handleDisconnect() {
      this.setWallet(null);
      this.setWalletChain("");
      this.$modal.hide("account-modal");
    },
  }
};
</script>

<style>


.account-header {
  padding: 1rem;
  border-bottom: 1px solid var(--ui-color, #111);
}
.titleRow {
  align-items: center;
}
.userAvatar {
  border-radius: 2rem;
  width: 3rem;
  height: 3rem;
  background: var(--background-color, #eee);
  border: 1px solid var(--ui-color, #111);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}
.removeItem {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}


</style>
