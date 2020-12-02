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
    // due to opensea issues, I've changed it to use axios. If it is robust wversion.can remove the legacy in future
    const useAxios = true;
    const useOpenseaPort = false;
    console.log("get Items", params);
    console.log("get Items, contractAddress", state.galleryContractId);

    const network = this.$config.network;
    const infuraUrl = this.$config.infuraUrl;
    const galleryOffset = state.offset;
    const pageSize = 30;
    // let infuraUrl =
    //   network === "main"
    //     ? this.$config.infuraUrlMain
    //     : this.$config.infuraUrlRinkeby;
    const requiredNetwork = this.$config.requiredNetwork;
    console.log("required network: ", requiredNetwork);
    const openseaUrl =
      requiredNetwork === "main"
        ? "https://api.opensea.io/"
        : "https://testnets-api.opensea.io/";
    console.log("openseaUrl", openseUrl);
    let openseaServer =
      network === "main"
        ? "https://api.opensea.io/"
        : "https://testnets-api.opensea.io/";
    console.log("openseaServer", openseaServer);
    const axiosUrl = `${openseaServer}api/v1/assets/?asset_contract_address=${state.galleryContractId}`; //&limit=20&offset=${galleryOffset}&pageSize=${pageSize}
    // let axiosUrl =
    //   network === "main"
    //     ? `https://api.opensea.io/api/v1/assets/?asset_contract_address=${state.galleryContractId}&limit=20&offset=${galleryOffset}&pageSize=${pageSize}`
    //     : `https://testnets-api.opensea.io/api/v1/assets/?asset_contract_address=${state.galleryContractId}&limit=20&offset=${galleryOffset}&pageSize=${pageSize}`;

    this.commit("galleryStore/setGalleryStatus", "loading");
    console.log("network", network);
    console.log("infuraUrl", infuraUrl);
    const provider = new Web3.providers.HttpProvider(infuraUrl);
    const seaport = new OpenSeaPort(provider, {
      networkName: network === "rinkeby" ? Network.Rinkeby : Network.Main,
    });

    // alert("stopping");
    // let shallContinue = confirm("Do you want to continue ?");
    // console.log("shallCOntinue: ", shallContinue);
    const handleAssetResult = (result) => {
      if (result && result.assets) {
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
    if (useAxios) {
      console.log("using axiso: ", axiosUrl);
      await axios
        .get(axiosUrl)
        .then((result) => {
          handleAssetResult(result.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (useOpenseaPort) {
      const getAssets = seaport.api.getAssets({
        asset_contract_address: state.galleryContractId, // string
        pageSize: "30",
        // limit: 10,
        // tokenId: '9', // string | number | null
      });

      await getAssets
        .then((result) => {
          console.log("result", result);

          if (result && result.assets) {
            this.commit("galleryStore/setGalleryAssets", result.assets);
            this.commit("galleryStore/setGalleryStatus", "loaded");
            this.commit(
              "galleryStore/setGalleryAssetCount",
              result.estimatedCount || 0
            );
            this.commit(
              "galleryStore/setGalleryOffset",
              galleryOffset + pageSize
            );
          } else {
            console.error("no result or result.assets", result);
            this.commit("galleryStore/setGalleryStatus", "error");
          }
        })
        .catch((error) => {
          console.error("gallery error: ", error);
          state.galleryStatus = "error";
          return false;
        });
    }
    // old way here:
    // await getAssets
    //   .then((result) => {
    //     console.log("result", result);

    //     // state.galleryAssets = result
    //     // state.galleryStatus = 'loaded'

    //     if (result.assets && result.assets.length) {
    //       this.commit("galleryStore/setGalleryAssets", result.assets);
    //       this.commit("galleryStore/setGalleryStatus", "loaded");
    //       this.commit(
    //         "galleryStore/setGalleryAssetCount",
    //         result.estimatedCount
    //       );
    //       this.commit(
    //         "galleryStore/setGalleryOffset",
    //         galleryOffset + pageSize
    //       );
    //     } else {
    //       this.commit("galleryStore/setGalleryStatus", "error");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("gallery error: ", error);
    //     state.galleryStatus = "error";
    //     return false;
    //   });
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
