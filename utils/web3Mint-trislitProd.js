/**
 * This file is mostly the same as the normal web3mint.js.
 *
 * TODO:
 * - Change the abi
 * - change the name of the minthatshit fucntion in this file to a custom one
 * - add an export at the bottom of this file with a custom name
 * - import that export into the mintForm.vue
 * - add an info object into the customMintMap (in mintForm);
 * - make sure you have the correct contract hash.
 */

var abiART = [
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_symbol", type: "string" },
      { internalType: "address", name: "factoryAddress", type: "address" },
      { internalType: "address", name: "contractCreator", type: "address" },
    ],
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
        indexed: false,
        internalType: "uint256",
        name: "tokenID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "exhibition",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fileType",
        type: "string",
      },
    ],
    name: "NewArtAddtData",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fileIPFSHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fileArweaveHash",
        type: "string",
      },
    ],
    name: "NewArtImageRefs",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "artistName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "artTitle",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "artistNote",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "editionNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalCap",
        type: "uint256",
      },
    ],
    name: "NewArtMetadata",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "royaltyFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "artistAddress",
        type: "address",
      },
    ],
    name: "NewArtRoyaltyInfo",
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
    inputs: [],
    name: "artistWalletAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
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
      { internalType: "string", name: "fileIPFSHash", type: "string" },
      { internalType: "string", name: "fileArweaveHash", type: "string" },
      { internalType: "string", name: "thumbnailHash", type: "string" },
      { internalType: "string", name: "artistName", type: "string" },
      { internalType: "string", name: "artTitle", type: "string" },
      { internalType: "string", name: "artistNote", type: "string" },
      { internalType: "string", name: "exhibition", type: "string" },
      { internalType: "uint256", name: "royaltyFee", type: "uint256" },
      { internalType: "uint256", name: "totalCap", type: "uint256" },
      { internalType: "string", name: "fileType", type: "string" },
    ],
    name: "createArt",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "factoryAddressRef",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "fileArweaveReferenceURL",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "fileIPFSReferenceURL",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "tokenID", type: "uint256" }],
    name: "getAdditionalMetadata",
    outputs: [
      { internalType: "string", name: "exhibitionByID", type: "string" },
      { internalType: "string", name: "fileTypeByID", type: "string" },
      { internalType: "string", name: "thumbnailHashByID", type: "string" },
    ],
    payable: false,
    stateMutability: "view",
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
      { internalType: "string", name: "fileIPFSHashByID", type: "string" },
      { internalType: "string", name: "fileArweaveHashByID", type: "string" },
      { internalType: "string", name: "artistNameByID", type: "string" },
      { internalType: "string", name: "artTitleByID", type: "string" },
      { internalType: "string", name: "artistNoteByID", type: "string" },
      { internalType: "uint256", name: "editionNumberByID", type: "uint256" },
      { internalType: "uint256", name: "totalEditionsByID", type: "uint256" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "tokenID", type: "uint256" }],
    name: "getImageLink",
    outputs: [
      { internalType: "string", name: "fileIPFSURL", type: "string" },
      { internalType: "string", name: "fileArweaveURL", type: "string" },
      { internalType: "string", name: "thumbnailURL", type: "string" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "tokenID", type: "uint256" }],
    name: "getRoyaltyData",
    outputs: [
      { internalType: "address", name: "artistAddress", type: "address" },
      { internalType: "uint256", name: "royaltyFeeByID", type: "uint256" },
    ],
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
    inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
    name: "updateArtistAddress",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "string", name: "newIPFSURL", type: "string" },
      { internalType: "string", name: "newArweaveURL", type: "string" },
    ],
    name: "updateLinks",
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
];
const testThatShit = (payload) => {
  const { data, state, useData = true } = payload;
  console.log("testThatShit:", { data, state, useData });
  // const useThumbnailDefault =
  //   state.fileType === "glb" ||
  //   state.fileType === "gltf" ||
  //   state.fileType === "mp3";

  console.log("state", state);
  // MAP STATE INTO EXISTING MIT FORM VARIABLES
  const artTitle = state.title;
  const artistName = state.authorName;
  const imageName = state.title || state.fileName;
  const artistNote = state.description;
  const exhibition = state.series || " ";
  const royaltyFee = state.royaltyFee;
  const totalCap = state.editions;
  const fileType = state.fileType;
  const fileIPFSHash = state.fileIpfsHash;
  const fileArweaveHash = state.fileArweaveHash;
  const thumbnailIPFSHash =
    state.thumbnailIpfsHash || state.thumbnailIpfsHashDefault;
  const thumbnailArweaveHash =
    state.thumbnailArweaveHash || state.thumbnailArweaveHashDefault;

  const userContractAddress = state.activeContractId;
  console.log("isNan(royaltyfee)", isNaN(royaltyFee));
  console.log("MINT: royaltyFee", royaltyFee);
  const isValidRoyalty = !Number.isNaN(royaltyFee);
  const thumbnailHashToUse = thumbnailArweaveHash;

  console.log("MINT userContractAddress", userContractAddress);
  console.log("MINT isValidRoyalty", isValidRoyalty);
  console.log("MINT fileIPFSHash: ", fileIPFSHash);
  // console.log("MINT useThumbnailDefault", useThumbnailDefault);
  console.log("MINT thumbnailIPFSHash: ", thumbnailIPFSHash);
  console.log("MINT thumbnailArweaveHash: ", thumbnailArweaveHash);
  console.log("MINT thumbnailHashToUse: ", thumbnailHashToUse);
  let isMissingVariables =
    !artTitle ||
    !artistName ||
    !imageName ||
    !artistNote ||
    !exhibition ||
    !isValidRoyalty ||
    !totalCap ||
    !fileType ||
    !userContractAddress;
  if (isMissingVariables) {
    console.error("missing variable... ", {
      artTitle,
      artistName,
      imageName,
      artistNote,
      exhibition,
      royaltyFee,
      totalCap,
      fileType,
      userContractAddress,
    });
  } else {
    console.log("no missing variables");
  }
  const mintData = {
    fileIPFSHash,
    fileArweaveHash,
    thumbnailHashToUse,
    artistName,
    imageName,
    artistNote,
    exhibition,
    royaltyFee,
    totalCap,
    fileType,
    // ADDITIONAL DATA
    userContractAddress: userContractAddress,
    isMissingVariables: isMissingVariables,
    thumbnailArweaveHash: thumbnailArweaveHash,
    thumbnailIPFSHash: thumbnailIPFSHash,
  };
  return mintData;
};

