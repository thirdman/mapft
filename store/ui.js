// import * as Web3 from 'web3'
import { getField, updateField } from "vuex-map-fields";
import {
  readThatShit,
  readAdditionalMeta,
  readImageLink,
} from "../utils/web3Read";
import { getContrast } from "../utils/theme";
import { resolveEns } from "../utils/wallet";
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
// import ens from "ethereum-ens";
// const ens = require("ethereum-ens");
// console.log("ens", ens);
export const state = () => ({
  network: "rinkeby",
  walletChain: "ethereum",
  hasChainSelect: false,
  hasWallet: false,
  walletAddress: null,
  walletStatus: "",
  walletProvider: null,
  walletNetwork: null,
  ensName: "",
  activeContractId: "",
  activeContractName: "",
  activeContractSymbol: "",
  tempViewItem: {},
  showAccount: false,
  showSearch: false,
  searchParams: {},
  usedContracts: [],
  usedContractsObj: null,
  devMode: false,
  hasVerticalGridLines: false,
  statusModalMode: "fixed",
  uiMode: "minimal",
  uiTheme: "teal",
  contrastMode: "light",
  allowRotation: true,
  hideUi: true, // used in 'none' uiMode
  devAddresses: [
    "0x03f0d81c9a73930b8034553fc54152cbd6958d0b", // gareth
    "0xd1c248d1c9879dc3b5a846d4dccc5b7aa8fbf432", // gareth
    "0x63a9dbCe75413036B2B778E670aaBd4493aAF9F3", //natealex
    "0xDbB59151b18Dd72E9AC092706e93De5b5d7a9325", // trislit
  ],
  // SEARCH FIELDS
  searchContractId: "",
  searchTokenId: "",
  // VIEW DATA
  viewData: "",
  viewData2: "", // to refactor out.
  viewStatus: "",
});

export const getters = {
  getField,
  devMode: (state) => state.devMode,
  statusModalMode: (state) => state.statusModalMode,
  hasWallet: (state) => state.hasWallet,
  hasChainSelect: (state) => state.hasChainSelect,
  hasVerticalGridLines: (state) => state.hasVerticalGridLines,
  walletChain: (state) => state.walletChain,
  walletAddress: (state) => state.walletAddress,
  walletNetwork: (state) => state.walletNetwork,
  walletStatus: (state) => state.walletStatus,
  ensName: (state) => state.ensName,
  showSearch: (state) => state.showSearch,
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
  walletName: (state) => {
    const walletName = state.ensName || state.walletAddress;
    return walletName;
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
    // this.dispatch("ui/resolveEns", account);
    // resolveEns(account);
  },
  setEnsName(state, value) {
    console.log("setting ens name, ", value);
    state.ensName = value;
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
  setUsedContractsObj(state, value) {
    const usedContractsArray = state.usedContracts || [];
    console.log("usedContractsArray: ", usedContractsArray);
    const asObjects = usedContractsArray.map((contract) => {
      const obj = { id: contract, name: "nope", symbol: "NOPE" };
      return obj;
    });
    console.log("asObjects", asObjects);
    state.usedContractsObj = asObjects;
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
      console.log("setting viewdata: ", data);
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
  setAllowRotation(state, newState) {
    console.log("setAllowRotation", newState);
    state.allowRotation = newState;
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
    console.log("about tot readThatShit with params: ", params);
    this.commit("ui/setViewStatus", "loading");
    await readThatShit(params, this).then((result) => {
      console.log("readthatshit viewResult result", result);
      let resultData = result;
      let linkDataAlpha = {};
      if (isAlpha) {
        linkDataAlpha = {
          fileArweaveUrl: `https://arweave.rocks/${result.fileArweaveURL}`,
          fileIpfsUrl: `https://gateway.pinata.cloud/ipfs/${result.fileIPFSHashByID}`,
          thumbnailUrl: "https://arweave.rocks/abc",
        };
        console.log("ISALPHA", linkDataAlpha);
      }
      resultData = { ...resultData, ...linkDataAlpha };
      console.log("resultdatais", resultData);
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
};
