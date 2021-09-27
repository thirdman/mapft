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
          <nuxt-link to="/game/demo">demo</nuxt-link>
          <v-btn block small outlined @click="() => {this.showNewGameDialog = true}">New Game</v-btn>
          <div v-if="activeGame">
            activeGame: {{activeGame.id}}
          </div>
          <div v-if="games">
            <div v-for="(game, index) in games" :key="index">
              <game-info :game="game" :expanded="false" />
              <div>{{game.id.substring(0, 3)}} - {{game.map && game.map.rows}} rows, {{game.map && game.map.cols}} columns <v-btn text @click="loadGame(game.id)">load</v-btn>  </div>
            </div>

          </div>
        </div>
      </div>
      <div class="col col-9">
        <div class="map-container" v-if="gameStatus !== 'loading'">
            <div
              class="grid-wrap"
              :style="tileMap && tileMap[0] && `width: ${tileMap[0].length * tileSize}px; height: ${tileMap.length * tileSize}px;`">
              <div class="grid-tile" v-for="(tile, index) in tiles"
                :key="index"
                :style="`width: ${tileSize}px; height: ${tileSize}px;`"
                >
              </div>
              <!-- <Tile
                v-for="(tile, index) in tiles"
                :key="index"
                size="240"
                :tile="tile"
                :handleSelect="handleTileSelect"
                :index="index"
                /> -->
                <!-- :selected="selectedTile === index"
                :highlighted="highlightedIndex === index"
                :onAction="handleGenerate" -->
              
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
      activeGame: 'ui/activeGame',
    })
  },
  methods: {
    ...mapMutations({
       setActiveGame: 'ui/setActiveGame',
      
    }),
     ...mapActions({
      generateGame: 'ui/generateGame',
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
      console.log('id', id);
      const game = this.games && this.games.find(game => game.id === id);
      console.log('game', game)
      this.setActiveGame(game);
      this.$router.push(`/game/${game.id}`)
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
