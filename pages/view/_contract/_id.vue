<template>
  <div class="pageContainer">
    <Header />
    <div id="searchRow" class="row searchRow" v-if="showSearch && 1===2">
      <div class="form entry">
        <div class="w3-row row">
          <div class="formItem column col-50">
            <label for="searchContractId">Art Contract</label>
            <input
              name="Contract Id"
              oldId="ww"
              id="searchContractId"
              class="hero"
              type="string"
              max="99"
              required
              placeholder="0xd0c402bcbcb5e70157635c41b2810b42fe592bb0"
              v-model="searchContractId"
            />
          </div>

          <div class="formItem column col-50">
            <label for="searchTokenId">Token ID</label>
            <input
              name="Token Id"
              oldId="w"
              id="searchTokenId"
              type="number"
              min="1"
              class="hero small"
              placeholder="1"
              v-model="searchTokenId"
            />
          </div>

          <div class="formItem column col-66">
            <label>&nbsp;</label>
            <button id="xx" type="submit" class="w3-black btn-large" @click="doTest">
              <!-- onClick='toggleVisibility("searchRow", "hidden")' -->
              READ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <section id="readStart" class="read borderBottom" v-if="!viewData">
      <div class="tertiary"></div>
      <div class="primary">
        <div class="loadingWrap" v-if="viewStatus === 'loading'">
          <Loading message="Loading Content" />
        </div>
      </div>
      <div class="secondary"></div>
    </section>-->

    <!-- <button @click="setViewStatus('loading')">set loading</button> -->
    <section id="read" class="read showMeta borderBottom">
      <div class="tertiary">
        <div class="galleryLinkWrap" v-if="uiMode !== 'none'">
          <nuxt-link :to="/gallery/ + contractId" class="galleryLink asButton">
            <IconBack strokeClass="contrastMode" />
            <span>Back to gallery</span>
          </nuxt-link>
          <a 
            target="_blank" 
            :href="`https://twitter.com/intent/tweet?url=${getUrl()}&text=${viewData && viewData.title + ' on InfiNFT: ' + viewData.description}&related=nft4ever,nft42`" 
            class="shareLink asButton" 
          >
            <IconExternalLink :strokeClass="contrastMode" size="small" />
          </a>
        </div>
        <div v-if="uiMode !== 'none'" class="primaryMeta">
          <div class="metaItem">
            <h2
              id="metadata2"
              class="theTitle"
              v-if="uiMode === 'full'"
            >{{ (viewData && viewData.title) || tempViewItem.title || '' }}</h2>
            <h6 id="metadata2" class="theTitle" v-if="uiMode !== 'full'">
              <label style="display: block;">Title</label>
              {{ (viewData && viewData.title) || tempViewItem.title || '' }}
            </h6>
            <div v-if="viewStatus === 'loading' && !viewData" class="loadingPlaceholder">
              <Loading text="lo" size="small" :fillClass="contrastMode" />
            </div>
          </div>

          <div class="metaItem">
            <label style="display: block;">Creator</label>
            <h6 id="metadata3" class="theAuthor">{{ (viewData && viewData.authorName) || '' }}</h6>
            <div v-if="viewStatus === 'loading' && !viewData" class="loadingPlaceholder">
              <Loading text="lo" size="small" :fillClass="contrastMode" />
            </div>
          </div>
          <div class="metaItem">
            <label>Description</label>
            <div id="metadata4" class="aside">
              <p>
                {{
                (viewData && viewData.description) ||
                tempViewItem.description ||
                ''
                }}
              </p>
              <div v-if="viewStatus === 'loading' && !viewData" class="loadingPlaceholder">
                <Loading text="lo" size="small" :fillClass="contrastMode" />
              </div>
            </div>
          </div>
          <div class="metaItem" v-if="viewData && viewData.exhibition">
            <label>Set</label>
            <div id="metadata4" class="aside">
              <p>
                <nuxt-link :to="`/gallery/${contractId}/${viewData.exhibition}`" class="asButton">
                {{viewData.exhibition}}
                </nuxt-link>
              </p>
            </div>
          </div>
        </div>
        
        <div v-if="viewData && uiMode !== 'none'" class="pagingNav">
          <a @click="navigate(parseInt(tokenId) - 1)" class="galleryLink asButton prev">
            <IconChevron strokeClass="contrastMode" />
            <span>Prev</span>
          </a>
          <a @click="navigate(parseInt(tokenId) + 1)" class="galleryLink asButton next transparent">
            <!-- :to="`/view/${contractId}/${parseInt(tokenId) + 1}`" -->
            <span>Next</span>
            <IconChevron strokeClass="contrastMode" />
          </a>
        </div>
        <ViewControls :fileType="viewData && viewData.fileType" />
      </div>
      <div class="primary">
        <!-- ERROR: displays error when no token found -->
        <div class="error noToken">
          <h4>Error</h4>
          <p>No token found.</p>
        </div>

        <div id="readContent" class="output">
          <!-- {{tempViewItem.imageUrlThumbnail}} | {{viewStatus}} |  {{viewData && viewData.fileIpfsHash  ? " has view data" : " no view data"}} -->
          <div class="row readContentRow">
            <div
              class="column col-100 imageColumn"
              v-if="(!viewData || viewData && !viewData.fileIpfsHash) && viewStatus !== 'error'"
            >
              <div class="imageLoadingWrap">
                <img
                  src="~/assets/images/defaultImageTransparent.png"
                  style="width: 100%; height: auto;"
                  class="previewImage"
                  v-if="!tempViewItem.imageUrlThumbnail"
                />
                <img
                  :src="tempViewItem && tempViewItem.imageUrlThumbnail"
                  style="width: 100%; height: auto;"
                  class="previewImage"
                  v-if="tempViewItem && tempViewItem.imageUrlThumbnail"
                />
                <div class="previewLoading">
                  <div class="previewLoadingPill">
                    <Loading
                      message="Loading Data..."
                      size="large"
                      :fillClass="contrastMode === 'light' ? 'light' : 'dark'"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- error no content -->
            <div class="column col-100 imageColumn" v-if="!viewData.fileIpfsHash && viewStatus === 'error'">
              <div class="errorWrap">
                <h4>No data</h4>
                <p>
                  This could be because the token does not exist, or connection
                  was lost. Either way, there's nothing to show.
                </p>
                <div class="row">
                  <nuxt-link :to="/gallery/ + contractId" class="galleryLink asButton">
                    <IconBack strokeClass="contrastMode" />
                    <span>Back to gallery</span>
                  </nuxt-link>
                  <nuxt-link
                    :to="`/view/${contractId}/${
                      tokenId - 1 === 0 ? tokenId : tokenId - 1
                    }`"
                    class="galleryLink asButton prev"
                  >
                    <IconChevron strokeClass="contrastMode" />

                    <span>Previous Token</span>
                  </nuxt-link>
                  <nuxt-link :to="`/view/${contractId}/${1}`" class="galleryLink asButton prev">
                    <IconChevron strokeClass="contrastMode" />

                    <span>First Token</span>
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div class="column col-100 imageColumn" style="padding-bottom: 4rem;" v-if="viewData && viewData.fileIpfsHash"
            
            >
              <RenderItem
                :item="viewData"
                :fileType="viewData.fileType"
                :src="viewData.fileIpfsUrl"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="secondary" v-if="viewData">
        <div class="column col-66 metaColumn" v-if="viewData && uiMode !== 'none'">
          <ToggleSection v-if="viewData">
            <span slot="header">Token Info</span>
            <div slot="content">
              <div class="formItem">
                <label>ID</label>
                <div class="small">{{ tokenId }}</div>
              </div>
              <div class="formItem">
                <label>Edition</label>
                <div class="small">{{ viewData.edition }} of {{ viewData.editions }}</div>
              </div>
              <div class="formItem">
                <label>File Type</label>
                <div class="small" id="metadata7">{{ viewData.fileType }}</div>
                <div class="small" >{{ getHumanSize() }}</div>
              </div>
              <div class="formItem">
                <label>Exhibition</label>
                <div class="small" id="metadata8">{{ viewData.exhibition }}</div>
                <br />
              </div>
            </div>
          </ToggleSection>

          <ToggleSection v-if="viewData">
            <span slot="header">Reference Links</span>
            <div slot="content">
              <div class="formItem">
                <label>Opensea</label>
                <div id="link0" class="w3-small">
                  <a
                    :href="
                      this.openseaUrlBase +
                      contractId +
                      '/' +
                      tokenId
                    "
                    target="_blank"
                    class="metaLink"
                  ><IconExternalLink size="small" />View on Opensea</a>
                </div>
              </div>
              <div class="formItem">
                <label>Etherscan</label>
                {{this.etherscanUrlBase }} |
                {{this.etherscanUrlBase +
                      'token/' +
                      contractId +
                      '#readContract'}}
                <div class="w3-small">
                  <a
                    :href="
                      this.etherscanUrlBase +
                      'token/' +
                      contractId +
                      '#readContract'
                    "
                    target="_blank"
                    class="metaLink"
                  ><IconExternalLink size="small" />View on Etherscan</a>
                </div>
              </div>
              <div class="formItem">
                <label>IPFS</label>
                <div id="link0" class="w3-small ">
                  <a :href="`https://ipfs.io/ipfs/${viewData.fileIpfsHash}`" target="_blank" v-if="viewData.fileIpfsHash" class="metaLink" ><IconExternalLink size="small" />
                  <Address :address="viewData.fileIpfsHash" />
                  </a>
                </div>
              </div>
              <div class="formItem">
                <label>Arweave</label>
                <div id="link1" class="w3-small ">
                  <a :href="`https://arweave.net/${viewData.fileArweaveHash}`" target="_blank" v-if="viewData.fileArweaveHash" class="metaLink"><IconExternalLink size="small" />
                  <Address :address="viewData.fileArweaveHash" /></a>
                </div>
              </div>
            </div>
          </ToggleSection>

          <ToggleSection v-if="viewData">
            <span slot="header">Royalty Info</span>
            <div slot="content">
              <div class="formItem">
                <label>Artist Address</label>
                <div id="royalty0" class="w3-small">{{ viewData.artistAddress }}</div>
              </div>
              <div class="formItem">
                <label>Royalty Fee</label>
                <div id="royalty1" class="w3-small">{{ viewData.royaltyFee }}%</div>
              </div>
            </div>
          </ToggleSection>

          <ToggleSection v-if="viewData">
            <span slot="header">Owner </span>
            <div slot="content">
              <div class="formItem">
                <label>Owned By:</label>
                <div id="owner0" class="w3-small" v-if="!isOwner">
                  <Address :address="viewData.ownerAddress" :fill="true" />
                </div>
                <div v-if="isOwner" class="ownerBox">YOU</div>
                <div v-if="isOwner" class="ownerGift">
                  <nuxt-link :to="/gift/ + contractId + '/' + tokenId">Gift this Token...</nuxt-link>
                </div>
              </div>
            </div>
          </ToggleSection>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { humanFileSize } from '../../../utils/misc'
