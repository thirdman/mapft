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
          <Button
          @click="handleWeb3Connect"
          v-if="!walletAddress"
          mode="secondary"
          v-tooltip="'Connect your Web3 Wallet'"
          id="connectButton"
          >Connnect</Button>
        </client-only>
        <client-only>
          <div class="modaltest" v-if="hasChainSelect" >
            <Button
              size="small"
              mode="secondary"
              @click="handleChainModal"
              >Connect</Button
            >
          </div>
          <div class="walletInfo ">
              <span class="errorMsg danger" v-if="walletStatus === 'denied'"
                >Wallet Denied</span
              >
          </div>
          <div class="networkItem networkName" v-if="walletAddress && uiMode !== 'full'" v-tooltip="'Your current network'">
            {{walletNetwork}}
          </div>
          <ProfileButton />
          
          <Button
            @click.native="handleModal"
            class="btn iconButton minimalButton"
            :class="contrastMode"
            v-tooltip="'Manage your settings'"
            >
            <IconSettings :strokeClass="contrastMode" />
          </Button>

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
  <div class="devModeFlag shadow" v-if="devMode"><strong>DEV MODE</strong> <Button @click="toggleDevInfo" mode="secondary" size="small">toggle info</Button><Button @click="setDevMode(false)" mode="secondary" size="small">Switch Off</Button><br />
    <div v-if="showDevInfo">
        Environment: {{VERCEL_ENV}}<br />
        rootUrl: {{rootUrl}}<br />
        factoryContract: {{factoryContract}}<br />
        requiredNetwork: {{requiredNetwork}}<br />
        infuraUrl: {{infuraUrl}}<br />
        repo: {{VERCEL_GIT_REPO_SLUG}}<br />
        baseUrl: {{VERCEL_URL}}<br />
        commit: {{VERCEL_GIT_COMMIT_MESSAGE}}<br />
        <strong>Contrast Mode</strong>: {{contrastMode || "no contrast mode available"}}
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

