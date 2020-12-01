<template>
  <div class="pageContainer">
    <Header />
    <section id="gallery" class>
      <div class="tertiary" >
        <div class="sidebarSection">
          <label>Gallery</label>
          <div class="">
            <!-- <IconExternalLink :strokeClass="contrastMode" size="small" /> -->
          <span style="display: inline-block" class="galleryIdWrap">
            <Address shrink :address="galleryContractId"/> <span v-if="hasCopied" class="copyConfirm small">Copied!</span></span>
            <Button @click="handleCopy" mode="hollow" v-if="!hasCopied"><IconCopy size="small"/></Button>
          <input type="text" id="copy-string" :value="galleryContractId" style="visibility: hidden; position: absolute; z-index: -1">
          </div>
        </div>
        <div class="sidebarSection">
          <label>Share</label>
          <div>
            <a 
              target="_blank" 
              :href="`https://twitter.com/intent/tweet?url=${getUrl()}&text=${'A gallery on InfiNFT'}&related=nft4ever,nft42`" 
              class="shareLink asButton full" 
              >
                <IconExternalLink :strokeClass="contrastMode" size="small" /> Twitter
            </a>
          </div>
        </div>
        <div v-if="usedContracts && usedContracts.length > 0" class="sidebarSection">
          <label>Your Contracts</label>
          <GalleriesUserMenu :contracts="usedContracts" :contrastMode="contrastMode" />
        </div>

        <div v-if="galleryStatus !== 'loading' && (!usedContracts || usedContracts && usedContracts.length === 0)">
          <label>Featured Galleries</label>
          <GalleriesMenu :galleryContractId="galleryContractId" />
        </div>
        <div v-if="devMode"><Button @click="handleRefresh()">Refresh Assets</Button></div>
        <div class="sidebarSection">
          <label>Display</label>
          <div>
          <div class="buttonGroup uiMode" :class="contrastMode" direction="column">
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
          </div>
        </div>
      </div>

      <div class="primary">
        <div>
            <div v-if="galleryStatus === 'loading'" class="loadingWrap">
            <Loading
              message="Retrieving Tokens..."
              size="large"
              :fillClass="contrastMode === 'light' ? 'light' : 'dark'"
            />
          </div>
          
        </div>
        <client-only>
        <div v-if="galleryStatus === 'loaded'">
          <GalleryList
            :displayMode="galleryDisplayMode"
          />
          </div>
        </client-only>
      </div>

      <div class="secondary" >
        <!-- <label>Gallery Contract</label>
        <div
          class="help"
          style="width: 10rem; overflow: hidden; text-overflow: ellipsis;"
        >
          <span>{{ galleryContractId }}</span>
          <div>
            <a 
              target="_blank" 
              :href="`https://twitter.com/intent/tweet?url=${getUrl()}&text=${'A gallery on InfiNFT'}&related=nft4ever,nft42`" 
              class="shareLink asButton full" 
              >
                <IconExternalLink :strokeClass="contrastMode" size="small" /> Share
            </a>
        </div>
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
        </div> -->

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
  name: 'GalleryPage',
  head: {
    title: 'InfiNFT Gallery',
    meta: [
      { hid: 'description', name: 'description', content: 'A NFT platform with a focus on extendability, flexibility, and on-chain data.' },
      { hid: "og:site_name", name: "og:site_name", content: "InfiNFT" },
      { hid: "og:type", name: "og:type", content: "website" },
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
  data(){
    return {
      copyString: "",
      hasCopied: false,
    }
  },
  computed: {
    ...mapFields('galleryStore', ['galleryContractId']),
    ...mapGetters({
      devMode: 'ui/devMode',
      uiMode: 'ui/uiMode',
      uiTheme: 'ui/uiTheme',
      contrastMode: 'ui/contrastMode',
      usedContracts: 'ui/usedContracts',
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
      const tempUiMode = this.uiMode || "minimal";
      const tempUiTheme = this.uiTheme || "charcoal";
      const fullUrl = myUrl + '?mode=' + tempUiMode + '&theme=' + tempUiTheme;
      return encodeURIComponent(fullUrl);
    },
    handleCopy () {
      let stringToCopy = document.querySelector('#copy-string')
      stringToCopy.setAttribute('type', 'text') 
      stringToCopy.select()

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('string was copied ' + msg);
        this.hasCopied=true
        const unset = () => {
          this.hasCopied=false
        };
        setTimeout(() => unset(), 1000);
      } catch (err) {
        console.log('Oops, unable to copy');
        this.hasCopied=true
      }

      /* unselect the range */
      stringToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
      
    },
  },
}
</script>

<style lang="scss">
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
.sidebarSection{
  margin-bottom: 1rem;
  > label{
    margin-bottom: .5rem;
  }
}
.galleryIdWrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.copyConfirm{
  background: var(--success-color);
  padding: 1px .25rem;
  border-radius: .25rem;
  font-size: .75rem;
  font-variation-settings: 'wght' 600;
  color: #fff;
}
</style>
