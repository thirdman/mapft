<template>
  <button
    class="btn"
    :class="`btn${mode} ${className} ${size} ${fill ? 'fill' : ''}`"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  transform: translateY(0px);
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  cursor: pointer;
  color: var(--background-color, #eee);
  background: var(--ui-color, #111);
  &:not(.iconButton) {
    box-shadow: 0 0px 0 0px var(--ui-color, #111);
  }
  &.fill {
    width: 100%;
  }
  &.transparent {
    background: unset;
    border: none;
    box-shadow: none;
  }
  //sizes
  &.small {
    font-size: 0.75rem;
    padding: 1px 0.25rem;
  }
  &.medium {
    font-size: 0.875rem;
    padding: 1px 0.5rem;
  }
  &.large {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
  }
  &.active {
    border: 2px solid var(--ui-color, #111);
    box-shadow: 2px 2px 0 0px var(--ui-color);
    // box-shadow: 0 0px 0 2px var(--ui-color, #111);
  }
  &.inactive {
    border: 1px solid var(--ui-color, #111);
    // box-shadow: 0 0px 0 1px var(--ui-color, #111);
  }
  // MODES
  &.btnprimary {
  }
  &.btnsecondary {
    border: 1px solid var(--ui-color, #111);
    // box-shadow: 0px 0px 0 2px var(--ui-color);
    background: var(--background-color);
    color: var(--ui-color, #111);
  }
  // HOVER
  &:not(.iconButton):hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 0 0px var(--shadow-color, #111);
  }
  &:not(.iconButton).active:hover {
    transform: translateY(-2px);
    border: 2px solid var(--ui-color, #111);
    box-shadow: 2px 2px 0 0px var(--shadow-color);
    // box-shadow: 0 0px 0 2px var(--ui-color, #111);
  }
}
</style>
<script>
export default {
  props: {
    mode: { default: 'default' },
    size: { default: 'medium' },
    fill: { default: false, type: Boolean },
    disabled: { default: false, type: Boolean },
    className: { type: String, default: '' },
    // click: { type: Function },
  },
}
</script>
