<template>
  <v-dialog
      v-model="showDialog"
      width="700"
      scrollable
    >
    <v-card class="new-game-settings" v-if="options">
      <v-card-title class="text-h5 ">
          New Game
      </v-card-title>
        <v-card-text>
        <div class="row" v-if="devMode">
          <div class="col">
            <label>load game </label>
            <div>
              
              <v-switch
                v-model="options.loadGame"
                :label="`${options.loadGame ? 'Yes' : 'no'}`"
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
                v-model="options.optionUseDefault"
                :label="`${options.optionUseDefault ? 'Yes' : 'no'}`"
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
                v-model="options.useStartPoints"
                :label="`${options.useStartPoints ? 'Yes' : 'no'}`"
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
                v-model="options.optionUsePlayerUnits"
                :label="`${options.optionUsePlayerUnits ? 'Yes' : 'no'}`"
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
                v-model="options.optionMapAdjacent"
                :label="`${options.optionMapAdjacent ? 'yes' : 'no'}`"
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
                v-model="options.optionUseLimitedTileSet"
                :label="`${options.optionUseLimitedTileSet ? 'yes' : 'no'}`"
              ></v-switch>
            </div>  
        </div>
        <div class="col">
          <label>Claim Tile On Move</label>
          <div class="text-body-2">
            Team Color claims value
          </div>
          <div>
            <v-switch
              v-model="options.optionClaimOnMove"
              :label="`${options.optionClaimOnMove ? 'yes' : 'no'}`"
            ></v-switch>
          </div>  
        </div>
        <div class="col">
          <label>Move on Explore</label>
          <div class="text-body-2">
            Player moves when exploring new tile
          </div>
          <div>
            <v-switch
              v-model="options.optionExploreOnMove"
              :label="`${options.optionExploreOnMove ? 'yes' : 'no'}`"
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
                  @click="() => this.options.optionMapMode = 'explore'"
                  x-small
                  v-tooltip="`Expand map by placing tiles`" :color="options.optionMapMode === 'explore' ? 'primary' : ''">
                  Explore
                </v-btn>
                <v-btn
                  @click="() => this.options.optionMapMode = 'hidden'"
                  x-small
                  v-tooltip="`Fixed map size with hidden tiles.`" :color="options.optionMapMode === 'hidden' ? 'primary' : ''">
                  Hidden
                </v-btn>
                <v-btn
                  @click="() => this.options.optionMapMode = 'static'"
                  x-small v-tooltip="`Visible Fixed Map.`"
                  :color="options.optionMapMode === 'static' ? 'primary' : ''">
                  Static
                </v-btn>
              </v-btn-toggle>
              <div class="py-1 text-body-2 support-text" v-if="options.optionMapMode === 'explore'">Expand map by placing tiles. Linited by the number of tiles available.</div>
              <div class="py-1 text-body-2 support-text" v-if="options.optionMapMode === 'hidden'">Fixed size map, tiles initially hidden from players.</div>
              <div class="py-1 text-body-2 support-text" v-if="options.optionMapMode === 'static'">Fixed size map, tiles visible to players.</div>
              <div class="optional">
                <v-btn small outlined @click="() => {options.useMapGrid = !options.useMapGrid}">{{options.useMapGrid ? 'Hide' : 'Use'}} Map Grid</v-btn>
              </div>
              <div v-if="options.useMapGrid">
                <textarea
                  max="999"
                  name="Code"
                  class="base-input code-input"
                  type="string"
                  placeholder=""
                  v-model="options.mapGrid"
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
            <div class="feature">{{options.newRows}}</div>
            <v-btn text x-small outlined @click="addRow"> + 1</v-btn>
          </div>
        </div>
        <div class="col">
          <div class="row ma-0 f-flex align-center">
            <v-btn text x-small outlined @click="removeCol"> - 1</v-btn>
            <div class="feature">{{options.newCols}}</div>
            <v-btn text x-small outlined @click="addCol"> + 1</v-btn>
          </div>
        </div>
        <div class="col" style="flex-basis: 300px; flex-grow: 0; flex-shrink: 0;">
          <map-preview :rows="options.newRows" :cols="options.newCols" />
        </div>
      </div>
      <div class="row">
          <div class="col">
            <label >Map Style</label>
            <tile-set-select :selected="options.tileSetId" :onAction="setTileSet" v-if="tileSets" />
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
            <v-text-field small filled clearable outlined dense v-model="options.gameTitle" hint="Name for easy identification">
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
              v-model="options.optionUseLootGeneration"
              :label="`${options.optionUseLootGeneration ? 'Yes' : 'no'}`"
              v-tooltip="`Assign loot rewards to tiles`"
            ></v-switch>
            <v-text-field v-model="options.optionLootCount" v-if="devMode"/>
        </div>
        <div class="col">
          <label >Creatures</label>
          <div class="text-body-2">Assign Creatures</div>
              <!-- v-model="toggle_mechanic" -->
            
            <v-switch
                v-model="options.optionUseCreatureGeneration"
                :label="`${options.optionUseCreatureGeneration ? 'Yes' : 'no'}`"
                v-tooltip="`Assign Creatures to tiles`"
              ></v-switch>
              <v-text-field v-model="options.optionCreatureCount" v-if="devMode" />
        </div>
        <div class="col">
          <label >Items</label>
          <div class="text-body-2">Use Items to claim tiles</div>
              <!-- v-model="toggle_mechanic" -->
            
            <v-switch
                v-model="options.optionUseItems"
                :label="`${options.optionUseItems ? 'Yes' : 'no'}`"
                v-tooltip="`Use Items to claim tiles`"
              ></v-switch>
              <v-text-field v-model="options.optionItemCount" v-if="devMode" />
        </div>
      </div>
      <div class="row" v-if="devMode">
        <div class="col">
          <label >Mechanic</label>
          <div class="text-body-2">How will this game work?</div>
          <v-btn-toggle
              v-model="options.toggle_mechanic"
              mandatory
              dense
            >
              <v-btn x-small v-tooltip="`Control the entire board.`" :color="options.toggle_mechanic === 0 ? 'primary' : ''">
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

