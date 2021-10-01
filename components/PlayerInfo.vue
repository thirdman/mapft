<template>
  <div outlined class="player-info"  v-if="player || address" >
    <div class="player-icon-container" :style="`background-color: ${this.getColor(team)}`">
      <v-icon small>mdi-shield-account</v-icon>
    </div>
    <hash-address :address="address" />
  </div>
</template>

<style lang="scss">
  .player-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .player-icon-container{
    border-radius: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: .25rem;
    display: grid;
    place-items: center;
    background: #ccc;
  }
</style>

<script>
import { mapMutations, mapGetters } from "vuex";
import HashAddress from './HashAddress.vue';

export default {
  components: { HashAddress },
  name: "PlayerInfo",
  props: ['onSelect', 'onClose', 'player', 'address', 'team', 'color'],
  data() {
    return {
      showPanel: false,
      devMode: false,
    };
  },
  computed: {
    ...mapGetters({
      gameTeams: "ui/gameTeams",
    }),
  },

  methods: {
    ...mapMutations({
    }),
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


