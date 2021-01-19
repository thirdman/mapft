import { initWeb3 } from "../utils/wallet";

function init(requiredNetwork, infuraUrl) {
  // wait for hte page to load in order to be sure the script web3 is loaded
  window.addEventListener("load", function () {
    initWeb3(requiredNetwork, infuraUrl);
  });
}

export default async ({ app, store, $axios, isHMR }, inject) => {
  if (process.client) {
    const { requiredNetwork, infuraUrl } = app.$config;
    await init(requiredNetwork, infuraUrl);
  }
};
