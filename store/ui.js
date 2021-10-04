import { getField, updateField } from "vuex-map-fields";
import { v4 as uuidv4 } from "uuid";
import {
  readThatShit,
  readThatMeta,
  // readAdditionalMeta,
  // readImageLink,
} from "../utils/web3Read";
// import { getContrast } from "../utils/theme";
// import { resolveEns } from "../utils/wallet";
// moTileMap: [
//   [6, 14, 14, 12],
//   [5, 1, 7, 0],
//   [3, 10, 0, 0]
const tileSets = [
  {
    name: "default",
    id: "QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me",
  },
  {
    name: "water",
    id: "QmPEDQuK7orQKbKwsw3z8nPJcaAXSwXT4q5E7sdgjaSvpP",
  },
  {
    name: "island",
    id: "Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk",
  },
];
const tileTemplate = {
  id: null,
  src: null,
  title: null,
  location: null,
  index: null,
  sides: [],
  tile: null,
  meta: {
    value: null,
    attack: null,
    defence: null,
    team: null,
    owner: null,
    creature: null,
  },
};
const defaultTiles = [
  {
    id: "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
    src: "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/6.png",
    title: "north west",
    location: [0, 0],
    index: 6,
    sides: [],
    meta: {
      value: 18,
      attack: 4,
      defence: 6,
      team: "Yellow",
      owner: "0x1234",
      // creature:
      //   "https://testnets.opensea.io/assets/0x749335b3a18034118c37841286256d57f770c40f/1",
      // creatureSrc:
      //   "https://storage.opensea.io/gods-unchained-asset-images/v0_0/proto121/quality4.png",
      creature: {
        id: 319,
        name: "Griffith, The Chosen",
        effect:
          "Protected. Ward.\u003cbr\u003eRoar: Set the strength of all other creatures with strength 4 or more to 1.",
        god: "light",
        rarity: "legendary",
        tribe: {
          String: "",
          Valid: false,
        },
        mana: 7,
        attack: {
          Int64: 6,
          Valid: true,
        },
        health: {
          Int64: 7,
          Valid: true,
        },
        type: "creature",
        set: "genesis",
        collectable: true,
        live: "true",
        art_id: "C136",
        lib_id: "L1-319",
      },
    },
  },
  {
    id: "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
    src: "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/14.png",
    title: "north",
    location: [1, 0],
    index: 14,
    sides: [],
    meta: {
      value: 8,
      attack: 3,
      defence: 6,
      team: "Purple",
      owner: "0x1234",
      // creature:
      //   "https://opensea.io/assets/0x0e3a2a1f2146d86a604adc220b4967a898d7fe07/24647211",
      // creatureSrc:
      //   "https://storage.opensea.io/gods-unchained-asset-images/v0_0/proto341/quality4.png",
      creature: {
        id: 341,
        name: "Merchant Prince",
        effect:
          "Roar: Reduce the cost of all cards in your hand that did not start in your deck by 1.",
        god: "deception",
        rarity: "rare",
        tribe: {
          String: "guild",
          Valid: true,
        },
        mana: 4,
        attack: {
          Int64: 2,
          Valid: true,
        },
        health: {
          Int64: 4,
          Valid: true,
        },
        type: "creature",
        set: "genesis",
        collectable: true,
        live: "true",
        art_id: "C315",
        lib_id: "L1-341",
      },
    },
  },
  {
    id: "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
    src: "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/14.png",
    title: "north east",
    location: [2, 0],
    index: 14,
    sides: [],
    meta: {
      value: 13,
      attack: 3,
      defence: 4,
      team: "Blue",
      owner: "0x1234",
      // creature:
      //   "https://opensea.io/assets/0x0e3a2a1f2146d86a604adc220b4967a898d7fe07/24702253",
      // creatureSrc:
      //   "https://storage.opensea.io/gods-unchained-asset-images/v0_0/proto23/quality4.png",
      creature: {
        id: 23,
        name: "Portal Wrangler",
        effect: "Roar: Add a copy of the last creature played to your hand.",
        god: "magic",
        rarity: "common",
        tribe: {
          String: "mystic",
          Valid: true,
        },
        mana: 4,
        attack: {
          Int64: 3,
          Valid: true,
        },
        health: {
          Int64: 4,
          Valid: true,
        },
        type: "creature",
        set: "genesis",
        collectable: true,
        live: "true",
        art_id: "C69",
        lib_id: "L1-023",
      },
    },
  },
  {
    id: "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
    src: "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/12.png",
    title: "north east",
    location: [3, 0],
    index: 12,
    sides: [],
    meta: {
      value: 9,
      attack: 3,
      defence: 4,
      team: "Blue",
      owner: "0x1234",
      // creature:
      //   "https://opensea.io/assets/0x0e3a2a1f2146d86a604adc220b4967a898d7fe07/24702253",
      // creatureSrc:
      //   "https://storage.opensea.io/gods-unchained-asset-images/v0_0/proto23/quality4.png",
      creature: {
        id: 401,
        name: "Light's Bidding",
        effect:
          "Roar: Transform a creature with strength 2 or less into a 2/2 Acolyte. Gain control of the Acolyte.",
        god: "light",
        rarity: "common",
        tribe: {
          String: "",
          Valid: false,
        },
        mana: 6,
        attack: {
          Int64: 2,
          Valid: true,
        },
        health: {
          Int64: 3,
          Valid: true,
        },
        type: "creature",
        set: "promo",
        collectable: true,
        live: "true",
        art_id: "C471",
        lib_id: "L4-002",
      },
    },
  },

  // ROW 2
  {
    id: "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
    src: "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/7.png",
    title: "West",
    location: [0, 1],
    index: 5,
    sides: [],
    meta: {
      value: 7,
      attack: 0,
      defence: 0,
      team: null,
      owner: null,

      creature: null,
    },
  },
  {
    id: "Qmevue8kqHJqH1sZWjTuZkNcpF2v3sUsx7zP68jmJmPyDx",
    src: "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/12.png",
    title: "Middle",
    location: [1, 1],
    index: 1,
    sides: [],
    meta: {
      value: 4,
      attack: 6,
      defence: 6,
      team: "Red",
      owner: "0x1234",
      creature: {
        id: 195,
        name: "Cyclops",
        effect:
          "After Cyclops attacks a creature, deal 1 damage to each other creature.",
        god: "war",
        rarity: "rare",
        tribe: {
          String: "wild",
          Valid: true,
        },
        mana: 6,
        attack: {
          Int64: 5,
          Valid: true,
        },
        health: {
          Int64: 5,
          Valid: true,
        },
        type: "creature",
        set: "genesis",
        collectable: true,
        live: "true",
        art_id: "C278",
        lib_id: "L1-195",
      },

      // creature:
      //   "https://opensea.io/assets/0x0e3a2a1f2146d86a604adc220b4967a898d7fe07/3920662",
      // creatureSrc:
      //   "https://storage.opensea.io/gods-unchained-asset-images/v0_0/proto195/quality4.png",
    },
  },
  {
    id: "Qmevue8kqHJqH1sZWjTuZkNcpF2v3sUsx7zP68jmJmPyDx",
    src: "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/5.png",
    title: "East",
    location: [2, 1],
    index: 5,
    sides: [],
    meta: {
      value: 4,
      attack: 6,
      defence: 6,
      team: "Purple",
      owner: "0x1234",
      creature: {
        id: 276,
        name: "Vile Mantis",
        effect:
          "Roar: Destroy two other random friendly creatures. This creature gains +2/+3 for each creature destroyed.",
        god: "death",
        rarity: "common",
        tribe: {
          String: "",
          Valid: false,
        },
        mana: 4,
        attack: {
          Int64: 3,
          Valid: true,
        },
        health: {
          Int64: 2,
          Valid: true,
        },
        type: "creature",
        set: "genesis",
        collectable: true,
        live: "true",
        art_id: "C19",
        lib_id: "L1-276",
      },

      //   "https://testnets.opensea.io/assets/0x749335b3a18034118c37841286256d57f770c40f/1",
      // creatureSrc:
      //   "https://storage.opensea.io/gods-unchained-asset-images/v0_0/proto276/quality4.png",
    },
  },
  {
    id: "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
    src: null,
    title: "north east",
    location: [3, 1],
    index: false,
    sides: [],
    meta: {
      value: null,
      attack: null,
      defence: null,
      team: null,
      owner: null,
      creature: null,
      creatureSrc: null,
    },
  },
  // ROW 3
  {
    id: "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
    src: "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/1.png",
    title: "South West",
    location: [0, 2],
    index: 3,
    sides: [],
    meta: {
      value: 21,
      attack: 6,
      defence: 5,
      team: "Red",
      owner: "0x1234",
      creature: {
        id: 163,
        name: "Mercenary Daemon",
        effect:
          "Frontline.\u003cbr\u003eRoar: Give an enemy creature frontline.",
        god: "war",
        rarity: "common",
        tribe: {
          String: "nether",
          Valid: true,
        },
        mana: 5,
        attack: {
          Int64: 6,
          Valid: true,
        },
        health: {
          Int64: 5,
          Valid: true,
        },
        type: "creature",
        set: "genesis",
        collectable: true,
        live: "true",
        art_id: "C307",
        lib_id: "L1-163",
      },

      //   "https://opensea.io/assets/0x0e3a2a1f2146d86a604adc220b4967a898d7fe07/16154254",
      // creatureSrc:
      //   "https://storage.opensea.io/gods-unchained-asset-images/v0_0/proto163/quality4.png",
    },
  },
  {
    id: "Qmevue8kqHJqH1sZWjTuZkNcpF2v3sUsx7zP68jmJmPyDx",
    src: "https://ipfs.cf-ipfs.com/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/3.png",
    title: "South",
    location: [1, 2],
    index: 10,
    sides: [],
    meta: {
      value: 13,
      attack: 4,
      defence: 4,
      team: "Green",
      owner: "0x1234",
      creature: {
        id: 295,
        name: "Ferocious Rougarou",
        effect:
          "Regen 2.\u003cbr\u003eWhen a friendly creature is summoned, this creature gets +1/+1.\u003cbr\u003eWhen a friendly creature dies, this creature takes 1 damage.",
        god: "nature",
        rarity: "common",
        tribe: {
          String: "amazon",
          Valid: true,
        },
        mana: 5,
        attack: {
          Int64: 4,
          Valid: true,
        },
        health: {
          Int64: 4,
          Valid: true,
        },
        type: "creature",
        set: "genesis",
        collectable: true,
        live: "true",
        art_id: "C255",
        lib_id: "L1-295",
      },

      //   "https://opensea.io/assets/0x0e3a2a1f2146d86a604adc220b4967a898d7fe07/16136745",
      // creatureSrc:
      //   "https://storage.opensea.io/gods-unchained-asset-images/v0_0/proto295/quality4.png",
    },
  },
  {
    id: "Qmevue8kqHJqH1sZWjTuZkNcpF2v3sUsx7zP68jmJmPyDx",
    src: null,
    title: "south",
    location: [2, 2],
    index: false,
    sides: [],
    meta: {
      value: null,
      attack: null,
      defence: null,
      team: null,
      owner: null,
      creature: null,
    },
  },
  {
    id: "QmRzcsXyxP4zDhmYiY1h9c5bExuxRxxExxGBwMvB6uozCo",
    src: null,
    title: "South West",
    location: [3, 2],
    index: false,
    sides: [],
    meta: {
      value: null,
      attack: null,
      defence: null,
      team: null,
      owner: null,
      creature: null,
    },
  },
];

