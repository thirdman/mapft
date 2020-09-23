'use strict'
// Must have axios available as global
//const ArUpload_URL = 'http://localhost:3535'
const ArUpload_URL = 'https://arweave.rocks'

const url = `${ArUpload_URL}/up`
const checkUrl = `${ArUpload_URL}/check`

/**
 * Will check upload status of a file or folder
 *
 * Returns an object { confirmed, failed, pct }
 *
 * confirmed true/false
 * failed true/false
 * pct: 0.0 - 1.0 indicate percent until its fully confirmed.
 *
 * @param {*} id Tx Id
 */
async function ArUpload_checkUploadStatus(id) {
  const resp = await axios.post(checkUrl, {
    ArweaveTx: id,
  })
  return resp.data
}

/**
 * Uploads a file or files.
 *
 * Passing the <input type="file"> element and it will do the rest.
 *
 * Optionally pass eth_signature, which would be result of a personal sign
 * operation on a hash of the file(s) data. ( see getSignatureData below )
 *
 * Returns an object { ArweaveTx }
 *
 * ArweaveTx is string id of the file, or folder.
 *
 * @param {*} fileInput
 * @param {*} pubkey
 * @param {*} signature
 */
async function ArUpload_upload(fileInput, eth_signature = '') {
  var data = new FormData()
  console.log(fileInput.files)
  if (fileInput.files.length < 1) {
    throw new Error('No files')
  }

  if (fileInput.files.length === 1) {
    data.append('file', fileInput.files[0], fileInput.files[0].name)
  }

  if (fileInput.files.length > 1) {
    for (var i = 0; i < fileInput.files.length; i++) {
      var path = fileInput.files[i].webkitRelativePath
      // trim any leading basepath. hope no-one has \/ in it :)
      path =
        path.indexOf('/') !== -1 ? path.substr(path.indexOf('/') + 1) : path

      data.append('file', fileInput.files[i], path)
    }
  }

  data.append('eth_signature', eth_signature)

  const axOpts = {
    maxContentLength: 'Infinity',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  }
  // setStatusUploadingArweave("file");
  // Post with axios.
  return axios.post(url, data, axOpts).then(function (response) {
    console.log('ArweaveTx: ', response.data.ArweaveTx)
    // setStatusUploadedArweave("file");
    return response.data
  })
}

/**
 * Gets the message to be signed using ( personalSign ) by hashing the contents of the file(s)
 *
 * @param {*} fileInput
 */
async function ArUpload_getSigningData(fileInput) {
  var digest

  if (fileInput.files.length < 1) {
    throw new Error('No files')
  } else if (fileInput.files.length == 1) {
    const ab = await fileInput.files[0].arrayBuffer()
    digest = await ArUpload_deepHash(ab)
    return `ETH-Personal-Sign-File:${ArUpload_buf2hex(digest)}`
  } else {
    const fileBufs = await Promise.all(
      Array.from(fileInput.files).map((x) => x.arrayBuffer())
    )
    digest = await ArUpload_deepHash(fileBufs)
    return `ETH-Personal-Sign-Folder:${ArUpload_buf2hex(digest)}`
  }
}

/**
 * Gets the message to be signed using ( personalSign ) by hashing the contents of the file(s)
 *
 * @param {*} file
 */
async function ArUploadThumbnail_getSigningData(file) {
  var digest

  if (!file) {
    throw new Error('No file')
  } else if (file) {
    const ab = await file.arrayBuffer()
    digest = await ArUpload_deepHash(ab)
    return `ETH-Personal-Sign-File:${ArUpload_buf2hex(digest)}`
  }
}

function ArUpload_buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2))
    .join('')
}

// Below is ar_deephash algorithim.

function ArUpload_stringToBuffer(str) {
  return new TextEncoder().encode(str)
}

function ArUpload_concatBuffers(buffers) {
  let total_length = 0

  for (let i = 0; i < buffers.length; i++) {
    total_length += buffers[i].byteLength
  }

  let temp = new Uint8Array(total_length)
  let offset = 0

  temp.set(new Uint8Array(buffers[0]), offset)
  offset += buffers[0].byteLength

  for (let i = 1; i < buffers.length; i++) {
    temp.set(new Uint8Array(buffers[i]), offset)
    offset += buffers[i].byteLength
  }

  return temp
}

