<template>
  <v-card outlined elevation="4" class="claim claim-generate" :class="location ? 'active' : ''" >
      <v-card-title>
        <div class="row">
          <div class="col">
            <span>Generate Tile for location {{location}}</span>
          </div>
          <v-btn plain @click="onClose"><v-icon>mdi-close</v-icon></v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="row claim-row" style="overflow: scroll">
          <div class="col col-6 claimCol">
              <v-btn primary @click="calualateThisTile(location[1], location[0])" v-if="location && location[1]">generate</v-btn>
              <v-btn @click="compileNewTile(location)">compile</v-btn>
              <v-btn @click="doApply(location)">Apply</v-btn>
              <v-btn small @click="calculateIndex">getindex</v-btn>
              <div class="tileGrid">
                <div v-for="(t, i) in demoArray" :key="i" :class="`preview-tile preview${i}` ">
                  <img :src="`https://gateway.pinata.cloud/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/${t}.${t === 0 ? 'jpg' : 'png'}`" width="100px" />
              </div> 
            </div>
            <label>tile map</label>
            {{demoTileMap && demoTileMap.length}}
              <div class="map-grid" v-if="demoTileMap">
              <div v-for="(row, rowIndex) in demoTileMap" :key="rowIndex" class="map-row" >
                <div class="map-col" v-for="(col, colIndex) in row" :key="colIndex">
                  <img :src="`https://gateway.pinata.cloud/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/${col}.${col === 0 ? 'jpg' : 'png'}`" width="100px" />
                  <v-btn x-small @click="calualateThisTile(rowIndex, colIndex)">get {{rowIndex}}, {{colIndex}}</v-btn>
                </div>
              </div>
            </div>
          </div>
          <div class="col col-6 claimCol" >
            <Tile
              size="240"
              :tile="previewTile"
              v-if="previewTile"
              :handleSelect="false"
              :onAction="false"
              />
              <label>New newTileIndex</label>
              <div>{{newTileIndex}}</div>
              
              <label>New Value</label>
              <div>{{newTileValue}}</div>

              <div v-if="newSrc"><img :src="newSrc" width="200px" /></div>
              <!-- <label>All tiles</label>
              <div v-for="(t, i) in tileArray" :key="i">
                {{t}}
                <img :src="`https://gateway.pinata.cloud/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/${t}.${t === 0 ? 'jpg' : 'png'}`" width="200px" />
              </div> -->
              
              
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
            <v-btn @click="onClose">Cancel</v-btn>
      </v-card-actions>
    </v-card>
</template>

