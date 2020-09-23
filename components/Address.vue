<template>
  <span class="address" :class="fill===true ? 'fill' : ''">{{address}}</span>
</template>

<style>
.address {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  display: inline-block;
  max-width: 8rem;
}
.address.fill {
  width: 100%;
}
</style>

<script>
export default {
  props: ['address', 'fill'],
}
</script>