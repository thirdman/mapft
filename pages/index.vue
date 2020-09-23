<template>
  <div class="pageContainer">
    <!-- <Header /> -->

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
          <!-- <ul class="heroList">
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
          </ul> -->
          <div class="ctaWrap">
            <nuxt-link to="/mint#deploy" class="btn hero">Get Started »</nuxt-link>
            <a href="#about" class="btn hollow asButton">How it works</a>
            
          </div>
          <nuxt-link to="/flow" class="btn hero">Flow »</nuxt-link>
        </div>
      </div>
      <div class="secondary">
        <!-- <HeroImages /> -->
      </div>
    </section>


    <!-- <Footer /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    // ...mapGetters({
    //   contrastMode: 'ui/contrastMode',
    // }),
  },
}
</script>

<style></style>
