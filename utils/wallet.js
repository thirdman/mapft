/**
 * INIT WEB3
 * initialises the web3js,
 * due to a bug in the way vercel deploys nuxt,
 * we cannot just import as a node module.
 * I hope this gets fixed soon.
 *
 * TODO: revisit
 */

function initWeb3(requiredNetwork = "main", infuraUrl) {
  console.info("WEB3INIT", requiredNetwork);
  if (window && window.web3Read) {
    // console.log('web3read: ', window.web3Read)
    console.info("web3read exists. Version: ", window.web3Read.version);
    return;
  }
  if (!window.Web3) {
    console.info("cannot init Web3 yet - not in window");
    return;
  }

  const Web3 = window.Web3;
  const web3Implementation = new Web3(
    new Web3.providers.HttpProvider(infuraUrl)
  );
  if (typeof web3 !== "undefined") {
    console.log("Web3 Detected! Current provider: ", web3.currentProvider); // eslint-disable-line
    console.log("Web3 Detected! " + web3.currentProvider.constructor.name); // eslint-disable-line
  } else {
    console.log("No Web3 Detected... using HTTP Provider");
  }
  window.web3Read = web3Implementation;
}

/**
 * CONNECT WALLET
 * This is the older version.
 * TODO: refactor out
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

// Get the connected network
// Note: other networks exist and could be considered in the future
const getConnectedNetwork = (net) => {
  const connectedNetwork = Number(net);
  switch (connectedNetwork) {
    case 1:
      return "main";
      break;
    case 4:
      return "rinkeby";
      break;
    default:
      // return "private";
      return "main";
  }
};

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

/**GET PROVIDER TYPE
 * gets string name of wallet
 */
const getProviderType = (provider) => {
  console.log("provider", provider);
  if (!provider) {
    return null;
  }
  let providerType;
  if (provider.isFortmatic) {
    providerType = "fortmatic";
  }
  if (provider.isDapper) {
    providerType = "dapper";
  }
  if (provider.isMetaMask) {
    providerType = "metamask";
  }
  if (provider.is3idProvider) {
    providerType = "3id";
  }
  if (provider.wc && provider.wc.protocol === "wc") {
    providerType = "walletconnect";
  }
  return providerType;
};

export {
  initWeb3,
  connectWallet,
  handleAccountLink,
  setConnectedNetwork,
  resolveEns,
  getProviderType,
  getConnectedNetwork,
};
