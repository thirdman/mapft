// import '../scripts/arweaveFinal.js'
const axios = require("axios").default;

/**
 * OPEN FILE
 * starts the file upload process for the MAIN file
 */
const openFile = async (file, context) => {
  const {
    toggleThumbnail,
    renderImage,
    setUploadStatus,
    setFileInfo,
    triggerUploadProcess,
  } = context;

  let input = file.target;
  const fileInput = input.files[0];

  console.log("open file: does axios exist: ", axios);
  if (!fileInput) {
    // This happens is someone hits cancel on the file select dialog.
    // TODO, reseet other state...
    setUploadStatus({ mode: "file", status: "noFile" });
    return;
  }

  const fileName = fileInput.name;
  const fileType = fileName.split(".").pop().toLowerCase();

  renderImage(fileType, window.URL.createObjectURL(fileInput), "output");

  setFileInfo({ fileName, fileType });
  toggleThumbnail(fileType);
  triggerUploadProcess();
  // startUploadProcess()
};

/**
 * OPEN THUMBNAIL
 * handles the thumbnail version
 */

const openThumbnail = async (file, context) => {
  console.log("open thumbnail: ", file, context);

  const {
    // renderImage,
    setThumbnailUploadStatus,
    // setFileInfo,
    triggerUploadThumbnailProcess,
  } = context;

  let input = file.target;
  const fileInput = input.files[0];

  if (!fileInput) {
    // This happens is someone hits cancel on the file select dialog.
    // TODO, reseet other state...
    setThumbnailUploadStatus({ mode: "thumbnail", status: "noFile" });
    return;
  }
  setThumbnailUploadStatus({ mode: "thumbnail", status: "confirming" });
  triggerUploadThumbnailProcess();
};

/**
 * PROCESS UPLOAD
 * Unified upload process method
 */
const processUpload = async (props) => {
  let fileArweaveHash;
  const { mode = "file", file, context } = props;
  // console.group("PROCESS UPLOAD");
  // console.log("PROCESS UPLOAD: ", { mode, file, context });
  // console.groupEnd();

  // TOGGLE UPLOADER FUNCTIONS
  const settings = {
    ipfs: true,
    arweave: true,
    arweaveLegacy: false,
  };

  const {
    setUploadStatus,
    personalSignFiles,
    removePinFromIPFS,
    fileIpfsHash,
    setArweaveHash,
    setArweaveStatus,
    arUploadFile,
    setProgress,
  } = context;

  try {
    var signature;
    setUploadStatus({ mode: mode, status: "confirming", text: "" });

    if (settings.arweaveLegacy) {
      signature = await personalSignFiles(
        await ArUploadFile_getSigningData(file)
      );
      console.log(`Got Signature: ${signature}`);
    }

    console.log(`Starting upload process (mode: ${mode})`);

    // IPFS
    if (settings.ipfs) {
      setUploadStatus({ mode: mode, status: "uploading", text: "" });
      const ipfsPromise = pinFileToIPFS(file, context, mode)
        .then((fileIpfsHash) => {
          console.log("uploaded: ", fileIpfsHash);
          const ipfsRemovePromise = removePinFromIPFS(fileIpfsHash).catch(
            (e) => {
              console.error(e);
              throw new Error(`IPFS Removal Failed (${e.message})`);
            }
          );

          ipfsRemovePromise;
        })
        .catch((e) => {
          console.error(e);
          throw new Error(`IPFS Upload Failed (${e.message})`);
        });

      await ipfsPromise;
      console.log("ArUpload_uploadFile", ArUpload_uploadFile);
    }

    // ARWEAVE

    if (settings.arweave) {
      // set initial progress
      const tempProgressObj = {
        total: undefined,
        loaded: undefined,
        percent: 1,
      };
      setProgress({
        mode: mode,
        type: "arweave",
        ProgressEvent: { nope: "nope" },
        progressObj: tempProgressObj,
      });
      setArweaveStatus({ mode: mode, status: "uploading" });

      const arweavePromise = arUploadFile({
        file: file,
        context: context,
        mode: mode,
        setProgress: setProgress,
      })
        .then((fileArweaveHash) => {
          console.log("arweave uploaded: ", fileArweaveHash);
          setArweaveStatus({ mode: mode, status: "uploaded" });
          setArweaveHash({ mode: mode, hash: fileArweaveHash });
        })
        .catch((e) => {
          console.error(e);
          throw new Error(`Arweave Upload Failed (${e.message})`);
        });
      await arweavePromise;
    }

    // ARWEAVE LEGACY
    // TODO: refactor out.
    if (settings.arweaveLegacy) {
      setArweaveStatus({ mode: mode, status: "uploading" });
      const arweavePromise = ArUpload_uploadFile(file, signature)
        .then((x) => {
          console.log("arweave?", x);
          fileArweaveHash = x.ArweaveTx;
          setArweaveStatus({ mode: mode, status: "uploaded" });
          setArweaveHash({ mode: mode, hash: fileArweaveHash });
          return arweaveStatusCheckLoop(fileArweaveHash, context);
        })
        .catch((error) => {
          console.error(error);
          setArweaveStatus({ mode: mode, status: "error", text: error });
          throw error;
        });
      await arweavePromise;
      setArweaveStatus({ mode: mode, status: "uploaded" });
    }
  } catch (e) {
    // catches all errors.
    // setStatusError("file", `Error: ${e.message}`)
    console.error("e", e);
    setUploadStatus({
      mode: mode,
      status: "error",
      text: `Error: ${e.message}`,
    });
    return;
  }

  setUploadStatus({ mode: mode, status: "ready" });
};

