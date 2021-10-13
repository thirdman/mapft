<template>
  <div
    class="grid-tile"
    :class="`${!tile.src ? 'generate' : ''} ${selected ? 'selected' : ''} ${fill ? 'fill' : ''} ${highlighted ? 'highlighted' : ''}  ${tile.meta.team ? tile.meta.team : ''}`"
    @click="handleSelect && handleSelect(index)"
     :style="size ? `width: ${size}px; height: ${size}px` :`width: 100%; height: auto`"
     @contextmenu="tile && onRightClick && onRightClick($event, tile.location)"
    >
    
     <!-- :style="size && `width: ${size}px; height: ${size}px`" -->
    <!-- width="240px" -->
    <img
      :src="tile.src" 
      v-if="tile.src"
      :style="size && `width: ${size}px; height: ${size}px; border: none;`"
     />
    <div class="card-unit" v-if="unit"  >
      <!-- <player-unit :unit="unit" :player="unit.player" /> -->
      <player-info :player="unit.player" mode="unit" />
    </div>
     <div class="tile-dev" v-if="devMode">
       {{tile.hasMapElement ? "hasMapELement" : ""}}
     </div>
      <!-- :style="fill ? `width: 100%; height: auto` : `width:` " -->
      
    <Card  :asset="creature.asset" v-if="creature && creature.asset && tile.src" :showmeta="false" :card="false" />
    <Card  :asset="tile.meta.creature" v-if="!hideAsset && tile.meta.creature && tile.meta.creature.id" :showmeta="false" :card="false" />
    <div v-if="creature && tile.src" class="tile-creature">
      <v-icon large color="lime">mdi-ghost</v-icon>
    </div>
    <div v-if="loot && tile.src" class="tile-loot">
      <v-icon large color="lime">mdi-sack</v-icon>
    </div>
    <div v-if="items" class="tile-items">
        <div v-for="(item, index) in items" :key="index" class="tile-item" :style="`background: ${item.color}`">
        <!-- {{item.id}} -->
        <v-icon>mdi-flag</v-icon>
      </div>
    </div>
    <!-- <img v-if="tile.meta && tile.meta.creatureSrc" :src="tile.meta.creatureSrc" width="100px" class="creature-image" /> -->
    <div class="tile-current" >
      <div class="tile-team" 
        v-tooltip="tile.meta.team ? `${tile.meta.team} controls this tile` : 'Tile Controller'"  
        :class="tile.meta.team" 
        :style="`background: ${tile.meta.team ? getColor(tile.meta.team) : ''}`"
        v-if="tile.meta && tile.meta.team"
        ></div>
      <div class="tile-value"
        v-tooltip="`Tile Value: ${tile.meta.value}`" 
        v-if="tile.meta && tile.meta.value"
        >{{tile.meta.value}}
        </div>
      <div class="tile-owner" 
        v-tooltip="tile.meta && tile.meta.value && tile.meta.owner === walletAddress ? 'You own this tile!' : `Tile Owner`" 
        v-if="tile.meta && tile.meta.value && tile.meta.owner && tile.meta.owner === walletAddress"
        >
        <v-icon light color="white" x-small>mdi-account-circle</v-icon>
      </div>
      <div
        class="tile-defence" 
        v-tooltip="`Defence value: ${tile.meta.defence}`"  v-if="tile.meta && tile.meta.defence"
        >
        <v-icon color="white" medium>mdi-shield</v-icon>
        {{tile.meta.defence}}
      </div>
    </div>
    <div class="emptyinfo" v-if="!hideEmpty && tile.meta && tile.meta.value && !tile.meta.creature && tile.meta.owner !== walletAddress">
      Uncontested 
    </div>
    <div class="blank-info" v-if="tile.meta && !tile.meta.value && !tile.src">
      <!-- <v-icon medium>mdi-help</v-icon> -->
      <v-btn outlined small @click="() => {onAction && onAction(tile.location)}" primary>
        <span>Explore</span>
      </v-btn>
      <!-- <v-btn outlined x-small @click="() => {onAction && onAction(tile.location)}" primary>
        <span>Place Tile...</span>
      </v-btn> -->
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
  .tile-dev{
    background: #eee;
    color: red;
    position: absolute;
    font-size: .75rem;
    font-weight: bold;;
  }
  &.highlighted{
      opacity: 1;
      z-index: 999;
      box-shadow: 0 0 2rem -5px #d0b900, 0 0 4px 1px white;
      // transform: scale3d(1.1, 1.1, 1.1);
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
.tile-loot{
  position: absolute;
  top: calc(50% - 1.5rem);
  left: calc(50% - 1.5rem);
  // top: 0;
  // left: 0;
  // color: gold;
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  // background: gold;
  display: grid;
  place-content: center;
  background: url(https://gateway.pinata.cloud/ipfs/QmcLhKPBvUcGT6EfYZ2HeoPcS5MibUsKtUetJWxBtePxFa/1.png) center center no-repeat;
  background-size: calc(648px / 2);
  background-position: -100px -120px;
  background-color: #eee;
  z-index: 1;
  .v-icon{
    display: none;
  }
  .v-icon::before{
    color: var(--background-color);
    text-shadow: 0 2px .5rem rgba(0, 0, 0, 0.5);
  }
  
}
.tile-creature{
  position: absolute;
  top: calc(50% - 1.5rem);
  left: calc(50% - 1.5rem);
  color: #eee;
  width: 3rem;
  height: 3rem;
  // background: gold;
  display: grid;
  place-content: center;
  .v-icon::before{
    color: var(--background-color);
    text-shadow: 0 2px .5rem rgba(0, 0, 0, 0.5);
  }
  + .tile-loot{
    left: calc(50% + 1.5rem);
  }
}
.tile-items{
  position: absolute;
  bottom: 3%;
  right: 3%;
  color: #eee;
  // width: 3rem;
  //height: 3rem;
  display: grid;
  place-content: center;
  .tile-item{
    width: 2rem; 
    height: 2rem;
    background: lime; 
    color: black;
    border-radius: 2rem;
    display: inline-flex;
    margin-left: 2px;
    overflow: hidden;
    box-shadow: 0 1px 4px -1px rgba(0,0,0,.3);
    display: grid;
    place-items: center;
  }
  
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
    'onRightClick',
    'hideAsset', 
    'hideEmpty', 
    'fill', 
    'highlighted', 
    'unit',
    'loot',
    'creature',
    'items',
    ],
  data() {
    return {
      
    };
  },
  created(){
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      gameTeams: "ui/gameTeams",
      userTeam: "ui/userTeam",
      devMode: "ui/devMode",
    }),
    
  },

  methods: {
    ...mapMutations({
    }),
    getColor(team){
      const {gameTeams} = this;
      if(!gameTeams || !team){return}
      const teamObj = gameTeams.filter(t => t.team === team)
      const color = teamObj && teamObj[0]  && teamObj[0].color
      return color
    },
    
    
  },
};
</script>


