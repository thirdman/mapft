<template>
  <div class="element panel">
    <label>Triangle</label>
    <div class="row">
      <div class="col">
        <label>X</label><br />
          <v-text-field filled outlined dense v-model="localOptions.x" />
      </div>
      <div class="col">
        <label>Y</label><br />
          <v-text-field filled outlined dense v-model="localOptions.y" />
      </div>
      <div class="col">
        <label>W</label><br />
          <v-text-field filled outlined dense v-model="localOptions.w" />
      </div>
      <div class="col">
        <label>H</label><br />
          <v-text-field filled outlined dense v-model="localOptions.h" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Use Stroke</label>
          <v-btn-toggle 
            dense
          >
            <v-btn small @click="() => setHasStroke(false)" :color="!this.localOptions.hasStroke ? 'primary' : 'secondary'">
              No
            </v-btn>
            <v-btn small @click="() => setHasStroke(true)" :color="this.localOptions.hasStroke ? 'primary' : 'secondary'">
              Yes
            </v-btn>
          </v-btn-toggle>
      </div>
      <div class="col">
        <label>Use Fill</label>
          <v-btn-toggle 
            dense
          >
            <v-btn small @click="() => setHasFill(false)" :color="!this.localOptions.hasFill ? 'primary' : 'secondary'">
              No
            </v-btn>
            <v-btn small @click="() => setHasFill(true)" :color="this.localOptions.hasFill ? 'primary' : 'secondary'">
              Yes
            </v-btn>
          </v-btn-toggle>
      </div>
      
      <div class="col">
        
      </div>
      <div class="col">
        
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
      localOptions: {
        x: 101,
        y: 102,
        w: 103,
        h: 104,
        hasFill: true,
        hasStroke: false,
      },
    };
  },
  created(){
  },
  watch: {
    value: {
      handler(newValue) {
        this.localOptions = newValue;
      },
      immediate: true,
    },
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      // set(container) {
      //   this.$emit('input', elOptions)
      // }
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
    },
        setHasStroke(value){
      this.localOptions.hasStroke = value
    },
    setHasFill(value){
      this.localOptions.hasFill = value
    },
  },
};
</script>