import ogImage from '~/assets/images/default3d.png';

const BASE_URL = process.env.tempUrl || "https://infinft.app"
const rootUrl = process.env.tempUrl;

// import { readThatShit } from '../../../utils/web3Read'
export default {
  name: 'ViewPageParams',
  data() {
    return {
     openseaUrlBase: "https://opensea.io/assets/",
     etherscanUrlBase: "https://etherscan.io/"
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'og:description', name: 'og:description', content: this.description },
        { hid: 'description', name: 'description', content: this.description },
        { hid: "og:title", name: "og:title", content: this.title },
        {
          hid: "og:image",
          property: "og:image",
          // content: (meta && meta.mainImage) || mainImage,
          // content: `${require(`~/assets/images/default3d.png`)}`,
          content: this.previewUrl || this.previewImage,
        },
        
      ],
    }
  },
  beforeMount() {
    console.log("before create", this.tempViewItem)
    // SET THE DATA FOR META
    if(this.tempViewItem){
      console.log('before mount setting data');
      this.test = "mounted"
      this.description = this.tempViewItem.description;
      // this.previewImage = this.tempViewItem.imagePreviewUrl
      this.title = this.tempViewItem.title && `InfiNFT: ${this.tempViewItem.title}`
      console.log('before mount ', this)
    }
  },
  mounted() {
    // console.log(
    //   'mounted this.$store.state.ui.viewData',
    //   this.$store.state.ui.viewData
    // )
    
    console.log(
      'this',
      this
    )
    //&& !this.$store.state.ui.viewData
    if (process.client) {
      console.log('mounted client and no viewData')
      const asyncTokenId = this.$route.params.id
      const asyncContractId = this.$route.params.contract
      this.$store.commit('ui/setViewStatus', 'loading')
      console.log(
        'mounted client asyncTokenId && asyncContractId',
        asyncTokenId,
        asyncContractId
      )
      if (!asyncTokenId || !asyncContractId) {
        return null
      }

      this.$store.commit('ui/setSearchParams', {
        tokenId: asyncTokenId,
        contractId: asyncContractId,
      })
      this.$store.dispatch('ui/handleSearch', {
        tokenId: asyncTokenId,
        contractId: asyncContractId,
      })

      if(this.$config){
        const requiredNetwork = this.$config.requiredNetwork || 'main';
        const openseaUrlBase = 
        requiredNetwork === "main"
          ? "https://opensea.io/assets/"
          : "https://rinkeby.opensea.io/assets/";
        const etherScanUrlBase = requiredNetwork === 'main' ? 'https://etherscan.io/' : 'https://rinkeby.etherscan.io/'
        this.openseaUrlBase = openseaUrlBase;
        this.etherScanUrlBase = etherScanUrlBase;
      }
    }
    if (process.server) {
      console.log('VIEW server mount. Context:', context)
      // const { req, res, beforeNuxtRender } = context
      // console.log('created server')
      // console.log('this.$scopedSlots', this.$scopedSlots)
    }
  },
  destroyed() {
    this.$store.commit('ui/setViewData', {})
    this.$store.commit('ui/setTempViewItem', {})
    console.log('View page destroyed')
  },

  async asyncData(context) {
    const { params, $axios } = context
    const requiredNetwork = context.$config.requiredNetwork;
    console.log('requiredNetwork', requiredNetwork)
    const openseaUrl =
      requiredNetwork === "main"
        ? "https://api.opensea.io"
        : "https://rinkeby-api.opensea.io";
    
    const options = {
      contractId: params.contract,
      tokenId: parseInt(params.id),
    }
    
    const theUrl = `${openseaUrl}/api/v1/asset/${params.contract}/${params.id}/`
    // console.log('async options', options)
    console.log('async theUrl', theUrl)
    
    const { data } = await $axios.get(theUrl);
    // console.log('async data: ', data)
    
    // title: 'View NFT',
    //   description: 'A NFT on InfiNFT',
    //   // previewImage: `${BASE_URL}_nuxt/assets/images/default3d.png`
    //   previewImage: `${BASE_URL}${ogImage}`,
    //   previewUrl:`${BASE_URL}${ogImage}`,
    
    
    console.log('BASE_URL', BASE_URL)
    
    // console.log('calc ogimage url =  ', `${BASE_URL}/${ogImage}`)
    // console.log('calc ogimage url =  ', `${BASE_URL}/assets/images/default3d.png`)
    const tempData = {
      title: `InfiNFT: ${data.name}` || "InfiiNFT: View Token",
      description: data.description || "",
      previewImage: `${BASE_URL}${ogImage}`,
      previewUrl: data.image_preview_url,
    }
    console.log('async tempData', tempData)
    return tempData;
    // console.log('async Web3', Web3)
    // if (!Web3) {
    //   console.log('no Web3')
    //   return null
    // }
    // const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    // return { title: data.title }

    // const asyncData = await readThatShit(options, this)
    // console.log('data', asyncData)
    // .then((result) => {
    //   console.log('asyncDat result', result)
    //   // this.commit('ui/setViewData', result)
    //   // this.commit('ui/setViewStatus', 'loaded')
    // })
    // .catch((error) => console.error(error))
  },

  computed: {
    ...mapGetters({
      uiMode: 'ui/uiMode',
      uiTheme: 'ui/uiTheme',
      contrastMode: 'ui/contrastMode',
      showSearch: 'ui/showSearch',
      searchData: 'ui/searchData',
      viewData: 'ui/viewData',
      viewStatus: 'ui/viewStatus',
      walletAddress: 'ui/walletAddress',
      tempViewItem: 'ui/tempViewItem',
    }),
    tokenId: (context) => {
      return context.$route && context.$route.params.id
    },
    contractId: (context) => {
      // console.log('context.$route', context.$route)
      return context.$route && context.$route.params.contract
    },
    isOwner() {
      if (!this.$store.state.ui.viewData) {
        return null
      }
      const tempWalletAddress =
        this.$store.state.ui.walletAddress &&
        this.$store.state.ui.walletAddress.toLowerCase()
      const tempOwnerAddress =
        this.$store.state.ui.viewData &&
        this.$store.state.ui.viewData.ownerAddress &&
        this.$store.state.ui.viewData.ownerAddress.toLowerCase()

      return (
        tempWalletAddress &&
        tempOwnerAddress &&
        tempWalletAddress === tempOwnerAddress
      )
    },
    ...mapFields('ui', ['searchContractId', 'searchTokenId']),
  },
  methods: {
    ...mapMutations({
      setShowSearch: 'ui/setShowSearch',
      setSearchParams: 'ui/setSearchParams',
      setViewStatus: 'ui/setViewStatus',
    }),
    getTokenId() {
      console.log('this', this)
    },
    doTest() {
      console.log(this)
      this.$store.dispatch('ui/handleSearch')
    },
    navigate(newTokenId) {
      console.log('navigating...', newTokenId, this.contractId)
      this.$store.commit('ui/setTempViewItem', undefined)
      this.$store.commit('ui/setViewData', undefined)
      $nuxt._router.push(`/view/${this.contractId}/${newTokenId}`)
    },
    getHumanSize(size){
      return "23"
    },
    getUrl(){
      const myUrl = BASE_URL + this.$route.fullPath;
      const tempUiMode = this.uiMode || "minimal";
      const tempUiTheme = this.uiTheme || "charcoal";
      const fullUrl = myUrl + '?mode=' + tempUiMode + '&theme=' + tempUiTheme;
      return encodeURIComponent(fullUrl);
    },
     
  },
  actions: {
    ...mapActions({
      handleSearch: 'ui/handleSearch',
    }),
  },
}
</script>

