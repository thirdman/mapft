<template>
  <div class="element panel">
    <label>Background</label>
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
        <label>Hue</label><br />
          <v-text-field filled outlined dense v-model="localOptions.h" />
      </div>
      <div class="col">
        <label>Sat</label><br />
          <v-text-field filled outlined dense v-model="localOptions.s" />
      </div>
      <div class="col">
        <label>B</label><br />
          <v-text-field filled outlined dense v-model="localOptions.b" />
      </div>
      <div class="col">
        <label>angle</label>
        <br />
          <v-text-field filled outlined dense v-model="localOptions.angle" />
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
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  props: ['value'],
  data() {
    return {
      picker: null,
      color: '#1976D2FF',
      mask:  '!#XXXXXXXX',
      menu: false,
      typeArray: ['gradient', 'solid'],
      toggle_type: 1,
      localOptions: {
        x: 101,
        y: 102,
        w: 103,
        hex: '#ff00ff',
        h: 2,
        s: 50,
        l: 50,
        rotation: 0,
        type: 'gradient',
        angle: 45,
      },
      rotationOptions: [0, 90, 180, 270],
    };
  },
  async created(){
    const tempColor = await this.getColor();
    this.color = tempColor;
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
    ...mapActions({
      getColor: "svgFormStore/getColor",
    }),
    updateValue: function (value) {
      this.$emit('input', value);
    },
    handleSelectType(type){
      this.localOptions.type = type;
    },
    handleSelectColor(color){
      console.log('color', color);
      // const  {rotationOptions } = this;
      this.color = color.hex;
      this.localOptions.hex = color.hex;
      this.localOptions.hue = color.hsla.h;
      this.localOptions.s = color.hsla.s;
      this.localOptions.l = color.hsla.l;
      this.localOptions.a = color.hsla.a;
      // this.localOptions.blah = 123
      // this.localOptions.rotationOptions = rotationOptions
      console.log('this.localOPtiosn', this.localOptions)
    },
  },
};
</script>


