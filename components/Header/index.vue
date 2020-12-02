<template>
  <header
    class="w3-top header"
    :class="`${uiMode} ${hideUi ? 'hideUi' : 'showUi'}`"
  >
  <client-only>
    <div class="headerRow w3-row">
      <div class="brand w3-col s2">
        <span class="logoWrap" @click="goToHome()">
          <span class="logoBg"></span>
          <span class="logoPosition">
            <IconLogo :fillClass="headerContrastMode" />
          </span>
        </span>
        <div v-if="uiMode === 'none'" class="hamburgerToggle">
          <button class="btn iconButton" @click="toggleHiddenUi(!hideUi)">
            <IconMenu :strokeClass="contrastMode" />
          </button>
          <div class="toggleTooltip">Toggle menu options</div>
        </div>
        <span class="chainname" v-if="hasChainSelect">{{ walletChain }}</span>
        <span class="brandname" @click="goToHome()">INFINFT</span>
        <span class="subtitle" @click="goToHome()">by NFT42</span>
        <div class="wedgeWrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            class="wedgeSvg"
            preserveAspectRatio="none"
          >
            <polygon fill="#000" points="0,100 0,0 100,0" />
          </svg>
        </div>
      </div>

      <div class="navRow">
        
        <div class="navItem">
          <nuxt-link to="/" class="w3-button navLink">About</nuxt-link>
        </div>

        <div class="navItem">
          <nuxt-link to="/mint" class="w3-button navLink">Mint</nuxt-link>
        </div>
        <div class="navItem">
          <nuxt-link to="/gallery" class="w3-button navLink">Gallery</nuxt-link>
        </div>
        <div class="navItem">
          <nuxt-link to="/view" class="w3-button navLink">View</nuxt-link>
        </div>
        <div class="navItem" v-if="!walletAddress">
          <nuxt-link to="/apply" class="w3-button navLink">Apply</nuxt-link>
        </div>
        <div class="navItem" v-if="devMode">
          <nuxt-link to="/svg" class="w3-button navLink">SVG</nuxt-link>
        </div>
        <div class="wedgeWrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            class="wedgeSvg"
            preserveAspectRatio="none"
          >
            <polygon fill="#000" points="0,0 100,100 100,0" />
          </svg>
        </div>
      </div>

      <div class="search" v-if="isSearchRoute">
        <nuxt-link to="/view" >
          <IconSearch :strokeClass="contrastMode" />
        </nuxt-link>
        <div class="wedgeWrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            class="wedgeSvg"
            preserveAspectRatio="none"
          >
            <polygon fill="#ccc" points="0,100 0,0 100,0 100,100" />
          </svg>
        </div>
      </div>

      <div class="profile">
        <client-only>
          <div class="modaltest" v-if="hasChainSelect">
            <Button size="small" mode="secondary" @click="handleChainModal"
              >connect</Button
            >
          </div>
          <div class="networkItem networkName" v-if="walletAddress && uiMode !== 'full'">
            {{walletNetwork}}
          </div>
          <div class="minimalIcon" v-if="hasWallet && uiMode === 'minimal'">
            <button @click="handleModal" class="btn iconButton">
              <IconUser :strokeClass="contrastMode" />
            </button>
            <button @click="handleModal" class="btn iconButton caretPosition">
              <IconCaret :strokeClass="contrastMode" />
            </button>
          </div>

          <div id="accountWrap" class="accountWrap">
            <div id="footerAccountWrap">
              <div class="itemContent" v-if="!hasWallet">
                <label id="footerWalletLabel" class="footerUserLabel"
                  >Wallet</label
                >
                <div class="walletLoggedOut">
                  <span class="loggedOutMsg">No Wallet</span>

                  <button
                    id="connectButton"
                    class="w3-button w3-block w3-black"
                    @click="
                      connectWallet({
                        setWallet,
                        setWalletStatus,
                        setWalletChain,
                        setNetworkName,
                      })
                    "
                  >
                    Connect
                  </button>
                  <span class="errorMsg danger" v-if="walletStatus === 'denied'"
                    >Wallet Denied</span
                  >
                  <button @click="handleModal" class="btn iconButton">
                    <IconSettings :strokeClass="contrastMode" />
                    <IconCaret :strokeClass="contrastMode" />
                  </button>
                </div>
              </div>
              
              <div class="accountItem" v-if="hasWallet && uiMode !== 'minimal'">
                <div class="itemIcon">
                  <button @click="handleModal" class="btn iconButton">
                    <IconUser :strokeClass="contrastMode" />
                  </button>
                </div>
                
                <div class="itemContent">
                  <label id="footerWalletLabel" class="footerUserLabel"
                    >Wallet</label
                  >
                  <div
                    id="accountElement"
                    class="user profileElement"
                    v-if="hasWallet"
                  >
                    <span class="accountAddress">{{ walletName }}</span>
                    <button @click="handleModal" class="btn iconButton">
                      <IconSettings :strokeClass="contrastMode" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="accountItem" v-if="hasWallet && uiMode !== 'minimal'">
                <div class="itemIcon"></div>
                <div class="itemContent">
                  <label id="footerContractLabel" class="footerUserLabel"
                    >Contract</label
                  >
                  <div id="contractElement" class="userContent profileElement">
                    <span>{{ activeContractId || "No User Contract" }}</span>
                  </div>
                </div>
              </div>
              <div class="wedgeWrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  class="wedgeSvg"
                  preserveAspectRatio="none"
                >
                  <polygon fill="#000" points="0,0 100,0 100,100" />
                </svg>
              </div>
            </div>
          </div>
        </client-only>

        <div class="wedgeWrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            class="wedgeSvg"
            preserveAspectRatio="none"
          >
            <polygon fill="#000" points="0,100 0,0 100,0" />
          </svg>
        </div>
      </div>
    </div>
  </client-only>

  <client-only>
    <div>
    <account-modal />
    <div style="opacity: 0; visibility: 0; z-index: -1">
      {{ shallShowStatusModal ? "yes" : "" }}
    </div>
    <status-modal />
    <cropper-modal />
    <chain-modal />
    <info-modal />
    </div>
  </client-only>
  </header>
