import { getField, updateField } from "vuex-map-fields";
import { removeFromArrayById } from "./../utils/misc";
const svgContractAddressRinkeby = "0xbfa26c102a0fefa2233b2e7d32f6d504bebdf3e5";
const svgContractAddress = "0xa5425971826f48df6509152cf6ace505776aeb69";
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
    text: "Transaction still pending...  In times of network congestion transactions can take a long time - check the status on etherscan. If something seems wrong, ask us about it on the Infinft Discord.",
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
    text: "Contract Address is missing. Please load your contract id, or reset it in the account settings modal. This is a temporary error, and occurs when you have reloaded the mint page.",
  },
};
const abiSVG = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: false,
    inputs: [],
    name: "allowAllMinters",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "allowSquiggliers",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "creator", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "string", name: "SVG", type: "string" },
    ],
    name: "createNFT",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "creationFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "tokenID", type: "uint256" },
      { internalType: "string", name: "nftSVGExtend", type: "string" },
    ],
    name: "extendText",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "founderMinting",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "foundersMinted",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "tokenID", type: "uint256" }],
    name: "getCoreMetadata",
    outputs: [
      { internalType: "string", name: "titleByID", type: "string" },
      { internalType: "string", name: "creatorByID", type: "string" },
      { internalType: "string", name: "descriptionByID", type: "string" },
      { internalType: "uint256", name: "lengthByID", type: "uint256" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "tokenID", type: "uint256" }],
    name: "getSVG",
    outputs: [{ internalType: "string", name: "nftSVGByID", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "isOwner",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "creator", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "string", name: "SVG", type: "string" },
    ],
    name: "mintPromo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "minter", type: "address" }],
    name: "onChainGang",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "promoPeriodExpired",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "ribbonCut",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "tokenReferenceURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "tokenID", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalArtPieces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "newCreationFee", type: "uint256" },
    ],
    name: "updateFee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "string", name: "newURI", type: "string" }],
    name: "updateURI",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address payable",
        name: "withdrawAddress",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const defaultCode = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800px" height="536px" viewBox="0 0 800 536" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="logo_lowres" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group" transform="translate(0.000000, 1.000000)" fill="#111111" fill-rule="nonzero">
            <polygon id="Path" points="8 23.588387 340.523654 219 383 194.24697 48.3383558 0"></polygon>
            <polygon id="Path" points="0 40 0 496.742257 40.3763295 520 40.3763295 111.492507 283.588485 252.492253 324 229.624084"></polygon>
            <polygon id="Path" points="759.522657 415.38714 516.300558 274.076819 476 296.923928 800 487 800 29.5764496 759.522657 6"></polygon>
            <polygon id="Path" points="117 368.266374 117 416 701.626069 79.3638432 701.626069 360.130034 743 385.006284 743 6"></polygon>
            <polygon id="Path" points="57 141.245436 57 520 683 157.639035 683 110 98.3079748 446.915475 98.3079748 165.460919"></polygon>
            <polygon id="Path" points="418 331.688356 751.088584 526 791 502.247194 458.919965 308"></polygon>
        </g>
    </g>
