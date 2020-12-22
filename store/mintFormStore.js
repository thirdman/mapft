// import Vue from 'vue'
// import Vuex from 'vuex'

import { getField, updateField } from "vuex-map-fields";
import { removeFromArrayById } from "./../utils/misc";
const statusMap = {
  ready: {
    text: "Ready",
  },
  confirming: {
    text: "Please confirm transaction in your Etherem Wallet",
    title: "Confirmation Required",
  },
  working: {
    text: "Working...",
    title: "Please Wait",
  },
  stillWorking: {
    text: "Still Working...",
    title: "Please Wait",
  },
  stillWorkingMore: {
    text: "Waiting... Mint transaction can take some time.",
    title: "Please Wait",
  },
  checkTransaction: {
    title: "Please Wait",
    text:
      "Transaction still pending...  In times of network congestion transactions can take a long time - check the status on etherscan. If something seems wrong, ask us about it on the Infinft Discord.",
  },
  done: {
    title: "Done",
    text: "Done",
  },
  completed: {
    title: "Done",
    text: "Transaction Complete",
  },
  error: {
    title: "Error",
    text: "Error: Something went wrong.",
  },
  noContract: {
    title: "Error",
    text:
      "Contract Address is missing. Please load your contract id, or reset it in the account settings modal. This is a temporary error, and occurs when you have reloaded the mint page.",
  },
};

export const state = () => ({
  mintedData: undefined,
  temporaryContractId: "",
  mintStatus: "ready",
  mintStatusMessage: "Ready to mint tokens!",
  mintTransactionId: "",
  showStatusModal: false,
  showEditContract: true,
  showThumbnailField: false,
  showCropper: true,
  showNewMetaField: false,
  showManualEdit: false,
  tokenPreviewMode: "upload",
  uploadStatus: null,
  uploadStatusTitle: "",
  uploadThumbnailStatus: null,
  uploadThumbnailStatusTitle: "",
  thumbnailUploadStatus: null,
  ipfsStatus: "",
  fileIpfsHash: "",
  fileIpfsProgress: undefined,
  thumbnailIpfsStatus: "",
  thumbnailIpfsHash: "",
  thumbnailIpfsProgress: undefined,
  // thumbnailIpfsHashDefault: "QmQw1qUqKnZSLUZEbtQqyWtqv7KeMzdZZ4ixJfEksdcaL9",
  thumbnailIpfsHashDefault: "QmawLNCbgvpqYvLSF9nvzbJacSuxF5taSdidfGVST8rG1F",
  thumbnailArweaveHashDefault: "isQRjzHIlqNmYW0KtboDm2gtJjg3dhRb_iV7sW8f_3g",
  arweaveStatus: "",
  fileArweaveHash: "",
  fileArweaveProgress: undefined,
  thumbnailArweaveStatus: "",
  thumbnailArweaveHash: "",
  thumbnailArweaveProgress: undefined,
  thumbnailSource:
    "https://arweave.net/isQRjzHIlqNmYW0KtboDm2gtJjg3dhRb_iV7sW8f_3g",
  cropOutputSource: "",
  // fileHash: '',
  fileName: "",
  fileType: "",
  authorName: "",
  title: "",
  description: "",
  editions: 1,
  series: "",
  royaltyFee: 0,

  metaFieldsJson:
    '[{"id":"rarity", "name":"Rarity",   "value": "epic",   "type":"string",      "helpText":"Enter the rarity this artwork has.",      "required":true   }, {"id":"example", "name":"example",   "value": "common",   "type":"string",      "helpText":"this is a test.",      "required":false   }]',
});

