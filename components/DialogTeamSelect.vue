<template>
  <v-dialog
      v-model="showTeamSelect"
      width="500"
    >
    <v-card>
        <v-card-title class="text-h5 ">
          Select Team
        </v-card-title>
        <v-card-text>
      <team-select
        :team="userTeam"
        :teams="gameTeams"
        direction="row"
        :onSelect="handleTeamSelect"
        />
        
        </v-card-text>
        <v-divider class="ma-0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn depressed text @click="handleTeamSelect(null)">cancel</v-btn>
          <!-- <v-btn
            color="primary"
            text
            @click="() => setIntroRead(false)"
          >
            got it
          </v-btn> -->
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
  props: ['onSelect', 'onClose', 'show'],
  data() {
    return {
      // showTeamSelect: true
    };
  },
  created(){
    
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
      this.setShowTeamSelect(false);
      }
    },
  },
};
</script>


