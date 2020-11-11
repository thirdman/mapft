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
      <div><Button @click="handleRefresh()">Refresh Assets</Button></div>
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
        <div>
        <a 
          target="_blank" 
          :href="`https://twitter.com/intent/tweet?url=${getUrl()}&text=${'A gallery on InfiNFT'}&related=nft4ever,nft42`" 
          class="shareLink asButton full" 
          >
            <IconExternalLink strokeClass="contrastMode" size="small" /> Share
        </a>
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
const BASE_URL = "https://infinft-flow.vercel.app"
export default {
  name: 'SetPage',
  head: {
    title: 'InfiNFT Token Set',
    meta: [
      { hid: 'description', name: 'description', content: 'A NFT platform with a focus on extendability, flexibility, and on-chain data.' },
      { hid: "og:site_name", name: "og:site_name", content: "InfiNFT" },
      { hid: "og:type", name: "og:type", content: "website" },
      { hid: "og:title", name: "og:title", content: "InfiNFT Gallery Set" },
      {
          hid: "og:image",
          property: "og:image",
          content: `${BASE_URL}/images/preview.jpg`
        },
    ],
  },
  created() {
    // console.log('created client')
    // console.log('this.$router', this.$router)
    //  console.log('this.$route.params.contract', this.$route.params.contract)
    // console.log('this.$store.ui', this.$store.state.ui.walletNetwork)
    // console.log('this.$config.network', this.$config.network)
    
    if (process.client) {
      console.log('this.$route.params.set: ', this.$route.params.set)
      this.$store.commit(
        'galleryStore/setGalleryContractId',
        this.$route.params.contract
      )

      this.$store.commit('galleryStore/getItems', {
        contractId: this.$route.params.contract, 
        setId: this.$route.params.set
      })
    }
  },
  mounted() {
    console.log('triger on mounted d: ', this.$route.params)
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
    handleRefresh() {
      console.log('refresh');
        this.$store.commit('galleryStore/getItems', {
        contractId: this.$route.params.contract,
      })
    },
    getUrl(){
      const myUrl = BASE_URL + this.$route.fullPath;
      const tempUiMode = "minimal";
      const tempUiTheme = "charcoal";
      const fullUrl = myUrl + '?mode=' + tempUiMode + '&theme=' + tempUiTheme;
      return encodeURIComponent(fullUrl);
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
.shareLink{
  flex-grow: 0;
  margin-left: .5rem;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shareLink.full{
  width: 100%;
  flex-grow: 1;
  font-size: .75rem;
}
</style>
