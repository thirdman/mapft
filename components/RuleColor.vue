<template>
  <div class="element panel">
    <h5>Color</h5>
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
      
      <!-- <div class="col" v-if="this.localOptions.hasFill">
        <label>Use Gradient</label>
        <v-btn-toggle 
          dense
          v-if="this.localOptions.hasFill"
        >
          <v-btn small @click="() => setUseGradient(false)" :color="!this.localOptions.useGradient ? 'primary' : 'secondary'">
            No
          </v-btn>
          <v-btn small @click="() => setUseGradient(true)" :color="this.localOptions.useGradient ? 'primary' : 'secondary'">
            Yes
          </v-btn>
        </v-btn-toggle>
      </div>
      <div v-else class="col">
      </div> -->
      <div class="col">
        
      </div>
    </div>
    <div class="row" v-if="this.localOptions.hasFill">
      <div class="col col-6">
        <label>Fill Type</label><br />
        {{this.localOptions.fillType}}
        <v-btn
          small
          depressed 
          @click="() => handleFillType('theme')"
          :color="localOptions.fillType === 'theme' ? 'primary' : ''"
          >
            THEME
          </v-btn>
        <v-btn
          small
          depressed 
          @click="() => handleFillType('custom')"
          :color="localOptions.fillType === 'custom' ? 'primary' : ''"
          >
            CUSTOM
        </v-btn>
        <br />
        <div class="text-body-2" v-if="localOptions.fillType === 'theme' && localOptions.useGradient === false">
          Selects a random color from theme.
        </div>
        <div class="text-body-2" v-if="localOptions.fillType === 'theme' && localOptions.useGradient === true">
          Generates a gradient from theme colors.
        </div>
      </div>
      <div class="col" >
        <label>Use Gradient</label><br/>
        <v-btn-toggle 
          dense
        >
          <v-btn small @click="() => setUseGradient(false)" :color="this.localOptions.useGradient === false ? 'primary' : 'secondary'">
            No
          </v-btn>
          <v-btn small @click="() => setUseGradient(true)" :color="this.localOptions.useGradient === true ? 'primary' : 'secondary'">
            Yes
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="col">
      </div>
    </div>
    <div class="row" v-if="localOptions.hasFill && localOptions.fillType === 'custom'">
      <div class="col">
        <label>Fill Color</label>
        <v-text-field v-model="fillColor" :mask="mask" hide-details class=" swatchController ma-0 pa-0" solo outlined >
					<template v-slot:append>
						<v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
							<template v-slot:activator="{ on }">
								<div :style="swatchStyle" class="swatchElement" v-on="on" />
							</template>
							<v-card>
								<v-card-text class="pa-0">
									<v-color-picker @update:color="handleSelectFillColor" v-model="fillColor" elevation="10" />
								</v-card-text>
							</v-card>
						</v-menu>
					</template>
				</v-text-field>
      </div>
    </div>
    <div class="row" v-if="this.localOptions.hasStroke">
      <div class="col col-6">
        <label>Stroke Size</label><br />
       here
      </div>
      <div class="col" >
        <label>Stroke Color</label><br/>
        here
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
        // fillType: 'theme',
        // hasFull: true,
        // hasStroke: false,
        // useGradient: true,
        // fillColor: null,
      },
      // fillColor: "#ff00ff",
      useGradient: true,
      picker: null,
      fillColor: '#ff00ff',
      mask:  '!#XXXXXXXX',
      menu: false,
    };
  },
  created(){
    // console.log('transforms created isNAn', !!isNaN(this.localOptions.rotation))
    
  },
  watch: {
    value: {
      handler(newValue) {
        console.log('rule-colors handler', newValue)
        this.localOptions = newValue;
        // const {useGradient, fillColor} = newValue
        // this.fillColor = fillColor
        // this.useGradient = useGradient
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
      const { fillColor, menu } = this
      return {
        backgroundColor: fillColor,
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
    handleFillType(type){
      this.localOptions.fillType = type
        // console.log('handleFillType', type)
      if(type === 'custom'){
        this.localOptions.useGradient = false
      }
    },
    setHasStroke(value){
      console.log('setting hasStroke', value)
      this.localOptions.hasStroke = value
    },
    setHasFill(value){
      this.localOptions.hasFill = value
    },
    setUseGradient(value){
      // this.useGradient = value
      this.localOptions.useGradient = value
      if(value === true){
        this.localOptions.fillType = 'theme'
      }
      // console.log('setUseGradient',value)
    },
    handleSelectFillColor(color){
      // console.log('color', color);
      this.fillColor = color.hex;
      this.localOptions.fillColor = color.hex;
      this.localOptions.hue = color.hsla.h;
      this.localOptions.s = color.hsla.s;
      this.localOptions.l = color.hsla.l;
      this.localOptions.a = color.hsla.a;
      // console.log('this.localOPtiosn', this.localOptions)
    },
  },
};
</script>