const mintThatShitTrislitProd = (event, state, rootContext) => {
  alert("mintThatShitGarethProd");

  const doIt = true;
  const context = rootContext.$store;
  const network = context.$config.requiredNetwork || "main";
  const infuraUrl = context.$config.infuraUrl;

  const useThumbnailDefault =
    state.fileType === "glb" ||
    state.fileType === "gltf" ||
    state.fileType === "mp3";

  console.log("state", state);
  // MAP STATE INTO EXISTING MIT FORM VARIABLES
  const artTitle = state.title;
  const artistName = state.authorName;
  const imageName = state.title || state.fileName;
  const artistNote = state.description;
  const exhibition = state.series || " ";
  const royaltyFee = state.royaltyFee;
  const totalCap = state.editions;
  const fileType = state.fileType;
  const fileIPFSHash = state.fileIpfsHash;
  const fileArweaveHash = state.fileArweaveHash;
  const thumbnailIPFSHash =
    state.thumbnailIpfsHash || state.thumbnailIpfsHashDefault;
  const thumbnailArweaveHash =
    state.thumbnailArweaveHash || state.thumbnailArweaveHashDefault;
  const userContractAddress = state.activeContractId;
  console.log("isNan(royaltyfee)", isNaN(royaltyFee));
  console.log("MINT: royaltyFee", royaltyFee);
  const isValidRoyalty = !Number.isNaN(royaltyFee);
  const thumbnailHashToUse = thumbnailArweaveHash;

  console.log("MINT isValidRoyalty", isValidRoyalty);
  console.log("MINT fileIPFSHash: ", fileIPFSHash);
  console.log("MINT useThumbnailDefault", useThumbnailDefault);
  console.log("MINT thumbnailIPFSHash: ", thumbnailIPFSHash);
  console.log("MINT thumbnailArweaveHash: ", thumbnailArweaveHash);
  // const thumbnailHashToUse = thumbnailIPFSHash || fileIPFSHash || "";

  console.log("MINT thumbnailHashToUse: ", thumbnailHashToUse);

  if (
    !artTitle ||
    !artistName ||
    !imageName ||
    !artistNote ||
    !exhibition ||
    !isValidRoyalty ||
    !totalCap ||
    !fileType ||
    !userContractAddress
  ) {
    console.error("missing variable... ", {
      artTitle,
      artistName,
      imageName,
      artistNote,
      exhibition,
      royaltyFee,
      totalCap,
      fileType,
      userContractAddress,
    });
    if (!userContractAddress) {
      alert(
        "Missing Info: Contract Address. Please refresh your contract id and try again."
      );
      context.commit("mintFormStore/setMintStatus", "noContract");
    }
    return null;
  }
  console.log("MiNT data will be: ", {
    fileIPFSHash,
    fileArweaveHash,
    thumbnailHashToUse,
    artistName,
    imageName,
    artistNote,
    exhibition,
    royaltyFee,
    totalCap,
    fileType,
  });
  // artistName = document.getElementById('a');
  // imageName = document.getElementById('b');
  // artistNote = document.getElementById('c');
  // exhibition = document.getElementById('d');
  // royaltyFee = document.getElementById('e');
  // totalCap = document.getElementById('f');
  // fileType = document.getElementById('g');
  // mintButton = document.getElementById('h');
  console.log("context: ", context);
  context.commit("mintFormStore/setMintStatus", "confirming");
  if (doIt) {
    var contractART = web3.eth.contract(abiART).at(userContractAddress);
    console.log("active contract: ", contractART);
    if (!contractART) {
      console.error("no contractART");
      return null;
    }

    if (!thumbnailHashToUse) {
      console.error("no thumbnailHashtouse");
      return null;
    }
    context.commit("mintFormStore/setMintStatus", "confirming");
    contractART.createArt(
      fileIPFSHash,
      fileArweaveHash,
      thumbnailHashToUse,
      artistName,
      imageName,
      artistNote,
      exhibition,
      royaltyFee,
      totalCap,
      fileType,
      { value: 5000000000000000 },
      (err, result) => {
        console.log("contractART.createArt result", result);
        const mintTransactionId = result;
        const mintTransactionLabel = document.getElementById(
          "mintTransactionLabel"
        );
        if (mintTransactionLabel) {
          mintTransactionLabel.innerHTML = `Transaction: ${mintTransactionId}`;
        }
        // setMintStatus('working')
        context.commit("mintFormStore/setMintTransactionId", mintTransactionId);
        context.commit("mintFormStore/setMintStatus", "working");
        if (err) {
          // setMintStatus('error', err)
          context.commit("mintFormStore/setMintStatus", "error", err);
          console.error(err);
        }
        if (!err) {
          console.log("got to recursive: ", recursiveMintQuery);
          recursiveMintQuery(60, mintTransactionId, context)
            .then((completedTransaction) => {
              console.log(
                "done, completedTransaction = ",
                completedTransaction
              );
              if (completedTransaction.status === true) {
                // setMintStatus('completed')
                context.commit("mintFormStore/setMintStatus", "completed");
                const newAddress = completedTransaction.logs[0].address;
                const newTokenTopics = completedTransaction.logs[0].topics;
                const newTokenIdHex = newTokenTopics && newTokenTopics[3];
                console.log("newTokenIdHex", newTokenIdHex);
                const newTokenId = decodeHexSequence(newTokenIdHex);
                console.log("newTokenId", newTokenId);
                const mintAddressLabel = document.getElementById(
                  "mintAddressLabel"
                );

                console.log("mintAddressLabel", mintAddressLabel);
                console.log("newAddress = ", newAddress);
                console.log("network = ", network);
                const mintedData = {
                  contractId: newAddress,
                  tokenId: newTokenId,
                  network: network,
                };

                context.commit("mintFormStore/setMintedData", mintedData);
                // mintAddressLabel.innerHTML = "newAddress";
              } else {
                context.commit(
                  "mintFormStore/setMintStatus",
                  "error",
                  "Something went wrong. Transaction was returned but completedTransaction.status was not true"
                );
                // setMintStatus(
                //   'error',
                //   'Something went wrong. Transaction was returned but completedTransaction.status was not true'
                // )
                console.error(
                  "something went wrong. Transaction was returned but completedTransaction.status was not true"
                );
              }
            })
            .catch((error) => console.error(error));
        }
      }
    );
  }
};

