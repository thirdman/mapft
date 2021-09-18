<template>
  <div
    class="asset-list"
    v-if="array"
    >
    
      <div v-for="(id, index) in array" :key="index" class="asset-item small">
        <img
        :src="`https://card.godsunchained.com/?id=${id}&q=${4}&w=128&png=true`"
        />
      </div>
   
  </div>
</template>

<style lang="scss">
.asset-list{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  .asset-item {
    width: 64px;
    img{
      width: 100%;
      height: auto;
    }
  }
}
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['array', 'onSelect', 'onClose', 'selected', 'showmeta'],
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


