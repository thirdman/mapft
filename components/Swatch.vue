<template>
  <div :class="`swatch ${id} ${selected ? 'isSelected' : ''}`" @click="handleAction">
    <span class="swatchColor"></span>
    <span class="swatchLabel">{{name}}</span>
  </div>
</template>
  
<style lang="scss">
.swatch{
  position: relative;
  display: inline-block;
  color: var(--background-color, #eee);
  font-size: 0.675rem;
  position: relative;
  line-height: 1.5rem;
  padding-left: 0;
  padding-right: 2px;
  &.isSelected{
    .swatchColor{
      box-shadow: 0 0 0 2px var(--ui-color, #111) inset;
    }
  }
  &:before{
    display: none !important;
  }
}

.swatch.lemon .swatchColor {
  background: var(--lemon-fill-color) !important;
}
.swatch.sand .swatchColor  {
  background: var(--sand-fill-color) !important;
}
.swatch.turquoise .swatchColor  {
  background: var(--blue-fill-color, #fff) !important;
}
.swatch.greyscale  .swatchColor{
  background: var(--greyscale-fill-color, #fff) !important;
}
.swatch.peach .swatchColor   {
  background: var(--peach-fill-color, #fff) !important;
}
.swatch.violet .swatchColor   {
  background: var(--violet-fill-color, #fff) !important;
}
.swatch.teal .swatchColor   {
  background: var(--teal-fill-color, #fff) !important;
}
.swatch.charcoal .swatchColor   {
  background: var(--charcoal-fill-color, #fff) !important;
}

.swatch .swatchColor{
    position: relative;
    display: block;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1.5rem;
    height: 1.5rem;
    // background: #d3e4e0;
    border-radius: 3px;
    box-shadow: 0 0px 3px rgba(0,0,0,.2);
    margin-right: 2px;
}
.swatch .swatchLabel {
  position: absolute;
  left: 0%;
  top: -1rem;
  background: var(--ui-color, #111);
  border-radius: 0.25rem;
  padding: 2px 0.25rem;
  z-index: 20;
  display: block;
  visibility: hidden;
  opacity: 0;
  transform: translateY(0rem);
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
.swatch:hover .swatchLabel {
  display: block;
  visibility: visible;
  opacity: 1;
  transform: translateY(-1rem);
}

</style>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: ['name', 'id', 'action', 'selected'],
  mounted(){
    console.log('this.action', this.action)
  },
  methods: {
    ...mapMutations({
      setUiTheme: "ui/setUiTheme",
    }),
    handleAction(){
      const hasAction = this.action ? true : false;
      console.log('hasAction: ', hasAction);
      if(hasAction){
        this.action
      } else {
        this.setUiTheme(this.id)
      }
    }
  }

}
</script>