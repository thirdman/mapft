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
    logging: true, // Enable network request logging
  }),
  walletBalance: undefined,
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
    console.log("setting progress", newValue);
    state.arweaveProgress = newValue;
  },
  resetArweaveStore(state, payload) {
    console.log("resetArweaveStore");
    state.walletBalance = undefined;
    state.arweaveStatus = "ready";
    state.transactionId = undefined;
    state.transactionStatusObj = undefined;
    state.transactionData = undefined;
    state.arweaveProgress = undefined;
  },
};

export const actions = {
  getBalance(context, payload) {
    console.log("context", context);
    console.log("payload", payload);
    // const { arweave } = context;
    if (!this$.config) {
      console.log("getBalance: this.$config does not exist");
      return;
    }
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
      return ar;
    });
  },
  async arUploadFile(storeContext, payload) {
    const { context, file, mode = "file", setProgress } = payload;
    console.group("arUploadFile");
    console.log("props", payload);
    console.log("arUploadFile context: ", context);
    // console.log("arUploadFile context.$config: ", context.$config);
    // console.log("arUploadFile file: ", file);
    /// console.log("arUploadFile mode: ", mode);
    // console.log("arUploadFile setProgress: ", setProgress);
    // console.log(
    //   "arUploadFile config ARWEAVE_WALLET_ID: ",
    //   context.$config.ARWEAVE_WALLET_ID
    // );
    // console.log(
    //   "arUploadFile config ARWEAVE_WALLET_KEY: ",
    //   context.$config.ARWEAVE_WALLET_KEY
    // );
    // console.log(
    //   "arUploadFile,  is it a string: ",
    //   typeof context.$config.ARWEAVE_WALLET_KEY === "string"
    // );
    console.groupEnd();
    // const key = this.$config.ARWEAVE_WALLET_KEY;
    const key = {
      kty: "RSA",
      n:
        "l5ih0sSx3Xmi-DDpp6ksv5IN2b3BkRz-rhM5ph9l0nc9cIZwQSNhOXCPYSeETr_pz5XI0tPXzWGHSsogYYrcOmlNVDXeEmpUfCc82exXtEdgHXxtFbtJzlAvw0K9Yf9E-Q6JZXWAjQjCwx-K0TJY7QCA8Tnw1z0ker-veG099Q7CL7JNJSkifIrJflxY8RAqdEKIrPzw3jjzTnlkfJGaPoaUV_8Nvs5pk4-nHt9Ohscm-zygZjC6ZXfLxnC9cdbYzA8DpNB-RojByRy_UI88ISxU6qecdFHb5ZVUXkA6WKIHhkcIq0S1gtyt_eTDeKWAn9vZZHt38Y43CVN_nVdEfKZMETv-zzB50MWPvSm6uJoicR-SYvxKm2YxDv99scOJP2CWcwqOx2wY1csasSpaYAetdWSDS-kP8fWwQrKsGvU5A92aEPHpdX3PQFN1JedpvEmQ0ITlaTtxTYT9JpB0Q0t8Dtw49cbzzQyEBolz0X8X0XLGM9gHU5XfWp6V9XfoueKjSKGnLqW-HXAYdcN7p8tD5f7OL1SoGZzclTz8cJBkC8XlFgJWKCiwKWkgUne84pQqO2lxmaVwRynNt9pFvbKXSWw6RQizAbQ8IYsbT6KFydOOc6xssGRdR8Qy3rK7S1lj_R5p5w7rIUBSWl9Sg8uZnFeBPi4D28T_0cQM0Ok",
      e: "AQAB",
      d:
        "HaP8UAehd1pnIPv_U4bidvqJtr9Bb6wpp8Oei_qroAEshCnlHPdb9S0q-6YMWpFvl-UDhSViloexOlBXEHtkIA-izQpTR2p-5l-NqFZrt5YVFu7TLWKXRb2r-RO9j8GnrMLI3oug_PJvklNCgzDC7mQg0gmwK4WK8m00U-mYKagfE9BbAR8P3SYNy6UmxsuQYXb43kn-lpSwDfHyUeDuNbd-nc4C1AHr5qw50vF6myOpXYo3GoQAjgJkV4KHqBCIBy4QWlNhvUzUBwyV45x990aBu_fVwXCX_EW8X0lTnyzfJ8QPz9z5WILpijEGfzps8dS8psb1ZseVvz8SPqNngmK-QmdifKjSTtNK-psgq8TfA_8ryLUYlw9ESUGEH8ljmF4Y_fyPfcTe37LE454Caz1rMRYDFCrYv1yYNLnN95KGoXp7o4b_chkNFfh34Jw1HFLtyZK5mCykvDmJKZCf9zPUq7DEfVtMKjXosaYOvd_gRtNnlK3UKaELWvapD-mOHsSVPZLXIw5k1RDLuANIcHi50h02amp9-WCEClrJmHOPhxi1ylBWXBQ-RNbTodYyksdCmJwX6NzpF1wlyZfccnAA2N980mpVg7Oyxdu95J4mqk19xByGTH82FVxP8NwfImtIVWJ6kMAb5cs3CTr6iL8xuHKcXWgJqaoFuGGCTTk",
      p:
        "x7fN8CaTdjSJrtY-kUENX4fpPNAXCVYjTK40cKhPo17HxpimHfCnna96VjiWnQ-6Xtt01WWMuy_1JUzeoChcEmnaCifOhtQXHE4DKhgnzqQEESNGTM9Bo08q5JFxst_MQSqiuqsZ0qbi3KOe-0D2zm72ybuwxBCzlGnPZOdCOq97lKTymue48kMufmjFo_vswYzdBHl6tRAOs8GO8Ga-yS_e-YRzojk3LJXwjtTlayr7V_5FvgvxyMyHCj6F45nplyTl1mYLRdWVLUqSOAeg8xd6rSwN2Mv12UQxrmzPsZisN2rZwEycOUT3jQKTP0cTgkMe56TC52y_jRGNS2MbWw",
      q:
        "wlExe51WO4KJqferJQ5UDa1VN6uk1Y-oApbchQ5-qgcH482xAPdCmdsubtaMcwoh93xTZ4QmtRvWglKAwr9-JZyy0FjtTHUfPXDL5PYLKSj130h9iu69YrvKMqxLObBHLT4Nmw7Bd6-yU56QvEKtpaDtxAscFRr0xNNmqj0iBpAP3IR3WSndjpAUwAt9zE0H7jgd-Wa7t64FbUCvng5_XsIqos4iUB34zd205SdAlMXTsyJVMPXrNjj7Wo1ITl_dm5nZK4Lqn-eSdhzNKqVlUxsw5l99J8SCVaoyNNVrGjpYSCgIlKfgTC-7_4gbeP36lKVpLCi3wvPvRiCk8PUsCw",
      dp:
        "blZmySmWyHRoKJamxHsLF18wBW_1eiwDnoaT5DWoodpoRpjpFZtyDxT2YpIq66TX0zYtSwQqhvQM3MmmKReDHo0qb_fkCus7xWB4MRZdT7WfpZQ2b5MFcWL4kISmKyunXc1fT__daVrX9QvUdn1CnXQClhtCol-TxwfaE6YMGf3_KXUjr18b94QUOLRLlLhG6fuX07QFjejMJpVmEfzBpMb0yidZ9yLjD5fa6h5GjTmW2Ntazo8sykHszUUTlVXgDqfM7vE7gx5npzkOpTPZwNOU6_1tvPuZ3KnnRLVK3ZQ6ePdoS-xHVwB6P4ZPsWLkLVBFz7ZgE5kqDpbG2AJuBw",
      dq:
        "WY-OnQjxe9A4nww154hpGTywsE3-VSg3KapazUDXBIrlCgv97xIHsl4hUpi0dzlOWoEE-AsixAqmnb5k9l3ISJGmoPy7sqew1GKut0Ln9fqZCGai5mwPAfjHwv9CVL54r9OP9c2hQgbKzFujHgIlgtdffyIXuWqJMka1ZPV0P04a4Wp0j7YKFfE2fyVMv-MpKpTWy-Kb1pbwjWBpERJhhk071XnousB1snzjKVMkIu3jGwdR-JT_6iftQdkoYGcy_sq0G6fld_oFuUahEWzV_K3lpeiRCMk7wTwGk-9hw97sXaWF_u45JSRDJA2Zi_STj_uFNAM4XzSLLelR3HVD7Q",
      qi:
        "IWt4WNagn9qPjnuKFtUodwPLXaNcNxSeBCictJ3xmU7sWwCZVQTcwgRnAUfzOFhvMQEHGV45aFp01EVCPzYD4-5NpbVyr9t-9WRW_Mx8EgSxvJG01D2F9wEtnB8etb-m8QKdgXSI0GIG9x-w9BMem34bb6jxYQJGUkORrEGGEPukFLS0LZvE7jK8Ji1ibW6v37zHjwPd2JLmDOTPvrmpVcNj-9UIiP0BMlVNFq4_CVoO_2sPzzktJSg9RTvKQm0Lrav0SlQDRfjmbDVhVRcr0tZvtWIq6rDJP2OpeVC0_4xoTzCPUNCXPhjXqDP4VG25IwYrUtKG7O_HH9wNPeq4xQ",
    };

    // const sourceString = this.imageFileString;
    // console.log('fileData:', this.fileData)
    if (!file) {
      return;
    }
    const fileData = await file.arrayBuffer();
    const fileType = file.type;
    // console.log("fileData", fileData);
    // console.log("fileType", fileType);
    storeContext.commit("arweaveStatus", "working");
    let transaction = await arweave.createTransaction({ data: fileData }, key);
    transaction.addTag("Content-Type", fileType);
    console.log("transaction", transaction);
    console.log("transaction.id:", transaction.id);

    await arweave.transactions.sign(transaction, key);
    let uploader = await arweave.transactions.getUploader(transaction);
    storeContext.commit("setArweaveProgress", 1); // fake the initial amount so it appears;

    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      storeContext.commit("arweaveStatus", `${uploader.pctComplete}% complete`);
      console.log("uploader: ", uploader);
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
      const percentLoaded = uploader.pctComplete;
      const progressObj = {
        total: undefined,
        loaded: undefined,
        percent: uploader.pctComplete,
      };
      console.log("test progresObj: ", progressObj);
      setProgress({
        mode: mode,
        type: "arweave",
        ProgressEvent: ProgressEvent,
        progressObj: progressObj,
      });
      storeContext.commit("setArweaveProgress", percentLoaded); // fake the initial amount so it appears;
    }
    storeContext.commit("arweaveStatus", "done");
    if (transaction.id) {
      storeContext.commit("setTransactionId", transaction.id);
    }
    return transaction.id;
  },
  async lastTransaction(context, payload) {
    const arweaveWalletId = this.$config && this.$config.ARWEAVE_WALLET_ID;
    if (!this.$config) {
      console.log("arweaveWalletId: this.$config does not exist");
      return;
    }
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
