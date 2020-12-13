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
  galleryStatus: "loading",
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
    const useAxios = true;
    // const useOpenseaPort = false;
    // console.log("get Items", params);
    // console.log("get Items, contractAddress", state.galleryContractId);
    const infuraUrl = this.$config.infuraUrl;
    const galleryOffset = state.offset;
    const pageSize = 30;
    const requiredNetwork = this.$config.requiredNetwork;
    if (!requiredNetwork) {
      console.error("no required network");
    }
    const openseaUrl =
      requiredNetwork === "main"
        ? "https://api.opensea.io/"
        : "https://rinkeby-api.opensea.io/";

    const axiosUrl = `${openseaUrl}api/v1/assets/?asset_contract_address=${state.galleryContractId}`; //&limit=20&offset=${galleryOffset}&pageSize=${pageSize}
    this.commit("galleryStore/setGalleryStatus", "loading");

    const provider = new Web3.providers.HttpProvider(infuraUrl);
    const seaport = new OpenSeaPort(provider, {
      networkName:
        requiredNetwork === "rinkeby" ? Network.Rinkeby : Network.Main,
    });

    const handleAssetResult = (result) => {
      if (result && result.assets) {
        console.log("result assets: ", result.assets);
        this.commit("galleryStore/setGalleryAssets", result.assets);
        this.commit("galleryStore/setGalleryStatus", "loaded");
        this.commit(
          "galleryStore/setGalleryAssetCount",
          result.estimatedCount || 0
        );
        this.commit("galleryStore/setGalleryOffset", galleryOffset + pageSize);
      } else {
        console.error("no result or result.assets", result);
        this.commit("galleryStore/setGalleryStatus", "error");
      }
    };
    const handleAssetError = (result) => {
      console.error("Getting assets error", result);
    };
    if (useAxios) {
      await axios
        .get(axiosUrl)
        .then((result) => {
          handleAssetResult(result.data);
        })
        .catch((error) => {
          handleAssetError(result);
          console.error(error);
        });
    }
    // if (useOpenseaPort) {
    //   const getAssets = seaport.api.getAssets({
    //     asset_contract_address: state.galleryContractId, // string
    //     pageSize: "30",
    //     // limit: 10,
    //     // tokenId: '9', // string | number | null
    //   });

    //   await getAssets
    //     .then((result) => {
    //       console.log("result", result);

    //       if (result && result.assets) {
    //         this.commit("galleryStore/setGalleryAssets", result.assets);
    //         this.commit("galleryStore/setGalleryStatus", "loaded");
    //         this.commit(
    //           "galleryStore/setGalleryAssetCount",
    //           result.estimatedCount || 0
    //         );
    //         this.commit(
    //           "galleryStore/setGalleryOffset",
    //           galleryOffset + pageSize
    //         );
    //       } else {
    //         console.error("no result or result.assets", result);
    //         this.commit("galleryStore/setGalleryStatus", "error");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("gallery error: ", error);
    //       state.galleryStatus = "error";
    //       return false;
    //     });
    // }

    if (params.setId) {
      this.commit("galleryStore/setGalleryContractId", params.contractId);
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

// await getAssets
//       .then((result) => {
//         console.log("result", result);

//         if (result && result.assets) {
//           this.commit("galleryStore/setGalleryAssets", result.assets);
//           this.commit("galleryStore/setGalleryStatus", "loaded");
//           this.commit(
//             "galleryStore/setGalleryAssetCount",
//             result.estimatedCount || 0
//           );
//           this.commit(
//             "galleryStore/setGalleryOffset",
//             galleryOffset + pageSize
//           );
//         } else {
//           console.error("no result or result.assets", result);
//           this.commit("galleryStore/setGalleryStatus", "error");
//         }
//       })
//       .catch((error) => {
//         console.error("gallery error: ", error);
//         state.galleryStatus = "error";
//         return false;
//       });
