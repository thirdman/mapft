<template>
  
      <div class="row">
        <div class="map-container preview" :style="`width: 100%; height: ${previewSize}px;`">
          
          <div
              class="grid-wrap"
              :style="tempTileMap && tempTileMap[0] && `width: ${tileSize * cols}px; height: ${tileSize * rows}px;`"
              >
              <div v-for="(row, rowIndex) in tempTileMap"
                :key="rowIndex"
                class="grid-row"
                :style="`width: 100%; height: ${tileSize}px`"
                >
                <div v-for="(col, colIndex) in row"
                :key="colIndex"
                class="grid-row"
                :style="`width: ${tileSize}px; height: ${tileSize}px`"
                >
                </div>
              </div>
              </div>
          </div>
        </div>
      </div>
      
</template>

<style lang="scss">
  .map-container{
    &.preview{
      .grid-row{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        background: rgba(255,255,255,.1);
        box-shadow: 0 0 0 1px rgba(255,255,255,.1) inset;
        width: 100%;
        height: 30px;
      }
      .grid-tile{
        background: pink;
        border: 1px solid red;
        
      }
    }
  }
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['onAction', 'onClose', 'tiles', 'rows', 'cols'],
  data() {
    return {
      previewSize: 100,
    };
  },
  created(){
    
  },
  mounted(){
    
  },
  
  computed: {
    ...mapGetters({
      // walletAddress: "ui/walletAddress",
    }),
    mapWidth(){
      const {cols, previewSize} = this
      const tileSize = previewSize / cols;
      const theWidth = tileSize * cols;
      console.log('tileSize', tileSize, theWidth)
      return theWidth
    },
    mapHeight(){
      const {rows, previewSize} = this
      const tileSize = previewSize / rows;
      const theHeight = tileSize * rows;
      console.log('tileSize', tileSize, theWidth)
      return theHeight
    },
    tileSize(){
      const {rows, previewSize} = this
      const tileSize = previewSize / rows;
      
      return tileSize
    },
    tempTileMap(){
      const {rows, cols} = this;
      console.log('rows, cols', rows, cols)
      if(!rows || !cols){
        return
      }
      
      const blankArray = new Array(rows).fill();
      const blankCols = new Array(cols).fill();
      const compiledMap = blankArray.map((_, rowIndex) => {
        // const thisContent = blankCols.maps(tile => tile.location[1] === rowIndex);
        const asIndexes = blankCols.map(col=> "0")
        return asIndexes
      })
      console.log('tempTileMap', compiledMap)
      return compiledMap;
    },
    
  },

  methods: {
    ...mapMutations({
      // setIntroRead: "ui/setIntroRead",
    }),
   
   
  },
};
</script>


