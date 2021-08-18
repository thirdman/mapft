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
        <div class="optionsRow" v-if="uiMode === 'full'">
          <label>UI Theme</label>
          <div class="buttonGroup themeGroup">
            <div class="swatch lemon" @click="setUiTheme('lemon')">
              <span class="swatchLabel">Lemon</span>
            </div>
            <div class="swatch violet" @click="setUiTheme('violet')">
              <span class="swatchLabel">Violet</span>
            </div>
            <div class="swatch peach" @click="setUiTheme('peach')">
              <span class="swatchLabel">Peach</span>
            </div>
            <div class="swatch sand" @click="setUiTheme('sand')">
              <span class="swatchLabel">Sand</span>
            </div>
            <div class="swatch grayscale" @click="setUiTheme('grayscale')">
              <span class="swatchLabel">Gray</span>
            </div>
            <div class="swatch turquoise" @click="setUiTheme('turquoise')">
              <span class="swatchLabel">Turquoise</span>
            </div>
            <div class="swatch teal" @click="setUiTheme('teal')">
              <span class="swatchLabel">Teal</span>
            </div>
            <div class="swatch charcoal" @click="setUiTheme('charcoal')">
              <span class="swatchLabel">Charcoal</span>
            </div>
          </div>
          <label>UI MODE</label>
          <!-- <button @click="setUiMode(targetMode)" class="btn small">uiMode</button> -->
          <div class="buttonGroup uiMode">
            <button
              @click="setUiMode('full')"
              class="small toggleItem"
              :class="uiMode === 'full' ? 'active' : 'notActive'"
            >Full</button>
            <button
              @click="setUiMode('minimal')"
              class="small toggleItem"
              :class="uiMode === 'minimal' ? 'active' : 'notActive'"
            >minimal</button>
            <button
              @click="setUiMode('none')"
              class="small toggleItem"
              :class="uiMode === 'none' ? 'active' : 'notActive'"
            >none</button>
            <!-- <div class="col-50 toggleItem"  onClick='setClass("read", "showMeta", "showImage")'>Meta</div> -->
          </div>
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
      uiTheme: 'ui/uiTheme',
    }),

    targetMode() {
      return this.$store.state.ui.uiMode === 'full' ? 'minimal' : 'full'
    },
  },
  methods: {
    ...mapMutations({
      setUiMode: 'ui/setUiMode',
      setUiTheme: 'ui/setUiTheme',
    }),
    // setTheme,
  },
}
</script>
