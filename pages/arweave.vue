<template>
  <div class="pageContainer">
    <Header />
      <section  >
        <div class="tertiary">
          <h2>Arweave Testing</h2>
          <div class="aside">
            <p>Refactoring, yo!</p>
          </div>
        </div>
      <div class="primary">
        <div style="padding-bottom: 1rem; border-bottom: 1px solid var(--line-color, #111)">
          <p>Status: <strong>{{status}} | {{arweaveStatus}}</strong></p>
          <ProgressBar
          :percentage="arweaveProgress"
          v-if="arweaveProgress"
          :showNumber="true"
          color="fill"
          />
          </div>
        <div class="">
          <p>Balance: {{balance}} | {{walletBalance}}</p>
          <p>Transaction Id: {{transactionId}} | <a :href="`https://arweave.net/${transactionId}`" v-if="transactionId" target="_blank">link</a></p>
          <p>transaction Status: {{transactionStatus}}</p>
          <p>transaction transactionStatusObj: {{transactionStatusObj}}</p>
        <div>
          <label class="file">
          <input
            type="file"
            id="file"
            aria-label="File upload input"
            @change="handleOpenFile"
          />
          <span class="file-custom">
            <span id="fileLabelText">{{ "Select..." }}</span>
          </span>
        </label>
        </div>
          <p>file data: {{fileData ? "yes" : "no"}}</p>
        </div>
        <div class="row actions">
          <Button @click="getBalance(this)">get balance</Button>
          <!-- <Button @click="newTransaction">New Transaction</Button> -->
          <!-- <Button @click="handleOpenFakeFile" >FakeFile</Button> -->
          <!-- <Button @click="uploadFile" :disabled="!imageFile">Upload file</Button> -->
          <Button @click="arUploadFile(file)" :disabled="!file">Upload file VUEX</Button>
          <Button @click="lastTransaction">Get last Transaction Id</Button>
          <Button @click="getTransactionStatus(transactionId)" :disabled="!transactionId">Get Transaction status</Button>
          <Button @click="getTransactionData(transactionId)" :disabled="!transactionId">Get Transaction Data</Button>
          <Button @click="resetArweaveStore" :disabled="!transactionId">resetArweaveStore</Button>
        </div>
        <div class="row">
          <div v-if="imageFileString">
            <h4>Local File:</h4>
            <img :src="imageFileString" width="300" />
          </div>
          <div v-if="txImageData">
            <h4>Transaction File Result:</h4>
            <img :src="txImageData" width="300" />
          </div>
          <div v-if="transactionId">
            <h4>Arweave.net:</h4>
            <img :src="`https://arweave.net/${transactionId}`" width="300" />
          </div>
        </div>
      </div>
      <!-- <div class="secondary">
      </div> -->
    </section>
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import Arweave from 'arweave';
import {fakeFileString } from "../utils/arweave.js"
import {
  dataURLtoFile,
} from "../utils/files.js";

// const arweave = Arweave.init({
//     host: 'arweave.net',
//     port: 443,  
//     protocol: 'https',  // Network protocol http or https
//     timeout: 20000,     // Network request timeouts in milliseconds
//     // logging: false,     // Enable network request logging
// });

