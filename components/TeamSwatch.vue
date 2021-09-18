<template>
  <div class="team-color d-flex justify-center as-icon" v-if="teamObj" v-tooltip="`Playing for team ${team}`" >
    <div plain outlined class="team-tile" >
      <!-- @click="onSelect && !disabled && onSelect(t)" -->
      <div class="team-swatch" :style="`background: ${teamObj.color}`" />
      <div class="team-label">
        {{teamObj.team}}
      </div>
      
    </div>
  </div>
</template>

<style lang="scss">
.team-color{

  &.as-icon{

    .team-swatch{
      border-radius: 1rem;
      width: 2rem;
      height: 2rem;
    }
   .team-label{
     display: none;
   } 
  }
}
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['onSelect', 'onClose', 'team', 'disabled'],
  data() {
    return {
      theTeam: null,
      teamObj: null
    };
  },
  created(){
    const {team, gameTeams} = this;
      if(!team || !gameTeams){
        return null;
      }
      const theTeamObj = gameTeams.find(item => item.team === team);
      // this.theTeam = theTeam
      this.teamObj = theTeamObj
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      userTeam: "ui/userTeam",
      gameTeams: "ui/gameTeams",
      
    }),
    
    test(){
      return 'ggg'    
    }
    
  },

  methods: {
    ...mapMutations({
    }),
    
  },
};
</script>


