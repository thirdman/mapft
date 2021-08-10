<template>
  <svg
    :class="`${strokeClass} ${size}`"
   xmlns="http://www.w3.org/2000/svg" class="icon icon-link icon-tabler-link" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
  <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
</svg>
</template>

<style>
.icon {
  stroke: var(--background-color, #eee);
}
.icon.light {
  stroke: var(--background-color, #eee);
}
.icon.dark {
  stroke: var(--ui-color, #111);
}
.icon.brand {
  stroke: var(--fill-color, #ccc);
}
</style>
<script>
//https://tablericons.com/
export default {
  props: ['strokeClass', 'size'],
}

</script>

