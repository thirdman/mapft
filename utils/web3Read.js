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

const readThatShit = async (params, context) => {
  const { tokenId, contractId } = params;
  const infuraUrl = context.$config.infuraUrl;

  // let fileTypeByID
  // let contractData = {}

  if (!infuraUrl) {
    console.error("no infuraurl");
    return null;
  }
  if (!contractId) {
    return null;
  }
  if (!Web3) {
    return null;
  }
  const readWeb3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
  const contract = new readWeb3.eth.Contract(abiART, contractId);
  const isAlpha = contractId === "0xd0c402bcbcb5e70157635c41b2810b42fe592bb0";
  // console.log('contract.methods', contract.methods)
  const coreMetadata = contract.methods
    .getCoreMetadata(tokenId)
    .call()
    .then((result) => {
      console.log("result is", result);
      if (isAlpha) {
        console.log("READ: is alpha contract");
      }

      const data = {
        title: result.artTitleByID,
        authorName: result.artistNameByID,
        description: result.artistNoteByID,
        edition: result.editionNumberByID,
        fileArweaveHash: result.fileArweaveHashByID,
        fileIpfsHash: result.fileIPFSHashByID,
        editions: result.totalEditionsByID,
      };
      return data;
    })
    .catch((err) => {
      console.error("coreMetadata error", err);
      throw err;
    });

  const additionalMetadata = await contract.methods
    .getAdditionalMetadata(tokenId)
    .call()
    .then((result) => {
      // console.log('result', result)
      const data = {
        exhibition: result.exhibitionByID,
        fileType: result.fileTypeByID,
        thumbnailHash: result.thumbnailHashByID,
      };
      // FILE TYPE
      // document.getElementById('metadata7').textContent = idresult7
      // document.getElementById('metadata8').textContent = idresult8
      // fileTypeByID = idresult7
      return data;
    })
    .catch((err) => {
      console.error("additionalMetadata error", err);
      throw err;
    });
  // console.log('additionalMetadata', additionalMetadata)

  const ownerOfToken = contract.methods
    .ownerOf(tokenId)
    .call()
    .then((result) => {
      // console.log('ownerOf result', result)
      // if (document) {
      //   document.getElementById('owner0').textContent = result
      // }
      return result;
    })
    .catch((err) => {
      console.error("ownerOfToken error", err);
      throw err;
    });
  const imageLinkData = contract.methods
    .getImageLink(tokenId)
    .call()
    .then((resultLinks) => {
      const linkData = {
        fileArweaveUrl: resultLinks.fileArweaveURL,
        fileIpfsUrl: resultLinks.fileIPFSURL,
        thumbnailUrl: resultLinks.thumbnailURL,
      };
      return linkData;
    })
    .catch((err) => {
      console.error("imageLinkData error ", err);
    });

  const royaltyData = contract.methods
    .getRoyaltyData(tokenId)
    .call()
    .then((result) => {
      // console.log('result', result)
      const { artistAddress, royaltyFeeByID } = result;
      // let [royaltyresult0, royaltyresult1] = result3
      // if (document) {
      //   document.getElementById('royalty0').textContent = royaltyresult0
      //   document.getElementById('royalty1').textContent = royaltyresult1
      // }
      return { artistAddress, royaltyFee: royaltyFeeByID };
    })
    .catch((err) => {
      console.error("royaltyData error: ", err);
      throw err;
    });
  // console.log('royaltyData', royaltyData)
  //imageLink,
  // additionalMetadata,
  const allData = await Promise.allSettled([
    coreMetadata,
    additionalMetadata,
    royaltyData,
    ownerOfToken,
    imageLinkData,
  ])
    .then((values) => {
      console.log("READ: values:", values);
      const data = {
        ...values[0].value,
        ...values[1].value,
        ...values[2].value,
        ownerAddress: values[3].value,
        ...values[4].value,
      };
      console.log("read: all data", data);
      return data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });

  return allData;
};

const readThatToken = async (params, context) => {
  const { tokenId, contractId } = params;
  const infuraUrl = context.$config.infuraUrl;

  if (!infuraUrl) {
    console.error("no infuraurl");
    return null;
  }
  if (!contractId) {
    return null;
  }
  if (!Web3) {
    return null;
  }
  const readWeb3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
  const contract = new readWeb3.eth.Contract(abiART, contractId);

  const getSymbol = contract.methods
    .symbol(tokenId)
    .call()
    .then((result) => {
      console.log("result is", result);
      // const data = {
      //   title: result.artTitleByID,
      //   authorName: result.artistNameByID,
      //   description: result.artistNoteByID,
      //   edition: result.editionNumberByID,
      //   fileArweaveHash: result.fileArweaveHashByID,
      //   fileIpfsHash: result.fileIPFSHashByID,
      //   editions: result.totalEditionsByID,
      // };

      return data;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });

  const allData = await Promise.allSettled([
    getSymbol,
    // additionalMetadata,
    // royaltyData,
    // ownerOfToken,
    // imageLinkData,
  ])
    .then((values) => {
      console.log("values:", values);
      // const data = {
      //   ...values[0].value,
      //   ...values[1].value,
      //   ...values[2].value,
      //   ownerAddress: values[3].value,
      //   ...values[4].value,
      // };

      return data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });

  return allData;
};

