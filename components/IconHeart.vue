<template>
  <svg
    :class="`${strokeClass} ${size} ${active ? 'isActive' : ''}`"
    xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-heart" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
</svg>
</template>

<style>
.icon.icon-heart {
  stroke: var(--background-color, #eee);
}
.icon.icon-heart.light {
  stroke: var(--background-color, #eee);
}
.icon.icon-heart.dark {
  stroke: var(--ui-color, #111);
}
.icon.icon-heart.brand {
  stroke: var(--fill-color, #ccc);
}


.icon.icon-heart.isActive {
  fill: var(--background-color, #eee);
}
.icon.icon-heart.light.isActive {
  fill: var(--background-color, #eee);
}
.icon.icon-heart.dark.isActive {
  fill: var(--ui-color, #111);
}
.icon.icon-heart.brand.isActive {
  fill: var(--fill-color, #ccc);
}
</style>
<script>
//https://tablericons.com/
export default {
  props: ['strokeClass', 'size', 'active'],
}
</script>
