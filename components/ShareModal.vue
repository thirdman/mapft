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
        <div class="row">
          <div class="column col-66">
            <input
              name="Url"
              class="w3-input invert"
              type="string"
              style="font-size: .75rem"
              :value="this.createUrl(false)"
            />
          </div>
          <div class="column col-33">
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
          <div class="row">
            <div class="column">Theme</div>
            <div class="column">{{uiTheme}}</div>
          </div>
        </div>
        <div v-if="devMode">
          <div >mode: {{mode}}</div>
          <div >contractId: {{contractId}}</div>
          <div >tokenId: {{tokenId}}</div>
          <div >url: {{url}}</div>
          <div >uiMode: {{uiMode}}</div>
          <div >uiTheme: {{uiTheme}}</div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "ShareModal",
  props: ['content', 'children', 'mode', 'contractId', 'tokenId', 'url', 'uiMode', "uiTheme"],
  mounted() {
    if(this.$config){
      const requiredNetwork = this.$config.requiredNetwork;
      const rootUrl = this.$config.rootUrl
      this.desiredNetwork = requiredNetwork;
      this.baseUrl = rootUrl;
    }
    console.log('MOUNTED this.$config', this.$config)
    console.log('MOUNTED baseUrl', process.env.baseUrl)
    console.log('MOUNTED route: ', this.$route)
    const rootUrl = this.$config.rootUrl
    const path = this.$route.path
    this.path = path;
    
    
  },
  data() {
    return {
      desiredNetwork: "main",
      baseUrl: "",
      path: "",
      fullUrl: "blh"
    };
  },
  computed: {
    ...mapGetters({
      devMode: "ui/devMode",
      walletNetwork: "ui/walletNetwork",
      walletAddress: "ui/walletAddress",
      contrastMode: "ui/contrastMode",
    }),
  },
  methods: {
    ...mapMutations({}),
    
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
      console.log('this.$route.fullPath', this.$route.fullPath)
      let base = this.baseUrl.replace(/\/$/, "");
      const myUrl = base + this.$route.fullPath;
      const tempUiMode = this.uiMode || "minimal";
      const tempUiTheme = this.uiTheme || "charcoal";
      const fullUrl = myUrl + '?mode=' + tempUiMode + '&theme=' + tempUiTheme;
      return encode ? encodeURIComponent(fullUrl) : fullUrl;
    },
    openLink(){
      // console.log(this)
      // (`${this.fullUrl}`)
      const url = this.createUrl(false);
      console.log('url', url)
      window && window.open(url);
    }
  },
};
</script>

<style lang="scss">

</style>
