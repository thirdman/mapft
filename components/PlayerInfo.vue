<template>
  <div outlined class="player-info preview"  v-if="player || address" :style="`border-color: ${thisColor}`">
    <div class="player-icon-container" :style="`background-color: ${thisColor};`">
      <v-icon small>mdi-account</v-icon>
    </div>
    <span v-if="player&& player.displayName">{{player.displayName}}</span>
    <hash-address :address="address || player && player.walletAddress" v-else />
  </div>
</template>

<style lang="scss">
  .player-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: .875rem;
    padding-right: .25rem;
    &.preview{
      border-width: 2px;
      border-style: solid;
      border-radius: 2rem;;
      outline: 0px solid pink;
      outline-offset: 1px;
      
    }
  }
  .player-icon-container{
    border-radius: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: .25rem;
    display: grid;
    place-items: center;
    background: #ccc;
    padding: 2px;
    
  }
</style>

<script>
import { mapMutations, mapGetters } from "vuex";
import HashAddress from './HashAddress.vue';

export default {
  components: { HashAddress },
  name: "PlayerInfo",
  props: ['onSelect', 'onClose', 'player', 'address', 'team', 'color'],
  data() {
    return {
      showPanel: false,
      devMode: false,
    };
  },
  computed: {
    ...mapGetters({
      gameTeams: "ui/gameTeams",
    }),
    thisColor(){
      const {gameTeams, player} = this;
      const {team} = player;
      if(!gameTeams || !team){return}
      const teamObj = gameTeams.find(t => t.team === team)
      const color = teamObj && teamObj.color
      return color
    },
    thisPlayer(){
      const {player} = this;
      if(typeof player === 'object'){
        return player
      } else {
        return {
          displayName: player,
          walletAddress: player,
        }
      }
    }
  },

  methods: {
    ...mapMutations({
    }),
    getColor(team){
      const {gameTeams} = this;
      if(!gameTeams || !team){return}
      const teamObj = gameTeams.find(t => t.team === team)
      const color = teamObj && teamObj.color
      return color
    },
  },
};
</script>


