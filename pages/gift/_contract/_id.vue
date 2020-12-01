<template>
  <div class="pageContainer">
    <Header />

    <section id="gift" class="">
      <div class="tertiary">
        <h2 class="theTitle">Gift Token</h2>
      </div>
      <div class="primary">
        <div style="padding-bottom: 1rem">
          <nuxt-link
            :to="`/view/${this.$route.params.contract}/${this.$route.params.id}`"
            class="asButton"
            >Back</nuxt-link
          >
        </div>
        <GiftFormComponent />
      </div>
      <div class="secondary">
        <div class="aside help">
          Gift tokens to wallet addresses or email address.
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters, mapMutations } from 'vuex'
export default {
  created() {
    console.log('gift created')
    console.log('this.$route.params', this.$route.params)
    console.log('this.$route.params.id', this.$route.params.id)
    console.log('this.$route.params.contract', this.$route.params.contract)

    if (process.client) {
      this.$store.commit('giftFormStore/setGiftTokenId', this.$route.params.id)
      this.$store.commit(
        'giftFormStore/setGiftContractId',
        this.$route.params.contract
      )
    }
  },
  computed: {
    ...mapGetters({
      showSearch: 'ui/showSearch',
      searchData: 'ui/searchData',
    }),
    ...mapFields('ui', ['searchContractId', 'searchTokenId']),
  },
  methods: {
    ...mapMutations({
      setShowSearch: 'ui/setShowSearch',
      handleSearch: 'ui/handleSearch',
      setSearchParams: 'ui/setSearchParams',
    }),
  },
}
</script>

<style></style>
