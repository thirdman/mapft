<template>
  <div class="col">
    <label>Active Theme</label>
    {{activeTheme && activeTheme.id}}
    <div class="swatchset row" v-for="(theme, index) in themes" :key="index" :class="activeTheme && activeTheme.id === theme.id ? 'selected' : ''">
      <div class="swatches">
      <template v-for="(color, i) in theme.colors"  >
        <div class="swatch " :style="`background: ${color}`" :key="i"></div>
      </template>
      </div>
      <div class="actions">
        <v-btn x-small @click="handleSelectTheme(index)">select</v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.swatchset{
  margin: .25rem 0;
  padding: .25rem;
  background: var(--line-color);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  &.selected{
    border: 1px solid violet;
  }
  .swatches{
    flex-basis: 90%;
    flex-shrink: 1;
  }
  .actions{
    flex-basis: 10%;
    text-align: right;
  }
  .swatch{
    width: 32px;
    height: 32px;
    border-radius: 4px;
    margin: 0 .25rem;
    &:nth-child(1){
      background: #ff00ff;
    }
    &:nth-child(2){
      background: #ff44ff;
    }
    &:nth-child(3){
      background: #ff88ff;
    }
    &:nth-child(4){
      background: #ffccff;
    }
    &:nth-child(5){
      background: #ffeeff;
    }
  }
}
</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";


export default {
  data() {
    return {
      // These are the validation arrays
      themes: [
        {
          id: "one",
          colors: [
            "#ff00ff",
            "#ff44ff",
            "#ff88ff",
            "#ffbbff",
            "#ffeeff"
          ]
        },
        {
          id: "two",
          colors: [
            "#cc00ff",
            "#cc44ff",
            "#cc88ff",
            "#ccbbff",
            "#cceeff"
          ]
        },
        {
          id: "default",
          colors: [
            "#cc0099",
            "#cc4499",
            "#cc8899",
            "#ccbb99",
            "#ccee99"
          ]
        },
        {
          id: "test",
          colors: [
            "#eee555",
            "#cc4499",
            "#cc8899",
            "#00bb99",
            "#00ee99"
          ]
        },
        {
          id: "white-bg",
          colors: [
            "#ffffff",
            "#edf8ff",
            "#673AB7",
            "#80DEEA",
            "#263238"
          ]
        }
      ]
    };
  },
  
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      // SVG
      svgData: "svgFormStore/svgData",
      activeTheme: "svgFormStore/activeTheme",
    }),
    
    
    // The `mapFields` function takes an array of
    // field names and generates corresponding
    // computed properties with getter and setter
    // functions for accessing the Vuex store.
    ...mapFields("svgFormStore", [ "svgCode"
  ]),
  },
  
  methods: {
    ...mapMutations({
      setActiveTheme: "svgFormStore/setActiveTheme",      
    }),
    ...mapActions({
      // handleMintSvg: "svgFormStore/handleMintSvg",
      // setContractData: "svgFormStore/setContractData",
    }),
    handleSelectTheme(index){
      console.log(index)
      const  {themes} = this
      const selectedTheme = themes[index]
      this.setActiveTheme(selectedTheme);
    }
    
    
  },
};
</script>


