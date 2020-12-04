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
    const envKey =
      context && context.$config && context.$config.ARWEAVE_WALLET_KEY;
    if (envKey) {
      console.log(
        "arUploadFile, envKey is it a string: ",
        typeof envKey === "string"
      );
      const isString = typeof envKey === "string";
      // console.log("envKey:", envKey);
      const keyAsObj = (envKey && isString && JSON.parse(envKey)) || envKey;
      // console.log("keyAsObj:", keyAsObj);
    }
    console.groupEnd();
    // const key = this.$config.ARWEAVE_WALLET_KEY;
    const key = {
      kty: "RSA",
      e: "AQAB",
      n:
        "raSTwKhJMdeIcVK1zXTlPjpmvlSpeZ_f37FIBtMLJVDdi1D3mXG1rmlxQGr6dtuj9RsBUFOZCSFpAb0hN3saBOnhBMzHrIoD5d4VhIwW-j3cUBz6r9y8peoGvo6zNkCE8KnUa4UO0TiD28FA88JrJKqVXoF0de6JQUDrBFO-JRv3Sx5g6dGpIXqKpsrrx7p25-lYzxqvNwxgYsJVDYSphIq2KgHaQqPl0sMmvhLUTwQxWZTvjIBGlkGoD5yqrMqA_zaGR2uSKNjXacXymoVmdy1QF6DCFpQL9MBCuFbmaZskOS_guJG-k3A3WzylEFLPmmAzHCuYyj1YkLQwkxwfPG5ku2qJDJRvOo4TSh_UKPbcnPrpgOlWCAFZAHX01FtYomAsS5t0k5cbeyYyKb4QcXfzMRJAZto_n8oLZ5kr-tfIP0ct5VGwaedso_O4H2vh0BPUjM6QxBgsMT9K6hMsG4x19aa-H0CvIy00Sly5zacd7bbEP0XjMH51vnPtuwaAj6J51rCuZ2kVlOCVz5w-WSnH_UalILNej14FmgIQjNj-t0YOQUGq8hrQRo5iNzANOHeLat9E7A-1YIKwptPyeO0dCxLjcQULjh3-730QtI0R-XcBFT_6tEVXsKop1JOzswl-ggVSlh2FB0vwMVAlsAjXkfAgc47dwMqLvWkAl30",
      d:
        "DPPIQ6gp4YpitpVFU2CDUwt3K35UL-rRf7WRGlU2sR9hjylIds0pEKvz0yrHqQMELV3I0M2Tjj9MPmF1r1ZC4Bfz_XAq-r9GwCg7MapjcmIX42_t8R1Fgxi8TQ2G56aTZAI_ApAnxUpyZ3t4VVZsuIzy3FxKrBtRaKknfqiid9EotpU7BGXruEAURJHBWaIaiXz572Tdqf0F2YgGYR5CqMzR_rsppSvlkj2VT7tG0-gLqFN4NOJCoaWfHB8DCiWGzsKp7HzlJ5_ZHZ4y1PzbYktifIi0wYtkguqub2KoCDuWzZ85I3tXnFbUAj25UEjlDG5dkZ3c5UUDLLQMJYUE_VUB396QM2flUzI2ekrZ7a8pccaSswRyX_eUQOCXApsE7Fsu6lq3C_oyYblCuNTQYaUnhmbRNoi17GKqIsBcSQZ1aiR0MnOmgyZgDURdavcsnvm27kjZEI_JE9Od9AfjqDGzPsY0Lab8UDMvNeja2oqs_rF2-OElO80l3TjOnmxSCGEac7xL23brGvesQpyL1szHOBuvGlefSepk5dgY0bGVKL3b6cOV_N5dr8covq3vwcjHhmsNhoiuAFJjQIs-aNiQvrs1hK9yK0AHP2qPy6_qkiHWNme9fa9x3z406CGF_WHZsG5mkv_OykjymCLZeTQ1g-cVzs6anTgTJQOZNRE",
      p:
        "25PXk9pjJIDDgVbJe10N4KZt7lYo0oEEG-W2oQIkHioqLw5XeoPbAdmo17aIuttqtutxdoGNHLgV4-uGf3hXzfAykudav57MQYEZyA76YZ5g_YOf2Duk6Nwaa72FlgBl96kDKxtyKjx2AD7lfpkPkXeTSEeNnMAucUA6WLbUbbtxoc0ZOFbL21y6-nNtjLeE0f1H9P6-7_8Q-9lyNMx1P5hHOv5BuKn2BmDm4JBDT1QWQaQQGevPTG82vLvFd6CaC_qN7Cc_xUxmn_WkGfzZ05M0wDwd0ERTHcUaFWCObpL58ePNN4CILoFOiSEmAbdvJ_ihcXOvU7nOQsMwjfGgNQ",
      q:
        "ynIpwLyKe5jxj-9Mi6GgaROz7ncjqU97WYMUX1yrrnOZ_V0HV0A7QQ6cJpuRiTSH8YpFtFOBHKGw_KQ-SgJTUmcWRKl4EQlTcuc89WXjGq0atH97DDQ2oJO-FDY-qVVI86RPpd9gwMaqKiKpOv0IeLOb8iGOVRtQD0TXJxWHybx3Tw1QlZxnv1Y_opFjTSqKDZXtb6VH4babBOOWYG_oqBjWeUMuZ4cTJ87pSJDXfCd2BfiSv3xgpZsaikDenI0lckRvERgaeIwV3DhMKAWSNdQ66bSJXJqGE8ZKpM2M7HxYbfs0k6O9h3EqYvtlMtpxSGqtU-6FGzM_gE1MRgITKQ",
      dp:
        "z_px1-ajv4CDLbABeWrDaUTanURYuEJhnPbxDAJWKYgwmo-QBkh8GX2Lsn5_ddW8d3P87Y16Fni6qz58D6LyL-rSTFj8mMGVoHni7J5bRDlajuWscojUA4fvMpu5u0G3U2RvztXZRe4sqsDoaQgbOeKzy2OS26UgmD6IxVyvSxyfXe1BdR6pSqbDp9PLMNzm3mt0S7c7LWFAOfxVc3Mxn0HiPht0LrA1iwcfyBZ82te_mP8IDTVRDYnNo-iK-mtRXgU9hjAK9BsQnXRysfbQb9lfvrFyX8FHpMv7j8H8RvnJ6vale2uwEbSCqdqPAFM54vdaG3bC26ADoTL2e4wg_Q",
      dq:
        "FBdQXXhYpft_vbEZ_6GCserqqHfaaishKrj_hJdF0oJWffaFi_sr5kD07j_yKZO1ChuW31aKMbU6Q1hpdh7U9hCU_St0Zvxt87FPM2txJmyXgeJE6-kior0G2Cqp_VQhcUyVOvj4OSl-KcBW2yvRc2kfyN_bqEaVo25Ji-9vEm5JyOahYLes9CgzGIclO7tFCCQg9DuK7rOYntuXSOrSRBxy7IXmTQ_yrriyHimBuSiRZfZNWgOV89l4wM-_R_oaBUUVYLTrq5r7cGeF51LmN8FgN2FbYH1VYREEx2Y-3hlZDVEo3p4ZaR-p_TjFyk4zf-RWX0YEn7ZuTuVc9HWwQQ",
      qi:
        "wH_pDn73WlJduWF1et6nDN_tjr1I2yEUz27D0DnKTX_OTQTn-d9DBwdXkwGrGjMkSk2JL52dEfDmC4pJJ74A5HSSCxlBonQ00DOtJLbj0D0QdRQFdakPi08QK_rgaUsUj8i75oBRaAS2xxSoGSbsWG2PvxIQKOVb8p2HO72ZcxMOm6-s9GqwbaqbQYm8PU9rXOLQLab3Ay0M6hC_jC_qMatFZolvVWnXVqA7IPl78shT0OoFCkC-2XD3DD7749eRab7p0AgH7Ij3dUX6R-XUY6ZMz9-Yo-WBcmx2U7JzI1EL46hrBdLJpgCYNw_5Y3A8uRe0br1N53G-K83jXDpHdw",
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
        context.commit("setTransactionData", data);
      });
  },
};
