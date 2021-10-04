<template>
  <div
    class="team-select"
    :class="direction === 'column' ? 'vertical' : 'horizontal' "
    >
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
    
  </div>
</template>

<style lang="scss">
.team-select{
  
  &.vertical{
    .v-card__text{
      .buttons-row{
        flex-direction: column;
        .team-tile{
          margin-bottom: 4px;
        }
      }
    }
  }
}
.team-tile{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 4px;

  border-radius: .5rem;
  height: unset !important;
  padding: 0 !important;
  min-width: 3rem;
  .v-btn__content{
    flex-direction: column;
    width: 100%;
  }
  .team-swatch{
    width: 3.5rem;
    width: 100%; 
    height: 2rem; 
    border-radius: .5rem .5rem 0 0 ;
  }
  .team-label{
    font-size: .75rem;
    line-height: 1rem;
    color: #eee;
    font-weight: bold;
    padding-top: .25rem;
    padding-bottom: .25rem;
    border-top: none;
    border-radius: 0 0 .5rem .5rem;
    width: 100%;
      border: 1px solid var(--line-color, #eee);
  }
}
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['onSelect', 'onClose', 'team', 'teams', 'disabled', 'direction'],
  data() {
    return {
      
    };
  },
  created(){
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      
    }),
    
  },

  methods: {
    ...mapMutations({
    }),
        
  },
};
</script>


