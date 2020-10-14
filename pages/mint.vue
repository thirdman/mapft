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
            <IconError size="large" className="large" />
            <h4>Wallet Not Connected.</h4>
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
            Non image-based tokens (eg. audio) will use the thumbnal field for
            iamge previews.
          </p>
          <p>
            Batch minting occurs automatically up to the Total Editions entered.
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
                })
              "
            >
              Connect
            </Button>
          </div>
          <div v-if="walletAddress">
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
      setWalletStatus: "ui/setWalletStatus",
      setNetworkName: "ui/setNetworkName",
      setWalletChain: "ui/setWalletChain",
    }),
  },
};
</script>
