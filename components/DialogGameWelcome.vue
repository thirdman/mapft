<template>
  <v-dialog
      v-model="show"
      width="500"
      scrollable
    >
    <v-card outlined elevation="4" :class="`dialog welcome bg-darker`" >    
        <v-card-title class="row d-flex align-center">
          <div class="col">
            Welcome
          </div>
          <v-spacer />
          <div class="col col-1">
              <v-btn icon @click="onClose" v-if='onClose'>
                <v-icon size="large">mdi-close</v-icon>
              </v-btn>
            </div>
        </v-card-title>
        <v-card-text>
          <div class="col col-12 user-section" v-if="walletAddress">
          <div class="row">
            <div class="col">
              <label>Team</label>
              <team-select
                :team="userPlayer && userPlayer.team || randomTeam && randomTeam.team"
                :teams="teams"
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
          </div>
          <div class="col col-12 nouser-section" v-if="!walletAddress">
            To join this game you need to connect your wallet.
          </div>
        </v-card-text>
        
        <v-divider class="ma-0"></v-divider>
        <v-card-actions>
            <v-btn @click="onAction && onAction(compiledPlayer)" :disabled="!compiledPlayer || !userTeam">Begin</v-btn>
            <v-btn @click="onJoin" :disabled="!onJoin">Join</v-btn>
            <v-btn @click="onClose" text v-if="onClose">Close</v-btn>
            <!-- <v-btn @click="onAction(compiledPlayer)">Join!</v-btn> -->
            <!-- <v-btn depressed outlined text @click="handleTeamSelect(null)">Cancel</v-btn> -->
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>


</template>

<style lang="scss">

</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['onSelect', 'onClose', 'show', 'onAction', 'onJoin', 'gameData', 'userPlayer'],
  data() {
    return {
      // showTeamSelect: true
      newUserName: "",
    };
  },
  created(){
    this.newUserName = this.userName
  },
  mounted(){
    this.newUserName = this.userName
    console.log('randomTeam', this.randomTeam);
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      introRead: "ui/introRead",
      userTeam: "ui/userTeam",
      gameTeams: "ui/gameTeams",
      showTeamSelect: "ui/showTeamSelect",
      playerTemplate: "ui/playerTemplate",
    }),
    teams(){
      const {gameData} = this;
      if(!gameData) return;
      return gameData.teams;
    },
    userName(){
      const {walletAddress, userPlayer} = this;
      return userPlayer && userPlayer.displayName || walletAddress || "New Player"
    },
    randomTeam(){
      const {gameData, userTeam} = this;
      if(userTeam){
        return userTeam
      }
        if(!gameData){return}
      const {teams} = gameData;
      if(teams){
        
        const thisTeam = this.getRandomFromArray(teams, 1)
        if(!thisTeam){
          return null
        }
        this.setUserTeam(thisTeam[0]);
        return thisTeam[0]
      } else {
        return null
      }
    },
    compiledPlayer(){
      const {userPlayer, userTeam, playerTemplate, userName, newUserName} = this;
      const color = userTeam && this.getColor(userTeam)
      const tempName = newUserName || userName;
      // return {walletAddress, id: walletAddress, displayName: newUserName, team: userTeam, color: color}
      if(!userPlayer) {return}
      const  tempPlayer = { ...playerTemplate, ...userPlayer, displayName: tempName, team: userTeam, color: color}
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
    getRandomFromArray(arr, n) {
      var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
      if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
    }
  },
};

</script>


