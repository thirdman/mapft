<template>
  <v-card outlined elevation="4" class="claim claim-generate" :class="location ? 'active' : ''" 
  :style="`visibility: ${displayMode};` "
  v-if="!immediate"
  >
      <v-card-title>
        <div class="row ma-0">
          <div class="col pa-0">
            <span>Generate Tile for location {{location}}</span>
            <span v-if="devMode" class="mode-tag">{{mapMode}} </span>
            <span v-if="devMode" class="exists-tag">Exists: {{tileExists ? 'yes' : 'no'}} </span>
            
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
            <div class="debug-box"  v-if="devMode && (possibles || cardinals)" > 
              <div v-if="possibles" class="possible-box">
                <div v-for="(possible, i) in possibles" :key="i" :class="`possible-${i}`">
                  {{possible}}
                </div>
              </div>
              <div v-if="cardinals" class="cardinal-box">
                <div v-for="(cardinal, index) in cardinals" :key="index" :class="`cardinal cardinal-${index}`">
                  <v-icon x-small :color="cardinal ? 'lime' : 'red'">{{cardinal ? 'mdi-check' : 'mdi-close'}}</v-icon>
                </div>
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
            <div v-if="devMode && newTileSrc && status !== 'working'"><img :src="newTileSrc" width="200px" /></div>  
          </div>
        </div>
      </v-card-text>
      <v-divider class="ma-0" />
      <v-card-actions>
        <v-btn class="primary" @click="doApply(location)" :disabled="!previewTile">Apply</v-btn>
        <v-btn text @click="onClose">Cancel</v-btn>
        <v-btn outlined @click="doTimer" v-if="devMode">do Timer</v-btn>
        <v-btn @click="calualateThisTile(location[1], location[0])" v-if="previewTile && location">Regenerate</v-btn>
        <v-btn @click="forceCalculate({south: true, east: false, north: false, west: false})" v-if="devMode">Force genrate</v-btn>
        <!-- <v-btn @click="compileNewTile(location)" v-if="devMode">compile</v-btn>       -->
        <!-- <v-btn small @click="calculateIndex" v-if="devMode">getindex</v-btn> -->
        <!-- <v-btn small @click="handleTest" v-if="devMode">handleTest</v-btn> -->
              
      </v-card-actions>
    </v-card>
</template>

<style lang="scss">
.mode-tag, .exists-tag{
  background: rgb(12, 165, 12);
  padding: 2px 4px;
  border-radius: 4px;
  font-size: .675rem;
  font-weight: bold;
}
.exists-tag{
  background: violet;
}
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
.debug-box{
  width: 100px;
  height: 100px;
  margin-left: 50px;
  position: relative;
  background: #222;
  border: 1px dashed #444;
  border-radius: 1rem;
  
}
.possible-box, .cardinal-box{
  // width: 100px;
  // height: 100px;
  // margin-left: 50px;
  // position: relative;
  // background: #444;
  > div{
    font-size: .75rem;
    background: #444;
    width: 50px;
    text-align: center;
    padding-top: .25rem;
    padding-bottom: .25rem;
    border-radius: .25rem;
    &:nth-child(1){
      position: absolute;
      left: 25px;
      top: -1rem;
    }
    &:nth-child(2){
      position: absolute;
      left: 75px;
      top: 40px;
    }
    &:nth-child(3){
      position: absolute;
      left: 25px;
      top: 90%;
    }
    &:nth-child(4){
      position: absolute;
      left: -25px;
      top: 40px;
    }
  }
}
.cardinal-box{
  
  > div.cardinal{
    margin-top: 1.125rem;
    margin-left: -.5rem;
    background: #333;
    border-radius: 1rem;
    font-size: .75rem;
    padding: 0 4px;
    width: auto;

  }
}
</style>

<script>
import { mapMutations, mapGetters } from "vuex";
import { dialog } from '@devlop-ab/dialog';
import {calculateTile, forceCalculateTile, compileTile} from "../utils/generate"
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

