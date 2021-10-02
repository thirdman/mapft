<template>
  <div outlined class="game-info " :class="expanded ? 'expanded' : ''"  v-if="game && game.options" >
    <v-card-text class="pa-0">
    
    <v-expansion-panels
      v-model="showPanel"
      flat 
      
    >
    <v-expansion-panel class="card-bg">
      <v-expansion-panel-header class="header-panel" >
        <div class="row ma-0">
          <tile-image-preview :game="game" index="14" size="64" />
          <div class="col pa-1">
            <label class="x-small">Size</label>
            {{game.options.rows}} x {{game.options.cols}}
          </div>
          <!-- <div class="col pa-0">
            <label>Columns</label>
            {{game.options.cols}}
          </div> -->
        </div>
        <v-spacer />
        <div class="header-text">{{game.title ||  game.id}}</div>
        <v-btn plain @click="loadGame" v-if="displayMode === 'preview'">load</v-btn>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="row">
          <div class="col">
            <label>Map Mode</label>
            <div class="game-label" >
              {{game.options.mapMode}}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>ID</label>
            <div class="game-label" >
              {{game.id}}
            </div>
          </div>
          <div class="col">
            <label>Rows</label>
            <div class="game-label" >
              {{game.options.rows}}
            </div>
          </div>
          <div class="col">
            <label>Cols</label>
            <div class="game-label" >
              {{game.options.cols}}
              
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Tile Set</label>
            <div class="game-label" >
              {{game.settings.tileSetId}}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Players</label>
            <div class="game-label" >
              <div v-for="(player, i) in game.players" :key="i" v-if="game && game.players">
                <player-info :player="player" :address="player" />
                <!-- <hash-address :address="player" /> -->
              </div>
            </div>
          </div>
        </div>
      <v-btn text x-small @click="logGame" v-if="devMode">log game</v-btn>
      <v-btn text x-small @click="loadGame" v-if="devMode">Load</v-btn>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-expansion-panels>
    </v-card-text>
  </div>
</template>

<style lang="scss">
  .game-info{
    font-size: 675rem;
    margin-bottom: 4px;;
    .v-expansion-panel-header{
      min-height: 32px;
    }
    &.theme--dark.v-card{
      background: #201424;
    }
    .header-panel{
      padding: 0;
    }
    .header-text{
      padding: 0 4px;
      // width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100px;
    }
  }
  .player-icon-container{
    border-radius: 1rem;
    width: 1rem;
    height: 1rem;
  }
</style>

<script>
import { mapMutations, mapGetters } from "vuex";
import HashAddress from './HashAddress.vue';
import PlayerInfo from './PlayerInfo.vue';

export default {
  components: { HashAddress, PlayerInfo },
  name: "GameInfo",
  props: ['onSelect', 'onClose', 'game', 'expanded', 'mode'],
  created(){
    if(this.mode){
      this.displayMode = this.mode;
    }
  },
  data() {
    return {
      showPanel: false,
      devMode: false,
      displayMode: 'preview'
    };
  },
  computed: {
    ...mapGetters({
      // walletAddress: "ui/walletAddress",
      userTeam: "ui/userTeam",
      // gameTeams: "ui/gameTeams",
      activeGame: "ui/activeGame",
    }),
  },

  methods: {
    ...mapMutations({
    }),
    logGame(){
      console.log('gameData', this.game)
    },
    loadGame(){
      this.$router.push(`/game/${this.game.id}`)
    }
    
  },
};
</script>


