import { initWeb3 } from "../utils/wallet";

function init(requiredNetwork, infuraUrl) {
  // wait for hte page to load in order to be sure the script web3 is loaded
  window.addEventListener("load", function () {
    initWeb3(requiredNetwork, infuraUrl);
    if (window.ethereum) {
      // check web3js where the script added it to window
      // this is an annoying workaround.
      const Web3 = window.Web3;
      window.web3 = undefined;
      const web3Write = new Web3(window.ethereum);
      window.web3Write = web3Write;
    }
  });
}

export default async ({ app, store, $axios, isHMR }, inject) => {
  if (process.client) {
    const { requiredNetwork, infuraUrl } = app.$config;
    await init(requiredNetwork, infuraUrl);
    // const accounts = await ethereum.request({ method: "eth_accounts" });
    // console.log("accounts", accounts);
  }
};
