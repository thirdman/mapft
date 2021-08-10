<template>
  <div class="account-header" v-if="walletAddress">
        <div class="row titleRow contentRow between">
          <div class="column avatarColumn">
            <div class="userAvatar shadow">
              <img class="userAvatarImage" :src="getProfileImage(profileObject.profileImageHash)" v-if="profileObject && profileObject.profileImageHash" />
              <IconUser
                v-if="!profileObject || !profileObject.profileImageHash"
                :strokeClass="contrastMode === 'dark' ? 'light' : 'dark'"
                size="large"
              />
            </div>
          </div>
          <div class="column titleColumn">
            <h4>{{profileObject && profileObject.name}}</h4>
            <div class="subtitle">{{ walletName }}</div>
          </div>
          <div class="column actionColumn">
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
      profileObject: "ui/profileObject",
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
    getProfileImage(hash){
      return `https://ipfs.io/ipfs/${hash}`
    }
  }
};
</script>

<style lang="scss">
.account-header {
  padding: 0 0 1rem 0;
  border-bottom: 1px solid var(--ui-color, #111);
  margin-bottom: 1rem;;
  .titleRow{
    align-items: flex-start;
  }
  .avatarColumn{
    flex-basis: 3rem;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .titleColumn{
    h4{margin: 0}
    .subtitle{
      font-size: .875rem;
    }
  }
  .actionColumn{
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    align-self: stretch;
  }
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
  overflow: hidden;
}
    .userAvatarImage{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
.removeItem {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}


</style>
