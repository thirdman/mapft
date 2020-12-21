<template>
  <div class="galleriesMenu" :class="mode" :environment="environment">
    <!-- <div class="listItem featured">
      <nuxt-link
        to="/alpha"
        class="featuredLink"
        :class="
          galleryContractId === 'alpha'
            ? 'active'
            : 'notActive'
        "
        ><div class="galleryImgWrap"><img src="~/static/images/alpha.jpg" width="200px" /></div> Alpha Series</nuxt-link
      >
    </div> -->
    <div class="listItem" v-if="environment === 'main'">
      <nuxt-link
        to="/gallery/0xd0c402bcbcb5e70157635c41b2810b42fe592bb0"
        class="featuredLink"
        :class="
          galleryContractId === '0xd0c402bcbcb5e70157635c41b2810b42fe592bb0'
            ? 'active'
            : 'notActive'
        "
        ><div class="galleryImgWrap"><IconGallery :size="mode ==='hero' ? 'large' : 'medium'" :strokeClass="contrastMode" /></div>Alpha Artist Gallery</nuxt-link
      >
    </div>
    <div class="listItem" v-if="environment === 'main'">
      <nuxt-link
        to="/gallery/0xcd8a0e29514910532db4b500ad109927262f54d8"
        class="featuredLink"
        :class="
          galleryContractId === '0xcd8a0e29514910532db4b500ad109927262f54d8'
            ? 'active'
            : 'notActive'
        "
        ><div class="galleryImgWrap"><IconGallery :size="mode ==='hero' ? 'large' : 'medium'" :strokeClass="contrastMode" /></div>Example Posters</nuxt-link
      >
    </div>
    <div class="listItem" v-if="environment === 'main'">
      <nuxt-link
        to="/gallery/0xb52c98c13be439d667f723c825fb41e0dc47aaba"
        class="featuredLink"
        ><div class="galleryImgWrap"><IconGallery :size="mode ==='hero' ? 'large' : 'medium'" :strokeClass="contrastMode" /></div>NFT Poems</nuxt-link
      >
    </div>
    <div class="listItem" v-if="environment === 'main'">
      <nuxt-link
        to="/gallery/0xae056092fa7068dfcd60bb9016d0e2d2448a635e"
        class="featuredLink"
        ><div class="galleryImgWrap"><IconGallery :size="mode ==='hero' ? 'large' : 'medium'" :strokeClass="contrastMode" /></div>Trislits' Fine Art Collection</nuxt-link
      >
    </div>
    <div class="listItem" v-if="environment === 'main'">
      <nuxt-link
        to="/gallery/0xcbe642d1b28caeff5f8377560db29e43ba7ac200"
        class="featuredLink"
        ><div class="galleryImgWrap"><IconGallery :size="mode ==='hero' ? 'large' : 'medium'" :strokeClass="contrastMode" /></div>ManWithNoName</nuxt-link
      >
    </div>



    <!-- RINKEBY -->
    <div class="listItem" v-if="environment === 'rinkeby'">
      <nuxt-link
        to="/gallery/0xa0AfEDcC9446fD1F41706EaA4931512bDb2efAe7"
        class="featuredLink"
        :class="
          galleryContractId === '0xa0AfEDcC9446fD1F41706EaA4931512bDb2efAe7'
            ? 'active'
            : 'notActive'
        "
        ><div class="galleryImgWrap"><IconGallery :size="mode ==='hero' ? 'large' : 'medium'" :strokeClass="contrastMode" /></div>Natealex Test</nuxt-link
      >
    </div>
    <div class="listItem" v-if="environment === 'rinkeby'">
      <nuxt-link
        to="/gallery/0x5056A51f6f48D9D9808300C242142acD2C855377"
        class="featuredLink"
        :class="
          galleryContractId === '0x5056A51f6f48D9D9808300C242142acD2C855377'
            ? 'active'
            : 'notActive'
        "
        >
        <div class="galleryImgWrap"><IconGallery :size="mode ==='hero' ? 'large' : 'medium'" :strokeClass="contrastMode"/></div>
        File type tests
        </nuxt-link
      >
    </div>
    <div class="listItem" v-if="environment === 'rinkeby'">
      <nuxt-link
        to="/gallery/0xfbaf740d8823af28562faaef6f6a95cd9d244110"
        class="featuredLink"
        :class="
          galleryContractId === '0xfbaf740d8823af28562faaef6f6a95cd9d244110'
            ? 'active'
            : 'notActive'
        "
        >
        <div class="galleryImgWrap"><IconGallery :size="mode ==='hero' ? 'large' : 'medium'" :strokeClass="contrastMode"/></div>
          Editions Test
        </nuxt-link
      >
    </div>
  </div>
