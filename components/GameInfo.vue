<template>
  <div outlined class="game-info " :class="expanded ? 'expanded' : ''"  v-if="game && game.options" >
    <v-card-text class="pa-0">
          <!-- <div class="col pa-1">
            <label class="x-small">Size</label>
            {{game.options.rows}} x {{game.options.cols}}
          </div> -->
        
        <div class="header-text">{{game.title ||  game.id}}</div>
        <div class="row">
          <div class="col">
            <label>Map Mode</label>
            <div class="game-label" >
              {{game.options.mapMode}}
            </div>
          </div>
        </div>
        <div class="row">
          <!-- <div class="col">
            <label>ID</label>
            <div class="game-label" >
              {{game.id}}
            </div>
          </div> -->
          <div class="col">
            <label>Loot</label>
            <div class="game-label" >
              {{game.settings.hasLoot ? "Yes" : "No"}}
            </div>
          </div>
          <div class="col">
            <label>Creatures</label>
            <div class="game-label" >
              {{game.settings.hasCreatures ? "Yes" : "No"}}
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
              {{tileSetName || game.settings.tileSetId}}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Players</label>
            <div class="player-list" >
              <div v-for="(player, i) in game.players" :key="i" v-if="game && game.players" >
                <player-info :player="player" />
                <!-- <hash-address :address="player" /> -->
              </div>
            </div>
          </div>
        </div>
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
      padding: 0;
      // width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100px;
    }
  }
  .player-list{
    .player-info{
      margin-bottom: .25rem;
      display: inline-flex;
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
    this.panel = 0;
  },
  data() {
    return {
      panel: 0,
      devMode: false,
      displayMode: 'preview'
    };
  },
  computed: {
    ...mapGetters({
      // walletAddress: "ui/walletAddress",
      tileSets: "ui/tileSets",
      userTeam: "ui/userTeam",
      // gameTeams: "ui/gameTeams",
      activeGame: "ui/activeGame",
    }),
    tileSetName(){
      const {game, tileSets} = this;
      const {tileSetId} = game.options
      const thisSet = tileSetId && tileSets && tileSets.find(ts => ts.id === tileSetId)
      const name = thisSet && thisSet.name;
      return name
    }
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


