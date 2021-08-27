<template>
  <div class="element panel">
    <label>Circle</label>
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
        <label>Variation</label><br />
          <!-- <v-text-field filled outlined dense v-model="localOptions.rotation" /> -->
          
      </div>
      <div class="col">
        <label>Min Size</label><br />
          <v-text-field filled outlined dense v-model="localOptions.minSize" />
      </div>
      <div class="col">
        <label>Max Size</label><br />
          <v-text-field filled outlined dense v-model="localOptions.maxSize" />
      </div>
      
    </div>
    <div class="row">
      <div class="col">
        <label>Rotation</label><br />
          <!-- <v-text-field filled outlined dense v-model="localOptions.rotation" /> -->
          <v-btn-toggle 
            dense
          >
            <v-btn small v-for="(item, index) in rotationOptions" :key="index" @click="() => handleRotate(item)">
              {{item}}
            </v-btn>
          </v-btn-toggle>
      </div>
      <div class="col">
        
      </div>
      <div class="col">
        
      </div>
      <div class="col">
        
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
    <v-divider />
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
        minSize: 100,
        maxSize: 300,
        rotation: 0,
        hasStroke: false,
        hasFill: true,
      },
      rotationOptions: [0, 90, 180, 270],
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
    handleRotate(rotation){
      console.log('rotation', rotation);
      // const  {rotationOptions } = this;
      this.localOptions.rotation = rotation
      // this.localOptions.blah = 123
      // this.localOptions.rotationOptions = rotationOptions
    },
  },
};
</script>


