<template>
  <div class="element panel">
    <div class="row">
      <div class="col">
        <h3>Repeat</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Offset X</label><br />
          <v-text-field filled outlined dense v-model="localOptions.offsetX" />
      </div>
      <div class="col">
        <label>offset Y</label><br />
          <v-text-field filled outlined dense v-model="localOptions.offsetY" />
      </div>
      <div class="col">
        <label>Iterations</label><br />
          <v-text-field filled outlined dense v-model="localOptions.iterations" />
      </div>
      
    </div>
    <div class="row">
      <div class="col">
        <label>OffSet Rotation</label><br />
          <v-text-field filled outlined dense v-model="localOptions.rotationOffset" />
          <v-btn
          small
          depressed 
          @click="() => handleRotationOffset(null)"
          :color="typeof localOptions.rotationOffset !== 'number' ? 'primary' : ''">ANY</v-btn>

      </div>
    </div>
    <div class="row">
      <div class="col">
        <v-btn @click="handleDistributeY()">Distribute Y</v-btn>
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
        offsetX: 0,
        offsetY: 0,
        rotationOffset: null,
        iterations: 10,
      },
      rotationOptions: [0, 90, 180, 270],
    };
  },
  created(){
    // console.log('transforms created isNAn', !!isNaN(this.localOptions.rotation))
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
      // svgData: "svgFormStore/svgData",
    }),
    
  },

  methods: {
    ...mapMutations({
    }),
    updateValue: function (value) {
      this.$emit('input', value);
    },
    handleRotationOffset(rotation){
      this.localOptions.rotationOffset = rotation
    },
    handleDistributeY(){
      
      
      const {iterations} = this.localOptions;
      const {svgData} = this;
      const {canvasHeight} = this.localOptions;
      if(!canvasHeight){
        console.error('no height', this.localOptions);
      }
      const spacing = canvasHeight / iterations;
      console.log('iterations', iterations)
      console.log('height', canvasHeight)
      console.log('iterations', iterations)
      if(Number(spacing)){
        this.localOptions.offsetY = spacing;
      }
    },
  },
};
</script>


