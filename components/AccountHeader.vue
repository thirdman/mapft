<template>
  <div class="account-header row" v-if="walletAddress">
        <div class="col">
          <div class="row">
          <div class="col col-3">
            <div class="userAvatar shadow">
              <img class="userAvatarImage"
                :src="getProfileImage(profileObject.profileImageHash)"
                v-if="profileObject && profileObject.profileImageHash"
                />
              <IconUser
                v-if="!profileObject || !profileObject.profileImageHash"
                :strokeClass="contrastMode === 'dark' ? 'light' : 'dark'"
                size="large"
              />
            </div>
          </div>
          <div class="col col-9">
            <h4 v-if="profileObject && profileObject.name">{{profileObject && profileObject.name}}</h4>
            <div class="subtitle">{{ walletName }}</div>
          </div>
        </div>
        
        <!-- <div class="row">
          <div class="col">
            <Button
              @click="handleDisconnect"
              size="small"
              mode="secondary"
              v-if="walletAddress"
            >
              Disconnect
            </Button>
            </div>
          </div> -->
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
  
  
  .avatarColumn{
    flex-basis: 3rem;
    flex-shrink: 0;
    flex-grow: 0;
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
