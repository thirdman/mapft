<template>
  <div class="element panel">
    <div class="row">
      <div class="col">
        <label>Label</label><br />
        <v-text-field filled outlined dense v-model="localSettings.label" />
      </div>
      <div class="col">
        <label>Description</label><br />
          <v-text-field filled outlined dense v-model="localSettings.description" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Creator</label><br />
        <v-text-field filled outlined dense v-model="localSettings.creator" />
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
        
      },
      aspect: null
    };
  },
  created(){
    // console.log('transforms created isNAn', !!isNaN(this.localOptions.rotation))
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
    },
    // handleAspect(aspect){
    //   const {canvasWidth, canvasHeight} = this.localSettings
    //   let newHeight = canvasHeight
    //   if(aspect === '1:1'){
    //     newHeight = canvasWidth;
    //     this.aspect = '1:1';
    //   }
    //   if(aspect === '2:3'){
    //     newHeight = canvasWidth / 2  * 3
    //     this.aspect = '2:3';
    //   }
    //   if(aspect === '16:9'){
    //     newHeight = canvasWidth / 16  * 9
    //     this.aspect = '16:9';
    //   }
      
    //   this.localSettings.canvasHeight = newHeight
    // }
  },
};
</script>


