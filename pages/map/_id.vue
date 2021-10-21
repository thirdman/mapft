<template>
  <div class="pageContainer">
    <Header />
    <!-- HERO Container -->
    <section id="intro" class="row ma-0 ">
      <div class="menu-column" >
           
      </div>
      <div class="col col-3 info-column" v-if="panel">
      </div>
      <div class="col content-column" :class="panel ? 'col-9' : 'col-11'">
        <client-only>
          <!-- <div class="error-message" v-if="gameStatus === 'error'"><label>Error</label>Game Data Not Found</div> -->
          <div class="loading-container"  v-if="gameStatus === 'loading' || binStatus === 'working' ">
            <Loading message="Loading..." /> 
          </div>
          <div class="info-container" v-if="gameStatus === 'ready'">
            This will load map {{mapId}}
            <v-btn @click="handleGenerateMap(mapId)" :disabled="!mapId">load</v-btn>
          </div>
          
        </client-only>
      </div>
    </section>
    <Footer :show="false" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

const BASE_URL = "https://unknowngame.site"
import ogImagePreview from '~/assets/images/preview.png'

 
export default {
  components: {  },
  name: 'MapPage',
  data() {
    
    return {
      
      items: [
        { title: 'Info', icon: 'mdi-text-box-outline', id: 'info' },
        { title: 'Inspect', icon: 'mdi-crosshairs', id: 'inspect' },
        { title: 'Map', icon: 'mdi-checkerboard', id: 'minimap' },
        { title: 'My Account', icon: 'mdi-account', id: 'account' },
        { title: 'Scores', icon: 'mdi-shield-account', id: 'scores' },
        { title: 'Settings', icon: 'mdi-cog', id: 'options' },
      ],
      options: {},
      mapId: null,
      gameStatus: 'loading',
      gameTeams: null,
      baseUrl: "https://localhost:3333",
      previewUrl: `images/preview.png`,
      siteName: "SVG Tokens",
      images: null,
      fullIndex: null,
      showFull: false,
      devAddress: '0xd1c248d1c9879dc3b5a846d4dccc5b7aa8fbf432',
      gameData: null,
      testData: null,
      showInfo: false,
      showGameWelcome: false,
      showMapControls: false,
      showMapSelect: false,
      selectedTile: null,
      selectedData: null,
      claimLocation: null,
      generateLocation: null,
      generateMode: 'normal',
      showSelectAsset: true,
      showGenerate: false,
      showGameOptions: false,
      showJoin: false,
      selectedAsset: null,
      highlightedIndex: null,
      tileSetId: null,
      panel: 'info',
      tab: "Scores",
      tabs: ['Scores', 'Creatures', 'User'],
      isBattling: false,
      isLoadingAssets: false,
      units: null,
      scale: 1,
    }
  },
  head: {
    title: 'DungeoNFT',
    meta: [
      { hid: 'description', name: 'description', content: 'A NFT platform with a focus on extendability, flexibility, and on-chain data.' },
      { hid: "og:title", name: "og:title", content: "SVG Tokens" },
      { hid: "og:site_name", name: "og:site_name", content: "SVG Tokens" },
      { hid: "og:type", name: "og:type", content: "website" },
      {
          hid: "og:image",
          property: "og:image",
          content: BASE_URL + ogImagePreview
        },
        
    ],
  },
  async created(){
    // const {params} = this.$route;
    // const {id} = params;
    // if(!siteData){
    //   await this.getConfig();
    // }
  },
  mounted(){
    // const {params} = this.$route;
    // const {id} = params;
    
  },
  async fetch() {
      const {params} = this.$route;
      const {id} = params;
      this.gameStatus = 'ready'
      this.mapId = id;
      const {optionsTemplate} = this;
      this.options = optionsTemplate
  },
  computed: {
    ...mapGetters({
      devMode: 'ui/devMode',
      siteData: 'ui/siteData',
      contrastMode: 'ui/contrastMode',
      hasChainSelect: 'ui/hasChainSelect',
      hasVerticalGridLines: 'ui/hasVerticalGridLines',
      binData: "ui/binData",
      binStatus: "ui/binStatus",
      walletAddress: "ui/walletAddress",
      // tiles: "ui/tiles",
      playerTemplate: "ui/playerTemplate",
      games: "ui/games",
      localGames: "ui/localGames",
      userTeam: "ui/userTeam",
      userAssets: "ui/userAssets",
      instructionsRead: "ui/instructionsRead",
      introRead: "ui/introRead",
      showTeamSelect: "ui/showTeamSelect",
      // tileMap: 'ui/tileMap',
      //activeGame: 'ui/activeGame',
      demoData: 'ui/demoData',
      tileTemplate: 'ui/tileTemplate',
      itemTemplate: 'ui/itemTemplate',
      optionsTemplate: 'ui/optionsTemplate'
    }),
    compiledOptions(){
      const {
        walletAddress, 
        } = this
        const compiledOptions = {
        ...this.options,
        rows: this.options.newRows, 
        cols: this.options.newCols, 
        useDefaultTeams: this.options.optionUseDefault, 
        owner: walletAddress, 
        mapMode: this.options.optionMapMode, 
        title: this.options.gameTitle,
        useEdgePoints: this.options.optionMapMode !== 'explore',
        }
        console.log('compiledOPtions', compiledOptions)
      return compiledOptions;
    }
  },
  methods: {
    ...mapMutations({
      setBinData: "ui/setBinData",
      setUserTeam: "ui/setUserTeam",
      // setTiles: "ui/setTiles",
      setCreatures: "ui/setCreatures",
      resetGame: "ui/resetGame",
      setInstructionsRead: 'ui/setInstructionsRead',
      setIntroRead: 'ui/setIntroRead',
      setShowTeamSelect: 'ui/setShowTeamSelect',
      setActiveGame: 'ui/setActiveGame',
      setSaveData: 'ui/setSaveData'
    }),
    ...mapActions({
      getConfig: "ui/getConfig",
      getBin: "ui/getBin",
      updateConfig: "ui/updateConfig",
      createBin: "ui/createBin",
      getAssets: "ui/getAssets",
      generateGame: 'ui/generateGame',
      generateMapTiles: 'ui/generateMapTiles',
      arrayFromMapGrid: 'ui/arrayFromMapGrid',
      updateActiveGame: 'ui/updateActiveGame',
    }),
   
    async handleGenerateMap(mapId){
      console.log('handleGenerateMap', mapId)
      const {options, compiledOptions} = this;
      
      const gameId = await this.generateGame(compiledOptions);
      console.log('handleGenerateMap gameId', gameId)
    },
    handleGenerateGame(props){
      console.log('do it', props);
      this.showNewGameDialog = false,
      this.generateGame(props);
    },
    
    
    
    
    
  }
}
</script>

<style lang="scss">


</style>
