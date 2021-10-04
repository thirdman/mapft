<template>
  <div class="tileset-select" >
    
    <div v-if="tileSets" class="select-row row ma-0">
      <div
        v-for="(set, i) in tileSets"
        :key="i"
        class="select-option colsss pa-1"
        :class="set.id === selected ? 'selected' : '' "
        @click="() => setTileSet(set.id)"
        >
        <img :src="getSrc(set.id, 4)" class="select-thumbnail" />
        <v-btn plain small :color="set.id === selected ? 'primary' : '' " @click="() => setTileSet(set.id)">{{set.name}}</v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .tileset-select{
    // color: pink
    .select-row{
      .select-option{
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        background: rgba(255,255,255,.1);
        &.selected{
          background: white;
        }
      }

    } 
  }
  .select-thumbnail{
    width: 80px;
    height: 80px;
  }
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "TileSetSelect",
  props: ['selected', 'onAction' ],
  data() {
    return {
      devMode: false,
      size: 'small'
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


