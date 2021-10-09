<template>
  <v-dialog
      v-model="showDialog"
      width="700"
      scrollable
    >
    <v-card class="new-game-settings">
      <v-card-title class="text-h5 ">
          New Game
      </v-card-title>
        <v-card-text>
        <div class="row" v-if="devMode">
          <div class="col">
            <label>load game </label>
            <div>
              
              <v-switch
                v-model="loadGame"
                :label="`${loadGame ? 'Yes' : 'no'}`"
                v-tooltip="`Load Game on generate`"
              ></v-switch>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Teams</label>
            <div>
              <div class="text-body-2">
              Use Default Teams
              </div>
              <v-switch
                disabled
                v-model="optionUseDefault"
                :label="`${optionUseDefault ? 'Yes' : 'no'}`"
                v-tooltip="`Coming Soon`"
              ></v-switch>
            </div>
          </div>
          <div class="col">
            <label>Starting Positions</label>
            <div>
              <div class="text-body-2">
              Generate starting positions
              </div>
              <v-switch
                v-model="useStartPoints"
                :label="`${useStartPoints ? 'Yes' : 'no'}`"
                v-tooltip="`Coming Soon`"
              ></v-switch>
            </div>
          </div>
          
          <div class="col">
          <label>Players</label>
            <div>
              <div class="text-body-2">
              Show Player Locations
              </div>
              <v-switch
                disabled
                v-model="optionUsePlayerUnits"
                :label="`${optionUsePlayerUnits ? 'Yes' : 'no'}`"
                v-tooltip="`Coming Soon`"
              ></v-switch>
            </div>
          </div>
        </div>
      <div class="row" v-if="devMode">
        <!-- <div class="col">
            <div>
              <label>Map</label>
              <div class="text-body-2">
              Expandable Map
              </div>
              <v-switch
                v-model="optionMapExpandable"
                :label="`${optionMapExpandable ? 'Yes' : 'no'}`"
                v-tooltip="`Can players expand the map in any direction?`"
              ></v-switch>
            </div>
        </div> -->
        <!-- <div class="col">
            <label>Exploration</label>
            <div class="text-body-2">
              Tiles Start Hidden
              </div>
            <div>
              <v-switch
                v-model="generateMap"
                :label="`${generateMap ? 'yes' : 'no'}`"
              ></v-switch>
            </div>  
        </div> -->
        <div class="col">
            <label>Exploration</label>
            <div class="text-body-2">
              Explored Tiles must be adjacent.
              </div>
            <div>
              <v-switch
                v-model="optionMapAdjacent"
                :label="`${optionMapAdjacent ? 'yes' : 'no'}`"
              ></v-switch>
            </div>  
        </div>
        <div class="col">
            <label>Tile Set Limit</label>
            <div class="text-body-2">
              Limit available tiles to set.
              </div>
            <div>
              <v-switch
                v-model="optionUseLimitedTileSet"
                :label="`${optionUseLimitedTileSet ? 'yes' : 'no'}`"
              ></v-switch>
            </div>  
        </div>
      </div>
      <v-divider />
        <div class="row">
          <div class="col">
            <label >Map Mode</label>
            <v-btn-toggle
                mandatory
                dense
              >
                <v-btn
                  @click="() => this.optionMapMode = 'explore'"
                  x-small
                  v-tooltip="`Expand map by placing tiles`" :color="optionMapMode === 'explore' ? 'primary' : ''">
                  Explore
                </v-btn>
                <v-btn
                  @click="() => this.optionMapMode = 'hidden'"
                  x-small
                  v-tooltip="`Fixed map size with hidden tiles.`" :color="optionMapMode === 'hidden' ? 'primary' : ''">
                  Hidden
                </v-btn>
                <v-btn
                  @click="() => this.optionMapMode = 'static'"
                  x-small v-tooltip="`Visible Fixed Map.`"
                  :color="optionMapMode === 'static' ? 'primary' : ''">
                  Static
                </v-btn>
              </v-btn-toggle>
              <div class="py-1 text-body-2 support-text" v-if="optionMapMode === 'explore'">Expand map by placing tiles. Linited by the number of tiles available.</div>
              <div class="py-1 text-body-2 support-text" v-if="optionMapMode === 'hidden'">Fixed size map, tiles initially hidden from players.</div>
              <div class="py-1 text-body-2 support-text" v-if="optionMapMode === 'static'">Fixed size map, tiles visible to players.</div>
              <div class="optional">
                <v-btn small outlined @click="() => {useMapGrid = !useMapGrid}">{{useMapGrid ? 'Hide' : 'Use'}} Map Grid</v-btn>
              </div>
              <div v-if="useMapGrid">
                <textarea
                  max="999"
                  name="Code"
                  class="base-input code-input"
                  type="string"
                  placeholder=""
                  v-model="mapGrid"
                  rows="10"
                ></textarea>
                <v-btn small outlined @click="applyMapGrid">Apply</v-btn>
              </div>
          </div>
        </div>
      <div class="row">
        <div class="col">
          <label>Rows</label>
        </div>
        <div class="col">
          <label>Columns</label>
        </div>
        <div class="col" style="flex-basis: 300px; flex-grow: 0; flex-shrink: 0;">
          <label>Preview</label>
        </div>
      </div>
      
      <div class="row">
        <div class="col">
          <div class="row ma-0 f-flex align-center">
            <v-btn text x-small outlined @click="removeRow"> - 1</v-btn>
            <div class="feature">{{newRows}}</div>
            <v-btn text x-small outlined @click="addRow"> + 1</v-btn>
          </div>
        </div>
        <div class="col">
          <div class="row ma-0 f-flex align-center">
            <v-btn text x-small outlined @click="removeCol"> - 1</v-btn>
            <div class="feature">{{newCols}}</div>
            <v-btn text x-small outlined @click="addCol"> + 1</v-btn>
          </div>
        </div>
        <div class="col" style="flex-basis: 300px; flex-grow: 0; flex-shrink: 0;">
          <map-preview :rows="newRows" :cols="newCols" />
        </div>
      </div>
      <div class="row">
          <div class="col">
            <label >Map Style</label>
            <tile-set-select :selected="tileSetId" :onAction="setTileSet" v-if="tileSets" />
            <!-- <div v-if="tileSets">
              <div v-for="(set, i) in tileSets" :key="i">
                <v-btn small :color="set.id === tileSetId ? 'primary' : '' " @click="() => setTileSet(set.id)">{{set.name}}{{set.id}}</v-btn>
              </div>
            </div> -->
            <!-- <v-btn-toggle
                v-model="toggle_tileset"
                mandatory
                dense
              >
                <v-btn x-small v-tooltip="`Basic dungeon rooms (16 variations)`" :color="toggle_tileset === 0 ? 'primary' : ''">
                  Default
                </v-btn>

                <v-btn  x-small disabled v-tooltip="`Coming Soon`">
                  Castle
                </v-btn >

                <v-btn x-small disabled v-tooltip="`Coming Soon: Upload your own style`">
                  Custom
                </v-btn>
              </v-btn-toggle> -->
          </div>
        </div>
      <v-divider />
      <div class="row" >
        <div class="col ">
          <label>Title</label><br />
            <v-text-field small filled clearable outlined dense v-model="gameTitle" hint="Name for easy identification">
          </v-text-field>
        </div>
      </div>
      <v-divider />
      
      <div class="row">
        <div class="col">
          <label >Loot</label>
          <div class="text-body-2">Loot Tiles?</div>
              <!-- v-model="toggle_mechanic" -->
            
          <v-switch
              v-model="optionUseLootGeneration"
              :label="`${optionUseLootGeneration ? 'Yes' : 'no'}`"
              v-tooltip="`Assign loot rewards to tiles`"
            ></v-switch>
            <v-text-field v-model="optionLootCount" v-if="devMode"/>
        </div>
        <div class="col">
          <label >Creatures</label>
          <div class="text-body-2">Assign Creatures</div>
              <!-- v-model="toggle_mechanic" -->
            
            <v-switch
                v-model="optionUseCreatureGeneration"
                :label="`${optionUseCreatureGeneration ? 'Yes' : 'no'}`"
                v-tooltip="`Assign Creatures to tiles`"
              ></v-switch>
              <v-text-field v-model="optionCreatureCount" v-if="devMode" />
        </div>
      </div>
      <div class="row" v-if="devMode">
        <div class="col">
          <label >Mechanic</label>
          <div class="text-body-2">How will this game work?</div>
          <v-btn-toggle
              v-model="toggle_mechanic"
              mandatory
              dense
            >
              <v-btn x-small v-tooltip="`Control the entire board.`" :color="toggle_mechanic === 0 ? 'primary' : ''">
                Conquest
              </v-btn>

              <v-btn  x-small disabled v-tooltip="`Coming Soon: Capture opponent team tile`">
                Capture the Flag
              </v-btn >

              <v-btn  disabled x-small v-tooltip="`Coming Soon: Leading team after timeframe.`">
                Timed
              </v-btn>

              <v-btn x-small disabled v-tooltip="`Coming Soon: Most value Explorred Tiles`">
                Exploration
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>


        </div>
        
        
        </v-card-text>
        <v-divider class="ma-0"></v-divider>
        <v-card-actions >
          <v-btn class="primary" @click="onAction(compiledOptions)">New Game</v-btn>
          <v-spacer></v-spacer>
            <v-btn depressed text @click="onClose(null)">cancel</v-btn>
        </v-card-actions>
        <!-- <v-toolbar flat>
          <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon class="heading grey--text text--darken-4">close</v-icon>
          </v-btn>
        </v-toolbar> -->
      </v-card>
    </v-dialog>


