<template>
  <div
    class="dataSection toggleSection"
    :class="isActive ? 'active' : 'notActive'"
  >
    <div class="toggleHeader">
      <button
        type="button"
        class="collapsible toggleButton"
        :class="isActive ? 'active' : 'notActive'"
        @click="toggleActive"
      >
        <span class="iconWrap expand">
          <IconChevron :strokeClass="iconStrokeColor" />
        </span>
        <slot name="header"></slot>
      </button>
    </div>
    <div class="content" v-if="isActive">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style>
.dataSection {
  border: 1px solid var(--line-color, #111);
}
.dataSection + .dataSection {
  border-top: none;
}
.toggleSection.notActive .content {
  opacity: 0;
  display: none;
}
.toggleSection.active.content {
  opacity: 1;
  display: block;
  border-top: 1px solid var(--line-color, #111);
}

.toggleSection .content {
  padding: 0.25rem 0.5rem;
}
</style>

<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    // isActive: () => {
    //   return false
    // },
    iconStrokeColor() {
      return this.$store.state.ui.uiMode === 'minimal' ? 'dark' : 'light'
    },
  },
  methods: {
    toggleActive: function () {
      this.isActive = !this.isActive
    },
  },
}
</script>
