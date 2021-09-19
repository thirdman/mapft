<template>
  <div
    class="asset"
    :class="`${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${card ? 'card' : ''}`"
    @click="onSelect && !disabled && onSelect(index)"
    >
      <img class="asset-image" :src="`https://card.godsunchained.com/?id=${asset.id.Int64 || asset.id}&q=${4}&w=128&png=true`" width="128px" />
      <div v-if="showmeta" class="card-meta-text">
        <!-- {{asset.name}}
        <br /> -->
        <div class="feature" :style="`background: #333`">
          <v-icon color="white" medium>mdi-sword</v-icon>
        </div>
        <div class="feature feature-outline" >
          {{asset.attack.Int64}}
        </div>
        <!-- {{asset.health.Int64}} -->
      </div>
      <div class="card-select-row d-grid justify-center" v-if="onSelect" >
      <v-btn :disabled="disabled" x-small outlined @click="onSelect(asset)" class="card-select-button">Select</v-btn>
      </div>
    </div>
</template>

<style lang="scss">
.card-select-row{
  display: flex;
  align-items: center;
  justify-content: center;
  // .card-select-button{
  //   font-size: .875rem;
  // }

}
  .asset-image{
    width: 100%;
  }
  .card-meta-text{
    font-size: .875rem;
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['asset', 'onSelect', 'selected', 'disabled', 'showmeta', 'card', 'index'],
  data() {
    return {
      
    };
  },
  created(){
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      userTEam: "ui/userTeam",
      
    }),
    
  },

  methods: {
    ...mapMutations({
    }),
    
  },
};
</script>


