import { getField, updateField } from "vuex-map-fields";
import Arweave from "arweave";
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  // logging: false,     // Enable network request logging
});

export const state = () => ({
  arweave: Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https", // Network protocol http or https
    timeout: 20000, // Network request timeouts in milliseconds
    // logging: false,     // Enable network request logging
  }),
  walletBalance: "1234",
  arweaveStatus: "init",
  transactionId: "",
  transactionStatusObj: undefined,
  transactionData: undefined,
  arweaveProgress: undefined,
});
export const getters = {
  walletBalance: (state) => state.walletBalance,
  arweaveStatus: (state) => state.arweaveStatus,
  transactionId: (state) => state.transactionId,
  transactionStatusObj: (state) => state.transactionStatusObj,
  transactionData: (state) => state.transactionData,
  arweaveProgress: (state) => state.arweaveProgress,
};

export const mutations = {
  setBalance(state, newValue) {
    state.walletBalance = newValue;
  },
  arweaveStatus(state, newValue) {
    state.arweaveStatus = newValue;
  },
  setTransactionId(state, newValue) {
    state.transactionId = newValue;
  },
  setTransactionStatusObj(state, newValue) {
    state.transactionStatusObj = newValue;
  },
  setTransactionData(state, newValue) {
    state.transactionData = newValue;
  },
  setArweaveProgress(state, newValue) {
    state.arweaveProgress = newValue;
  },
};

export const actions = {
  getBalance(context, payload) {
    console.log("context", context);
    console.log("payload", payload);
    // const { arweave } = context;
    const key = this.$config.ARWEAVE_WALLET_KEY;
    const arweaveWalletId = this.$config.ARWEAVE_WALLET_ID;
    console.log("arweave", arweave);

    console.log("arweaveWalletId: ", arweaveWalletId);
    console.log("key", key);
    // const { key, arweaveWalletId, arweave } = context;
    arweave.wallets.getBalance(arweaveWalletId).then((balance) => {
      let winston = balance;
      let ar = arweave.ar.winstonToAr(balance);
      console.log(winston);
      console.log(ar);
      // state.walletBalance = ar;
      context.commit("setBalance", ar);
    });
  },
  async arUploadFile(context, file) {
    console.log("file: ", file);
    const key = this.$config.ARWEAVE_WALLET_KEY;
    // const sourceString = this.imageFileString;
    // console.log('fileData:', this.fileData)
    if (!file) {
      return;
    }
    const fileData = await file.arrayBuffer();
    const fileType = file.type;
    // console.log("fileData", fileData);
    // console.log("fileType", fileType);
    context.commit("arweaveStatus", "working");
    let transaction = await arweave.createTransaction({ data: fileData }, key);
    transaction.addTag("Content-Type", fileType);
    console.log("transaction", transaction);
    console.log("transaction.id:", transaction.id);

    await arweave.transactions.sign(transaction, key);
    let uploader = await arweave.transactions.getUploader(transaction);
    context.commit("setArweaveProgress", 1); // fake the initial amount so it appears;

    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      context.commit("arweaveStatus", `${uploader.pctComplete}% complete`);
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
      const percentLoaded = uploader.pctComplete;
      context.commit("setArweaveProgress", percentLoaded); // fake the initial amount so it appears;
    }
    context.commit("arweaveStatus", "done");
    if (transaction.id) {
      context.commit("setTransactionId", transaction.id);
    }
  },
  async lastTransaction(context, payload) {
    const arweaveWalletId = this.$config.ARWEAVE_WALLET_ID;
    arweave.wallets
      .getLastTransactionID(arweaveWalletId)
      .then((transactionId) => {
        console.log("transactionId", transactionId);
        this.transactionId = transactionId;
        context.commit("setTransactionId", transactionId);
        //3pXpj43Tk8QzDAoERjHE3ED7oEKLKephjnVakvkiHF8
      });
  },
  async getTransactionStatus(context, id) {
    arweave.transactions.getStatus(id).then((status) => {
      console.log(status);
      // 200
      // this.transactionStatus = status
      context.commit("setTransactionStatusObj", status);
    });
  },
  async getTransactionData(context, id) {
    console.log("getTransactionData", id);
    context.commit("arweaveStatus", "getting");
    arweave.transactions
      .getData(id, { decode: true, string: false })
      .then((data) => {
        console.log("txData:", data);
        context.commit("arweaveStatus", "retrieved");
        var base64String = Buffer.from(data, "hex").toString("base64");
        console.log(base64String);
        // Uint8Array [10, 60, 33, 68, ...]
        //   var base64String2 = Buffer.from(data).toString('base64')
        //   const arrayBuffer = data;
        //   var base64String3 = btoa(
        //     new Uint8Array(arrayBuffer)
        //       .reduce((data, byte) => data + String.fromCharCode(byte), '')
        //   );
        //   console.log('base64String:', base64String);
        //   console.log('base64String2:', base64String2);
        //   console.log('btoa:', base64String3);
        //   var blob = new Blob(data)

        //   var reader = new FileReader();
        //   reader.readAsDataURL(blob)
        //   reader.onloadend = () => {
        //     var base64 =  reader.result
        //     console.log('base64', base64);
        //     this.txImageData = base64;
        //   };

        //   reader.readAsDataURL(blob)
        //     .then(result => {
        //       console.log('result', result)
        //     })
        //     .catch(error => {console.error(error)});

        //   // this.txImageData = base64String;
        // this.txImageData = data;
        context.commit("setTransactionData", data);
      });
  },
};
