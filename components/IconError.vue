<template>
  <svg
    :class="`${strokeClass} ${className}`"
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-alert-triangle"
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
    <path d="M12 9v2m0 4v.01" />
    <path
      d="M5.07 19H19a2 2 0 0 0 1.75 -2.75L13.75 4a2 2 0 0 0 -3.5 0L3.25 16.25a2 2 0 0 0 1.75 2.75"
    />
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
.icon.large {
  width: 48px;
  height: 48px;
}
</style>
<script>
//https://tablericons.com/
export default {
  props: ["strokeClass", "className"],
};
</script>
