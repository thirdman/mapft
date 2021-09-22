<template>
  <div class="pageContainer">
    <Header />
    <section id="intro" class="row ma-0 content">
      <div class="col col-3 intro-column">
        <div class="info-game">
          <h3>
            Generate your own
          </h3>
          <p class="text-body-2">Exploring possibilities of NFT based gaming.</p>
        </div>
      </div>
      <div class="col col-9">
        <p>Map here</p>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
export default {
  head: {
    title: 'Generate',
    // meta: [
    //   { hid: 'description', name: 'description', content: 'View a cool nft' },
    // ],
  }
}
</script>

<style lang="scss">
  section.content{
    display: flex;
    justify-content: center;
    .col.intro-column{
      max-width: 500px;
    }
    .hero-image{
      // bordeR: 1px solid var(--line-color);
      box-shadow: 0 1rem 4rem -.5rem black;
    }
  }
</style>
