<template>
  <div class="pageContainer">
    <Header />
    <section id="gallery" class>
      <div class="tertiary">
        
        <div>
          <label>Featured Galleries</label>
          <GalleriesMenu :galleryContractId="galleryContractId" />
          <label>Elsewhere</label>
          <GalleriesElsewhere :galleryContractId="galleryContractId" />
        </div>
      </div>

      <div class="primary">
        <div v-if="galleryStatus === 'loading'" class="loadingWrap">
          <Loading
            message="Retrieving Tokens..."
            size="large"
            :fillClass="contrastMode === 'light' ? 'light' : 'dark'"
          />
        </div>
        <div v-if="!galleryAssets && galleryStatus !== 'ready'">
          <h3><IconError /> assets Loaded</h3>
        </div>
        <client-only>
          
          <GalleryList
            :displayMode="galleryDisplayMode"
            v-if="galleryStatus === 'loaded'"
          />
        </client-only>
      </div>

      <div class="secondary">
        <label>Gallery Contract</label>
        <div
          class="help"
          style="width: 10rem; overflow: hidden; text-overflow: ellipsis;"
        >
          <span>{{ galleryContractId }}</span>
        </div>
        <label>Display</label>
        <div class="buttonGroup uiMode" :class="contrastMode">
          <button
            @click="setGalleryDisplayMode('compact')"
            class="small toggleItem"
            :class="galleryDisplayMode === 'compact' ? 'active' : 'notActive'"
          >
            Compact
          </button>
          <button
            @click="setGalleryDisplayMode('expanded')"
            class="small toggleItem"
            :class="galleryDisplayMode === 'expanded' ? 'active' : 'notActive'"
          >
            Expanded
          </button>
          <button
            @click="setGalleryDisplayMode('list')"
            class="small toggleItem"
            :class="galleryDisplayMode === 'list' ? 'active' : 'notActive'"
          >
            Full
          </button>
        </div>

        <label>Opensea</label>
        <div
          class
          style="width: 10rem; overflow: hidden; text-overflow: ellipsis;"
          v-if="galleryAssets"
        >
          <a
            :href="'https://opensea.io/assets/' + galleryContractId"
            target="_blank"
            class="outLink"
            >InfiNFT Alpha on Opensea</a
          >
        </div>
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
  head: {
    title: 'InfiNFT Gallery',
    // meta: [
    //   { hid: 'description', name: 'description', content: 'View a cool nft' },
    // ],
  },
  created() {
    // console.log('created client')
    // console.log('this.$router', this.$router)
    //  console.log('this.$route.params.contract', this.$route.params.contract)
    // console.log('this.$store.ui', this.$store.state.ui.walletNetwork)
    // console.log('this.$config.network', this.$config.network)
    if (process.client) {
      console.log('triger on created: ')

      this.$store.commit(
        'galleryStore/setGalleryContractId',
        this.$route.params.contract
      )

      this.$store.commit('galleryStore/getItems', {
        contractId: this.$route.params.contract,
      })
    }
  },
  computed: {
    ...mapFields('galleryStore', ['galleryContractId']),
    ...mapGetters({
      contrastMode: 'ui/contrastMode',
      galleryContractId: 'galleryStore/galleryContractId',
      galleryAssets: 'galleryStore/galleryAssets',
      galleryStatus: 'galleryStore/galleryStatus',
      galleryDisplayMode: 'galleryStore/galleryDisplayMode',
    }),
    displayMode() {
      return 'expanded'
      // return 'compact'
      // return 'full'
    },
  },
  methods: {
    ...mapMutations({
      getItems: 'galleryStore/getItems',
      setGalleryDisplayMode: 'galleryStore/setGalleryDisplayMode',
    }),
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
</style>
