import { getField, updateField } from "vuex-map-fields";
import { removeFromArrayById } from "./../utils/misc";
// import * as Web3 from 'web3'
import { OpenSeaPort, Network } from "opensea-js";
import { getTrait } from "./../utils/assets";
export const state = () => ({
  galleryContractId: "",
  galleryAssets: undefined,
  filteredAssets: [],
  galleryAssetCount: undefined,
  galleryStatus: "ready",
  galleryDisplayMode: "expanded",
  offset: 0,
  galleryFilter: undefined,
});
export const getters = {
  getField, // for auto sync fields
  galleryContractId: (state) => state.galleryContractId,
  galleryAssets: (state) => {
    return state.galleryFilter ? state.filteredAssets : state.galleryAssets;
  },
  galleryStatus: (state) => state.galleryStatus,
  galleryDisplayMode: (state) => state.galleryDisplayMode,
  galleryAssetCount: (state) => state.galleryAssetCount,
  galleryOffset: (state) => state.offset,
  galleryFilter: (state) => state.galleryFilter,
};

export const mutations = {
  updateField, // for auto sync fields
  setGalleryContractId(state, newState) {
    state.galleryContractId = newState;
  },
  setGalleryAssets(state, data) {
    state.galleryAssets = data;
  },
  setGalleryStatus(state, newState) {
    state.galleryStatus = newState;
  },
  setGalleryDisplayMode(state, newState) {
    state.galleryDisplayMode = newState;
  },
  setGalleryAssetCount(state, newState) {
    state.galleryAssetCount = newState;
  },
  setGalleryOffset(state, newState) {
    state.offset = newState;
  },
  clearGalleryFilter(state, value) {
    state.galleryFilter = undefined;
  },
  async getItems(state, params) {
    console.log("get Items", params);
    console.log("get Items, contractAddress", state.galleryContractId);

    const network = this.$config.network;
    const infuraUrl =
      network === "main"
        ? this.$config.infuraUrlMain
        : this.$config.infuraUrlRinkeby;
    this.commit("galleryStore/setGalleryStatus", "loading");
    // console.log('network', network)
    // console.log('infuraUrl', infuraUrl)
    const provider = new Web3.providers.HttpProvider(infuraUrl);
    const seaport = new OpenSeaPort(provider, {
      networkName: network === "rinkeby" ? Network.Rinkeby : Network.Main,
    });
    const galleryOffset = state.offset;
    const pageSize = 30;
    const getAssets = seaport.api.getAssets({
      asset_contract_address: state.galleryContractId, // string
      pageSize: "30",
      // limit: 10,
      // tokenId: '9', // string | number | null
    });
    await getAssets
      .then((result) => {
        console.log("result", result);

        // state.galleryAssets = result
        // state.galleryStatus = 'loaded'

        if (result.assets && result.assets.length) {
          this.commit("galleryStore/setGalleryAssets", result.assets);
          this.commit("galleryStore/setGalleryStatus", "loaded");
          this.commit(
            "galleryStore/setGalleryAssetCount",
            result.estimatedCount
          );
          this.commit(
            "galleryStore/setGalleryOffset",
            galleryOffset + pageSize
          );
        } else {
          this.commit("galleryStore/setGalleryStatus", "error");
        }
      })
      .catch((error) => {
        console.error("gallery error: ", error);
        state.galleryStatus = "error";
        return false;
      });
    console.log("setId", params, params.setId);
    if (params.setId) {
      this.$store.commit(
        "galleryStore/setGalleryContractId",
        this.$route.params.contract
      );
      this.commit("galleryStore/filterGallery", params.setId);
    }
  },
  filterGallery(state, setName) {
    const filtered = state.galleryAssets.filter((asset) => {
      const assetSet = getTrait(asset.traits, "exhibition");
      console.log("assetSet: ", assetSet);
      return assetSet === setName;
    });
    state.galleryFilter = setName;
    state.filteredAssets = filtered;
  },
};
