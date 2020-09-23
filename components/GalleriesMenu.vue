<template>
  <div class="galleriesMenu">
    <div>
      <nuxt-link
        to="/gallery/0xa0AfEDcC9446fD1F41706EaA4931512bDb2efAe7"
        :class="
          galleryContractId === '0xa0AfEDcC9446fD1F41706EaA4931512bDb2efAe7'
            ? 'active'
            : 'notActive'
        "
        >Natealex Test</nuxt-link
      >
    </div>
    <div>
      <nuxt-link
        to="/gallery/0x9bc9014fe8f22cff11157959829907605ad382ec"
        :class="
          galleryContractId === '0x9bc9014fe8f22cff11157959829907605ad382ec'
            ? 'active'
            : 'notActive'
        "
        >Gareth Test</nuxt-link
      >
    </div>
    <div>
      <nuxt-link
        to="/gallery/0xfbaf740d8823af28562faaef6f6a95cd9d244110"
        :class="
          galleryContractId === '0xfbaf740d8823af28562faaef6f6a95cd9d244110'
            ? 'active'
            : 'notActive'
        "
        >Gareth Test 2</nuxt-link
      >
    </div>
    <div>
      <nuxt-link
        to="/gallery/0xc8aee98fa2c02d83b52d3897455e47cf97271e76"
        :class="
          galleryContractId === '0xc8aee98fa2c02d83b52d3897455e47cf97271e76'
            ? 'active'
            : 'notActive'
        "
        >Gareth Test 3</nuxt-link
      >
    </div>

    <div>
      <nuxt-link
        to="/gallery/0xC85BDEd5D6AbF3051B096CCCd30F1C73a31bE274"
        :class="
          galleryContractId === '0xC85BDEd5D6AbF3051B096CCCd30F1C73a31bE274'
            ? 'active'
            : 'notActive'
        "
        >Gareth Test 4</nuxt-link
      >
    </div>
  </div>
</template>

<style>
.galleriesMenu {
  margin-bottom: 1rem;
}

.galleriesMenu .nuxt-link-active {
  width: 100%;
  display: block;
  padding: 2px;
  background: var(--ui-color, #eee);
  color: var(--background-color, #eee);
  border-radius: 3px;
  text-decoration: none;
  position: relative;
}
.galleriesMenu .nuxt-link-active:after {
  content: '>';
  position: absolute;
  right: 0;
  top: 0;
  height: 1rem;
  width: 1rem;
}
</style>
<script>
export default {
  props: ['galleryContractId'],
}
</script>
