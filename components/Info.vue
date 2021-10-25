<template>
  <div
    :class="`tile-info col pa-0 ${selected ? 'selected' : ''}`"
    >
    <dialog-object-interaction 
      :onAction="addObject" 
      :item="loot" 
      type="loot"
      v-if="showObjectInteraction && loot" 
      :userPlayer="userPlayer" 
      :show="showObjectInteraction && loot"
      :onClose="()=> {showObjectInteraction = false}"
    />    
    <div class="row ma-0 d-flex align-center" >
      <div class="col pa-2">
        <label>Tile</label>
      </div>
      <div class="col col-2 pa-2">
        <v-btn text depressed icon @click="onClose"><v-icon>mdi-close</v-icon></v-btn>
      </div>
    </div>
    
    <div v-if="!showTeamSelect" class="row ma-0">
      <div class="col col-6">
        
        <Tile 
          :tile="tile"
          v-if="tile"
          :showmeta="false"
          :card="false"
          :handleSelect="false"
          :onAction="false"
          :hideAsset="true"
          :fill="false"
          :hideEmpty="true"
          size="90"

          />
          <!-- size="140" -->
          <!-- :fill="true" -->
      </div>
    
      <div class="col ">
        <v-divider class="ma-0"/>
        <label>location</label>
        {{selectedData.location && selectedData.location.toString()}}
        <v-divider class="my-2"/>
        <label>Accessible</label>
        {{tile && tile.isAccessible ? "Yes" : 'No'}}
        <v-divider class="ma-0"/>
        <label>Value</label>
        {{selectedData.meta.value}}
        <v-divider class="my-2"/>
        <label>Owner</label>
        <div v-if="selectedData.meta.owner">
          <div v-if="walletAddress && walletAddress === selectedData.meta.owner">
            <v-icon light color="white" x-small>mdi-account-circle</v-icon> YOU
          </div>
          <div v-else>
            {{selectedData.meta.owner}}
          </div>
        </div>
        <div v-else>
          -
        </div>

        
      </div>
    </div>
    <div v-if="!showTeamSelect && selectedData">
      <v-divider class="ma-0" />
      <div class="row ma-0 controller-section">
        <div class="controller-mark" :class="selectedData.meta.team" :style="`background: ${selectedData.meta.team ? getColor(selectedData.meta.team) : ''}`"></div>
        <div class="col col-6">
          <label>Asset</label>
          <Card :asset="creature.asset" v-if="creature && creature.asset" />
          <div v-if="creature && !creature.asset">Creature</div>
          <!-- <Card :asset="selectedData.meta.creature" v-if="selectedData.meta.creature" /> -->
          <p class="body-text-2 help" v-else>This tile is uncontested. </p>
        </div>
        <div class="col col-6">
          <label>Controller</label>
          <div v-if="tile.meta.team" :class="`controller ${selectedData.meta && selectedData.meta.team}`">{{selectedData.meta && selectedData.meta.team}}</div>
          <div v-else>Neutral</div>
          <v-divider class="my-2" />
          
          <div v-if="creature && creature.asset">
            <v-divider class="my-2" />
            <label>Asset</label>
            <div>{{creature.asset.name}}</div>
          </div>
          <div v-if="creature && creature.asset">
            <v-divider class="my-2" />
            <label>Health</label>
            {{creature.asset.health.Int64 || creature.asset.health }}
            <label>Attack</label>
            {{creature.asset.attack.Int64 || creature.asset.attack || '-'}}
          </div>
        </div>
      </div>
    </div>
    <div v-if="!showTeamSelect" class="tile-actions">
      <div class="col ma-0 loot-section">
        <v-divider class="my-2"/>
        <label>Loot</label>
        <div v-if="loot">
          <game-object :item="loot" type="loot" />
        </div>
        <div v-if="!loot">-</div>

        <div v-if="loot" >
          <div class="row ma-0">
            <div class="col pa-0">
              <!-- <label>Opened</label>
              <div>{{loot.active ? "No" : "Yes"}}</div> -->
              <v-btn
              small
              outlined
              block
              :color="loot && loot.active ? 'primary' : ''"
              :disabled="loot && !loot.active"
              @click="handlePointInteraction({type: 'loot',item: loot})"
              >Interact</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showTeamSelect" class="tile-actions">
      <v-divider class="ma-0" />
        <!-- <team-select
        :team="userTeam" :teams="gameTeams" direction="column"
        :onSelect="handleTeamSelect"
        /> -->
        <v-btn depressed outlined primary @click="() => this.showTeamSelect = false">cancel</v-btn>
        <v-btn depressed outlined @click="setShowTeamSelect(!showTeamSelect)">Select Team</v-btn>
    </div>
    <div v-if="!showTeamSelect && selectedData" >
      <v-divider class="ma-0" />
      <div class="row ma-0 tile-actions">
        <div class="col">
          <!-- <v-btn
            depressed
            primary
            block
            :color="userTeam ? 'primary' : ''"
            @click="onClaimSelect && onClaimSelect(selectedData.location)"
            :disabled="!userTeam"
            v-if="devMode && selectedData.src"
            >Claim Tile...</v-btn> -->
            
          <v-btn
            depressed
            primary
            block
            outlined
            :disabled="!tile.src || tile.isAccessible === false"
            :color="userTeam ? 'primary' : ''"
            @click="onMove && onMove(selectedData.location)"
            v-if="onMove && userPlayer"
            v-tooltip="`${tile.isAccessible ? 'Move to this tile' : 'You cannot move to this tile'}`"
            >
              Move Here
            </v-btn>
          <v-btn
            depressed
            block
            outlined
            :disabled="!tile.src || (playerLocation && playerLocation.toString() !== selectedData.location.toString())"
            :color="userTeam ? 'primary' : ''"
            @click="onPlace && onPlace(selectedData.location, userPlayer)"
            v-if="onPlace && userPlayer"
            v-tooltip="`Leave a player piece to claim this tile`"
            >
              Place Item
            </v-btn>
          <v-btn block depressed outlined primary v-if="!userTeam" @click="() => setShowTeamSelect(true)">Select Team to Play</v-btn>
          
            <v-btn
              outlined
              depressed
              block
              v-if="selectedData.meta && !selectedData.meta.value && !selectedData.src"
              @click="() => {onAction && onAction(tile.location)}"
              >
              Generate tile
            </v-btn>
          
          <!-- <div v-if="selectedData.canGenerate" >
            <v-btn @click="onGenerateSelect && onGenerateSelect(selectedData.location)">Generate Tile</v-btn>
          </div> -->
        </div>
      </div>
    </div>


    <!-- <div class="metainfo">
      <div>
        <div class="emptytile">
          empty tile actions
        </div>
      </div>
    </div> -->
  </div>
