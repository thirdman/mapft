<template>
  <div class="pageContainer">
    <Header />

    <section id="gallery" class>
      <div class="tertiary">
        <hr />
        <div>
          <label>Featured Galleries</label>
          <GalleriesMenu :galleryContractId="galleryContractId" />
          <label>User Contracts</label>
          <GalleriesUserMenu />
        </div>
      </div>
      <div class="primary">
        <h4>User Gallery</h4>
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
            v-model="galleryContractId"
          />
          </div>
          <div class="col-33 column">
          <Button size="medium" @click="handleLoad">
            Load Gallery
          </Button>
          <Button size="medium" @click="handleLoad">
            Load Active
          </Button>
          </div>
        </div>
        <h4>Featured Galleries</h4>
        <GalleriesMenu />
        
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
    
    if (process.client) {
      // NO LONGER NEEDED - use contract page
      // console.log('triger on created: ')
      // this.$store.commit('galleryStore/getItems')
    }
  },
  computed: {
    ...mapFields('galleryStore', ['galleryContractId']),
    ...mapGetters({
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
      console.log('this.galleryContractId', this.galleryContractId)
      $nuxt._router.push(`/gallery/${this.galleryContractId}`)
    },
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
