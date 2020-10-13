// import * as Web3 from 'web3'
import { getField, updateField } from "vuex-map-fields";
import {
  readThatShit,
  readAdditionalMeta,
  readImageLink,
} from "../utils/web3Read";
import { getContrast } from "../utils/theme";
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

export const state = () => ({
  network: "rinkeby",
  walletChain: "ethereum",
  hasChainSelect: true,
  hasWallet: false,
  walletAddress: null,
  walletStatus: "",
  walletProvider: null,
  walletNetwork: null,
  activeContractId: "",
  activeContractName: "",
  activeContractSymbol: "",
  tempViewItem: {},
  showAccount: false,
  showSearch: false,
  searchParams: {},
  usedContracts: [],
  devMode: false,
  statusModalMode: "fixed",
  uiMode: "minimal",
  uiTheme: "teal",
  contrastMode: "light",
  hideUi: true, // used in 'none' uiMode
  devAddresses: [
    "0x03f0d81c9a73930b8034553fc54152cbd6958d0b",
    "0xd1c248d1c9879dc3b5a846d4dccc5b7aa8fbf432",
  ],
  // SEARCH FIELDS
  searchContractId: "",
  searchTokenId: "",
  // VIEW DATA
  viewData: "",
  viewData2: "",
  viewStatus: "",
});

export const getters = {
  getField,
  devMode: (state) => state.devMode,
  statusModalMode: (state) => state.statusModalMode,
  hasWallet: (state) => state.hasWallet,
  hasChainSelect: (state) => state.hasChainSelect,
  walletChain: (state) => state.walletChain,
  walletAddress: (state) => state.walletAddress,
  walletNetwork: (state) => state.walletNetwork,
  walletStatus: (state) => state.walletStatus,
  showSearch: (state) => state.showSearch,
  viewData: (state) => state.viewData,
  viewStatus: (state) => state.viewStatus,
  uiMode: (state) => state.uiMode,
  hideUi: (state) => state.hideUi,
  uiTheme: (state) => state.uiTheme,
  contrastMode: (state) => state.contrastMode,
  activeContractId: (state) => state.activeContractId,
  activeContractName: (state) => state.activeContractName,
  activeContractSymbol: (state) => state.activeContractSymbol,
  tempViewItem: (state) => state.tempViewItem,
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
};
export const mutations = {
  updateField,
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
  setUiTheme(state, value, rootState) {
    state.uiTheme = value;
    if (process.client) {
      const doContrast = () => {
        const mode = getContrast();
        this.commit("ui/setUiContrast", mode);
      };
      setTimeout(() => doContrast(), 30);
    }
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
    console.log("set account state", account);
    console.log(account ? "setting account true" : "settings account false");
    state.hasWallet = account ? true : false;
    state.walletAddress = account ? account : null;
  },
  setWalletStatus(state, value) {
    console.log("setting wallet status", value);
    state.walletStatus = value;
  },
  setProvider(state, value) {
    state.walletProvider = value;
  },
  setNetworkName(state, value) {
    state.walletNetwork = value;
  },
  setActiveContractId(state, value) {
    state.activeContractId = value;
    console.log("UI store setActiveContractId", value);
    this.commit("mintFormStore/setActiveContractId", value);
    const usedContractsArray = state.usedContracts || [];
    if (!usedContractsArray.includes(value)) {
      usedContractsArray.push(value);
      state.usedContracts = usedContractsArray;
    }
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
    console.log("ui state is now", state);
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
    console.log("settempvieitem", data);
    if (!data) {
      state.tempViewItem = {};
    } else {
      state.tempViewItem = data;
    }
  },
  // doSearch(state, event) {
  //   console.log('doSearch', state, this)
  //   const params = {
  //     contractId: state.searchContractId,
  //     tokenId: parseInt(state.searchTokenId),
  //   }
  //   if (params.tokenId) {
  //     console.log('this would call search', this.actions, this.$actions)
  //     console.log('tactions', actions)
  //     // handleSearch(params)
  //   }
  // },
  // handleSearch(state, event) {
  //   // console.log('event', event)
  //   console.log(Number(state.searchTokenId))
  //   const params = {
  //     contractId: state.searchContractId,
  //     tokenId: parseInt(state.searchTokenId),
  //   }
  //   // console.log('params', params)
  //   if (params.tokenId) {
  //     const imageLink = readImageLink(params)
  //     const viewResult = readThatShit(params)
  //     console.log('viewResult', viewResult)
  //     console.log('imageLink', imageLink)
  //     // readAdditionalMeta(params)
  //   }
  //   // state.showAccount = value
  // },
};

export const actions = {
  doSearch() {
    console.log("doSearch");
  },
  async handleSearch(dispatch, commit) {
    console.log("handleSearch", commit, dispatch);
    const { state } = dispatch;
    this.commit("ui/setViewStatus", "loading");
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
    await readThatShit(params, this).then((result) => {
      console.log("viewResult result", result);
      this.commit("ui/setViewStatus", "loading");
      if (!result.ownerAddress) {
        console.log("no data?");
        return this.commit("ui/setViewStatus", "error");
      } else {
        this.commit("ui/setViewData", result);
        this.commit("ui/setViewStatus", "loaded");
      }
    });
    // readAdditionalMeta(params)
  },
};
