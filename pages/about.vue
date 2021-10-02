<template>
  <div class="pageContainer">
    <Header />
    
    <section class="row ma-0 content">
      <div class=" col col-6 intro-column">
        <div class="info-game">
          <h3>
            Nothing to see here
          </h3>
        </div>
      </div>
      <div class="col col-6 intro-column">

      </div>
    </section>
    <section class="row ma-0 content">


    </section>
    <Footer />
  </div>
</template>

<script>
export default {
  head: {
    title: 'About',
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
