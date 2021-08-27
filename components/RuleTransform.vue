<template>
  <div class="element panel">
    <div class="row">
      <div class="col">
        <label>Variation</label><br />
          
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
          <v-btn-toggle 
            dense
          >
            <v-btn small v-for="(item, index) in rotationOptions" :key="index" @click="() => handleRotate(item)" :color="localOptions.rotation === rotationOptions[index] ? 'primary' : ''">
              {{item}}
            </v-btn>
          </v-btn-toggle>
          <v-btn
          small
          depressed 
          @click="() => handleRotate(null)" :color="typeof localOptions.rotation !== 'number' ? 'primary' : ''">ANY</v-btn>

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
        rotation: null,
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
      svgData: "svgFormStore/svgData",
    }),
    
  },

  methods: {
    ...mapMutations({
    }),
    updateValue: function (value) {
      this.$emit('input', value);
    },
    handleRotate(rotation){
      console.log('rotation', rotation);
      this.localOptions.rotation = rotation
    },
  },
};
</script>