</template>


<style lang="scss">
.tile-info{
 // padding: 2rem; 
 .tile{
   box-shadow: none !important;
 }
}
.controller-section{
  position: relative;
}
.controller-mark{
  height: 100%;
  position: absolute;
  width: 4px;
  background: rgba(0,0,0,.5);
}
.tile-actions{
  .col{
    button{
      margin-bottom: .25rem;
    }
  }
}
</style>

<script>
import { mapMutations, mapGetters } from "vuex";
import GameObject from "./GameObject.vue";
// import TeamSelect from './TeamSelect.vue';

export default 
  {
  components: { GameObject },
  props: [
    'tile', 
  'handleSelect', 
  'selected', 
  'userPlayer',
  'onAction', 
  'onClose', 
  'onPlace',
  'onMove', 
  'playerLocation',
  'selectedData', 
  'index', 'onGenerateSelect', 'onClaimSelect', 'handleClaim', 'getCreature', 'getLoot'],
  data() {
    return {
      showObjectInteraction: false
    };
  },
  created(){
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      gameTeams: "ui/gameTeams",
      userTeam: "ui/userTeam",
      tiles: "ui/tiles",
      showTeamSelect: "ui/showTeamSelect",
      devMode: "ui/devMode",
    }),
    creature(){
      const {getCreature, selectedData} = this;
      if(getCreature){
        const creature = getCreature(selectedData.location);
          return creature
      }else {
        return null
      }
    },
    loot(){
      const {getLoot, selectedData} = this;
      if(getLoot){
        const loot = getLoot(selectedData.location);
        return loot
      }else {
        return null
      }
    }
  },

  methods: {
    ...mapMutations({
      setUserTeam: 'ui/setUserTeam',
      setShowTeamSelect: "ui/setShowTeamSelect",
    }),
    handlePointInteraction({type = 'loot', item}){
      
      console.log('loot', item);
      this.showObjectInteraction = true;
    },
    addObject({type = 'loot', item}){
      
      console.log('add object', item);
      this.showObjectInteraction = false;
    },
    getColor(team){
      const {gameTeams} = this;
      if(!gameTeams || !team){return}
      const teamObj = gameTeams.filter(t => t.team === team)
      const color = teamObj && teamObj[0] && teamObj[0].color
      return color || "#ccc"
    }
  },
};
</script>


