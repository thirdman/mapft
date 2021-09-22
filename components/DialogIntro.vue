<template>
  <v-dialog
      v-model="introRead"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 ">
          Interface for an Unknown Game
        </v-card-title>
        <v-card-text>
          <p>Oh, hi there!</p>
          <p>What are NFT for?</p>
          <p>This interface shows a game that might be created combining nft that are map tiles with those from elsewhere (gods unchained) as xxxxx to make secondary value. </p>
          <nuxt-link to="/about" class="btn hero asButton">More Info »</nuxt-link>
          <dialog-team-select   />
          
        </v-card-text>
        <v-divider class="ma-0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <team-swatch :team="userTeam" v-if="userTeam" :text="userTeam" />
          <v-btn class="primary" v-if="!userTeam" @click="setShowTeamSelect">select your team!</v-btn>
          <v-btn
            :color="userTeam && 'primary'"
            texty
            :disabled="!userTeam"
            @click="() => setIntroRead(false)"
          >
            Lets Goooo!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- 
  <v-card
    outlined
    class="team-select"
    :class="direction === 'column' ? 'vertical' : 'horizontal' "
    >
    <v-card-text >
      {{direction}}
      <div class="row">
        <div class="col">
          <label>
          Select your team:
          </label>
        </div>
      </div>
      <div class="buttons-row d-flex justify-center"  v-if="teams">
        <v-btn
          elevation="2"
          :outlined="team === t.team"
          class="plain team-tile" v-for="(t, index) in teams" :key="index" :class="team === t.team ? 'selected' : ''" 
          @click="onSelect && !disabled && onSelect(t)"
        >
          <div class="team-swatch" :style="`background: ${t.color}`" />
          <div class="team-label">
            {{t.team}}
          </div>
        </v-btn>
      </div>
    </v-card-text>
  </v-card> -->
</template>

<style lang="scss">
.intro-content{
  position: absolute;
}

</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['onSelect', 'onClose'],
  data() {
    return {
      // showIntro: true
    };
  },
  created(){
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      introRead: "ui/introRead",
      userTeam: "ui/userTeam",
    }),
    
  },

  methods: {
    ...mapMutations({
      setIntroRead: "ui/setIntroRead",
      setShowTeamSelect: "ui/setShowTeamSelect",
    }),
    
  },
};
</script>


