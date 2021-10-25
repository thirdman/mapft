<template>
  <div class="pageContainer">
    <Header />
    <!-- HERO Container -->
    <section id="intro" class="row ma-0 ">
      <div class="menu-column" >
           
      </div>
      <div class="col col-3 info-column" v-if="panel">
      </div>
      <div class="col content-column pa-2" :class="panel ? 'col-9' : 'col-11'">
        <client-only>
          <div class="loading-container"  v-if="mapStatus === 'loading' || binStatus === 'working' ">
            <Loading message="Getting Contract Data..." /> 
          </div>
          <div class="loading-container"  v-if="mapStatus === 'working' || binStatus === 'working' ">
            <Loading message="Creating Game Map..." /> 
          </div>
          <div class="info-container" v-if="gameStatus === 'ready'">
            <div class="map-load" v-if="mapStatus === 'ready' && !mapOptions">
              <h3>Load Map from Contract</h3>
              <p>This will load map token: {{mapId}}</p>
              <v-btn @click="handleGenerateMap(mapId)" :disabled="!mapId" color="primary">Load</v-btn>
            </div>
            <v-card v-if="mapOptions" outlined>
              <v-card-title>Preview Map</v-card-title>
              <v-card-text>
            <div class="row preview-row" >
              <div class="col">
                <map-mini :gameData="compiledPreviewData" size="240" />
              </div>
              <div class="col">
                <label>Token Id</label>
                {{mapId}}
              </div>
              <div class="col">
                <label>Size</label>
                {{mapOptions.rows}}
              </div>
            </div>
            <v-divider />
            <div class="row preview-row" v-if="mapOptions">
              <label>Tile Set</label>
              <tile-set-select :selected="options.tileSetId" :onAction="setTileSet" v-if="tileSets" />
            </div>
            </v-card-text>
            <v-divider />
              <v-card-actions>
                <v-btn 
                  @click="handleGenerateGame" 
                  color="primary"
                  :disabled="!mapOptions || !options.tileSetId">Render Map</v-btn>
                <v-btn 
                  plain
                  @click="() => {this.mapOptions = null}" 
                  :disabled="!mapOptions ">Cancel</v-btn>
              </v-card-actions>
            </v-card>
            <!-- <div class="row ma-0 mt-0 py-2  info-item minimap-row d-flex align-center justify-center"  >
            </div> -->
            <div>
              {{mapStatus}}
            </div>
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
      mapOptions: null,
      mapStatus: null,
    }
  },
  head: {
    title: 'Map',
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
    const {mapId} = this;
    if(mapId){
      this.handleGenerateMap(mapId)
    }
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
      // localGames: "ui/localGames",
      userTeam: "ui/userTeam",
      // userAssets: "ui/userAssets",
      // instructionsRead: "ui/instructionsRead",
      // introRead: "ui/introRead",
      // showTeamSelect: "ui/showTeamSelect",
      
      tileTemplate: 'ui/tileTemplate',
      itemTemplate: 'ui/itemTemplate',
      optionsTemplate: 'ui/optionsTemplate',
      tileSets: 'ui/tileSets'
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
        // mapMode: this.options.optionMapMode, 
        // useEdgePoints: this.options.optionMapMode !== 'explore',
        mapMode: this.options.fixed, 
        useEdgePoints: true,
        title: this.options.gameTitle,
        loadGame: true,
        // tileSetId: this.tileSetId
        }
      return compiledOptions;
    },
    compiledPreviewData(){
      const {
        mapOptions, 
        } = this
        const compiledData = {
          id: mapOptions.id,
          name: "test",
          tileMap: mapOptions.tileMap,
          options: mapOptions
        }
      return compiledData;
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
      readMap: 'ui/readMap',
    }),
   
    async handleGenerateMap(mapId){
      console.log('handleGenerateMap', mapId)
      const {options, compiledOptions} = this;
      this.mapStatus = "loading"
      const mapData = await this.readMap({mapId});
      console.log('mapData', mapData)
      if(mapData){
        this.mapStatus = "ready"
        const newOptions = {...compiledOptions, 
        ...mapData,
        // tileMap: mapData.tileMap
        // useMapGrid: true, mapGrid: mapData.mapGrid, tileMap: mapData.tileMap, mapId: mapData.mapId
        }
        this.mapOptions = newOptions
      }
    },
    async handleGenerateGame(){
      const {mapOptions} = this;
      this.showNewGameDialog = false;
      this.mapStatus = "working"
      const gameId = await this.generateGame(mapOptions);
      if(gameId){
        this.mapStatus = "ready"
        this.$router.push(`/game/${gameId}`)
      }
    },
    setTileSet(id){
      const tempOptions = {...this.options, tileSetId: id}
      this.options = tempOptions;
    }
    
  }
}
</script>
<style lang="scss">
</style>
