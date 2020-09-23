<template>
  <div class="pageContainer">
    <Header />

    <div id="searchRow" class="row searchRow" v-if="showSearch">
      <div class="form entry">
        <div class="w3-row row">
          <div class="formItem column col-50">
            <label for="searchContractId">Art Contract</label>
            <input
              name="Contract Id"
              oldId="ww"
              id="searchContractId"
              class="w3-input small"
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
            <button id="xx" type="submit" class="w3-black btn-large" @click="handleSearch">
              <!-- onClick='toggleVisibility("searchRow", "hidden")' -->
              READ
            </button>
          </div>
        </div>
      </div>
    </div>

    <section id="gift" class="read marker">
      <div class="tertiary">
        <h2 class="theTitle">Gift Tokens</h2>
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
import { mapGetters, mapMutations } from 'vuex'
export default {
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
