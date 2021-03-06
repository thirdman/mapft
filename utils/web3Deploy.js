const CONSTANTS = {
  InfinftContract: {
    rinkeby: "0x8af1b8e9dff9e2a9cfaf31766fcddb3e24040671",
    main: "0x677444A94D7ba549aCAB94dA8767E1145E001AaA",
  },
};

var abiDEPLOY = [
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
    constant: true,
    inputs: [],
    name: "artMintingCost",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
    ],
    name: "createContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "deploymentCost",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getMintingCost",
    outputs: [
      { internalType: "uint256", name: "mintingCost", type: "uint256" },
    ],
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
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
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
      { internalType: "uint256", name: "deployCost", type: "uint256" },
      { internalType: "uint256", name: "artCost", type: "uint256" },
    ],
    name: "updateCosts",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

/**
 * DEPLOY THAT SHIT!
 * The main deploy function.
 * Most UI functionality is moved out of here, and  called using 'context'
 */
const deployThatShit = (state, context, walletAddress) => {
  // console.log("DEPLOYTHTATSHIT context: ", context);
  const network = context.$config.network;
  const requiredNetwork = context.$config.requiredNetwork;
  const factoryContract = context.$config.factoryContract;
  // const ENV = context.$config.VERCEL_ENV || "development";
  // console.log("requiredNetwork", requiredNetwork);
  // console.log("factoryContract", factoryContract);
  // console.log("ENV", ENV);
  // console.log(
  //   "IF this is production the factory contract should be 0x677444A94D7ba549aCAB94dA8767E1145E001AaA"
  // );
  // console.log(
  //   "IF this is staging the factory contract should be 0x8af1b8e9dff9e2a9cfaf31766fcddb3e24040671"
  // );

  const doIt = true;
  const web3Write = window.web3Write;
  // const infuraUrl = context.$config.infuraUrl;
  // console.log("DEPLOY: infuraUrl", infuraUrl);
  // console.log("factoryContract: ", factoryContract);
  // console.log("walletAddress: ", walletAddress);
  if (!web3Write) {
    alert("no writable web3. Pls reload. If error persists contact discord");
  }
  if (!network) {
    console.error("no wallet network set");
    context.commit(
      "deployFormStore/setDeployStatus",
      "error",
      "no wallet network set"
    );
    context.commit("deployFormStore/setDeployErrorMessage", {
      message: "No Wallet Network Set",
    });
    return null;
  }

  context.commit("deployFormStore/setDeployStatus", "confirming");

  // MAP STATE INTO EXISTING MIT FORM VARIABLES
  const contractName = state.name;
  const contractSymbol = state.symbol;
  console.log("about to deploy with ", { contractName, contractSymbol });
  if (!contractName || !contractSymbol) {
    console.error("missing variable: ", { contractName, contractSymbol });
    context.commit("deployFormStore/setDeployErrorMessage", {
      message: "Missing Variable",
    });
    return null;
  }
  if (doIt) {
    const deployCONTRACTnew = new web3Write.eth.Contract(
      abiDEPLOY,
      factoryContract
    );
    console.log("deployCONTRACTnew", deployCONTRACTnew);
    const options = { value: 100000000000000000, from: walletAddress };
    deployCONTRACTnew.methods
      .createContract(contractName, contractSymbol)
      .send(options)
      .on("transactionHash", function (transactionId) {
        console.log("transactionId", transactionId);
        context.commit("deployFormStore/setDeployTransactionId", transactionId);
        context.commit("deployFormStore/setDeployStatus", "working");
      })
      // .on("confirmation", function (confirmationNumber, receipt) {
      //   console.log("confirmationNumber, receipt", confirmationNumber, receipt);
      //   // const transactionId = receipt.transactionHash
      //   // console.log("MINT confirmation: ", receipt);
      //   if (receipt.status === true) {
      //     console.log("is true, shoulr return");
      //     // return
      //   }
      //   if (confirmationNumber > 4) {
      //     context.commit("deployFormStore/setDeployStatus", "stillWorking");
      //   }
      //   if (confirmationNumber < 8) {
      //     context.commit("deployFormStore/setDeployStatus", "stillWorkingMore");
      //   }
      //   if (confirmationNumber < 30) {
      //     context.commit("deployFormStore/setDeployStatus", "checkTransaction");
      //     // setDeployStatus('checkTransaction')
      //   }

      //   // commit("setTransactionId", transactionId)
      //   // commit("setPendingCount", 0)
      //   // commit("setTemplateStatus", "completed")
      // })
      .then((completedTransaction) => {
        console.log("completedTransaction", completedTransaction);
        if (completedTransaction.status === true) {
          context.commit("deployFormStore/setDeployStatus", "completed");
          const events = completedTransaction.events;
          const ownershipEvent = events.OwnershipTransferred;
          const newAddress = ownershipEvent[0].address;
          const contractData = {
            contractAddress: newAddress,
            contractName,
            contractSymbol,
          };
          console.log("DEPLOY contract data to set = ", contractData);

          context.dispatch("deployFormStore/setContractData", contractData);
        } else {
          console.info("NOTE: completedTransaction.status !== true");
          context.commit("deployFormStore/setDeployStatus", "timeout");
        }
      })
      .catch((error) => {
        console.log("error", error);

        context.commit(
          "deployFormStore/setDeployStatus",
          "error",
          error.message
        );
        context.commit("deployFormStore/setDeployErrorMessage", error);
        console.error("the error is: ", error);
        // return error
      });
  }
};

