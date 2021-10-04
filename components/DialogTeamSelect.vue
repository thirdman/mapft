<template>
  <v-dialog
      v-model="showTeamSelect"
      width="500"
    >
    
          <v-card outlined elevation="4" :class="`dialog join`" v-if="showTeamSelect">
        
        <v-card-title class="row d-flex align-center">
          <div class="col">
            Join Game
          </div>
          <div class="col col-1">
              <v-btn icon @click="setShowTeamSelect(false)">
                <v-icon size="large">mdi-close</v-icon>
              </v-btn>
            </div>
        </v-card-title>
        <v-card-text>
          <div class="row">
            <div class="col">
              <label>Team</label>
              <team-select
                :team="userTeam"
                :teams="gameTeams"
                direction="row"
                :onSelect="handleTeamSelect"
                />  
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Display Name</label>
              <v-text-field small filled clearable outlined dense v-model="newUserName" hint="Display Name" />
            </div>
          </div>
          <v-divider />
          <div class="row">
            <div class="col">
              <label>Preview</label>
              <div class="user preview">
                <player-info :player="compiledPlayer" :address="walletAddress" preview />
              </div>
            </div>
          </div>
        </v-card-text>
        <!-- <v-card-actions>
          <v-btn @click="addPlayer">Join!</v-btn>
        </v-card-actions> -->
      
          <!-- <team-select
            :team="userTeam"
            :teams="gameTeams"
            direction="row"
            :onSelect="handleTeamSelect"
            />   -->
        
        <!-- <v-divider class="ma-0"></v-divider> -->
        <v-card-actions>
            <v-btn @click="onAction(compiledPlayer)">Join!</v-btn>
            <v-btn depressed outlined text @click="handleTeamSelect(null)">Cancel</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>


</template>

<style lang="scss">

</style>

<script>
import { mapMutations, mapGetters } from "vuex";
import TeamSelect from './TeamSelect.vue';

export default {
  props: ['onSelect', 'onClose', 'show', 'onAction', 'userPlayer'],
  data() {
    return {
      // showTeamSelect: true
      newUserName: "New Player",
    };
  },
  created(){
    if(this.userPlayer && this.userPlayer.displayName){
      this.newUserName = this.userPlayer.displayName;
    }
  },
  mounted(){
    // this.showTeamSelect = this.show;
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      introRead: "ui/introRead",
      userTeam: "ui/userTeam",
      gameTeams: "ui/gameTeams",
      showTeamSelect: "ui/showTeamSelect",
    }),
    compiledPlayer(){
      const {userPlayer, userTeam} = this;
      const color = userTeam && this.getColor(userTeam)
      // return {walletAddress, id: walletAddress, displayName: newUserName, team: userTeam, color: color}
      if(!userPlayer) {return}
      const  tempPlayer = {...userPlayer, displayName: this.newUserName, team: userTeam, color: color}
      console.log('about to return tempPlayer: ', tempPlayer)
      return tempPlayer
    }
    
  },

  methods: {
    ...mapMutations({
      setIntroRead: "ui/setIntroRead",
      setUserTeam: "ui/setUserTeam",
      setShowTeamSelect: "ui/setShowTeamSelect",
    }),
    handleTeamSelect(teamObj){
      if(!teamObj){
        this.setShowTeamSelect(false);  
        return
      } else {
      const userTeam = teamObj.team;
      this.setUserTeam(userTeam);
      // this.setShowTeamSelect(false);
      }
    },
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


