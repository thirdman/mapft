<template>
  <div class="galleriesMenu" v-if="usedContracts && usedContracts.length > 0">
    <div v-for="(item, index) in usedContracts" :key="index" >
      <div class="xsmall clamp wide">
        <nuxt-link
          :to="`/gallery/${item}`"
          :class="
            galleryContractId === item
              ? 'active'
              : 'notActive'
          "
          >{{item}}</nuxt-link
        >
      </div>
    </div>
   
   
  </div>
</template>

<style>


</style>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: ["galleryContractId", "userAddress"],
  computed: {
    // ...mapGetters({
    //   usedContracts: "ui/usedContracts",
    // }),
    usedContracts() {
      console.log('this.$store.state.ui.usedContracts', this.$store.state.ui.usedContracts)
      return this.$store.state.ui.usedContracts;
    },
  } 
};
</script>