/**
 * FILE UPLOAD PROCESS
 * THis is the main upload process
 * Triggers first IPFS, then Arweave.
 */
const startUploadProcess = async (inputElement, context, mode) => {
  console.log("startUploadProcess MODE: ", mode);
  let fileArweaveHash;
  const input = inputElement;
  const {
    setUploadStatus,
    personalSignFiles,
    pinFiletoIPFS,
    pinThumbnailFileToIPFS,
    removePinFromIPFS,
    fileIpfsHash,
    setArweaveHash,
    setArweaveStatus,
  } = context;

  try {
    var signature;
    setUploadStatus({ mode: "file", status: "confirming", text: "" });
    console.log("ArUpload_getSigningData", ArUpload_getSigningData(input));

    signature = await personalSignFiles(await ArUpload_getSigningData(input));
    console.log(`Got Signature: ${signature}`);
    // disable people from selecting another file.
    input.disabled = true;
    console.log(`Starting upload process`);
    setUploadStatus({ mode: "file", status: "uploading", text: "" });

    const ipfsPromise = pinFileToIPFS(input.files[0], context, mode)
      .then((fileIpfsHash) => {
        console.log("uploaded: ", fileIpfsHash);
        const ipfsRemovePromise = removePinFromIPFS(fileIpfsHash).catch((e) => {
          console.error(e);
          throw new Error(`IPFS Removal Failed (${e.message})`);
        });

        ipfsRemovePromise;
      })
      .catch((e) => {
        console.error(e);
        throw new Error(`IPFS Upload Failed (${e.message})`);
      });

    await ipfsPromise;

    setArweaveStatus({ mode: "file", status: "uploading" });
    const arweavePromise = ArUpload_upload(input, signature)
      .then((x) => {
        console.log("arweave?", x);
        fileArweaveHash = x.ArweaveTx;
        setArweaveStatus({ mode: "file", status: "uploaded" });
        setArweaveHash({ mode: "file", hash: fileArweaveHash });
        return arweaveStatusCheckLoop(fileArweaveHash, context);
      })
      .catch((error) => {
        console.error(error);
        setArweaveStatus({ mode: "file", status: "error", text: error });
        throw error;
      });

    await arweavePromise;
    setArweaveStatus({ mode: "file", status: "uploaded" });
  } catch (e) {
    // catches all errors.
    // setStatusError("file", `Error: ${e.message}`)
    console.error("e", e);
    setUploadStatus({
      mode: "file",
      status: "error",
      text: `Error: ${e.message}`,
    });
    input.disabled = false;
    return;
  }
  console.log("fileIpfsHash", fileIpfsHash);
  // const ipfsRemovePromise = removePinFromIPFS(fileIpfsHash)
  //   .then((response) => {
  //     return response
  //   })
  //   .catch((e) => {
  //     console.error(e)
  //     throw new Error(`IPFS Removal Failed (${e.message})`)
  //   })
  // await ipfsRemovePromise

  // Set ready status, and re-enable file input
  console.log("done here");
  setUploadStatus({ mode: "file", status: "ready" });
  input.disabled = false;
};

