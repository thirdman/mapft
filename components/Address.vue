<template>
  
  <span class="address" >
    {{shrinkAddress(address)}}
  </span>
  
</template>
  <!-- <span class="address" :class="fill===true ? 'fill' : ''">{{address}}</span> -->

<style>
.address {
  /* text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  display: inline-block;
  max-width: 8rem; */
}
.address.fill {
  width: 100%;
}
</style>

<script>
export default {
  props: ['address', 'fill', "shrink"],
  methods: { 
    shrinkAddress(address) {
      if (!address) {
        return;
      }
      const first = address.slice(0, 6) || "";
      const last = address.slice(-4) || "";
      const returnValue = `${first}...${last}`;
      return returnValue.toString() || "";
    },
  }
}
</script>