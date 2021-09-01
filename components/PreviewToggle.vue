<template>

<div class="toggleRow row contentRow pa-0 ma-0">
  
          <div class="col col-3">Mode: {{previewMode}}</div>
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
              :color="previewMode === 'gallery' ? 'primary':'secondary'"
              @click="setPreviewMode('gallery')"
            >
              GALLERY
            </v-btn>
            <v-btn
              x-small
              depressed
              :color="previewMode === 'full' ? 'primary':'secondary'"
              @click="setPreviewMode('full')"
            >
              FULL
            </v-btn>
            <v-btn
              x-small
              depressed
              :color="previewMode === 'view' ? 'primary':'secondary'"
              @click="setPreviewMode('view')"
            >
              META
            </v-btn>
          </div>
      
</div>

</template>

<style lang="scss">

  
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


