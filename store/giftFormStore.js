import { getField, updateField } from 'vuex-map-fields'
import { getTransactionStatus } from './../utils/web3Mint'
import { recursiveQuery } from './../utils/transactions'
// import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'

export const state = () => ({
  giftStatus: 'ready',
  giftStatusMessage: '',
  giftData: {},
  giftTokenId: '',
  giftContractId: '',
  giftWalletAddress: '',
  // giftTokenAddress: '',
})
export const getters = {
  giftStatus: (state) => state.giftStatus,
  giftStatusMessage: (state) => state.giftStatusMessage,
  getField,
}

export const mutations = {
  updateField,
  setGiftContractId(state, newValue) {
    state.giftContractId = newValue
  },
  setGiftTokenId(state, newValue) {
    state.giftTokenId = newValue
  },
  setGiftTokenId(state, newValue) {
    state.giftTokenId = newValue
  },
  setGiftWalletAddress(state, newValue) {
    state.giftWalletAddress = newValue
  },
  setGiftStatus(state, newValue) {
    state.giftStatus = newValue
  },
  setGiftStatusMessage(state, newValue) {
    state.giftStatusMessage = newValue
  },
  setGiftData(state, data) {
    state.giftData = data
  },

  handleGift(state, fromWalletAddress) {
    console.log('fromWalletAddress')
    const { giftContractId, giftTokenId, giftWalletAddress } = state
    if (!fromWalletAddress) {
      this.commit('giftFormStore/setGiftStatus', 'error')
      this.commit(
        'giftFormStore/setGiftStatusMessage',
        'Missing fromWalletAddress'
      )
      return null
    }

    const provider = window.ethereum

    this.commit('giftFormStore/setGiftStatus', 'confirming')
    const seaport = new OpenSeaPort(provider, {
      networkName: Network.Rinkeby,
    })
    // const asset = {
    //   tokenId: giftTokenId,
    //   tokenAddress: giftContractId,
    // }

    const transactionHash = seaport.transfer({
      asset: {
        tokenId: giftTokenId.toString(),
        tokenAddress: giftContractId.toString(),
      },
      fromAddress: fromWalletAddress, // Must own the asset
      toAddress: giftWalletAddress,
    })
    this.commit('giftFormStore/setGiftStatus', 'confirming')
    transactionHash
      .then((resultId) => {
        console.log('transactionHash result', resultId)
        this.commit('giftFormStore/setGiftStatus', 'working')
        this.dispatch('giftFormStore/handleCheckStatus', resultId)
      })
      .catch((error) => {
        console.error(error)
        this.commit('giftFormStore/setGiftStatus', 'error')
        this.commit('giftFormStore/setGiftStatusMessage', error)
      })
  },
}

export const actions = {
  async handleCheckStatus(
    dispatch,
    transactionId,
    updateFunction = 'giftFormStore/setGiftStatus'
  ) {
    // console.log('handleCheckStatus', transactionId)
    // console.log('getTransactionStatus', getTransactionStatus)
    // console.log('updateFunction', updateFunction)
    // console.log('this', this)
    const num = 60 // number of recursions before bailing
    const context = this

    recursiveQuery(num, transactionId, context).then((completedTransaction) => {
      console.log('done, completedTransaction = ', completedTransaction)
      if (completedTransaction.status === true) {
        const giftData = {
          targetAddress: 'sddf',
        }
        context.commit(updateFunction, 'completed')
        context.commit('giftFormStore/setGiftData', giftData)
        context.commit('giftFormStore/setGiftStatusMessage', '')
      } else {
        context.commit(updateFunction, 'error')
        context.commit(
          'giftFormStore/setGiftStatusMessage',
          'Something went wrong. Transaction was returned but completedTransaction.status was not true'
        )
        console.error(
          'something went wrong. Transaction was returned but completedTransaction.status was not true'
        )
      }
    })
  },
}
