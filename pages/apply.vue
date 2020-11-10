<template>
  <div class="pageContainer">
    <Header />
    <div>
      <h1 class="title">
        Sign Up
      </h1>
      <div class="links">
        <nuxt-link to="/">root page</nuxt-link>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  head: {
    title: 'InfinNFT: Sign Up',
    meta: [
      { hid: 'description', name: 'description', content: 'Sign up as an InfiNFT creator.' },
    ],
  }
}
</script>

<style></style>
