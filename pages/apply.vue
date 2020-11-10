<template>
  <div class="pageContainer">
    <Header />
      <section id="mint" class="mint markerNot borderBottom">
        <div class="tertiary">
          <h2>Sign Up</h2>
          <div class="aside">
            <p>Apply for a creator permissions</p>
          </div>
        </div>
      <div class="primary">
        <h1 class="title">
          Sign Up
        </h1>
        <div>
          <p>Applications are currently via discord</p>
          <a href="https://discord.gg/WPpD2X5" target="_blank" class="btn hero asButton">Go to Discord »</a>
          <nuxt-link to="/" class="btn asButton">Back Home</nuxt-link>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
export default {
  name: "ApplyPage",
  head: {
    title: 'InfinNFT: Sign Up',
    meta: [
      { hid: 'description', name: 'description', content: 'Sign up as an InfiNFT creator.' },
    ],
  }
}
</script>

<style></style>