export default {
  components: { MapPreview, TileSetSelect },
  props: ['onAction', 'onClose', 'show', 'rows', 'cols'],
  data() {
    return {
      options: {},
      showDialog: true,
      loadGame: true,
    };
  },
  created(){
    const {optionsTemplate} = this;
    const nameConfig = {
      dictionaries: [adjectives, colors, animals],
      separator: "-",
    };
    const randomName = uniqueNamesGenerator(nameConfig); // big_red_donkey
    console.log("random.name", randomName);
    // this.gameTitle = randomName;
    const tempOptions = {...optionsTemplate, gameTitle: randomName}
    this.options = tempOptions
  },
  mounted(){
    
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      tileSets: "ui/tileSets",
      devMode: "ui/devMode",
      optionsTemplate: "ui/optionsTemplate",
    }),
    compiledOptions(){
      const {
        walletAddress, 
        } = this
        // const {
        // newRows, 
        // newCols, 
        // optionUseDefault, 
        // optionMapMode, 
        // generateMap, 
        // tileSetId, 
        // gameTitle, 
        // optionUseLootGeneration,
        // optionLootCount, 
        // optionUseCreatureGeneration,
        // optionCreatureCount,
        // useMapGrid,
        // mapGrid,
        // useStartPoints,
        // optionClaimOnMove,
        // optionExploreOnMove,
        // optionUseItems,
        // optionItemCount
        // } = this.options
      const compiledOptions = {
        ...this.options,
        rows: this.options.newRows, 
        cols: this.options.newCols, 
        // optionUseLootGeneration,
        // optionLootCount,
        // optionUseCreatureGeneration,
        // optionCreatureCount,
        // optionClaimOnMove,
        // optionExploreOnMove,
        // optionUseItems,
        // optionItemCount,
        useDefaultTeams: this.options.optionUseDefault, 
        // generateMap, 
        owner: walletAddress, 
        mapMode: this.options.optionMapMode, 
        // tileSetId, 
        title: this.options.gameTitle,
        // useStartPoints,
        // useMapGrid: useMapGrid,
        // mapGrid: mapGrid,
        loadGame: this.loadGame,
        useEdgePoints: this.options.optionMapMode !== 'explore',
        }
        console.log('compiledOPtions', compiledOptions)
      return compiledOptions;
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
      this.options.newRows = this.options.newRows + 1;
    },
    removeRow(){
      if(this.options.newRows === 1){
        alert('Cannot be less than 1');
        return
      }
      else {
        this.options.newRows = this.options.newRows - 1;
      }
    },
    addCol(){
      this.options.newCols = this.options.newCols + 1;
    },
    removeCol(){
      if(this.options.newCols === 1){
        alert('Cannot be less than 1');
        return
      }
      else {
        this.options.newCols = this.options.newCols - 1;
      }
    },
    setTileSet(id){
      console.log('setting setid to ', id)
      this.options.tileSetId = id;
    },
    async applyMapGrid(){
      const {mapGrid} = this.options;
      console.log('mapGrid', mapGrid)
      const result = await this.arrayFromMapGrid({grid: mapGrid})
      console.log('result', result);
      if(!result){return}
      const rows = result.length;
      const cols = result[0] && result[0].length;
      console.log('rows cols', rows, cols);
      if(rows && cols){
        this.options.newRows = rows
        this.options.newCols = cols
        this.options.optionMapMode = 'static'
        this.options.optionUseCreatureGeneration = true;
        this.options.optionUseLootGeneration = true;
      } else {
        console.error('either missing rows/cols');
        return
      }
    }
  },
};
</script>


