<template>
  <div
      class="game-object"
      :class="`${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} `"
      @click="onSelect && !disabled && onSelect(index)"
      v-tooltip="disabled && `Unavailable`"
      :style="`width: ${size || displaySize}; height:${size || displaySize}; `"
    >
    {{type}}
    <v-icon>mdi-treasure-chest</v-icon>
    <div class="object-image"></div>
      <!-- <img class="asset-image" :src="`https://card.godsunchained.com/?id=${asset.id.Int64 || asset.id}&q=${4}&w=256&png=true`" width="256px" /> -->      
  </div>
</template>

<style lang="scss">
.game-object{
  width: 100%;
  height: 100%;
  min-height: 80px;
    display: grid;
    align-content: center;
    justify-content: center;
    place-content: center;
    background: url(https://gateway.pinata.cloud/ipfs/QmcLhKPBvUcGT6EfYZ2HeoPcS5MibUsKtUetJWxBtePxFa/1.png) center center no-repeat;
    background-size: auto;
    background-size: 200%;
    z-index: 1;

}

</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['object', 'onSelect', 'selected', 'disabled', 'showmeta', 'item', 'type', 'size'],
  data() {
    return {
      dsiplaySize: 100
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