export default {
  props: ['location', 'handleSelect', 'selected', 'index', 'onAction', 'onClose', 'onGenerate', 'tiles', 'gameData', 'immediate'],
  data() {
    return {
      devMode: true,
      displayMode: 'visable',
      status: 'loading',
      mapString: null,
      previewTile: null,
      tileArray: tileIndexArray,
      newNumber: null,
      // newSrc: null,
      demoArray: null,
      demoTileMap: null,
      newTileValue: null,
      newTileIndex: null,
      newTileSrc: null,
      generationCost: 12,
      requiredPaths: null,
      possibles: null,
      cardinals: null,
    };
  },
  created(){
    // console.log('this getter tilemap: ', this.tileMap);
    // this.demoTileMap = this.tileMap
    // if(!location){return}
    // console.log('created', this.location)
    // this.calualateThisTile(this.location[1], this.location[0]); // inverted due to coords being x, y
    // this.status = "working";
  },
  mounted(){
    const {immediate, location, previewTile} = this;
    if(immediate && location){
      this.displayMode = 'hidden';
      const newTile = this.calualateThisTile(location[1], location[0]);
      console.log('mounted, does preview TIle existss', newTile)
      if(newTile){
        this.doApply(location);
      }
    }
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
      defaultTile: "ui/defaultTile",
    }),
    mapMode(){
      const {gameData} = this;
      return gameData.options.mapMode
    },
    tileExists(){
      const {location, gameData, mapMode} = this;
      const {tiles} = gameData;
      if(mapMode === 'explore'){
        const tile = tiles.find(tile => tile.location.toString() === location.toString());
        // console.log('tile exists', 'explore', tile)
        return tile ? true : false
      } else {
        const tile = tiles.find(tile => tile.location.toString() === location.toString());
        // console.log('tile exists', tile)
        return tile ? true : false
      }
    }
    
    // tiles(){
    //   const {activeGame} = this;
    //   const {tiles} = activeGame;
    //   console.log('activeGame', activeGame, tiles)
    //   return tiles;
    // }
  },

  methods: {
    ...mapMutations({
      // setTiles: 'ui/setTiles',
      setUserPoints: 'ui/setUserPoints',
    }),
    doTimer(){
      const delayAmount = 300
      this.status = 'working';
      setTimeout(() => {
        this.status = 'completed';
        }, delayAmount);
    },
    forceCalculate(directions){
      console.log('directions', directions)
      const newThing = forceCalculateTile({directions});
      console.log('new thing', newThing);

      /** TODO
       * add row/col to tilemap
       * add to tiles?
       * re-save tiles on apply?
       */
    },
    calualateThisTile(row, col){
      // const tileMap = this.tileMap;
      // const tiles = this.tiles;
      const {userPoints, generationCost, location, walletAddress, gameData} = this;
      const {tiles, tileMap, options, mapGrid} = gameData;
      const {mapMode, useMapGrid} = options
      const {tileExists} = this;
      console.log('mapMode', mapMode, tileExists);
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
      if(!tileMap[row] && mapMode !== 'explore'){
        alert('missing tolemap 0');
        console.log('mapMode', mapMode)
        return
      }
      if(mapMode === 'explore'){
        console.log('mapMode', mapMode)
        // return
      }
      
      
      const tempTileValue = this.random(5, 30, false);
      const newTileImageData = calculateTile(
        {
          location, 
          tileMap, 
          includeContext: true, 
          settings: gameData.settings || {}, 
          tiles, 
          mapGrid,
          useMapGrid
          });
      let tempTileMap = tileMap.slice();
      // const thisTile = tileMap[row][col];
      // console.log('thisTile', thisTile);
      // console.log('tileMap.length', tileMap.length);
      // const isPossibleNorth = this.determinePossible({direction: 'north', row, col, tileMap});
      // const isPossibleEast = this.determinePossible({ direction: 'east', row, col, tileMap});
      // const isPossibleSouth = this.determinePossible({ direction: 'south', row, col, tileMap});
      // const isPossibleWest = this.determinePossible({ direction: 'west', row, col, tileMap});
      // console.log('possibles', {isPossibleNorth, isPossibleEast, isPossibleSouth, isPossibleWest});
      // const tileIndex = this.calculateTileIndex(isPossibleNorth, isPossibleEast, isPossibleSouth, isPossibleWest);
      // console.log('tileIndex', tileIndex)
      // this.newSrc = `https://gateway.pinata.cloud/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/${tileIndex}.${tileIndex === 0 ? 'jpg' : 'png'}`
      
      
      // tileMap[row][col] = tileIndex;
      // setTileMap(tempTileMap)

      const {tileImageIndex, imageSrc, possibles, cardinals} = newTileImageData;
      
      this.possibles = possibles;
      this.cardinals = cardinals;
      this.demoTileMap = tempTileMap;
      this.newTileValue = tempTileValue
      this.newTileIndex = tileImageIndex;
      this.newTileSrc = imageSrc;
      const dataObj = {
        newTileValue: tempTileValue,
        newTileIndex: tileImageIndex,
        newTileSrc: imageSrc,
        location,
        tiles,
        walletAddress,
        
      }
      const newTile = compileTile(dataObj)
      console.log('newTileImageData', newTileImageData, newTile);
      // this.previewTile = tempTile;
      if(newTile){
        this.previewTile = newTile
        // this.compileNewTile(location)
        const newPoints  = userPoints - generationCost;
        this.setUserPoints(newPoints)
        return newTile;
      }
      this.doTimer()
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


