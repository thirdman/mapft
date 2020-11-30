<template>
  <div class="pageContainer">
    <Header />

    <section id="gallery" class>
      <div class="tertiary">
        <label>Galleries</label>
        <p class="small">A gallery displays the tokens created by a contract.
        </p>
        
        <div v-if="usedContracts && usedContracts.length > 0">
          <label>Your Contracts</label>
          <p class="small">Contracts you have created</p>
          <GalleriesUserMenu :contracts="usedContracts" />
        </div>
      </div>
      <div class="primary">
        <h4>Load Gallery Contract</h4>
        <div class="loadContractRow row">
          <div class="column col-66">
          <input
            name="Contract Id"
            id="galleryContractId"
            class="hero"
            type="string"
            max="99"
            required
            placeholder="0xd0c402bcbcb5e70157635c41b2810b42fe592bb0"
            v-model="tempContractId"
          />
          </div>
          <div class="col-33 column">
            <!-- <nuxt-link :to="`/gallery/${tempContractId}`">Load</nuxt-link> -->
            <!-- <nuxt-link :to="`/gallery/0xd0c402bcbcb5e70157635c41b2810b42fe592bb0`">Load</nuxt-link> -->
          <Button size="large" @click="handleLoad(tempContractId)" :disabled="!tempContractId">
            Load Gallery
          </Button>
          <!-- <Button size="medium" @click="handleLoad">
            Load Active
          </Button> -->
          </div>
        </div>
        <h4>Featured Galleries</h4>
        <GalleriesMenu />
        <p class="small">Talk to us on Discord to be listed here.</p>
        <h4>Elsewhere</h4>
        <figure>
          <img src="~/static/images/alpha.jpg" width="200px" />
          <figcaption>Alpha Series</figcaption>
        </figure>

        <figure>
          <img src="~/static/images/cryptovoxels.jpg" width="200px" />
          <figcaption>Crypto Voxels Gallery</figcaption>
        </figure>
      </div>
      <div class="secondary">
        <label>Elsewhere</label>
        <GalleriesElsewhere :galleryContractId="galleryContractId" />
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'GalleryPage',
  created() {
    // this.setInitialAccount();
    if (process.client) {
      // NO LONGER NEEDED - use contract page
      // console.log('triger on created: ')
      // this.$store.commit('galleryStore/getItems')
    }
  },
  data() {
    return {
      tempContractId: "0xa0AfEDcC9446fD1F41706EaA4931512bDb2efAe7"
    }
  },
  computed: {
    ...mapFields('galleryStore', ['galleryContractId']),
    ...mapGetters({
      activeContractId: "ui/activeContractId",
      usedContracts: "ui/usedContracts",
      galleryContractId: 'galleryStore/galleryContractId',
      galleryAssets: 'galleryStore/galleryAssets',
      galleryStatus: 'galleryStore/galleryStatus',
      galleryDisplayMode: 'galleryStore/galleryDisplayMode',
    }),
    displayMode() {
      // return 'expanded'
      // return 'compact'
      return 'full'
    },
  },
  methods: {
    ...mapMutations({
      getItems: 'galleryStore/getItems',
      setGalleryDisplayMode: 'galleryStore/setGalleryDisplayMode',
    }),
    handleLoad(contractId) {
      if(!contractId){return}
      console.log('$nuxt._router', $nuxt._router)
      console.log('contractId', contractId)
      
      $nuxt._router.push({ path: `/gallery/${contractId}`});
    },
    setInitialAccount() {
      setTimeout(() => {
        this.tempContractId = this.activeContractId
      }, 800);
    }
  },
}
</script>

<style>
.linkRow {
  padding: 20px;
  min-height: 100px;
  justify-content: center;
  align-items: center;
}
.loadingWrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.loadContractRow {
  flex-basis: auto;
  padding: 1rem 0;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: var(--line-color, #eee);
  border-radius: .5rem;
  padding: .5rem;
}
.loadContractRow input{
  width: 100%;
}
.loadContractRow button{
  margin-left: .5rem;
}
figure {
  margin: 0.25rem;
  background: var(--line-color, rgba(0, 0, 0, 0.05));
  display: inline-block;
  padding: 0.25rem;
  vertical-align: top;
}
</style>
