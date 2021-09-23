<template>
  <v-card outlined elevation="4" class="claim claim-generate" :class="location ? 'active' : ''" >
      <v-card-title>
        <div class="row ma-0">
          <div class="col pa-0">
            <span>Generate Tile for location {{location}}</span>
          </div>
          <v-btn plain @click="onClose"><v-icon>mdi-close</v-icon></v-btn>
        </div>
      </v-card-title>
      <v-divider class="ma-0" />
      <v-card-text>
        <div class="row claim-row" style="overflow: scroll">
          <div class="col col-6 claimCol">
            <div class="row">
              <div class="col d-flex justify-center">
                <Loading v-if="status === 'working'" message="Working..." />
              </div>
            </div>
            <div class="row" v-if="status !== 'working'">
              <div class="col">
                <p class="text-body-2">
                  Generating will create a matching tile, but cost you points
                </p>
                <p class="text-body-2">
                  Unknown tile areas have a 75% chance of being conneted;
                </p>
                <p>Your points: {{userPoints}}</p>
                <p>Generation Cost: 12</p>
                  <v-btn block class="primary" @click="calualateThisTile(location[1], location[0])" v-if="!previewTile && location">Generate</v-btn>
              </div>
            </div>
            <div v-if="requiredPaths && devMode">
              <div v-for="(path, i) in requiredPaths" :key="i">
                {{path}},
              </div>
            </div>
            <div class="tileGrid">
              <div v-for="(t, i) in demoArray" :key="i" :class="`preview-tile preview${i}` ">
                <img :src="`https://gateway.pinata.cloud/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/${t}.${t === 0 ? 'jpg' : 'png'}`" width="100px" />
              </div> 
            </div>
            <div v-if="devMode">
            <label>tile map</label>
            {{demoTileMap && demoTileMap.length}}
              <div class="map-grid" v-if="demoTileMap">
                <div v-for="(row, rowIndex) in demoTileMap" :key="rowIndex" class="map-row" >
                  <div class="map-col" v-for="(col, colIndex) in row" :key="colIndex">
                    <img
                    :src="`https://gateway.pinata.cloud/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/${col}.${col === 0 ? 'jpg' : 'png'}`"
                    width="60px"
                    v-if="col"
                    />
                    <div v-else class="emptyImage">
                      
                    </div>
                    <v-btn x-small @click="calualateThisTile(rowIndex, colIndex)">get {{rowIndex}}, {{colIndex}}</v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col col-6 claimCol" >
            <div class="row">
              <div class="col d-flex justify-center">
                <Loading v-if="status === 'working'" message="Working..." />
              </div>
            </div>
            <div  v-if="previewTile && status !== 'working'">
            <Tile
              size="240"
              :tile="previewTile"
              v-if="previewTile && status !== 'working'"
              :handleSelect="false"
              :onAction="false"
              />
              <div class="row">
                <div class="col">
                  <label>index</label>
                  <div>{{newTileIndex}}</div>
                </div>
                <div class="col">
                  <label>New Value</label>
                  <div>{{newTileValue}}</div>
                </div>
              </div>
            </div>
            <div v-if="devMode && newSrc && status !== 'working'"><img :src="newSrc" width="200px" /></div>  
          </div>
        </div>
      </v-card-text>
      <v-divider class="ma-0" />
      <v-card-actions>
        <v-btn class="primary" @click="doApply(location)" :disabled="!previewTile">Apply</v-btn>
        <v-btn outlined @click="onClose">Cancel</v-btn>
        <v-btn outlined @click="doTimer" v-if="devMode">do Timer</v-btn>
        <v-btn @click="calualateThisTile(location[1], location[0])" v-if="previewTile && location">Regenerate</v-btn>
        <v-btn @click="compileNewTile(location)" v-if="devMode">compile</v-btn>      
        <v-btn small @click="calculateIndex" v-if="devMode">getindex</v-btn>
              
      </v-card-actions>
    </v-card>
</template>

