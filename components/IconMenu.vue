<template>
  <svg
    :class="strokeClass"
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-menu-2"
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
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
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
  props: ['strokeClass'],
}
</script>
