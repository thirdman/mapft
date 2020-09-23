<template>
  <div class="pageContainer">
    <Header />

    <div id="searchRow" class="row searchRow" v-if="showSearch">
      <div class="form entry">
        <div class="w3-row row">
          <div class="formItem column col-50">
            <label for="searchContractId">Art Contract</label>
            <!-- <input
              id="ww"
              type="string"
              class="hero"
              placeholder="0xd0c402bcbcb5e70157635c41b2810b42fe592bb0"
              @change="setSearchParams"
            />-->
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
            <button
              id="xx"
              type="submit"
              class="w3-black btn-large"
              @click="doTest"
            >
              <!-- onClick='toggleVisibility("searchRow", "hidden")' -->
              READ
            </button>
          </div>
        </div>
      </div>
    </div>

    <section id="read" class="read showMeta borderBottom">
      <div class="tertiary">
        <h2 id="metadata2" class="theTitle">
          {{ (viewData && viewData.title) || tempViewItem.title || '' }}
        </h2>
        <label style="display: block;">Creator</label>
        <h5 id="metadata3" class="theAuthor">
          {{ (viewData && viewData.authorName) || '' }}
        </h5>
        <label>Description</label>
        <div id="metadata4" class="aside">
          <p>
            {{
              (viewData && viewData.description) ||
              tempViewItem.description ||
              ''
            }}
          </p>
        </div>
      </div>
      <div class="primary">
        <!-- ERROR: displays error when no token found -->
        <div class="error noToken">
          <h4>Error</h4>
          <p>No token found.</p>
        </div>
        <div id="readContent" class="output">
          <div class="row readContentRow">
            <div
              class="column col-100 imageColumn"
              v-if="viewStatus !== 'ready' && !viewData && tempViewItem"
            >
              <div class="previewWrap">
                <img
                  :src="tempViewItem.imageUrlThumbnail"
                  style="width: 100%; height: auto;"
                  class="previewImage"
                />
                <div class="previewLoading">
                  <div class="previewLoadingPill">
                    <Loading message="Loading ..." :fillClass="contrastMode" />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="column col-100 imageColumn"
              style="padding-bottom: 4rem;"
              v-if="viewData"
            >
              <RenderItem
                :item="viewData"
                :fileType="viewData.fileType"
                :src="viewData.fileIpfsUrl"
                v-if="viewData.fileIpfsUrl"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="secondary">
        <div class="aside help">&nbsp;</div>
        <div class="column col-66 metaColumn" v-if="viewData">
          <div class="galleryLinkWrap">
            <nuxt-link :to="/gallery/ + contractId" class="galleryLink asButton"
              >Back to gallery</nuxt-link
            >
          </div>
          <ToggleSection>
            <span slot="header">Token Info</span>
            <div slot="content">
              <div class="formItem">
                <label>Edition</label>
                <div>{{ viewData.edition }} of {{ viewData.editions }}</div>
              </div>
              <div class="formItem">
                <label>File Type</label>
                <div id="metadata7">{{ viewData.fileType }}</div>
              </div>
              <div class="formItem">
                <label>Exhibition</label>
                <div id="metadata8">{{ viewData.exhibition }}</div>
                <br />
              </div>
            </div>
          </ToggleSection>

          <ToggleSection>
            <span slot="header">Reference Links</span>
            <div slot="content">
              <div class="formItem">
                <label>Opensea</label>

                <div id="link0" class="w3-small">
                  <a
                    :href="
                      'https://rinkeby.opensea.io/assets/' +
                      contractId +
                      '/' +
                      tokenId
                    "
                    target="_blank"
                    class="outLink"
                    >View on Opensea</a
                  >
                </div>
              </div>
              <div class="formItem">
                <label>IPFS</label>
                <div id="link0" class="w3-small">
                  {{ viewData.fileIpfsHash }}
                </div>
              </div>
              <div class="formItem">
                <label>Arweave</label>
                <div id="link1" class="w3-small">
                  {{ viewData.fileArweaveHash }}
                </div>
              </div>
            </div>
          </ToggleSection>

          <ToggleSection>
            <span slot="header">Royalty Info</span>
            <div slot="content">
              <div class="formItem">
                <label>Artist Address</label>
                <div id="royalty0" class="w3-small">
                  {{ viewData.artistAddress }}
                </div>
              </div>
              <div class="formItem">
                <label>Royalty Fee</label>
                <div id="royalty1" class="w3-small">
                  {{ viewData.royaltyFee }}%
                </div>
              </div>
            </div>
          </ToggleSection>

          <ToggleSection>
            <span slot="header">Owner Info</span>
            <div slot="content">
              <div class="formItem">
                <label>Owned By:</label>
                <div id="owner0" class="w3-small" v-if="!isOwner">
                  <Address :address="viewData.ownerAddress" :fill="true" />
                </div>
                <div v-if="isOwner" class="ownerBox">YOU</div>
                <div v-if="isOwner" class="ownerGift">
                  <nuxt-link :to="/gift/ + contractId + '/' + tokenId"
                    >Gift this Token...</nuxt-link
                  >
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

