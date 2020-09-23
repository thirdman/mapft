import { getTransactionStatus } from './web3Mint'

/**
 * RECURSIVE QUERY
  loops until transaction result exists
 */
const recursiveQuery = (
  num = 60,
  txHash,
  context,
  updateFunction = 'giftFormStore/setGiftStatus'
) => {
  if (!context || !txHash) {
    throw 'missing context or txHash'
  }
  function decide(asyncResult, hash) {
    // console.log('asyncResult: ', asyncResult, hash)
    const isObject = typeof asyncResult === 'object'

    if (isObject) {
      // if an object is returned,
      // then the transaction is completed!
      // We should return the result Data...
      return asyncResult
    }
    if (asyncResult === 0) {
      console.log('ignition')
      console.log(
        'TODO: number has reached 0. Transaction could still be pending but you should put a function to test it.'
      )
    }
    if (asyncResult < 55) {
      context.commit(updateFunction, 'stillWorking')
    }
    if (asyncResult < 50) {
      context.commit(updateFunction, 'stillWorkingMore')
    }
    if (asyncResult < 5) {
      context.commit(updateFunction, 'checkTransaction')
    }

    // if nothing is returned, then we try again....
    return recursiveQuery(num - 1, txHash, context) // not all done, recurse
  }

  // return a promise resolved by doing something async and deciding what to do with it
  // to be clear the returned promise is the one returned by .then
  return getTransactionStatus(num, txHash, context)
    .then((num, hash) => decide(num, hash))
    .catch((error) => console.error(error))
}

export { recursiveQuery }
