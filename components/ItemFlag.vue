<template>
  <div class="item-flag" :style="`background: ${item.color}`" :class="size">
    <v-icon :size="size || 'medium'">mdi-flag</v-icon>
  </div>
</template>

<style lang="scss">
  .item-flag{
    width: 2rem; 
    height: 2rem;
    background: lime; 
    color: black;
    border-radius: 2rem;
    display: inline-flex;
    margin-left: 2px;
    overflow: hidden;
    box-shadow: 0 1px 4px -1px rgba(0,0,0,.3);
    display: grid;
    place-items: center;
    &.small{
      width: 1rem;
      height: 1rem;
    }
  }
  


</style>

<script>
import { mapMutations, mapGetters } from "vuex";
import HashAddress from './HashAddress.vue';

export default {
  components: { HashAddress },
  name: "PlayerInfo",
  props: ['item', 'size'],
  data() {
    return {
      // devMode: false,
    };
  },
  computed: {
    
  },

  methods: {
    ...mapMutations({
    }),
    
  },
};
</script>


