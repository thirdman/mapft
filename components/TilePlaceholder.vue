<template>
  <div
    class="grid-tile tile-placeholder"
    :class="`generate`"
    @click="handleSelect && handleSelect(index)"
     :style="size ? `width: ${size}px; height: ${size}px` :`width: 100%; height: auto`"
    >
    
    <!-- <img
      :src="tile.src" 
      v-if="tile.src"
      :style="size && `width: ${size}px; height: ${size}px; border: none;`"
     /> -->
    
    
    <div class="blankinfo">
      <v-icon large>mdi-help-box</v-icon>
      <v-btn outlined small @click="() => {onAction && onAction(target, true)}" primary>
        Place Tile
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
.tile-placeholder{
  &:hover{
    box-shadow: none !important;
  }
}
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['target', 'tile', 'handleSelect', 'selected', 'index', 'size',  'onAction', 'hideAsset', 'fill', 'highlighted', 'unit'],
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


