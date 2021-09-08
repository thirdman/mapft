<template>


  <div class="toggleRow row contentRow pa-0 ma-0" >
    <div class="col col-3"><span class="column-title">EDIT MODE</span></div>
    <div class="col col-9" dark>
            <v-btn
              
              x-small
              :color="controlMode === 'rules' ? 'primary':''"
              @click="setControlMode('rules')"
            >
              RULES
            </v-btn>
            <v-btn   
              x-small
              :color="controlMode === 'theme' ? 'primary':''"
              @click="setControlMode('theme')"
            >
              THEME
            </v-btn>
            <v-btn   
              x-small
              :color="controlMode === 'settings' ? 'primary':''"
              @click="setControlMode('settings')"
            >
              SETTINGS
            </v-btn>
            <v-btn
              x-small
              :color="controlMode === 'meta' ? 'primary':''"
              :class="controlMode === 'meta' ? 'selected':''"
              @click="setControlMode('meta')"
            >
              META
            </v-btn>
            <v-btn
              
              x-small
              :color="controlMode === 'code' ? 'primary':''"
              @click="setControlMode('code')"
            >
              CODE
            </v-btn>
            <v-btn
              
              x-small
              :color="controlMode === 'mint' ? 'primary':''"
              @click="setControlMode('mint')"
            >
              MINT
            </v-btn>
          </div>
        
  
</div>

</template>

<style lang="scss">
.toggleRow{
  display: flex;
  border-bottom: 1px solid var(--line-color);
  padding: 0;
  flex-basis: 2rem;
  flex-shrink: 0;
  flex-grow: 0;
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


