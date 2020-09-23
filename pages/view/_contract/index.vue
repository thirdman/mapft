<template>
  <div class="pageContainer">
    <Header />
    <section id="read" class="read showMeta borderBottom">
      <div class="tertiary"></div>
      <div class="primary">
        <!-- ERROR: displays error when no token found -->
        <div class="error noToken">
          <h4>Error</h4>
          <p>No token found.</p>
        </div>
        <div id="readContent" class="output">
          <p>
            No id supplied.
          </p>
          <p>
            View pages should be in the format /view/[contractId]/[tokenId]
          </p>
          <div>
            <nuxt-link :to="`/gallery/${this.$route.params.contract}`"
              >View gallery</nuxt-link
            >
          </div>
        </div>
      </div>
      <div class="secondary">
        &nbsp;
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'ViewPageParams',
  data() {
    // nothing to see here
  },
  created() {
    console.log('created client')
    // console.log('this', this)
    if (process.client) {
      const asyncTokenId = this.$route.params.id
      const asyncContractId = this.$route.params.contract
      console.log(
        'asyncTokenId && asyncContractId',
        asyncTokenId,
        asyncContractId
      )
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
