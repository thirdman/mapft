<template>
  <svg
    :class="`icon-caret  ${strokeClass} fill${fillClass} ${size}`"
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-caret-down"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#9E9E9E"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 15l-6-6l-6 6h12" transform="rotate(180 12 12)" />
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
.icon-caret.filldark{
  fill: var(--ui-color, #111);
}
.icon-caret.filllight{
  fill: var(--background-color, #111);
}
</style>
<script>
//https://tablericons.com/
export default {
  props: ['strokeClass', 'fillClass', 'size'],
}
</script>