</svg>`;

export const state = () => ({
  svgData: {
    label: "first artwork",
    canvasWidth: 1600,
    canvasHeight: 1600,
    settings: {
      rotationOptions: [0, 90, 180, 270],
    },
    recipeTypes: [
      "background",
      "circle",
      "blob",
      "rectangle",
      "triangle",
      "polygon",
      "line",
    ],
    elements: [
      {
        label: "Background",
        id: "example-background-id",
        mode: "generative",
        count: 1,
        type: "background",

        options: {
          color: null,
          h: 210,
          hex: "#7E93A8",
          l: 0.6,
          s: 0.6,
          angle: 45,
        },
      },
      {
        label: "ExampleTriangle",
        id: "example-trianlge-id",
        mode: "static",
        count: "1",
        type: "triangle",
        options: {
          hue: null,
          x: 0,
          y: 0,
          w: 1600,
          h: 1600,
          rotation: 0,
          rotationOptions: [0, 90, 180, 270],
        },
      },
      {
        label: "ExampleDots",
        id: "example-dots-id",
        mode: "generative",
        count: "20",
        type: "circle",
        options: {
          hue: null,
          x: 0,
          y: 0,
          w: 400,
          h: 400,
          minSize: "80",
          maxSize: "400",
          useAnimation: true,
          animationMode: "generative",
          animationOffsetX: 100,
          animationOffsetY: 100,
          animationScale: 1,
          animationRotation: 0,
        },
      },
    ],
  },
  activeTheme: {
    id: "default",
    colors: ["#cc0099", "#cc4499", "#cc8899", "#ccbb99", "#ccee99"],
  },
  svgStatus: "",
  svgStatusMessage: null,
  canMintSvg: true,
  controlMode: "rules",
  previewMode: "edit",
  showPreview: false,
  svgFee: 0.1,
  svgTitle: "",
  svgCreator: "",
  svgDescription: "",
  svgCode: defaultCode,
  svgTransactionId: null,
  previewBytes: null,
  calculatedFee: null,
  // statusMap: this.statusMap,
});

export const getters = {
  activeTheme: (state) => state.activeTheme,
  canMintSvg: (state) => state.canMintSvg,
  svgData: (state) => state.svgData,
  svgStatus: (state) => state.svgStatus,
  svgStatusMessage: (state) => state.svgStatusMessage,
  recipeTypes: (state) => state.recipeTypes,
  controlMode: (state) => state.controlMode,
  previewMode: (state) => state.previewMode,
  showPreview: (state) => state.showPreview,
  svgCode: (state) => state.svgCode,
  svgFee: (state) => state.svgFee,
  previewBytes: (state) => state.previewBytes,
  calculatedFee: (state) => state.calculatedFee,
  svgTransactionId: (state) => state.svgTransactionId,
  getActiveContractId(state, getters, rootState) {
    const activeContractId = rootState.ui.activeContractId;
    return activeContractId;
  },

  previewData(state, context, rootStore) {
    const {
      svgTitle,
      svgDescription,
      svgCreator,
      previewBytes,
      calculatedFee,
    } = state;
    return {
      svgTitle,
      svgDescription,
      svgCreator,
      previewBytes,
    };
  },
  getField,
};

export const mutations = {
  updateField,
  resetSvgForm(state, newData) {
    svgFee = 0.25;
    svgTitle = "test";
    svgCreator = "example title";
    svgDescription = "example title";
    svgCode = "<svg></svg>";
  },
  setActiveTheme(state, value) {
    state.activeTheme = value;
  },
  setShowPreview(state, newState) {
    console.log("settings show preview", newState);
    state.showPreview = newState;
  },
  setPreviewMode(state, newState) {
    state.previewMode = newState;
  },
  setControlMode(state, newState) {
    state.controlMode = newState;
  },

  setSvgData(state, newData) {
    console.log("newsvgdata", newData);
    state.svgData = newData;
  },
  setSvgElements(state, newArray) {
    const currentData = state.svgData && state.svgData;
    currentData.elements = newArray;
    state.svgData = currentData;
  },
  setBytes(state, value) {
    state.previewBytes = value;
    const gasFee = 50;
    console.log("gas used:", value / 1000000);
    const transactionFee = (value / 1000000) * gasFee;

    // const roundedFee =parseFloat(transactionFee).toFixed(5);
    // 1KB = 640000 gas
    // therefore 1byte = 64000 gas
    // so bytevalue * 6400 = gas fee
    const inKb = value / 10000;
    const inGwei = inKb * 64000 * 10;
    const inEther = inGwei / 1000000000;
    // console.log("gas used in gwei:", inGwei);
    // console.log(
    //   "gas used bytevalue * 6400 in gwei:",
    //   inEther,
    //   " - ",
    //   inGwei / 1000000000
    // );
    // const roundedFee =
    //   Math.round((transactionFee + Number.EPSILON) * 100) / 100;
    state.calculatedFee = inEther * gasFee;
  },
  setCalculatedFee(state, value) {
    console.log("SETTING setCalculatedFee", value);
    state.calculatedFee = value;
  },
  setSvgTransactionId(state, value) {
    console.log("setSvgTransactionId", value);
    state.svgTransactionId = value;
  },
  setSvgStatus(state, statusObj) {
    const { status } = statusObj;
    console.log("statusObj", statusObj);
    console.log("status", status);
    console.log("statusMap", statusMap);
    console.log("statusMap[status]", statusMap[status]);
    console.log("statusMap[status].text", statusMap[status].text);
    const message = statusMap && statusMap[status].text;
    console.log("message: ", message);
    state.svgStatus = status;
    if (message) {
      state.svgStatusMessage = message;
    }
  },
};

export const actions = {
  getColor: async function (context, index) {
    // const { index } = data;
    // console.log("data, index: ", data, index);
    const { state } = context;
    const { activeTheme } = state;
    const isIndex = !isNaN(index);
    const max = activeTheme.colors && activeTheme.colors.length - 1;
    const randomIndex = await this.dispatch("svgFormStore/random", {
      min: 0,
      max: max,
    });
    // const selectedColor =
    //   activeTheme && activeTheme.colors[isIndex ? index : randomIndex];
    const selectedColor = activeTheme && activeTheme.colors[randomIndex];
    return selectedColor;
  },
  handleMintSvg: async function (context, data) {
    // console.log("mint this: ", this);
    // const context = this;
    const { state, rootState } = context;

    console.log("context", context);
    console.log("context.commit", context.commit);
    console.log("data", data);
    console.log("svgFormStore", context.svgFormStore);
    console.log("svgFormStore2", this.svgFormStore);
    console.log("rootState", rootState);
    console.log("state", state);
    const { svgFee, svgTitle, svgCreator, svgDescription, svgCode } = state;
    const network = rootState.ui.network;
    // const network = context.$config.network;
    const doIt = true;
    console.log("network", network);
    context.commit("setSvgStatus", { status: "confirming" });
    var contractSVG = web3.eth.contract(abiSVG).at(svgContractAddressRinkeby);
    console.log("active contract: ", contractSVG);
    // const tempData = { name: state.name, symbol: state.symbol }
    const weiValue = 50000000000000000; // rinkeby
    // const weiValue = 100000000000000000 // main
    const canMint = await context.dispatch("canMint", {
      svgFee,
      svgTitle,
      svgCreator,
      svgDescription,
      svgCode,
    });
    console.log("canMint", canMint);
    if (!canMint) {
      console.error("canMint is false");
      return null;
    }
    const createTransationId = contractSVG.createNFT(
      svgTitle,
      svgCreator,
      svgDescription,
      svgCode,
      { value: weiValue },
      (err, result) => {
        if (err) {
          console.log("contractSVG err", err);
          return null;
        } else {
          console.log("contractSVG result", result);
          // const mintTransactionId = result;
          context.commit("setSvgStatus", { status: "working" });
          context.commit("setSvgTransactionId", result);
          return result;
        }
      }
    );
    console.log("createTransationId id: ", createTransationId);
  },
  canMint(_, parameters) {
    console.log("parameters", parameters);
    const { svgTitle, svgCreator, svgDescription, svgCode } = parameters;
    let hasRequired = false;
    if (svgTitle && svgCreator && svgDescription && svgCode) {
      hasRequired = true;
    }
    return hasRequired;
  },
  random(_, { min, max, float = false }) {
    const val = Math.random() * (max - min) + min;
    if (float) {
      return val;
    }
    return Math.floor(val);
  },
  // countBytes(source) {
  //   const bytes = Buffer.byteLength(source);
  //   const gasFee = 30;
  //   const transactionFee = (bytes / 1000000) * gasFee;
  //   const roundedFee = parseFloat(transactionFee).toFixed(5);
  //   return bytes;
  // },
};
