<template>
  <div
    id="body"
    class="hasSearch"
    :class="[
      uiMode,
      uiTheme,
      this.$store.state.ui.walletNetwork || 'no-network',
      hasVerticalGridLines ? 'hasLines' : ''
    ]"
  >
    <!-- <Header /> -->
    <Nuxt />
    <!-- <Footer /> -->
  </div>
</template>

<style lang="scss">
#body.hasLines:after {
  content:"";
  position: absolute;
  lefT: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  min-height: 300vh;
  background: linear-gradient(180deg, var(--danger-color, #eee) 1px, transparent 1px) 1px 0, transparent;
  background-size: 1px 1rem;
  pointer-events: none;
}
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      // theme: 'lemon',
    }
  },
  created() {
    const uiModeQueryItem = this.$route.query.ui
    const uiThemeQueryItem = this.$route.query.theme
    if (uiModeQueryItem) {
      this.$store.commit('ui/setUiMode', uiModeQueryItem)
    }
    if (uiThemeQueryItem) {
      this.setUiTheme(uiThemeQueryItem)
    } else if (this.uiTheme) {
      this.setUiTheme(this.uiTheme)
    }
  },
  computed: {
    ...mapGetters({
      uiMode: 'ui/uiMode',
      uiTheme: 'ui/uiTheme',
      contrastMode: 'ui/contrastMode',
      hasVerticalGridLines: 'ui/hasVerticalGridLines',
    }),
    walletNetwork() {
      return this.$store.state.ui.walletNetwork
    },
  },
  methods: {
    ...mapMutations({
      setUiTheme: 'ui/setUiTheme',
    }),
  },
}
</script>
