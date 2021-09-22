<template>
  <div class="team-color d-flex justify-center" :class="text ? 'as-label' : 'as-icon'" v-if="teamObj" v-tooltip="`Playing for team ${team}`" >
    <div plain outlined class="team-tile" >
      <!-- @click="onSelect && !disabled && onSelect(t)" -->
      <div class="team-swatch" :style="`background: ${teamObj.color}`" />
    </div>
    <div class="team-label" v-if="text" >
      {{text}}
    </div>
  </div>
</template>

<style lang="scss">
.team-color{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: .5rem;
  .team-swatch{
      border-radius: 1rem;
      width: 2rem;
      height: 2rem;
      
    }
  &.as-icon{
    .team-tile{
      min-width: 2rem;
    }
   .team-label{
     display: none;
   } 
  }
  &.as-label{
    // border: 1px solid var(--line-color);
    // padding: .25rem;
    // border-radius: .5rem;;
    margin-right: 1rem;
    .team-swatch{
      border-radius: 1rem;
      width: 1.5rem;
      height: 1.5rem;
    }
    .team-tile{
      margin-right: .25rem;
      min-width: 1.5rem;
    }
    .team-label{
      font-size: .75rem;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
}
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['onSelect', 'onClose', 'team', 'disabled', 'text'],
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