<style lang="scss">
.claim{
  
  &.claim-generate{
    width: 700px;
  }
}
.map-grid{
  width: 406px;
  height: 306px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  bordeR: 1px solid brown;
  .map-row{
    bordeR: 1px solid blue;
    height: 100px;
    display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  bordeR: 1px solid violet;

    .map-col{
      width: 100px;
      height: 100px;
      display: block;
      background: lime;
      border-right: 1px solid red;
      border-bottom: 1px solid red;
      position: relative;
      img{
        width: 100%;
      }
      button{
        position: absolute;
        lefT: 0;
        top: 0;
      }
    }
  }
}
.tileGrid{
  width: 304px;
  height: 300px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  div.preview-tile{
    display: block;
    // background: pink;
    position: relative;
    &:not(.preview4){
      opacity: .3;
      &:after{
        content: "";
        position: absolute;
        lefT: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        background: var(--ui-color, #111);
        opacity: .5;
      }
    }
  }
}

</style>

<script>
import { mapMutations, mapGetters } from "vuex";
const tileArray = ['nw', 'ne', 'sw', 'se', 'n', 'w', 's', 'e', 'dn', 'dw', 'de', 'ds', '00']
const tileIndexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

/* This maps the sides that have doors */
const tileSidesMap = {
  0: [0, 0, 0, 0],
  1: [1, 0, 0, 0],
  2: [0, 1, 0, 0],
  3: [1, 1, 0, 0],
  4: [0, 0, 1, 0],
  5: [1, 0, 1, 0],
  6: [0, 1, 1, 0],
  7: [1, 1, 1, 0],
  8: [0, 0, 0, 1],
  9: [1, 0, 0, 1],
  10: [0, 1, 0, 1],
  11: [1, 1, 0, 1],
  12: [0, 0, 1, 1],
  13: [1, 0, 1, 1],
  14: [0, 1, 1, 1],
  15: [1, 1, 1, 1],
};

const indexMap = {
'00': 15,
'nw': 20,
'ne': 80,
'sw' : 5,
'se': 99,
'n': 1,
'e': 2,
's': 4,
'w': 8,
'dn': 99,
'dw': 99,
'de': 99,
'ds': 99,
'v': 5,
'h': 10,
'ground': 0
}

// demoTileMap: [
//         [6, 14, 14, 12],
//         [5, 1, 7, 0],
//         [3, 10, 0, 0], // 11
//       ],
export default {
  props: ['location', 'handleSelect', 'selected', 'index', 'onAction', 'onClose', 'onGenerate'],
  data() {
    return {
      mapString: null,
      previewTile: null,
      tileArray: tileIndexArray,
      newNumber: null,
      newSrc: null,
      demoArray: null,
      demoTileMap: null,
      newTileValue: null,
      newTileIndex: null,
    };
  },
  created(){
    console.log('this getter tilemap: ', this.tileMap);
    this.demoTileMap = this.tileMap
    if(!location){return}
    console.log('created', this.location)
    this.calualateThisTile(this.location[1], this.location[0]); // inverted due to coords being x, y
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      gameTeams: "ui/gameTeams",
      tiles: "ui/tiles",
      tileMap: "ui/tileMap",
    }),
    
  },

  methods: {
    ...mapMutations({
      setTiles: 'ui/setTiles'
    }),
    getIndex(name){
      const index = indexMap[name]

    },
    calualateThisTile(row, col){
      const tileMap = this.tileMap
      if(!tileMap){
        console.log('no tile map')
        return
      }
      const tempTileValue = this.random(5, 30, false);
      const thisTile = tileMap[row][col];
      console.log('thisTile', thisTile);
      console.log('tileMap.length', tileMap.length);
      const notFirstRow = row > 0;
      const notLastCol = col <  tileMap[row].length - 1;
      const notLastRow = row <  tileMap.length - 1;
      const notFirstCol = col > 0;
      const north = notFirstRow ? tileMap[row - 1][col] : false;
      const east = notLastCol ? tileMap[row][col +1] : false;
      const south = notLastRow ? tileMap[row + 1][col] : false;
      const west = notFirstCol ? tileMap[row][col - 1] : false;
      console.log('north', north);
      console.log('east',  east);
      console.log('south',  south);
      console.log('west',  west);
      const northSides = north && tileSidesMap[north] || false;
      const eastSides = east && tileSidesMap[east]  || false;
      const southSides = south && tileSidesMap[south] || false;
      const westSides = west && tileSidesMap[west] || false;
      console.log('thisTile sides', {northSides, eastSides, southSides, westSides});
      /** get the facing (inverse) value for the tiles surrounding */
      /** 
       * check for borders, (if global setting) and set false
       * check for undefined, which means we can randomly choose (lean towards true) sicne the tile is blank
       */
      const northPath = notFirstRow ? (northSides[2] || true) : false;
      const eastPath = notLastCol ? (eastSides[3] || true) : false;
      const southPath = notLastRow ? (southSides[0] || true) : false;
      const westPath = notFirstCol ? (westSides[1] || true) : false;
      console.log('thisTile paths', {northPath, eastPath, southPath, westPath});
      const tileIndex = this.calculateTileIndex(northPath, eastPath, southPath, westPath);
      console.log('tileIndex', tileIndex)
      this.newSrc = `https://gateway.pinata.cloud/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/${tileIndex}.${tileIndex === 0 ? 'jpg' : 'png'}`
      let tempTileMap = tileMap.slice();
      tileMap[row][col] = tileIndex;
      // setTileMap(tempTileMap)
      this.demoTileMap = tempTileMap;
      this.newTileValue = tempTileValue
      this.newTileIndex = tileIndex
      if(tileIndex && tempTileValue){
        this.compileNewTile(location)
      }
    },
    getTile(row, col){
      const tileMap = [
        [6, 0, 0, 0],
        [7, 1, 0, 0],
        [0, 0, 0, 0],
      ];
      const result = tileMap[row][col];
      console.log('result', result, tileMap[row]);
      return result
    },
    
    calculateIndex(){
      // const number = this.random(0, 15, false);
      // const tileMap = [
      //   [1, 1, 1],
      //   [1, 0, 0],
      //   [0, 0, 0],
      // ];
      const hasBorderAbove = this.getTile(2, 0);
      console.log('hasBorderAbove', hasBorderAbove)
      const number = 15;
      this.newNumber = number;
      this.newSrc = `https://gateway.pinata.cloud/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/${number}.${number === 0 ? 'jpg' : 'png'}`
      const tempArray = [0,0,0, 0, number, 0, 0, 0, 0];
      // const nextNumber = this.random(number, 15, false);
      const tile0 = this.calculateTileIndex(false, true, true, false);
      const tile1 = this.calculateTileIndex(false, true, true, true);
      const tile2 = this.calculateTileIndex(false, false, true, true);
      const tile3 = this.calculateTileIndex(true, false, true, false);
      const tile5 = this.calculateTileIndex(true, true, true, false);
      const tile6 = this.calculateTileIndex(true, true, false, false);
      const tile7 = this.calculateTileIndex(false, true, false, true);
      const tile8 = this.calculateTileIndex(true, true, false, true);
      
      tempArray[0] = tile0;
      tempArray[1] = tile1;
      tempArray[2] = tile2;
      tempArray[3] = tile3;
      tempArray[5] = tile5;
      tempArray[6] = tile6;
      tempArray[7] = tile7;
      tempArray[8] = tile8;
      console.log('tile0', [tile0, tile1])

      this.demoArray = tempArray;
      
    },
    calculateTileIndex(north, east, south, west) { 
      var sum = 0; 
      if (north) sum += 1; 
      if (east) sum += 2; 
      if (south) sum += 4; 
      if (west) sum += 8; 
      return sum; 
    },
    // drawTile(context, tileIndex, x, y) { 
    //   xStart = tileIndex * xTileSize; 
    //   context.drawImage(sheetImage, 
    //   // source rectangle xStart, 0, xTileSize, yTileSize, 
    //   // destination x, y, xTileSize, yTileSize 
    //   ); 
    // };

    compileNewTile(location){
      const {tiles, newTileValue, newTileIndex} = this;
      this.mapString = null;
      const tempTiles = [...tiles]
      const activeTile = tempTiles && tempTiles.find(tile => tile.location === location);
      // const sourceTile = activeTile[0];
      const tempTile = {
        meta: {
          value: newTileValue,
          owner: this.walletAddress,
          attack: null,
          defence: null,
          team: null,
          owner: null,
          creature: null,
        }, 
        index: newTileIndex,
        location: location,
        canGenerate: false,
        title: 'blah',
        id: "123",
        src: '',
      }
    
      const string = `https://gateway.pinata.cloud/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/${newTileIndex}.png`;
      tempTile.src = string;
      console.log('tempTile', tempTile)
      this.mapString = string
      this.previewTile = tempTile
    },
    doApply(location){
      const {tiles, previewTile} = this;
      const tempTiles = tiles.slice();
      const theIndex = tempTiles.findIndex(tile => tile.location === location);
      tempTiles[theIndex] = previewTile;
      
      this.setTiles(tempTiles);
      console.log('this.tiles', this.tiles)
      this.mapString = null;
      this.previewTile = null;
      this.onClose()
    },
    random(min, max, float = false) {
      const val = Math.random() * (max - min) + min;
      if (float) {
        return val;
      }
      return Math.floor(val);
    },
    
  },
};
</script>


