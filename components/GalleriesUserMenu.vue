<template>
  <div class="galleriesMenu userGalleriesMenu noAfter" :class="mode">
    <div v-for="(item, index) in (show ? filterItems(contractsArray, show) : contractsArray)" :key="`item${index}`" class="listItem">
        <nuxt-link
          :to="`/gallery/${item.id}`"
          :class="`contractLink ${
            userAddress && item.owner && item.owner.toLowerCase() === userAddress.toLowerCase() ? 'owner' : 'following'
          } ${
              galleryContractId === item.id
              ? 'active'
              : 'notActive'
              }
            `
          "
          >
          <div :class="`${mode ==='hero' ? 'symbol' : 'column col-25 symbol'}`">
            <IconGallery :size="mode ==='hero' ? 'large' : 'small'" :strokeClass="contrastMode" /><span>{{item.symbol}}</span>
          </div>
          <div :class="`${mode ==='hero' ? 'cardContent' : 'column col-100'}`">
            <div class="row small">
              <div class="column name">{{item.name}}</div>
            </div>
            <div class="row subtitle xsmall address"><Address :address="item.id" shrink fill /></div>
            <div class="ownerFlag" v-if="item && userAddress && isOwner(userAddress, item.owner)"><IconUser size="small" :strokeClass="contrastMode"/></div>
            <div class="followingFlag" v-if="item && userAddress && !isOwner(userAddress, item.owner)"><IconHeart size="small" :strokeClass="contrastMode" :active="true"/></div>
          </div>
          </nuxt-link>
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
    position: relative;
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
      font-variation-settings: 'wght' 600;
      white-space: nowrap;
    }
    .address{
      
    }
    .ownerFlag, .followingFlag{
      position: absolute;
      top: .5rem;
      right: .5rem;
      border-radius: 1rem;

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
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 4rem;
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
  props: ["galleryContractId", "userAddress", "contracts", "contractsArray", "mode", 'contrastMode', 'activeContractId', "show"],
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
  filterItems(itemsArray, show){
    const userAddress = this.userAddress;
    if(show === 'owner'){
      const ownerArray = itemsArray.filter(item => 
        this.isOwner(userAddress, item.owner)
      )
      return ownerArray;
    }
    if(show === 'following'){
      const followingArray = itemsArray.filter(item => 
        !this.isOwner(userAddress, item.owner)
      )
      return followingArray;
    }
  },
  isOwner(userAddress, ownerAddress) {
    const isOwner = userAddress && ownerAddress && userAddress.toLowerCase() === ownerAddress.toLowerCase();
    return isOwner
  },
  
  }
};
</script>

<!--    <Address :address="item.id" shrink fill /> 

<IconChevron size="small"  strokeClass="contrastMode" />

-->