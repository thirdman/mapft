<template>
  <div class="pageContainer">
    <Header />
    <section class="row hero  content">
      <div class="col" >
        <h1>Game <br />Elements <br />as NFT</h1>
        <h4>» NFT as Game Elements</h4>
      </div>
      <!-- <div class="col col-1" style="text-align: center; display: grid; place-items: center; align-self: center">
       <h1>«<br />»</h1>
      </div>
      <div class="col">
        <h1>NFT as <br />Game <br />Elements</h1>
      </div> -->
    </section>
    <section class="row ma-0 content">
      <div class="col col-6 intro-column">

        <img src="~/assets/images/screenshot.png" width="100%" class="hero-image" />
      </div>
      <div class=" col col-6 intro-column">
        <div class="info-game">
          <p class="text-body-1">Exploring possibilities of on-chain based gaming, building resources from elements that are re-usable NFT's - because why shouldn't you be able to use your assets elsewhere?</p>
          <div class="row">
            <div class="col ctaWrap" >
                <!-- <v-btn @click="() => {router.push('/')}" class="btn hero">Get Started »</v-btn> -->
                <nuxt-link to="/game/demo" class="btn hero asButton">Get Started »</nuxt-link>
                <nuxt-link to="#more" class="btn hollow asButton">More...</nuxt-link>
              
            </div>
            
          </div>
        </div>
      </div>
      
    </section>
    <section class="row ma-0 content">
        <div class="col col-6 intro-column ">
          <h2>
            Maps, Characters, <br />Rewards, and - Oh My NFT!
          </h2>
          <h4>Make games using the <br />NFT assets you already own</h4>
        </div>
        <div class="col col-6 intro-column">
          <h3>Goal</h3>
          <p>Create and play boardgame-like games, using their NFT's as maps, units, loot and rewards. </p>
          <h3>Our Dream</h3>
          <ul>
          <li>User createable games</li>
          <li>Use assets from other projects</li>
          <li>Allow user creatable content</li>
          <li>Assign prizes to your games, using smart-contract victory conditions</li>
          </ul>
          
        </div>
      
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