/**
 * TODO: refactor these to make more sense of names etc
 */
function asyncThing(num, txHash, context) {
  // something async returning a promise

  if (!Web3) {
    console.error("no Web3");
    return null;
  }
  // const network = context.$config.network;
  const infuraUrl = context.$config.infuraUrl;
  // console.log("asyncThing: infuraUrl", infuraUrl);
  const newWeb3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
  // console.log('asyncThing num txHash context: ', num, txHash, context)
  // console.log('newWeb3: ', newWeb3)
  return new Promise((resolve, reject) => {
    console.log(" in promise num, txHash: ", num, txHash);
    const timeOut = () => {
      newWeb3.eth
        .getTransactionReceipt(txHash)
        .then((hash) => {
          // console.log("hash is: ", hash);
          if (hash === null) {
            console.log("no hash, number is: ", num);
            resolve(num);
          } else {
            // console.log("hash exists!: ", hash);
            // resolve(-1, hash)
            resolve(hash);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    };
    setTimeout(timeOut, 1700);
  });
}

function recursiveFunction(num, txHash, context) {
  // asynchronous recursive function
  // console.log('recursiveFunction num, txHash', num, txHash, result)
  const intervalTime = 1500;
  // do whatever synchronous stuff when called
  // ...
  function decide(asyncResult, hash) {
    // process async result and decide what to do
    // do something with asyncResult
    console.log("asyncResult: ", asyncResult, hash);
    const isObject = typeof asyncResult === "object";

    // CHECK IS RESULT IS AN OBJECT. IF IT IS, THEN
    // THE TRANSACTION IS COMPLETE
    if (isObject) {
      return asyncResult;
    }
    if (asyncResult === 0) console.log("ignition");
    // decide if further recursion needed
    if (asyncResult < 55) {
      // setDeployStatus('stillWorking')
      context.commit("deployFormStore/setDeployStatus", "stillWorking");
    }
    if (asyncResult < 50) {
      context.commit("deployFormStore/setDeployStatus", "stillWorkingMore");
      // setDeployStatus('stillWorkingMore')
    }
    if (asyncResult < 30) {
      context.commit("deployFormStore/setDeployStatus", "checkTransaction");
      // setDeployStatus('checkTransaction')
    }
    if (asyncResult < 0) return "lift off"; // all done

    return recursiveFunction(num - 1, txHash, context); // not all done, recurse
  }

  // return a promise resolved by doing something async and deciding what to do with it
  // to be clear the returned promise is the one returned by .then
  return asyncThing(num, txHash, context).then((num, hash) =>
    decide(num, hash)
  );
}

function getReceipt(txHash, context) {
  const infuraUrl = context.$config.infuraUrl;
  const newWeb3 = new Web3.providers.HttpProvider(infuraUrl);
  // console.log('newWeb3', newWeb3);
  //console.log('signedTx', txHash);
  return newWeb3.eth
    .getTransactionReceipt(txHash)
    .then((hash) => {
      // console.log('hash is: ', hash)
      return hash;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

export { deployThatShit, recursiveFunction };
