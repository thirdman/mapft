<template>
  <svg
    :class="`${strokeClass} ${size}`"
    class="icon icon-tabler icon-tabler-movie" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9E9E9E" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <rect x="4" y="4" width="16" height="16" rx="2" />
  <line x1="8" y1="4" x2="8" y2="20" />
  <line x1="16" y1="4" x2="16" y2="20" />
  <line x1="4" y1="8" x2="8" y2="8" />
  <line x1="4" y1="16" x2="8" y2="16" />
  <line x1="4" y1="12" x2="20" y2="12" />
  <line x1="16" y1="8" x2="20" y2="8" />
  <line x1="16" y1="16" x2="20" y2="16" />
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
