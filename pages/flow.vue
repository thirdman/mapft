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
                  @click="fcl.unauthenticate"
                  class="fill"
                  :fill="true"
                  size="large"
                  >Disconnect</Button
                >
                
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
      console.log('fcl.unauthenticate', fcl.unauthenticate)
      // await fcl.unauthenticate().then(user =>{
      //   if(user.loggedIn){

      //     console.log('user', user)
      //   this.$store.commit('flowStore/setUser', user)
      //   }
      //   // this.setUser(user)
      //   // fcl.authenticate
      // }).catch(error => console.log('error', error))
    },
    getMoments() {
      console.log('get moments')
    },
    async loadMomentMetadata() {
      const vm = this
      const momentIds = await vm.sendScript(`
                import TopShot from 0x179b6b1cb6755e31
                pub fun main(): [UInt64] {
                    let acct = getAccount(0x${vm.address})
                    let collectionRef = acct.getCapability(/public/MomentCollection)!
                                            .borrow<&{TopShot.MomentCollectionPublic}>()!
                    log(collectionRef.getIDs())
                    return collectionRef.getIDs()
                }
            `)
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