</template>

<style>
.header .footerUserLabel {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.devModeFlag {
  position: fixed;
  top: 2rem;
  left: 5rem;
  background: var(--danger-color, red);
  padding: 2px 1rem;
  font-weight: bold;
  font-size: 0.75rem;
  color: #fff;
  z-index: 999999;
}
.hamburgerToggle {
  position: absolute;
  left: 0.5rem;
  top: 2rem;
}
.hamburgerToggle:hover .toggleTooltip {
  display: block;
}
.toggleTooltip {
  display: none;
  position: absolute;
  left: 0;
  top: 100%;
  background: var(--ui-color, #111);
  color: var(--background-color, #111);
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  white-space: nowrap;
}
.caretPosition {
  position: absolute;
  right: -1.35rem;
}
.networkWarning{
  color: red; 
  background: rgba(255,255,255,.2); 
  padding: 0.25rem; 
  margin: 0;
}
</style>

<script>

import { mapMutations, mapGetters, mapActions } from "vuex";
import { connectWallet, handleAccountLink, setConnectedNetwork } from "../../utils/wallet.js";

export default {
  // mixins: [myMixin],
  components: {
    // ExampleModal,
  }, 
  // created() {
  //   if (process.client) {
  //     // handle client side
  //     // console.log('created client')
  //     // console.log('this.$scopedSlots', this.$scopedSlots)
  //     // console.log('MOUNTED modal refs', this.$modal)
  //     // this.$modal.show("cropper-modal");
  //   }
  //   if (process.server) {
  //     // const { req, res, beforeNuxtRender } = context
  //     // console.log("created server");
  //     // console.log('this.$scopedSlots', this.$scopedSlots)
  //   }
  // },
  mounted() {
    mounted: () => {
      this.$refs.modal.show();
    };
    if(this.$config){
      console.log('HEADER this.$config is available', this.$config)
      // const rootUrl = this.$config.rootUrl;
      // const requiredNetwork = this.$config.requiredNetwork;
      // const factoryContract = this.$config.factoryContract;
      // const infuraUrl = this.$config.infuraUrl;
      // const VERCEL_ENV = this.$config.VERCEL_ENV || "local"
      // const VERCEL_GIT_REPO_SLUG = this.$config.VERCEL_GIT_REPO_SLUG || "local"
      // const VERCEL_GIT_COMMIT_SHA = this.$config.VERCEL_GIT_COMMIT_SHA || "local"
      // const VERCEL_GIT_COMMIT_MESSAGE = this.$config.VERCEL_GIT_COMMIT_MESSAGE || 'local'
      // console.log('HEADER VERCEL_GIT_COMMIT_MESSAGE: ', VERCEL_GIT_COMMIT_MESSAGE);
      // this.rootUrl = rootUrl;
      // this.factoryContract = factoryContract;
      // this.requiredNetwork = requiredNetwork;
      // this.infuraUrl = infuraUrl;
      // this.VERCEL_ENV = VERCEL_ENV
      // this.VERCEL_GIT_REPO_SLUG = VERCEL_GIT_REPO_SLUG
      // this.VERCEL_GIT_COMMIT_SHA = VERCEL_GIT_COMMIT_SHA
      // this.VERCEL_GIT_COMMIT_MESSAGE = VERCEL_GIT_COMMIT_MESSAGE
      // this.VERCEL_URL = this.$config.VERCEL_URL || 'local'
    }
    if (process.client) {
      this.walletCheck();
    }
  },

  data() {
    return {
      showDevInfo: true,
      rootUrl: "",
      factoryContract: "",
      requiredNetwork: "",
      infuraUrl: "",
      VERCEL_ENV: "",
      VERCEL_GIT_REPO_SLUG: "",
      VERCEL_GIT_COMMIT_SHA: "",
      VERCEL_GIT_COMMIT_MESSAGE: "",
      VERCEL_URL: "",
      showIt: false,
    };
  },
  computed: {
    ...mapGetters({
      uiMode: "ui/uiMode",
      hasChainSelect: "ui/hasChainSelect",
      contrastMode: "ui/contrastMode",
      hideUi: "ui/hideUi",
      devMode: "ui/devMode",
      walletNetwork: "ui/walletNetwork",
      walletAddress: "ui/walletAddress",
      walletStatus: "ui/walletStatus",
      walletChain: "ui/walletChain",
      walletName: "ui/walletName",
      ensName: "ui/ensName",
    }),
    isSearchRoute() {
      const routeArray = ["view-contract-id", "ViewPage", "gallery", "view"];
      const isSearchRoute = routeArray.includes(this.$route.name);
      return isSearchRoute ? true : false;
    },
    headerContrastMode() {
      const isLightUi = this.contrastMode === "light";
      
      // header items should be light if
      // - (has light ui background) AND ui is FULL
      // - has dark ui and ui is NOT full
      // const condition1 = this.uiMode === 'full'
      // const condition2 = this.contrastMode === 'light' && this.uiMode !== 'full';
      // const headerContrastMode = this.contrastMode === 'dark' ? 'dark': 'light';
      const headerContrastMode =
        this.uiMode === "full" ? "dark" : this.contrastMode;
      return headerContrastMode;
    },
    logoContrastMode() {
      const logoContrastMode =
        this.uiMode === "full" && this.headerContrastMode === "dark"
          ? "light"
          : "dark";
      console.log("logoContrastMode", logoContrastMode);
      return "dark";
    },

    hasWallet() {
      const walletAddress = this.$store.state.ui.walletAddress;

      // return this.$store.state.ui.hasWallet
      return walletAddress ? true : false;
    },

    showSearch() {
      return this.$store.state.ui.showSearch;
    },
    activeContractId() {
      return this.$store.state.ui.activeContractId;
    },
    // showAccount() {
    //   // console.log('this', this.$modal)
    //   const walletAddress = this.$store.state.ui.walletAddress
    //   // return this.$store.state.ui.showAccount
    //   return walletAddress ? true : false
    // },
    iconStrokeColor() {
      return this.$store.state.ui.uiMode === "minimal" ? "dark" : "light";
    },
  },
  methods: {
    connectWallet,
    ...mapMutations({
      setShowAccount: "ui/setShowAccount",
      setShowSearch: "ui/setShowSearch",
      toggleHiddenUi: "ui/toggleHiddenUi",
      setWalletChain: "ui/setWalletChain",
    }),

    ...mapActions({
      showStatusModal: "mintFormStore/showStatusModal",
      showCropperModal: "mintFormStore/showCropperModal",
    }),
    toggleDevInfo(){
      this.showDevInfo = !this.showDevInfo
    },
    goToHome() {
      this.$router.push({
        path: `/`,
      })
    },
    walletCheck(){
      if(this.$route && this.$route.path === '/mint'){
        if (typeof window.ethereum !== "undefined") {
          if(!this.walletNetwork){
            const newNetwork = this.setNetwork()
          }
          // Get web3 instance
          const provider = window.ethereum;
          const networkVersion = provider.networkVersion;
          const userNetwork = this.walletNetwork;
          const requiredNetwork = this.$config.requiredNetwork;

          if(requiredNetwork !== userNetwork){
            this.$nextTick(() => {
              this.handleNetworkWarning();
            })
          }
        }
      }
    },
    setNetwork(){
      const provider = window.ethereum;
      const networkVersion = provider.networkVersion;
      const requiredNetwork = this.$config.requiredNetwork;
      setConnectedNetwork(networkVersion, this.setNetworkName)
      // console.log('this.networkVersion', this.walletNetwork)
      return this.walletNetwork;
    },
    clearActiveContractId(value) {
      this.$store.commit("ui/clearActiveContractId", value);
      this.$store.commit("mintFormStore/clearActiveContractId", value);
    },
    setWallet(value) {
      console.log("value", value);
      this.$store.commit("ui/setWallet", value);
    },
    setWalletStatus(value) {
      console.log("value", value);
      this.$store.commit("ui/setWalletStatus", value);
    },
    setProvider(value) {
      console.log("value", value);
      this.$store.commit("ui/setWalletProvider", value);
    },
    setNetworkName(value) {
      console.log("value", value);
      this.$store.commit("ui/setNetworkName", value);
    },
    handleNetworkWarning() {
      console.log('this is the nnetwork warning');
      console.log('this.$modal', this.$modal)
      this.$modal.show("info-modal");
    },

    handleModal() {
      this.$modal.show("account-modal");
    },
    handleChainModal() {
      this.$modal.show("chain-modal");
    },
    handleCropperModal() {
      this.$modal.show("cropper-modal");
    },
    async shallShowStatusModal() {
      if (process.client) {
        const shouldShow = await this.showStatusModal();
        // console.log('SHOULD: ', shouldShow)
        if (shouldShow) {
          this.$modal.show("status-modal");
          this.showIt = true;
        } else {
          this.$modal.hide("status-modal");
          this.showIt = true;
        }
        return null;
      } else {
        return null;
      }
    },
    async shallShowCropperModal() {
      if (process.client) {
        alert('isClient')
        // const shouldShow = await this.showCropperModal();
        const shouldShow = true;
        if (shouldShow) {
          this.$modal.show("cropper-modal");
          // this.showIt = true;
        } else {
          this.$modal.hide("cropper-modal");
          // this.showIt = true;
        }
        return null;
      } else {
        return null;
      }
    },
  },
};
</script>