/**
 * THUMBANIL FILE UPLOAD PROCESS
 * THis is the thumbnail file
 */
const startUploadThumbnailProcess = async (
  thumbnailFile,
  context,
  mode = "thumbnail"
) => {
  console.log("startUploadThumbnailProcess mode: ", mode);
  console.log("startUploadThumbnailProcess context: ", context);
  let fileArweaveHash;
  const theFile = thumbnailFile;
  let hash = undefined;
  const {
    setThumbnailUploadStatus,
    personalSignFiles,
    setIpfsStatus,
    // showCropper
    // fileIpfsHash,
    // thumbnailIpfsStatus,
    // thumbnailIpfsHash,
    setArweaveHash,
    setArweaveStatus,
    // thumbnailArweaveStatus,
  } = context;
  let thumbnailArweaveHash;
  console.log("THUMBNAIL UPLOAD context", context);
  try {
    let signature;
    setThumbnailUploadStatus({ mode: mode, status: "confirming", text: "" });
    signature = await personalSignFiles(
      await ArUploadThumbnail_getSigningData(theFile)
    );
    console.log(`Got *${mode}* Signature: ${signature}`);

    setThumbnailUploadStatus({ mode: mode, status: "uploading", text: "" });

    const ipfsPromise = pinThumbnailFileToIPFS(theFile, context).catch((e) => {
      console.error(e);
      throw new Error(`IPFS Upload Failed (${e.message})`);
    });

    await ipfsPromise;

    // const ipfsRemoveThumbnailPromise = removePinFromIPFS(
    //   thumbnailIPFSHash
    // ).catch((e) => {
    //   console.error(e)
    //   throw new Error(`IPFS Thumbnail Removal Failed (${e.message})`)
    // })

    // await ipfsRemoveThumbnailPromise

    setArweaveStatus({ mode: mode, status: "uploading" });
    const arweavePromise = ArUpload_thumbnailUpload(theFile, signature).then(
      (x) => {
        console.log("x", x);
        thumbnailArweaveHash = x.ArweaveTx;
        setArweaveStatus({ mode: mode, status: "uploaded" });
        setArweaveHash({ mode: mode, hash: thumbnailArweaveHash });
        return thumbnailArweaveHash;
      }
    );

    await arweavePromise;

    setArweaveStatus({ mode: mode, status: "uploaded" });
  } catch (e) {
    // catches all errors.
    // setStatusError("file", `Error: ${e.message}`)
    console.error("e", e);
    setThumbnailUploadStatus({
      mode: mode,
      status: "error",
      text: `Error: ${e.message}`,
    });

    return;
  }

  console.log("done here");
  setThumbnailUploadStatus({ mode: mode, status: "ready" });
};

const personalSignFiles = async (message) => {
  console.log("personalSignFiles web3", web3, message);
  return new Promise((res, rej) => {
    web3.personal.sign(message, web3.eth.accounts[0], (error, result) => {
      if (error) {
        rej(error);
      }
      res(result);
    });
  });
};

/**
 * PIN FILE
 * TODO: abstract keys
 * TODO: ccombine into one function with thumbnail
 */
const pinFileToIPFS = async (file, context, mode = "file") => {
  const { setIpfsStatus, setIpfsHash, setProgress } = context;
  // const thisCopy = context; //this is needed for the setting of state inside of the promise return
  console.log("starting pinFileToIPFS. Does axios exist?... ", axios);
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  setIpfsStatus({ mode: mode, status: "uploading" });
  if (!file) {
    console.error("no file");
    return false;
  }
  let data = new FormData();
  data.append("file", file);
  // data.append('file', input.files[0])

  return axios
    .post(url, data, {
      maxContentLength: "Infinity", //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: "abd0f6e2c70d4402bd20",
        pinata_secret_api_key:
          "c64d6fb2448a4cae28ef8e220cf4c86991ea44ce4eab706ae6f02e7a8b3b0fe6",
      },
      withCredentials: true,
      onUploadProgress: (ProgressEvent) => {
        //we mildly fake the percent loaded until the file upload success message is returned from the API
        console.log("progress!", ProgressEvent);
        const percentLoaded =
          (ProgressEvent.loaded / ProgressEvent.total) * 100;
        const percentRounded =
          Math.round((percentLoaded + Number.EPSILON) * 100) / 100;
        const progressObj = {
          total: ProgressEvent.total,
          loaded: ProgressEvent.loaded,
          percent: percentRounded,
        };
        setProgress({
          mode: mode,
          type: "ipfs",
          ProgressEvent: ProgressEvent,
          progressObj: progressObj,
        });
        // this.setState({
        //     percentLoaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
        // })
      },
    })
    .then(function (response) {
      console.log("IPFS: done: ", response);
      setIpfsStatus({ mode: mode, status: "uploaded" });
      console.log(response.data.IpfsHash);
      setIpfsHash({ mode: mode, hash: response.data.IpfsHash });
      return response.data.IpfsHash;
    })
    .catch(function (error) {
      setIpfsStatus({ mode: mode, status: "error" });
      console.log("IPFS: error: ", error);
      console.error(error);
      throw error;
    });
};

