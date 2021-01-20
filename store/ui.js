// import * as Web3 from 'web3'

import { getField, updateField } from "vuex-map-fields";
import {
  readThatShit,
  readThatMeta,
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
  profileObject: null,
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
  tempUsedContractsObj: null,
  activityId: "1234",
  devMode: false,
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
  // VIEW DATA
  viewData: "",
  viewData2: "", // to refactor out.
  viewStatus: "",
  // DRAFTS
  draftsArray: [],
});

export const getters = {
  getField,
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
  profileObject: (state) => state.profileObject,
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
  tempUsedContractsObj: (state) => state.tempUsedContractsObj,
  draftsArray: (state) => state.draftsArray,
  activityId: (state) => state.activityId,
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
    console.log("setUitheme", value);
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
    console.log("setting wallet chain: ", value);
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
    console.log("setting wallet status", value);
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
          fileIpfsUrl: `https://gateway.pinata.cloud/ipfs/${result.fileIpfsHash}`,
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
      console.log("dispatch", dispatch);
      this.profileObject = profileObject;
      dispatch.commit("setProfileObject", profileObject);
    }
  },
};
