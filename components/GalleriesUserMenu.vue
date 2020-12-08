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
          <div class="cardImage" :class="`${mode ==='hero' ? 'symbol' : 'column col-25 symbol'}`">
            <IconGallery :size="mode ==='hero' ? 'large' : 'small'" :strokeClass="contrastMode" />
            <span class="symbolText">{{item.symbol}}</span>
          </div>
          <div :class="`${mode ==='hero' ? 'cardContent' : 'column col-100'}`">
            <div class="nameRow row small">
              <div class="name">{{item.name}} <Address :address="item.id" shrink fill v-if="!item.name"/> </div>
            </div>
            <div class="metaRow row">
              <div class="column col-10">
                <div class="row subtitle xsmall count">
                    <IconGallery size="small" :strokeClass="contrastMode"/><span>{{item.count}}</span>
                </div>
              </div>
              <div class="dividerColumn" /> 
              <div class="column col-50">
                <div class="row subtitle xsmall address">
                  <div class="column col-100">
                    <!-- <IconLink size="small" :strokeClass="contrastMode" /> -->
                    <Address :address="item.id" shrink fill />
                  </div>
                </div>
              </div>
            </div>
            <div class="ownerFlag" v-if="item && userAddress && isOwner(userAddress, item.owner)">
              <IconUser size="small" :strokeClass="contrastMode"/>
            </div>
            <div class="followingFlag" v-if="item && userAddress && !isOwner(userAddress, item.owner)">
              <IconHeart size="small" :strokeClass="contrastMode" :active="true" />
            </div>
          </div>
          </nuxt-link>
    </div>
    <div v-if="show && !filterItems(contractsArray, show).length">
      <p class="help">-</p>
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
    .cardImage{
      
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
      opacity: .75; 
      .column{
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
      }
    }
    .count{
      opacity: .5;
    }
    .ownerFlag, .followingFlag{
      position: absolute;
      top: .5rem;
      right: .5rem;
      border-radius: 1rem;
    }
    .countFlag{
      position: absolute;
      top: .5rem;
      left: .5rem;
      border-radius: 1rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-variation-settings: 'wght' 600;
      font-size: .75rem;
      svg{
        opacity: .5;
      }
    }
    .nameRow{
      flex-grow: 1;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      min-height: 1.5rem;
    }
    .metaRow{
      margin-top: .5rem;
      border-top: 1px solid var(--fill-color);
      width: 100%;
      align-items: center;
      justify-content: space-around;
      flex-grow: 0;
      flex-shrink: 0;
      min-height: 1.5rem;
      > .column{
        padding: .125rem .5rem;
      }
      .dividerColumn{
        width: 1px;
        flex-grow: 0;
        flex-shrink: 0;
        height: 100%;
        border-left: 1px solid var(--fill-color);
      }
    }
  }
  
  &.hero{
    .listItem a.contractLink{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .cardImage{
        display: flex;
        min-height: 4rem;
        flex-grow: 1;
        padding-top: 1rem;
      }
      .symbol{
        flex-basis: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cardContent{
        flex-basis: auto;
        padding-left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        min-height: 3rem;
        width: 100%;
        
      }
      &:hover{
        border: 1px solid var(--ui-color);
        box-shadow: 0 0 0 2px var(--fill-color), 0px 2px 1rem 0 rgba(0,0,0,.3);
        background: var(--fill-color);
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