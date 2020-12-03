<template>
  <div class="galleriesMenu userGalleriesMenu noAfter" :class="mode">
    
    <div v-for="(item, index) in contractsArray" :key="`item${index}`" class="listItem">
    <div>
        <nuxt-link
          :to="`/gallery/${item.id}`"
          :class="`row ${
              galleryContractId === item.id
              ? 'active'
              : 'notActive'
              }
            `
          "
          >
          <div class="column col-100">
            <div class="row xsmall">
              <div class="column col-33">{{item.symbol}}</div>
              <div class="column">{{item.name}}</div>
              <div class="column"><IconChevron size="small" strokeClass="contrastMode" /></div>            
            </div>
            <div class="row subtitle xsmall"><Address :address="item.id" shrink fill /></div>
          </div>
          </nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.galleriesMenu.userGalleriesMenu{
  border: none;
  .listItem:last-child{
    border-bottom: noe;
  }
}

</style>
<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  props: ["galleryContractId", "userAddress", "contracts", "contractsArray", "mode", 'contrastMode'],
  computed: {
    // ...mapGetters({
    //   usedContracts: "ui/usedContracts",
    // }),
    // usedContracts() {
    //   console.log('typeof ', typeof this.$store.state.ui.usedContracts);
    //   return this.$store.state.ui.usedContracts;
    // },
  },
  methods: {
    // ...mapActions({
    //   shrinkAddress: "ui/shrinkAddress"
    // }),
    // displayAddress(address){
    //   const displayAddress = this.shrinkAddress(address);
    //   return displayAddress.toString() || '...'
    // }
    
  }
};
</script>

<!-- <div v-for="(item, index) in contracts" :key="index" class="listItem">
      <div class="xsmall clamp wide">
        <nuxt-link
          :to="`/gallery/${item}`"
          :class="
            galleryContractId === item
              ? 'active'
              : 'notActive'
          "
          >
            <Address :address="item" shrink fill />
            <IconChevron size="small"  strokeClass="contrastMode" />
          </nuxt-link
        >
      </div>
    </div> -->