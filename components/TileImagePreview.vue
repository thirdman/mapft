<template>
  <div class="tile-image-preview" >
    <img :src="getSrc(game.options.tileSetId, imageIndex)" class="thumbnail" :style="`width: ${imageSize}px; height: ${imageSize}px;`" />
  </div>
</template>

<style lang="scss">
  .tile-image-preview{
    .thumbnail{
      // width: 80px;
      // height: 80px;
    }
  }
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "TileImagePreview",
  props: ['game' ],
  created(){
    const  {size} = this;
    if(size){
      this.imageSize = size
    }
  },
  data() {
    return {
      devMode: false,
      imageSize: 40,
      imageIndex: 14
    };
  },
  computed: {
    ...mapGetters({
      tileSets: "ui/tileSets",
      ipfsUrl: "ui/ipfsUrl",
    }),
    
  },

  methods: {
    ...mapMutations({
    }),
    getSrc(id, index){
      const {game} = this;
      const {ipfsUrl} = this;
      return `${ipfsUrl}${id}/${index}.png`;
    },
    setTileSet(id){
      this.tileSetId = id;
      const {onAction} = this;
      if(onAction){
        onAction(id)
      }
    }
  },
};
</script>


