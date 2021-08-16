<template>
  <div class="heroImages">
    <div class="heroItem">
      <img
        class="heroImage shadow"
        src="https://lh3.googleusercontent.com/7rKQCauq7MRfG5Hnq3UrU9gfG_XRdADT5rTuyN5WTMqdcF2-vvINFJri4OjwNxt05jWF_Zs_LChSihNM4kY2sXJ7"
      />
    </div>
    
  </div>
</template>

<style lang="scss">
.heroImages {
  margin-top: 100px;
  width: 100%;
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(min(8rem, 100%), 47%));
  // grid-template-rows: repeat(auto-fit, minmax(min(5rem, 10rem), 0.75fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  
}
.heroItem {
  align-items: center;
  justify-content: center;
  display: flex;
}
.heroImage {
  width: 200px;
  height: auto;
  position: relative;
  display: inline-block;
  /* border: 1px solid var(--ui-color, #111); */
}
/* .heroImages .heroItem:nth-child(1) .heroImage {
  left: 0rem;
}
.heroImages .heroItem:nth-child(2) .heroImage {
  left: -2rem;
  top: 2rem;
}
.heroImages .heroItem:nth-child(3) {
  align-items: flex-start;
  justify-content: flex-start;
}
.heroImages .heroItem:nth-child(3) .heroImage {
  left: -2rem;
  top: -2rem;
}
.heroImages .heroItem:nth-child(4) .heroImage {
  left: -4rem;
  top: -0rem;
}
.heroImages .heroItem:nth-child(4) {
  align-items: flex-start;
  justify-content: flex-start;
} */
</style>