<style lang="scss">
.claim{
  &.claim-generate{
    width: 700px;
    .v-card__text{
      overflow: scroll;
      // height: calc(500px - 2rem - 2rem);
      height: calc(500px - 68px - 68px);
    }
  }
}
.map-grid{
  width: 244px;
  height: 184px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  
  .map-row{
    height: 60px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    

    .map-col{
      width: 60px;
      height: 60px;
      display: block;
      position: relative;
      img{
        width: 100%;
      }
      .emptyImage{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.2);
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
import { dialog } from '@devlop-ab/dialog';
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
      devMode: false,
      status: 'loading',
      mapString: null,
      previewTile: null,
      tileArray: tileIndexArray,
      newNumber: null,
      newSrc: null,
      demoArray: null,
      demoTileMap: null,
      newTileValue: null,
      newTileIndex: null,
      generationCost: 12,
      requiredPaths: null,
    };
  },
  created(){
    console.log('this getter tilemap: ', this.tileMap);
    this.demoTileMap = this.tileMap
    if(!location){return}
    // console.log('created', this.location)
    // this.calualateThisTile(this.location[1], this.location[0]); // inverted due to coords being x, y
    // this.status = "working";
    // this.doTimer()
  },
  mounted(){
    this.status = "ready";
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      gameTeams: "ui/gameTeams",
      // tiles: "ui/tiles",
      tileMap: "ui/tileMap",
      userPoints: "ui/userPoints",
      activeGame: "ui/activeGame",
    }),
    
    tiles(){
      const {activeGame} = this;
      const {tiles} = activeGame;
      console.log('activeGame', activeGame, tiles)
      return tiles;
    }
  },

  methods: {
    ...mapMutations({
      // setTiles: 'ui/setTiles',
      setUserPoints: 'ui/setUserPoints',
    }),
    doTimer(){
      const delayAmount = 500
      this.status = 'working';
      setTimeout(() => {
        this.status = 'completed';
        }, delayAmount);
    },
    calualateThisTile(row, col){
      const tileMap = this.tileMap
      const {userPoints, generationCost} = this;
      
      if(!tileMap){
        console.log('no tile map')
        return
      }
      if(!userPoints || userPoints < generationCost) {
        console.log('userPoints < generationCost', userPoints , generationCost)
        dialog.alert(`Not Enough Points (${userPoints})`,  {
          title: 'Oops',
        })
        return
      }
       console.log('tileMap', tileMap);
      if(!tileMap[row]){
        alert('missing tolemap 0');
        return
      }
      const tempTileValue = this.random(5, 30, false);
      const thisTile = tileMap[row][col];
      console.log('thisTile', thisTile);
      console.log('tileMap.length', tileMap.length);
      
      // const notFirstRow = row > 0;
      // const notLastCol = col <  tileMap[row].length - 1;
      // const notLastRow = row <  tileMap.length - 1;
      // const notFirstCol = col > 0;
      // const north = notFirstRow ? tileMap[row - 1][col] : 'unknown';
      // const east = notLastCol ? tileMap[row][col +1] : 'unknown';
      // const south = notLastRow ? tileMap[row + 1][col] : 'unknown';
      // const west = notFirstCol ? tileMap[row][col - 1] : 'unknown';
      // console.log('north', north);
      // console.log('east',  east);
      // console.log('south',  south);
      // console.log('west',  west);
      // const northSides = north && tileSidesMap[north] || false;
      // const eastSides = east && tileSidesMap[east]  || false;
      // const southSides = south && tileSidesMap[south] || false;
      // const westSides = west && tileSidesMap[west] || false;
      // console.log('thisTile sides', {northSides, eastSides, southSides, westSides});
      
      const isPossibleNorth = this.determinePossible({direction: 'north', row, col, tileMap});
      const isPossibleEast = this.determinePossible({ direction: 'east', row, col, tileMap});
      const isPossibleSouth = this.determinePossible({ direction: 'south', row, col, tileMap});
      const isPossibleWest = this.determinePossible({ direction: 'west', row, col, tileMap});
      // const northPath = notFirstRow ? (northSides[2] || false) : false;
      // const eastPath = notLastCol ? (eastSides[3] || false) : false;
      // const southPath = notLastRow ? (southSides[0] || false) : false;
      // const westPath = notFirstCol ? (westSides[1] || false) : false;
      // this.requiredPaths = [northPath, eastPath, southPath, westPath];
      // console.log('requiredSides', {northSides, eastSides, southSides, westSides});
      // console.log('requiredPaths', {northPath, eastPath, southPath, westPath});
      console.log('possibles', {isPossibleNorth, isPossibleEast, isPossibleSouth, isPossibleWest});
      const tileIndex = this.calculateTileIndex(isPossibleNorth, isPossibleEast, isPossibleSouth, isPossibleWest);
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
        const newPoints  = userPoints - generationCost;
        this.setUserPoints(newPoints)
      }
      this.doTimer()
    },
    determinePossible(options){
      const {direction, row, col, tileMap} = options;
      if(!tileMap){return}
      /** possible outcomes: generatable, true, false */
      console.log('options', options);
      const totelRows = tileMap[0].length;
      const totelCols = tileMap.length;
      const isFirstRow = row === 0;
      const isLastCol = col ===  totelRows - 1;
      const isLastRow = row ===  totelCols - 1;
      const isFirstCol = col === 0;
      console.log({totelRows, totelCols, isFirstRow, isLastRow, isFirstCol, isLastCol})
      /** CHeck For Edges of Map */
      if(direction === 'north' && isFirstRow){
        return false;
      }
      if(direction === 'east' && isLastCol){
        return false;
      }
      if(direction === 'south' && isLastRow){
        return false;
      }
      if(direction === 'west' && isFirstCol){
        return false;
      }
      /** CHeck For existence of tile 
       * In this situation, the tile can have an index, which represents a tile.
       * we look for null or undefined, which means the tile is empty but can exist in the future.
      */
     // let targetTileSides;
    // const targetE = tileMap[row][col +1];
    // const targetS = tileMap[row + 1][col];
    // const targetW = tileMap[row][col - 1];
      let targetIsGeneratable = false;
      const mapInverseDirections = {
        'north' : 2,
        'east' : 3,
        'south' : 0,
        'west' : 1,
      }
      // const mapTargetLocations = {
      //   'north' : tileMap[row - 1][col],
      //   'east' : tileMap[row][col +1],
      //   'south' : tileMap[row + 1][col],
      //   'west' : tileMap[row][col - 1],
      // }
      const invertDirection = mapInverseDirections[direction];
      console.log('invertDirection', invertDirection)
      let target;
        /** gets the image index in the target direction */
      if(direction === 'north'){
        target = tileMap[row - 1][col];
      }
      if(direction === 'east'){
        target = tileMap[row][col +1];
      }
      if(direction === 'south'){
        target = tileMap[row + 1][col];
      }
      if(direction === 'west'){
        target = tileMap[row][col - 1];
      }
      console.log('target', target)
      const targetTileSides = tileSidesMap[target];
      console.log('targetTileSides', targetTileSides)
      if(!targetTileSides){
        console.log('tile is not generated yet');
        targetIsGeneratable = true;
        // return 'generate'
      } else {
        const hasPath = targetTileSides[invertDirection] === 1 ? true : false; // gets the matching edge (clockwise 0, 1, 2, 3)
        console.log('hasPath', hasPath)
        return hasPath;
      }
      console.log('targetIsGeneratable', targetIsGeneratable);
      if(targetIsGeneratable){
        return this.generateUnknownDirection(75);
      }
      /**if we get here somethign is missing */
      console.error('how did we get here?');
      return false;
    },
    generateUnknownDirection(percent = 75){
      /** isf less than 75% then make a path */
      const number = this.random(0, 100, false);
      console.log('isGeneratable number', number)
      return number < percent;
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

    compileNewTile(){
      const {tiles, newTileValue, newTileIndex, location} = this;
      
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
        title: 'blah',
        id: "123",
        src: '',
      }
    
      const string = `https://gateway.pinata.cloud/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/${newTileIndex}.png`;
      tempTile.src = string;
      console.log('compileNewTile tempTile', tempTile)
      this.mapString = string
      this.previewTile = tempTile
    },
    doApply(location){
      const {tiles, previewTile} = this;
      const tempTiles = tiles.slice();
      const theIndex = tempTiles.findIndex(tile => tile.location === location);
      tempTiles[theIndex] = previewTile;
      // this.setTiles(tempTiles);      
      this.onGenerate(location, previewTile);
      this.mapString = null;
      this.previewTile = null;
      // this.onClose()
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