/**
 * ADDITIONAL Meta
 * retrieves only additonal data
 */
const readAdditionalMeta = async (params, context) => {
  const { tokenId, contractId } = params;
  const infuraUrl = context.$config.infuraUrl;
  if (!contractId) {
    return null;
  }
  if (!Web3) {
    return null;
  }
  const readWeb3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
  const contract = new readWeb3.eth.Contract(abiART, contractId);

  const additionalMetadata = await contract.methods
    .getAdditionalMetadata(tokenId)
    .call()
    .then((result1) => {
      // console.log("result1", result1);
      // let [idresult8, idresult7, idresult9] = result1

      // const additionalData = {
      //   fileTypeByID: idresult7,
      //   exhibitionByID: idresult8,
      //   thumbnailHashByID: idresult9,
      // }
      // console.log('additoinalData', additionalData)
      // FILE TYPE
      // document.getElementById('metadata7').textContent = idresult7
      // document.getElementById('metadata8').textContent = idresult8
      // fileTypeByID = idresult7
      return result1;
      // if (idresult7) {
      //   bodyElement && bodyElement.classList.add(idresult7)
      // }
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  // console.log("additionalMetadata", additionalMetadata);
  return additionalMetadata;
};

/**
 * ROYALTY DATA
 * retrieves only royalty data
 */
const readRoyaltyData = async (params, context) => {
  const { tokenId, contractId } = params;
  // let fileTypeByID
  // const network = context.$config.network
  const infuraUrl = context.$config.infuraUrl;

  if (!contractId) {
    return null;
  }
  if (!Web3) {
    return null;
  }
  const readWeb3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
  const contract = new readWeb3.eth.Contract(abiART, contractId);

  const royaltyData = await contract.methods
    .getRoyaltyData(tokenId)
    .call()
    .then((result3) => {
      // let [royaltyresult0, royaltyresult1] = result3
      if (document) {
        document.getElementById("royalty0").textContent = royaltyresult0;
        document.getElementById("royalty1").textContent = royaltyresult1;
      }
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  console.log("royaltyData", royaltyData);
  return royaltyData;
};

/**
 * IMAGE LINK

 */
const readImageLink = (params, context) => {
  const { tokenId, contractId } = params;
  if (!contractId) {
    return null;
  }
  const infuraUrl = context.$config.infuraUrl;
  if (!infuraUrl) {
    console.error("no infuraUrl: ", infuraUrl);
    throw "no infuraUrl";
  }
  const readWeb3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
  const contract = new readWeb3.eth.Contract(abiART, contractId);
  // console.log("gettingimagelink tokenId: ", tokenId);
  const imageLinkData = contract.methods
    .getImageLink(tokenId)
    .call()
    .then((resultLinks) => {
      // console.log("resultlinks: ", resultLinks);
      return resultLinks;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  // imageLinkData
  //   .then((result) => {
  //     console.log('link result', result)
  //   })
  //   .catch((error) => console.log(error))
  // console.log("here!", imageLinkData);

  return imageLinkData;
};

/** GET QUERY VARIABLE
 * for when there is url strings
 */
// function getQueryVariable(variable) {
//   var query = window.location.search.substring(1)
//   var vars = query.split('&')
//   for (var i = 0; i < vars.length; i++) {
//     var pair = vars[i].split('=')
//     if (pair[0] == variable) {
//       return pair[1]
//     }
//   }
//   return false
// }

/**RENDER */
// const render = (fileType, src, parent) => {
//   var read
//   if (!document) {
//     return null
//   }
//   switch (fileType) {
//     case 'glb':
//       read = document.createElement('model-viewer')
//       read.setAttribute('auto-rotate', '')
//       read.setAttribute('camera-controls', '')
//       read.className = 'tokenImage3d'
//       break
//     case 'mp4':
//       read = document.createElement('video')
//       read.setAttribute('autoplay', '')
//       read.setAttribute('loop', '')
//       read.setAttribute('controls', '')
//       read.className = 'tokenImage'
//       break
//     default:
//       read = document.createElement('img')
//       read.className = 'tokenImage'
//   }
//   read.src = src
//   var output = document && document.getElementById(parent)
//   console.log('output', output)
//   // output.innerHTML = ''
//   // output.appendChild(read)
// }

export { readThatShit, readAdditionalMeta, readRoyaltyData, readImageLink };
