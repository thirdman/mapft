<template>
  <div class="trait">
    <div class="traitLabel">{{label}}</div>
    <div class="traitContent">{{value}}</div>
  </div>
</template>

<style>
.trait {
  padding: 2px 0.5rem;
  border-radius: 0.25rem;
  background: var(--fill-color, #111);
  color: var(--text-color, #eee);
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
}
.traitLabel {
  font-size: 0.65rem;
  text-transform: uppercase;
  opacity: 0.5;
  font-variation-settings: 'wght' 600;
}
.traitContent {
  font-size: 0.75rem;
}
</style>

<script>
export default {
  props: ['label', 'value'],
}
</script>