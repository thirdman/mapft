<template>
  <div class="pageContainer">
    <Header />
    <div>
      <h1 class="title">
        about
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
    title: 'About InfinNFT',
    // meta: [
    //   { hid: 'description', name: 'description', content: 'View a cool nft' },
    // ],
  }
}
</script>

<style></style>