export default {
  name: 'ViewPage',
  data() {
    // nothing to see here
  },
  created() {
    // console.log('created client')
    // console.log('this', this)
    if (process.client) {
      const asyncTokenId = this.$route.query.id
      const asyncContractId = this.$route.query.contract
      console.log(
        'asyncTokenId && asyncContractId',
        asyncTokenId,
        asyncContractId
      )
      if (!asyncTokenId || !asyncContractId) {
        this.$store.commit('ui/setViewStatus', 'ready')
        this.$store.commit('ui/setShowSearch', true)
        return null
      }
      if (asyncTokenId && asyncContractId) {
        console.log('setting params...')
        this.$store.commit('ui/setSearchParams', {
          tokenId: asyncTokenId,
          contractId: asyncContractId,
        })
        this.$store.dispatch('ui/handleSearch', {
          tokenId: asyncTokenId,
          contractId: asyncContractId,
        })
        //   if (process.client) {
        // }
      }
    }
    if (process.server) {
      // const { req, res, beforeNuxtRender } = context
      console.log('created server')
      // console.log('this.$scopedSlots', this.$scopedSlots)
    }
  },
  destroyed() {
    // this.$store.commit('ui/setSearchParams', {
    //   tokenId: undefined,
    //   contractId: undefined,
    // })
    // this.$store.commit('ui/setSearchParams', {
    //   tokenId: undefined,
    //   contractId: undefined,
    // })
    this.$store.commit('ui/setViewData', undefined)
  },
  asyncData(context) {
    // console.log('async context.route', context.route)
  },
  computed: {
    ...mapGetters({
      showSearch: 'ui/showSearch',
      contrastMode: 'ui/contrastMode',
      searchData: 'ui/searchData',
      viewData: 'ui/viewData',
      viewStatus: 'ui/viewStatus',
      walletAddress: 'ui/walletAddress',
      tempViewItem: 'ui/tempViewItem',
    }),
    tokenId: (context) => {
      return context.$route && context.$route.query.id
    },
    contractId: (context) => {
      // console.log('context.$route', context.$route)
      return context.$route && context.$route.query.contract
    },
    isOwner() {
      const tempWalletAddress =
        this.$store.state.ui.walletAddress &&
        this.$store.state.ui.walletAddress.toLowerCase()
      const tempOwnerAddress =
        this.$store.state.ui.viewData &&
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
      // handleSearch: 'ui/handleSearch',
      // doSearch: 'ui/doSearch',
      setSearchParams: 'ui/setSearchParams',
    }),
    getTokenId() {
      console.log('this', this)
    },
    doTest() {
      console.log(this)
      this.$store.dispatch('ui/handleSearch')
    },
  },
  actions: {
    ...mapActions({
      handleSearch: 'ui/handleSearch',
    }),
  },
}
</script>

<style>

.ownerBox {
  font-weight: bold;
  font-variation-settings: 'wght' 600;
}
.previewWrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.previewImage {
  width: 100%;
  height: auto;
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
  background: #111;
  background: var(--fill-color, #ccc);
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  padding: 0 2rem;
}
</style>