/**
 * RECURSIVE MINT TRANSACTION QUERY
 * This tests the transaction, waiting for a receipt. Returns to main function once a reseipt is fount
 */

function recursiveMintQuery(num, txHash, context) {
  // asynchronous recursive function
  // do whatever synchronous stuff when called
  // ...
  // then:
  function decide(asyncResult, hash) {
    // process async result and decide what to do
    // do something with asyncResult
    console.log("asyncResult: ", asyncResult, hash);
    const isObject = typeof asyncResult === "object";
    // console.log("isObject: ",  isObject);

    if (isObject) {
      // if an object is reuturned, then the transaction is completed!
      return asyncResult;
    }
    if (asyncResult === 0) console.log("ignition");
    // decide if further recursion needed
    if (asyncResult < 55) {
      // setMintStatus('stillWorking')
      context.commit("mintFormStore/setMintStatus", "stillWorking");
    }
    if (asyncResult < 50) {
      // setMintStatus('stillWorkingMore')
      context.commit("mintFormStore/setMintStatus", "stillWorkingMore");
    }
    if (asyncResult < 5) {
      // setMintStatus('checkTransaction')
      context.commit("mintFormStore/setMintStatus", "checkTransaction");
    }
    // if( asyncResult < 0)
    //     return "lift off"; // all done
    // if nothing is returned, try again....
    return recursiveMintQuery(num - 1, txHash, context); // not all done, recurse
  }

  // return a promise resolved by doing something async and deciding what to do with it
  // to be clear the returned promise is the one returned by .then
  return getTransactionStatus(num, txHash, context).then((num, hash) =>
    decide(num, hash)
  );
}

