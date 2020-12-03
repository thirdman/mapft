<template>
  <div class="galleriesMenu userGalleriesMenu noAfter" :class="mode">
    <div v-for="(item, index) in contractsArray" :key="`item${index}`" class="listItem">
      
        <nuxt-link
          :to="`/gallery/${item.id}`"
          :class="`contractLink ${
              galleryContractId === item.id
              ? 'active'
              : 'notActive'
              }
            `
          "
          >
          <div :class="`${mode ==='hero' ? 'symbol' : 'column col-25 symbol'}`">
            <span>{{item.symbol}}</span>
          </div>
          <div :class="`${mode ==='hero' ? 'cardContent' : 'column col-100'}`">
            <div class="row xsmall">
              <div class="column name">{{item.name}}</div>
            </div>
            <div class="row subtitle xsmall address">{{item.id}}</div>
          </div>
          </nuxt-link
        >
      
    </div>
    <div v-for="(item, index) in contracts" :key="index" class="listItem">
        <nuxt-link
          :to="`/gallery/${item}`"
          :class="`contractLink ${
            galleryContractId === item
              ? 'active'
              : 'notActive'}`
          "
          >
            <div :class="`${mode ==='hero' ? 'symbol' : 'column col-25 symbol'} `">
              <span><IconGallery :size="mode ==='hero' ? 'large' : 'small'" :strokeClass="contrastMode" /></span>
            </div>
            <div :class="`${mode === 'hero' ? 'address' : 'column col-25'}`">
              <div class="row xsmall">
                <Address :address="item" shrink fill />
              </div>
            </div>
          </nuxt-link
        >
      
    </div> 
  </div>
</template>

<style lang="scss">
.galleriesMenu{
  .contractLink{
    
    .symbol{
      text-transform: uppercase;
      font-variation-settings: 'wght' 600;
      flex-basis: 10%;
    }
    .cardContent{
      padding-left: .5rem;;
      flex-basis: 90%;
    }
    .name{
      
      white-space: nowrap;
    }
    .address{
      
    }
  }
  
  &.hero{
    .listItem a.contractLink{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    
      .symbol{
        flex-basis: auto;
      }
      .cardContent{
        flex-basis: auto;
        padding-left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      }
      &:hover{
        border: 1px solid var(--text-color);
      }
    }
  }
}
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

<!--    <Address :address="item.id" shrink fill /> 

<IconChevron size="small"  strokeClass="contrastMode" />

-->