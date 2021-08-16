<template>


  <div class="toggleRow row contentRow pa-0 ma-0" >
    <div class="col col-3">Mode: {{controlMode}}</div>
    <div class="col col-9" dark>
            <v-btn
              
              x-small
              :color="controlMode === 'options' ? 'primary':''"
              :outlined="controlMode !== 'options'"
              @click="setControlMode('options')"
            >
              OPTIONS
            </v-btn>
            <v-btn
              
              x-small
              :color="controlMode === 'meta' ? 'primary':''"
              :outlined="controlMode !== 'meta'"
              
              :class="controlMode === 'meta' ? 'selected':''"
              @click="setControlMode('meta')"
            >
              META
            </v-btn>
            <v-btn
              
              x-small
              :color="controlMode === 'code' ? 'primary':''"
              :outlined="controlMode !== 'code'"
              
              @click="setControlMode('code')"
            >
              CODE
            </v-btn>
          </div>
        
  
</div>

</template>

<style lang="scss">
.toggleRow{
  padding: 0;
  .contentRow{
    .col{
      padding: 0;
    }
  }
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
      controlMode: "svgFormStore/controlMode",
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
      setControlMode: "svgFormStore/setControlMode",
      
      
      
    }),
    
  }

};
</script>


