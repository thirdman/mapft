<template>
  <div class="pageContainer">
    <Header />
    
    <section  class="">
      <div class="tertiary">
        <h2>User</h2>
        <div class="aside">
          <p>
            User data are stored <strong>only</strong> in your browser local storage.
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
                <p >Connect your Ethereum Wallet to use InfiNFT minting</p>
                <Button
                  fill
                  size="large"
                  mode="primary"
                  @click="
                    connectWallet({
                      setWallet,
                      setWalletStatus,
                      setWalletChain,
                      setNetworkName,
                      setEnsName,
                    })
                  "
                >
                  Connect
                </Button>
              </div>
            </div>
          </transition>
          
         
         
        
          <div v-if="walletAddress" class="row">
            <UserData selectPanel="drafts" />
          </div>
        </client-only>
      </div>
      <div class="secondary">
        <div class="aside help">
         
        </div>
      </div>
    </section>

    
    
    <Footer />
  </div>
</template>

<style lang="scss">


</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { connectWallet, handleAccountLink } from "../utils/wallet";


export default {
  name: "MintPage",
   head: {
    title: 'InfiNFT | User Data',
    meta: [
      { hid: "og:title", name: "og:title", content: "InfiNFT | User Data" },
      
      
    ],
   },
   data(){
     return {
       selectedPanel: 'drafts'
     }
   },
   mounted() {

   },
  computed: {
    ...mapGetters({
      devMode: "ui/devMode",
      walletAddress: "ui/walletAddress",
      activeContractId: "ui/activeContractId",
      contrastMode: "ui/contrastMode",
      usedContracts: "ui/usedContracts",
      draftsArray: "mintFormStore/draftsArray",
    }),
  },
  methods: {
    connectWallet,
    ...mapMutations({
      
    }),
    goToGallery(contractId){
      this.$router.push({
        path: `/gallery/${contractId}`,
      })
    }
  },
};
</script>
