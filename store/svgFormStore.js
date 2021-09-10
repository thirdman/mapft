import { v4 as uuidv4 } from "uuid";
import { getField, updateField } from "vuex-map-fields";
// import { removeFromArrayById } from "./../utils/misc";
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
<svg width="1600px" height="1600px" viewBox="0 0 1600 1600" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
          hex: "#7E93A8",
          angle: 45,
          fillType: "theme",
          useGradient: false,
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
          fillType: "theme",
          useGradient: false,
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
          fillType: "theme",
          useGradient: true,
        },
      },
    ],
  },
  defaultElement: {
    label: "new rule",
    type: "circle",
    mode: "static",
    options: {
      hue: null,
      x: 0,
      y: 0,
      w: 400,
      h: 400,
      useAnimation: false,
      animationMode: "generative",
      fillType: "theme",
      useGradient: false,
      hasFill: true,
      hasStroke: false,
    },
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
  svgCode: null,
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
  defaultCode: (state) => defaultCode,
  defaultElement: (state) => defaultElement,
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
    state.svgFee = 0.25;
    state.svgTitle = "test";
    state.svgCreator = "example title";
    state.svgDescription = "";
    state.svgCode = null;
    state.svgData.elements = [];
  },
  setSvgCode(state, value) {
    console.log("settign svg code: ", value);
    state.svgCode = value;
    // state.svgData.elements = [];
  },
  setSvgDescription(state, value) {
    console.log("setting svg description: ", value);
    state.svgDescription = value;
  },
  setSvgTitle(state, value) {
    console.log("setting svg description: ", value);
    state.svgTitle = value;
  },
  setSvgCreator(state, value) {
    console.log("setting svg description: ", value);
    state.svgCreator = value;
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
    const walletAddress = "0xd1C248d1c9879dC3b5A846D4DcCC5b7aA8fbF432";
    const INFURA_URL_MAIN =
      "https://mainnet.infura.io/v3/46aac655d58d4fc198a43792d193fd70";
    const INFURA_URL_RINKEBY =
      "https://rinkeby.infura.io/v3/46aac655d58d4fc198a43792d193fd70";
    const infuraUrl = INFURA_URL_RINKEBY;
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
    const doIt = false;
    console.log("network", network);
    console.log("window.ethereum", window.ethereum);
    console.log("Web3", Web3);

    if (!Web3) {
      console.error("no Web3");
      return;
    }
    // if (!web3) {
    //   console.error("no web3", this);
    // }
    if (!window.ethereum) {
      console.error("no window.ethereum", window.ethereum);
      return;
    }
    context.commit("setSvgStatus", { status: "confirming" });
    // var contractSVG = web3.eth.contract(abiSVG).at(svgContractAddressRinkeby);
    const newWeb3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    if (!newWeb3) {
      console.error("no newWeb3");
      return;
    }

    console.log("window.web3Write", window.web3Write);
    console.log("newWeb3", newWeb3);
    if (!window.web3Write) {
      console.error("no window.web3Write");
      return;
    }
    const contractSVG = new window.web3Write.eth.Contract(
      abiSVG,
      svgContractAddressRinkeby
    );

    // var contractSVG = window.web3Write.eth
    //   .contract(abiSVG)
    //   .at(svgContractAddressRinkeby);
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
    const options = { value: weiValue, from: walletAddress };
    contractSVG.methods
      .createNFT(svgTitle, svgCreator, svgDescription, svgCode)
      .send(options)
      .on("transactionHash", function (transactionId) {
        console.log("transactionId", transactionId);
        // const mintTransactionLabel = document.getElementById(
        //   "mintTransactionLabel"
        // );
        // if (mintTransactionLabel) {
        //   mintTransactionLabel.innerHTML = `Transaction: ${transactionId}`;
        // }
        // // setMintStatus('working')
        // context.commit("mintFormStore/setMintTransactionId", transactionId);
        // context.commit("mintFormStore/setMintStatus", "working");
      })
      .then((completedTransaction) => {
        console.log("done, completedTransaction = ", completedTransaction);
        // if (completedTransaction.status === true) {
        //   // setMintStatus('completed')
        //   context.commit("mintFormStore/setMintStatus", "completed");
        //   const events = completedTransaction.events;
        //   console.log("events", events);
        //   // const NewArtAddtData = events.NewArtAddtData.returnValues;
        //   const NewArtMetadata = events.NewArtMetadata.returnValues;
        //   // const newAddress = completedTransaction.logs[0].address;
        //   // const newTokenTopics = completedTransaction.logs[0].topics;
        //   // const newTokenIdHex = newTokenTopics && newTokenTopics[3];
        //   // console.log("newTokenIdHex", newTokenIdHex);
        //   // const newTokenId = decodeHexSequence(newTokenIdHex);
        //   const newTokenId = NewArtMetadata.tokenID;
        //   console.log("newTokenId", newTokenId);

        //   console.log("network = ", network);
        //   const mintedData = {
        //     contractId: userContractAddress,
        //     tokenId: newTokenId,
        //     network: network,
        //   };
        //   console.log("mintedData = ", mintedData);

        //   context.commit("mintFormStore/setMintedData", mintedData);
        // } else {
        //   context.commit(
        //     "mintFormStore/setMintStatus",
        //     "error",
        //     "Something went wrong. Transaction was returned but completedTransaction.status was not true"
        //   );
        //   console.error(
        //     "something went wrong. Transaction was returned but completedTransaction.status was not true"
        //   );
        // }
      })
      .catch((error) => {
        console.log("error", error);
        // commit("setTransactionStatus", "error")
        // commit("setTransactionError", error.message)
        // commit("setPendingToken", null)
        // commit("setTransactionId", null)
        // return error
      });

    // const createTransationId = contractSVG.methids.createNFT(
    //   svgTitle,
    //   svgCreator,
    //   svgDescription,
    //   svgCode,
    //   { value: weiValue },
    //   (err, result) => {
    //     if (err) {
    //       console.log("contractSVG err", err);
    //       return null;
    //     } else {
    //       console.log("contractSVG result", result);
    //       // const mintTransactionId = result;
    //       context.commit("setSvgStatus", { status: "working" });
    //       context.commit("setSvgTransactionId", result);
    //       return result;
    //     }
    //   }
    // );

    // console.log("createTransationId id: ", createTransationId);
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

  async saveSvgFile(context, props) {
    const { dispatch, commit, rootState, state } = context;
    const { node, binId = "6131a4023b222b1d0d959d75", code, name } = props;
    const { $axios } = this;
    let { binData } = rootState.ui;

    console.log("rootState", rootState);
    console.log("binData", binData);
    const target = node && node.$refs.svg;
    const source = code || target.innerHTML;
    console.log("source", source, target);
    if (!binData) {
      console.log("no bindata");
      binData = await this.dispatch("ui/getImages");
      // return;
    }
    // https://api.jsonbin.io/b/6131a4023b222b1d0d959d75
    const currentImages = binData.images || [];
    const tempImages = [...currentImages];
    console.log("tempImages", tempImages);
    const newId = uuidv4();
    const newImage = {
      id: newId,
      title: "test",
      creator: name || "test",
      src: source,
    };
    tempImages.push(newImage);
    console.log("tempImages:", tempImages);

    const newData = { ...binData, images: tempImages };
    const binKey =
      "$2b$10$kIn/DemBXe9p46ZDooUw3udev8IC8LAVUiipJgYtAwPBhjqN0xAZ.";
    if (!newData) {
      return;
    }

    await commit("ui/setBinStatus", "working");
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
  // **
  // * Simple function that converts a plain SVG string or SVG DOM Node into an image with custom dimensions.
  // *
  // * @param {Object} settings The configuration object to override the default settings.
  // * @see https://ourcodeworld.com/articles/read/1456/how-to-convert-a-plain-svg-string-or-svg-node-to-an-image-png-or-jpeg-in-the-browser-with-javascript
  // * @returns {Promise}
  // */

  // async createSvgFile(context, props) {
  //   const { dispatch } = context;
  //   const { node } = props;
  //   console.log("props", props);
  //   const target = node.$refs.svg;
  //   const source = target.innerHTML;
  //   console.log("source", source, target);

  //   const settings = {
  //     // 1. Provide the SVG DOM element
  //     // svg: document.getElementById("my-svg"),
  //     svg: target,
  //     // 2. Provide the format of the output image
  //     mimetype: "image/png",
  //     // 3. Provide the dimensions of the image if you want a specific size.
  //     //  - if they remain in auto, the width and height attribute of the svg will be used
  //     //  - You can provide a single dimension and the other one will be automatically calculated
  //     // width: "auto",
  //     // height: "auto",
  //     width: props.width || 1600,
  //     height: props.height || 1600,
  //     // 4. Specify the quality of the image
  //     quality: 1,
  //     // 5. Define the format of the output (base64 or blob)
  //     outputFormat: "base64",
  //   };
  //   // console.log("info", this.random(1, 23, false));
  //   const image = await dispatch("SVGToImage", settings)
  //     .then(function (outputData) {
  //       // If using base64 (outputs a DataURL)
  //       //  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0...
  //       // Or with Blob (Blob)
  //       //  Blob {size: 14353, type: "image/png"}
  //       console.log(outputData);
  //     })
  //     .catch(function (err) {
  //       // Log any error
  //       console.log(err);
  //     });
  //   console.log("iamge", image);
  // },
  // async SVGToImage(context, settings) {
  //   // SVGToImage: function (context, settings) {
  //   console.log("settings", settings);
  //   // SVGToImage(settings) {
  //   let _settings = {
  //     svg: null,
  //     // Usually all SVG have transparency, so PNG is the way to go by default
  //     mimetype: "image/png",
  //     quality: 0.92,
  //     width: "auto",
  //     height: "auto",
  //     outputFormat: "base64",
  //   };

  //   // Override default settings
  //   for (let key in settings) {
  //     _settings[key] = settings[key];
  //   }

  //   new Promise(function (resolve, reject) {
  //     let svgNode;

  //     // Create SVG Node if a plain string has been provided
  //     if (typeof _settings.svg == "string") {
  //       // Create a non-visible node to render the SVG string
  //       let SVGContainer = document.createElement("div");
  //       SVGContainer.style.display = "none";
  //       SVGContainer.innerHTML = _settings.svg;
  //       svgNode = SVGContainer.firstElementChild;
  //     } else {
  //       svgNode = _settings.svg;
  //     }

  //     let canvas = document.createElement("canvas");
  //     let context = canvas.getContext("2d");

  //     let svgXml = new XMLSerializer().serializeToString(svgNode);
  //     let svgBase64 = "data:image/svg+xml;base64," + btoa(svgXml);

  //     const image = new Image();

  //     image.onload = function () {
  //       let finalWidth, finalHeight;

  //       // Calculate width if set to auto and the height is specified (to preserve aspect ratio)
  //       if (_settings.width === "auto" && _settings.height !== "auto") {
  //         finalWidth = (this.width / this.height) * _settings.height;
  //         // Use image original width
  //       } else if (_settings.width === "auto") {
  //         finalWidth = this.naturalWidth;
  //         // Use custom width
  //       } else {
  //         finalWidth = _settings.width;
  //       }

  //       // Calculate height if set to auto and the width is specified (to preserve aspect ratio)
  //       if (_settings.height === "auto" && _settings.width !== "auto") {
  //         finalHeight = (this.height / this.width) * _settings.width;
  //         // Use image original height
  //       } else if (_settings.height === "auto") {
  //         finalHeight = this.naturalHeight;
  //         // Use custom height
  //       } else {
  //         finalHeight = _settings.height;
  //       }

  //       // Define the canvas intrinsic size
  //       canvas.width = finalWidth;
  //       canvas.height = finalHeight;

  //       // Render image in the canvas
  //       context.drawImage(this, 0, 0, finalWidth, finalHeight);

  //       if (_settings.outputFormat == "blob") {
  //         // Fullfil and Return the Blob image
  //         canvas.toBlob(
  //           function (blob) {
  //             resolve(blob);
  //           },
  //           _settings.mimetype,
  //           _settings.quality
  //         );
  //       } else {
  //         // Fullfil and Return the Base64 image
  //         resolve(canvas.toDataURL(_settings.mimetype, _settings.quality));
  //       }
  //     };

  //     // Load the SVG in Base64 to the image
  //     image.src = svgBase64;
  //     console.log("here", image);
  //   });
  //   console.log("here2", image);
  //   // console.log("isit", isit);
  //   // await isit
  //   //   .then((result) => {
  //   //     console.log("result", result);
  //   //   })
  //   //   .catch((error) => console.error("error", error));
  // },
};
