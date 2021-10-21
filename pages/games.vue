<template>
  <div class="pageContainer">
    <Header />
    <dialog-new-game 
      v-if="showNewGameDialog"
      :onClose="() => this.showNewGameDialog = false"
      :onAction="handleGenerateGame"
      />
    <section id="intro" class="row ma-0 content">
      <div class="col col-3 intro-column">
        <v-btn large outlined raised @click="resetGames" v-if="devMode && 1===2">Reset Games</v-btn>
        <v-btn large outlined raised @click="arrayFromMapGrid" v-if="devMode ">trial</v-btn>
        <label>Config Status</label>
<Loading v-if="configStatus === 'working'" :message="configStatus" />
        <label>Bin Status</label>
{{binStatus}}
      </div>
      <div class="col col-9">
        <div class="row">
          <div class="col">
            <h2>
              Games
            </h2>
          </div>
          <div class="col-2 col pt-5">
            <v-btn outlined raised @click="() => {this.showNewGameDialog = true}">New Game</v-btn>
          </div>
        
        </div>
        
        <div class="" v-if="gameStatus !== 'loading'">
            <div  class="row">
              <game-preview
                v-for="(game, index) in games"
                :key="index"
                :game="game"
                :onRemove="() => removeGame(index)"
                />


            </div>
            <div v-if="remoteGames">
            <v-divider />
            <h3>Remote Games</h3>
            <div v-for="(game, index) in remoteGames" :key="index">
              <game-preview
                :key="index"
                :game="game" 
                :onRemove="() => removeRemoteGame(game.id)"
                />
              <div>
                {{game.id}} - {{game.map && game.map.rows}} rows, {{game.map && game.map.cols}} columns 
                <v-btn text @click="loadGame(game.id)">load</v-btn> 
                <v-btn text @click="saveGame(game.id)">save</v-btn> 
              </div>
            </div>
          </div>
          <div v-if="devMode">
            <v-divider />
            <div v-for="(game, index) in games" :key="index" class="row" >
              <div class="col col-12">
              <game-info :game="game" :expanded="false" />
              </div>
              <div class="col" v-if="devMode">
                {{game.id.substring(0, 3)}} - {{game.map && game.map.rows}} rows, {{game.map && game.map.cols}} columns 
                <v-btn text @click="loadGame(game.id)">load</v-btn>  
                <v-btn text @click="removeGame(index)">remove</v-btn>  
              </div>
            </div>
          </div>

          <div v-if="localGames && devMode">
            <v-divider />
            <label>Temporary Games</label>
            <div v-for="(game, index) in localGames" :key="index">
              <game-info :game="game" :expanded="false" />
              <div>
                {{game.id.substring(0, 3)}}
                <v-btn text @click="loadGame(game.id)">load</v-btn> 
                <v-btn text @click="saveGame(game.id)">save</v-btn> 
              </div>
            </div>
          </div>
            
          </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import GameInfo from '../components/GameInfo.vue';
