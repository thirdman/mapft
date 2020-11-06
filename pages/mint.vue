<template>
  <div class="pageContainer">
    <Header />

    <!--  VUE MINT FORM SECTION-->
    <section id="mint" class="mint markerNot borderBottom">
      <div class="tertiary">
        <h2>Mint Tokens</h2>
        <div class="aside">
          <p>Mint NFT tokens using your deployed custom contract.</p>
        </div>
      </div>
      <div class="primary">
        <client-only>
          <div v-if="!walletAddress" class="noAccess">
            <div style="font-size: 56px">&#129300;</div>
            <div class="row">
              <div clas="column">
                <IconError size="large" className="large" />
              </div>
              <div clas="column">
                <h4>Wallet Not Connected.</h4>
                <p>Connect an ethereum wallet to mint tokens</p>
              </div>
            </div>
            <Button
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
          <div v-if="walletAddress" class="row">
            <MintForm />
            <MintPreview />
          </div>
        </client-only>
      </div>
      <div class="secondary">
        <div class="aside help">
          <h6>Minting NFT Tokens</h6>
          <p>
            Use the contract id generated in the deploy form to create your own tokens.
          </p>
          <p>
            File size is currently limited to 50Mb.
          </p>
          <p>
            Batch minting (editions) occurs automatically up to the Total Editions entered.
            A maximum of 10 tokens can be batch minted at one time.
          </p>
        </div>
      </div>
    </section>

    <!--  VUE DEPLOY FORM SECTION-->
    <client-only>
      <section id="deploy" class="deploy market borderBottom">
        <div class="tertiary">
          <h2>Artist Contract</h2>
          <div class="aside">
            <p>Your own mint contract to be used to generate tokens.</p>
          </div>
        </div>
        <div class="primary">
          <div v-if="!walletAddress" class="noAccess">
            <h4>No Wallet found.</h4>
            <p>Connect an ethereum wallet to mint tokens</p>
            <Button
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
          <div v-if="walletAddress" class="row">
            <DeployForm />
          </div>
        </div>
        <div class="secondary">
          <div class="aside help">
            <h6>User Contract</h6>
            <p>
              Your contract works similarly to 'SuperRare', 'Known Origin', and
              similar marketplaces.
            </p>
            <p>Creating a contract is free, but you must pay a gas fee.</p>
          </div>
        </div>
      </section>
    </client-only>
    <Footer />
  </div>
</template>

<style></style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { connectWallet, handleAccountLink } from "../utils/wallet";
export default {
  name: "MintPage",
   head: {
    title: 'InfiNFT: Mint Tokens',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Mint your own custom NFT tokens'
      }
    ],
   },
  computed: {
    ...mapGetters({
      hasWallet: "ui/hasWallet",
      walletAddress: "ui/walletAddress",
    }),
  },
  methods: {
    connectWallet,
    ...mapMutations({
      setShowAccount: "ui/setShowAccount",
      setShowSearch: "ui/setShowSearch",
      setWallet: "ui/setWallet",
      setEnsName: "ui/setEnsName",
      setWalletStatus: "ui/setWalletStatus",
      setNetworkName: "ui/setNetworkName",
      setWalletChain: "ui/setWalletChain",
    }),
  },
};
</script>
