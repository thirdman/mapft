<template>
  <div
    class="grid-tile"
    :class="`${!tile.src ? 'generate' : ''} ${selected ? 'selected' : ''} ${fill ? 'fill' : ''} ${highlighted ? 'highlighted' : ''}  ${tile.meta.team ? tile.meta.team.toLowerCase() : ''}`"
    @click="handleSelect && handleSelect(index)"
     :style="size ? `width: ${size}px; height: ${size}px` :`width: 100%; height: auto`"
    >
    
     <!-- :style="size && `width: ${size}px; height: ${size}px`" -->
    <!-- width="240px" -->
    <img
      :src="tile.src" 
      v-if="tile.src"
      :style="size && `width: ${size}px; height: ${size}px; border: none;`"
     />
    <div class="card-unit" v-if="unit" v-tooltip="`Player`" >
      <div class="team-marker" :style="`background: ${userTeam ? getColor(userTeam) : ''}`" />
    </div>
     
      <!-- :style="fill ? `width: 100%; height: auto` : `width:` " -->
    <Card  :asset="tile.meta.creature" v-if="!hideAsset && tile.meta.creature && tile.meta.creature.id" :showmeta="false" :card="false" />
    <!-- <img v-if="tile.meta && tile.meta.creatureSrc" :src="tile.meta.creatureSrc" width="100px" class="creature-image" /> -->
    <div class="tile-current" v-if="tile.meta && tile.meta.value">
      <div class="tile-team"  v-tooltip="tile.meta.team ? `${tile.meta.team} controls this tile` : 'Tile Controller'"  :class="tile.meta.team" :style="`background: ${tile.meta.team ? getColor(tile.meta.team) : ''}`"></div>
      <div class="tile-value" v-tooltip="`Tile Value: ${tile.meta.value}`" >{{tile.meta.value}}</div>
      <div class="tile-owner"  v-tooltip="tile.meta && tile.meta.value && tile.meta.owner === walletAddress ? 'You own this tile!' : `Tile Owner`"  v-if="tile.meta && tile.meta.value && tile.meta.owner === walletAddress">
        <v-icon light color="white" x-small>mdi-account-circle</v-icon>
      </div>
      <div class="tile-defence"  v-tooltip="`Defence value: ${tile.meta.defence}`"  v-if="tile.meta && tile.meta.defence">
        <v-icon color="white" medium>mdi-shield</v-icon>
        {{tile.meta.defence}}
      </div>
    </div>
    <div class="emptyinfo" v-if="!hideEmpty && tile.meta && tile.meta.value && !tile.meta.creature && tile.meta.owner !== walletAddress">
      Uncontested 
    </div>
    <div class="blank-info" v-if="tile.meta && !tile.meta.value && !tile.src">
      <v-icon medium>mdi-help</v-icon>
      <v-btn outlined small @click="() => {onAction && onAction(tile.location)}" primary>
        <span>Generate</span>
      </v-btn>
      <v-btn outlined x-small @click="() => {onAction && onAction(tile.location)}" primary>
        <span>Place Tile...</span>
      </v-btn>
      <div v-if="devMode" class="location-info">{{tile.location}}</div>
    </div>
    <!-- <div class="metainfo">
      <div class="inside ">
        <div class="row ma-0">
          <div class="col pa-0">
            Click to view tile information
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss">
.grid-tile{
  width: 100%;
  height: auto;
  transition: transform .3s ease;
  &.fill{
    img{
      width: 100%;
      height: auto;
    }
  }
  &.highlighted{
      opacity: 1;
      z-index: 999;
      box-shadow: 0 0 2rem -5px #d0b900, 0 0 4px 1px white;
      transform: scale3d(1.1, 1.1, 1.1);
      .tile-current{
        // transform: scale(2);
        // transform-origin: top left;
        .tile-team{
          transform: scale(1.4);
          transform-origin: center center;
        }
        .tile-value{}
        .tile-owner{
          transform: scale(1.4);
          transform-origin: center center;
        }
        .tile-defence{
          transform: scale(1.4);
          transform-origin: center center;
          
        }
      }
      // .asset{
      //   transform: scale3d(1.1, 1.1, 1.1) translateY(0px);
      //   transition-delay: .3s;;
      // }
    }
  .asset{
    background: transparent;
    border: none;
    box-shadow: none;;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100px;
    margin-left: -50px;
    margin-top: -70px;
    z-index: 2;
    filter: drop-shadow(0px 5px 10px rgba(0,0,0,.5));
    transform: scale3d(1, 1, 1) translateY(0);
    transition: transform .3s ease;
    transition-delay: 0s;
    
  }
}
.card-unit{
  position: absolute;
  right: 10px;
  top: 10px;
  margin: 10px 0 0 -70px;
  z-index: 99;
  width: 60px;
  height: 60px;
  border-radius: 100px;
  background: white;
  box-shadow: 0 3px 12px black;
  background: url(https://ipfs.io/ipfs/QmWY5NJR6BwjxPCt6pQg1p1As5LcWMxJvzfHsFfRia5Q2X) center center no-repeat;
    background-size: auto;
    background-size: contain;
    border: 1px solid white;
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
    .team-marker{
      position: absolute;
      right: 4px;
      bottom: 4px;
      width: 10px;
      height: 10px;
      border-radius: 8px;
      background: violet;
      border: 1px solid white;
    }
}
.location-info{
  font-size: .75rem;
  color: var(--primary-color, #eee);
}
.blank-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: [
    'tile', 
    'handleSelect', 
    'selected', 
    'index', 
    'size',  
    'onAction', 
    'hideAsset', 
    'hideEmpty', 
    'fill', 
    'highlighted', 
    'unit'],
  data() {
    return {
      devMode: true
    };
  },
  created(){
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      gameTeams: "ui/gameTeams",
      userTeam: "ui/userTeam",
    }),
    
  },

  methods: {
    ...mapMutations({
    }),
    getColor(team){
      const {gameTeams} = this;
      if(!gameTeams || !team){return}
      const teamObj = gameTeams.filter(t => t.team === team)
      const color = teamObj && teamObj[0].color
      return color
    }
    
  },
};
</script>