// metaFieldsObj: {
//   id: 'exampleId',
//   name: 'An Example Id',
//   type: 'string',
//   value: 'example Value',
//   helpText: 'example help Text',
//   required: false,
// },
export const getters = {
  mintedData: (state) => state.mintedData,
  mintStatus: (state) => state.mintStatus,
  mintStatusMessage: (state) => state.mintStatusMessage,
  mintStatusTitle: (state) => {
    const mintStatus = state.mintStatus;
    const title = statusMap[mintStatus].title;
    return title;
  },
  mintTransactionId: (state) => state.mintTransactionId,
  uploadStatus: (state) => state.uploadStatus,
  uploadStatusTitle: (state) => state.uploadStatusTitle,
  ipfsStatus: (state) => state.ipfsStatus,
  arweaveStatus: (state) => state.arweaveStatus,
  thumbnailIpfsStatus: (state) => state.thumbnailIpfsStatus,
  thumbnailArweaveStatus: (state) => state.thumbnailArweaveStatus,
  fileIpfsHash: (state) => state.fileIpfsHash,
  fileIpfsProgress: (state) => state.fileIpfsProgress,
  fileArweaveHash: (state) => state.fileArweaveHash,
  fileArweaveProgress: (state) => state.fileArweaveProgress,
  thumbnailIpfsHash: (state) => state.thumbnailIpfsHash,
  thumbnailIpfsProgress: (state) => state.thumbnailIpfsProgress,
  thumbnailIpfsHashDefault: (state) => state.thumbnailIpfsHashDefault,
  thumbnailArweaveHashDefault: (state) => state.thumbnailArweaveHashDefault,
  thumbnailArweaveHash: (state) => state.thumbnailArweaveHash,
  thumbnailArweaveProgress: (state) => state.thumbnailArweaveProgress,
  thumbnailUploadStatus: (state) => state.thumbnailUploadStatus,
  // uploadThumbnailStatus: (state) => state.uploadThumbnailStatus,
  uploadThumbnailStatusTitle: (state) => state.uploadThumbnailStatusTitle,
  showThumbnailField: (state) => state.showThumbnailField,
  showCropper: (state) => state.showCropper,
  thumbnailSource: (state) => state.thumbnailSource,
  cropOutputSource: (state) => state.cropOutputSource,
  tokenPreviewMode: (state) => state.tokenPreviewMode,
  metaFieldsObj: (state) => {
    return JSON.parse(state.metaFieldsJson);
  },
  showEditContract: (state) => state.showEditContract,
  showManualEdit: (state) => state.showManualEdit,
  getActiveContractId(state, getters, rootState) {
    const activeContractId = rootState.ui.activeContractId;
    return activeContractId;
  },
  canMint: (state, getters, rootState) => {
    let canWeMintShit = false;
    // console.log('rootState', rootState)
    const activeContractId = rootState.ui.activeContractId;
    if (
      activeContractId &&
      state.fileIpfsHash &&
      state.fileArweaveHash &&
      state.fileType &&
      state.authorName &&
      state.title &&
      state.description &&
      state.editions
    ) {
      canWeMintShit = true;
    }
    return canWeMintShit;
  },
  tokenPreviewData: (state) => {
    const {
      tokenPreviewMode,
      fileIpfsHash,
      fileArweaveHash,
      thumbnailArweaveHash,
      thumbnailIPFSHash,
      showThumbnailField,
      uploadStatus,
      activeContractId,
      fileName,
      fileType,
      authorName,
      title,
      description,
      editions,
      series,
      royaltyFee,
      thumbnailArweaveHashDefault,
    } = state;

    return {
      tokenPreviewMode,
      fileIpfsHash,
      fileArweaveHash,
      thumbnailArweaveHash,
      thumbnailIPFSHash,
      showThumbnailField,
      uploadStatus,
      activeContractId,
      fileName,
      fileType,
      authorName,
      title,
      description,
      editions,
      series,
      royaltyFee,
      thumbnailArweaveHashDefault,
    };
  },
  getField,
};