// import { v4 as uuidv4 } from 'uuid';
export default {
  components: { GameInfo },
  head: {
    title: 'Unknown Games',
    // meta: [
    //   { hid: 'description', name: 'description', content: 'View a cool nft' },
    // ],
  },
  data(){
    return {
      showNewGameDialog: false,
      tileSize: 128,
      gameStatus: "ready",
      // gameId: null,
      // remoteGames: null,
    }
  },
  mounted(){
    
  },
  computed: {
    ...mapGetters({
      devMode: 'ui/devMode',
      games: 'ui/games',
      remoteGames: 'ui/remoteGames',
      localGames: 'ui/localGames',
      activeGame: 'ui/activeGame',
      binData: "ui/binData",
      binStatus: "ui/binStatus",
      configStatus: "ui/configStatus",
    })
  },
  methods: {
    ...mapMutations({
       setActiveGame: 'ui/setActiveGame',
       setRemoteGames: 'ui/setRemoteGames',
       
    }),
     ...mapActions({
      generateGame: 'ui/generateGame',
      updateConfig: 'ui/updateConfig',
      arrayFromMapGrid: 'ui/arrayFromMapGrid',
    }),
    async handleGenerateGame(props){
      // const newId = uuidv4();
      // this.gameId = newId;
      this.showNewGameDialog = false;
      // const gameOptions = {...props, id: newId}
      const redirect = props.loadGame;
      const gameId = await this.generateGame(props);
      console.log('gameId', gameId)
      // const redirect = false;
      if(gameId && redirect){
        this.loadGame(gameId);
      }
    },
    loadGame(id){
      console.log('loadGame id', id);
      if(!id){
        console.log('something went wrong, id is missing', id)
      }
      // const gameLocal = this.localGames && this.localGames.find(game => game.id === id);
      // const gameRemote = this.games && this.games.find(game => game.id === id);
      // const thisGame = gameRemote || gameLocal;
      // console.log('game is', thisGame)
      // this.setActiveGame(thisGame);
      this.$router.push(`/game/${id}`)
    },
    saveGame(id){
      console.log('loadGame id', id);
      if(!id){
        console.log('something went wrong, id is missing', id)
      }
      const game = this.localGames && this.localGames.find(game => game.id === id);
      const {games} = this;
      if(!game){
        console.error('no game found')
        return
      }
      const gameExists = this.games.find(game => game.id === id);
      if(gameExists){
          console.error('game id already exists')
        return
      }
      const newGames = [...games, game];
        
    

     
      this.updateConfig({games: newGames});
      // this.$router.push(`/game/${game.id}`)
    },
    removeGame(index){
      const {games} = this;
      console.log('typeof games', typeof games);
      console.log('games', games);
      if(!games){return}
      const newGames = games && games.filter((game, i) => i !== index);
      console.log('filtered games would be: ', newGames)
      this.updateConfig({games: newGames});
    },
    async removeRemoteGame(id){
      const {remoteGames} = this;
      console.log('typeof remoteGames', typeof remoteGames);
      console.log('remoteGames', remoteGames);
      if(!remoteGames){return}
      const newGames = remoteGames && remoteGames.filter(game => game.id !== id);
      console.log('filtered games would be: ', newGames)
      this.setRemoteGames(newGames)
      this.$nextTick(() => {
        // this.$nuxt.$loading.start()

        // setTimeout(() => this.$nuxt.$loading.finish(), 500)
      console.log('remoteGames is now: ', remoteGames)
      this.updateConfig({});
      })
    },
    
    resetGames(){
      // const newGames =  JSON.parse(`{"games": [
      //       {
      //     "rows": 5,
      //     "cols": 6,
      //     "useDefaultTeams": true,
      //     "generateMap": false,
      //     "owner": "0xd1c248d1c9879dc3b5a846d4dccc5b7aa8fbf432",
      //     "mapMode": "explore",
      //     "tileSetId": "Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk",
      //     "id": "9f8b79d0-9269-49b5-9edc-408025dbf226",
      //     "options": {
      //       "rows": 5,
      //       "cols": 6,
      //       "useDefaultTeams": true,
      //       "generateMap": false,
      //       "owner": "0xd1c248d1c9879dc3b5a846d4dccc5b7aa8fbf432",
      //       "mapMode": "explore",
      //       "tileSetId": "Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk"
      //     },
      //     "tiles": [
      //       {
      //         "id": "0_0",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           0,
      //           0
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "1_0",
      //         "src": "https://gateway.pinata.cloud/ipfs/Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk/14.png",
      //         "title": null,
      //         "location": [
      //           1,
      //           0
      //         ],
      //         "index": 14,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": 13,
      //           "owner": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "2_0",
      //         "src": "https://gateway.pinata.cloud/ipfs/Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk/14.png",
      //         "title": null,
      //         "location": [
      //           2,
      //           0
      //         ],
      //         "index": 14,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": 17,
      //           "owner": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "3_0",
      //         "src": "https://gateway.pinata.cloud/ipfs/Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk/14.png",
      //         "title": null,
      //         "location": [
      //           3,
      //           0
      //         ],
      //         "index": 14,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": 14,
      //           "owner": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "4_0",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           4,
      //           0
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "5_0",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           5,
      //           0
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "0_1",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           0,
      //           1
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "1_1",
      //         "src": "https://gateway.pinata.cloud/ipfs/Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk/11.png",
      //         "title": null,
      //         "location": [
      //           1,
      //           1
      //         ],
      //         "index": 11,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": 14,
      //           "owner": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "2_1",
      //         "src": "https://gateway.pinata.cloud/ipfs/Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk/15.png",
      //         "title": null,
      //         "location": [
      //           2,
      //           1
      //         ],
      //         "index": 15,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": 19,
      //           "owner": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "3_1",
      //         "src": "https://gateway.pinata.cloud/ipfs/Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk/9.png",
      //         "title": null,
      //         "location": [
      //           3,
      //           1
      //         ],
      //         "index": 9,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": 24,
      //           "owner": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "4_1",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           4,
      //           1
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "5_1",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           5,
      //           1
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "0_2",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           0,
      //           2
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "1_2",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           1,
      //           2
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "2_2",
      //         "src": "https://gateway.pinata.cloud/ipfs/Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk/11.png",
      //         "title": null,
      //         "location": [
      //           2,
      //           2
      //         ],
      //         "index": 11,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": 9,
      //           "owner": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "3_2",
      //         "src": "https://gateway.pinata.cloud/ipfs/Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk/14.png",
      //         "title": null,
      //         "location": [
      //           3,
      //           2
      //         ],
      //         "index": 14,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": 22,
      //           "owner": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "4_2",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           4,
      //           2
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "5_2",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           5,
      //           2
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "0_3",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           0,
      //           3
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "1_3",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           1,
      //           3
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "2_3",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           2,
      //           3
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "3_3",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           3,
      //           3
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "4_3",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           4,
      //           3
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "5_3",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           5,
      //           3
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "0_4",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           0,
      //           4
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "1_4",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           1,
      //           4
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "2_4",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           2,
      //           4
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "3_4",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           3,
      //           4
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "4_4",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           4,
      //           4
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "5_4",
      //         "src": null,
      //         "title": null,
      //         "location": [
      //           5,
      //           4
      //         ],
      //         "index": null,
      //         "sides": [],
      //         "tile": null,
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       }
      //     ],
      //     "tileMap": [
      //       [
      //         null,
      //         14,
      //         14,
      //         14,
      //         null,
      //         null
      //       ],
      //       [
      //         null,
      //         11,
      //         15,
      //         9,
      //         null,
      //         null
      //       ],
      //       [
      //         null,
      //         null,
      //         11,
      //         14,
      //         null,
      //         null
      //       ],
      //       [
      //         null,
      //         null,
      //         null,
      //         null,
      //         null,
      //         null
      //       ],
      //       [
      //         null,
      //         null,
      //         null,
      //         null,
      //         null,
      //         null
      //       ]
      //     ],
      //     "settings": {
      //       "generateMap": false,
      //       "tileSetId": "Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk",
      //       "hasValues": true,
      //       "hasUnits": true
      //     },
      //     "map": {
      //       "rows": 5,
      //       "cols": 6
      //     },
      //     "creatures": [],
      //     "players": [
      //       "aaaaa"
      //     ],
      //     "teams": [
      //       {
      //         "team": "Red",
      //         "count": 0,
      //         "totalValue": 0,
      //         "god": "war",
      //         "color": "#d15a47"
      //       },
      //       {
      //         "team": "Green",
      //         "count": 0,
      //         "totalValue": 0,
      //         "god": "nature",
      //         "color": "#68cb4d"
      //       },
      //       {
      //         "team": "Blue",
      //         "count": 0,
      //         "totalValue": 0,
      //         "god": "magic",
      //         "color": "#404dbf"
      //       },
      //       {
      //         "team": "Purple",
      //         "count": 0,
      //         "totalValue": 0,
      //         "god": "deception",
      //         "color": "#ad43d0"
      //       },
      //       {
      //         "team": "Yellow",
      //         "count": 0,
      //         "totalValue": 0,
      //         "god": "light",
      //         "color": "#d9b826"
      //       },
      //       {
      //         "team": "Teal",
      //         "count": 0,
      //         "totalValue": 0,
      //         "god": "death",
      //         "color": "#22c3a3"
      //       }
      //     ]
      //   },
      //   {
      //     "tiles": [
      //       {
      //         "id": "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
      //         "src": "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/6.png",
      //         "title": "north west",
      //         "location": [
      //           0,
      //           0
      //         ],
      //         "index": 6,
      //         "sides": [],
      //         "meta": {
      //           "value": 18,
      //           "attack": 4,
      //           "defence": 6,
      //           "team": "Yellow",
      //           "owner": "0x1234",
      //           "creature": {
      //             "id": 319,
      //             "name": "Griffith, The Chosen",
      //             "effect": "Protected. Ward.<br>Roar: Set the strength of all other creatures with strength 4 or more to 1.",
      //             "god": "light",
      //             "rarity": "legendary",
      //             "tribe": {
      //               "String": "",
      //               "Valid": false
      //             },
      //             "mana": 7,
      //             "attack": {
      //               "Int64": 6,
      //               "Valid": true
      //             },
      //             "health": {
      //               "Int64": 7,
      //               "Valid": true
      //             },
      //             "type": "creature",
      //             "set": "genesis",
      //             "collectable": true,
      //             "live": "true",
      //             "art_id": "C136",
      //             "lib_id": "L1-319"
      //           }
      //         }
      //       },
      //       {
      //         "id": "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
      //         "src": "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/14.png",
      //         "title": "north",
      //         "location": [
      //           1,
      //           0
      //         ],
      //         "index": 14,
      //         "sides": [],
      //         "meta": {
      //           "value": 8,
      //           "attack": 3,
      //           "defence": 6,
      //           "team": "Purple",
      //           "owner": "0x1234",
      //           "creature": {
      //             "id": 341,
      //             "name": "Merchant Prince",
      //             "effect": "Roar: Reduce the cost of all cards in your hand that did not start in your deck by 1.",
      //             "god": "deception",
      //             "rarity": "rare",
      //             "tribe": {
      //               "String": "guild",
      //               "Valid": true
      //             },
      //             "mana": 4,
      //             "attack": {
      //               "Int64": 2,
      //               "Valid": true
      //             },
      //             "health": {
      //               "Int64": 4,
      //               "Valid": true
      //             },
      //             "type": "creature",
      //             "set": "genesis",
      //             "collectable": true,
      //             "live": "true",
      //             "art_id": "C315",
      //             "lib_id": "L1-341"
      //           }
      //         }
      //       },
      //       {
      //         "id": "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
      //         "src": "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/14.png",
      //         "title": "north east",
      //         "location": [
      //           2,
      //           0
      //         ],
      //         "index": 14,
      //         "sides": [],
      //         "meta": {
      //           "value": 13,
      //           "attack": 3,
      //           "defence": 4,
      //           "team": "Blue",
      //           "owner": "0x1234",
      //           "creature": {
      //             "id": 23,
      //             "name": "Portal Wrangler",
      //             "effect": "Roar: Add a copy of the last creature played to your hand.",
      //             "god": "magic",
      //             "rarity": "common",
      //             "tribe": {
      //               "String": "mystic",
      //               "Valid": true
      //             },
      //             "mana": 4,
      //             "attack": {
      //               "Int64": 3,
      //               "Valid": true
      //             },
      //             "health": {
      //               "Int64": 4,
      //               "Valid": true
      //             },
      //             "type": "creature",
      //             "set": "genesis",
      //             "collectable": true,
      //             "live": "true",
      //             "art_id": "C69",
      //             "lib_id": "L1-023"
      //           }
      //         }
      //       },
      //       {
      //         "id": "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
      //         "src": "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/12.png",
      //         "title": "north east",
      //         "location": [
      //           3,
      //           0
      //         ],
      //         "index": 12,
      //         "sides": [],
      //         "meta": {
      //           "value": 9,
      //           "attack": 3,
      //           "defence": 4,
      //           "team": "Blue",
      //           "owner": "0x1234",
      //           "creature": {
      //             "id": 401,
      //             "name": "Light's Bidding",
      //             "effect": "Roar: Transform a creature with strength 2 or less into a 2/2 Acolyte. Gain control of the Acolyte.",
      //             "god": "light",
      //             "rarity": "common",
      //             "tribe": {
      //               "String": "",
      //               "Valid": false
      //             },
      //             "mana": 6,
      //             "attack": {
      //               "Int64": 2,
      //               "Valid": true
      //             },
      //             "health": {
      //               "Int64": 3,
      //               "Valid": true
      //             },
      //             "type": "creature",
      //             "set": "promo",
      //             "collectable": true,
      //             "live": "true",
      //             "art_id": "C471",
      //             "lib_id": "L4-002"
      //           }
      //         }
      //       },
      //       {
      //         "id": "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
      //         "src": "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/7.png",
      //         "title": "West",
      //         "location": [
      //           0,
      //           1
      //         ],
      //         "index": 5,
      //         "sides": [],
      //         "meta": {
      //           "value": 7,
      //           "attack": 0,
      //           "defence": 0,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "Qmevue8kqHJqH1sZWjTuZkNcpF2v3sUsx7zP68jmJmPyDx",
      //         "src": "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/12.png",
      //         "title": "Middle",
      //         "location": [
      //           1,
      //           1
      //         ],
      //         "index": 1,
      //         "sides": [],
      //         "meta": {
      //           "value": 4,
      //           "attack": 6,
      //           "defence": 6,
      //           "team": "Red",
      //           "owner": "0x1234",
      //           "creature": {
      //             "id": 195,
      //             "name": "Cyclops",
      //             "effect": "After Cyclops attacks a creature, deal 1 damage to each other creature.",
      //             "god": "war",
      //             "rarity": "rare",
      //             "tribe": {
      //               "String": "wild",
      //               "Valid": true
      //             },
      //             "mana": 6,
      //             "attack": {
      //               "Int64": 5,
      //               "Valid": true
      //             },
      //             "health": {
      //               "Int64": 5,
      //               "Valid": true
      //             },
      //             "type": "creature",
      //             "set": "genesis",
      //             "collectable": true,
      //             "live": "true",
      //             "art_id": "C278",
      //             "lib_id": "L1-195"
      //           }
      //         }
      //       },
      //       {
      //         "id": "Qmevue8kqHJqH1sZWjTuZkNcpF2v3sUsx7zP68jmJmPyDx",
      //         "src": "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/5.png",
      //         "title": "East",
      //         "location": [
      //           2,
      //           1
      //         ],
      //         "index": 5,
      //         "sides": [],
      //         "meta": {
      //           "value": 4,
      //           "attack": 6,
      //           "defence": 6,
      //           "team": "Purple",
      //           "owner": "0x1234",
      //           "creature": {
      //             "id": 276,
      //             "name": "Vile Mantis",
      //             "effect": "Roar: Destroy two other random friendly creatures. This creature gains +2/+3 for each creature destroyed.",
      //             "god": "death",
      //             "rarity": "common",
      //             "tribe": {
      //               "String": "",
      //               "Valid": false
      //             },
      //             "mana": 4,
      //             "attack": {
      //               "Int64": 3,
      //               "Valid": true
      //             },
      //             "health": {
      //               "Int64": 2,
      //               "Valid": true
      //             },
      //             "type": "creature",
      //             "set": "genesis",
      //             "collectable": true,
      //             "live": "true",
      //             "art_id": "C19",
      //             "lib_id": "L1-276"
      //           }
      //         }
      //       },
      //       {
      //         "id": "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
      //         "src": null,
      //         "title": "north east",
      //         "location": [
      //           3,
      //           1
      //         ],
      //         "index": false,
      //         "sides": [],
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null,
      //           "creatureSrc": null
      //         }
      //       },
      //       {
      //         "id": "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
      //         "src": "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/1.png",
      //         "title": "South West",
      //         "location": [
      //           0,
      //           2
      //         ],
      //         "index": 3,
      //         "sides": [],
      //         "meta": {
      //           "value": 21,
      //           "attack": 6,
      //           "defence": 5,
      //           "team": "Red",
      //           "owner": "0x1234",
      //           "creature": {
      //             "id": 163,
      //             "name": "Mercenary Daemon",
      //             "effect": "Frontline.<br>Roar: Give an enemy creature frontline.",
      //             "god": "war",
      //             "rarity": "common",
      //             "tribe": {
      //               "String": "nether",
      //               "Valid": true
      //             },
      //             "mana": 5,
      //             "attack": {
      //               "Int64": 6,
      //               "Valid": true
      //             },
      //             "health": {
      //               "Int64": 5,
      //               "Valid": true
      //             },
      //             "type": "creature",
      //             "set": "genesis",
      //             "collectable": true,
      //             "live": "true",
      //             "art_id": "C307",
      //             "lib_id": "L1-163"
      //           }
      //         }
      //       },
      //       {
      //         "id": "Qmevue8kqHJqH1sZWjTuZkNcpF2v3sUsx7zP68jmJmPyDx",
      //         "src": "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/3.png",
      //         "title": "South",
      //         "location": [
      //           1,
      //           2
      //         ],
      //         "index": 10,
      //         "sides": [],
      //         "meta": {
      //           "value": 13,
      //           "attack": 4,
      //           "defence": 4,
      //           "team": "Green",
      //           "owner": "0x1234",
      //           "creature": {
      //             "id": 295,
      //             "name": "Ferocious Rougarou",
      //             "effect": "Regen 2.<br>When a friendly creature is summoned, this creature gets +1/+1.<br>When a friendly creature dies, this creature takes 1 damage.",
      //             "god": "nature",
      //             "rarity": "common",
      //             "tribe": {
      //               "String": "amazon",
      //               "Valid": true
      //             },
      //             "mana": 5,
      //             "attack": {
      //               "Int64": 4,
      //               "Valid": true
      //             },
      //             "health": {
      //               "Int64": 4,
      //               "Valid": true
      //             },
      //             "type": "creature",
      //             "set": "genesis",
      //             "collectable": true,
      //             "live": "true",
      //             "art_id": "C255",
      //             "lib_id": "L1-295"
      //           }
      //         }
      //       },
      //       {
      //         "id": "Qmevue8kqHJqH1sZWjTuZkNcpF2v3sUsx7zP68jmJmPyDx",
      //         "src": null,
      //         "title": "south",
      //         "location": [
      //           2,
      //           2
      //         ],
      //         "index": false,
      //         "sides": [],
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       },
      //       {
      //         "id": "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
      //         "src": null,
      //         "title": "South West",
      //         "location": [
      //           3,
      //           2
      //         ],
      //         "index": false,
      //         "sides": [],
      //         "meta": {
      //           "value": null,
      //           "attack": null,
      //           "defence": null,
      //           "team": null,
      //           "owner": null,
      //           "creature": null
      //         }
      //       }
      //     ],
      //     "id": "demo",
      //     "creatures": [],
      //     "teams": [
      //       {
      //         "team": "Red",
      //         "count": 0,
      //         "totalValue": 0,
      //         "god": "war",
      //         "color": "#d15a47"
      //       },
      //       {
      //         "team": "Green",
      //         "count": 0,
      //         "totalValue": 0,
      //         "god": "nature",
      //         "color": "#68cb4d"
      //       },
      //       {
      //         "team": "Blue",
      //         "count": 0,
      //         "totalValue": 0,
      //         "god": "magic",
      //         "color": "#404dbf"
      //       },
      //       {
      //         "team": "Purple",
      //         "count": 0,
      //         "totalValue": 0,
      //         "god": "deception",
      //         "color": "#ad43d0"
      //       },
      //       {
      //         "team": "Yellow",
      //         "count": 0,
      //         "totalValue": 0,
      //         "god": "light",
      //         "color": "#d9b826"
      //       },
      //       {
      //         "team": "Teal",
      //         "count": 0,
      //         "totalValue": 0,
      //         "god": "death",
      //         "color": "#22c3a3"
      //       }
      //     ],
      //     "tileMap": [
      //       [
      //         6,
      //         14,
      //         14,
      //         12
      //       ],
      //       [
      //         5,
      //         1,
      //         5,
      //         false
      //       ],
      //       [
      //         3,
      //         10,
      //         false,
      //         false
      //       ]
      //     ],
      //     "players": [
      //       "admin",
      //       "player 1",
      //       "player 2",
      //       "player 3"
      //     ],
      //     "units": [
      //       {
      //         "id": "admin",
      //         "location": [
      //           0,
      //           0
      //         ]
      //       }
      //     ],
      //     "options": {
      //       "rows": 3,
      //       "cols": 4,
      //       "mapMode": "static",
      //       "owner": "admin",
      //       "tileSetId": "QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me"
      //     },
      //     "map": {
      //       "rows": 3,
      //       "cols": 4
      //     },
      //     "owner": "admin",
      //     "settings": {
      //       "generateMap": false,
      //       "hasValues": true,
      //       "hasUnits": true
      //     }
      //   }
      // ]}`);
      // console.log('newGames', newGames.games);
      // const array = newGames.games
      // console.log('newGames array', array);
      // this.updateConfig({games: array});
    }
  }
}
</script>

<style lang="scss">
  section.content{
    display: flex;
    justify-content: center;
    .col.intro-column{
      max-width: 500px;
    }
    .hero-image{
      // bordeR: 1px solid var(--line-color);
      box-shadow: 0 1rem 4rem -.5rem black;
    }
  }
</style>
