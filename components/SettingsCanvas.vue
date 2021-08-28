<template>
  <div class="element panel">
    <div class="row">
      <div class="col">
        <label>Canvas Width</label><br />
          <v-text-field filled outlined dense v-model="localSettings.canvasWidth" />
      </div>
      <div class="col">
        <label>Canvas Height</label><br />
          <v-text-field filled outlined dense v-model="localSettings.canvasHeight" />
      </div>
    </div>
    <div class="row">
      <label>Aspect</label><br />
        <v-btn-toggle 
          v-model="toggle_mode"
          dense
        >
          <v-btn
            small
            :color="aspect === '1:1' ? 'primary' : 'secondary'"
            @click="handleAspect('1:1')"
            >
            1:1
          </v-btn>
          <v-btn
            small
            :color="aspect === '2:3' ? 'primary' : 'secondary'"
            @click="handleAspect('2:3')"
          >
            2:3
          </v-btn>
          <v-btn 
            small
            :color="aspect === '16:9' ? 'primary' : 'secondary'"
            @click="handleAspect('16:9')"
            >
            16:9
          </v-btn>
        </v-btn-toggle>
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
        canvasWidth: 1600,
        canvasHeight: 1600,
        rotationOptions: [0, 90, 180, 270],
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
    handleAspect(aspect){
      const {canvasWidth, canvasHeight} = this.localSettings
      let newHeight = canvasHeight
      if(aspect === '1:1'){
        newHeight = canvasWidth;
        this.aspect = '1:1';
      }
      if(aspect === '2:3'){
        newHeight = canvasWidth / 2  * 3
        this.aspect = '2:3';
      }
      if(aspect === '16:9'){
        newHeight = canvasWidth / 16  * 9
        this.aspect = '16:9';
      }
      
      this.localSettings.canvasHeight = newHeight
    }
  },
};
</script>