<style lang="scss">
.loadingPlaceholder {
  padding: 0.5rem 0;
}
.galleryLinkWrap {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  padding-bottom: 0.5rem;
  width: 100%;
  padding-left: 0;
  border: none;
}
.galleryLink {
  width: 100%;
  border: none;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  cursor: pointer;
}
.galleryLink .icon {
  flex-grow: 0;
  margin-right: 0.5rem;
}
.galleryLink span {
}
.pagingNav {
  margin-top: 0.5rem;
  border: 1px solid var(--line-color, #eee);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
}
.pagingNav a.asButton {
  text-align: center;
  border: none;
  border-radius: 0;
  justify-content: center;
}
.pagingNav a.asButton:hover {
  background: var(--line-color, #eee);
}
.pagingNav a.asButton .icon {
  margin: 0;
}

.pagingNav a.prev .icon {
  transform: rotate(-90deg) scale(0.75);
}
.pagingNav a.next .icon {
  transform: rotate(90deg) scale(0.75);
}
.pagingNav a:last-child {
  border-left: 1px solid var(--line-color, #eee);
}
.ownerBox {
  font-weight: bold;
  font-variation-settings: 'wght' 600;
}
.previewColumn{
  /* border: 1px solid lime;
  width: 100%; */
}
#read{
  .imageLoadingWrap {
    width: 100%;
    height: 100%;
    position: relative;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .previewImage {
      // width: 100%;
      // height: auto;
      // width: unset;
      height: 100%;
      object-fit: contain;
      // max-height: 80vh;
    }
    .previewLoading {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .previewLoadingPill {
      display: inline-flex;
      border-radius: 2rem;
      height: 3rem;

      background: var(--fill-color, #ccc);
      align-items: center;
      justify-content: center;
      min-width: 10rem;
      padding: 0 2rem;
    }
  }
}
.primaryMeta {
  border: 1px solid var(--line-color, #111);
}
.metaItem {
  border-bottom: 1px solid var(--line-color, #111);
  padding: 0.25rem 0.5rem;
}
.metaItem:last-child {
  border-bottom: none;
}
.metaLink{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  // border-bottom: 1px dashed var(--fill-color, #eee);
}
.metaLink .icon{
  display: inline-block;
  margin-right: .25rem;
  flex-shrink: 0;
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
