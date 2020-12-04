<template>
  <svg
    :class="`${strokeClass} ${size}`"
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-arrows-minimize"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#9E9E9E"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <polyline points="5 9 9 9 9 5" />
    <line x1="3" y1="3" x2="9" y2="9" />
    <polyline points="5 15 9 15 9 19" />
    <line x1="3" y1="21" x2="9" y2="15" />
    <polyline points="19 9 15 9 15 5" />
    <line x1="15" y1="9" x2="21" y2="3" />
    <polyline points="19 15 15 15 15 19" />
    <line x1="15" y1="15" x2="21" y2="21" />
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
