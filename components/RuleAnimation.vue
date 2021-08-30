<template>
  <div class="element panel">
    <div class="row">
      <div class="col">
        <label>Use Animation</label><br />
         <v-btn
            small
            depressed 
            @click="() =>  handleUseAnimation(true)"
            :color="localOptions.useAnimation ? 'primary' : ''">YES</v-btn>
          
          <v-btn
            small
            depressed 
            @click="() => handleUseAnimation(false)"
            :color="!localOptions.useAnimation ? 'primary' : ''">NO</v-btn>
      </div>
      <div class="col">
        <label>Mode</label><br />
            <v-btn
            small
            depressed 
            @click="() =>  handleAnimationMode('generative')"
            :color="localOptions.animationMode === 'generative' ? 'primary' : ''"
            >
              GENERATIVE
            </v-btn>
          
          <v-btn
            small
            depressed 
            @click="() => handleAnimationMode('custom')"
            :color="localOptions.animationMode === 'custom' ? 'primary' : ''">
              CUSTOM
          </v-btn>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Offset X</label><br />
          <v-text-field filled outlined dense v-model="localOptions.animationOffsetX" />
      </div>
      <div class="col">
        <label>offset Y</label><br />
          <v-text-field filled outlined dense v-model="localOptions.animationOffsetY" />
      </div>
      <div class="col">
        <label>Scale</label><br />
          <v-text-field filled outlined dense v-model="localOptions.animationScale" />
      </div>
      <div class="col">
        <label>Rotation</label><br />
        <v-text-field filled outlined dense v-model="localOptions.animationRotation" />
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
        useAnimation: false,
        animationMode: 'generative',
        animationOffsetX: 100,
        animationOffsetY: 100,
        animationScale: 1,
        animationRotation: 0,
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
    // handleRotationOffset(rotation){
    //   this.localOptions.rotationOffset = rotation
    // },
    handleUseAnimation(newValue){
      this.localOptions.useAnimation = newValue
    },
    handleAnimationMode(newValue){
      this.localOptions.animationMode = newValue
    },
     
  },
};
</script>


