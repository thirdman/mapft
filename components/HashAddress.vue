<template>
  <div class="hash-address" v-if="address" >
    {{readableAddress}}
  </div>
</template>

<style lang="scss">
  .hash-address{
    // color: pink
  }
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "HashAddress",
  props: ['address'],
  data() {
    return {
      devMode: false,
    };
  },
  computed: {
    ...mapGetters({
    }),
    readableAddress(){
      const {address} = this;
      if(address && address.length > 7){
        const start = address.substring(0, 4);
        const end = address.substring(address.length - 2, address.length);
        const compiled = `${start}...${end}`
        return compiled
      } else {
        return address
      }
    }
  },

  methods: {
    ...mapMutations({
    }),
  },
};
</script>


