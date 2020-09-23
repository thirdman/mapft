<template>
  <div class="pageContainer">


    <!--  VUE MINT FORM SECTION-->
    <section id="flow" class="">
      <div class="tertiary">
        <!-- <h2>Mint Tokens</h2>
        <div class="aside">
          <p>Mint NFT tokens using your deployed custom contract.</p>
        </div> -->
      </div>
      <div class="primary">
        
          <div>
            <h1>Flow test</h1>
          </div>
          <div v-if="!loggedIn">
            <Button @click="fcl.authenticate" class="" size="large"
              >login</Button
            >
            <Button @click="logFcl" class="fill" :fill="true" size="large"
              >logFcl</Button
            >
          </div>
          
          <Button @click="logCurrentUser" class="fill" :fill="true" size="large"
            >log current user</Button
          >
          <div v-if="loggedIn">
            <div class="userProfile shadow" v-if="user && user.identity">
              <img
                class="userProfileAvatar"
                :src="user.identity.avatar"
                :style="`background: ${user.identity.color}`"
              />
              <h2>{{ user.identity.name }}</h2>
              <h5>{{ user.add }}</h5>
              <p>{{ user.identity.bio }}</p>
              <div class="userActions">
                <Button
                  @click="getMoments"
                  class="fill"
                  :fill="true"
                  size="large"
                  >Get Moments</Button
                >
                <Button
                  @click="getMeta"
                  class="fill"
                  :fill="true"
                  size="large"
                  >Get Meta</Button
                >
                <Button
                  @click="fcl.unauthenticate"
                  class="fill"
                  :fill="true"
                  size="large"
                  >Disconnect</Button
                >
                
              </div>
              <div v-if="moments">
                <MomentsList :moments="moments" displayMode="list"/>
                
              </div>
            </div>
          </div>
        
      </div>
      <div class="secondary">
        <div class="aside help">
          <h6>Flow</h6>

          <p>This is a test using flow dev wallet</p>
        </div>
      </div>
    </section>

  </div>
</template>

