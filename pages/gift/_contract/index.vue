<template>
  <div class="pageContainer">
    <Header />

    <section id="gift" class="read marker">
      <div class="tertiary">
        <h2 class="theTitle">Gift Token</h2>
        id: {{this.$route.params.id}} /
        contract: {{this.$route.params.contract}}
      </div>
      <div class="primary">
        <GiftForm />
      </div>
      <div class="secondary">
        <div class="aside help">Gift tokens to wallet addresses or email address.</div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  created() {
    console.log('gift created')
    console.log('this.$route.params', this.$route.params)
    console.log('this.$route.params.id', this.$route.params.id)
    console.log('this.$route.params.contract', this.$route.params.contract)

    if (process.client) {
      console.log('triger on created: ')

      // this.$store.commit(
      //   'galleryStore/setGalleryContractId',
      //   this.$route.params.contract
      // )

      // this.$store.commit('galleryStore/getItems', {
      //   contractId: this.$route.params.contract,
      // })
    }
  },
  computed: {},
  methods: {
    ...mapMutations({}),
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
