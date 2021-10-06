<template>
  <v-dialog
    v-model="show"
    width="500"
    scrollable
    >
    <v-card outlined elevation="4" :class="`dialog join`">
        <v-card-title class="row d-flex align-center">
          <div class="col">
            {{type || item && item.type || 'Item'}}
          </div>
          <div class="col col-1">
              <v-btn icon @click="onClose" v-if="onClose">
                <v-icon size="large">mdi-close</v-icon>
              </v-btn>
            </div>
        </v-card-title>
        <v-card-text>
          <game-object :object="item" :type="type" v-if="item" />
        </v-card-text>
        <!-- <v-card-text>
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
        -->
        <v-card-actions>
            <v-btn v-if="onAction && item" @click="onAction(item)">Join!</v-btn>
            <v-btn v-if="onClose" depressed outlined text @click="onClose">Cancel</v-btn>
          
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
  props: ['onSelect', 'onClose', 'show', 'onAction','onClose', 'userPlayer', 'item', 'type'],
  data() {
    return {
      // showTeamSelect: true
      
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
    
    
  },

  methods: {
    ...mapMutations({
      setShowTeamSelect: "ui/setShowTeamSelect",
    }),
    
  },
};
</script>


