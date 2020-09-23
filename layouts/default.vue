<template>
  <div
    id="body"
    class="hasSearch"
  >
    <!-- :class="[
      uiMode,
      uiTheme,
      this.$store.state.ui.walletNetwork || 'no-network',
    ]" -->
    <Nuxt />
  </div>
</template>

<style></style>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      // theme: 'lemon',
    }
  },
  created() {
    // const uiModeQueryItem = this.$route.query.ui
    // const uiThemeQueryItem = this.$route.query.theme
    // if (uiModeQueryItem) {
    //   this.$store.commit('ui/setUiMode', uiModeQueryItem)
    // }
    // if (uiThemeQueryItem) {
    //   this.setUiTheme(uiThemeQueryItem)
    // } else if (this.uiTheme) {
    //   this.setUiTheme(this.uiTheme)
    // }
  },
  computed: {
    // ...mapGetters({
    //   uiMode: 'ui/uiMode',
    //   uiTheme: 'ui/uiTheme',
    // }),
    // walletNetwork() {
    //   return this.$store.state.ui.walletNetwork
    // },
  },
  methods: {
    // ...mapMutations({
    //   setUiTheme: 'ui/setUiTheme',
    // }),
  },
}
</script>
