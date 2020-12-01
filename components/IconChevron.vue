<template>
  <svg
    id="IconChevron"
    :class="`chevron ${strokeClass} ${size}`"
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-chevron-up"
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
    <polyline points="6 15 12 9 18 15" />
  </svg>
</template>

<style>
#IconChevron.icon {
  stroke: var(--background-color, #eee);
}
#IconChevron.icon.light {
  stroke: var(--background-color, #eee);
}
#IconChevron.icon.dark {
  stroke: var(--text-color, #111);
}
#IconChevron.icon.brand {
  stroke: var(--fill-color, #ccc);
}
#IconChevron.icon.ui {
  stroke: var(--ui-color, #111);
}
</style>
<script>
// https://tablericons.com/
export default {
  props: ['strokeClass', 'size'],
}
</script>
