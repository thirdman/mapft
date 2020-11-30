<template>
  <div class="galleriesMenu">
    <div class="featured">
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
    </div>
    <div>
      <nuxt-link
        to="/gallery/0xa0AfEDcC9446fD1F41706EaA4931512bDb2efAe7"
        class="featuredLink"
        :class="
          galleryContractId === '0xa0AfEDcC9446fD1F41706EaA4931512bDb2efAe7'
            ? 'active'
            : 'notActive'
        "
        ><div class="galleryImgWrap"><IconGallery size="medium" /></div>Natealex Test</nuxt-link
      >
    </div>
    <div>
      <nuxt-link
        to="/gallery/0x5056A51f6f48D9D9808300C242142acD2C855377"
        class="featuredLink"
        :class="
          galleryContractId === '0x5056A51f6f48D9D9808300C242142acD2C855377'
            ? 'active'
            : 'notActive'
        "
        >
        <div class="galleryImgWrap"><IconGallery size="medium" /></div>
        File type tests
        </nuxt-link
      >
    </div>
    <div>
      <nuxt-link
        to="/gallery/0xfbaf740d8823af28562faaef6f6a95cd9d244110"
        class="featuredLink"
        :class="
          galleryContractId === '0xfbaf740d8823af28562faaef6f6a95cd9d244110'
            ? 'active'
            : 'notActive'
        "
        >
        <div class="galleryImgWrap"><IconGallery size="medium" /></div>
        Gareth Test 2
        </nuxt-link
      >
    </div>
    <div>
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
    </div>

    <div>
      <nuxt-link
        to="/gallery/0xC85BDEd5D6AbF3051B096CCCd30F1C73a31bE274"
        class="featuredLink"
        :class="
          galleryContractId === '0xC85BDEd5D6AbF3051B096CCCd30F1C73a31bE274'
            ? 'active'
            : 'notActive'
        "
        >
        <div class="galleryImgWrap"><IconGallery size="medium" /></div>
          Gareth Test 4
        </nuxt-link
      >
    </div>
  </div>
</template>

<style lang="scss">
.galleriesMenu {
  margin-bottom: 1rem;
  border: 1px solid var(--line-color, #eee);
}
.galleriesMenu a{
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
  }
}
.galleriesMenu .nuxt-link-active {
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
.galleriesMenu .nuxt-link-active:after {
  content: ">";
  position: absolute;
  right: 0;
  top: 0;
  height: 1rem;
  width: 1rem;
}


</style>
<script>
export default {
  props: ["galleryContractId"],
};
</script>
