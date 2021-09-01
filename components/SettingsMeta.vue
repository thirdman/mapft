<template>
  <div class="element panel">
    <div class="row">
      <div class="col">
        <label>Label</label><br />
        <v-text-field filled outlined dense v-model="localSettings.label" />
      </div>
      <div class="col">
        <label>Creator</label><br />
        <v-text-field filled outlined dense v-model="localSettings.creator" />
        
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Description</label><br />
        <v-textarea filled outlined dense rows="4" v-model="localSettings.description" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['value'],
  data() {
    return {
      localSettings: {
        label: 'xx',
        description: 'xx',
        creator: 'xx',
      },
      aspect: null
    };
  },
  created(){
  },
  watch: {
    value: {
      handler(newValue) {
        this.localSettings = newValue;
      },
      immediate: true,
    },
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
    },
    ...mapGetters({
      // SVG
      svgData: "svgFormStore/svgData",
    }),
    
  },

  methods: {
    ...mapMutations({
    }),
    updateValue: function (value) {
      this.$emit('input', value);
    }
  },
};
</script>


