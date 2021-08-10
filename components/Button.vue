<template>
  <button
    class="btn"
    :class="`btn${mode} ${className} ${size} ${filled ? 'filled' : ''} ${fill ? 'fill' : ''} ${full ? 'full' : ''} `"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot />
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
    border: none;
  }
  &.fill, &.full {
    width: 100%;
  }
  &.transparent {
    background: unset;
    border: none;
    box-shadow: none;
  }
  &:not(.iconButton):active{
    box-shadow: unset;
    border: none;
    transform: translateY(1px) scale(.9);
    transition-duration: .1s;
    &:hover{
      box-shadow: unset;
      transform: translateY(1px) scale(.9);
      opacity: .7;
    }
  }
  &:focus{
    outline: none;
    // background: red !important;
    // box-shadow: 0 0 0 1px var(--fill-color), 0 0 0 2px var(--ui-color);
    box-shadow: 0 0 0 1px var(--fill-color), 0 0 0 3px red;
  }
  &:disabled{
    outline: none;
    cursor: not-allowed;
    transition: none;
    &:hover{
      box-shadow: 0 0 0 0px var(--shadow-color, #111) !important;
    }
  }
  //sizes
  &.small {
    font-size: 0.75rem;
    padding: 1px 0.35rem;
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
    border: 1px solid var(--ui-color, #111);
    box-shadow: 0px 2px 0 0px var(--ui-color);
    // box-shadow: 0 0px 0 2px var(--ui-color, #111);
  }
  &.inactive {
    border: none;
    box-shadow: 0 0 0 1px var(--ui-color, #111);
    // box-shadow: 0 0px 0 1px var(--ui-color, #111);
  }
  // MODES
  &.btnprimary {
  }
  &.btnsecondary {
    // border: 1px solid var(--ui-color, #111);
    box-shadow: 0 0 0 1px var(--ui-color, #111);
    // box-shadow: 0px 0px 0 2px var(--ui-color);
    background: var(--background-color);
    color: var(--ui-color, #111);
  }
  &.btnhollow {
    // REPLICATED a.asButton
    border-radius: 1rem;
    border: 0px solid var(--line-color, #111);
    box-shadow: 0 0 0 1px var(--line-color);
    background: transparent;
    padding: 2px .5rem;
    color: currentColor;
    &:hover{
      box-shadow: 0 0 0 0 var(--line-color);
    }
    &.filled{
      background: var(--line-color);
    }
    svg + span, svg + div{
      margin-left: .25rem;
    }
    .buttonGroup & {
      border-radius: 0;
      transform: none !important;
      &:nth-child(1n + 1){
        border-right-width: 0px;
      }
      &:first-child{
        border-radius: 1rem 0 0 1rem;
        
      }
      &:last-child{
        border-radius: 0 1rem  1rem 0;
        border-right-width: 1px;
      }
      &.filled:nth-child(1n + 1){
        border-right-width: 1px;
      }
      &.filled + .btnhollow{
        border-left-width: 0px;
        // border-right-width: 1px;
        
      }
    }
  }
  // HOVER
  &:not(.iconButton):hover {
    transform: translateY(0px);
    // box-shadow: 0 2px 0 0px var(--shadow-color, #111);
    border: 0px solid var(--ui-color, #111);
    box-shadow: 0 0 0 2px var(--ui-color, #111);
  }
  &:not(.iconButton).active:hover {
    transform: translateY(-2px);
    border: 2px solid var(--ui-color, #111);
    box-shadow: 2px 2px 0 0px var(--ui-color);
    // box-shadow: 0 0px 0 2px var(--ui-color, #111);
  }
}
</style>
<script>
export default {
  props: {
    mode: { default: 'default' },
    size: { default: 'medium' },
    filled: { default: false, type: Boolean }, // filled the background
    fill: { default: false, type: Boolean }, // makes it 100% width
    full: { default: false, type: Boolean }, // makes it 100% width
    disabled: { default: false, type: Boolean },
    className: { type: String, default: '' },
    // click: { type: Function },
  },
}
</script>
