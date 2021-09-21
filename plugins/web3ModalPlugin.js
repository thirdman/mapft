// import Vue from "vue";
import Web3Modal from "web3modal";
// import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

let web3Modal;
const requiredNetwork =
  process.env.PROD_NETWORK ||
  process.env.STAGING_NETWORK ||
  process.env.DEV_NETWORK ||
  "rinkeby";

// SET MODAL THEME COLORS
// const connectModalTheme = {
//   background: "#f9f9f9",
//   main: "#009fc4",
//   secondary: "rgb(136, 136, 136)",
//   border: "rgba(0,0,0, 0.14)",
//   hover: "#eee",
// };

//
function init(requiredNetwork, infuraUrl) {
  let web3ModalNetwork = "mainnet";
  if (requiredNetwork !== "main") {
    web3ModalNetwork = "rinkeby";
  }

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
      },
    },
    // portis: {
    //   package: Portis, // required
    //   options: {
    //     id: "4a848529-8cb2-4d9a-8001-6e0b5172fd3c", // required
    //   },
    // },
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    network: web3ModalNetwork,
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });
}

export default async ({ app, store, $axios, isHMR }, inject) => {
  if (process.client) {
    // console.log("INIT");
    const { requiredNetwork, infuraUrl } = app.$config;
    init(requiredNetwork, infuraUrl);

    // inject("hello", (msg) => console.log(`Hello ${msg}!`));
    inject("web3Modal", web3Modal);
  }
  // console.log("WHAT");
};
