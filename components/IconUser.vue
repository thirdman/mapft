<template>
  <svg
    :class="`${strokeClass} ${size}`"
    xmlns="http://www.w3.org/2000/svg"
    id="IconUser"
    class="icon icon-tabler icon-tabler-user"
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
    <circle cx="12" cy="7" r="4" />
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </svg>
</template>

<style>
#IconUser.icon {
  stroke: var(--background-color, #eee);
}
#IconUser.icon.light {
  stroke: var(--background-color, #eee);
}
#IconUser.icon.dark {
  stroke: var(--ui-color, #111);
}
#IconUser.icon.brand {
  stroke: var(--fill-color, #ccc);
}
</style>
<script>
// https://tablericons.com/
export default {
  props: ['strokeClass', 'size'],
}
</script>