const pinThumbnailFileToIPFS = async (sourceFile, context) => {
  const { setIpfsStatus, setIpfsHash, setProgress } = context;

  const mode = "thumbnail";
  console.log("starting pinThumbnailFileToIPFS");
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  if (!sourceFile) {
    console.error("no file");
    return false;
  }
  let data = new FormData();
  data.append("file", sourceFile);
  setIpfsStatus({ mode: mode, status: "uploading" });

  return axios
    .post(url, data, {
      maxContentLength: "Infinity", //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: "abd0f6e2c70d4402bd20",
        pinata_secret_api_key:
          "c64d6fb2448a4cae28ef8e220cf4c86991ea44ce4eab706ae6f02e7a8b3b0fe6",
      },
      withCredentials: true,
      onUploadProgress: (ProgressEvent) => {
        // console.log("ProgressEvent: ", ProgressEvent);
        setProgress({ mode, type: "ipfs", ProgressEvent, progressObj: {} });
      },
    })
    .then(function (response) {
      console.log("IPFS: done: ", response);
      setIpfsStatus({ mode: mode, status: "uploaded" });
      console.log("IPFS hash: ", response.data.IpfsHash);
      setIpfsHash({ mode: "thumbnail", hash: response.data.IpfsHash });
      return response.data.IpfsHash;
    })
    .catch(function (error) {
      console.log("IPFS: error: ", error);
      setIpfsStatus({ mode: mode, status: "error" });
      console.error(error);
      throw error;
    });
};

const removePinFromIPFS = (hashToUnpin) => {
  console.log("starting removePinFromIPFS", hashToUnpin);
  const url = `https://api.pinata.cloud/pinning/unpin/${hashToUnpin}`;
  return axios
    .delete(url, {
      headers: {
        pinata_api_key: "abd0f6e2c70d4402bd20",
        pinata_secret_api_key:
          "c64d6fb2448a4cae28ef8e220cf4c86991ea44ce4eab706ae6f02e7a8b3b0fe6",
      },
    })
    .then((response) => {
      console.log("IPFS File Removal response: ", response);
      console.log("IPFS File Removed");
      return "success";
    })
    .catch((error) => {
      console.log("IPFS: error: ", error);
      throw error;
    });
};

/**
 * ARWEAVE FILE CHECK LOOP
 */
const arweaveStatusCheckLoop = async (tx, context) => {
  const { setArweaveStatus } = context;
  // check every 20 seconds
  while (true) {
    await new Promise((res) => setTimeout(res, 20000));
    const status = await ArUpload_checkUploadStatus(tx);
    console.log("arweave upload status", status);
    if (status.confirmed) {
      // setStatusUploadedArweave()
      setArweaveStatus({ mode: "file", status: "uploaded" });
      break;
    }
    if (status.failed) {
      setArweaveStatus({ mode: "file", status: "error" });
      throw new Error(`Arweave upload failed`);
    } else {
      // TODO
      // setStatusProgress(pct * 100);
    }
  }
};

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

export {
  openFile,
  openThumbnail,
  processUpload,
  startUploadProcess,
  startUploadThumbnailProcess,
  personalSignFiles,
  pinFileToIPFS,
  pinThumbnailFileToIPFS,
  removePinFromIPFS,
  arweaveStatusCheckLoop,
  dataURLtoFile,
  getMimeType,
};