const defaultCreatures = [106, 319, 341, 23, 401, 22, 195, 276, 163, 295];

const themeArray = [
  "lemon",
  "sand",
  "greyscale",
  "grayscale",
  "turquoise",
  "peach",
  "violet",
  "teal",
  "charcoal",
];

const defaultTeams = [
  { team: "Red", count: 0, totalValue: 0, god: "war", color: "#d15a47" },
  { team: "Green", count: 0, totalValue: 0, god: "nature", color: "#68cb4d" },
  { team: "Blue", count: 0, totalValue: 0, god: "magic", color: "#404dbf" },
  {
    team: "Purple",
    count: 0,
    totalValue: 0,
    god: "deception",
    color: "#ad43d0",
  },
  { team: "Yellow", count: 0, totalValue: 0, god: "light", color: "#d9b826" },
  { team: "Teal", count: 0, totalValue: 0, god: "death", color: "#22c3a3" },
];
// import ens from "ethereum-ens";
// const ens = require("ethereum-ens");
// console.log("ens", ens);
export const state = () => ({
  devMode: true,
  configStatus: null,
  setBinStatus: null,
  userAssets: null,
  assetsStatus: null,
  siteData: null,
  binData: null,
  network: "rinkeby",
  walletChain: "ethereum",
  hasChainSelect: false,
  hasWallet: false,
  walletAddress: null,
  walletStatus: "",
  walletProvider: null,
  walletNetwork: null,
  profileObject: null,
  ensName: "",
  ipfsUrl: "https://ipfs.cf-ipfs.com/ipfs/",
  activeContractId: "",
  activeContractName: "",
  activeContractSymbol: "",
  tempViewItem: {},
  showAccount: false,
  showSearch: false,
  searchParams: {},
  usedContracts: [],
  usedContractsObj: null,
  tempUsedContractsObj: null,
  activityId: "1234",

  hasVerticalGridLines: false,
  statusModalMode: "fixed",
  uiMode: "minimal",
  uiTheme: "charcoal",
  contrastMode: "light",
  allowRotation: true,
  hideUi: true, // used in 'none' uiMode
  devAddresses: [
    "0x03f0d81c9a73930b8034553fc54152cbd6958d0b", // gareth
    "0xd1c248d1c9879dc3b5a846d4dccc5b7aa8fbf432", // gareth
    "0x63a9dbCe75413036B2B778E670aaBd4493aAF9F3", //natealex
    "0xDbB59151b18Dd72E9AC092706e93De5b5d7a9325", // trislit
  ],
  // IMAGES
  hasImageOptimization: true,
  imageOptimizationUrl: "https://infinft.gumlet.net/fetch/", // https://arweave.net/KGxebgYGPYYYtZYCIvxsEEM-LC49KVwp00TYO98RbPA?width=1200
  // SEARCH FIELDS
  searchContractId: "",
  searchTokenId: "",
  // USER
  userTeam: null,
  userPoints: 1000,
  showTeamSelect: false,
  instructionsRead: false,
  introRead: false,
  // viewData: "",
  // viewData2: "", // to refactor out.
  // viewStatus: "",
  // TILES
  tileSets: tileSets,
  // GAME
  games: [],
  localGames: [],
  activeGame: null,
  tiles: defaultTiles,
  tileTemplate: tileTemplate,
  creatures: defaultCreatures,
  gameTeams: defaultTeams,
});

