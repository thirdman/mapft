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
      if (!address || typeof address !== 'string') {
        return null
      }
      if(address.length < 8){
        return address
      }
      const first = address && address.slice(0, 6) || "";
      const last = address && address.slice(-4) || "";
      const returnValue = `${first}...${last}`;
      return returnValue.toString() || "";
    },
  }
}
</script>