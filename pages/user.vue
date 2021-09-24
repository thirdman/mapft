<template>
  <div class="pageContainer">
    <Header />
    
    <section id="intro" class="row ">
      <div class="col col-3">
      </div>
      <div class="col col-9">
        <client-only>
            <v-card
              v-if="!walletAddress"
              class="user-card"
              elevation="4"
              >
              <v-card-title>
                <v-icon>
                  mdi-account
                </v-icon>
                <span>Not Connected</span>
              </v-card-title>
              <v-card-text>
                <p >Connect your Ethereum Wallet </p>
                <v-btn depressed outlined :disabled="walletAddress" @click="setWallet('example-user')">Use fake wallet</v-btn>
              </v-card-text>
            </v-card>
          
          <v-card
              v-if="walletAddress"
              class="user-card logged-in"
              elevation="4"
              >
              <v-card-title>
                <AccountHeader v-if="walletAddress" />
              </v-card-title>
              <v-card-text>
                <div class="row">
                  <div class="col">
                    <label>Games</label>
                    <div>-</div>
                  </div>
                </div>
              </v-card-text>
          </v-card>

                <!-- <UserData :selected="selected" /> -->
          <!-- <label v-if="walletAddress && activeContractId">Active Contract</label>
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
          </div> -->
          
        </client-only>
      </div>
      
    </section>

    
    
    <Footer />
  </div>
</template>

<style lang="scss">
.user-card{
  width: 500px;
  &.logged-in{
    width: unset;
    max-width: 600px;
  }
}

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
