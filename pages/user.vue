<template>
  <div class="pageContainer">
    <Header />
    
    <section id="intro" class="row ">
      <div class="col col-3">
        <div v-if="isDevAddress">
          dev stuff
          <v-btn x-small @click="() => setDevMode(!devMode)">Toggle Dev {{devMode ? 'off' : 'on'}}</v-btn>
        </div>
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
                    <!-- <label>Profile</label>
                    <nuxt-link to="/user/edit">edit</nuxt-link> -->
                    <label>Display Name</label>
                    <v-btn>Edit...</v-btn>
                  </div>
                  <div class="col">
                    <label>Player Icon</label>
                    <v-btn>Select...</v-btn>
                    <p class="text-body-2">Select the image other players will see</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label>Games</label>
                    <div>-</div>
                  </div>
                  <div class="col">
                    <label>Sources</label>
                    <div>Loot, Assets, Player Units</div>
                  </div>
                </div>
                <v-divider />
                
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
      isDevAddress: "ui/isDevAddress"
    }),
  },
  methods: {
    ...mapMutations({
      setWallet: "ui/setWallet",
      setWalletChain: "ui/setWalletChain",
      setActiveContractId: "ui/setActiveContractId",
      clearActiveContractId: "ui/clearActiveContractId",
      removeUsedContractId: "ui/removeUsedContractId",
      setDevMode: "ui/setDevMode",
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
