<template>
  <div
    class="asset"
    :class="`${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${card ? 'card' : ''}`"
    @click="onSelect && !disabled && onSelect(index)"
    >
      <img :src="`https://card.godsunchained.com/?id=${asset.id.Int64 || asset.id}&q=${4}&w=128&png=true`" width="128px" />
      <div v-if="showmeta">
        {{asset.name}}
        <br />
        {{asset.attack.Int64}} / {{asset.health.Int64}}
      </div>
      <div class="card-select-row d-grid justify-center" v-if="onSelect" >
      <v-btn :disabled="disabled" x-small outlined @click="onSelect(asset)">Select</v-btn>
      </div>
    </div>
</template>

<style lang="scss">
.card-select-row{
  display: flex;
  align-items: center;
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
      
    }),
    
  },

  methods: {
    ...mapMutations({
    }),
    
  },
};
</script>