<style lang="scss">
.userProfile {
  border: 2px solid var(--ui-color, #eee);
  padding: 1rem;
  background: var(--fill-color, #ccc);
  color: var(--text-color, #ccc);
  margin-top: 8rem;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.userProfileAvatar {
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
  box-shadow: 0 2px 15px -5px rgba(0, 0, 0, 0.3);
  background: var(--text-color, #ccc);
  border: 2px solid var(--ui-color, #eee);
  position: absolute;
  top: -5rem;
}
.userActions {
  padding: 0.5rem;
}
</style>

<script>
import * as fcl from '@onflow/fcl'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { sendScript } from '../utils/flow'
export default {
  name: 'FlowPage',
  mounted() {
    const vm = this
    if (process.client) {
      // console.log('fcl', fcl)
      fcl
        .config()
        .put('accessNode.api', 'http://localhost:8080') // local Flow emulator
        .put('challenge.handshake', 'http://localhost:8701/flow/authenticate') // local dev wallet
      // .put("accessNode.api", "https://access-testnet.onflow.org")
      // .put("challenge.handshake", "https://flow-wallet-staging.blocto.app/authn")

      
      fcl.currentUser().subscribe(async (user) => {
        console.log('vm: ', vm)
        if (user.loggedIn) {
        vm.$store.commit('flowStore/setUser', user)
          // this.setUser(user);
          console.log('user loggedIn:', user)
          // await vm.setupTopShotAndSignatureAccount()
          // if (vm.$route.name !== 'flow') {
          //   vm.$router.push('/flow')
          // }
          // vm.setMoments(await vm.loadMomentMetadata())
        } else {
          console.log('user loggedout:', user)
          // vm.setMoments([])
        }
      })
    }
  },
  data() {
    return {
      fcl,
      moments: []
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: 'flowStore/loggedIn',
      address: 'flowStore/address',
      user: 'flowStore/user',
    }),
  },
  methods: {
    ...mapMutations({
      setUser: 'flowStore/setUser',
      removeUser: 'flowStore/removeUser',
    }),
    ...mapActions({
      subscribeUser: 'flowStore/subscribeUser',
      setupTopShotAndSignatureAccount: 'flowStore/setupTopShotAndSignatureAccount',
      // loadMomentData: 'flowStore/loadMomentData',
      
    }),
    logFcl() {
      console.log('fcl', fcl)
    },
    
    logCurrentUser() {
      // fcl.currentUser().subscribe(async (user) => {
      //   console.log('user', user)
      // })
    },
    // authenticateUser() {
    //   fcl.authenticate().then(user =>{
    //     if(user.loggedIn){

    //       console.log('user', user)
    //     this.$store.commit('flowStore/setUser', user)
    //     }
    //     // this.setUser(user)
    //     // fcl.authenticate
    //   }).catch(error => console.log('error', error))
    // },
    async disconnnectUser() {
      console.log('fcl', fcl)
      // await fcl.unauthenticate().then(user =>{
      //   if(user.loggedIn){

      //     console.log('user', user)
      //   this.$store.commit('flowStore/setUser', user)
      //   }
      //   // this.setUser(user)
      //   // fcl.authenticate
      // }).catch(error => console.log('error', error))
    },
    async getMoments() {
      // console.log('get moments', this.setupTopShotAndSignatureAccount)
      await this.setupTopShotAndSignatureAccount();
      console.log('got here');
          // if (vm.$route.name !== 'flow') {
          //   vm.$router.push('/flow')
          // }
      // await this.loadMomentMetadata().then(result => console.log('hereeee'))
          //  vm.setMoments(await vm.loadMomentMetadata())
    },
    async getMeta(){
      console.log('getMeta')
      // await this.loadMomentMetadata()
      console.log('address', this.address)
      
      const theScript =  `
                import TopShot from 0x179b6b1cb6755e31
                pub fun main(): [UInt64] {
                    let acct = getAccount(0x${this.address})
                    let collectionRef = acct.getCapability(/public/MomentCollection)!
                                            .borrow<&{TopShot.MomentCollectionPublic}>()!
                    log(collectionRef.getIDs())
                    return collectionRef.getIDs()
                }
            `;
      const getSetup = async () => {
        return await this.setupTopShotAndSignatureAccount();
      }
      const getResult = async () => {
        const data = await fcl.send([fcl.script`${theScript}`])
        return fcl.decode(data)
      }
      const getMetaItem= async (context, id) => {
        console.log('id', id)
        const data = await this.getMomentMeta(this, id)
        console.log('he: ', fcl.decode(data))
        return fcl.decode(data)
      }
      const momentIds = await getResult();

      console.log('mom', momentIds)
      const getIds = async () => {
        console.log('momentIds', momentIds)
        const moments = []
          for (const momentId of momentIds) {
            
            const metadata =  await this.getMomentMeta(this, momentId).then(result => {
                console.log('result', result)
                return result;
              });
            console.log('metadata', metadata)
            moments.push(metadata)
            // moments.push(momentId)
          }
          console.log('moments', moments)
          // this.moments = moments
          return moments
      }
      
      return await getIds().then(response => {
        this.moments = response;
      })
      
      
        
    },
    async getMomentMeta(context, momentId) {
      const theScript = `
          import TopShot from 0x179b6b1cb6755e31
          pub fun main(): {String: String} {
              let collectionRef = getAccount(0x${this.address}).getCapability(/public/MomentCollection)!
                  .borrow<&{TopShot.MomentCollectionPublic}>()
                  ?? panic("Could not get public moment collection reference")
              let token = collectionRef.borrowMoment(id: ${momentId})
                  ?? panic("Could not borrow a reference to the specified moment")
              let data = token.data
              let metadata = TopShot.getPlayMetaData(playID: data.playID) ?? panic("Play doesn't exist")
              log(metadata)
              return metadata
          }
      `;
      
        const getData = async () => {
          return await fcl.send([fcl.script`${theScript}`])
        };
        
        return getData().then(res => {
          return fcl.decode(res)
        })

    },
    async loadMomentMetadata() {
      console.log('loadMomentMetadata')
      const vm = this
      console.log('this', this)
      const momentIds = await sendScript(this, `
                import TopShot from 0x179b6b1cb6755e31
                pub fun main(): [UInt64] {
                    let acct = getAccount(0x${vm.address})
                    let collectionRef = acct.getCapability(/public/MomentCollection)!
                                            .borrow<&{TopShot.MomentCollectionPublic}>()!
                    log(collectionRef.getIDs())
                    return collectionRef.getIDs()
                }
            `)
            console.log('momentIds', momentIds)
      const moments = []
      for (const momentId of momentIds) {
        const metadata = await vm.getMoment(momentId)
        moments.push(metadata)
      }
      return moments
    },
  },
}
</script>