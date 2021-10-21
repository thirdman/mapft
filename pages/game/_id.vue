<template>
  <div class="pageContainer">
    <Header />
    <!-- <dialog-intro :show="!introRead" /> -->
    <!-- <dialog-team-select  :onAction="addPlayer" :userPlayer="userPlayer" /> -->
    <dialog-game-welcome
      :show="showGameWelcome ? true : false"
      :onAction="handleStartGame"
      :onJoin="() => setShowTeamSelect(true)"
      :onClose="() => {this.showGameWelcome = false}"
      :gameData="gameData"
      :userPlayer="userPlayer"
      />
    <v-slide-y-transition>
      
    <generate-tile
      :location="generateLocation"
      :onClose="() => {this.generateLocation = null;}"
      :onGenerate="handleGenerateTile"
      :tiles="gameData.tiles"
      :gameData="gameData"
      :immediate="true"
      v-if="generateLocation && gameData"
      /> 
      <!-- //:gameData="gameData" -->
    </v-slide-y-transition>
    <!-- <v-slide-y-transition>
      <v-card outlined elevation="4" :class="`dialog join`" v-if="showTeamSelect">
        <v-card-title class="row d-flex align-center">
          <div class="col">
            Join Game
          </div>
          <div class="col col-1">
              <v-btn icon @click="setShowTeamSelect(true)">
                <v-icon size="large">mdi-close</v-icon>
              </v-btn>
            </div>
        </v-card-title>
        <v-card-text>
          
          <div class="row">
            <div class="col">
              <label>Team</label>
              <team-select
                :team="userTeam"
                :teams="gameTeams"
                direction="row"
                :onSelect="handleTeamSelect"
                />  
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Display Name</label>
              <v-text-field small filled clearable outlined dense v-model="newUserName" hint="Display Name" />
            </div>
          </div>
          <v-divider />
          <div class="row">
            <div class="col">
              <label>Preview</label>
              <div class="user preview">
                <player-info :player="userPlayer" :address="walletAddress" preview />
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="addPlayer">Join!</v-btn>
        </v-card-actions>
      </v-card>
    </v-slide-y-transition> -->
    <v-slide-y-reverse-transition>
      <v-card outlined elevation="4" :class="`claim`" v-if="showMapControls">
        <v-card-title class="d-flex align-center">
          <div class="col">
            <label>Map Settings</label>
          </div>
          <div class="col col-1">
              <v-btn plain @click="() => showMapControls = !showMapControls">
                <v-icon size="large">mdi-close</v-icon>
              </v-btn>
            </div>
        </v-card-title>
        <v-card-text>
          <div class="row">
            <label>Tile Set</label>
          </div>
          <div class="row">
            <tile-set-select :selected="gameData.options.tileSetId" :onAction="setTileSet" />
          </div>
          <div class="row">
            <v-btn small  @click="growMap('north')" v-tooltip="'Add a row'"><v-icon>mdi-plus</v-icon> Add Row North </v-btn>
            <v-btn small  @click="growMap('west')" v-tooltip="'Add a column'"><v-icon>mdi-plus</v-icon> Add West Column </v-btn>
            <v-btn small  @click="growMap('east')" v-tooltip="'Add a column'"><v-icon>mdi-plus</v-icon> Add East Column </v-btn>
            <v-btn small  @click="growMap('south')" v-tooltip="'Add a row'"><v-icon>mdi-plus</v-icon> Add Row South </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-slide-y-reverse-transition>
    <v-slide-y-transition>
      <v-card outlined elevation="4" :class="`claim ${claimLocation ? 'active' : ''} ${isBattling ? 'battling' : ''}`" v-if="isBattling || claimLocation">
    <v-card-title class="d-flex justify-center">
      <div class="claim-title-row d-flex justify-center">
        <div class="claim-title-col col pa-2">
          <h4 class="ma-0 px-10">Claim Tile {{claimLocation}}</h4>
        </div>
      </div>
    </v-card-title>
    <v-card-text>
      <div class="row claim-row">
        <div class="col col-6 claimCol pr-0">  
          <div class="row ma-0 d-flex justify-center">
          <label>Tile Defence</label>
          </div>
          <div class="row ma-2 d-flex justify-center" v-if="selectedData">                   
            <div class="feature" :style="`background: ${this.getColor(selectedData.meta.team)}` " v-if="selectedData">
              <v-icon color="white" medium>mdi-shield-outline</v-icon>
            </div>
            <div class="feature feature-outline">
              {{selectedData && selectedData.meta.creature && selectedData.meta.creature.attack.Int64}}
            </div>
          </div>
          <div v-if="selectedData " class="actionzone tile">
              <Card 
                :asset="selectedData.meta.creature"
                v-if="selectedData.meta.creature"
                :showmeta="false" :card="false"
                />
          </div>


        </div>
        <div class="col col-6 claimCol pl-0">
          <div class="row ma-0 d-flex justify-center">
            <label>Your Attack</label>
          </div>
          <div class="row ma-2 d-flex justify-center" >
            <div class="feature" :style="`background: ${this.getColor(userTeam)}` " v-if="userTeam">
              <v-icon color="white" medium>mdi-sword</v-icon>
            </div>
            <div class="feature" :style="`background: #333` " v-else>
              <v-icon color="white" medium>mdi-sword</v-icon>
            </div>
            
            <div class="feature feature-outline" >
              {{selectedAsset && selectedAsset.attack.Int64}}
            </div>
          </div>
          <div class="actionzone user">
            <div v-if="!userAssets && !isLoadingAssets" >
              No Assets.
            </div >
            <div  v-if="!userAssets && isLoadingAssets">
              <Loading text="Loading" />
            </div>
            <div  v-if="!userAssets && !isLoadingAssets">
              <v-btn @click="getCards" class="btn hero" outlined >Load Your Assets</v-btn>
            </div>
            <Card 
              :asset="selectedAsset"
              :showmeta="false" 
              :card="false" 
              v-if="selectedData && selectedAsset && !showSelectAsset" 
            />
            <div class="vs">vs</div>  
            <div v-if="userAssets" class="select-btn" >
              <v-btn x-small outlined
                @click="() => {
                this.selectedAsset = null;
                this.showSelectAsset = true;
                }" class="btn hero">
                <v-icon size="small">
                mdi-arrow-u-left-top-bold
                </v-icon>
                Select Another</v-btn>
            </div>
          </div>
        </div>
        <div v-if="isBattling" class="claim-layer battle">
          <div class="row" style="width: 100%; align-items: stretch;">
            <div class="col col-6 claimCol pr-0" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">  
              <div class="rowNOT ma-0 d-flex justify-center">
                <label>Tile Defence</label>
              </div>
              <div class="rowNOT ma-0 d-flex justify-center">                  
                <div class="feature" :style="`background: ${this.getColor(selectedData.meta.team)}` " v-if="selectedData">
                  <v-icon color="white" medium>mdi-shield-outline</v-icon>
                </div>
                <div class="feature feature-outline">
                  {{selectedData && selectedData.meta.creature && selectedData.meta.creature.attack.Int64}}
                </div>
              </div>
            </div>
            <div class="col col-6 claimCol pr-0" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">  
              <div class="rowNOT ma-0 d-flex justify-center">
                <label>Your Attack</label>
              </div>
              <div class="rowNOT ma-0 d-flex justify-center">
                <div class="feature" :style="`background: ${this.getColor(userTeam)}` " v-if="userTeam">
                  <v-icon color="white" medium>mdi-sword</v-icon>
                </div>
                <div class="feature feature-outline">
                  {{selectedAsset && selectedAsset.attack.Int64}}
                </div>
              </div>
            </div>
          </div>
          <div class="row d-flex justify-center" style="width: 100%; position: absolute; top: 33%; ">
            <v-expand-x-transition>
              <div class="battle-icon" v-if="isBattling">
                <v-icon x-large >mdi-sword-cross</v-icon>
              </div>
            </v-expand-x-transition>
          </div>
          <h2>Battle!</h2>
          
          <v-btn @click="handleClaimCancel" v-if="devMode">Cancel</v-btn>
          <v-btn @click="() => {this.isBattling = !this.isBattling}" v-if="devMode">toggle</v-btn>
        </div>
        <div v-if="userAssets && showSelectAsset" class="assetGrid claim-layer">
          <Card
            :onSelect="() => selectCreature(asset)"
            :asset="asset" v-for="(asset, index) in userAssets"
            :key="index"
            :showmeta="true"
            :index="index"
            :disabled="creatureExists(asset)"
            :card="false"
          />
        </div>
        <div class="instructions claim-layer" v-if="!userAssets && !instructionsRead">
          <div class="text-body-2">To battle for a tile, you need:</div>
          <div class="text-body-2">
            <ul>
              <li>Connected wallet with a Gods Unchained inventory</li>
              <li>Select a creature (Gods Unchained Assets) that is neutral alignment or matches your team</li>
              <li>The creature has not already been used in the game</li>
              
            </ul>
          </div>
          <div class="text-body-2">You will claim the tile if your attack value is greatrer than the remaining tile defence</div>
          <div class="row">
            <div class="col">
              <v-btn @click="setInstructionsRead(true)">Got it</v-btn>
              </div>
            </div>
        </div>
        <div class="creature-zone">
          <div class="tile-creature">
            <Card 
              :asset="selectedData.meta.creature"
              v-if="selectedData && selectedData.meta.creature"
              :showmeta="true"
              :card="false" />
          </div>
          <div class="user-creature">
            <div v-if="selectedData && selectedAsset && !showSelectAsset" class="actionzone user">
              <Card  :asset="selectedAsset" :showmeta="true" :card="false" />
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <div class="row claim-action-row">
        <div class="col pa-2 claim-action-col">
          <!-- <v-btn color="primary" @click="() => {console.log()}">battle!</v-btn> -->
          <!-- <v-btn @click="onClose">close</v-btn> -->
          <v-btn color="primary" v-if="userTeam && selectedData && selectedData.meta.creature" @click="handleClaim(selectedData.location, selectedAsset, true)" :disabled="!userTeam" class="btn hero">Battle!</v-btn>
          <v-btn color="primary" v-if="userTeam && selectedData && !selectedData.meta.creature" @click="handleClaim(selectedData.location, selectedAsset, false)" :disabled="!userTeam" class="btn hero">Claim</v-btn>
          <v-btn color="primary" v-if="!userTeam" @click="handleUser()" class="btn hero">Select Team</v-btn>
          <v-btn @click="handleClaimCancel">Cancel</v-btn>
          </div>
      </div>
    </v-card-actions>
      </v-card>
    </v-slide-y-transition>
    <!-- HERO Container -->
    <section id="intro" class="row ma-0 ">
      <div class="menu-column" >
            <v-list dense class="bg-darker pa-0">
              <v-list-item
                v-for="item in items"
                :key="item.title"
                @click="handlePanel(item.id)"
                class="menu-item"
                :class="panel === item.id ? 'selected' : ''"
              >
                <v-icon>{{ item.icon }}</v-icon>
                <!-- <v-list-item-icon>
                </v-list-item-icon> -->

                <!-- <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content> -->
              </v-list-item>
            </v-list>
          <v-spacer />
          <v-divider class="ma-0"></v-divider>
          <v-list dens class="bg-darker pa-0">
            
            <!-- <v-list-item class="px-2" @click="() => {this.$router.push('/user')}">
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item> -->
            <v-list-item class="px-4" @click="() => {this.$router.push('/user')}">
                <ProfileButton />
            </v-list-item>
        </v-list>
          
      </div>
      <div class="col col-3 info-column" v-if="panel">
        <div class="info-game" v-if="!selectedData">
          <div class="col pa-0  summary-container info-item" v-if="panel === 'info'" >
            <game-info :game="gameData" :expanded="true" mode="info"  v-if="gameData" />
          </div>
          <div class="row mx-0 my-0 info-item tabs-container" v-if="panel === 'scores'">
            <v-card  outlined class="pa-0 card-bg" style="width: 100%;" >
              <v-tabs 
                v-model="tab"
                class="tabs-row"
                grow
              >
                <v-tab
                  v-for="tab in tabs"
                  :key="tab"
                  class="tab-element"
                >
                  {{ tab }}
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab" v-if="gameData" >
                <v-divider class="ma-0 pa-0" />
                <v-tab-item
                  key="Scores"
                >
                <div outlined class="pa-4">
                  <div class="row">
                    <div class="col">
                      <label>Team</label>
                    </div>
                    <div class="col">
                      <label>Tiles</label>
                    </div>
                    <div class="col">
                      <label>Score</label>
                    </div>
                  </div>
                  <div class="row" v-for="(team, index) in gameTeams" :key="index">
                    <div class="col">
                      {{team.team}}
                    </div>
                    <div class="col">
                      {{team.count}}
                    </div>
                    <div class="col">
                      {{team.totalValue}}
                    </div>
                  </div>
                </div>
                </v-tab-item>
                <v-tab-item
                  key="Creatures"
                >
                  <v-divider class="ma-0 pa-0" />
                  <div class="text-body-2 pl-4 pt-4">
                    Creatures  used in this game
                  </div>
                  <v-divider class="my-2" />
                  <asset-list :array="gameData.creatures" v-if="gameData.creatures" />
                  <div v-else>
                    no creatures yet
                  </div>
                  
                </v-tab-item>
                <v-tab-item
                  key="User"
                >
                  <v-divider class="ma-0 " />
                  <div class="pa-2">
                  <div class="text-body-2">
                    Your Gods Unchained assets.
                  </div>
                  <Loading message="Loading assets..." v-if="isLoadingAssets" />
                  <v-btn @click="getCards" small outlined v-if="!userAssets" >Get Cards</v-btn>
                  <div v-if="userAssets" class="assetGrid flow">
                    <Card
                      :onSelect="false"
                      :asset="asset" v-for="(asset, index) in userAssets"
                      :key="index"
                      :showmeta="false"
                      :index="index"
                      :disabled="creatureExists(asset)"
                      :card="false"
                    />
                  </div>
                  </div>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </div>
        
        <div class="row ma-0 mt-0 py-2  info-item minimap-row d-flex align-center justify-center" v-if="this.gameData && (panel === 'info' || panel === 'minimap')" >
          <map-mini :gameData="this.gameData" size="120" />
        </div>
        <div class="row ma-0 info-item" v-if="panel === 'account'" >
          <div class="col">
          <label>Players</label>
          <div class="player-list" v-if="gameData && gameData.players" >
            <div v-for="(player, i) in gameData.players" :key="i">
              <player-info :player="player" />
            </div>
          </div>
          </div>
        </div>
        <div class="row ma-0 info-item" v-if="panel === 'inspect'" >
          Select a tile to inspect....
        </div>
        <div class="row ma--4 mt-0 info-item options-row player-item">
          <div class="col pa-0">
            <v-divider class="my-0" />
            <div class="d-flex justify-center align-center" style="height: 100%;">
              <div v-if="userIsPlayer" class=" player-wrap">
                <player-info :player="userPlayer" v-if="userIsPlayer" />
                <div class="tile-items d-flex align-center justify-center" v-if="gameData && gameData.options.optionUseItems">
                  <item-flag :item="{color: userPlayer && this.getColor(userPlayer.team)}" size="small"  />
                  <item-flag :item="{color: userPlayer && this.getColor(userPlayer.team)}" size="small"  />
                  <item-flag :item="{color: userPlayer && this.getColor(userPlayer.team)}" size="small"  />
                  <!-- <div class="tile-item" ><v-icon>mdi-flag</v-icon></div>
                  <div class="tile-item" ><v-icon>mdi-flag</v-icon></div>
                  <div class="tile-item" ><v-icon>mdi-flag</v-icon></div> -->
                </div>
              </div>
              <div class="col pa-0 d-flex align-center justify-center" v-if="!userIsPlayer">
                <v-btn plain color="primary" @click="() => {this.showGameWelcome = true}">Join Game</v-btn>
              </div>
            </div>
            
          </div>
        </div>
        <v-slide-x-transition>
        <div class="options-content col pa-4" v-if="showGameOptions || panel === 'options'">
          <div class="row">
            <div class="col">
              Options
            </div>
            <div class="col col-3">
              <v-btn icon @click="() => {showGameOptions = !showGameOptions; this.panel = null;}">
                <v-icon medium>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="row">
            <div class="col">
            <v-btn block outlined @click="setShowTeamSelect(!showTeamSelect)">Join Game</v-btn>
            <v-divider />
            <v-btn block outlined @click="highlightTeam(userTeam)">Highlight team tiles</v-btn>
            <v-btn block small outlined @click="setIntroRead(!introRead)">Show Introduction</v-btn>
            <v-btn block outlined @click="resetGame">Reset Game</v-btn>
            </div>
          </div>
          <div class="row" v-if="devMode">
            <div class="col">
            <v-btn block small outlined @click="applyMapGrid">Apply Map Grid</v-btn>
            <!-- <v-btn block outlined @click="setShowTeamSelect(!showTeamSelect)">Show Team Select</v-btn> -->
            <v-btn block small outlined @click="setMapSelect(!showMapSelect)">Select Map Style</v-btn>
            <v-btn block small outlined @click="saveGame()">Save Game</v-btn>
            <v-btn block small outlined @click="createBin({test: 'blah', gameData: gameData})">Create Bin</v-btn>
            <v-btn block small outlined @click="fetch">Fetch</v-btn>
            <v-btn block small outlined @click="updateSaveMeta">Setsave</v-btn>
            <!-- <v-btn block small outlined @click="() => {this.showNewGameDialog = true}">New Game</v-btn>
            <v-divider /> -->
              <v-btn block outlined @click="handleAutoFill">Generate Map</v-btn>
              <v-btn @click="applyTestData">apply test</v-btn>
              <v-divider />
              Status: {{binStatus}}
            </div>
          </div>
        </div>
       </v-slide-x-transition>
       </div>
       <v-slide-x-transition>
        <div class="selected-content col" v-if="showInfo && typeof selectedTile === 'number'" transition="slide-x-transition">
          <Info
            :selectedData="selectedData"
            :index="selectedTile"
            :tile="theTile"
            :onClose="handleTileSelect"
            :onClaimSelect="handleClaimSelect"
            :onGenerateSelect="handleGenerateSelect"
            :onClaim="handleClaim"
            :onPlace="handlePlaceItemStart"
            :onMove="handlePlayerMove"
            :onAction="handleGenerateSelect"
            :userPlayer="userIsPlayer && userPlayer"
            :playerLocation="playerLocation"
            :getCreature="getCreature"
            :getLoot="getLoot"
            />
        </div>
       </v-slide-x-transition>
       
      </div>
      <div class="col content-column" :class="panel ? 'col-9' : 'col-11'">
        <client-only>
          <div class="error-message" v-if="gameStatus === 'error'"><label>Error</label>Game Data Not Found</div>
          <div class="loading-container"  v-if="gameStatus === 'loading' || binStatus === 'working' ">
            <Loading message="Loading..." /> 
          </div>
          <div class="map-controls row ma-0" v-if="binStatus !== 'working' && gameData">
            <div class="col pa-1 ">
              <div class="value-controller">
                <v-btn icon  small @click="setScale(-0.1)"><v-icon>mdi-magnify-minus-outline</v-icon></v-btn>
                <div class="col pa-0">
                  <!-- <label>Zoom</label> -->
                  {{scale}}
                  </div>
                <v-btn icon  small @click="setScale(0.1)"><v-icon>mdi-magnify-plus-outline</v-icon></v-btn>
              </div>
            </div>
            <!-- <div class="col pa-0">
              <div class="value-controller">
                <v-btn icon small @click="growMap('west')"><v-icon>mdi-arrow-left</v-icon></v-btn>
                <div>{{gameData.options.cols}}</div>
                <v-btn icon small  @click="growMap('east')"><v-icon>mdi-arrow-right</v-icon></v-btn>
              </div>
            </div> -->
            <div class="col pa-1">
              <div class="value-controller">
                <v-btn icon small @click="adjustMapSize()"><v-icon>mdi-dots-vertical</v-icon></v-btn>
            
              </div>
            </div>
          </div>
          <div
            :class="`map-container map-mode-${gameData && gameData.options.mapMode} ${binStatus === 'working' ? 'working' : ''}`"
            v-if="gameStatus !== 'loading'" ref="mapcontainer"
            
          >
            <div class="map-position map-background" :style="`width: ${mapWidth + mapPadding}px; height: ${mapHeight + mapPadding}px;`">
                <div v-if="gameData && gameData.options.mapMode === 'explore' && 1===2" >
                  width: {{mapWidth}}, height: {{mapHeight}}
                </div>
                <div
                  class="explore-button-row row-top"
                  :style="`width: ${mapWidth + mapPadding}px; left: ${mapPadding} 
                    `"
                  >
                  <v-btn
                    class="add-button"
                    rounded
                    small 
                    v-tooltip="'Add a row'"
                    @click="growMap('north')" 
                    >
                      <v-icon>mdi-plus</v-icon> Add Row 
                  </v-btn>
                  <!-- <tile-placeholder
                    :target="[0,-1]"
                    :size="tileSize"
                    :tile="tile"
                    :onAction="handleGenerateSelect"
                    /> -->
                </div>
                  <!-- :style="`width: ${mapWidth}px; height: ${tileSize /2}px; left: ${tileSize}px; top: ${mapHeight + tileSize}px;`" -->
                <div
                  class="explore-button-row row-bottom"
                  :style="`width: ${mapWidth}px; top: ${mapHeight + mapPadding}px; left: ${mapPadding}`"
                  >
                  <v-btn   
                  class="add-button"
                    rounded
                    
                    small 
                    v-tooltip="'Add a row'"
                    @click="growMap('south')"><v-icon>mdi-plus</v-icon> Add Row </v-btn>
                </div>
                <div
                  class="explore-button-col col-left"
                  :style="`height: ${mapHeight + mapPadding}px; `"
                  >
                    <v-btn
                    class="add-button"
                    rounded
                    small
                    v-tooltip="'Add Col'"
                    @click="growMap('west')"><v-icon>mdi-plus</v-icon> West </v-btn>
                </div>
                <div
                  class="explore-button-col col-right"
                  :style="`height: ${mapHeight}px; left: ${mapWidth + mapPadding}px;`"
                  >
                  <v-btn
                    class="add-button"
                    rounded
                    snall 
                    v-tooltip="'Add Col'"
                    @click="growMap('east')" ><v-icon>mdi-plus</v-icon> East </v-btn>
                </div>
              <div
              :class="`grid-wrap`"
              draggable="true"
              :style="gameData && gameData.tileMap && gameData.tileMap[0] && `width: ${mapWidth + 0}px; height: ${mapHeight + 0}px; left: ${mapPadding}; top: ${mapPadding}; transform: scale(${scale});`"
              v-if="gameData"
              >
              <Tile
                size="240"
                :tile="tile"
                :handleSelect="handleTileSelect"
                v-for="(tile, index) in gameData.tiles"
                :key="index"
                :index="index"
                :selected="selectedTile === index"
                :highlighted="highlightedIndex === index"
                :hideEmpty="true"
                :onAction="handleGenerateSelect"
                :onRightClick="handleRightClick"
                :unit="gameData && gameData.settings && gameData.settings.hasUnits && getUnit(tile.location)"
                :loot="gameData && gameData.settings && gameData.settings.hasLoot && getLoot(tile.location)"
                :creature="gameData && gameData.settings && gameData.settings.hasCreatures && getCreature(tile.location)"
                :items="gameData && getItems(tile.location)"
                
                />
              
            </div>
          </div>
          </div>
            <!-- <div class="grid-resize-position east " v-if="gameData">
              <v-btn icon small  @click="growMap('east')" v-tooltip="'Add a column'"><v-icon>mdi-plus</v-icon></v-btn>
            </div> -->
            <!-- <div class="grid-resize-position west" v-if="gameData">
              <v-btn icon small  @click="growMap('west')" v-tooltip="'Add a column'"><v-icon>mdi-plus</v-icon></v-btn>
            </div> -->
        </client-only>
      </div>
    </section>
    <Footer :show="false" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import {calculateTile, forceCalculateTile, compileTile} from "../../utils/generate"
import { v4 as uuidv4 } from 'uuid';
const BASE_URL = "https://unknowngame.site"
import ogImagePreview from '~/assets/images/preview.png'
import { dialog } from '@devlop-ab/dialog';
import GenerateTile from '../../components/GenerateTile.vue';
import AssetList from '../../components/AssetList.vue';
import DialogIntro from '../../components/DialogIntro.vue';
import DialogTeamSelect from '../../components/DialogTeamSelect.vue';
import MapMini from '../../components/MapMini.vue';
import PlayerInfo from '../../components/PlayerInfo.vue'
import TeamSelect from '../../components/TeamSelect.vue'
import { contentSwitch } from '../../utils/misc';
 
export default {
  components: { DialogTeamSelect, MapMini, PlayerInfo, TeamSelect },
  name: 'ViewPageParams',
  data() {
    
    return {
      
      items: [
        { title: 'Info', icon: 'mdi-text-box-outline', id: 'info' },
        { title: 'Inspect', icon: 'mdi-crosshairs', id: 'inspect' },
        { title: 'Map', icon: 'mdi-checkerboard', id: 'minimap' },
        { title: 'My Account', icon: 'mdi-account', id: 'account' },
        { title: 'Scores', icon: 'mdi-shield-account', id: 'scores' },
        { title: 'Settings', icon: 'mdi-cog', id: 'options' },
      ],
      
      gameStatus: 'loading',
      gameTeams: null,
      baseUrl: "https://localhost:3333",
      previewUrl: `images/preview.png`,
      siteName: "SVG Tokens",
      images: null,
      fullIndex: null,
      showFull: false,
      devAddress: '0xd1c248d1c9879dc3b5a846d4dccc5b7aa8fbf432',
      gameData: null,
      testData: null,
      showInfo: false,
      showGameWelcome: false,
      showMapControls: false,
      showMapSelect: false,
      selectedTile: null,
      selectedData: null,
      claimLocation: null,
      generateLocation: null,
      generateMode: 'normal',
      showSelectAsset: true,
      showGenerate: false,
      showGameOptions: false,
      showJoin: false,
      selectedAsset: null,
      highlightedIndex: null,
      tileSetId: null,
      panel: 'info',
      tab: "Scores",
      tabs: ['Scores', 'Creatures', 'User'],
      isBattling: false,
      isLoadingAssets: false,
      units: null,
      scale: 1,
    }
  },
  head: {
    title: 'DungeoNFT',
    meta: [
      { hid: 'description', name: 'description', content: 'A NFT platform with a focus on extendability, flexibility, and on-chain data.' },
      { hid: "og:title", name: "og:title", content: "SVG Tokens" },
      { hid: "og:site_name", name: "og:site_name", content: "SVG Tokens" },
      { hid: "og:type", name: "og:type", content: "website" },
      {
          hid: "og:image",
          property: "og:image",
          content: BASE_URL + ogImagePreview
        },
        
    ],
  },
  async created(){
    const {params} = this.$route;
    const {id} = params;
    const {siteData} = this;
    console.log('created: ', id);
    if(!siteData){
      await this.getConfig();
    }
  },
  mounted(){
    const {params} = this.$route;
    const {id} = params;
    
    // this.gameStatus = 'loading';
    if(id === 'demo'){
      this.gameData = this.demoData;
      this.loadData();
      this.gameStatus = 'ready'
      return
    }
    const {localGames, games} = this;
    
    // console.log('mounted id', id, games)
    
    // const thisGameLocal = localGames && localGames.find(game => game.id === id);
    // const thisGameRemote = games && games.find(game => game.id === id);
    // const thisGame = thisGameRemote || thisGameLocal;
    // if(!thisGame){
    //   this.gameStatus="error";
    //   return
    // }
    // console.log('mounted thisGame', thisGame)
    // console.log('here', this.activeGame)
    // console.log('thisgame exists', thisGame, this.activeGame)
    // if(!thisGame){
    //     this.gameStatus='error';
    // } else {

    //   this.activeGameId = id;
    //   this.tileSetId = thisGame.options.tileSetId;
    //   this.setActiveGame(thisGame);
    
    //   this.loadData({id});
    //   this.gameStatus = 'ready'
    // }
    // setTimeout(() =>{
    //   this.gameStatus = 'ready'
    //   }, 2000);
  },
  async fetch() {
      // this.posts = await this.$http.$get('https://api.nuxtjs.dev/posts')
      
      const {params} = this.$route;
      const {id} = params;
    
    this.gameStatus = 'loading';
    console.log('fetching id', id)
    if(!id){
      this.gameStatus = 'error'
      return
    }
    let remoteData = await this.getBin({binId: id});
    remoteData.id = id;
    console.log('remoteData', remoteData)
    if(remoteData){
      this.setActiveGame(remoteData);
      this.gameData = remoteData
      this.gameTeams = this.gameData.teams
      this.gameStatus = 'ready';
      // this.updateSaveMeta();
    }
    // if(id === 'demo'){
    //   this.gameData = this.demoData;
    //   this.loadData();
    //   this.gameStatus = 'ready'
    //   return
    // }
  },
  computed: {
    ...mapGetters({
      devMode: 'ui/devMode',
      siteData: 'ui/siteData',
      contrastMode: 'ui/contrastMode',
      hasChainSelect: 'ui/hasChainSelect',
      hasVerticalGridLines: 'ui/hasVerticalGridLines',
      binData: "ui/binData",
      binStatus: "ui/binStatus",
      walletAddress: "ui/walletAddress",
      // tiles: "ui/tiles",
      playerTemplate: "ui/playerTemplate",
      games: "ui/games",
      localGames: "ui/localGames",
      userTeam: "ui/userTeam",
      userAssets: "ui/userAssets",
      instructionsRead: "ui/instructionsRead",
      introRead: "ui/introRead",
      showTeamSelect: "ui/showTeamSelect",
      // tileMap: 'ui/tileMap',
      //activeGame: 'ui/activeGame',
      demoData: 'ui/demoData',
      tileTemplate: 'ui/tileTemplate',
      itemTemplate: 'ui/itemTemplate'
    }),
    userPlayer(){
      const {walletAddress, userTeam, gameData} = this;
      const players = gameData && gameData.players;
      const thisPlayer = players && players.find(pl => pl.id === walletAddress );
      if(thisPlayer) {
        return thisPlayer
      } else {
        const color = userTeam && this.getColor(userTeam)
        return {walletAddress, id: walletAddress, displayName: "New Player", team: userTeam, color}

      }
    },
    playerLocation(){
      const {gameData, walletAddress, userPlayer} = this;
      if(!gameData){return false}
      console.log('player gameData:', userPlayer);
      const {players, units} = gameData;
      const player = userPlayer;
      console.log('units:', units)
      if(!units){return}
      let playerId = player && player.id;
        
      if(player){
        if(!playerId){return}
        const playerUnit = units.find(unit => unit.id && unit.id.toString() === playerId.toString());
        console.log('playerUnit?', playerUnit)
        if (playerUnit){
          return playerUnit.location;
        } else {
          return null;
        }
      } else {
        console.log('playerUnit here',  walletAddress)
        const playerUnit = units.find(unit => unit.id && unit.id.toString() === walletAddress.toString());
        console.log('playerUnit', playerUnit, walletAddress)
        if (playerUnit){
          return playerUnit.location;
        } else {
          return null;
        }
      }
    },
    userIsPlayer(){
      const {gameData, walletAddress} = this;
      if(!gameData || !walletAddress){return false}
      const {players} = gameData;
      const thisPlayer = players && players.find(player => player.id && player.id.toString() === walletAddress.toString());
      console.log('thisPlayer', thisPlayer)
      return thisPlayer ? true : false;
    },
    theTile(){
      const {gameData, selectedTile} = this;
      const {tiles} = gameData
      if(typeof selectedTile === 'number'){
        const theTile = tiles[selectedTile]
        return theTile
      } else {
        return null
      }
    },
    mapWidth(){
      const {gameData} = this; 
      if(!gameData){return}
      const {tileMap} = gameData; 
      const {rows, cols, tileSize = 240} = gameData.options; 
      console.log('rows, cols, tileSize', rows, cols, tileSize)
      return tileSize * cols;
    },
    mapHeight(){
      const {gameData} = this; 
      if(!gameData){return}
      const {tileMap} = gameData; 
      const {rows, cols, tileSize = 240} = gameData.options; 
      console.log('rows, cols, tileSize', rows, cols, tileSize)
      return tileSize * rows;
    },
    mapPadding(){
      return 48;
    },
    tileSize(){
      const {gameData} = this; 
      if(!gameData){return}
      // const {tileMap} = gameData; 
      const {tileSize = 240} = gameData.options; 
      // console.log('rows, cols, tileSize', rows, cols, tileSize)
      return tileSize;
    },
  },
  methods: {
    ...mapMutations({
      setBinData: "ui/setBinData",
      setUserTeam: "ui/setUserTeam",
      // setTiles: "ui/setTiles",
      setCreatures: "ui/setCreatures",
      resetGame: "ui/resetGame",
      setInstructionsRead: 'ui/setInstructionsRead',
      setIntroRead: 'ui/setIntroRead',
      setShowTeamSelect: 'ui/setShowTeamSelect',
      setActiveGame: 'ui/setActiveGame',
      setSaveData: 'ui/setSaveData'
    }),
    ...mapActions({
      getConfig: "ui/getConfig",
      getBin: "ui/getBin",
      updateConfig: "ui/updateConfig",
      createBin: "ui/createBin",
      getAssets: "ui/getAssets",
      generateGame: 'ui/generateGame',
      generateMapTiles: 'ui/generateMapTiles',
      arrayFromMapGrid: 'ui/arrayFromMapGrid',
      updateActiveGame: 'ui/updateActiveGame',
    }),
    updateSaveMeta(){
      const {gameData} = this;
      if(!gameData){return}
      this.setSaveData({
        saveId: gameData.id, 
        saveDate: null, 
        reset: true
      })
    },
    handlePanel(item){
      this.panel = item === this.panel ? null : item;
    },
    handleTeamSelect(teamObj){
      const userTeam = teamObj.team;
      this.setUserTeam(userTeam);
    },
    handleStartGame(compiledPlayer){
      console.group('= = START GAME = = ')
      const {gameData, userIsPlayer, userPlayer} = this;
      const {tiles, tileMap, players, units} = gameData 
      console.log('gameData', gameData);
      this.showGameWelcome = false;
      if(!gameData){
        console.error("no game data, bailing");
        return
      }
      const {useStartPoints} = gameData.options 
      let tempTiles = [...tiles]
      let tempPlayers = [...players]
      let tempUnits = units && [...units]
      if(compiledPlayer){
        console.log('compiledPlayer', compiledPlayer);
        const newPlayer = this.addPlayer(compiledPlayer, true)
        tempPlayers = [...tempPlayers, newPlayer]
      }
      
      if(useStartPoints){
        const {starts} = gameData && gameData.discover 
        if(starts &&  starts[0] && tileMap && tiles){
          
          const startLocation = starts[0];
          const thisOptions = {
            location: startLocation,
            tileMap: tileMap,
            settings: gameData.options, 
            tiles: tiles
          }
          const resultTile = this.autoFillTile(thisOptions)
          const filteredTiles = tempTiles.filter(tile => tile.location.toString() !== resultTile.location.toString());
          tempTiles = [...filteredTiles, resultTile]
        }
        
      }
        const newData = {
          ...gameData, 
          tiles: tempTiles, 
          players: tempPlayers, 
          // units: tempUnits
        }
        this.showGameWelcome = false;
        this.testData = newData;
        this.applyTestData();
        this.updateData();
        if(userIsPlayer){
          console.log('user isp player, should move to start location')
          // console.log('userPlayer', userPlayer());
          const {starts} = gameData && gameData.discover 
          if(useStartPoints && starts){
            const startLocation = starts[0];
            this.handlePlayerMove(startLocation, userPlayer);
          }
        }
      
       console.groupEnd()
    },
    addPlayer(compiledPlayer, isNewGame = false){
      const {gameData, userPlayer, playerTemplate} = this;
      const {players} = gameData;
      const newId = uuidv4();
      const newPlayer = compiledPlayer || {...playerTemplate, ...userPlayer}
      
      
      
      if(!newPlayer.id){
        newPlayer.id = newId;
      }
      newPlayer.joined = true; // sets the player available 
      newPlayer.active = true; // sets the player active 
      console.log('newPlayer', newPlayer)
      if(isNewGame){
        this.setShowTeamSelect(false);
        return newPlayer
      } else {
        const tempPlayers = [...players, newPlayer];
        console.log('players', players, newId, tempPlayers);
        const tempData = {...gameData}
        tempData.players = tempPlayers;
        console.log('tempData', tempData)
        this.testData = tempData;
        this.applyTestData();
        this.setShowTeamSelect(false);
      }
    },
    getUnit(location){
      const {units} = this;
      if(!units){
        return
      } 
      // const temp = [0, 1];
      // const tempLocation = temp.toString();
      const stringLocation = location.toString();
      // console.log('thisunit', tempLocation, stringLocation)
      // const thisUnit1 = units.map(u => {
      //     console.log('map', u.location, location);

      //   });
       const thisUnit = units.find(u => u.location.toString() === stringLocation);
         return thisUnit
    },
    getLoot(location){
      if(!this.gameData && this.gameData.discover){return}
      const {discover} = this.gameData;
      const lootArray = discover && discover.loot;
      if(!lootArray){return}
      const stringLocation = location.toString();
      const thisLoot = lootArray.find(u => u.location.toString() === stringLocation);
      return thisLoot
    },
    getCreature(location){
      if(!this.gameData && this.gameData.discover){return}
      const {discover} = this.gameData;
      const creatureArray = discover && discover.creatures;
      if(!creatureArray){return}
      const stringLocation = location.toString();
      const thisCreature = creatureArray.find(u => u.location.toString() === stringLocation);
      console.log('thisCreature', thisCreature)
      return thisCreature
    },
    getItems(location){
      if(!this.gameData){return}
      const {items} = this.gameData;
      
      
      // if(!items){return}
      const stringLocation = location.toString();
      const locationItems = items && items.filter(u => u.location.toString() === stringLocation);
      console.log('locationItems', locationItems)
      return locationItems
      
    },
    handleAutoFill(){
      
      const {activeGameId, gameData} = this;
      const {tileMap, tiles} = gameData;
      console.log('handle auto fill', gameData, tileMap, tiles);
      // const testLocation = tiles[0].location;
      // const testImageData = calculateTile({location: testLocation, tileMap, settings: {}, tiles});
      // console.log('test', testImageData);

      let letsGo = true;
      const mode = 'single'
      let tempTiles = [...tiles];
      let tempTileMap = [...tileMap];
      const compiledTiles = tiles.map((tile, tileIndex) => {
        console.group(`compile ${tileIndex}`)
        const newTileMap = this.compileTileMap(tempTiles);
        if(!letsGo){
          console.groupEnd();
          return
        }
        const avoidThis = tile.src;
        if (avoidThis){
          return
        }

        const thisOptions = {
          location: tile.location, 
          tileMap: tempTileMap,
          settings: gameData.options, 
          tiles: tempTiles
        }
        const result = this.autoFillTile(thisOptions)
        console.log('result', result);
        
          // tempTiles[tileIndex] = newTile;
        if(mode === 'single' || mode === 'test'){
            // const newData = {...gameData}
          const momentaryTiles = tempTiles.slice();
          const thisTile = momentaryTiles.findIndex(item => item.location.toString() === tile.location.toString());
          if(thisTile > -1){
            console.log('thisTile', thisTile);
            momentaryTiles[thisTile] = result;
            console.log('tile new momentaryTiles', momentaryTiles); 
            tempTiles = momentaryTiles
          }
        }
        if(mode === 'single'){
          letsGo = false
        }
        
        console.groupEnd();
        return result
      });
      console.log('compiledTiles', compiledTiles)
      console.log('compiled tempTiles', tempTiles)
      if (mode === 'test'){
        const finalTileMap = this.compileTileMap(tempTiles);
        const tempData = {...gameData, tiles: tempTiles, tileMap: finalTileMap}
        console.log('tempData would apply:', tempData )
        this.testData = tempData;
        // this.applyTestData();
        // this.gameData = tempData;
      }
      if (mode === 'single'){
        // const finalTileMap = this.compileTileMap(tempTiles);
        const tempData = {...gameData, tiles: tempTiles}
        console.log('tempData would apply:', tempData )
        this.testData = tempData;
        this.applyTestData();
        // this.gameData = tempData;
      }
      if(mode === 'all'){
        alert('mode is all');
        const newData = {...gameData}
        newData.tiles = compiledTiles;
        this.gameData = newData;
      }
    },
    autoFillTile(options){
      const {location, tileMap, settings, tiles} = options;
      const calculatedTile = calculateTile({location, tileMap, options: settings, tiles});
      const {tileImageIndex, imageSrc, possibles, cardinals} = calculatedTile;
      console.log('calculatedTile', calculatedTile);
      const tempTileValue = 99;
      const dataObj = {
        newTileValue: tempTileValue,
        newTileIndex: tileImageIndex,
        newTileSrc: imageSrc,
        location: location,
        tiles: tiles,
        // walletAddress, 
      }
      const newTile = compileTile(dataObj)
      return newTile;
    },
    applyTestData(){
      if(this.testData){
        this.gameData = this.testData;
        this.updateData();
        this.testData = null;
        console.log('test data now: ', this.testData)
        console.log('this.gameData now: ', this.gameData)
      }
    },
    async getCards(){
      this.isLoadingAssets = true;
      const assets = await this.getAssets();
      console.log('assets', assets)
      this.isLoadingAssets = false;
    },
    async loadData(props){
      const {gameData, id} = props;
      const {activeGame, localGames, games, siteData} = this;
      
      if(id){
        let tempGame = activeGame;
        console.log('Game id exists, load data', id, activeGame)
        if(!activeGame){
          console.log('no activegame, setting', localGames)
          const thisGameRemote = games && games.find(game => game.id === id);
          const thisGameLocal = localGames && localGames.find(game => game.id === id);
          tempGame = thisGameRemote || thisGameLocal;
          console.log('tempGame', tempGame)
          this.setActiveGame(tempGame);
        }
        console.log('now activegame is', tempGame)
        this.gameData = tempGame
        if(this.gameData){
           this.gameTeams = this.gameData.teams
         }
         return
       } else {
         const {demoData} = this;
         if(!demoData){
           console.error('no demoData')
         }
         console.log('demoData', demoData)
         this.gameData = this.demoData;
        this.gameTeams = this.demoData.teams
         
       }
       this.updateData({saveRemote: false});
    },
     async updateData({id, saveRemote}){
      const {gameTeams, gameData} = this;
      const {tiles, units} = gameData;
      const newTileMap = this.compileTileMap(tiles);
      if(!tiles){
        console.error('no tiles');
        console.groupEnd()
        return
      }
      if(units){
        this.units = units;
      }
      const tempTeams = [...gameTeams];
      tiles.map(tile => {
        console.log(tile.meta.team)
        const team = tile.meta.team;
        if(!team){return}
        const tempObjIndex = tempTeams.findIndex(t => t.team === team);
        if(tempObjIndex < 0){
          const tempObj = {team: team, count: 1, totalValue: tile.meta.value}
          tempTeams.push(tempObj)
        } else {
          const tempObj = {...tempTeams[tempObjIndex]};
          tempObj.totalValue =  tempObj.totalValue + tile.meta.value;
          tempObj.count =  tempObj.count + 1;
          tempTeams[tempObjIndex] = tempObj
        }
      }) 
      
      
      const orderedTeams = tempTeams.sort((a,b) => {
        return a.totalValue - b.totalValue
      }).reverse();
      const tempTiles = [...tiles]
      const sortedTiles = tempTiles.sort(function (a, b) {
        /** Sort rows then columns */
        return a.location[1] - b.location[1] || a.location[0] - b.location[0];
      });
      let tempGameData = {...gameData, tiles: sortedTiles}
      console.log('tempGameData', tempGameData);
      tempGameData.tileMap = newTileMap
      this.gameData = tempGameData;
      this.setActiveGame(tempGameData);
      this.gameTeams = orderedTeams;
      this.updateSaveMeta();
      if(saveRemote){
        this.updateActiveGame({gameData: tempGameData});
      }
      console.groupEnd()
    },
    compileTileMap(tiles){
      console.log('tiles1', tiles)
      if(!tiles){return}
      const locations = tiles.map((t) => t.location);
      const rows = locations.filter((l) => l[0] === 0);
      const cols = locations.filter((l) => l[1] === 0);
      const blankArray = new Array(rows.length).fill();
      const compiledMap = blankArray.map((_, rowIndex) => {
        const thisContent = tiles.filter((tile) => tile.location[1] === rowIndex);
        const asIndexes = thisContent.map((col) => col.index);
        return asIndexes;
      });
      console.log('compiledMap', compiledMap);
      return compiledMap;
    },
    async handleUser(){
      const team = await dialog.prompt('Select Your Team', null, {
          title: 'Your team',
          input: {
              placeholder: 'Red / Green / Purple / Yellow / Teal',
          },
      })
      const teamMap = {
        Green: "green",
        Red: "red",
        Purple: "purple",
        Yellow: "yellow",
        Blue: "blue",
        Teal: "teal",
      }
      if(teamMap[team] || teamMap[team] === team){
        // console.log('can set color', team);
        this.setUserTeam(team)
      }
      
    },
    handlePlaceItemStart(location, player){
      const {gameData, walletAddress, itemTemplate} = this;
      if(!gameData || !walletAddress){return}
      const {items} = gameData;
      console.log('place unit location, player', location, player, items)
      if(location && player && items){
        const newId = uuidv4();
        const newItem = {...itemTemplate, location: location, name: "example", id: newId, color: player.color}
        const tempItems = [...items, newItem];
        console.log('place unit newUnit', newItem);
        console.log('place unit tempUnits', tempItems);
        const tempData = {...gameData}
        tempData.items = tempItems;
        console.log('tempData now', tempData)
        
        this.testData = tempData;
        this.applyTestData();
        
      }
    },
    handlePlayerMove(location, player){
      const {gameData, walletAddress} = this;
      if(!gameData || !walletAddress){return}
      const {players, units = [], options} = this.gameData;
      const {optionClaimOnMove = false} = options;
      console.log('options', options)
      const newUnit = {
        location, 
        player: this.userPlayer,
        id: this.userPlayer.id
      }
      const filteredUnits = units.filter(u => u.id !== walletAddress);
      const tempUnits = [...filteredUnits, newUnit]
      const tempData = {...gameData, units: tempUnits}
      this.testData = tempData;
      
      this.applyTestData()
      this.updateData({saveRemote: true});
      if(optionClaimOnMove){
        this.handleClaim(location, null, false);
      }
    },
    async handleGenerateSelect(location, expandMap){
      /** placeholder function */
      const {gameData} = this
      this.setActiveGame(gameData);
      this.generateLocation = location
      this.generateMode = expandMap ? 'expand' : 'normal';
    },
    handleGenerateTile(location, newTile){
      const { previewTile, activeGameId, gameData} = this;
      console.log('handleGenerateTile', location, newTile)
      console.log('handleGenerateTile gameData', gameData)
      const {tiles} = gameData;
      const tempTiles = tiles.slice();
      const theIndex = tempTiles.findIndex(tile => tile.location === location);
      tempTiles[theIndex] = newTile;
      console.log('handleGenerateTile theIndex', theIndex)
      console.log('handleGenerateTile tempTiles[theIndex]', tempTiles[theIndex])
      console.log('handleGenerateTile tempTiles', tempTiles)
      console.log('handleGenerateTile newTile', newTile)
      // this.setTiles(tempTiles);
      let tempGameData = {...gameData}
      tempGameData.tiles = tempTiles;
      this.gameData = tempGameData;
      this.mapString = null;
      this.previewTile = null;
      this.updateData({saveRemote: true});
      this.generateLocation = null;
      this.handleTileSelect(null)
    },
    handleClaimCancel(){
      this.panel = null;
      this.selectedAsset = null;
      this.showSelectAsset = false;
      this.claimLocation =  null;
      this.selectedTile = null;
      this.selectedData = null;
    },
    handleClaimSelect(location){
      this.claimLocation = location;
      this.showSelectAsset = true;
      
      console.log('this.userTeam, walletAddress', this.userTeam, this.walletAddress)
      // if(this.userTeam){
      //   const tempMeta = {...this.selectedData.meta, team: this.userTeam, owner: this.walletAddress};
      //   console.log('tempMeta', tempMeta)
      //   const tempTiles = [...this.tiles];
      //   const tempTile = {...tempTiles[this.selectedTile]}
      //   tempTile.meta = tempMeta;
      //   tempTiles[this.selectedTile] = tempTile;
      //   this.setTiles(tempTiles)
      //   console.log('tiles', this.tiles)
      //   this.loadData();
      //   this.selectedTile = null;
      //   this.selectedData = null;
      // }
    },
    handleBattle(location, asset){
      console.log('battle!')
      this.isBattling = true;
      console.log('battle2')
      return setTimeout(() => {
        this.isBattling = true;
        
        return true
      }, 3000);
    },
    resolveBattle(location, asset, isBattle){
      const doIt = true;
      const {selectedTile, selectedData, userTeam, walletAddress, gameData} = this;
      const  {tiles} = this.gameData;

        const tempTiles = [...tiles];
        const existingTile = tempTiles[selectedTile];
        console.log('existingTile', existingTile);
        if(!existingTile){
          console.error('no existing tile', existingTile)
          return false
        }
        const defence = existingTile.meta.defence;
        const assetAttack = asset && asset.attack.Int64 || 0;
        const assetHealth = asset && asset.health.Int64 || 0;
        console.log('defence, assetAttack', defence, assetAttack, assetHealth);
        let newDefence = defence;
        let newCreature = asset;
        console.log('selectedData', selectedData);
        const tempMeta = {...selectedData.meta, team: this.userTeam, owner: this.walletAddress};
        console.log('tempMeta', tempMeta)
        if(defence <= assetAttack){
          console.log('defence is ', defence, 'and attack is', assetAttack);
          // TEMP use the attck value since health is 0
          console.log('thus the battle is won and the new defence is ', assetAttack);
          newDefence = assetAttack;
          tempMeta.defence = newDefence;
          tempMeta.creature = newCreature;
        } else  {
          console.log('defence is ', defence, 'and attack is', assetAttack);
          console.log('thus the battle is not won and the new defence is ', defence, ' minus', assetAttack);
          // console.log('thus the battle is won and the new defence is ', assetAttack);
          newDefence = defence - assetAttack;
          tempMeta.defence = newDefence;
        }
        
        const tempTile = {...tempTiles[selectedTile], owner: this.walletAddress}
        tempTile.meta = tempMeta;
        tempTiles[this.selectedTile] = tempTile;
        console.log('tempTile', tempTile)
        if(!doIt){return false}
        // this.setTiles(tempTiles);
        // console.log('tiles', this.tiles)
        const tempCreatures = this.compileGameCreatures(asset, location);
        
        let tempGameData = {...gameData}
        tempGameData.tiles = tempTiles;
        tempGameData.creatures = tempCreatures;
        this.gameData = tempGameData;
        
        // this.setTiles(tempTiles)
        this.isBattling = false;
        this.updateData({saveRemote: true});
        
        // this.selectedTile = null;
        // this.selectedData = null;
        this.selectedAsset = null;
        this.showSelectAsset = false;
        this.claimLocation =  null;
        this.setHighlightedTile(location)
        return true;
    },
    handleClaim(location, asset, isBattle){
      // await dialog.alert('Unavailable in demo', {
      //   title: 'Disabled',
      //   okText: 'OK',
      // });
        const delayAmount = 500;
        console.log('this.userTeam, walletAddress', this.userTeam, this.walletAddress)
        if(!this.userTeam){
          console.error('no user team, cannot resolve battle')
          return false
        }
        if(!isBattle){
          const result =  this.resolveBattle(location, asset, isBattle)
          console.log('not battle, should be false')
        } else {
          console.log('battle1!')
          this.isBattling = true;
          console.log('battle2')
          const battleValue = setTimeout(() => {
            console.log('battle3')
            // this.isBattling = true;
            const result =  this.resolveBattle(location, asset, isBattle)
            console.log('battle result: ', result)
            
          }, delayAmount);
          console.log('battleValue', battleValue)
          if(battleValue === true){
          console.log('battle resolve')
          
          }
        }
      
    },
    compileGameCreatures(asset, location){
      if (!this.gameData) {return}
      if(!asset){return}
      const {creatures} = this.gameData;
      const id = asset && (asset.id.Int64 || asset.id);
      const tempCreatures = [...creatures];
      if(!id){return}
      tempCreatures.push(id)
      // this.setCreatures(tempCreatures)
      return tempCreatures
    },
    setHighlightedTile(location){
      console.log('setting highlighted location', location);
      const {tiles} = this.gameData;
      const thisIndex = tiles.findIndex(tile => tile.location === location );
      console.log('thisIndex', thisIndex)
      this.highlightedIndex = thisIndex;
      setTimeout(() => {
        this.highlightedIndex = null;
      }, 2000);
    },
    selectCreature(asset){
      this.selectedAsset = asset;
      console.log('asset', asset, this.selectedAsset)
      this.showSelectAsset = false;
    },
    handleTileSelect(index){
      const {tiles} = this.gameData
      if(!tiles){
        console.error('no tiles');
        return
        }

      if(isNaN(index) || index === this.selectedTile){
        this.showInfo = false;
        this.selectedTile = null;
        this.selectedData = null;
        // this.panel = null;
      } else {
        this.showInfo = true;
        this.selectedTile = index;
        this.selectedData = tiles[index];
        this.panel = 'inspect';
      }
      console.log('selectedTile', this.selectedTile)
    },
    creatureExists(asset){
      const {creatures} = this.gameData;
      const id = asset.id.Int64 || asset.id;
      if(!id){return}
      const inArray = creatures.includes(id);
      return inArray;
    },
    handleClose(){
      console.log('close')
      this.showFull = false,
      this.fullIndex = null
    },
    handleRemoveItem(index){
      console.log('remove', index, this.binData, this)
      const currentData = this.binData;
      console.log('currentData', currentData)
      if(!currentData){ return}
      const tempArray = currentData.images.slice();
      const newArray = tempArray.filter((img, i) => i !== index);
      const newData = {...currentData, images: newArray}
      this.setBinData(newData)
      this.images = newArray
      this.showFull = false,
      this.fullIndex = null
      console.log('this.binData', this.binData)
      // const tempArray = this.images.slice()
      // console.log('newArray', newArray)
    },
    handleUpdateGallery(){
      // cosnt 
      // this.binData images - 
      console.log('do it')
    },
    handleGenerateGame(props){
      console.log('do it', props);
      this.showNewGameDialog = false,
      this.generateGame(props);
    },
    adjustMapSize(){
      this.showMapControls = true;
    },
    getTileBounds(tiles, direction){
      if(!tiles){return}
      if(!direction){
        /** do all */
        const tempRowsArray = tiles.map(tile => tile.location[1]);
        const sortedRowsArray = tempRowsArray.sort((a, b) => {
          return a - b;
        });
        const firstRowIndex = sortedRowsArray[0]
        const lastRowIndex = sortedRowsArray[sortedRowsArray.length -1];
        
        const tempColsArray = tiles.map(tile => tile.location[0]);
        const sortedColsArray = tempColsArray.sort((a, b) => {
          return a - b;
        });
        const firstColIndex = sortedColsArray[0]
        const lastColIndex = sortedColsArray[sortedColsArray.length -1];
        return {
          firstRowIndex, lastRowIndex, firstColIndex, lastColIndex
        }
      }


    },
    growMap(direction){
    /** remember that rows/cols can be different to locations, since coords cna be negative */
      console.log('grow', direction)
      if(!direction){return}
      const {gameData, tileTemplate} = this;
      const {rows, cols} = gameData.options;
      console.log('currentrows, ', rows, cols);
      let tempColCount = cols;
      let tempRowCount = rows;
      let tempTiles = gameData.tiles.slice();
      const tileBounds = this.getTileBounds(tempTiles);
      console.log('tileBounds', tileBounds);
       const {firstColIndex, firstRowIndex, lastRowIndex, lastColIndex} = tileBounds
      if(direction === 'east'){
        tempColCount = cols + 1;
        const newColIndex = lastColIndex + 1; // 0 based;
        console.log('newColIndex', newColIndex);
        
        /** now do the opposite of whatever we added */
        const rowArray = new Array(rows).fill();
          console.log('rowArray', rowArray)
          rowArray.map((item, rowIndex)=> {
          const thisRowIndex = firstRowIndex + rowIndex;
          console.log('thisRowIndex', thisRowIndex)
          console.log('new location would be: ', [newColIndex, thisRowIndex])
          const newLocation = [newColIndex, thisRowIndex];
          const workingTile = {...tileTemplate, location: newLocation};
          tempTiles.push(workingTile);
        });
        console.log('tempTiles', tempTiles)
      }
      if(direction === 'west'){
        tempColCount = cols + 1; // total columns
        const newColIndex = firstColIndex - 1; // 0 based;
        console.log('newColIndex', newColIndex);
        
        const rowArray = new Array(rows).fill();  
        rowArray.map((item, rowIndex)=> {
          const thisRowIndex = firstRowIndex + rowIndex;
          console.log('thisRowIndex', thisRowIndex)
          console.log('new location would be: ', [newColIndex, thisRowIndex])
          const newLocation = [newColIndex, thisRowIndex];
          const workingTile = {...tileTemplate, location: newLocation};
          tempTiles.push(workingTile);
        });
        console.log('tempTiles', tempTiles)
      }
      if(direction === 'north'){
        tempRowCount = rows + 1; // total columns
        const newRowIndex = firstRowIndex - 1; // 0 based;
        
        const colArray = new Array(cols).fill();  
        colArray.map((item, colIndex)=> {
          const thisColIndex = firstColIndex + colIndex;
          console.log('thisColIndex', thisColIndex)
          console.log('new location would be: ', [thisColIndex, newRowIndex])
          const newLocation = [thisColIndex, newRowIndex];
          const workingTile = {...tileTemplate, location: newLocation};
          tempTiles.push(workingTile);
        });
        console.log('tempTiles', tempTiles)
      }

      tempTiles.sort(function (a, b) {
        /** Sort rows then columns */
        return a.location[1] - b.location[1] || a.location[0] - b.location[0];
      });
      
      const tempOptions = {
        ...gameData.options,
        rows: tempRowCount,
        cols: tempColCount
      } 
      // const tempGameData = {...gameData, options: tempOptions};
      const tempData = {...gameData, options: tempOptions, tiles: tempTiles}
        console.log('tempData would apply:', tempData )
        this.testData = tempData;
        this.applyTestData();
        this.updateData({saveRemote: true});

    },
  
    compare (a, b, attribute) {
      return a[attribute] - b[attribute];
    },
    setTileSet(id){
      const {gameData} = this
      const tempData = {...gameData};
      console.log('setTileSet', id, tempData);
      // tempData.options.tileSetId = id;
      const tempOptions = {...tempData.options, tileSetId: id};
      tempData.options = tempOptions;
      
      console.log('tempData', tempData, tempOptions)
      this.testData = tempData;
      this.applyTestData();
      this.updateData({saveRemote: true});
    },
    setScale(change){
      const newValue = this.scale + change;
      var rounded = Math.round(newValue * 10) / 10
      this.scale = rounded
    },
    getColor(team){
      const {gameTeams} = this;
      if(!gameTeams || !team){return}
      const teamObj = gameTeams.find(t => t.team === team)
      const color = teamObj && teamObj.color
      return color
    },
    highlightTeam(team){
      // const mapContainer = this.$refs.mapcontainer;
      const divs = document.querySelectorAll(`.grid-tile.${team.toLowerCase()}`);
      console.log('them', divs)
      const arrayList = [...divs];
      arrayList.map(div => {
        div.classList.add('highlighted');
      });
          setTimeout(() =>{
      arrayList.map(div => {
        div.classList.remove('highlighted');
        });
      }, 2000);

    },
    saveGame(){
      const {gameData, games} = this;
      if(!gameData){return}
      const id = gameData.id;
      const game = games && games.find(game => game.id === id);
      
      console.log('game', game, id);
      const tempGames = [...games]
      tempGames.filter(game => game.id !== id);
      tempGames.push(gameData);
      
      // if(!id){
      //   console.log('something went wrong, id is missing', id)
      // }
      // const game = this.localGames && this.localGames.find(game => game.id === id);
      // console.log('game is', game)
      this.updateConfig({games: tempGames});
      // this.$router.push(`/game/${game.id}`)
    },
    handleRightClick(event, location){
      const {playerLocation} = this;
      console.log('evenbt', event, location)
      event.preventDefault();
      if(location && playerLocation && playerLocation.toString() === location.toString()){
        alert('yesss')
      }
    },
    async applyMapGrid(){
      const {gameData} = this;
      const {mapGrid} = gameData.options;
      const {tiles} = gameData;
      console.log('mapGrid', mapGrid, tiles)
      const result = await this.arrayFromMapGrid({grid: mapGrid})
      console.log('result', result);
      
      if(!result){return}
      const rows = result.length;
      const cols = result[0] && result[0].length;
      console.log('rows and cols, ', rows, cols);
      const tempGridTiles = [];
      const tempTileMap = result && result.map((row, rowIndex) => {
        console.log('row', row);
        const tempRows =  row.map((colValue, colIndex) => {
          const isTrue = colValue === '1' ? true : 0;
          const thisLocation = [colIndex, rowIndex];
          const matchingTile = tiles.find(tile => tile.location.toString() === thisLocation.toString());
          console.log('matchingTile', matchingTile)
          const mergedTile = {...matchingTile, hasMapElement: isTrue}
          
          tempGridTiles.push(mergedTile)
          return isTrue;
        })
        return tempRows;
      });
      console.log('tempGridTiles', tempGridTiles);
      console.log('compiled tempTIleMap', tempTileMap);
      const tempData = {...gameData, tiles: tempGridTiles, tileMap: tempTileMap}
      console.log('tempData would apply:', tempData )
      this.testData = tempData;
      this.applyTestData();
      this.gameData = tempData;
    },
    applyGeneratedTiles(){
      const mode = 'single';
      let tempGameTiles = gameData.tiles.slice();
      // const newTileImageData = forceCalculateTile({directions: {north: false, east: true, south: true, west: false}, tileSetId: gameData.options.tileSetId});
      const compiledTiles = tempGridTiles.map((tile, tileIndex) => {
        const location = tile.location;
        const newTileImageData = calculateTile({
          location: location, 
          tileMap: tempTileMap, 
          includeContext: false, 
          settings: gameData.settings || {}, 
          tiles: tempGridTiles
          });
          console.log('newTileImageData', newTileImageData)
          const {tileImageIndex, imageSrc, } = newTileImageData;
          if (mode === 'single'){
            const dataObj = {
            newTileValue: 0,
            newTileIndex: tileImageIndex,
            newTileSrc: imageSrc,
            location: location,
            tiles: tempGameTiles,
            // walletAddress, 
          }
          const newTile = compileTile(dataObj)
          // const result = this.autoFillTile(thisOptions)
          
          const momentaryTiles = tempGameTiles.slice();
          const thisTile = momentaryTiles.findIndex(item => item.location.toString() === tile.location.toString());
          
          if(thisTile > -1){
            console.log('thisTile', thisTile);
            momentaryTiles[thisTile] = newTile;
            console.log('tile new momentaryTiles', momentaryTiles); 
            tempGameTiles = momentaryTiles
          }
          // const finalTileMap = this.compileTileMap(tempTiles);
          const tempData = {...gameData, tiles: tempGameTiles}
          console.log('tempData would apply:', tempData )
          this.testData = tempData;
          this.applyTestData();
          this.gameData = tempData;
        }
      })
    },
    random(_, { min, max, float = false }) {
      const val = Math.random() * (max - min) + min;
      if (float) {
        return val;
      }
      return Math.floor(val);
    },
  }
}
</script>

<style lang="scss">
section#intro{
  height: calc(100vh - 4rem);
}
.menu-column{
  border-right: 1px solid var(--line-color);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 4rem;
  height: 100%;
  width: 4rem;
  background-color: var(--v-card-darken1);
  .menu-item{
    &.selected{
      // background: var(--v-card-lighten1);
      background: var(--line-color);
    }
  }
}
.info-column{
  // min-width: 320px;
  border-right: 1px solid var(--line-color);
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  .info-item{
    flex-grow: 1;
    &.summary-container{
      flex-basis: 3rem;
      flex-shrink: 1;
      flex-grow: 1;
    }
    &.tabs-container{
      flex-shrink: 1;
      flex-grow: 1;
      flex-basis: 90%;
    }
    &.options-row{
      flex-basis: 3rem;
      flex-shrink: 0;
      flex-grow: 0;
      justify-self: flex-end;
    }
    &.minimap-row{
      flex-basis: 120px;
      
    }
  }
  .info-game{
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .options-row.player-item{
      > .col{
        height: 100%;
      }
    }
  }
  
}
.content-column{
  height: 100%;
  padding: 0;
  background: rgba(0,0,0,.05);
  position: relative;
  max-width: calc(75% - 4rem); // account fo menu
}
.menu-column + .content-column {
  flex-basis: calc(100% - 4rem); // account fo menu
  max-width: calc(100% - 4rem); // account fo menu
}
$outsideRowSize: 3rem;
.map-container{
  position: relative;
  overflow: scroll;
  height: 100%;
  padding: 0;
  user-select: none;
  transform: translateZ(0);
  opacity: 1;
  transition: opacity .2s ease-in;
  &.working{
    opacity: .8;
  }
  .map-postion{
    position: relative;
    padding: 0;
  }

  .explore-button-row, 
  .explore-button-col{
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    // background: rgba(90, 189, 247, 0.541);
    overflow: hidden;
    // display: flex;
    align-items: center;
    justify-content: center;
    
    &.row-top{
      height: $outsideRowSize;
      left: $outsideRowSize;
      top: 0;
    }
    &.row-bottom{
      top: unset;
      bottom: 0;
      height: $outsideRowSize;
      left: $outsideRowSize;
    }
    &.col-left{
      top: $outsideRowSize;
      width: $outsideRowSize;
      left: 0;
      
    }
    &.col-right{
      top: $outsideRowSize;
      width: $outsideRowSize;
      left: unset;
      right: 0;
      
    }
    &.col-left, &.col-right{
      .add-button{
        transform: rotate(-90deg);
        transform-origin: center;
      }

    }
    // background: rgba(0,0,0,.8);
    // z-index: -1;
  }
  .grid-wrap{
  // background-color: #ffffff;
    position: relative;
    transform-origin: 0 0;
  }
  &.highlight-team{
    .grid-tile{
      box-shadow: 0 0 0 3px white inset;
    }
  }
  &.map-mode-hidden{
    .grid-wrap{
      outline: 11px var(--line-color, #db569e);
      outline-offset: 1px;
      outline-style: ridge;
      margin: 2rem 0 0 2rem;
    }
  }
  &.map-mode-explore{
    .add-button{
      background: #571b4b;
      background: var(--line-color);
    }
    // padding: calc(240px);
    .explore-button-row, .explore-button-col{
      display: flex;
    }
    .map-controls{
      display: none;
    }
    >div.map-position{
      > div.grid-wrap{
        background-color: rgba(255,255,255,.05);
        position: relative;
        left: $outsideRowSize;
        top: $outsideRowSize;
      }
    }
  }
}
.loading-container{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: var(--v-card-darken1);
  z-index: 99;
  display: grid;
  place-items: center;
  opacity: .8;
}
  .map-controls{
    position: fixed;
    lefT: 50%;
    bottom: 0;
    z-index: 90;
    // background: rgba(255,255,255,.9);
    // background: var(--line-color);
    border-radius: 0.75rem .75rem 0 0 ;
    > .col{
      font-size: .675rem;
      flex-direction: column;
      height: 2rem;
      label{
        font-size: .675rem;
      }
    }
    .value-controller{
      height: 1.5rem;
      background: #444;
      flex-direction: row;
      display: flex;
      border-radius: 1.4rem;
    }
  }
  .grid-resize-position{
    &.east{
      background: rgba(255,255,255,.1);
      position: absolute;
      right: 0;
      top: 50%;
      border-radius: .25rem 0 0 .25rem;
    }
  }
.grid-wrap{
  width: 960px;
  height: 720px;
  display: flex;
  flex-wrap: wrap;
  
  

  
}
.tile-current{
    position: absolute;
    left: 3%;
    top: 3%;
    display: flex;
    flex-direction: row;
    
    > div{
      border-radius: 2rem;
      width: 1.1rem;
      height: 1.1rem;
      line-height: calc(1.1rem - 2px);
      margin-right: 0.25rem;
      font-size: 0.5rem;
      font-weight: bold;
      // background: var(--ui-color, #222);
      color: #222;
      text-align: center;
      background: rgba(255,255,255,1);
      // box-shadow: 0 2px .5rem -0.15rem rgba(0, 0, 0, 0.8);
        border: 1px solid #222;
      &.tile-team{
        &.Blue{
          background: blue;
        }
        &.Red{
          background: red;
        }
        &.Yellow{
          background: gold;
        }
        &.Purple{
          background: violet;
        }
        &.Green{
          background: lime;
        }
        &.Teal{
          background: teal;
        }
        transform: scale(1);
        transition: transform .3s ease;
        transition-delay: 0.1s;
      }
      &.tile-owner{
        background: black;
        color: #eee;
        font-size: .875rem;
        font-weight: bold;
        text-align: center;
        line-height: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        transform: scale(1);
        transition: transform .3s ease;
        transition-delay: .2s;
      }
      &.tile-defence{
        border: none;
        background: transparent;
        padding: 0;
        transform: scale(1);
        transition: transform .3s ease;
        transition-delay: .2s;
        color: #111;
        display: flex;
        align-items: center;
        justify-content: center;
        // font-size: .75rem;
        font-weight: bold;
        .v-icon{
          position: absolute;
          z-index: -1;
          transform: scale(0.8);
          filter: drop-shadow(0px 0px 1px #111);
        }
      }
    }
  }
.grid-tile{
  width: 240px;
  height: 240px;
  flex-shrink: 0;
  position: relative;
  transform: translateY(0px) scale3d(1, 1, 1) perspective(0px) rotate3d(0, 0, 0, 0);
  transition: .3s ease-in-out transform, .3s ease-in-out filter;
  transform-style: preserve-3d;
  perspective: 1000;
  background: transparent;
  // background: url(https://gateway.pinata.cloud/ipfs/QmTKD3AgeNSo1AGL4rKMX4RhoLNwZ1iXMUcdW75zW5iozc/ground.jpg) center center no-repeat;
  background-size: contain;
  &.generate{
    // border: 2px dotted #222;
    border: none;
    background: transparent;
    &:before{
    opacity: .9;
    content: "";
    margin: 1rem;
    border: 1px dashed rgba(255,255,255,.3);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: .5rem;
    }
  }
  
  
  

  .emptyinfo, .blankinfo{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 140px;
    height: 140px;
    margin: -70px auto auto -70px;
    border-radius: .5rem;
    border: 1px dotted rgba(0,0,0,.9);
    color: rgba(0,0,0,.5);
    font-size: 1rem;
    text-align: center;
    line-height: 140px;
    background: rgba(255,255,255,.1);
  }
  .blankinfo{
    background: transparent;
    bordeR: none;
    color: #111;
    line-height: 50px;
    color: #222;
  }
  .metainfo{
    position: absolute;
    top: -.5rem;
    left: 10%;
    // right: .5rem;
    // bottom: .5rem;
    border-radius: .5rem;
    z-index: 40;
    color: #fff;
    font-size: .75rem;
    // display: none;
    // visibility: hidden;
    .inside{
      // min-width: 280px;
      position: relative;
      background: rgba(34, 34, 34, 1);
      opacity:0;
      transform: translateY(-4px) translateX(0px);
      transition: transform ease .3s, opacity linear .3s;
      transition-delay: .1s;
      box-shadow: 0px 0px 10px rgba(0,0,0,.3);
      padding: .5rem;
    }
    
  }
  &:hover:not(.highlighted), &.selected{
    
    // box-shadow: 0 0 1px 1px rgba(14,21,47,0.4), 0 45px 100px rgba(14,21,47,0.4), 0 16px 40px rgba(14,21,47,0.5);
    box-shadow: 0 0 1px 1px rgba(73, 79, 100, 0.4), 0 15px 30px rgba(14,21,47,0.4);
    outline: 1px dotted rgba(255,255,255,.5);
    outline-offset: -3px;
    // transform: translateY(-12px) scale3d(1.1, 1.1, 2) perspective(800px);
    transform: translateY(-0px) scale3d(1, 1, 2) perspective(800px);
    z-index: 4;
    position: relative;
    cursor: pointer;
    .asset{
      transform: scale3d(1.07, 1.07, 1.07) translateY(-4px);
      filter: drop-shadow(0px 10px 20px black);
    }
    .metainfo{
      display: block;
      visibility: visible;
      
      .inside{
        background: rgba(34, 34, 34, 1);
        opacity:.9;
        transform: translateY(0px) translateX(-20px);
      }
    }
  }
  &.selected{
    // box-shadow: 0 0 0 3px rgba(255,255,255,.8) inset;
    box-shadow: none;
    outline: 1px dotted rgba(255,255,255,.5);
    outline-offset: -3px;
    // outline: 2px solid var(--ui-color);
    // outline: 2px solid var(--background-color);
    
    &:hover{
      // box-shadow: 0 0 0 3px rgba(255,255,255,.8) inset, 0 0 1px 1px rgba(73, 79, 100, 0.4), 0 15px 30px rgba(14,21,47,0.4);
      box-shadow: none;
    }
  }
}
  .grid-wrap{
    &:hover, &.selected{
      .grid-tile{
        // filter: grayscale(1);
        &:hover, &.selected{
           // filter: grayscale(0);
        }
      }
    }
  }
  .info-column{
    position: relative;
    height: 100%;
    z-index: 1;
    
  }
  .options-content, .selected-content{
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // border-right: 1px solid var(--line-color);
    overflow-y: scroll;
    padding: 0;
  }
  .selected-content{  
    .emptytile{
      background: rgba(255,255,255,.05);
      padding: .5rem;
      border: .5rem;
    }
  }
  
    .controller{
        &:before{
          content: "";
          display: inline-block;
          margin-right: 3px;
          width: 1rem;
          height: 1rem;
          border-radius: 1rem;
        }
      &.Green{
        &:before{
          background: lime;
        }
      }
      &.Blue{
        &:before{
            background: blue;
        }
      }
          &.Red{
            &:before{
            background: red;
            }
          }
          &.Yellow{
            &:before{
            background: gold;
            }
          }
          &.Purple{
            &:before{
            background: violet;
            }
          }
          &.Teal{
            &:before{
            background: teal;
            }
          }
    }
    .dialog{
      position: fixed !important;
      z-index: 48;
      left: 50%;
      top: 50%;
      margin-left: -300px;
      margin-top: -250px;
      width: 600px;
      height: 500px;
      background: #222;
    }
    .claim{
      position: fixed !important;
      z-index: 48;
      // left: 1rem;
      // top: 1rem;
      // right: 1rem;
      // bottom: 1rem;
      left: 50%;
      top: 50%;
      margin-left: -300px;
      margin-top: -250px;
      width: 600px;
      height: 500px;
      background: #222;
      &.join{
        height: unset;
      }
      &.battling{
        box-shadow: 0 0.5rem 5rem 0 gold !important;
        .claim-action-row{
          .claim-action-col{ transform: translate3d(0, 1rem, 0);
            opacity: .8;
          }
        }
        .claim-title-row{
          .claim-title-col{ 
            transform: translate3d(0, -2rem, 0);
            opacity: .9;
          }
        }
      }
      .v-card__title{
        + .v-card__text{
          padding-top: 1rem !important;
        }
      }
      .v-card__text{
        height: 100%;;
      }
      .claim-title-row{
        position: absolute;
        top: -1.5rem;
        z-index: 7;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // width: auto;
        .claim-title-col{
          border-radius: .5rem;
          transform: translate3d(0, 0, 0);
          transition: transform .2s ease;
          // box-shadow: 0 2px 5px rgba(0,0,0,.7);
          border: 1px solid var(--line-color);
          background: #222;
          text-transform: uppercase;
        }
        
      }
      .claim-action-row{
        position: absolute;
        bottom: -1rem;
        z-index: 7;
        .claim-action-col{
          border-radius: .5rem;
          border: 1px solid var(--line-color);
          // box-shadow: 0 2px 5px rgba(0,0,0,.7);
          transform: translate3d(0, 0, 0);
          transition: transform .2s ease;
          background: #222;
          text-transform: uppercase;
          
        }
      }
      .claim-row{
        justify-content: stretch;
        align-items: stretch;
        height: 100%;
      }
      .claimCol{
       border-right: 1px solid var(--line-color);
       position: relative;
       
       + .claimCol{
         border-right: none;
       }
       .vs{
         width: 2rem;
         height: 2rem;
         border-radius: 2rem;
         line-height: 2rem;
         text-align: center;
         font-weight: bold;
         background: #fff;
          position: absolute;
          left: -1rem;
          top: 50px;
          color: var(--ui-color);
        }
       .action{
         width: 5rem;
         height: 2rem;
         border-radius: .5rem;
         line-height: 2rem;
         text-align: center;
         font-weight: bold;
         background: #fff;
          position: absolute;
          left: -3.5rem;
          bottom: -1rem;
          color: var(--ui-color);
        }
      }
      .creature-zone{
        
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -200px 0 0 -200px;
        width: 400px;
        height: 400px;
        background: #262626;
        border: 1px solid var(--line-color);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        border-radius: .5rem;
        display: none;
        .tile-creature, .user-creature{
          flex-basis: 50%;
          flex-shrink: 0;
        }
        
        .user-creature{
          border-left: 1px solid var(--line-color);

        }
      }
    }
    .assetGrid{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      overflow: scroll;
      width: 100%;
      .asset{
        width: 96px;
      min-height: 131px;
      }
      &.flow{
        flex-wrap: wrap;
        overflow: inherit;
        .asset{
          margin: 0 2px 2px 0;
          // width: calc((100% / 3) - 6px);
        }
      }
      
    }
    .asset{
      min-width: 96px;
      max-width: 180px;
      &.card{
        background: #111;
        box-shadow: 0 2px 5px black;
        padding: .25rem;
        border: 1px solid #333;
        margin: 0 4px 4px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: calc(128px + 8px);
      }
      
      .card-meta-text{
        font-size: .75rem;
      }
      img{
        width: 100%;
      }
      &.disabled{
        filter: grayscale(1);
        img{
          opacity: .7;
          filter: grayscale(1);
        }
      }
    }
    .claim-layer{
      position: absolute;
      lefT: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 9);
      z-index: 5;
      border-radius: .25rem;
      padding: 2rem .5rem;
      .help{
        background: transparent;
      }
      &.assetGrid{
        
      }
      &.battle{
        z-index: 8;
        // background: var(--ui-color, #111);
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .battle-icon{
          .v-icon:before{
            transform: scale3d(1.5, 1.5,   1.5);
            transition: transform .3s ease-in-out;
            transition-delay: .5s;
            filter: drop-shadow(0px 1px 1px black);
          }
          transform: scale3d(1.5, 1.5,   1.5);
            transition: transform .3s ease-in-out;
            transition-delay: .5s;
            bordeR: 1px solid gold;
            border-radius: 2rem;
            box-shadow: 0 0 4rem gold;
            position: relative;
            // animation: loadingRotate 1.3s linear infinite;
            animation: animaterotate 1.5s linear infinite;
            animation-direction: forwards;
            animation-fill-mode: forwards;

        }
      }
    }
    .select-btn{
      position: absolute;
      right: 0.5rem;
      bottom: 0.5rem;
    }
    .actionzone{
      width: 200px;
      border: 1px solid var(--line-color);
      border-left: none;
      padding: .25rem;
      background: rgba(255,255,255,.05);
      height: 260px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      z-index: 5;
      position: relative;
      &.tile{
        border-radius: .5rem 0 0 .5rem ;
        position: relative;
        right: -1px;
        border-right: none;
      }
      &.user{
        border-radius: 0 .5rem .5rem 0;
        position: relative;
        left: -1px;
        border-left: none;
      }
    }
    .feature{
      background: violet;
      width: 2rem;
      height: 2rem;
      border-radius: 2rem;
      color: #fff;
      text-shadow: 0 -1px 1px rgba(0,0,0,.2);
      text-align: center;
      line-height: 2rem;
      font-weight: bold;
      &.feature-outline{
        background: transparent;
        border: 1px solid var(--line-color);
        margin-left: 4px;
        box-sizing: content-box;
      }
    }
    .tabs-container{
      min-width: 200px;
      width: 100%;
      .tabs-row, .v-tabs-bar{
        height: 24px;
        width: 100%;
      }
    }
    .tab-element{
      font-size: .75rem;
      min-width: 50px;
      padding: 0 4px;
    }
  @keyframes animaterotate {
    0% {
      // transform: rotate(0deg) scale(1.0);
      // transform: rotate(0deg);
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
  .bg-darker{
    background-color: var(--v-card-darken1) !important;
  }
  .card-bg{
    // background-color: var(--v-card-base) !important;
    &.v-card{
      &.theme--dark{
        background-color: var(--v-card-base);
        .v-tabs-bar, .v-tabs-items{
          background-color: var(--v-card-base);
        }
      }
    }
    &.v-expansion-panel{
      border: 1px solid var(--line-color);
      .theme--dark &{
        background-color: var(--v-card-base);
      }
    }
  }
  .error-message{
    padding: .5rem;
    background: var(--line-color);
    margin: 5rem;
  }
</style>