export const mutations = {
  updateField,
  setDraftData(state, data) {
    console.log("SET DRAFT DATA: ", data);
    if (data.imageName) {
      state.title = data.imageName;
    }
    if (data.artistName) {
      state.authorName = data.artistName;
    }
    if (data.artistNote) {
      state.description = data.artistNote;
    }
    if (data.exhibition) {
      state.series = data.exhibition;
    }
    if (data.totalCap) {
      state.editions = data.totalCap;
    }
    if (data.royaltyFee) {
      state.royaltyFee = data.royaltyFee;
    }
    if (data.fileType) {
      state.fileType = data.fileType;
    }
    if (data.fileIPFSHash) {
      state.fileIpfsHash = data.fileIPFSHash;
      state.uploadStatus = "uploaded";
      state.ipfsStatus = "uploaded";
      state.fileArweaveProgress = 100;
      state.uploadStatusTitle = "Set by Draft";
      state.tokenPreviewMode = "hash";
    }
    if (data.fileArweaveHash) {
      state.fileArweaveHash = data.fileArweaveHash;
      state.arweaveStatus = "uploaded";
      state.fileArweaveProgress = "100";
      state.uploadStatusTitle = "Set by Draft";
      state.tokenPreviewMode = "hash";
    }
    if (data.thumbnailIPFSHash) {
      state.thumbnailIpfsHash = data.thumbnailIPFSHash;
      state.thumbnailIpfsStatus = "uploaded";
      state.thumbnailIpfsProgress = 100;
      state.uploadThumbnailStatusTitle = "Set by Draft";
      state.tokenPreviewMode = "hash";
    }
    if (data.thumbnailArweaveHash) {
      state.thumbnailArweaveHash = data.thumbnailArweaveHash;
      state.thumbnailArweaveStatus = "uploaded";
      state.thumbnailArweaveProgress = "100";
      state.uploadThumbnailStatusTitle = "Set by Draft";
      state.tokenPreviewMode = "hash";
    }
  },
  setManualData(state, data) {
    console.log("setManualData", data);
    const { fileIPFSHash, fileArweaveHash } = data;
    if (fileIPFSHash) {
      state.fileIPFSHash = fileIPFSHash;
      state.tokenPreviewMode = "hash";
    }
    if (fileArweaveHash) {
      state.fileArweaveHash = fileArweaveHash;
      state.tokenPreviewMode = "hash";
    }
    if (data.fileIPFSHash) {
      state.fileIpfsHash = data.fileIPFSHash;
      state.uploadStatus = "uploaded";
      state.ipfsStatus = "uploaded";
      state.fileArweaveProgress = 100;
      state.uploadStatusTitle = "Set by Manual Edit";
    }
    if (data.fileArweaveHash) {
      state.fileArweaveHash = data.fileArweaveHash;
      state.arweaveStatus = "uploaded";
      state.fileArweaveProgress = "100";
      state.uploadStatusTitle = "Set by Manual Edit";
    }
    if (data.thumbnailIPFSHash) {
      state.thumbnailIpfsHash = data.thumbnailIPFSHash;
      state.thumbnailIpfsStatus = "uploaded";
      state.thumbnailIpfsProgress = 100;
      state.uploadThumbnailStatusTitle = "Set by Manual Edit";
    }
    if (data.thumbnailArweaveHash) {
      state.thumbnailArweaveHash = data.thumbnailArweaveHash;
      state.thumbnailArweaveStatus = "uploaded";
      state.thumbnailArweaveProgress = "100";
      state.uploadThumbnailStatusTitle = "Set by Manual Edit";
    }
  },
  setTokenPreviewMode(state, value) {
    state.tokenPreviewMode = value;
  },
  setShowStatusModal(state, value) {
    console.log("settingsstatusmodal show", value);
    state.showStatusModal = value;
  },
  setActiveContractId(state, contractAddress) {
    const newContractAddress = state.temporaryContractId;
    if (contractAddress) {
      state.activeContractId = contractAddress;
      state.showEditContract = false;
    }
  },
  setTempActiveContractId(state, newValue) {
    state.temporaryContractId = newValue;
  },
  clearActiveContractId(state, value) {
    state.activeContractId = null;
    state.showEditContract = true;
  },
  setShowEditContract(state, newState) {
    console.log("setShowEditContract", newState);
    state.showEditContract = newState;
  },
  setShowThumbnailField(state, newState) {
    console.log("setShowThumbnailField newstate", newState);
    state.showThumbnailField = newState;
  },
  setShowCropper(state, value) {
    state.showCropper = value;
  },
  setShowNewMetaField(state, newState) {
    state.showNewMetaField = newState;
  },
  setShowManualEdit(state, newState) {
    console.log("setshowManualEdit", newState);
    state.showManualEdit = newState;
  },

  setIpfsStatus(state, data) {
    console.log("setting ipfs status ", data);
    const { mode = "file", status } = data;
    if (mode === "thumbnail") {
      state.thumbnailIpfsStatus = status;
    } else {
      state.ipfsStatus = status;
    }
    actions.checkUploadStatus(state, mode);
  },
  setArweaveStatus(state, data) {
    const { mode = "file", status } = data;
    console.log("setArweaveStatus mode: ", mode, status);
    if (!status) {
      return;
    }
    if (mode === "thumbnail") {
      state.thumbnailArweaveStatus = status;
    } else {
      state.arweaveStatus = status;
    }
    actions.checkUploadStatus(state, mode);
  },
  setIpfsHash(state, data) {
    console.log("setIpfsHash", data);
    const { mode = "file", hash } = data;
    if (mode === "thumbnail") {
      state.thumbnailIpfsHash = hash;
    } else {
      state.fileIpfsHash = hash;
    }
  },
  setArweaveHash(state, data) {
    const { mode = "file", hash } = data;
    console.log("setArweaveHash", data);
    if (mode === "thumbnail") {
      state.thumbnailArweaveHash = hash;
    } else {
      state.fileArweaveHash = hash;
    }
  },
  setUploadStatus(state, data) {
    const { mode = "file", status, text = "" } = data;
    // NOTE:
    // possible status: ready, confirming, active, uploading, error, noFile
    console.log({ mode, status, text });

    // state.uploadStatus = status;
    let newStatusTitle = "";
    switch (status) {
      case "ready":
        newStatusTitle = "Ready.";
        break;
      case "confirming":
        newStatusTitle = "Awaiting signature confirmation.";
        break;
      case "active":
        newStatusTitle = "Files Uploading...";
        break;
      case "uploading":
        newStatusTitle = "Uploading, please wait...";
        break;
      case "finished":
        newStatusTitle = "Finished Uploading.";
        break;
      case "noContract":
        newStatusTitle =
          "Contract Address is missing. Please load your contract id.";
        break;
      case "error":
        newStatusTitle = text;
      case "noFile":
        newStatusTitle = "No file selected";
        break;
      default:
        console.log("setUploadStatus no status");
    }
    if (mode === "file") {
      state.uploadStatus = status;
      state.uploadStatusTitle = newStatusTitle;
    }
    if (mode === "thumbnail") {
      state.uploadThumbnailStatus = status;
      state.uploadThumbnailStatusTitle = newStatusTitle;
    }
  },
  setThumbnailSource(state, value) {
    state.thumbnailSource = value;
  },
  setCropOutputSource(state, value) {
    state.cropOutputSource = value;
  },
  setProgress(state, payload) {
    const {
      mode = "file",
      type = "ipfs",
      ProgressEvent,
      progressObj,
    } = payload;

    if (!progressObj) {
      return;
    }
    const percentLoaded =
      progressObj.percent || (ProgressEvent.loaded / ProgressEvent.total) * 100;
    // console.log("progress percentLoaded", percentLoaded);
    if (type === "ipfs") {
      if (mode === "file") {
        // this.fileIpfsProgress = percentLoaded;
        state.fileIpfsProgress = percentLoaded;
      } else {
        state.thumbnailIpfsProgress = percentLoaded;
      }
    }
    if (type === "arweave") {
      if (mode === "file") {
        state.fileArweaveProgress = percentLoaded;
      } else {
        state.thumbnailArweaveProgress = percentLoaded;
      }
    }
    // if(mode === 'file'){
    //   if(type === 'ipfs'){
    //     this.fileIpfsProgress = percentLoaded;
    //   }
    //   if(type === 'arweave'){
    //     this.fileArweaveProgress = percentLoaded;
    //   }
    // } else {
    //   if(type === 'ipfs'){
    //     this.thumbnailIpfsProgress = percentLoaded;
    //   }
    //   if(type === 'arweave'){
    //     this.thumbnailArweaveProgress = percentLoaded;
    //   }
    // }
  },
  // setProgress(state, payload) {
  //   const { mode = "file", type = "ipfs", ProgressEvent } = payload;
  //   console.log("setProgress", payload);
  //   if (!ProgressEvent) {
  //     return;
  //   }
  //   const percentLoaded = (ProgressEvent.loaded / ProgressEvent.total) * 100;
  //   console.log("percentLoaded", percentLoaded);
  //   if (type === "ipfs") {
  //     if (mode === "file") {
  //       this.fileIpfsProgress = percentLoaded;
  //       state.fileIpfsProgress = percentLoaded;
  //     } else {
  //       state.thumbnailIpfsProgress = percentLoaded;
  //     }
  //   }
  //   if (type === "arweave") {
  //     if (mode === "file") {
  //       state.fileArweaveProgress = percentLoaded;
  //     } else {
  //       state.thumbnailArweaveProgress = percentLoaded;
  //     }
  //   }
  // },
  setThumbnailUploadStatus(state, data) {
    const { mode = "file", status, text = "" } = data;
    state.uploadThumbnailStatus = status;

    switch (status) {
      case "ready":
        state.uploadThumbnailStatusTitle = "Ready.";
        break;
      case "confirming":
        state.uploadThumbnailStatusTitle = "Awaiting signature confirmation.";
        break;
      case "active":
        state.uploadThumbnailStatusTitle = "Files Uploading...";
        break;
      case "uploading":
        state.uploadThumbnailStatusTitle = "Uploading, please wait...";
        break;
      case "finished":
        state.uploadThumbnailStatusTitle = "Finished Uploading.";
        break;
      case "error":
        state.uploadThumbnailStatusTitle = text;
        break;
      case "noFile":
        state.uploadThumbnailStatusTitle = "No file selected";
        break;
      default:
        console.log("setUploadStatus no status");
    }
  },

  setFileInfo(state, fileInfo) {
    const { fileName, fileType } = fileInfo;
    state.fileName = fileName;
    state.fileType = fileType;
  },
  setMintTransactionId(state, value) {
    state.mintTransactionId = value;
  },
  setMintStatus(state, status) {
    const message = statusMap[status].text;
    state.mintStatus = status;
    state.mintStatusMessage = message;
  },
  setMintedData(state, data) {
    console.log("setting minted data: ", data);
    state.mintedData = data;
  },
  removeMetaField(state, id) {
    if (!id) {
      return null;
    }
    const metaFieldsObj = JSON.parse(state.metaFieldsJson);
    const filteredArray = removeFromArrayById(metaFieldsObj, id);
    const asJson = JSON.stringify(filteredArray);
    state.metaFieldsJson = asJson;
  },
  addMetaField(state, metaObj) {
    if (!metaObj) {
      return null;
    }
    let newMetaObj = metaObj;
    let metaFieldsObj = JSON.parse(state.metaFieldsJson) || [];
    if (!newMetaObj.id && newMetaObj.name) {
      const idValue = metaObj.name.replace(/\s/g, "");
      newMetaObj.id = idValue;
    }

    metaFieldsObj.push(newMetaObj);
    const asJson = JSON.stringify(metaFieldsObj);
    state.metaFieldsJson = asJson;
    state.showNewMetaField = false;
  },
  resetMintForm(state, newData) {
    state.metaFieldsJson = "[]";

    state.fileName = "";
    state.fileType = "";
    state.authorName = "";
    state.title = "";
    state.description = "";
    state.editions = "";
    state.series = "";
    state.royaltyFee = 0;
    state.mintStatus = "ready";
    state.mintStatusMessage = "Ready to mint tokens!";
    state.mintTransactionId = "";

    state.mintedData = undefined;

    state.showStatusModal = false;

    state.showThumbnailField = false;
    state.showNewMetaField = false;
    state.uploadStatus = null;
    state.uploadStatusTitle = "";
    state.thumbnailUploadStatus = null;
    state.ipfsStatus = "";
    state.fileIpfsHash = "";
    state.fileIpfsProgress = null;
    state.thumbnailIpfsStatus = "";
    state.thumbnailIpfsHash = "";
    state.thumbnailIpfsProgress = null;

    state.arweaveStatus = "";
    state.fileArweaveHash = "";
    state.fileArweaveProgress = null;
    state.thumbnailArweaveStatus = "";
    state.thumbnailArweaveHash = "";
    state.thumbnailArweaveProgress = null;

    state.tokenPreviewMode = "upload";
  },
};