export default {
  name: "ArweavePage",
  head: {
    title: 'InfinNFT: Arweave',
    meta: [
      { hid: 'description', name: 'description', content: 'Arweave.' },
    ],
  },
  mounted() {
    console.log('Arweave: ', Arweave)
    this.initArweave();
  },
  data() {
    return {
      balance: "",
      status: 'init',
      // transactionId: "",
      transactionStatus: "",
      file: undefined,
      fileData: '',
      imageFile: undefined,
      imageFileString: undefined,
      txImageData: undefined,
      arweaveProgressLocal: undefined
    }
  },

  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      // ARWEAVE
      walletBalance: "arweaveStore/walletBalance",
      arweaveStatus: "arweaveStore/arweaveStatus",
      transactionId: "arweaveStore/transactionId",
      transactionStatusObj: "arweaveStore/transactionStatusObj",
      arweaveProgress: "arweaveStore/arweaveProgress",
      transactionData: "arweaveStore/transactionData",
    }),
  },
  methods: {
    ...mapMutations({
      setBalance: "arweaveStore/setBalance",
      resetArweaveStore: "arweaveStore/resetArweaveStore",
    }),
    ...mapActions({
      getBalance: "arweaveStore/getBalance",
      arUploadFile: "arweaveStore/arUploadFile",
      lastTransaction: "arweaveStore/lastTransaction",
      getTransactionStatus: "arweaveStore/getTransactionStatus",
      getTransactionData: "arweaveStore/getTransactionData",
    }),
    async initArweave(){
      this.status = "ready"
    },
    async newTransaction() {
      const key = this.$config.ARWEAVE_WALLET_KEY
      const arweaveWalletId = this.$config.ARWEAVE_WALLET_ID;
      
      this.status = "working"
      // console.log('data2:', data2)
      // console.log('key:', key)
      let transaction = await arweave.createTransaction({ data: fakeFileString }, key);
      // transaction.addTag('Content-Type', 'application/pdf');
      console.log('transaction', transaction)
      await arweave.transactions.sign(transaction, key);
      let uploader = await arweave.transactions.getUploader(transaction);
      this.Local = 1; // fake the initial amount so it appears;
      while (!uploader.isComplete) {
        await uploader.uploadChunk();
        this.status = `${uploader.pctComplete}% complete`;
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        const percentLoaded = uploader.pctComplete;
        this.arweaveProgressLocal = percentLoaded
      }
      this.status = "done"
    },
    async uploadFile() {
      const key = this.$config.ARWEAVE_WALLET_KEY
      const arweaveWalletId = this.$config.ARWEAVE_WALLET_ID;
      // console.log('imageFile:', this.imageFile)
      console.log('Upload imageFileString:', this.imageFileString)
      const sourceString = this.imageFileString
      // console.log('fileData:', this.fileData)
      if(!sourceString){
        return
        }
      this.status = "working"
      // console.log('key:', key)
      let transaction = await arweave.createTransaction({ data: sourceString }, key);
      // transaction.addTag('Content-Type', 'application/pdf');
      console.log('transaction', transaction)
      
      await arweave.transactions.sign(transaction, key);
      let uploader = await arweave.transactions.getUploader(transaction);
      this.arweaveProgressLocal = 1; // fake the initial amount so it appears;
      while (!uploader.isComplete) {
        await uploader.uploadChunk();
        this.status = `${uploader.pctComplete}% complete`;
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        const percentLoaded = uploader.pctComplete;
        this.arweaveProgressLocal = percentLoaded
      }
      this.status = "done"
    },
    // async lastTransactionLocal() {
    //   const key = this.$config.ARWEAVE_WALLET_KEY
    //   const arweaveWalletId = this.$config.ARWEAVE_WALLET_ID;
    //   console.log('arweaveWalletId', arweaveWalletId)
    //   arweave.wallets.getLastTransactionID(arweaveWalletId).then((transactionId) => {
    //       console.log('transactionId', transactionId);
    //       this.transactionId = transactionId
    //       //3pXpj43Tk8QzDAoERjHE3ED7oEKLKephjnVakvkiHF8
    //   });
    // },
   
    async getTransactionDataLocal(id) {
      arweave.transactions.getData(id, {decode: true, string: true}).then(data => {
        console.log('txData:', data);
        // Uint8Array [10, 60, 33, 68, ...]
      //   var base64String2 = Buffer.from(data).toString('base64')
      //   var base64String = Buffer.from(data, 'hex').toString('base64')
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
      this.txImageData = data;
      });

  
    },
    
    handleOpenFile(event, blah) {
      const key = this.$config.ARWEAVE_WALLET_KEY
      const arweaveWalletId = this.$config.ARWEAVE_WALLET_ID;
      console.log(event, blah);
      var data = new FormData();
      console.log('files: ', event.target.files)
      const files = event.target.files;
      const file = files[0]
      if (files.length === 1) {
        data.append("file", files[0], files.name);
      }
      console.log('file:', file)
      console.log('data:', data)
      // const newImage = fakeFileString;
      this.file = file
      var reader = new FileReader();
      reader.readAsDataURL(file);
      console.log('handleSetFile', this.handleSetFile)
      reader.onload = () => {
        console.log('this: ', this);
        console.log('readerresult: ', reader.result);
        this.handleSetFile(reader.result)
      };
      // const imageAsFile = dataURLtoFile(fakeFileString, files.name);
      // console.log('imageAsFile', imageAsFile);
      
    },
    handleOpenFakeFile(event, blah) {
      const key = this.$config.ARWEAVE_WALLET_KEY
      const arweaveWalletId = this.$config.ARWEAVE_WALLET_ID;
      const newImage = fakeFileString;
      // var reader = new FileReader();
      // reader.readAsDataURL(file);
      // console.log('handleSetFile', this.handleSetFile)
      // reader.onload = () => {
      //   console.log('this: ', this);
      //   console.log('readerresult: ', reader.result);
      //   this.handleSetFile(reader.result)
      // };
      const imageAsFile = dataURLtoFile(fakeFileString, "sadfsdf");
      console.log('imageAsFile', imageAsFile);
      const buffer = Buffer.from(fakeFileString, 'base64');
      const bufString = buffer.toString('hex');
      console.log('buffer', buffer)
      // console.log('bufString', bufString)
      this.imageFileString = fakeFileString
      this.imageFile = bufString
    },
    handleSetFile(fileString){
      // console.log('fileString', fileString)
      const buffer = Buffer.from(fileString, 'base64');
      const bufString = buffer.toString('hex');
      console.log('bufString', bufString)
      // this.fileData = data
      this.imageFileString = fileString
      this.imageFile = bufString
    },
    buf2hex(buffer) {
      // buffer is an ArrayBuffer
      return Array.prototype.map
        .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
        .join("");
    }

  }
}
</script>

<style></style>
