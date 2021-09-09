<template>
  <footer class="footer row ma-0" :class="`${uiMode} ${hideUi ? 'hideUi' : 'showUi'}`">
    
      <div class="column social col col-1 pa-0">
        <a href="https://twitter.com/nft4ever" target="_blank">
          <IconTwitter :strokeClass="contrastMode" />
        </a>
        <a href="https://discord.gg/WPpD2X5" target="_blank">
          <IconDiscord :fillClass="contrastMode" />
        </a>
      </div>
      <div class="column options col pa-0">
        <div class="optionsRow versionInfo xsmall" v-if="uiMode === 'minimal'">
          <span>v</span><span>{{VERCEL_GIT_COMMIT_SHA}}</span>
        </div>
      </div>
      <div class="column credits col col-2 pa-0">
        <div class="corpLink">
          <span class="notdefaultCorpMessage">&copy;2021 Made with ❤️</span>
          <!-- <span class="minimalCorpMessage">by</span>
          <a href="https://www.nft42.com/" target="_blank" rel="noopener" class="corpLink">nft42</a> -->
        </div>
      </div>
    
  </footer>
</template>

<style>
.versionInfo {
  opacity: .5;
}
</style>
<script>
import { mapGetters, mapMutations } from 'vuex'
// import { setTheme } from '../utils/theme.js'

const myMixin = {
  
  methods: {
    hello: () => {
      console.log('hello from mixin!')
    },
  },
}
export default {
  mixins: [myMixin],
  data() {
    return {
      VERCEL_GIT_COMMIT_SHA: '',
    }
  },
  mounted() {
    if(this.$config){
      const VERCEL_GIT_COMMIT_SHA = this.$config.VERCEL_GIT_COMMIT_SHA || "local"
      this.VERCEL_GIT_COMMIT_SHA = VERCEL_GIT_COMMIT_SHA
    }
    
  },
  computed: {
    ...mapGetters({
      uiMode: 'ui/uiMode',
      contrastMode: 'ui/contrastMode',
      hideUi: 'ui/hideUi',
      
    }),

    targetMode() {
      return this.$store.state.ui.uiMode === 'full' ? 'minimal' : 'full'
    },
  },
  methods: {
    ...mapMutations({
      setUiMode: 'ui/setUiMode',
    }),
    // setTheme,
  },
}
</script>