export const actions = {
  checkUploadStatus(state, mode) {
    let isDone = false;
    if (state.ipfsStatus === "uploaded" && state.arweaveStatus === "uploaded") {
      isDone = true;
      mutations.setUploadStatus(state, { mode: mode, status: "finished" });
    }
    console.log("isDone", isDone);
    // return isDone
  },
  showStatusModal: (context) => {
    const modalMode = context.rootState.ui.statusModalMode;
    const state = context.rootState.mintFormStore;
    const { mintStatus } = state;
    console.log("modalMode", modalMode);
    console.log("mintStatus", mintStatus);
    const shouldShow =
      mintStatus === "confirming" ||
      mintStatus === "working" ||
      mintStatus === "stillWorking" ||
      mintStatus === "stillWorkingMore" ||
      mintStatus === "checkTransaction" ||
      mintStatus === "noAddress" ||
      mintStatus === "error"
        ? true
        : false;

    return modalMode === "fixed" && shouldShow ? true : false;
  },
  showCompletedModal: (context) => {
    const modalMode = context.rootState.ui.statusModalMode;
    const state = context.rootState.mintFormStore;
    const { mintStatus, mintedData } = state;

    const shouldShow = mintStatus === "completed" ? true : false;

    console.log("shouldshow: ", shouldShow);
    return modalMode === "fixed" && shouldShow ? true : false;
  },
  showCropperModal: (context) => {
    const state = context.rootState.mintFormStore;
    const { showCropper, showThumbnailField } = state;
    const shouldShow = showCropper && showThumbnailField ? true : false;
    console.log("should show cropper? ", shouldShow);
    return shouldShow;
  },
  applyManualData(context, data) {
    console.log("apply manual data, ", data);
    context.commit("setManualData", data);
  },
};
