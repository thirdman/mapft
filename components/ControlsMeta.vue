<template>
  <div class="col">
    <div class="row">
      <div class="col">
        <settings-meta :value.sync="tempMeta" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <v-btn 
          x-small 
          color="primary"
          @click="applySettings">Apply</v-btn>
      </div>
    </div>
  </div>
  
</template>

<style lang="scss">

</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";


export default {
  data() {
    return {
      tempMeta: {
        label: 'f',
        description: 'f',
        creator: 'f',
      },
    };
  },
  created(){
    const {label, description, creator}  = this.svgData;
    const newTempObj = {
      label, description, creator
    }
    this.tempMeta = newTempObj;
  },
  computed: {
    ...mapGetters({
      // SVG
      svgData: "svgFormStore/svgData",
      activeTheme: "svgFormStore/activeTheme",
    }),
  },
  
  methods: {
    ...mapMutations({
      setSvgData: "svgFormStore/setSvgData",
      setSvgDescription: "svgFormStore/setSvgDescription",
      setSvgTitle: "svgFormStore/setSvgTitle",
      setSvgCreator: "svgFormStore/setSvgCreator",
    }),
    ...mapActions({

      // setContractData: "svgFormStore/setContractData",
    }),
    applySettings(){
      console.log('here', this)
      const {
        svgData, 
        tempMeta
      } = this;
      console.log('tempMata', tempMeta)
      const newData = {...svgData, ...tempMeta}
      if(newData.description){
        this.setSvgDescription(newData.description)
      }
      if(newData.creator){
        this.setSvgCreator(newData.creator)
      }
      if(newData.label){
        this.setSvgTitle(newData.label)
      }
      this.setSvgData(newData);
    }
  },
};
</script>


