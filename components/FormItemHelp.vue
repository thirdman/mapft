<template>
  <div class="itemHelp" :class="contrastMode">
    <div class="helpIcon"><IconHelp :strokeClass="contrastMode" /></div>
    <div class="helpContent">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<style></style>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  props: ['data', 'required', 'message'],
  data() {
    return {
      greeting: 'Hello World',
    }
  },
  computed: {
    ...mapGetters({
      contrastMode: 'ui/contrastMode',
    }),
  },
}
</script>
