<template>
  <div class="rulesection">
    <div class="row">
    <div class="col">
      <label>Type test {{type || 'no type'}} - {{mode || 'no mode'}}</label><br />
      <v-btn-toggle 
        v-model="toggle_type"
        dense
        @change="!readOnly && handleType"
        class="typeSelectWrap"
      >
        <v-btn small v-for="(item, index) in typeArray" :key="index" class="typeSelectButton" :class="type === item ? 'selected' : ''" :color="type === item ? 'primary' : ''"
        :disabled="readOnly">
          <v-icon small v-if="item==='background'">mdi-square</v-icon>
          <v-icon small v-if="item==='polygon'">mdi-vector-polygon</v-icon>
          <v-icon small v-if="item==='circle'">mdi-vector-circle</v-icon>
          <v-icon small v-if="item==='triangle'">mdi-vector-triangle</v-icon>
          <v-icon small v-if="item==='rectangle'">mdi-vector-rectangle</v-icon>
          <v-icon small v-if="item==='line'">mdi-vector-line</v-icon>
          <v-icon small v-if="item==='blob'">mdi-vector-ellipse</v-icon>
          <v-icon small v-if="item==='art'">mdi-cloud</v-icon>
          {{item}}
        </v-btn>
      </v-btn-toggle>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Label</label><br />
        <v-text-field filled outlined dense v-model="localOptions.label" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['value', 'type', 'mode', 'readOnly'],
  data() {
    return {
      typeArray: ['rectangle', 'circle', 'polygon', 'line', 'triangle', 'blob', 'background', 'art'],
      // type: null,
      toggle_type: null,
      localOptions: {
        label: '',
        type: ''
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
    handleType(){
      const {typeArray, toggle_type} = this;
      const typeValue = typeArray[toggle_type];
      this.localOptions.label = `new ${typeValue}`
    },
  },
};
</script>