async function ArUpload_deepHash(data) {
  if (Array.isArray(data)) {
    const tag = ArUpload_concatBuffers([
      ArUpload_stringToBuffer('list'),
      ArUpload_stringToBuffer(data.length.toString()),
    ])
    console.log(`Digest list: ${tag}`)
    return await ArUpload_deepHashChunks(
      data,
      await crypto.subtle.digest('SHA-384', tag)
    )
  }

  const tag = ArUpload_concatBuffers([
    ArUpload_stringToBuffer('blob'),
    ArUpload_stringToBuffer(data.byteLength.toString()),
  ])

  console.log(`Digesting blob: ${tag}`)

  const taggedHash = ArUpload_concatBuffers([
    await crypto.subtle.digest('SHA-384', tag),
    await crypto.subtle.digest('SHA-384', data),
  ])

  return await crypto.subtle.digest('SHA-384', taggedHash)
}

async function ArUpload_deepHashChunks(chunks, acc) {
  if (chunks.length < 1) {
    return acc
  }

  const hashPair = ArUpload_concatBuffers([
    acc,
    await ArUpload_deepHash(chunks[0]),
  ])
  const newAcc = await crypto.subtle.digest('SHA-384', hashPair)
  return await ArUpload_deepHashChunks(chunks.slice(1), newAcc)
}

/**
 * HANDLE DISPLAY OF STATUS ON PAGE
 */
// function setStatusUploadedArweave(mode = "file") {
//   if(mode === "file"){
//     const el = document.getElementById('file-status-subtitle-arweave')
//     el.innerText = "Arweave upload: complete";
//     document.getElementById("uploadStatus").classList.remove("arweaveActive")
//   } else {
//     const el = document.getElementById('thumbnail-status-subtitle-arweave')
//     el.innerText = "Arweave upload: complete";
//     document.getElementById("thumbnailStatus").classList.remove("arweaveActive")
//   }
//   testAllUploadDone(mode)
// }
// this duplicates the one in the other file
// TODO: unify
// function testAllUploadDone(mode="file") {
//   let targetEl;
//   if(mode === "file"){
//      targetEl = document.getElementById("uploadStatus")
//   } else {
//      targetEl = document.getElementById("thumbnailStatus")
//   }
//   if(targetEl.classList.contains("ipfsActive")){
//     return null
//   }
//   if(targetEl.classList.contains("arweaveActive")){
//     return null
//   }
//   if(!targetEl.classList.contains("ipfsActive") && !targetEl.classList.contains("ipfsActive")){
//     setUploadStatus(mode, "ready", "")
//     return null;
//   }
// }

/**
 * THUMBANIL UPLOAD
 * Uploads a file or files.
 *
 * Passing the <input type="file"> element and it will do the rest.
 *
 * Optionally pass eth_signature, which would be result of a personal sign
 * operation on a hash of the file(s) data. ( see getSignatureData below )
 *
 * Returns an object { ArweaveTx }
 *
 * ArweaveTx is string id of the file, or folder.
 *
 * @param {*} fileInput
 * @param {*} pubkey
 * @param {*} signature
 */
async function ArUpload_thumbnailUpload(thumbnailFile, eth_signature = '') {
  console.log('starting ArUpload_thumbnailUpload')
  var data = new FormData()

  if (!thumbnailFile) {
    throw new Error('No thumbnailFile')
  }

  data.append('file', thumbnailFile, 'thumbnail.png')
  data.append('eth_signature', eth_signature)

  const axOpts = {
    maxContentLength: 'Infinity',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  }
  // setStatusUploadingArweave('thumbnail')
  // Post with axios.
  return axios.post(url, data, axOpts).then(function (response) {
    console.log('ArUpload_thumbnailUpload post complete: ', response)
    console.log('ArUpload_thumbnailUpload tx: ', response.data.ArweaveTx)
    // setStatusUploadedArweave('thumbnail')
    return response.data
  })
}
