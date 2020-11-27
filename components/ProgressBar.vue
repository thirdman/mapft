<template>
  <div class="ProgressBar" >
    <div v-if="showNumber" class="small">{{percentage}}</div>
    <div class="progressBarOuter">
        <div class="progressBarFill" :class="`fill-${color}`" :style="`width: ${percentage}%`"></div>
    </div>        
  </div>
</template>

<style lang="scss">
.ProgressBar{
  padding: .5rem;
  height: 2rem;
  width: 100%;
}
.progressBarOuter{
  width: 100%;
  height: 1rem;
  border-radius: .25rem;
  background: var(--ui-color, #eee);
  border: 1px solid var(--ui-color, #111);
}
.progressBarFill{
  height: 100%;
  display: block;
  background: var(--fill-color, #111);
  border-radius: 2px;
  &.fill-fill{
    background: var(--fill-color, #111);
  }
  &.fill-background{
    background: var(--background-color, #111);
  }
}
</style>

<script>

// import { mapMutations, mapGetters, mapActions } from "vuex";


export default {
  props: ['percentage', 'contrastMode', 'showNumber', 'color'],
  computed: {
    // ...mapGetters({
    // }),
  },

};
</script>