/**
 * GET TRANSACTION STATUS
 * this is called recursively in the recursivemintquery function
 */
function getTransactionStatus(num, txHash, context) {
  // something async returning a promise
  const intervalTime = 1700;
  console.log("context", context);
  const network = context.$config.network;
  const infuraUrl = context.$config.infuraUrl;
  // const infuraUrl =
  //   network === "main"
  //     ? context.$config.infuraUrlMain
  //     : context.$config.infuraUrlRinkeby;

  const newWeb3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
  console.log("getTransactionStatus num txHash: ", num, txHash);
  return new Promise((resolve, reject) => {
    console.log(" in promise num, txHash", num, txHash);
    const getIt = () => {
      newWeb3.eth
        .getTransactionReceipt(txHash)
        .then((hash) => {
          console.log("hash is: ", hash);
          console.log("txHash is: ", txHash);
          if (hash === null) {
            resolve(num);
          } else {
            console.log("hash exists!: ", hash);
            resolve(hash);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    };
    setTimeout(getIt, intervalTime);
  });
}

/**
 * DATAURL TO FILE
 * utility for converting thumbnail
 */

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * GET MIME TYPE
 * utility for detecting mime type
 */
function getMimeType(dataUrl) {
  const mimeType = dataUrl.substring(
    dataUrl.indexOf(":") + 1,
    dataUrl.indexOf(";")
  ); // => image/png
  return mimeType;
}

/**
 * DECODE HEX SEQUENCE
 * returns the usable token id from transaction
 */
function decodeHexSequence(hash) {
  const result = parseInt(hash.substring(2, hash.length), 16);
  return result;
}

export { mintThatShitTrislitProd, testThatShit, getTransactionStatus };
