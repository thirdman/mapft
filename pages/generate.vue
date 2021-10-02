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
        <div class="info-game">
          <h3>
            Generate your own
          </h3>
          <p class="text-body-2">Exploring possibilities of NFT based gaming.</p>
          <!-- <v-btn block small outlined @click="() => {this.showNewGameDialog = true}">New Game</v-btn> -->
          <div class="row">
            <div class="col">
              <nuxt-link to="/game/demo" class="asButton">View Demo</nuxt-link>
            </div>
          </div>
          <div v-if="activeGame">
            activeGame: {{activeGame.id}}
          </div>
          
        </div>
      </div>
      <div class="col col-9">
        <h2>
          Generate Game
        </h2>
        <v-btn large outlined raised @click="() => {this.showNewGameDialog = true}">New Game</v-btn>
        <div class="map-container" v-if="gameStatus !== 'loading'">
          <p>Set map and game rules using your own or shared assets.</p>
          <v-divider />
            <label>Games</label>
            <div v-for="(game, index) in games" :key="index">
              <game-info :game="game" :expanded="false" />
              <div>{{game.id.substring(0, 3)}} - {{game.map && game.map.rows}} rows, {{game.map && game.map.cols}} columns 
                <v-btn text @click="loadGame(game.id)">load</v-btn>  
                <v-btn text @click="removeGame(index)">remove</v-btn>  
              </div>
            </div>
          <div v-if="localGames">
          <v-divider />
            <label>Temporary Games</label>
            <div v-for="(game, index) in localGames" :key="index">
              <game-info :game="game" :expanded="false" />
              <div>
                {{game.id.substring(0, 3)}} - {{game.map && game.map.rows}} rows, {{game.map && game.map.cols}} columns 
                <v-btn text @click="loadGame(game.id)">load</v-btn> 
                <v-btn text @click="saveGame(game.id)">save</v-btn> 
              </div>
            </div>
          </div>
            <!-- <div
              class="grid-wrap"
              :style="tileMap && tileMap[0] && `width: ${tileMap[0].length * tileSize}px; height: ${tileMap.length * tileSize}px;`">
              <div class="grid-tile" v-for="(tile, index) in tiles"
                :key="index"
                :style="`width: ${tileSize}px; height: ${tileSize}px;`"
                >
              </div>
            </div> -->

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
    title: 'Generate',
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
    }
  },
  computed: {
    ...mapGetters({
      tileMap: 'ui/tileMap',
      tiles: 'ui/tiles',
      games: 'ui/games',
      localGames: 'ui/localGames',
      activeGame: 'ui/activeGame',
    })
  },
  methods: {
    ...mapMutations({
       setActiveGame: 'ui/setActiveGame',
       
    }),
     ...mapActions({
      generateGame: 'ui/generateGame',
      updateConfig: 'ui/updateConfig',
    }),
    async handleGenerateGame(props){
      // const newId = uuidv4();
      // this.gameId = newId;
      this.showNewGameDialog = false;
      // const gameOptions = {...props, id: newId}
      const gameId = await this.generateGame(props);
      console.log('gameId', gameId)
      if(gameId){
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
      console.log('game is', game)
      this.updateConfig({game});
      // this.$router.push(`/game/${game.id}`)
    },
    removeGame(index){
      const games = this.games && this.games.filter((game, i) => i !== index);
      console.log('filtered games would be: ', games)
      this.updateConfig({games});
      
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