</template>

<!-- <div>
      <nuxt-link
        to="/gallery/0xc8aee98fa2c02d83b52d3897455e47cf97271e76"
        class="featuredLink"
        :class="
          galleryContractId === '0xc8aee98fa2c02d83b52d3897455e47cf97271e76'
            ? 'active'
            : 'notActive'
        "
        >
        <div class="galleryImgWrap"><IconGallery size="medium" /></div>
        Gareth Test 3
        </nuxt-link
      >
    </div> -->

<style lang="scss">
.galleriesMenu {
  margin-bottom: 1rem;
  border: 1px solid var(--line-color, #eee);
  &.hero{
    border: 0px solid white;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 50%), 1fr));
    // grid-template-rows: repeat(auto-fit, minmax(4rem, 10rem));
    grid-column-gap: 0;
    grid-row-gap: 1rem;
    width: 100%;
    .listItem {
      display: flex;
      min-height: 5rem;
      align-items: center;
      justify-content: center;
      a, a.featuredLink{
        border: 1px solid var(--line-color);
        border-radius: .25rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: calc(100% - 1rem);
        height: 100%;
        min-height: 7rem;
       .galleryImgWrap{
         min-height: 4rem;
         img{
           max-height: 3.5rem;
         }
       }
      }
    }
  }
}
.galleriesMenu {
  a{
    display: block;
    text-decoration: none;
    border-bottom: 1px solid var(--line-color, #eee);
    padding: .25rem .5rem .25rem .25rem;
    &.featuredLink{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      &:hover{
        background: var(--line-color, #eee);
      }
    }
    
  }
  &.noAfter{
    a{
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      // svg{visibility: hidden;}
      // &:hover{
      //   svg{visibility: visible;}
      //   background: var(--line-color);
      // }
      // &.nuxt-link-active{
      //   svg{
      //     visibility: visible;
      //   }
      // }
    }
  }
}
.galleryImgWrap{
  width: 5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: .25rem;
  
  img {
    object-fit: contain;
    widht: 100%;
    height: 100%;
    max-height: 2rem;
  }
}
.galleriesMenu a.nuxt-link-active {
  width: 100%;
  display: block;
  /* padding: 2px; */
  background: var(--ui-color, #eee);
  color: var(--background-color, #eee);
  border-bottom: 1px solid var(--ui-color, #111);
  /* border-radius: 3px; */
  text-decoration: none;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  
}

// .galleriesMenu:not(.noAfter) .nuxt-link-active:after {
//   content: ">";
//   position: absolute;
//   right: 0;
//   top: 0;
//   height: 1rem;
//   width: 1rem;
// }
.galleriesMenu a svg.chevron{
  transform: rotate(90deg);
  stroke: currentColor;
}


</style>
<script>
export default {
  props: ["galleryContractId", "mode", "contrastMode"],
  mounted(){
    if(this.$config){
      const env = this.$config.requiredNetwork || "local";
      this.environment = env;
    }
  },
  data(){
    return {
      environment: ""
    }
  }
};
</script>
