<template>
  <modal
    name="share-modal"
    class="share-modal"
    :adaptive="true"
    :min-width="200"
    :min-height="200"
    :scrollable="false"
    :reset="true"
    width="60%"
    height="auto"
    :focus-trap="true"
    :clickToClose="true"
  >
    <div class="modal-content">
      <div class="top-right">
        <button
          @click="$modal.hide('share-modal')"
          class="btn iconButton"
          tabindex="0"
        >
          <IconClose
            :strokeClass="contrastMode"
          />
        </button>
      </div>

      <div class="modalSection">
        <label>Share</label>
        <div class="xsmall" v-if="devMode">{{this.createUrl(false)}}</div>
        <client-only>
          <div class="row contentRow">
            <a 
                target="_blank" 
                :href="`https://twitter.com/intent/tweet?url=${createUrl(true)}&text=${title + ' on InfiNFT: ' + description}&related=nft4ever,nft42`" 
                class="shareLink asButton full" 
              >
              <IconExternalLink :strokeClass="contrastMode" size="small" /> <span size="small">Twitter</span>
            </a>
        </div>
        </client-only>
        <div class="row contentRow">
          <div class="column col-66">
            <input
              name="Url"
              class="w3-input invert"
              type="string"
              style="font-size: .75rem"
              :value="this.createUrl(false)"
            />
          </div>

          <div class="column col-33" v-if="devMode">
            <Button @click="openLink" mode="hero">Open in new tab</Button>
          </div>
        </div>
        <!-- <a 
            target="_blank" 
            :href="this.createUrl(false)" 
            class="shareLink asButton" 
          >
            <IconExternalLink :strokeClass="contrastMode" size="small" />
          </a> -->
        <div>
          <label>Advanced</label>
          <div class="row contentRow">
            <div class="column">Theme</div>
            <div class="column" style="align-items: center; justify-content: flex-start; display: flex;">
              <Swatch :name="uiTheme" :id="uiTheme" v-if="!showThemeSelector" :selected="true" />
              <SwatchSelector :selected="uiTheme" v-if="showThemeSelector"/>
              <Button size="small" mode="secondary" @click="toggleSelector">{{showThemeSelector ? "Close" : "Change"}}</Button>
            </div>
          </div>
          <div class="row contentRow">
            <div class="column col-50">Interface Mode</div>
            <div class="column col-50">
              <div class="buttonGroup uiMode">
                <Button
                  @click="setUiMode('full')"
                  mode="hollow"
                  :filled="uiMode === 'full'"
                >
                  Full
                </Button>
                <Button
                  @click="setUiMode('minimal')"
                  mode="hollow"
                  :filled="uiMode === 'minimal'"
                >
                  Minimal
                </Button>
                <Button
                  @click="setUiMode('none')"
                  mode="hollow"
                  :filled="uiMode === 'none'"
                >
                  None
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="devMode">
          <div >mode: {{mode}}</div>
          <div >contractId: {{contractId}}</div>
          <div >tokenId: {{tokenId}}</div>
          <div >url: {{url}}</div>
          <div >uiMode: {{uiMode}}</div>
          <!-- <div >uiTheme: {{uiTheme}}</div> -->
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "ShareModal",
  props: ['content', 'children', 'mode', 'contractId', 'tokenId', 'url',  "uiTheme", "title", "description"],
  mounted() {
    if(this.$config){
      const requiredNetwork = this.$config.requiredNetwork;
      const rootUrl = this.$config.rootUrl
      this.desiredNetwork = requiredNetwork;
      this.baseUrl = rootUrl;
    }
    // console.log('MOUNTED this.$config', this.$config)
    // console.log('MOUNTED baseUrl', process.env.baseUrl)
    // console.log('MOUNTED route: ', this.$route)
    const rootUrl = this.$config.rootUrl
    const path = this.$route.path
    this.path = path;
    
    
  },
  data() {
    return {
      desiredNetwork: "main",
      baseUrl: "",
      path: "",
      fullUrl: "blh",
      showThemeSelector: false,
    };
  },
  computed: {
    ...mapGetters({
      devMode: "ui/devMode",
      uiMode: "ui/uiMode",
      walletNetwork: "ui/walletNetwork",
      walletAddress: "ui/walletAddress",
      contrastMode: "ui/contrastMode",
    }),
  },
  methods: {
    ...mapMutations({
      setUiMode: "ui/setUiMode",
    }),
    
    closeModal() {
      alert("This funciton is incomplete!");
      this.$modal.hide("share-modal");
    },
    createUrl(encode){
      if(!this){
        console.log('this is null');
        return ""
      }
      // const '?mode=' + tempUiMode + '&theme=' + tempUiTheme;
      // console.log('this.$route.fullPath', this.$route.fullPath)
      let base = this.baseUrl.replace(/\/$/, "");
      const myUrl = base + this.$route.fullPath;
      const tempUiMode = this.uiMode || "minimal";
      const tempUiTheme = this.uiTheme || "charcoal";
      const fullUrl = myUrl + '?ui=' + tempUiMode + '&theme=' + tempUiTheme;
      return encode ? encodeURIComponent(fullUrl) : fullUrl;
    },
    openLink(){
      // console.log(this)
      // (`${this.fullUrl}`)
      const url = this.createUrl(false);
      // console.log('url', url)
      window && window.open(url);
    },
    toggleSelector(){
      this.showThemeSelector = !this.showThemeSelector
    }
  },
};
</script>

<style lang="scss">

</style>
