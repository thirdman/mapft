<template>
  <v-app
    id="body"
    class="hasSearch"
    :class="[
      uiMode, // sets how much ui is present
      uiTheme, // sets the ui color theme
      'charcoal', // sets the ui color theme
      this.$mq, // comes from the media query plugin.
      this.$store.state.ui.walletNetwork || 'no-network', // main or rinkby (and future: Flow)
    ]"
  >
    <!-- <Header /> -->
    <Nuxt />
    <!-- <Footer /> -->
  </v-app>
</template>

<style lang="scss">

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
    const devModeQueryItem = this.$route.query.devMode
    if (uiModeQueryItem) {
      this.$store.commit('ui/setUiMode', uiModeQueryItem)
    }
    if (devModeQueryItem === 'no') {
      console.log('devModeQueryItem is no')
      this.$store.commit('ui/setDevMode', false)
    }
    if (devModeQueryItem && devModeQueryItem !== 'no') {
      this.$store.commit('ui/setDevMode', true)
    }
    
  },
  computed: {
    ...mapGetters({
      uiMode: 'ui/uiMode',
      uiTheme: 'ui/uiTheme',
      contrastMode: 'ui/contrastMode',
    }),
    walletNetwork() {
      return this.$store.state.ui.walletNetwork
    },
  },
  methods: {
    ...mapMutations({
      
    }),
  },
}
</script>
