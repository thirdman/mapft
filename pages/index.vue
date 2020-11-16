<template>
  <div class="pageContainer">
    <Header />

    <!-- HERO Container -->
    <section id="intro" class="intro borderBottom">
      <div class="tertiary">
        <img
          class="introLogoBackgroundImage"
          src="~/assets/images/logo.svg"
          style="width: auto; height: 4rem;"
          alt="logo"
        />
      </div>
      <div class="primary">
        <div class style="max-width: 700px;">
          <h1>
            InfiNFT
            <span class="betaFlag">beta</span>
          </h1>
          <h3>A token minting platform with a focus on flexibility and longevity</h3>
          <ul class="heroList">
            <li>
              <IconLogo size="small" :fillClass="contrastMode" />On-Chain Metadata
            </li>
            <li>
              <IconLogo size="small" :fillClass="contrastMode" />On-Chain Image Storage
            </li>
            <li>
              <IconLogo size="small" :fillClass="contrastMode" />3D, Audio, and other file types
            </li>
            <li class="soon">
              <IconLogo size="small" :fillClass="contrastMode" />Multiple Images
            </li>
            <li class="soon">
              <IconLogo size="small" :fillClass="contrastMode" />Custom Meta
            </li>
          </ul>
          <div class="ctaWrap">
            <nuxt-link to="/mint" class="btn hero">Get Started »</nuxt-link>
            <a href="#about" class="btn hollow asButton">How it works</a>
            
          </div>
          <br />
          <nuxt-link to="/flow" class="btn hero asButton" v-if="hasChainSelect">Flow Test »</nuxt-link>
        </div>
      </div>
      <div class="secondary">
        <HeroImages />
      </div>
    </section>


    <!-- About Container -->
    <section id="about" class="about markerNot borderBottom">
      <div class="tertiary">
        <h2>About</h2>
        <div class="aside">
          <p>
            InfiNFT is a token minting platform that allows users to create NFTs
            with fully on-chain metadata. Files are stored on Arweave and IPFS.
          </p>
        </div>
      </div>
      <div class="w3-container primary">
        <div class style="max-width: 700px;">
          <p>
            InfiNFT is a token minting platform that allows users to create
            their own NFTs with fully on-chain metadata.
          </p>
          <p>
            Our focus on token integrity will ensure that your creations will be
            around as long as the blockchain underpinning them.
          </p>
          <h3>NFT Freedom</h3>
          <p>
            We are NFT fans and want to see users pushing the boundaries of
            what can be achieved.
          </p>
          <p>
            InfiNFT gives creators a simple way to deploy your own NFT contract,
            and then use it to mint NFT tokens as you see fit.
          </p>

          <h3>Data Redundancy</h3>
          <p>
            Due to size limitations with Ethereum, NFT file data is stored on
            both the Arweave blockchain and IPFS. Both file hashes from these
            storage platforms are written to the NFT during minting.
          </p>
          <p>
            We believe this redundant storage, especially when paired with
            on-chain metadata, provides an extremely robust token solution with
            the goal of being everlasting.
          </p>
          <h3>ERC721 Compliant</h3>
          <p>
            Any NFT minted through our platform is fully ERC721 compliant, and
            is tradeable via marketplaces such as OpenSea.
          </p>
          <h3>Costs</h3>
          <p>
            Costs associated with permanently storing files are factored into
            the minting price. While these are usually minimal, this allows you
            to be sure images and content will be around forever.
          </p>
          <h3>Example Data</h3>
          <div>
            <p>
              This example below shows us reading core data directly from a
              token's ID on the contract (via etherscan)
            </p>
            <img
              src="~/assets/images/coreMetadata.png"
              style="border: 2px solid #111; width: 100%; max-width: 1000px;"
              class="w3-margin-top shadow"
            />
          </div>
        </div>
      </div>
      <div class="secondary">
        <div class="aside help">
          <h6>Why is on-chain important?</h6>
          <p>
            With on-chain data, you no longer have to rely on services such as
            Google, Amazon, or other meta storage options to remain serving your
            meta data source.
          </p>
          <h6>Join the converstion</h6>
          <a
            href="https://twitter.com/nft4ever"
            class="iconButton"
            target="_blank"
          >
            <div class="iconWrap twitter"></div>
          </a>
          <a
            class="iconButton"
            href="https://discord.gg/WPpD2X5"
            target="_blank"
          >
            <div class="iconWrap discord"></div>
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const BASE_URL = "https://infinft-flow.vercel.app"
export default {
  name: 'ViewPageParams',
  data() {
    return {
      previewUrl: `/images/preview.jpg`,
    }
  },
  head: {
    title: 'InfiNFT',
    meta: [
      { hid: 'description', name: 'description', content: 'A NFT platform with a focus on extendability, flexibility, and on-chain data.' },
      { hid: "og:site_name", name: "og:site_name", content: "InfiNFT" },
      { hid: "og:type", name: "og:type", content: "website" },
      {
          hid: "og:image",
          property: "og:image",
          // content: this.previewUrl,
          content: `${BASE_URL}/images/preview.jpg`
        },
    ],
    
  },
  computed: {
    ...mapGetters({
      contrastMode: 'ui/contrastMode',
      hasChainSelect: 'ui/hasChainSelect'
    }),
  },
}
</script>

<style></style>
