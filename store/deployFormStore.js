import { getField, updateField } from "vuex-map-fields";
import { removeFromArrayById } from "./../utils/misc";
import { deployThatShit } from "../utils/web3Deploy.js";

const deployStatusMap = {
  ready: {
    text: "Ready",
    title: "Ready",
  },
  confirming: {
    title: "Awaiting Confirmation....",
    text: "Please confirm deploy transaction in your Ethereum Wallet",
  },
  working: {
    title: "Working",
    text: "Working...",
  },
  stillWorking: {
    title: "Working",
    text: "Still Working...",
  },
  stillWorkingMore: {
    title: "Working",
    text: "Waiting... Deploy transaction can take some time.",
  },
  checkTransaction: {
    title: "Check Transaction",
    text:
      "Transaction still pending... If the transaction takes a long time, check the status using the transaction id on etherscan. If something seems wrong, ask about it on the Infinft Discord.",
  },
  done: {
    title: "Done",
    text: "Done",
  },
  completed: {
    title: "Completed",
    text: "Transaction Complete",
  },
  timeout: {
    title: "Transaction Pending: timeout",
    text:
      "The transaction is taking a long time, likely due to network congestion. Check the etherscan status.",
  },
  error: {
    title: "Error",
    text: "Error: Something went wrong.",
  },
};

export const state = () => ({
  canDeploy: false,
  deployStatus: "ready",
  deployStatusMessage: "",
  deployStatusTitle: "",
  deployErrorMessage: "",
  deployTransactionId: null,
  deployedData: null,
  showNewMetaTemplate: false,
  name: "",
  symbol: "",
  another: "",
  categories: [],

  metaTemplatesJson:
    '[{"id":"rarity", "name":"Rarity",      "type":"string",      "helpText":"Enter the rarity this artwork has.",      "required":true   },   {     "id":"colorway",      "name":"Color Way / Theme",      "type":"string",      "helpText":"The color theme of the work, if applicable",      "required":false   }]',
});
export const getters = {
  activeContractName: (state) => state.activeContractName,
  activeContractSymbol: (state) => state.activeContractSymbol,
  deployStatus: (state) => state.deployStatus,
  deployStatusTitle: (state) => {
    const deployStatus = state.deployStatus;
    const title = deployStatusMap[deployStatus].title;
    return title;
  },
  deployStatusMessage: (state) => state.deployStatusMessage,
  deployErrorMessage: (state) => state.deployErrorMessage,
  deployTransactionId: (state) => state.deployTransactionId,

  metaTemplatesObj: (state) => {
    return JSON.parse(state.metaTemplatesJson);
  },
  canDeploy: (state) => {
    let canWeDeployShit = false;
    if (state.name && state.symbol) {
      canWeDeployShit = true;
    }
    return canWeDeployShit;
  },
  getField,
};

export const mutations = {
  // Add the `updateField` mutation to the
  // `mutations` of your Vuex store instance.
  updateField,
  setDeployStatus(state, status, customMessage) {
    console.log("setDeployStatus message", customMessage);
    const message = deployStatusMap[status].text;
    state.deployStatus = status;
    state.deployStatusMessage = message;
  },
  setDeployErrorMessage(state, errorObj) {
    console.log("setDeployError message", errorObj);
    state.deployErrorMessage = errorObj.message;
  },
  setDeployTransactionId(state, value) {
    console.log("deployformstore setting transaction id: ", value);
    state.deployTransactionId = value;
  },
  setShowNewMetaTemplate(state, newState) {
    state.showNewMetaTemplate = newState;
  },
  removeMetaTemplate(state, id) {
    const metaTemplatesObj = JSON.parse(state.metaTemplatesJson);
    const filteredArray = removeFromArrayById(metaTemplatesObj, id);
    const asJson = JSON.stringify(filteredArray);
    console.log("asJson", asJson);
    state.metaTemplatesJson = asJson;
  },
  addMetaTemplate(state, metaObj) {
    const metaTemplatesObj = JSON.parse(state.metaTemplatesJson);
    metaTemplatesObj.push(metaObj);
    const asJson = JSON.stringify(metaTemplatesObj);
    state.metaTemplatesJson = asJson;
    state.showNewMetaTemplate = false;
  },

  resetDeployForm(state, newData) {
    state.name = "";
    state.symbol = "";
    state.deployStatus = "ready";
    state.deployStatusMessage = "";
    state.metaTemplatesJson = "[]";
  },
};

export const actions = {
  // async handleSearch(dispatch, commit) {},
  handleDeploy: function (context, data) {
    const { state } = context;
    const tempData = { name: state.name, symbol: state.symbol };
    const { walletAddress } = data;
    deployThatShit(state, this, walletAddress);
  },
  setContractData(context, contractData) {
    const { contractAddress } = contractData;
    // console.log('set contractData context', context, this)
    const { state } = context;
    const fullContractData = {
      activeContractId: contractAddress,
      activeContractName: state.name,
      activeContractSymbol: state.symbol,
    };
    // console.log('context', context)
    // console.log('context.state', context.state)
    console.log("setting contractData", contractData);
    console.log("setting fullContractData", fullContractData);
    this.commit("ui/setActiveContractData", fullContractData);

    // state.name = ''
    // state.symbol = ''
  },
};

// export const mutations = {
//   updateDeployForm(state, { value, name, symbol }) {
//     console.log('value', value, name, symbol)
//     Vue.set(state.list, key, user)
//   },
//   // remove(state, { todo }) {
//   //   state.list.splice(state.list.indexOf(todo), 1)
//   // },

// }