export const getters = {
  getField,
  siteData: (state) => state.siteData,
  games: (state) => state.games,
  localGames: (state) => state.localGames,
  activeGame: (state) => state.activeGame,
  tiles: (state) => state.tiles,
  tileTemplate: (state) => state.tileTemplate,
  creatures: (state) => state.creatures,
  gameTeams: (state) => state.gameTeams,
  userTeam: (state) => state.userTeam,
  userPoints: (state) => state.userPoints,
  userAssets: (state) => state.userAssets,
  tileSets: (state) => state.tileSets,
  binData: (state) => state.binData,
  binStatus: (state) => state.binStatus,
  configStatus: (state) => state.configStatus,
  devMode: (state) => state.devMode,
  statusModalMode: (state) => state.statusModalMode,
  hasWallet: (state) => state.hasWallet,
  hasChainSelect: (state) => state.hasChainSelect,
  hasVerticalGridLines: (state) => state.hasVerticalGridLines,
  hasImageOptimization: (state) => state.hasImageOptimization,
  imageOptimizationUrl: (state) => state.imageOptimizationUrl,
  walletChain: (state) => state.walletChain,
  walletAddress: (state) => state.walletAddress,
  walletNetwork: (state) => state.walletNetwork,
  walletStatus: (state) => state.walletStatus,
  ensName: (state) => state.ensName,
  ipfsUrl: (state) => state.ipfsUrl,
  profileObject: (state) => state.profileObject,
  showSearch: (state) => state.showSearch,
  showTeamSelect: (state) => state.showTeamSelect,
  viewData: (state) => state.viewData,
  viewStatus: (state) => state.viewStatus,
  uiMode: (state) => state.uiMode,
  hideUi: (state) => state.hideUi,
  uiTheme: (state) => state.uiTheme,
  contrastMode: (state) => state.contrastMode,
  allowRotation: (state) => state.allowRotation,
  activeContractId: (state) => state.activeContractId,
  activeContractName: (state) => state.activeContractName,
  activeContractSymbol: (state) => state.activeContractSymbol,
  usedContracts: (state) => state.usedContracts,
  usedContractsObj: (state) => state.usedContractsObj,
  tempUsedContractsObj: (state) => state.tempUsedContractsObj,
  draftsArray: (state) => state.draftsArray,
  activityId: (state) => state.activityId,
  tempViewItem: (state) => state.tempViewItem,
  instructionsRead: (state) => state.instructionsRead,
  introRead: (state) => state.introRead,
  searchData: (state) => {
    return {
      searchContractId: state.searchContractId,
      searchTokenId: state.searchTokenId,
    };
  },
  isDevAddress: (state) => {
    const isDevAddress = state.devAddresses.includes(state.walletAddress);
    return isDevAddress;
  },
  walletName: (state) => {
    const walletName = state.ensName || state.walletAddress;
    return walletName;
  },
  tileMap: (state) => {
    const { tiles } = state;
    if (!tiles) {
      /** no tiles array exists yet */
      return;
    }
    const locations = tiles.map((t) => t.location);
    const rows = locations.filter((l) => l[0] === 0);
    const cols = locations.filter((l) => l[1] === 0);
    const blankArray = new Array(rows.length).fill();
    const compiledMap = blankArray.map((_, rowIndex) => {
      const thisContent = tiles.filter((tile) => tile.location[1] === rowIndex);
      const asIndexes = thisContent.map((col) => col.index);
      return asIndexes;
    });
    return compiledMap;
  },
  // gameData: (state) => {
  //   const {tiles, activeGameId, games, creatures, gameTeams} = state;
  //   if(activeGameId){
  //     const gameData = games.find(game => game.id === activeGameId);
  //     return gameData
  //   } else {
  //     let demoData = {
  //       tiles,
  //       id:'demo',
  //       creatures,
  //       gameTeams,
  //     }
  //     return demoData
  //   }
  // },
  demoData: (state) => {
    const { tiles, activeGameId, localGames, creatures, gameTeams } = state;
    const options = {};
    // teams: defaultTeams,

    let demoData = {
      tiles,
      id: "demo",
      creatures,
      teams: defaultTeams,
      tileMap: [],
      players: ["admin", "player 1", "player 2", "player 3"],
      creatures: [],
      units: [
        {
          id: "admin",
          location: [0, 0],
        },
      ],
      options: {
        rows: 3,
        cols: 4,
        mapMode: "static",
        owner: "admin",
        tileSetId: "QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me",
      },
      map: {
        rows: 3,
        cols: 4,
      },
      owner: "admin",
      settings: {
        ...options,
        generateMap: false,
        hasValues: true,
        hasUnits: true,
      },
    };
    return demoData;
  },
};
export const mutations = {
  updateField,

  setUserTeam: (state, value) => {
    state.userTeam = value;
  },
  setUserPoints: (state, value) => {
    state.userPoints = value;
  },
  setShowTeamSelect: (state, value) => {
    state.showTeamSelect = value;
  },
  setLocalGames: (state, value) => {
    state.localGames = value;
  },
  setGames: (state, value) => {
    state.games = value;
  },
  setActiveGame: (state, value) => {
    state.activeGame = value;
  },
  setTiles: (state, value) => {
    state.tiles = value;
  },
  setTileMap: (state, value) => {
    state.tileMap = value;
  },
  setCreatures: (state, value) => {
    state.creatures = value;
  },
  resetGame: (state, value) => {
    state.tiles = defaultTiles;
  },
  setAssetsStatus: (state, value) => {
    state.assetsStatus = value;
  },
  setUserAssets: (state, value) => {
    state.userAssets = value;
  },
  setInstructionsRead: (state, value) => {
    state.instructionsRead = value;
  },
  setIntroRead: (state, value) => {
    console.log("value", value);
    state.introRead = value;
  },
  setConfigStatus: (state, value) => {
    state.configStatus = value;
  },
  setBinStatus: (state, value) => {
    state.binStatus = value;
  },
  setSiteData: (state, value) => {
    state.siteData = value;
  },
  setBinData: (state, value) => {
    state.binData = value;
  },
  add(state, text) {
    state.list.push({
      text,
      done: false,
    });
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1);
  },
  setUiMode(state, value) {
    state.uiMode = value;
    if (value === "none") {
      state.hideUi = true;
    }
  },
  setUiTheme(state, value) {
    // state.uiTheme = value;
    // if (process.client) {
    //   const doContrast = () => {
    //     const mode = getContrast();
    //     console.log("setting contrast to", mode);
    //     this.commit("ui/setUiContrast", mode);
    //     // state.contrastMode = mode;
    //   };
    //   setTimeout(() => doContrast(), 30);
    // }
  },
  setUiContrast(state, value) {
    state.contrastMode = value;
  },
  toggleHiddenUi(state, newValue) {
    state.hideUi = newValue;
  },
  setShowSearch(state, value) {
    state.showSearch = value;
  },
  setShowAccount(state, value) {
    state.showAccount = value;
  },
  setWalletChain(state, value) {
    state.walletChain = value;
  },
  setWallet(state, account) {
    console.log(account ? "setting account true" : "settings account false");
    state.hasWallet = account ? true : false;
    state.walletAddress = account ? account : null;
    // this.dispatch("ui/resolveEns", account);
    // resolveEns(account);
  },
  setEnsName(state, value) {
    console.log("setting ens name, ", value);
    state.ensName = value;
  },
  setProfileObject(state, profileObject) {
    if (!profileObject) {
      return;
    }
    const { name, description, website } = profileObject;
    const profileImageHash =
      profileObject &&
      profileObject.image &&
      profileObject.image[0] &&
      profileObject.image[0].contentUrl["/"];
    const profileCoverHash =
      profileObject &&
      profileObject.coverPhoto &&
      profileObject.coverPhoto[0] &&
      profileObject.coverPhoto[0].contentUrl["/"];

    const tempObj = {
      name,
      description,
      website,
      profileImageHash,
      profileCoverHash,
    };

    state.profileObject = tempObj;
  },

  setWalletStatus(state, value) {
    // console.log("setting wallet status", value);
    state.walletStatus = value;
  },
  setProvider(state, value) {
    state.walletProvider = value;
  },
  setNetworkName(state, value) {
    state.walletNetwork = value;
  },
  setHasImageOptimization(state, value) {
    console.log("setHasImageOptimization", value);
    state.hasImageOptimization = value;
  },
  setActiveContractId(state, value) {
    state.activeContractId = value;
    console.log("UI store setActiveContractId", value);
    this.commit("mintFormStore/setActiveContractId", value);
    const usedContractsArray = state.usedContracts || [];
    console.log("SETTINGS USED ONCTRACTS");
    if (!usedContractsArray.includes(value)) {
      usedContractsArray.push(value);
      state.usedContracts = usedContractsArray;
    }
    console.log("usedContractsArray", usedContractsArray);
  },
  removeUsedContractId(state, value) {
    console.log("state: ", state);
    console.log("removeusedcontractid: ", value);

    const newArray =
      state.usedContracts &&
      state.usedContracts.filter((item, index) => index !== value);
    if (newArray) {
      state.usedContracts = newArray;
    }
    console.log("newArray", newArray);
    const tempObj = { id: value };
    this.dispatch("ui/updateUsedContractsObj", { data: tempObj, remove: true });
  },
  setActiveContractData(state, data) {
    console.log("IO STORE setActiveContractData", data);
    if (!data.activeContractId) {
      return null;
    }
    state.activeContractId = data.activeContractId;
    state.activeContractName = data.activeContractName;
    state.activeContractSymbol = data.activeContractSymbol;
    const usedContractsArray = state.usedContracts || [];

    if (!usedContractsArray.includes(data.activeContractId)) {
      usedContractsArray.push(data.activeContractId);
      state.usedContracts = usedContractsArray;
    }
    // HANDLE OBJ VERSION
    const tempObj = {
      id: data.activeContractId,
      name: data.activeContractName,
      symbol: data.activeContractSymbol,
    };
    this.dispatch("ui/updateUsedContractsObj", {
      data: tempObj,
      remove: false,
    });
    console.log("ui state is now", state);
  },
  setDrafts(state, array) {
    state.draftsArray = array;
  },
  setUsedContractsObj(state, array) {
    state.usedContractsObj = array;
  },
  setTempUsedContractsObj(state, array) {
    state.tempUsedContractsObj = array;
  },
  clearActiveContractId(state, value) {
    state.activeContractId = null;
    this.commit("mintFormStore/clearActiveContractId", null);
  },
  setDevMode(state, value) {
    state.devMode = value;
  },
  setHasChainSelect(state, value) {
    state.hasChainSelect = value;
  },
  setHasVerticalGridLines(state, value) {
    console.log("settingslines, value", value);
    state.hasVerticalGridLines = value;
  },
  setStatusModalMode(state, value) {
    console.log("setStatusModalMode", value);
    state.statusModalMode = value;

    // if (value === 'fixed') {
    //   console.log('this', this)
    //   $modal.show('status-modal')
    // } else {
    //   $modal.hide('status-modal')
    // }
  },
  setActivityId(state, id) {
    // if(state.activityId){}
    state.activityId = id;
  },
  setSearchContractId(state, value) {
    state.searchContractId = value;
  },
  setSearchTokenId(state, value) {
    state.searchTokenId = value;
  },
  setSearchParams(state, params) {
    console.log("params", params);
    const { tokenId, contractId } = params;
    state.searchTokenId = tokenId;
    state.searchContractId = contractId;
    state.searchParams = params;
  },
  setViewData(state, data) {
    if (!data) {
      state.viewData = {};
    }
    if (data) {
      state.viewData = data;
    }
  },
  setViewData2(state, data) {
    state.viewData2 = data;
  },
  setViewStatus(state, newState) {
    state.viewStatus = newState;
  },
  setTempViewItem(state, data) {
    // console.log("settempvieitem", data);
    if (!data) {
      state.tempViewItem = {};
    } else {
      state.tempViewItem = data;
    }
  },

  setAllowRotation(state, newState) {
    console.log("setAllowRotation", newState);
    state.allowRotation = newState;
  },
};

