<template>
  <div class="buttonGroup themeGroup">
    <Swatch name="Lemon" id="lemon" :selected="selected === 'lemon'" />
    <Swatch name="Violet" id="violet" :selected="selected === 'violet'" />
    <Swatch name="Peach" id="peach" :selected="selected === 'peach'"/>
    <Swatch name="Sand" id="sand" :selected="selected === 'sand'"/>
    <Swatch name="Grayscale" id="greyscale" :selected="selected === 'greyscale'"/>
    <Swatch name="Turquoise" id="turquoise" :selected="selected === 'turquoise'"/>
    <Swatch name="Teal" id="teal" :selected="selected === 'teal'"/>
    <Swatch name="Charcoal" id="charcoal" :selected="selected === 'charcoal'"/>
  </div>
</template>
  
<style>
  .themeGroup.buttonGroup{
    padding: 4px 2px 0 4px;
    border-radius: .25rem;
    background: var(--shadow-color, #fff);

  }

</style>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: ['selected'],
  methods: {
    ...mapMutations({
      setUiTheme: "ui/setUiTheme",
    }),
  }

}
</script>