</template>

<style lang="scss">
  .new-game-settings{

  }
  
  .support-text{
    font-style: italic;
    opacity: .8;
    font-size: .675rem;
  }
  .code-input{
    border: 1px solid var(--line-color);
    background: #222;
    color: #eee;
    font-family: monospace;
  }
</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import MapPreview from './MapPreview.vue';
import TileSetSelect from './TileSetSelect.vue';
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
// const defaultCode = `0 0 0 0 0
// 0 1 1 0 1
// 0 1 0 2 1
// 0 2 1 1 0
// 0 1 3 1 0
// 0 0 0 0 0`
const defaultCode = `[
  ['0', '0', '0', '0', '0'],
  ['0', '1', '1', '0', '1'],
  ['0', '1', '0', '2', '1'],
  ['0', '2', '1', '1', '0'],
  ['0', '1', '3', '1', '0'],
  ['0', '0', '0', '0', '0']
]`
export default {
  components: { MapPreview, TileSetSelect },
  props: ['onAction', 'onClose', 'show', 'rows', 'cols'],
  data() {
    return {
      showDialog: true,
      loadGame: true,
      useMapGrid: false,
      useStartPoints: false,
      mapGrid: defaultCode,
      newRows: 3,
      newCols: 4,
      generateMap: false,
      optionMapAdjacent: false,
      optionUseDefault: true,
      optionUsePlayerUnits: false,
      optionUseLimitedTileSet: false,
      optionUseLootGeneration: true,
      optionLootCount: 3,
      optionUseCreatureGeneration: true,
      optionCreatureCount: 3,
      optionMapExpandable: true,
      optionMapMode: 'explore',
      gameTitle: "New Game",
      toggle_mechanic: null,
      tileSetId: 'QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me',
      toggle_tileset: 0,
    };
  },
  created(){
    const nameConfig = {
      dictionaries: [adjectives, colors, animals],
      separator: "-",
    };
    const randomName = uniqueNamesGenerator(nameConfig); // big_red_donkey
    console.log("random.name", randomName);
    this.gameTitle = randomName;
  },
  mounted(){
    
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      tileSets: "ui/tileSets",
      devMode: "ui/devMode",
    }),
    compiledOptions(){
      const {
        newRows, 
        newCols, optionUseDefault, optionMapMode, generateMap, walletAddress, tileSetId, gameTitle, optionUseLootGeneration,
        optionLootCount, 
        optionUseCreatureGeneration,
        optionCreatureCount,
        useMapGrid,
        mapGrid,
        useStartPoints,
        } = this
      const options = {
        rows: newRows, 
        cols: newCols, 
        optionUseLootGeneration,
        optionLootCount,
        optionUseCreatureGeneration,
        optionCreatureCount,
        useDefaultTeams: optionUseDefault, generateMap, owner: walletAddress, mapMode: optionMapMode, tileSetId, 
        title: gameTitle,
        useStartPoints,
        useMapGrid: useMapGrid,
        mapGrid: mapGrid,
        loadGame: this.loadGame,
        useEdgePoints: optionMapMode !== 'explore',
        }
      return options;
    }
  },

  methods: {
    ...mapMutations({
      // setIntroRead: "ui/setIntroRead",
    }),
    ...mapActions({
      arrayFromMapGrid: "ui/arrayFromMapGrid",
    }),
    addRow(){
      this.newRows = this.newRows + 1;
    },
    removeRow(){
      if(this.newRows === 1){
        alert('Cannot be less than 1');
        return
      }
      else {
        this.newRows = this.newRows - 1;
      }
    },
    addCol(){
      this.newCols = this.newCols + 1;
    },
    removeCol(){
      if(this.newCols === 1){
        alert('Cannot be less than 1');
        return
      }
      else {
        this.newCols = this.newCols - 1;
      }
    },
    setTileSet(id){
      console.log('setting setid to ', id)
      this.tileSetId = id;
    },
    async applyMapGrid(){
      const {mapGrid} = this;
      console.log('mapGrid', mapGrid)
      const result = await this.arrayFromMapGrid({grid: mapGrid})
      console.log('result', result);
      if(!result){return}
      const rows = result.length;
      const cols = result[0] && result[0].length;
      console.log('rows cols', rows, cols);
      if(rows && cols){
        this.newRows = rows
        this.newCols = cols
        this.optionMapMode = 'static'
        this.optionUseCreatureGeneration = true;
        this.optionUseLootGeneration = true;
      } else {
        console.error('either missing rows/cols');
        return
      }
    }
  },
};
</script>


