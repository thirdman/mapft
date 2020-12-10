<template>
  <div class="pageContainer">
    <Header />
    <section id="gallery" class>
      <div class="tertiary">
        <div class="sidebarSection">
          <div class="primaryMeta">
            <div class="metaItem">
              <label>Gallery</label>
              <div class="row">
                <div class="column col-90">
                  <div class="small">
                    <span style="display: inline-block" class="galleryIdWrap">
                    <Address shrink :address="galleryContractId"/> <span v-if="hasCopied" class="copyConfirm small">Copied!</span>
                    </span>
                    <Button @click="handleCopy" mode="hollow" v-if="!hasCopied" >
                      <IconCopy size="small"/>
                    </Button>
                    <div class="hiddenInputWrap" style="visibility: visible; width: 1px; height: 1px; opacity: 0; overflow: hidden; pointer-events: none; position: relative;">
                      <input type="text" id="copy-string" :value="galleryContractId" style=" position: absolute; z-index: -1">
                    </div>
                  </div>
                </div>
                <div class="column col-10">
                  <Button
                    mode="hollow"
                    :filled="activityId === galleryContractId" 
                    @click="updateFollowing({id: galleryContractId, name: galleryMeta.name, symbol: galleryMeta.symbol, owner: galleryMeta.owner})">
                      <IconHeart size="small" :strokeClass="contrastMode" :active="isFollowing(usedContractsObj, galleryContractId)" />
                    </Button>
                </div>
              </div>
              
            </div>
            <div class="loadingWrap" v-if="isLoadingMeta">
              <Loading fillClass="light" />
            </div>
            <div class="metaItem" v-if="galleryMeta">
              <label>Name</label>
              <div class="small">{{galleryMeta.name}}</div>
              <label>Symbol</label>
              <div class="small symbol">{{galleryMeta.symbol}}</div>
              <label>Tokens</label>
              <div class="small">{{galleryMeta.count}}</div>
              <label>Owner</label>
              <div class="small">
                <Address shrink :address="galleryMeta.owner"/>
              </div>
            </div>
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
        <!-- <div v-if="galleryAssets">
          <Button @click="getGalleryMeta(galleryContractId)">Get Meta</Button>
        </div> -->
        <div v-if="walletAddress && usedContracts && usedContracts.length > 0 &&  1===2" class="sidebarSection">
          <label>Your Contracts</label>
          <GalleriesUserMenu :contracts="usedContracts" :contrastMode="contrastMode" />
        </div>
        <div class="sidebarSection" v-if="1===2">
          <div v-if="galleryStatus !== 'loading' && (!usedContracts || usedContracts && usedContracts.length === 0)">
            <label>Featured Galleries</label>
            <GalleriesMenu :galleryContractId="galleryContractId" />
          </div>
        </div>
        <div class="sidebarSection"  v-if="1===2">
          <div v-if="devMode"><Button @click="handleRefresh()">Refresh Assets</Button>
          </div>
        </div>
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
import {
  readThatMeta,
} from "../../../utils/web3Read";
const BASE_URL = process.env.tempUrl || "https://infinft.app"
import ogImagePreview from '~/assets/images/preview.jpg'

export default {
  name: 'GalleryPage',
  head: {
    title: 'InfiNFT Gallery',
    meta: [
      // { hid: 'og:title', name: 'og:title', content: `InfiNFT | ${this.galleryName}` },
      { hid: 'description', name: 'description', content: 'A NFT platform with a focus on extendability, flexibility, and on-chain data.' },
      { hid: "og:site_name", name: "og:site_name", content: "InfiNFT" },
      { hid: "og:type", name: "og:type", content: "website" },
      {
          hid: "og:image",
          property: "og:image",
          content: BASE_URL + ogImagePreview
        },
    ],
  },
  created() {
    // console.log('created client')
    // console.log('this.$router', this.$router)
    //  console.log('this.$route.params.contract', this.$route.params.contract)
    // console.log('this.$store.ui', this.$store.state.ui.walletNetwork)
    
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
      galleryMeta: null,
      galleryName: "",
      isLoadingMeta: false,
    }
  },
  async mounted() {
    const contractId = this.$route.params.contract;
    if(!contractId){return null}
    this.isLoadingMeta = true;
    const params = {
      contractId: contractId,
      tokenId: 1
    }
    const metaData = await this.handleGalleryMeta(params).then(result => {
        return result
      }).catch(error => console.error(error));
    this.galleryMeta = metaData
    this.galleryName = metaData && metaData.name
    this.isLoadingMeta = false;
  },

  computed: {
    ...mapFields('galleryStore', ['galleryContractId']),
    ...mapGetters({
      devMode: 'ui/devMode',
      uiMode: 'ui/uiMode',
      uiTheme: 'ui/uiTheme',
      contrastMode: 'ui/contrastMode',
      walletAddress: 'ui/walletAddress',
      usedContracts: 'ui/usedContracts',
      usedContractsObj: 'ui/usedContractsObj',
      activityId: "ui/activityId",
      // GALLERY
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
    ...mapActions({
      handleGalleryMeta: 'ui/handleGalleryMeta',
      updateFollowing: 'ui/updateFollowing',
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
      const fullUrl = myUrl + '?ui=' + tempUiMode + '&theme=' + tempUiTheme;
      return encodeURIComponent(fullUrl);
    },
    handleCopy () {
      let stringToCopy = document.querySelector('#copy-string')
      console.log('stringToCopy', stringToCopy)
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
      // stringToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    },
    async getGalleryMeta(contractId, source){
      const galleryArray = this.galleryAssets;
      // console.log('readThatMeta', readThatMeta);
      // const lastId = galleryArray.length ? galleryArray.length : 1;
      const lastId = galleryArray[0] && galleryArray[0].token_id || 1;
      // console.log('getGalleryMeta', lastId)
      const params = {
        contractId: contractId,
        tokenId: lastId
      }
      // console.log('params: ', params)
      this.isLoadingMeta = true
      const metaData = await this.handleGalleryMeta(params).then(result => {
        return result
      }).catch(error => console.error(error));
      // console.log('metaData: ', metaData);
      this.galleryMeta = metaData
      this.isLoadingMeta = false;
    },
    handleFollowing(id){
      console.log('toggleFollowing', id)
      console.log('usedContractsObj', this.usedContractsObj)
    },
    isFollowing(contractsArray, targetId, ){
      if(!contractsArray || !targetId){return false};
      console.log('isfolowing', targetId, contractsArray);
      const filtered = contractsArray.filter(item => item.id === targetId);
      console.log('isfollowing filtered', filtered)
      return filtered.length > 0
    }
  },
}
</script>

<style lang="scss">
.symbol{
  text-transform: uppercase;
}
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
