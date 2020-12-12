// import Vuex from 'vuex'

// var ENS = require("ethereum-ens");
/**
 * CONNECT WALLET
 */

const connectWallet = async (props) => {
  const {
    setWallet,
    setWalletChain,
    setNetworkName,
    setWalletStatus,
    setEnsName,
  } = props;

  let provider, net;
  // Try to connect Metamask

  if (typeof window.ethereum !== "undefined") {
    // Get web3 instance
    provider = window.ethereum;
    // console.log('provider: ', provider)

    try {
      // Request account access
      const accts = await provider.enable();
      // setWeb3(new Web3(provider));

      provider.autoRefreshOnNetworkChange = false;
      if (!accts[0]) {
        console.log("error", provider);
        throw "missing account";
      }
      // setAccount(accts[0])
      setWalletChain("eth");
      setWallet(accts[0]);

      // Listen for change of account
      if (provider && provider.on) {
        provider.on("accountsChanged", (accts) => {
          // setAccount(accts[0])
          setWallet(accts[0]);
        });
      }
      // Get network
      net = provider.networkVersion;
      setConnectedNetwork(net, setNetworkName);

      // Listen for change of network
      if (provider && provider.on) {
        provider.on("networkChanged", function (net) {
          alert("network changed");
          setConnectedNetwork(net);
        });
      }
      if (provider && accts[0]) {
        console.log("provider is:", provider);
        console.log("web3 is:", window.ethereum);
        resolveEns(accts[0], provider, setEnsName);
      }
    } catch (error) {
      // User denied account access...
      console.log("denied. ERROR: ", error);
      console.log("setWalletStatus: ", setWalletStatus);
      setWalletStatus("denied");
    }
  }
};

// const setAccount = (account) => {
//   console.log('setting account...')
//   console.log('setWallet: ', setWallet)

//   const bodyElement = document.getElementById('body')
//   if (account) {
//     bodyElement.classList.add('hasWallet')
//     bodyElement.classList.remove('enablingWallet')
//   } else {
//     bodyElement.classList.add('noWallet')
//     bodyElement.classList.remove('enablingWallet')
//   }
// }

// Set the connected network
const setConnectedNetwork = (net, setNetworkName) => {
  const connectedNetwork = Number(net);
  switch (connectedNetwork) {
    case 1:
      // setNetworkClass('main-network')
      setNetworkName("main");
      break;
    case 4:
      // setNetwork("Rinkeby Test Network");
      // setNetworkClass('rinkeby-network')
      setNetworkName("rinkeby");
      break;
    default:
      // setNetwork("Private network");
      // setNetworkClass('private-network')
      setNetworkName("private");
  }
};

/**
 * Account link
 * creates a link to user account
 */
const handleAccountLink = () => {
  const accountElement = document.getElementById("footerAccountElement");
  if (accountElement && accountElement.innerHTML);
  console.log("account id is: ", accountElement.innerHTML);
  window.open(
    `https://opensea.io/accounts/${accountElement.innerHTML}`,
    "_blank"
  );
};

/**
 * Resolve ens
 *
 */
const resolveEns = (address, provider, setEnsName) => {
  // console.log("resolveEns:", address, provider);
  // if (address && provider) {
  //   var ens = new ENS(provider);
  //   console.log("ens", ens);
  //   // var ensResult = new ens(provider);
  //   // console.log("ensThing", ensResult);
  //   return ens
  //     .reverse(address)
  //     .name()
  //     .then((ensName) => {
  //       console.log("got it", ensName);
  //       setEnsName(ensName);
  //       return ensName;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       return null;
  //     });
  // }
};

export { connectWallet, handleAccountLink, setConnectedNetwork, resolveEns };
