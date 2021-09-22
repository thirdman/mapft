<template>
  <div class="pageContainer">
    <Header />
    <dialog-intro :show="!introRead" />
    <dialog-team-select   />
    <dialog-new-game 
      v-if="showNewGameDialog"
      :onClose="() => this.showNewGameDialog = false"
      :onAction="handleGenerateGame"
      />
    
    
    <!-- <team-select
      :team="userTeam"
      :teams="gameTeams"
      :onSelect="handleTeamSelect"
      :onClose="() => {}"
    /> -->
    <div v-if="1==2">
    <v-icon color="white" large>mdi-trophy-outline</v-icon>
    <v-icon color="white" large>mdi-shield-sword-outline</v-icon>
    <v-icon color="white" large>mdi-sword</v-icon>
    <v-icon color="white" large>mdi-shield-outline</v-icon>
    <v-icon color="white" large>mdi-axe-battle</v-icon>
    <v-icon color="white" large>mdi-skull-outline</v-icon>
    <v-icon color="white" large>mdi-script</v-icon>
    <v-icon color="white" large>mdi-sack</v-icon>
    <v-icon color="white" large>mdi-knife-military</v-icon>
    <v-icon color="white" large>mdi-crown-circle</v-icon>
    <v-icon color="white" large>mdi-cards-outline</v-icon>
    <v-icon color="white" large>mdi-cards</v-icon>
    </div>
    <v-slide-y-transition>
    <generate-tile
      :location="generateLocation"
      :onClose="() => {this.generateLocation = null;}"
      :onGenerate="doGenerateTile"
      v-if="generateLocation"
      /> 
    </v-slide-y-transition>
      <v-slide-y-transition>
    <v-card outlined elevation="4" :class="`claim ${claimLocation ? 'active' : ''} ${isBattling ? 'battling' : ''}`" v-if="isBattling || claimLocation">
      <v-card-title class="d-flex justify-center">
        <div class="claim-title-row d-flex justify-center">
          <div class="claim-title-col col pa-2">
            <h4 class="ma-0 px-10">Claim Tile {{claimLocation}}</h4>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="row claim-row">
          <div class="col col-6 claimCol pr-0">  
            
            
            <div class="row ma-0 d-flex justify-center">
            <label>Tile Defence</label>
            </div>
            <div class="row ma-2 d-flex justify-center" v-if="selectedData">                   
              <div class="feature" :style="`background: ${this.getColor(selectedData.meta.team)}` " v-if="selectedData">
                <v-icon color="white" medium>mdi-shield-outline</v-icon>
              </div>
              <div class="feature feature-outline">
                {{selectedData && selectedData.meta.creature && selectedData.meta.creature.attack.Int64}}
              </div>
            </div>
            <div v-if="selectedData " class="actionzone tile">
                <Card 
                  :asset="selectedData.meta.creature"
                  v-if="selectedData.meta.creature"
                  :showmeta="false" :card="false"
                  />
            </div>


          </div>
          <div class="col col-6 claimCol pl-0">
            <div class="row ma-0 d-flex justify-center">
              <label>Your Attack</label>
            </div>
            <div class="row ma-2 d-flex justify-center" >
              <div class="feature" :style="`background: ${this.getColor(userTeam)}` " v-if="userTeam">
                <v-icon color="white" medium>mdi-sword</v-icon>
              </div>
              <div class="feature" :style="`background: #333` " v-else>
                <v-icon color="white" medium>mdi-sword</v-icon>
              </div>
              
              <div class="feature feature-outline" >
                {{selectedAsset && selectedAsset.attack.Int64}}
              </div>
            </div>
            <div class="actionzone user">
              <div v-if="!userAssets && !isLoadingAssets" >
                No Assets.
              </div >
              <div  v-if="!userAssets && isLoadingAssets">
                <Loading text="Loading" />
              </div>
              <div  v-if="!userAssets && !isLoadingAssets">
                <v-btn @click="getCards" class="btn hero" outlined >Load Your Assets</v-btn>
              </div>
              <Card 
              :asset="selectedAsset"
              :showmeta="false" 
              :card="false" 
              v-if="selectedData && selectedAsset && !showSelectAsset" 
              />
              <div class="vs">vs</div>  
              <div v-if="userAssets" class="select-btn" >
                <v-btn x-small outlined
                  @click="() => {
                  this.selectedAsset = null;
                  this.showSelectAsset = true;
                  }" class="btn hero">
                  <v-icon size="small">
                  mdi-arrow-u-left-top-bold
                  </v-icon>
                  Select Another</v-btn>
              </div>
            </div>
          </div>
          <div v-if="isBattling" class="claim-layer battle">
            <div class="row" style="width: 100%; align-items: stretch;">
              <div class="col col-6 claimCol pr-0" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">  
                <div class="rowNOT ma-0 d-flex justify-center">
                  <label>Tile Defence</label>
                </div>
                <div class="rowNOT ma-0 d-flex justify-center">                  
                  <div class="feature" :style="`background: ${this.getColor(selectedData.meta.team)}` " v-if="selectedData">
                    <v-icon color="white" medium>mdi-shield-outline</v-icon>
                  </div>
                  <div class="feature feature-outline">
                    {{selectedData && selectedData.meta.creature && selectedData.meta.creature.attack.Int64}}
                  </div>
                </div>
              </div>
              <div class="col col-6 claimCol pr-0" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">  
                <div class="rowNOT ma-0 d-flex justify-center">
                  <label>Your Attack</label>
                </div>
                <div class="rowNOT ma-0 d-flex justify-center">
                  <div class="feature" :style="`background: ${this.getColor(userTeam)}` " v-if="userTeam">
                    <v-icon color="white" medium>mdi-sword</v-icon>
                  </div>
                  <div class="feature feature-outline">
                    {{selectedAsset && selectedAsset.attack.Int64}}
                  </div>
                </div>
              </div>
            </div>
            <div class="row d-flex justify-center" style="width: 100%; position: absolute; top: 33%; ">
              <v-expand-x-transition>
                <div class="battle-icon" v-if="isBattling">
                  <v-icon x-large >mdi-sword-cross</v-icon>
                </div>
              </v-expand-x-transition>
            </div>
            <h2>Battle!</h2>
            
            <v-btn @click="handleClaimCancel" v-if="devMode">Cancel</v-btn>
            <v-btn @click="() => {this.isBattling = !this.isBattling}" v-if="devMode">toggle</v-btn>
          </div>
          <div v-if="userAssets && showSelectAsset" class="assetGrid claim-layer">
            <Card
              :onSelect="() => selectCreature(asset)"
              :asset="asset" v-for="(asset, index) in userAssets"
              :key="index"
              :showmeta="true"
              :index="index"
              :disabled="creatureExists(asset)"
              :card="false"
            />
          </div>
          <div class="instructions claim-layer" v-if="!userAssets && !instructionsRead">
            <div class="text-body-2">To battle for a tile, you need:</div>
            <div class="text-body-2">
              <ul>
                <li>Connected wallet with a Gods Unchained inventory</li>
                <li>Select a creature (Gods Unchained Assets) that is neutral alignment or matches your team</li>
                <li>The creature has not already been used in the game</li>
                
              </ul>
            </div>
            <div class="text-body-2">You will claim the tile if your attack value is greatrer than the remaining tile defence</div>
            <div class="row">
              <div class="col">
                <v-btn @click="setInstructionsRead(true)">Got it</v-btn>
                </div>
              </div>
          </div>
          <div class="creature-zone">
            <div class="tile-creature">
              <Card 
                :asset="selectedData.meta.creature"
                v-if="selectedData && selectedData.meta.creature"
                :showmeta="true"
                :card="false" />
            </div>
            <div class="user-creature">
              <div v-if="selectedData && selectedAsset && !showSelectAsset" class="actionzone user">
                <Card  :asset="selectedAsset" :showmeta="true" :card="false" />
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <div class="row claim-action-row">
          <div class="col pa-2 claim-action-col">
            <!-- <v-btn color="primary" @click="() => {console.log()}">battle!</v-btn> -->
            <!-- <v-btn @click="onClose">close</v-btn> -->
            <v-btn color="primary" v-if="userTeam && selectedData" @click="handleClaim(selectedData.location, selectedAsset)" :disabled="!userTeam" class="btn hero">Battle!</v-btn>
            <v-btn color="primary" v-if="!userTeam" @click="handleUser()" class="btn hero">Select Team</v-btn>
            <v-btn @click="handleClaimCancel">Cancel</v-btn>
            </div>
        </div>
      </v-card-actions>
        </v-card>
      </v-slide-y-transition>
    <!-- HERO Container -->
    <section id="intro" class="row ma-0 ">
      <div class="col col-3 info-column">
        <div class="info-game" v-if="!selectedTile">
          <!-- <div class="row">
            <div class="col ctaWrap"  v-if="!userTeam">
              <v-btn @click="handleUser" class="btn hero">Get Started »</v-btn>
              <nuxt-link to="/about" class="btn hollow asButton">What is this?</nuxt-link>
            </div>
          </div> -->
        <div class="row mx-0 my-0 tabs-container">
          <v-card  outlined class="pa-0" style="width: 100%;" >
          <v-tabs 
            v-model="tab"
            class="tabs-row"
            grow
          >
            <v-tab
              v-for="tab in tabs"
              :key="tab"
              class="tab-element"
            >
              {{ tab }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-divider class="ma-0 pa-0" />
            <v-tab-item
              key="Scores"
            >
            <div v-if="gameData" outlined class="pa-4">
              <div class="row">
                <div class="col">
                  <label>Team</label>
                </div>
                <div class="col">
                  <label>Tiles</label>
                </div>
                <div class="col">
                  <label>Score</label>
                </div>
              </div>
              <div class="row" v-for="(team, index) in gameData" :key="index">
                <div class="col">
                  {{team.team}}
                </div>
                <div class="col">
                  {{team.count}}
                </div>
                <div class="col">
                  {{team.totalValue}}
                </div>
              </div>
            </div>
            </v-tab-item>
            <v-tab-item
              key="Creatures"
            >
              <v-divider class="ma-0 pa-0" />
              <div class="text-body-2 pl-4 pt-4">
                Creatures  used in this game
                
              </div>
              <v-divider class="my-2" />
              <asset-list :array="creatures" />
              
            </v-tab-item>
            <v-tab-item
              key="User"
            >
              <v-divider class="ma-0 " />
              <div class="pa-2">
              <div class="text-body-2">
                Your Gods Unchained assets.
              </div>
              <Loading message="Loading assets..." v-if="isLoadingAssets" />
              <v-btn @click="getCards" small outlined v-if="!userAssets" >Get Cards</v-btn>
              <div v-if="userAssets" class="assetGrid flow">
                <Card
                  :onSelect="false"
                  :asset="asset" v-for="(asset, index) in userAssets"
                  :key="index"
                  :showmeta="false"
                  :index="index"
                  :disabled="creatureExists(asset)"
                  :card="false"
                />
              </div>
              </div>
            </v-tab-item>
          </v-tabs-items>
          </v-card>
        </div>
        
        <div class="row ma-0 options-row">
          <div class="col pa-0">
            <v-divider class="my-4" />
            <div class="row ma-0">
              <div class="col pa-0 d-flex justify-stretch align-center">
                <v-btn plain @click="() => showGameOptions = !showGameOptions">
                  <v-icon size="large">mdi-cog</v-icon>
                <div>Options</div>
                </v-btn>
                <v-divider vertical class="mx-4" />
                <v-card outlined  class="pa-1" >
                  <div :class="`controller ${userTeam}`" v-if="userTeam">
                    Team {{userTeam}} 
                  </div>
                </v-card>
              </div>
              
            </div>
          </div>
        </div>
       </div>
       <v-slide-x-transition>
        <div class="selected-content col" v-if="showInfo && typeof selectedTile === 'number'" transition="slide-x-transition">
          <Info
            :selectedData="selectedData"
            :index="selectedTile"
            :tile="theTile"
            :onClose="handleSelect"
            :onClaimSelect="handleClaimSelect"
            :onGenerateSelect="handleGenerate"
            :onClaim="handleClaim"
            />
        </div>
       </v-slide-x-transition>
       <v-slide-y-reverse-transition>
        <div class="options-content col pa-4" v-if="showGameOptions">
          <div class="row">
            <div class="col">
              <h4>Options</h4>
            </div>
            <div class="col">
              <v-btn plain @click="() => showGameOptions = !showGameOptions">
                <v-icon size="large">mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="row">
            <div class="col">
            <v-btn block outlined @click="setShowTeamSelect(!showTeamSelect)">Show Team Select</v-btn>
            <v-btn block outlined @click="resetGame">Reset Game</v-btn>
            <v-divider />
            <v-btn block small outlined @click="() => {this.showNewGameDialog = true}">New Game</v-btn>
            <v-divider />
            <v-btn block small outlined @click="setIntroRead(!introRead)">Show Introduction</v-btn>
            </div>
          </div>
        </div>
       </v-slide-y-reverse-transition>
      </div>
      <div class="col col-9 content-column">
        <client-only>
          <Loading message="Loading..." v-if="gameStatus === 'loading'" />
          <div class="map-container" v-if="gameStatus !== 'loading'">
          <div
            class="grid-wrap"
            :style="tileMap && tileMap[0] && `width: ${tileMap[0].length * 240 + 2}px; height: ${tileMap.length * 240 + 2}px;`">
            <Tile
              size="240"
              :tile="tile"
              :handleSelect="handleSelect"
              v-for="(tile, index) in tiles"
              :key="index"
              :index="index"
              :selected="selectedTile === index"
              :highlighted="highlightedIndex === index"
              :onAction="handleGenerate"
              />
            
          </div>
          </div>
        </client-only>
      </div>
      <div class="col col2">
  
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
const BASE_URL = "https://unknowngame.site"
import ogImagePreview from '~/assets/images/preview.jpg'
import { dialog } from '@devlop-ab/dialog';
import GenerateTile from '../components/GenerateTile.vue';
import AssetList from '../components/AssetList.vue';
import DialogIntro from '../components/DialogIntro.vue';
import DialogTeamSelect from '../components/DialogTeamSelect.vue';
 
export default {
  components: { DialogTeamSelect },
  name: 'ViewPageParams',
  data() {
    
    return {
      gameStatus: 'loading',
      devMode: false,
      baseUrl: "https://localhost:3333",
      previewUrl: `images/preview.jpg`,
      siteName: "SVG Tokens",
      images: null,
      fullIndex: null,
      showFull: false,
      devAddress: '0xd1c248d1c9879dc3b5a846d4dccc5b7aa8fbf432',
      gameData: null,
      showInfo: false,
      showNewGameDialog: false,
      selectedTile: null,
      selectedData: null,
      claimLocation: null,
      generateLocation: null,
      showSelectAsset: true,
      showGenerate: false,
      showGameOptions: false,
      selectedAsset: null,
      highlightedIndex: null,
      tab: "Scores",
      tabs: ['Scores', 'Creatures', 'User'],
      isBattling: false,
      isLoadingAssets: false,
    }
  },
  created(){
    // this.baseUrl = this.$config.rootUrl
    
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
  mounted(){
    
    // if(this.binData && this.binData.images){
    //   console.log('this.bindata', this.binData.images)
    //   this.images = this.binData.images;
    // }
    // const id = '1234'
    // this.loadImages(id)
    this.loadData();
    setTimeout(() =>{
      this.gameStatus = 'ready'
      }, 2000);
  },
  computed: {
    ...mapGetters({
      contrastMode: 'ui/contrastMode',
      hasChainSelect: 'ui/hasChainSelect',
      hasVerticalGridLines: 'ui/hasVerticalGridLines',
      binData: "ui/binData",
      binStatus: "ui/binStatus",
      walletAddress: "ui/walletAddress",
      tiles: "ui/tiles",
      creatures: "ui/creatures",
      gameTeams: "ui/gameTeams",
      userTeam: "ui/userTeam",
      userAssets: "ui/userAssets",
      instructionsRead: "ui/instructionsRead",
      introRead: "ui/introRead",
      showTeamSelect: "ui/showTeamSelect",
      tileMap: 'ui/tileMap'
    }),
    theTile(){
      const {tiles, selectedTile} = this;
      if(typeof selectedTile === 'number'){
        const theTile = tiles[selectedTile]
        return theTile
      } else {
        return null
      }
    }
  },
  methods: {
    ...mapMutations({
      setBinData: "ui/setBinData",
      setUserTeam: "ui/setUserTeam",
      setTiles: "ui/setTiles",
      setCreatures: "ui/setCreatures",
      resetGame: "ui/resetGame",
      setInstructionsRead: 'ui/setInstructionsRead',
      setIntroRead: 'ui/setIntroRead',
      setShowTeamSelect: 'ui/setShowTeamSelect'
    }),
    ...mapActions({
      updateConfig: "ui/updateConfig",
      getAssets: "ui/getAssets",
      generateGame: 'ui/generateGame'
    }),
    handleTeamSelect(teamObj){
      const userTeam = teamObj.team;
      this.setUserTeam(userTeam);
    },
     async getCards(){
       this.isLoadingAssets = true;
      const assets = await this.getAssets();
      console.log('assets', assets)
       this.isLoadingAssets = false;
     },
     async loadData(){
      const {gameTeams} = this;
      const tempTeams = [...gameTeams];
      this.tiles.map(tile => {
        console.log(tile.meta.team)
        const team = tile.meta.team;
        if(!team){return}
        const tempObjIndex = tempTeams.findIndex(t => t.team === team);
        if(tempObjIndex < 0){
          const tempObj = {team: team, count: 1, totalValue: tile.meta.value}
          tempTeams.push(tempObj)
        } else {
          const tempObj = {...tempTeams[tempObjIndex]};
          tempObj.totalValue =  tempObj.totalValue + tile.meta.value;
          tempObj.count =  tempObj.count + 1;
          tempTeams[tempObjIndex] = tempObj
        }
      }) 
      
      
      const orderedTeams = tempTeams.sort((a,b) => {
        return a.totalValue - b.totalValue
      }).reverse();
      this.gameData = orderedTeams;
    },
    async handleUser(){
      const team = await dialog.prompt('Select Your Team', null, {
          title: 'Your team',
          input: {
              placeholder: 'Red / Green / Purple / Yellow / Teal',
          },
      })
      const teamMap = {
        Green: "green",
        Red: "red",
        Purple: "purple",
        Yellow: "yellow",
        Blue: "blue",
        Teal: "teal",
      }
      if(teamMap[team] || teamMap[team] === team){
        // console.log('can set color', team);
        this.setUserTeam(team)
      }
      
    },
    async handleGenerate(location){
      // await dialog.alert('Generation is demo only', {
      //   title: 'Mockup',
      //   okText: 'OK',
      // });
      this.generateLocation = location
    },
    doGenerateTile(location){
      const {tiles, previewTile} = this;
      const tempTiles = [...tiles];
      const theIndex = tempTiles.findIndex(tile => tile.location === location);
      tempTiles[theIndex] === previewTile;
      console.log('tempTiles', tempTiles)
      this.setTiles(tempTiles);
      this.mapString = null;
      this.previewTile = null;
    },
    handleClaimCancel(){
      this.selectedAsset = null;
      this.showSelectAsset = false;
      this.claimLocation =  null;
      this.selectedTile = null;
      this.selectedData = null
    },
    handleClaimSelect(location){
      this.claimLocation = location;
      this.showSelectAsset = true;
      
      console.log('this.userTeam, walletAddress', this.userTeam, this.walletAddress)
      // if(this.userTeam){
      //   const tempMeta = {...this.selectedData.meta, team: this.userTeam, owner: this.walletAddress};
      //   console.log('tempMeta', tempMeta)
      //   const tempTiles = [...this.tiles];
      //   const tempTile = {...tempTiles[this.selectedTile]}
      //   tempTile.meta = tempMeta;
      //   tempTiles[this.selectedTile] = tempTile;
      //   this.setTiles(tempTiles)
      //   console.log('tiles', this.tiles)
      //   this.loadData();
      //   this.selectedTile = null;
      //   this.selectedData = null;
      // }
    },
    handleBattle(location, asset){
      console.log('battle!')
      this.isBattling = true;
      console.log('battle2')
      return setTimeout(() => {
        this.isBattling = true;
        
        return true
      }, 3000);
    },
    resolveBattle(location, asset){
      const doIt = true;
      
      if(!doIt){return false}
        const tempTiles = [...this.tiles];
        const existingTile = tempTiles[this.selectedTile];
        console.log('existingTile', existingTile);
        if(!existingTile){
          console.error('no existing tile', existingTile)
          return false
        }
        const defence = existingTile.meta.defence;
        const assetAttack = asset.attack.Int64;
        const assetHealth = asset.health.Int64;
        console.log('defence, assetAttack', defence, assetAttack, assetHealth);
        let newDefence = defence;
        let newCreature = asset;
        const tempMeta = {...this.selectedData.meta, team: this.userTeam, owner: this.walletAddress};
        console.log('tempMeta', tempMeta)
        if(defence <= assetAttack){
          console.log('defence is ', defence, 'and attack is', assetAttack);
          // TEMP use the attck value since health is 0
          console.log('thus the battle is won and the new defence is ', assetAttack);
          newDefence = assetAttack;
          tempMeta.defence = newDefence;
          tempMeta.creature = newCreature;
        } else  {
          console.log('defence is ', defence, 'and attack is', assetAttack);
          console.log('thus the battle is not won and the new defence is ', defence, ' minus', assetAttack);
          // console.log('thus the battle is won and the new defence is ', assetAttack);
          newDefence = defence - assetAttack;
          tempMeta.defence = newDefence;
        }
        
        const tempTile = {...tempTiles[this.selectedTile], owner: this.walletAddress}
        tempTile.meta = tempMeta;
        tempTiles[this.selectedTile] = tempTile;
        console.log('tempTile', tempTile)
        this.setTiles(tempTiles)
        console.log('tiles', this.tiles)
        this.compileGameCreatures(asset, location);
        this.isBattling = false;
        this.loadData();
        this.selectedTile = null;
        this.selectedData = null;
        this.selectedAsset = null;
        this.showSelectAsset = false;
        this.claimLocation =  null;
        this.setHighlightedTile(location)
        return true;
    },
    handleClaim(location, asset){
      // await dialog.alert('Unavailable in demo', {
      //   title: 'Disabled',
      //   okText: 'OK',
      // });
        const delayAmount = 1000;
        console.log('this.userTeam, walletAddress', this.userTeam, this.walletAddress)
        if(!this.userTeam){
          console.error('no user team, cannot resolve battle')
          return false
        }
        console.log('battle1!')
        this.isBattling = true;
        console.log('battle2')
        const battleValue = setTimeout(() => {
          console.log('battle3')
          this.isBattling = true;
          const result =  this.resolveBattle(location, asset)
          console.log('battle result: ', result)
          
        }, delayAmount);
        console.log('battleValue', battleValue)
        if(battleValue === true){
        console.log('battle resolve')
        
        }
      
    },
    compileGameCreatures(asset, location){
      const id = asset.id.Int64 || asset.id;
      const tempCreatures = [...this.creatures];
      tempCreatures.push(id)
      this.setCreatures(tempCreatures)
    },
    setHighlightedTile(location){
      console.log('setting highlighted location', location);
      const {tiles} = this;
      const thisIndex = tiles.findIndex(tile => tile.location === location );
      console.log('thisIndex', thisIndex)
      this.highlightedIndex = thisIndex;
      setTimeout(() => {
        this.highlightedIndex = null;
      }, 2000);
    },
    selectCreature(asset){
      this.selectedAsset = asset;
      console.log('asset', asset, this.selectedAsset)
      this.showSelectAsset = false;
    },
    handleSelect(index){
      console.log('index', index)
      // console.log('Number(index)', Number(index))
      // console.log('isNaN(index)', isNaN(index))
      if(!this.tiles){return}

      if(isNaN(index) || index === this.selectedTile){
        this.showInfo = false;
        this.selectedTile = null;
        this.selectedData = null
      } else {
        // console.log('shoudl do it')
        this.showInfo = true;
        this.selectedTile = index;
        this.selectedData = this.tiles[index]
      }
      console.log('selectedTile', this.selectedTile)
    },
    creatureExists(asset){
      const {creatures} = this;
      const id = asset.id.Int64 || asset.id;
      if(!id){return}
      const inArray = creatures.includes(id);
      return inArray;
    },
    handleClose(){
      console.log('close')
      this.showFull = false,
      this.fullIndex = null
    },
    handleRemoveItem(index){
      console.log('remove', index, this.binData, this)
      const currentData = this.binData;
      console.log('currentData', currentData)
      if(!currentData){ return}
      const tempArray = currentData.images.slice();
      const newArray = tempArray.filter((img, i) => i !== index);
      const newData = {...currentData, images: newArray}
      this.setBinData(newData)
      this.images = newArray
      this.showFull = false,
      this.fullIndex = null
      console.log('this.binData', this.binData)
      // const tempArray = this.images.slice()
      // console.log('newArray', newArray)
    },
    handleUpdateGallery(){
      // cosnt 
      // this.binData images - 
      console.log('do it')
    },
    handleGenerateGame(props){
      console.log('do it', props);
      this.showNewGameDialog = false,
      this.generateGame(props);
    },
    getColor(team){
      const {gameTeams} = this;
      if(!gameTeams || !team){return}
      const teamObj = gameTeams.find(t => t.team === team)
      const color = teamObj && teamObj.color
      return color
    },
    random(_, { min, max, float = false }) {
      const val = Math.random() * (max - min) + min;
      if (float) {
        return val;
      }
      return Math.floor(val);
    },
  }
}
</script>

<style lang="scss">
section#intro{
  height: calc(100vh - 4rem);
}
.info-column{
  min-width: 320px;
  border-right: 1px solid var(--line-color);
  .info-game{
    height: 100%;
    display: flex;
    flex-direction: column;
    .options-row{
      flex-basis: 1rem;
      flex-shrink: 1;
      flex-grow: 1;
      justify-self: flex-end;
    }
    // .game-options-row{
    //   height: 3rem;
    //   flex-basis: 3rem;
    //   flex-grow: 1;
    //   flex-shrink: 0;    
    // }
  }
  
}
.content-column{
  height: 100%;
}
.map-container{
  overflow: scroll;
  height: 100%;
}
.grid-wrap{
  width: 960px;
  height: 720px;
  display: flex;
  flex-wrap: wrap;
  
  

  
}
.tile-current{
    position: absolute;
    left: 2rem;
    top: 2rem;
    display: flex;
    flex-direction: row;
    
    > div{
      border-radius: 2rem;
      width: 1.1rem;
      height: 1.1rem;
      line-height: calc(1.1rem - 2px);
      margin-right: 0.25rem;
      font-size: 0.5rem;
      font-weight: bold;
      // background: var(--ui-color, #222);
      color: #222;
      text-align: center;
      background: rgba(255,255,255,1);
      // box-shadow: 0 2px .5rem -0.15rem rgba(0, 0, 0, 0.8);
        border: 1px solid #222;
      &.tile-team{
        &.Blue{
          background: blue;
        }
        &.Red{
          background: red;
        }
        &.Yellow{
          background: gold;
        }
        &.Purple{
          background: violet;
        }
        &.Green{
          background: lime;
        }
        transform: scale(1);
        transition: transform .3s ease;
        transition-delay: 0.1s;
      }
      &.tile-owner{
        background: black;
        color: #eee;
        font-size: .875rem;
        font-weight: bold;
        text-align: center;
        line-height: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        transform: scale(1);
        transition: transform .3s ease;
        transition-delay: .2s;
      }
      &.tile-defence{
        border: none;
        background: transparent;
        padding: 0;
        transform: scale(1);
        transition: transform .3s ease;
        transition-delay: .2s;
        color: #111;
        display: flex;
        align-items: center;
        justify-content: center;
        // font-size: .75rem;
        font-weight: bold;
        .v-icon{
          position: absolute;
          z-index: -1;
          transform: scale(0.8);
          filter: drop-shadow(0px 0px 1px #111);
        }
      }
    }
  }
.grid-tile{
  width: 240px;
  height: 240px;
  flex-shrink: 0;
  position: relative;
  transform: translateY(0px) scale3d(1, 1, 1) perspective(0px) rotate3d(0, 0, 0, 0);
  transition: .3s ease-in-out transform, .3s ease-in-out filter;
  transform-style: preserve-3d;
  perspective: 1000;
  background: url(https://gateway.pinata.cloud/ipfs/QmTKD3AgeNSo1AGL4rKMX4RhoLNwZ1iXMUcdW75zW5iozc/ground.jpg) center center no-repeat;
  background-size: contain;
  &.generate{
    // border: 2px dotted #222;
    border: none;
    background: transparent;
    &:before{
    opacity: .9;
    content: "";
    margin: 1rem;
    border: 1px dashed rgba(255,255,255,.3);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: .5rem;
    }
  }
  
  
  

  .emptyinfo, .blankinfo{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 140px;
    height: 140px;
    margin: -70px auto auto -70px;
    border-radius: .5rem;
    border: 1px dotted rgba(0,0,0,.9);
    color: rgba(0,0,0,.5);
    font-size: 1rem;
    text-align: center;
    line-height: 140px;
    background: rgba(255,255,255,.1);
  }
  .blankinfo{
    background: transparent;
    bordeR: none;
    color: #111;
    line-height: 50px;
    color: #222;
  }
  .metainfo{
    position: absolute;
    top: -.5rem;
    left: 10%;
    // right: .5rem;
    // bottom: .5rem;
    border-radius: .5rem;
    z-index: 40;
    color: #fff;
    font-size: .75rem;
    // display: none;
    // visibility: hidden;
    .inside{
      // min-width: 280px;
      position: relative;
      background: rgba(34, 34, 34, 1);
      opacity:0;
      transform: translateY(-4px) translateX(0px);
      transition: transform ease .3s, opacity linear .3s;
      transition-delay: .1s;
      box-shadow: 0px 0px 10px rgba(0,0,0,.3);
      padding: .5rem;
    }
    
  }
  &:hover:not(.highlighted), &.selected{
    
    // box-shadow: 0 0 1px 1px rgba(14,21,47,0.4), 0 45px 100px rgba(14,21,47,0.4), 0 16px 40px rgba(14,21,47,0.5);
    box-shadow: 0 0 1px 1px rgba(73, 79, 100, 0.4), 0 15px 30px rgba(14,21,47,0.4);
    // transform: translateY(-12px) scale3d(1.1, 1.1, 2) perspective(800px);
    transform: translateY(-0px) scale3d(1, 1, 2) perspective(800px);
    z-index: 4;
    position: relative;
    cursor: pointer;
    .asset{
      transform: scale3d(1.07, 1.07, 1.07) translateY(-4px);
      filter: drop-shadow(0px 10px 20px black);
    }
    .metainfo{
      display: block;
      visibility: visible;
      
      .inside{
        background: rgba(34, 34, 34, 1);
        opacity:.9;
        transform: translateY(0px) translateX(-20px);
      }
    }
  }
}
  .grid-wrap{
    &:hover, &.selected{
      .grid-tile{
        // filter: grayscale(1);
        &:hover, &.selected{
           // filter: grayscale(0);
        }
      }
    }
  }
  .info-column{
    position: relative;
    height: 100%;
    z-index: 1;
    
  }
  .options-content, .selected-content{
z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-right: 1px solid var(--line-color);
    overflow-y: scroll;
    padding: 0;
  }
  .selected-content{  
    .emptytile{
      background: rgba(255,255,255,.05);
      padding: .5rem;
      border: .5rem;
    }
  }
  .options-content{
    background: var(--ui-color);
  }
    .controller{
        &:before{
          content: "";
          display: inline-block;
          margin-right: 3px;
          width: 1rem;
          height: 1rem;
          border-radius: 1rem;
        }
      &.Green{
        &:before{
          background: lime;
        }
      }
      &.Blue{
        &:before{
            background: blue;
        }
      }
          &.Red{
            &:before{
            background: red;
            }
          }
          &.Yellow{
            &:before{
            background: gold;
            }
          }
          &.Purple{
            &:before{
            background: violet;
            }
          }
    }
    
    .claim{
      position: fixed;
      z-index: 48;
      // left: 1rem;
      // top: 1rem;
      // right: 1rem;
      // bottom: 1rem;
      left: 50%;
      top: 50%;
      margin-left: -300px;
      margin-top: -250px;
      width: 600px;
      height: 500px;
      background: #222;
      &.battling{
        box-shadow: 0 0.5rem 5rem 0 gold !important;
        .claim-action-row{
          .claim-action-col{ transform: translate3d(0, 1rem, 0);
            opacity: .8;
          }
        }
        .claim-title-row{
          .claim-title-col{ 
            transform: translate3d(0, -2rem, 0);
            opacity: .9;
          }
        }
      }
      .v-card__title{
        + .v-card__text{
          padding-top: 1rem !important;
        }
      }
      .v-card__text{
        height: 100%;;
      }
      .claim-title-row{
        position: absolute;
        top: -1.5rem;
        z-index: 7;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // width: auto;
        .claim-title-col{
          border-radius: .5rem;
          transform: translate3d(0, 0, 0);
          transition: transform .2s ease;
          // box-shadow: 0 2px 5px rgba(0,0,0,.7);
          border: 1px solid var(--line-color);
          background: #222;
          text-transform: uppercase;
        }
        
      }
      .claim-action-row{
        position: absolute;
        bottom: -1rem;
        z-index: 7;
        .claim-action-col{
          border-radius: .5rem;
          border: 1px solid var(--line-color);
          // box-shadow: 0 2px 5px rgba(0,0,0,.7);
          transform: translate3d(0, 0, 0);
          transition: transform .2s ease;
          background: #222;
          text-transform: uppercase;
          
        }
      }
      .claim-row{
        justify-content: stretch;
        align-items: stretch;
        height: 100%;
      }
      .claimCol{
       border-right: 1px solid var(--line-color);
       position: relative;
       
       + .claimCol{
         border-right: none;
       }
       .vs{
         width: 2rem;
         height: 2rem;
         border-radius: 2rem;
         line-height: 2rem;
         text-align: center;
         font-weight: bold;
         background: #fff;
          position: absolute;
          left: -1rem;
          top: 50px;
          color: var(--ui-color);
        }
       .action{
         width: 5rem;
         height: 2rem;
         border-radius: .5rem;
         line-height: 2rem;
         text-align: center;
         font-weight: bold;
         background: #fff;
          position: absolute;
          left: -3.5rem;
          bottom: -1rem;
          color: var(--ui-color);
        }
      }
      .creature-zone{
        
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -200px 0 0 -200px;
        width: 400px;
        height: 400px;
        background: #262626;
        border: 1px solid var(--line-color);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        border-radius: .5rem;
        display: none;
        .tile-creature, .user-creature{
          flex-basis: 50%;
          flex-shrink: 0;
        }
        
        .user-creature{
          border-left: 1px solid var(--line-color);

        }
      }
    }
    .assetGrid{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      overflow: scroll;
      width: 100%;
      .asset{
        width: 96px;
      min-height: 131px;
      }
      &.flow{
        flex-wrap: wrap;
        overflow: inherit;
        .asset{
          margin: 0 2px 2px 0;
          // width: calc((100% / 3) - 6px);
        }
      }
      
    }
    .asset{
      min-width: 96px;
      max-width: 180px;
      &.card{
        background: #111;
        box-shadow: 0 2px 5px black;
        padding: .25rem;
        border: 1px solid #333;
        margin: 0 4px 4px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: calc(128px + 8px);
      }
      
      .card-meta-text{
        font-size: .75rem;
      }
      img{
        width: 100%;
      }
      &.disabled{
        filter: grayscale(1);
        img{
          opacity: .7;
          filter: grayscale(1);
        }
      }
    }
    .claim-layer{
      position: absolute;
      lefT: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 9);
      z-index: 5;
      border-radius: .25rem;
      padding: 2rem .5rem;
      .help{
        background: transparent;
      }
      &.assetGrid{
        
      }
      &.battle{
        z-index: 8;
        // background: var(--ui-color, #111);
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .battle-icon{
          .v-icon:before{
            transform: scale3d(1.5, 1.5,   1.5);
            transition: transform .3s ease-in-out;
            transition-delay: .5s;
            filter: drop-shadow(0px 1px 1px black);
          }
          transform: scale3d(1.5, 1.5,   1.5);
            transition: transform .3s ease-in-out;
            transition-delay: .5s;
            bordeR: 1px solid gold;
            border-radius: 2rem;
            box-shadow: 0 0 4rem gold;
            position: relative;
            // animation: loadingRotate 1.3s linear infinite;
            animation: animaterotate 1.5s linear infinite;
            animation-direction: forwards;
            animation-fill-mode: forwards;

        }
      }
    }
    .select-btn{
      position: absolute;
      right: 0.5rem;
      bottom: 0.5rem;
    }
    .actionzone{
      width: 200px;
      border: 1px solid var(--line-color);
      border-left: none;
      padding: .25rem;
      background: rgba(255,255,255,.05);
      height: 260px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      z-index: 5;
      position: relative;
      &.tile{
        border-radius: .5rem 0 0 .5rem ;
        position: relative;
        right: -1px;
        border-right: none;
      }
      &.user{
        border-radius: 0 .5rem .5rem 0;
        position: relative;
        left: -1px;
        border-left: none;
      }
    }
    .feature{
      background: violet;
      width: 2rem;
      height: 2rem;
      border-radius: 2rem;
      color: #fff;
      text-shadow: 0 -1px 1px rgba(0,0,0,.2);
      text-align: center;
      line-height: 2rem;
      font-weight: bold;
      &.feature-outline{
        background: transparent;
        border: 1px solid var(--line-color);
        margin-left: 4px;
        box-sizing: content-box;
      }
    }
    .tabs-container{
      min-width: 200px;
      width: 100%;
      .tabs-row, .v-tabs-bar{
        height: 24px;
        width: 100%;
      }
    }
    .tab-element{
      font-size: .75rem;
      min-width: 50px;
      padding: 0 4px;
    }
  @keyframes animaterotate {
    0% {
      // transform: rotate(0deg) scale(1.0);
      // transform: rotate(0deg);
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
