<template>
  <div class="pageContainer">
    <!-- <Header /> -->
<!--     
    <section  class="">
      <div class="tertiary">
        <br/>
        <br/>
        <br/>
        <div class="aside">
          <p>
            User data is stored <strong>only</strong> in your browser local storage.
          </p>
        </div>
      </div>
      <div class="primary">
        <client-only>
          <transition name="fade" appear>
            <div v-if="!walletAddress" class="connectPanel shadow">
              <div class="connectHeader">
                <div class="connectUserIcon shadow">
                <IconUser size="large" :strokeClass="contrastMode" />
                </div>
              </div>
              <div class="connectBody">
                <h3>Not Connected</h3>
                <p >Connect your Ethereum Wallet to use InfiNFT</p>
               
              </div>
            </div>
          </transition>
          <AccountHeader v-if="walletAddress" />

          <label v-if="walletAddress && activeContractId">Active Contract</label>
          <div class="activeContractWrap shadow" v-if="walletAddress && activeContractId">
            <div class="row" v-if="activeContractSymbol">
              <div class="column col-50">
                <label class="subtitle">SYMBOL</label>
                <div>{{ activeContractSymbol || "-" }}</div>
              </div>
              <div class="column col-50">
                <label class="subtitle">Name</label>
                <div>{{ activeContractName || "-" }}</div>
              </div>
            </div>
            <label class="subtitle">Address</label>
            <div class="row between">
              <div class="subtitle">
                {{ activeContractId || "None Selected" }}
              </div>
              <Button
                @click="clearActiveContractId(null)"
                size="small"
                class="inactive"
                v-if="activeContractId"
              >
                Disconnnect
              </Button>
            </div>
          </div>
          <div v-if="walletAddress" class="row">
            <UserData :selected="selected" />
          </div>
        </client-only>
      </div>
      <div class="secondary">
        <div class="aside help">
         
        </div>
      </div>
    </section>

     -->
    
    <!-- <Footer /> -->
  </div>
</template>

<style lang="scss">


</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import {  handleAccountLink } from "../utils/wallet";


export default {
  name: "UserPage",
   head: {
    title: 'User Data',
    meta: [
      { hid: "og:title", name: "og:title", content: "SVG | User Data" },
      
      
    ],
   },
   data(){
     return {
       selected: 'contracts'
     }
   },
   mounted() {
    const selectedQueryPanel = this.$route.query.selected;
    this.selected = selectedQueryPanel || "contracts"
   },
  computed: {
    ...mapGetters({
      devMode: "ui/devMode",
      walletAddress: "ui/walletAddress",
      activeContractId: "ui/activeContractId",
      activeContractId: "ui/activeContractId",
      activeContractName: "ui/activeContractName",
      activeContractSymbol: "ui/activeContractSymbol",
      contrastMode: "ui/contrastMode",
      usedContracts: "ui/usedContracts",
    }),
  },
  methods: {
    ...mapMutations({
      setWallet: "ui/setWallet",
      setWalletChain: "ui/setWalletChain",
      setActiveContractId: "ui/setActiveContractId",
      clearActiveContractId: "ui/clearActiveContractId",
      removeUsedContractId: "ui/removeUsedContractId",
    }),
    ...mapActions({
      getProfileData: "ui/getProfileData"
    }),
    goToGallery(contractId){
      this.$router.push({
        path: `/gallery/${contractId}`,
      })
    },
  },
};
</script>
