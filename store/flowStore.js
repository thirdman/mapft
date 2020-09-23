import Vuex from "vuex"
import Vue from "vue"
import * as fcl from "@onflow/fcl"

import {sendTransaction} from "../utils/flow"

Vue.use(Vuex);

export const state = () => ({
  user: {},
  moments: []
});
export const getters = {
  user: (state) => state.user,
  loggedIn(state) {
      if (state.user) {
          return state.user.loggedIn
      }
  },
  address(state) {
      if (state.user) {
          return state.user.addr
      }
  }
}
export const mutations = {
  setUser(state, user) {
    console.log('flowStore setuser', user)
    const tempUser = {...state.user, user}
    console.log('flowStore tempuser', tempUser)
      state.user = user;
  },
  removeUser(state, user) {
    console.log('flowStore removeuser')
    const tempUser = {...state.user, user}
      state.user = {};
  },
  setMoments(state, moments) {
    state.moments = moments
  }
}

export const actions = {
  
  sendTransaction: async (store, transaction) => {
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
  },
  async sendScript(store, script) {
      const response = await fcl.send([fcl.script`${script}`]);

      return fcl.decode(response);
  },
  async setupTopShotAndSignatureAccount( context ) {
                console.log('context', context);
                const vm = context;
                // console.log("dispatch.sendTransaction", dispatch('deployForm/sendTransaction');
                console.log('vm: ', vm)
                
                const thisTransaction = `
                    import TopShot from 0x179b6b1cb6755e31
                    import Autograph from 0xf3fcd2c1a78f5eee
    
                    transaction {
    
                        prepare(acct: AuthAccount) {
    
                            // First, check to see if a moment collection already exists
                            if acct.borrow<&TopShot.Collection>(from: /storage/MomentCollection) == nil {
    
                                // create a new TopShot Collection
                                let collection <- TopShot.createEmptyCollection() as! @TopShot.Collection
    
                                // Put the new Collection in storage
                                acct.save(<-collection, to: /storage/MomentCollection)
    
                                // create a public capability for the collection
                                acct.link<&{TopShot.MomentCollectionPublic}>(/public/MomentCollection, target: /storage/MomentCollection)
                            }
    
                            if acct.borrow<&Autograph.Collection>(from: /storage/AutographCollection) == nil {
    
                                // create a new Autograph Collection
                                let collection <- Autograph.createEmptyCollection() as! @Autograph.Collection
    
                                // Put the new Collection in storage
                                acct.save(<-collection, to: /storage/AutographCollection)
    
                                // create a public capability for the collection
                                acct.link<&{Autograph.AutographCollectionPublic}>(/public/AutographCollection, target: /storage/AutographCollection)
                            }
                        }
                    }
                `;
                await sendTransaction(context, thisTransaction)
                return 'test';
                // console.log('setupTopShotAndSignatureAccount result: ', result)
                // return result
      },
  
  async getMoment({ dispatch, getters }, momentId) {
      const vm = this;
      console.log('dispatch', dispatch);

      const metadata = await dispatch("sendScript", `
          import TopShot from 0x179b6b1cb6755e31
          pub fun main(): {String: String} {
              let collectionRef = getAccount(0x${getters.address}).getCapability(/public/MomentCollection)!
                  .borrow<&{TopShot.MomentCollectionPublic}>()
                  ?? panic("Could not get public moment collection reference")
              let token = collectionRef.borrowMoment(id: ${momentId})
                  ?? panic("Could not borrow a reference to the specified moment")
              let data = token.data
              let metadata = TopShot.getPlayMetaData(playID: data.playID) ?? panic("Play doesn't exist")
              log(metadata)
              return metadata
          }
      `);

      metadata.autographs = [];

      const autographIds = await dispatch("sendScript", `
          import TopShot from 0x179b6b1cb6755e31
          pub fun main(): [UInt64] {
              let token = getAccount(0x${getters.address}).getCapability(/public/MomentCollection)!
                          .borrow<&{TopShot.MomentCollectionPublic}>()!.borrowMoment(id: ${momentId})!
              log(token.getAutographIDs())
              return token.getAutographIDs()
          }
      `);

      for (const autographId of autographIds) {
          const author = await dispatch("sendScript", `
              import TopShot from 0x179b6b1cb6755e31
              pub fun main(): Address {
                  let collectionRef = getAccount(0x${getters.address}).getCapability(/public/MomentCollection)!
                      .borrow<&{TopShot.MomentCollectionPublic}>()
                      ?? panic("Could not get public moment collection reference")
                  let moment = collectionRef.borrowMoment(id: ${momentId})
                      ?? panic("Could not borrow a reference to the specified moment")
                  let autograph = moment.borrowAutograph(autographID: ${autographId})
                      ?? panic("Could not borrow a reference to the specified autograph")
                  log(autograph.author)
                  return autograph.author
              }
          `);

          const signatureDocument = await dispatch("sendScript", `
              import TopShot from 0x179b6b1cb6755e31
              pub fun main(): String {
                  let collectionRef = getAccount(0x${getters.address}).getCapability(/public/MomentCollection)!
                      .borrow<&{TopShot.MomentCollectionPublic}>()
                      ?? panic("Could not get public moment collection reference")
                  let moment = collectionRef.borrowMoment(id: ${momentId})
                      ?? panic("Could not borrow a reference to the specified moment")
                  let autograph = moment.borrowAutograph(autographID: ${autographId})
                      ?? panic("Could not borrow a reference to the specified autograph")
                  log(autograph.document)
                  return autograph.document
              }
          `);

          metadata.autographs.push({
              document: signatureDocument,
              author,
          });
      }

      metadata.id = momentId;
      return metadata;
  },
}

