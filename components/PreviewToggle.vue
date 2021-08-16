<template>

<div class="toggleRow row contentRow pa-0 ma-0">
  
          <div class="col col-3">Mode:</div>
          <div class="col col-9">
            <v-btn
              x-small
              depressed
              :color="previewMode === 'edit' ? 'primary':'secondary'"
              @click="setPreviewMode('edit')"
            >
              EDIT
            </v-btn>
            <v-btn
              x-small
              depressed
              :color="previewMode === 'view' ? 'primary':'secondary'"
              @click="setPreviewMode('view')"
            >
              VIEW
            </v-btn>
          </div>
      
</div>

</template>

<style lang="scss">
.toggleRow{
  display: flex;
  flex-basis: 400px;
  flex-grow: 0;
  // height: 2rem;
  border-bottom: 1px solid var(--line-color);
  // border-top: 1px solid var(--line-color);
}
  
  .danger{
    color: var(--danger-color, red);
  }
</style>

<script>

import { mapMutations, mapGetters, mapActions } from "vuex";


export default {
  props: ['code', 'previewData', ],
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      //SVG
      previewMode: "svgFormStore/previewMode",
      previewBytes: "svgFormStore/previewBytes",
      calculatedFee: "svgFormStore/calculatedFee",
      svgFee: "svgFormStore/svgFee",
    }),
    characterCount() {
      console.log(this.code)
        var chars = this.code.length;
            // limit = 140;
          //return (limit - char) + " / " + limit + "characters remaining";
          return chars
      }
  },
  methods: {
    ...mapMutations({
      //SVG
      setPreviewMode: "svgFormStore/setPreviewMode",
      
      
      
    }),
    
  }

};
</script>


