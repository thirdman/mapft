<template>
  <v-card outlined elevation="4" class="claim" :class="location ? 'active' : ''" >
      <v-card-title>
        Generate Tile <v-btn @click="onClose">Cancel</v-btn>
      </v-card-title>
      <v-card-text>
        <div class="row claim-row">
          <div class="col col-6 claimCol">existing stats {{location}}
              <v-btn @click="doGeneration(location)">generate</v-btn>
              <v-btn @click="doApply(location)">Apply</v-btn>
              
          </div>
          <div class="col col-6 claimCol">
            <Tile
              size="240"
              :tile="previewTile"
              v-if="previewTile"
              :handleSelect="false"
              :onAction="false"
              />
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
            <v-btn @click="onClose">Cancel</v-btn>
      </v-card-actions>
    </v-card>
</template>

<style lang="scss">


</style>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ['location', 'handleSelect', 'selected', 'index', 'onAction', 'onClose', 'onGenerate'],
  data() {
    return {
      mapString: null,
      previewTile: null,
    };
  },
  created(){
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      gameTeams: "ui/gameTeams",
      tiles: "ui/tiles",
    }),
    
  },

  methods: {
    ...mapMutations({
      setTiles: 'ui/setTiles'
    }),
    doGeneration(location){
      const {tiles} = this;
      this.mapString = null;
      const tempTiles = [...tiles]
      const activeTile = tempTiles && tempTiles.filter(tile => tile.location === location);
      const sourceTile = activeTile[0];
      const tempTile = {
        
        meta: {
          value: 12,
          owner: this.walletAddress,
          attack: null,
          defence: null,
          team: 'Red',
          owner: null,
          creature: null,
        }, 
        canGenerate: false,
        title: 'blah',
        id: "123",
        location: location,
        src: '',
      }
    
      
      const tileArray = ['nw', 'ne', 'sw', 'se', 'n', 'w', 's', 'e', 'dn', 'dw', 'de', 'ds', '00']
      const number = this.random(0, tileArray.length);
      console.log('number', number)
      const el = tileArray[number];
      const string = `https://gateway.pinata.cloud/ipfs/QmTKD3AgeNSo1AGL4rKMX4RhoLNwZ1iXMUcdW75zW5iozc/${el}.png`;
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


