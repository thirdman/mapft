<template>
  <div class="pageContainer">
    <Header />
    <section class="row hero  content">
      <div class="col">
        Nothing to see here
      </div>
      <div class="col">
        <nuxt-link to="/" class="btn hollow asButton">Get Started »</nuxt-link>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<script>
export default {
  head: {
    title: 'Game',
    // meta: [
    //   { hid: 'description', name: 'description', content: 'View a cool nft' },
    // ],
  }
}
</script>

<style lang="scss">
  
</style>
