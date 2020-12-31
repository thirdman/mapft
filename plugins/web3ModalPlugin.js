import Vue from "vue";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

let web3Modal;
// Vue.use(Portis);
// Vue.use(WalletConnectProvider);

// const providerOptions = {
//   walletconnect: {
//     package: WalletConnectProvider, // required
//     options: {
//       infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // required
//     },
//   },
//   portis: {
//     package: Portis, // required
//     options: {
//       id: "4a848529-8cb2-4d9a-8001-6e0b5172fd3c", // required
//     },
//   },
//   // fortmatic: {
//   //   package: Fortmatic, // required
//   //   options: {
//   //     key: "pk_live_759CBA1F99C7B3A1", // required
//   //   },
//   // },
// };

// const connectModalTheme = {
//   background: "#f9f9f9",
//   main: "#009fc4",
//   secondary: "rgb(136, 136, 136)",
//   border: "rgba(0,0,0, 0.14)",
//   hover: "#eee",
// };

// export default { providerOptions, connectModalTheme };

function init() {
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("Portis is", Portis);
  // console.log("Fortmatic is", Fortmatic);
  // console.log(
  //   "window.web3 is",
  //   window.web3,
  //   "window.ethereum is",
  //   window.ethereum
  // );

  // Check that the web page is run in a secure context,
  // as otherwise MetaMask won't be available
  // if (location.protocol !== "https:") {
  //   // https://ethereum.stackexchange.com/a/62217/620
  //   // const alert = document.querySelector("#alert-error-https");
  //   // alert.style.display = "block";
  //   // document.querySelector("#btn-connect").setAttribute("disabled", "disabled");
  //   return;
  // }

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
    portis: {
      package: Portis, // required
      options: {
        id: "4a848529-8cb2-4d9a-8001-6e0b5172fd3c", // required
      },
    },
    // fortmatic: {
    //   package: Fortmatic,
    //   options: {
    //     // Mikko's TESTNET api key
    //     key: "pk_test_391E26A3B43A3350",
    //   },
    // },
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}

// Vue.use(web3Modal);

// export default ({ app }, inject) => {
//   // Inject $hello(msg) in Vue, context and store.
//   inject("hello", (msg) => console.log(`Hello ${msg}!`));
// };

export default async ({ app, store, $axios, isHMR }, inject) => {
  if (process.client) {
    console.log("INIT");

    init();

    inject("hello", (msg) => console.log(`Hello ${msg}!`));
    inject("web3Modal", web3Modal);
  }
  console.log("WHAT");
};
