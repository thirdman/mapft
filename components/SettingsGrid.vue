<template>
  <div class="element panel">
    <div class="row">
      <div class="col">
        <h5>Grid</h5>
        <div class="text-body-2">Grid will render the rules into each grid spacing</div>
      </div>
    </div>
    <div class="row">
      <div class="col col-3">
        <label>Rows</label><br />
          <v-text-field filled outlined dense v-model="localSettings.gridRows" />
      </div>
      <div class="col col-3">
        <label>Cols</label><br />
          <v-text-field filled outlined dense v-model="localSettings.gridCols" />
      </div>
    </div>
    <div class="row">
      <div class="col">
      <label>Grid</label><br />
        <v-btn-toggle 
          
          dense
        >
          <v-btn
            small
            :color="grid === '1/1' ? 'primary' : 'secondary'"
            @click="handleGrid('1/1')"
            >
            1/1
          </v-btn>
          <v-btn
            small
            :color="grid === '2/2' ? 'primary' : 'secondary'"
            @click="handleGrid('2/2')"
          >
            2/2
          </v-btn>
          <v-btn 
            small
            :color="grid === '3/3' ? 'primary' : 'secondary'"
            @click="handleGrid('3/3')"
            >
            3/3
          </v-btn>
        </v-btn-toggle>
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
        canvasWidth: 1600,
        canvasHeight: 1600,
        gridCols: 1,
        gridRows: 1,
      },
      grid: '1/1',
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
    handleGrid(grid){
      // const {canvasWidth, canvasHeight} = this.localSettings
      
      if(grid === '1/1'){
        this.grid = '1/1';
        this.localSettings.gridCols = 1
        this.localSettings.gridRows = 1
      }
      if(grid === '2/2'){
        this.grid = '2/2';
        this.localSettings.gridCols = 2
        this.localSettings.gridRows = 2
      }
      if(grid === '3/3'){
        this.grid = '3/3';
        this.localSettings.gridCols = 3
        this.localSettings.gridRows = 3
      }
      
      this.localSettings.grid = grid
    }
  },
};
</script>