export const actions = {
  generateGame(context, payload) {
    const { rows, cols, owner } = payload;
    const options = { ...payload };
    const id = uuidv4();
    console.log("generate Game", rows, cols, id);
    const { localGames } = context.state;
    const newTileArray = new Array(rows * cols).fill(tileTemplate);
    let newGameArray = [];
    const blankRowsArray = new Array(rows).fill();
    const blankColsArray = new Array(cols).fill();
    console.log("blankRowsArray", blankRowsArray);
    console.log("blankColsArray", blankColsArray);
    let flatLocations = [];
    const compiledLocations = blankRowsArray.map((_, rowIndex) => {
      const thisRowLocations = blankColsArray.map((_, colIndex) => {
        const thisLocation = [colIndex, rowIndex];
        const thisTile = {
          ...tileTemplate,
          id: `${colIndex}_${rowIndex}`,
          location: thisLocation,
        };
        newGameArray.push(thisTile);
        flatLocations.push(thisLocation);
        return [colIndex, rowIndex];
      });
      // console.log('thisRowLocations', thisRowLocations)
      return thisRowLocations;
    });

    const newTileMap = blankRowsArray.map((_, rowIndex) => {
      const thisRowIndexes = blankColsArray.map((_, colIndex) => {
        return null;
      });
      return thisRowIndexes;
    });
    console.log("newTileMap", newTileMap);
    console.log("compiledLocations", compiledLocations);
    console.log("flatLocations", flatLocations);

    if (id) {
      const tempGames = localGames.slice();
      const thisGame = {
        ...payload,
        id,
        options: options,
        tiles: newGameArray,
        tileMap: newTileMap,
        owner: owner,
        settings: {
          generateMap: false,
          tileSetId: "Qmd7d6UxQX4Zff7WrnqXsyUc2QaimaKKegghEub9ZaXVkk",
          hasValues: true,
          hasUnits: true,
        },
        map: {
          rows: rows,
          cols: cols,
        },
        creatures: [],
        players: [owner],
        teams: defaultTeams,
      };
      tempGames.push(thisGame);
      context.commit("setLocalGames", tempGames);
    }

    flatLocations.map((loc, i) => {
      newTileArray[i].location = loc;
    });
    context.commit("setTiles", newGameArray);
    // context.commit('setTileMap', newTileMap)
    return id;
  },
  generateMapTiles(context, payload) {
    console.log("payload", payload);
    const { gameData } = payload;
    const { tiles } = gameData;
    // console.log("tiles", gameData.tiles);
    if (!tiles) {
      return;
    }
    tiles.map((tile) => {
      console.log("tile.location", tile.location);
    });
  },
  async getAssets(context, data) {
    const { commit, state } = context;
    const { $axios } = this;
    const { walletAddress } = state;
    if (!walletAddress) {
      console.error("no wallet address");
    }
    // const binKey =
    //   "$2b$10$kIn/DemBXe9p46ZDooUw3udev8IC8LAVUiipJgYtAwPBhjqN0xAZ.";
    // const binId = "612d98a5259bcb6118ef73a4";

    await commit("setAssetsStatus", "working");
    const assetData = await $axios
      .$get(
        // `https://api.opensea.io/api/v1/assets?owner=0xd1C248d1c9879dC3b5A846D4DcCC5b7aA8fbF432&order_direction=desc&offset=0&limit=20&collection=gods-unchained`,
        // 0x03f0D81C9a73930B8034553fC54152CBd6958D0B
        `https://api.godsunchained.com/v0/user/${"0x03f0D81C9a73930B8034553fC54152CBd6958D0B"}/inventory?sort=mana&order=desc&type=creature`,
        {
          headers: {
            // "X-Master-Key": binKey,
          },
        }
      )
      .catch((error) => console.error("Error getting assets: ", error));
    const userAssets = assetData && assetData.records;
    // console.log("siteData", siteJson.record);
    await commit("setUserAssets", userAssets);
    await commit("setAssetsStatus", "completed");
    return userAssets;
  },
  async getConfig(context, data) {
    console.log("get");
    const { commit } = context;
    const { $axios } = this;
    const binKey =
      "$2b$10$kIn/DemBXe9p46ZDooUw3udev8IC8LAVUiipJgYtAwPBhjqN0xAZ.";
    const binId = "6157cf3f9548541c29bc55e3";

    await commit("setConfigStatus", "working");
    const siteJson = await $axios
      .$get(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: {
          "X-Master-Key": binKey,
        },
      })
      .catch((error) => console.error("Error getting siteConfig: ", error));
    const siteData = siteJson && siteJson.record;

    console.log("siteData", siteJson.record);
    await commit("setSiteData", siteData);
    if (siteData.games) {
      await commit("setGames", siteData.games);
    }
    await commit("setConfigStatus", "completed");
    return siteData;
  },
  async getImages(context, data) {
    const { commit } = context;
    const { $axios } = this;
    const binKey =
      "$2b$10$kIn/DemBXe9p46ZDooUw3udev8IC8LAVUiipJgYtAwPBhjqN0xAZ.";
    const binId = "6131a4023b222b1d0d959d75";
    console.log("getImagesgetImagesgetImages");
    await commit("setBinStatus", "working");
    const binJson = await $axios
      .$get(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: {
          "X-Master-Key": binKey,
        },
      })
      .catch((error) => console.error(error));
    const tempData = binJson && binJson.record;
    // console.log("binData is now", binJson.record);
    await commit("setBinData", tempData);
    await commit("setBinStatus", "completed");
    return tempData;
  },
  async saveImages(context, props) {
    const { dispatch, commit, rootState, state } = context;
    const { node, binId = "6157cf3f9548541c29bc55e3", code, name } = props;
    const { $axios } = this;
    let { binData } = state;
    console.log("saveImages", binData);

    console.log("binData", binData);
    if (!binData) {
      console.log("no bindata");
    }
    const currentImages = binData.images || [];
    // const tempImages = [...currentImages];
    // console.log("tempImages", tempImages);
    // const newId = uuidv4();
    // const newImage = {
    //   id: newId,
    //   title: "test",
    //   creator: name || "test",
    //   src: source,
    // };
    // tempImages.push(newImage);
    // console.log("tempImages:", tempImages);

    const newData = { ...binData };
    const binKey =
      "$2b$10$kIn/DemBXe9p46ZDooUw3udev8IC8LAVUiipJgYtAwPBhjqN0xAZ.";
    // if (!newData) {
    //   return;
    // }

    await commit("setBinStatus", "working");
    const newBinData = await $axios
      .$put(`https://api.jsonbin.io/v3/b/${binId}`, newData, {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": binKey,
          "X-Bin-Versioning": false,
        },
      })
      .then((result) => {
        console.log("success", result);
        return result.record;
      })
      .catch((error) => {
        console.error(error);
        // commit("setConfigStatus", "error");
        return error;
      });
    console.log("newBinData", newBinData);
    // await commit("setSiteData", sitedataaa.record);
    // await commit("setConfigStatus", "completed");
  },
  async updateConfig(context, props) {
    const { commit, rootState, state } = context;
    const { $axios } = this;
    const { game, games } = props;
    console.log("updateConfig props", props);

    const {
      svgFormStore: { svgData, activeTheme },
    } = rootState;
    const { siteData } = state;
    const tempData = { ...siteData };
    const currentGames = siteData.games || [];
    const tempGames = [...currentGames];

    // const newImage = { ...svgData, theme: activeTheme };
    // const newGame = { aaa: "bbb" };

    if (game) {
      tempGames.push(game);
    }
    const newData = { ...tempData, modified: "now" };

    newData.games = games ? games : tempGames;
    console.log("newData", newData);
    const binKey =
      "$2b$10$kIn/DemBXe9p46ZDooUw3udev8IC8LAVUiipJgYtAwPBhjqN0xAZ.";
    const binId = "6157cf3f9548541c29bc55e3";

    if (!newData) {
      return;
    }
    console.log("updateConfig CONFIG: ", newData);
    await commit("setConfigStatus", "working");
    const sitedataaa = await $axios
      .$put(`https://api.jsonbin.io/v3/b/${binId}`, newData, {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": binKey,
          "X-Bin-Versioning": false,
        },
      })
      .then((result) => {
        console.log("success", result);
        return result.record;
      })
      .catch((error) => {
        console.error(error);
        commit("setConfigStatus", "error");
        return error;
      });
    console.log("sitedataaa", sitedataaa);
    await commit("setSiteData", sitedataaa);
    if (sitedataaa.games) {
      await commit("setGames", sitedataaa.games);
    }
    await commit("setConfigStatus", "completed");
    // return sitedataaa.record;
  },

  async removeGallerySet(context, id) {
    const { dispatch, state, commit } = context;
    const { siteData } = state;
    let tempImagesArray = [...siteData.images];
    tempImagesArray = tempImagesArray.filter((img) => img.id !== id);
    const newSiteData = { ...siteData, images: tempImagesArray };
    await commit("setConfigStatus", "loading");
    await commit("setSiteData", newSiteData);
    await commit("setConfigStatus", "completed");
    dispatch("updateConfig", newSiteData);
  },
  // resolveEns(dispatch, address) {
  //   console.log("resolve", address);
  //   console.log("ens", ens);
  //   console.log("this", address, walletProvider);
  //   const walletProvider = dispatch.walletProvider;
  //   var ens = new ENS(walletProvider);
  // },

  doSearch() {
    console.log("doSearch");
  },
  async handleGalleryMeta(dispatch, params) {
    console.log("handleGalleryMeta", params);
    const metaData = await readThatMeta(params, this)
      .then((result) => {
        return result;
      })
      .catch((error) => console.error(error));
    return metaData;
  },
  async handleSearch(dispatch, commit) {
    console.log("handleSearch");
    const { state } = dispatch;
    this.commit("ui/setViewStatus", "loading");
    const isAlpha =
      state.searchContractId === "0xd0c402bcbcb5e70157635c41b2810b42fe592bb0";
    const params = {
      contractId: state.searchContractId,
      tokenId: parseInt(state.searchTokenId),
    };

    if (!params.tokenId) {
      console.error("no token id");
      return null;
    }

    // const imageLink = await readImageLink(params, this)
    // console.log('imageLink', imageLink)
    // console.log("about tot readThatShit with params: ", params);
    this.commit("ui/setViewStatus", "loading");
    await readThatShit(params, this).then((result) => {
      // console.log("readthatshit viewResult result", result);
      let resultData = result;
      let linkDataAlpha = {};
      if (isAlpha) {
        linkDataAlpha = {
          fileArweaveUrl: `https://arweave.rocks/${result.fileArweaveHash}`,
          fileIpfsUrl: `https://ipfs.cf-ipfs.com/ipfs/${result.fileIpfsHash}`,
          thumbnailUrl: result.thumbnailUrl,
        };
        // console.log("ISALPHA", linkDataAlpha);
      }
      resultData = { ...resultData, ...linkDataAlpha };
      // console.log("resultData is", resultData);
      // if (!result.ownerAddress) {
      if (!resultData.fileArweaveHash) {
        console.log("no data?");
        return this.commit("ui/setViewStatus", "error");
      } else {
        console.log("has owneraddress", resultData.ownerAddress); // substitute for if data exists
        this.commit("ui/setViewData", resultData);
        this.commit("ui/setViewStatus", "loaded");
      }
    });
    // readAdditionalMeta(params)
  },
  updateFollowing({ state }, payload) {
    const { id, name, symbol, owner } = payload;
    const { walletAddress } = state;

    console.log("updateFollowing.payload", payload);
    console.log("updateFollowing", id);
    console.log("updateFollowing", state.usedContractsObj);
    const tempUsedContractsObj =
      (state.usedContractsObj && state.usedContractsObj.slice()) || [];
    const filteredContracts = tempUsedContractsObj.filter(
      (item) => item.id === payload.id
    );
    const itemExists = filteredContracts.length;
    const isOwner = owner && owner === walletAddress;
    // console.log("itemExists", itemExists);
    // console.log("isOwner", isOwner);
    this.commit("ui/setActivityId", id);
    if (id && name && symbol && owner) {
      this.dispatch("ui/updateUsedContractsObj", {
        data: payload,
        remove: false,
      });
    }
    if (itemExists && !isOwner) {
      this.dispatch("ui/updateUsedContractsObj", {
        data: payload,
        remove: true,
      });
    }
    this.commit("ui/setActivityId", "");
  },
  updateUsedContractsObj(dispatch, props) {
    // console.log("updateUsedContractsObj props:", props);
    const { state } = dispatch;
    const { data, remove } = props;
    // console.log("updateUsedContractsObj data:", data);
    const tempUsedContractsObj =
      (state.usedContractsObj && state.usedContractsObj.slice()) || [];
    const filteredContracts = tempUsedContractsObj.filter(
      (item) => item.id === data.id
    );

    if (filteredContracts.length) {
      if (remove) {
        console.log("REMOVE");
        const newArray = tempUsedContractsObj.filter(
          (item) => item.id !== data.id
        );
        this.commit("ui/setUsedContractsObj", newArray);
      }
    } else {
      console.log("ADD");
      tempUsedContractsObj.push(data);
      this.commit("ui/setUsedContractsObj", tempUsedContractsObj);
    }
    console.log("tempUsedContractsObj is now: ", tempUsedContractsObj);
  },
  async getAllContractsMeta(dispatch, payload) {
    console.log("getting all contracts meta");
    const { state } = dispatch;
    console.log("dispatch", dispatch);
    console.log("state", state);

    const { usedContracts, usedContractsObj } = state;
    console.log("usedCONtracts", usedContracts);
    let tempUsedContractsObj = usedContractsObj.slice() || [];
    if (!usedContracts.length) {
      return;
    }
    const flattenedArray = usedContracts.map(async (hash) => {
      // console.log("hash", hash);
      const filteredExisting = tempUsedContractsObj.filter(
        (item) => item.id === hash
      );
      console.log("filtered Existing", filteredExisting);
      const hasData = filteredExisting.length && filteredExisting[0].symbol;
      if (hasData) {
        console.log("Do nothing, has Data");
        return filteredExisting[0];
      } else {
        const params = {
          contractId: hash,
          tokenId: 1,
        };
        const metaData = await readThatMeta(params, this)
          .then((result) => {
            return result;
          })
          .catch((error) => console.error(error));
        const completeResult = {
          id: hash,
          ...metaData,
        };
        console.log("completeResult: ", completeResult);
        return completeResult;
      }
    });
    console.log("flattenedArray", flattenedArray);
    const filledContractsArray = await Promise.all(flattenedArray);
    console.log("filledContractsArray", filledContractsArray);
    this.commit("ui/setUsedContractsObj", filledContractsArray);
  },

  updateDrafts(dispatch, payload) {
    console.log("updateDrafts:", payload);
    const { state } = dispatch;
    const { data, action } = payload;
    console.log("updateDrafts data:", data);

    const tempDraftsArray =
      (state.draftsArray && state.draftsArray.slice()) || [];
    const filteredDrafts = tempDraftsArray.filter(
      (item) => item.draftId === data.draftId
    );

    if (!filteredDrafts?.length) {
      console.log("this would add");
      tempDraftsArray.push(data);
      this.commit("ui/setDrafts", tempDraftsArray);
    } else {
      console.log("this would start remove");
      if (action === "remove") {
        console.log("REMOVE");
        const newArray = tempDraftsArray.filter(
          (item) => item.draftId !== data.draftId
        );
        console.log("newArray", newArray);
        this.commit("ui/setDrafts", newArray);
      }
    }
    console.log("tempDraftsArray is now: ", tempDraftsArray);
  },

  async getProfileData(dispatch, walletAddress) {
    if (!window) {
      return;
    }
    if (!walletAddress) {
      console.log("no walletAddress");
      return;
    }
    const profileObject = await BoxAPI.getProfile(walletAddress);
    if (profileObject) {
      this.profileObject = profileObject;
      dispatch.commit("setProfileObject", profileObject);
    }
  },
};
