<template>
  <div class="pageContainer">
    <!-- <Header /> -->
    <section class="row hero  content">
      <div class="col">
        <h1>Game elements as NFT » NFT as game elements</h1>
      </div>
    </section>
    <!-- <section class="row ma-0 content">
      <div class=" col col-6 intro-column">
        <div class="info-game">
          <h3>
            Map, Dungeons, Rooms, and Oh My NFT!
          </h3>
          <p class="text-body-2">Exploring possibilities of NFT based gaming.</p>
            
          <div class="row">
            <div class="col ctaWrap" >
                <v-btn @click="() => {router.push('/')}" class="btn hero">Get Started »</v-btn>
                <nuxt-link to="/" class="btn hollow asButton">Get Started »</nuxt-link>
                <nuxt-link to="#more" class="btn hollow asButton">More...</nuxt-link>
              
            </div>
            
          </div>
        </div>
      </div>
      <div class="col col-6 intro-column">

        <img src="~/assets/images/screenshot.png" width="100%" class="hero-image" />
      </div>
    </section>
    <section class="row ma-0 content">
        <div class="col col-6 intro-column ">
          <h3>What if you could make your own games using the NFT assets you already own</h3>
        </div>
        <div class="col col-6 intro-column">
          <h3>Goal</h3>
          <p>Present ideas for how NFT's can be used as game elements, combining assets from different projects in new and interesting ways.</p>
          <p>Ideally, a systematic approach</p>
          <p>Replayable games</p>
          <p>set your own prizes, rules, teams, win conditions</p>
          <h4>Notes:</h4>
            <ul style="margin: 0; padding: 0;">
              <li class="small">Beta functionality: use at your own risk</li>
              <li class="small">Minting Fee: 0.1</li>
            </ul>
        </div>
      
    </section> -->
    <!-- <Footer /> -->
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
