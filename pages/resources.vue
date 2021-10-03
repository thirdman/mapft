<template>
  <div class="pageContainer">
    <Header />
    <section class="row ma-0 content herp">
      <div class=" col">  
          <h1>
            NFT Elements for your games
          </h1>
      </div>
      
      
    </section>
    <section class="row ma-0 content">
      <div class=" col col-6 intro-column">
        <div class="info-game">
          <h3>
            Elements to make your games
          </h3>
          <p class="text-body-2">Games are made of elements. Elements are NFT.</p>
          
        </div>
      </div>
      <div class="col col-6 intro-column">
        <h3>&nbsp;</h3>
          <ul>
            <li>
              Map Tiles
            </li>  
            <li>
              Player Icons
            </li>  
            <li>
              Features & Upgrades
            </li>  
            <li>
              Value Generation
            </li>  
            <li>
              Loot & Rewards
            </li>
            <li>
              Villains and Creatures
            </li>
            <li>
              Cards and Chance Creation Tools
            </li>
          </ul>
      </div>
    </section>
    <v-divider />
    <section class="row ma-0 content">
      <div class=" col col-6 intro-column">
        <div class="info-game">
          <h2>
            Map Tiles
          </h2>
          <p class="text-body">A Genesis set of NFT tiles for your games.</p>
        </div>
      </div>
      <div class="col col-6 intro-column">
          <div class="row">
            <p class="text-body">16 variations designed to join for infinite variation.</p>
            <!-- <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/6.png" width="100%" class="hero-image" style="background: url(https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/0.jpg) top left no-repeat; background-size: 100%;" /> -->
            <div class="example=tile-row">
              
              <img v-for="(img, index) in tileIndexArray" :key="index" :src="`https://ipfs.cf-ipfs.com/ipfs/${tileSetId}/${img}.png`" width="110px" class="hero-image-preview" style="" />
              
            </div>
          </div>
          <div class="row">
            <p class="text-body">16 variations designed to join for tiling in infinite directions.</p>
            <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/6.png" width="100%" class="hero-image" style="background: url(https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/0.jpg) top left no-repeat; background-size: 100%;" />
            <div class="example=tile-row">
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/1.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/2.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/3.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/4.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/5.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/6.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/7.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/8.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/9.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/10.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/11.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/12.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/13.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/14.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/15.png" width="120px" class="hero-image-preview" style="" />
              <img src="https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/0.jpg" width="120px" class="hero-image-preview" style="" />
            </div>
          </div>

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
  },
  data(){
    return {
      tileIndexArray: [
0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
      ],
      tileSetId: 'Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk'
    }
  }
}
</script>

<style lang="scss">
  .example-tile-row{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .hero-image-preview {
    border: 1px solid white;
    box-shadow: 0 2px 7px black;
    margin: 4px;
  }
</style>
