import * as fcl from "@onflow/fcl"

/**
 * SEND TRANSACTION
 */
const sendTransaction =  async (store, transaction) => {
  // console.log('store, transaction', store, transaction)
  const response = await fcl.send([
      fcl.transaction`${transaction}`,
      fcl.proposer(fcl.currentUser().authorization),
      fcl.authorizations([fcl.currentUser().authorization]),
      fcl.payer(fcl.currentUser().authorization),
      fcl.limit(100),
  ]);

  return new Promise(resolve => {
    
      fcl.tx(response).subscribe((transaction) => {
          if (fcl.tx.isSealed(transaction)) {
              resolve();
          }
      });
  })
}

/** SEND SCRIPT */
const sendScript = async (store, script) => { 
  console.log('ss')
  const response = await fcl.send([fcl.script`${script}`]);
  console.log('res', response)
  return fcl.decode(response);
}



export  {sendTransaction, sendScript}