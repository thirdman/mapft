<template>
  <div class="element panel">
    <label>Line</label>
    <div class="row">
      <div class="col">
        <label>Type</label><br />
          <v-btn-toggle 
            v-model="toggle_type"
            dense
          >
            <v-btn small v-for="(item, index) in typeArray" :key="index" @click="() => handleSelectType(item)">
              {{item}}
            </v-btn>
          </v-btn-toggle>
      </div>
      <div class="col">
        
      </div>
    </div>
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
        <!-- <label>H</label><br />
          <v-text-field filled outlined dense v-model="localOptions.h" /> -->
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Line size</label><br />
        <v-text-field filled outlined dense v-model="localOptions.strokeSize" />
      </div>
      <div class="col">
        <label>Line Color</label><br />
        <v-text-field filled outlined dense v-model="localOptions.strokeColor" />
      </div>
      <div class="col">
        <label>rotation</label><br />
        <v-text-field filled outlined dense v-model="localOptions.rotation" />
      </div>
      <!--
      <div class="col">
        <label>offset Y</label>
        <br />
          <v-text-field filled outlined dense v-model="localOptions.offsetY" />
      </div> -->
    </div>
    <div class="row">
      <!-- <div class="col">
        <label>offset X</label><br />
          <v-text-field filled outlined dense v-model="localOptions.offsetX" />
      </div>
      <div class="col">
        <label>offset Y</label>
        <br />
          <v-text-field filled outlined dense v-model="localOptions.offsetY" />
      </div>
      <div class="col">
        <label>Rotation offset</label>
        <br />
        <v-text-field filled outlined dense v-model="localOptions.rotationOffset" />
      </div> -->
      <!-- <div class="col">
        <label>Transform X</label>
        <v-text-field filled outlined dense v-model="localOptions.transformX" />
      </div>
      <div class="col">
        <label>Transform Y</label>
        <v-text-field filled outlined dense v-model="localOptions.transformY" />
      </div> -->
      <div class="col">
        <v-btn @click="handleSpreadEvenly()">Distribute</v-btn>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Line Cap</label><br />
          
          {{localOptions.lineCap}}
          <v-btn-toggle 
            dense
          >
            <v-btn small @click="() => handleSelectLineCap('butt')">
              butt
            </v-btn>
            <v-btn small @click="() => handleSelectLineCap('round')">
              round
            </v-btn>
            <v-btn small @click="() => handleSelectLineCap('square')">
              square
            </v-btn>
          </v-btn-toggle>
      </div>
      <div class="col">
        
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
        <label>Color</label>
        <v-text-field v-model="color" :mask="mask" hide-details class=" swatchController ma-0 pa-0" solo outlined >
					<template v-slot:append>
						<v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
							<template v-slot:activator="{ on }">
								<div :style="swatchStyle" class="swatchElement" v-on="on" />
							</template>
							<v-card>
								<v-card-text class="pa-0">
									<v-color-picker @update:color="handleSelectColor" v-model="color" elevation="10" />
								</v-card-text>
							</v-card>
						</v-menu>
					</template>
				</v-text-field>
      </div>
    </div>
    <v-divider />
  </div>
</template>

<style lang="scss">
.swatchElement{
  background-color: #eee;
  cursor: pointer;
  height: 30px;
  width: 30px;
  transition: border-radius 200ms ease-in-out;
  border: 1px solid var(--line-color);
}
.swatchController{
  // background: lime;
   .v-input__control{
     }

  .v-input__slot{
    background: rgba(255,255,255,.1) !important;
    // background: rgba(255,255,255,.1) !important
  }
}
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['value'],
  data() {
    return {
      picker: null,
      color: '#1976D2FF',
      mask:  '!#XXXXXXXX',
      menu: false,
      typeArray: ['repeating', 'single' ],
      toggle_type: 0,
      localOptions: {
        x: 101,
        y: 102,
        w: 103,
        hex: '#ff00ff',
        h: 2,
        s: 50,
        l: 50,
        rotation: 0,
        rotationOffset: 0,
        type: 'repeating',
        offsetX: 20,
        offsetY: 20,
        strokeSize: 10,
        strokeColor: "#ff00ff",
        iterations: 10,
        lineCap: 'round',
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
    swatchStyle(){
    const { color, menu } = this
     return {
       backgroundColor: color,
       borderRadius: menu ? '50%' : '4px',
     }
    }
    
  },

  methods: {
    ...mapMutations({
    }),
    updateValue: function (value) {
      this.$emit('input', value);
    },
    handleSelectType(type){
      console.log('type', type)
      this.localOptions.type = type;
    },
    handleSpreadEvenly(){
      const {iterations} = this.localOptions;
      const {height} = this.svgData;
      const spacing = height / iterations;
      this.localOptions.offsetY = spacing;
      
    },
    handleSelectColor(color){
      console.log('color', color);
      // const  {rotationOptions } = this;
      this.color = color.hex;
      this.localOptions.hex = color.hex;
      this.localOptions.h = color.hsla.h;
      this.localOptions.s = color.hsla.s;
      this.localOptions.l = color.hsla.l;
      this.localOptions.a = color.hsla.a;
      // this.localOptions.blah = 123
      // this.localOptions.rotationOptions = rotationOptions
      console.log('this.localOPtiosn', this.localOptions)
    },
    handleSelectLineCap(value){
      this.localOptions.lineCap = value;
    },
  },
};
</script>


