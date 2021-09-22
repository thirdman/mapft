<template>
  <div
    :class="`tile-info col pa-0 ${selected ? 'selected' : ''}`"
    >
    
    <div class="row ma-0" >
      <div class="col ma-0">
        <h4>Tile</h4>
      </div>
      <div class="col col-3">
        <v-btn text depressed @click="onClose"><v-icon>mdi-close</v-icon></v-btn>
      </div>
    </div>
    
    <div v-if="!showTeamSelect" class="row ma-0">
      <div class="col col-7">
        
        <Tile 
          :tile="tile"
          v-if="tile"
          :showmeta="false"
          :card="false"
          :handleSelect="false"
          :onAction="false"
          :hideAsset="true"
          :fill="true"
          />
          <!-- size="140" -->
          <!-- :fill="true" -->
          
      </div>
      <div class="col col-5">
        <v-divider class="ma-0"/>
        <label>location</label>
        {{selectedData.location && selectedData.location.toString()}}
        <v-divider class="my-2"/>
        <label>Value</label>
        {{selectedData.meta.value}}
        <v-divider class="my-2"/>
        <label>Loot</label>
        <div>-</div>
        <v-divider class="my-2"/>
        <div v-if="selectedData.meta.defence" >
          <div class="row ma-0">
            <div class="col pa-0">
              <label>Defence</label>
              {{selectedData.meta.defence}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!showTeamSelect && selectedData">
      <v-divider class="ma-0" />
      <div class="row ma-0 controller-section">
        <div class="controller-mark" :class="selectedData.meta.team" :style="`background: ${selectedData.meta.team ? getColor(selectedData.meta.team) : ''}`"></div>
        <div class="col col-7">
          <label>Asset</label>
          <Card :asset="selectedData.meta.creature" v-if="selectedData.meta.creature" />
          <p class="body-text-2" v-else>This tile is uncontested. Claim it to increas your team score </p>
        </div>
        <div class="col col-5">
          <label>Controller</label>
          <div v-if="tile.meta.team" :class="`controller ${selectedData.meta && selectedData.meta.team}`">{{selectedData.meta && selectedData.meta.team}}</div>
          <div v-else>Neutral</div>
          <v-divider class="my-2" />
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
          <div v-if="selectedData.meta && selectedData.meta.asset">
            <v-divider class="my-2" />
            <label>Asset</label>
            <div>{{selectedData.meta.asset}}</div>
          </div>
          <v-divider class="my-2" />
          <label>Defence</label>
          {{selectedData.meta.defence}}
          <label>Attack</label>
          {{selectedData.meta.attack || '-'}}
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
          <v-btn
            depressed
            primary
            block
            :color="userTeam && 'primary'"
            @click="onClaimSelect && onClaimSelect(selectedData.location)"
            :disabled="!userTeam"
            >Claim Tile...</v-btn>
          <v-btn block depressed outlined primary v-if="!userTeam" @click="() => setShowTeamSelect(true)">Select Team to Play</v-btn>
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
</style>

<script>
import { mapMutations, mapGetters } from "vuex";
// import TeamSelect from './TeamSelect.vue';

export default {
  props: ['tile', 'handleSelect', 'selected', 'onAction', 'onClose', 'selectedData', 'index', 'onGenerateSelect', 'onClaimSelect', 'handleClaim'],
  data() {
    return {
      // showTeamSelect: false,
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
    }),
    
  },

  methods: {
    ...mapMutations({
      setUserTeam: 'ui/setUserTeam',
      setShowTeamSelect: "ui/setShowTeamSelect",
    }),
    // handleTeamSelect(teamObj){
    //   const userTeam = teamObj.team;
    //   this.setUserTeam(userTeam);
    //   this.showTeamSelect = false;
    // },
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