<style lang="scss">
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
.walletInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: .5rem;
  flex-shrink: 0;
  
  span, button{
    flex-basis: 50%;
  }
}
    #connectButton{
        background: var(--background-color, #fff);
    color: var(--ui-color, #111);
    border-radius: 2rem;
    border: 2px solid var(--ui-color);
    text-transform: uppercase;
    font-size: 0.75rem;
      min-width: 5rem;
    }


</style>

<script>
import Web3 from "web3";
import Web3Modal from "web3modal";

import { mapMutations, mapGetters, mapActions } from "vuex";
import {  handleAccountLink, setConnectedNetwork, getProviderType, getConnectedNetwork, initWeb3 } from "../../utils/wallet.js";


export default {
  
  mounted() {
    mounted: () => {
      this.$refs.modal.show();
    };
    if(this.$config){
      // console.log('HEADER this.$config is available', this.$config)
      const rootUrl = this.$config.rootUrl;
      const requiredNetwork = this.$config.requiredNetwork;
      const factoryContract = this.$config.factoryContract;
      const infuraUrl = this.$config.infuraUrl;
      const VERCEL_ENV = this.$config.VERCEL_ENV || "local"
      const VERCEL_GIT_REPO_SLUG = this.$config.VERCEL_GIT_REPO_SLUG || "local"
      const VERCEL_GIT_COMMIT_SHA = this.$config.VERCEL_GIT_COMMIT_SHA || "local"
      const VERCEL_GIT_COMMIT_MESSAGE = this.$config.VERCEL_GIT_COMMIT_MESSAGE || '-'
      
      this.rootUrl = rootUrl;
      this.factoryContract = factoryContract;
      this.requiredNetwork = requiredNetwork;
      this.infuraUrl = infuraUrl;
      this.VERCEL_ENV = VERCEL_ENV
      this.VERCEL_GIT_REPO_SLUG = VERCEL_GIT_REPO_SLUG
      this.VERCEL_GIT_COMMIT_SHA = VERCEL_GIT_COMMIT_SHA
      this.VERCEL_GIT_COMMIT_MESSAGE = VERCEL_GIT_COMMIT_MESSAGE
      this.VERCEL_URL = this.$config.VERCEL_URL || 'local'
    }
    if (process.client) {
      this.walletCheck();
      this.getProfileData(this.walletAddress);
    }
  },

  data() {
    return {
      showDevInfo: false,
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
      connectStatus: "",
      connectError: "",
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
    // connectWallet,
    ...mapMutations({
      setShowAccount: "ui/setShowAccount",
      setShowSearch: "ui/setShowSearch",
      toggleHiddenUi: "ui/toggleHiddenUi",
      setWallet: "ui/setWallet",
      setWalletChain: "ui/setWalletChain",
      setNetworkName: "ui/setNetworkName",
      setDevMode: "ui/setDevMode"
    }),

    ...mapActions({
      showStatusModal: "mintFormStore/showStatusModal",
      showCropperModal: "mintFormStore/showCropperModal",
      getProfileData: "ui/getProfileData"
    }),
    toggleDevInfo(){
      this.showDevInfo = !this.showDevInfo
    },
    goToHome() {
      this.$router.push({
        path: `/`,
      })
    },

    async handleWeb3Connect(){
      if(!document){return}
      // RESET
      this.connectStatus="";
      this.connectError=null;
      this.setWalletStatus("");

      const web3Modal = this.$web3Modal
      if(!web3Modal){
        return
      }
      this.connectStatus="connecting";
      const requiredNetwork = this.$config.requiredNetwork;
      
      web3Modal.clearCachedProvider();
      console.log('window.web3', window.web3);
      let provider
      if(window.web3){
        provider = window.web3.currentProvider;
      }
      provider = await web3Modal.connect().catch((error) => {
        console.log("error here:", error);
        this.connectStatus="error";
        this.connectError=error;
        this.setWalletStatus("denied");
        return
      });
      console.log('provider', provider);
      if(!provider){
        // In case the user cancelled or rejected
        return
      }
      this.connectStatus="connected";
      const providerType = getProviderType(provider);
      // finally, get the user account
      const accts = await provider.enable()
      
      if (!accts[0]) {
        console.log("error", provider);
        throw "missing account";
      }
      
      this.setWalletChain("eth");
      this.setWallet(accts[0]);
      provider.autoRefreshOnNetworkChange = true;
      
      // Listen for change of account
      if (provider && provider.on) {
        provider.on("accountsChanged", (accts) => {
          setWallet(accts[0]);
        });
      }
          
      // Get network, and check it matches the requires one for the active environment
      // ie. dev, staging or prod
      const net = provider.networkVersion;
      const connectedNetwork = getConnectedNetwork(net);
      this.setNetworkName(connectedNetwork);
      this.walletCheck(true)
    },
  


    walletCheck(enforceCheck = false){
      const isMintRoute = this.$route && this.$route.path === '/mint'
      console.log({enforceCheck, isMintRoute})
      if(isMintRoute || enforceCheck){
        if (typeof window.ethereum !== "undefined") {
          if(!this.walletNetwork){
            console.log('here', window.web3)
            // const newNetwork = this.setNetwork()
            // initWeb3(requiredNetwork, infuraUrl);
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
    // setNetwork(){
    //   const provider = window.ethereum;
    //   const networkVersion = provider.networkVersion;
    //   const requiredNetwork = this.$config.requiredNetwork;
    //   console.log('setNetworkName', setNetworkName)
    
    //   // console.log('this.networkVersion', this.walletNetwork)
    //   return this.walletNetwork;
    // },
    clearActiveContractId(value) {
      this.$store.commit("ui/clearActiveContractId", value);
      this.$store.commit("mintFormStore/clearActiveContractId", value);
    },
    
    setWalletStatus(value) {
      this.$store.commit("ui/setWalletStatus", value);
    },
    setProvider(value) {
      this.$store.commit("ui/setWalletProvider", value);
    },
    
    handleNetworkWarning() {
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
