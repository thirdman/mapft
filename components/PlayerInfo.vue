<template>
  <div
  outlined
  :class="`player-info demo ${mode || 'preview'}`"
  v-if="player || address"
  :style="mode !== 'unit' && `border-color: ${thisColor}`"
  v-tooltip="mode === 'unit' && `${player && player.displayName || 'Player' }`"
  >
    <div class="player-icon-container" :style="`background-color: ${thisColor};`">
      <v-img :src="player && player.avatarSrc" v-if="player && player.displayName" />
      <v-icon :size="mode === 'unit' ? 'x-large' : 'small'" v-else>mdi-account</v-icon>
    </div>
    <span class="player-name" v-if="player && player.displayName">{{player.displayName}}</span>
    <hash-address :address="address || player && player.walletAddress" v-else />
    <div class="team-marker" :style="`background-color: ${thisColor}`" />
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
    transform: scale(1);  
      transition: scale .3s ease-in-out;
      transition-delay: .2s;
    .player-icon-container{
      border-radius: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      margin-right: .25rem;
      display: grid;
      place-items: center;
      background: #ccc;
      padding: 0px;
      overflow: hidden;
    }
    .team-marker{
      display: none; // overridden
        position: absolute;
        right: 4px;
        bottom: 4px;
        width: 10px;
        height: 10px;
        border-radius: 8px;
        background: transparent;
        border: 1px solid white;
      }
    &.preview{
      background: rgba(255,255,255,.05);
      border-width: 1px;
      border-style: solid;
      border-radius: 2rem;;
      outline: 0px solid pink;
      outline-offset: 1px;
      display: inline-flex;
      
    }
    &.unit{
      margin: none;
      overflow: visible;
      border-radius: 48px;
      box-shadow: 0 3px 12px black;
      padding: 0;
      border: 1px solid white;
      .player-name, .hash-address{
        display: none;
      }
      .player-icon-container{
        margin: 0;
        width: 48px;
        height: 48px;
        background-size: 48px;
      }
      .player-name{
        padding-right: .25rem;
      }
      .team-marker{
        display: block;
      }
      &.demo{
        // background: url(https://ipfs.io/ipfs/QmWY5NJR6BwjxPCt6pQg1p1As5LcWMxJvzfHsFfRia5Q2X) center center no-repeat;
        background-size: auto;
        background-size: contain;
        &:before{
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(135deg, #ffffffc2, #fff0);
          border-radius: 100px;
        }
      }
    }
    
  }
  .highlighted .player-info{
    // transform: scale(1.2);
    animation: drawattention 1s 1 ease-in-out;
    transform-origin: center center;
  
  }
  @keyframes drawattention {
    from {
      transform: scale3d(1, 1, 1);
    }
    50% {
      transform: scale3d(1.2, 1.2, 1.2);
    }
    to {
      transform: scale3d(1, 1, 1);
    }
  }
  


</style>

<script>
import { mapMutations, mapGetters } from "vuex";
import HashAddress from './HashAddress.vue';

export default {
  components: { HashAddress },
  name: "PlayerInfo",
  props: ['onSelect', 'onClose', 'player', 'address', 'team', 'color', 'mode'],
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


