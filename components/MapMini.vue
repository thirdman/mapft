<template>
  <v-card outlined>
      <div class="row ma-0">
        <div class="map-container mini col pa-0" :style="`width: 100%; height: ${previewSize}px;`" v-if="gameData">
          
          <div
              class="grid-wrap"
              :style="tempTileMap && tempTileMap[0] && `width: ${tileSize * gameData.options.cols}px; height: ${tileSize * gameData.options.rows}px;`"
              >
              <div v-for="(row, rowIndex) in tempTileMap"
                :key="rowIndex"
                class="grid-row"
                :style="`width: 100%; height: ${tileSize}px`"
                >
                <div v-for="(col, colIndex) in row"
                  :key="colIndex"
                  :class="`grid-tile`" 
                  :style="`width: ${tileSize}px; height: ${tileSize}px; background: ${col.color}`"
                  >
                </div>
              </div>
              </div>
          </div>
        </div>
      </div>
  </v-card>
      
</template>

<style lang="scss">
  .map-container{
    &.mini{
      position: relative;
      margin: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      .grid-wrap{
        width: 100%;
        height: 100%;
        background: transparent;
      }
      .grid-row{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        background: rgba(255,255,255,.1);
      
      }
      .grid-tile{
        background: transparent;
        box-shadow: 0 0 0 1px black inset;
        
      }
    }
  }
</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['onAction', 'onClose', 'gameData'],
  data() {
    return {
      previewSize: 80,
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
      const {gameData,  previewSize} = this
      const {cols} = gameData.options;
      const tileSize = previewSize / cols;
      const theWidth = tileSize * cols;
      console.log('tileSize', tileSize, theWidth)
      return theWidth
    },
    mapHeight(){
      const {gameData,  previewSize} = this
      const {rows} = gameData.options;
      const tileSize = previewSize / rows;
      const theHeight = tileSize * rows;
      console.log('tileSize', tileSize, theWidth)
      return theHeight
    },
    tileSize(){
      const {gameData,  previewSize} = this
      const {rows} = gameData.options;
      const tileSize = previewSize / rows;
      return tileSize
    },
    tempTileMap(){
      const {gameData} = this;
      
      if(!gameData){return}
      
      const {rows, cols} = gameData.options;
      console.log('rows, cols', rows, cols)
      if(!rows || !cols){
        return
      }
      
      const blankRows = new Array(rows).fill();
      const blankCols = new Array(cols).fill();
      const compiledMap = blankRows.map((_, rowIndex) => {
        const asIndexes = blankCols.map((_, colIndex) => {
          const thislocation = [colIndex, rowIndex].toString();
          const locationTile = gameData.tiles && gameData.tiles.find(tile => tile.location.toString() === thislocation);
          const team = locationTile && locationTile.meta.team;
          return {color: team, index: 0}
          })
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


