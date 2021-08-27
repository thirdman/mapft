<template>

<div class=" previewColumn svgPreviewColumn">
  <!-- <div>{{loading ? "loading" : "bnot loading"}}<Loading /></div> -->
  
  <div class="svgPreviewWrap" v-if="previewMode === 'edit'">
  
  </div>
</div>

</template>

<style lang="scss">
.svgPreviewColumn{
  display: flex;
  flex-basis: 400px;
  flex-grow: 0;
  flex-direction: column;
  align-items: center;
  padding-top: .5rem;
}
  
  
  .danger{
    color: var(--danger-color, red);
  }
</style>

<script>

import { mapMutations, mapGetters, mapActions } from "vuex";
import { SVG } from '@svgdotjs/svg.js';
import { spline } from '@georgedoescode/spline';


export default {
  
  props: ['code', 'previewData', 'previewMode'],
  data(){
    return {
      svgElement: null,
      loading: false,
  
    }
  },
  created() {
   this.loading = true;
  },
  mounted() {
    this.loading = false;
  },
  
  
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      //SVG
      activeTheme: "svgFormStore/activeTheme",
      svgData: "svgFormStore/svgData",
    }),
  },


  methods: {
    ...mapActions({
      getColor: "svgFormStore/getColor",
    }),
  }

};
</script>


