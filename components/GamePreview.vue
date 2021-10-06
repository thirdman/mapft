<template>
  <v-card
    elevation="2"
    class="game-preview ma-3"
    v-if="game && game.options"
    max-width="274"
    >
    <v-img
      height="192"
      :src="previewImage"
    >
    </v-img>
    
    <v-card-text class="pa-2">
      <div class="header-text" v-if="game.title" >{{game.title}}</div>
      <HashAddress :address="game.id" v-if="game && !game.title" />
      
        <div class="row">
          <div class="col">
            <label class="x-small">Mode</label>
            <div class="game-label" >
              {{game.options.mapMode}}
            </div>
          </div>
          <div class="col">
            <label class="x-small">Size</label>
            <div class="game-label" >
              <span v-if="game.options.mapMode === 'explore'">
                Unlimited
              </span>
              <span v-else>
                {{game.options.rows}} x {{game.options.cols}}
              </span>
            </div>
          </div>
          <div class="col">
            <label class="x-small">Players</label>
            <div class="game-label" >
              {{game.players && game.players.length}}
            </div>
          </div>
        </div>
    </v-card-text>
    <v-divider class="ma-0" />
    <v-card-actions >
      <v-btn plain @click="loadGame"  >load</v-btn>
      <v-btn plain @click="onRemove" v-if="devMode && onRemove" >Remove</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss">
  
</style>

<script>
import { mapMutations, mapGetters } from "vuex";
import HashAddress from './HashAddress.vue';
import PlayerInfo from './PlayerInfo.vue';

export default {
  components: { HashAddress },
  name: "GamePreview",
  props: ['onSelect', 'onClose', 'onRemove', 'game', 'expanded', 'mode'],
  created(){
    if(this.mode){
      this.displayMode = this.mode;
    }
  },
  data() {
    return {
      displayMode: 'preview'
    };
  },
  computed: {
    ...mapGetters({
      // walletAddress: "ui/walletAddress",
      userTeam: "ui/userTeam",
      devMode: "ui/devMode",
      activeGame: "ui/activeGame",
      ipfsUrl: "ui/ipfsUrl",
      tileSets: "ui/tileSets",
    }),
    previewImage(){
      const {game, tileSets} = this;
      const {tileSetId} = game.options;
      const thisTileSet = tileSets && tileSets.find(ts => ts.id === tileSetId);
      const {ipfsUrl = 'https://ipfs.cf-ipfs.com/ipfs/'} = this;
      const tileIndex = thisTileSet && thisTileSet.previewIndex || 14;
      return `${ipfsUrl}${tileSetId}/${tileIndex}.png`;
    },
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


