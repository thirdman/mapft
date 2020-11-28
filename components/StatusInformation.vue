<template>
  <div class="statusInformation" :class="statusModalMode">
    <div class="closeButtonWrap">
      <button
        class="btn iconButton"
        @click="
          setStatusModalMode(statusModalMode === 'fixed' ? 'inline' : 'fixed')
        "
      >
        <IconContract
          :strokeClass="contrastMode"
          v-if="statusModalMode === 'inline'"
        />
        <IconExpand
          :strokeClass="contrastMode"
          v-if="statusModalMode === 'fixed'"
        />
      </button>
    </div>

    <h3>{{ mintStatusTitle || title}}</h3>
    <div class="statusRow">
      <div class="statusIcon iconPostion">
        <Loading
          :fillClass="contrastMode"
          message
          v-if="
            mintStatus === 'working' ||
            mintStatus === 'stillWorking' ||
            mintStatus === 'stillWorkingMode'
          "
        />
        <IconError v-if="mintStatus === 'error' || mintStatus === 'noContract'" :strokeClass="contrastMode" />
        <IconInfo
          v-if="
            mintStatus === 'confirming' || mintStatus === 'checkTransaction'
          "
          :strokeClass="contrastMode"
        />
      </div>
      <p class="statusMessage">{{ mintStatusMessage }}</p>
      
      <div class="loadingPuppy shadow" v-if="showPuppy()">
        <img src="~/assets/images/puppy.gif" alt="excited puppy"/> 
        </div>
    </div>
    <span id="status-box-icon" class="status-icon status-active"></span>

    <div class="transactionInfo" v-if="mintStatus === 'noContract'">
      <div v-if="activeContractId" style="padding: 1rem; margin-left: 1rem; background: rgba(0,0,0,.1); border-radius: .5rem;">
        <p class="small">Sometimes this error appears despite having an active contract. This usually happens when you have loaded the site but it hasn't properly retrieved your stored contract id.</p>
        <p class="small">Active Contract: {{activeContractId ? activeContractId : "no activeContractId"}}</p>
        <p class="small"><Button @click="handleReset(activeContractId)">Reload Stored Account</Button></p>
      
      </div>
      </div>
    <div class="transactionInfo" v-if="this.mintTransactionId">
      <label class="mintTransactionLabel">Transaction Id</label>

      <div>
        <a :href="etherscanLink" class="etherscanLink" target="blank">
          <IconExternalLink :strokeClass="contrastMode" />
          {{ etherscanLink }}
        </a>
      </div>
    </div>
    <div v-if="mintStatus === 'checkTransaction'">
      <a class="etherscanLink" target="blank" href="https://discord.gg/WPpD2X5">
        <IconExternalLink :strokeClass="contrastMode" />
        <span>Discord Server</span>
      </a>
    </div>
  </div>
</template>

<style>
.statusInformation {
  position: relative;
  background: var(--fill-color, #111);
  color: var(--text-color, #111);
  border-top: 1px solid var(--ui-color, #111);
}
.statusInformation {
  padding: 0.5rem;
}
.statusMessage {
  margin: 0.5rem 0;
  max-width: 40rem;
}
.statusInformation.inline {
  padding: 1rem;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
}
.statusInformation.inline .closeButtonWrap {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.statusInformation.fixed .closeButtonWrap {
  position: absolute;
  top: 0rem;
  right: 0rem;
}
.statusInformation.error, .statusInformation.hasError{
  background: red;
}
.statusInformation .error{
  display: block;
}

.closeButtonWrap button {
  transform: scale(1);
}
.closeButtonWrap button:hover {
  transform: scale(1.1);
}
.statusInformation h3 {
  margin: 0;
}
.statusRow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.statusRow .statusIcon {
  flex-basis: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.statusRow .loadingPuppy{
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border: 2px solid #111;
  border-radius: 80px;
  overflow: hidden;
  margin-left: 1rem;
}
.statusRow .loadingPuppy img{
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;

}
.transactionInfo {
  /* border-top: 1px solid var(--line-color, #ccc); */
}
.etherscanLink {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.75rem;
}
</style>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'StatusInformation',
  props: ['displayMode', 'message', 'title', 'status'], // possibly redundant.
  computed: {
    ...mapGetters({
      contrastMode: 'ui/contrastMode',
      walletNetwork: 'ui/walletNetwork',
      mintTransactionId: 'mintFormStore/mintTransactionId',
      mintStatus: 'mintFormStore/mintStatus',
      mintStatusTitle: 'mintFormStore/mintStatusTitle',
      mintStatusMessage: 'mintFormStore/mintStatusMessage',
      statusModalMode: 'ui/statusModalMode',
      activeContractId: 'ui/activeContractId',
    }),
   
    etherscanLink() {
      console.log('walletNetwork', this.walletNetwork)
      console.log('mintTransactionId', this.mintTransactionId)
      // console.log(this.$store.state.mintFormStore.walletNetwork)
      if (!this.mintTransactionId) {
        return null
      }
      const link =
        this.walletNetwork === 'rinkeby'
          ? `https://rinkeby.etherscan.io/tx/${this.mintTransactionId}`
          : `https://etherscan.io/tx/${this.mintTransactionId}`
      return link
    },
  },
  methods: {
    ...mapMutations({
      setMintStatus: 'mintFormStore/setMintStatus',
      setStatusModalMode: 'ui/setStatusModalMode',
      setActiveContractId: 'ui/setActiveContractId',
    }),
    ...mapActions({
      showStatusModal: 'mintFormStore/showStatusModal',
    }),
     showPuppy() {
      const puppyArray = [
        'waiting',
        'working',
        'stillWorking',
        'stillWorkingMore'
      ];
      const currentStatus = this.mintStatus
      console.log('currentStatus: ', this.mintStatus)
      const isWorking = puppyArray.includes(currentStatus)
      console.log('isWorking: ', isWorking)
        return isWorking
    },
    handleStatusModal(newState) {
      if (newState) {
        // this.$store.commit('mintFormStore/setShowStatusModal', newState)
        this.$store.commit('ui/setStatusModalMode', 'fixed')
        // this.$modal.show('status-modal')
      } else {
        // this.$store.commit('mintFormStore/setShowStatusModal', newState)
        this.$store.commit('ui/setStatusModalMode', 'inline')
        // this.$modal.hide('status-modal')
      }
    },
    handleReset(id){
      console.log('todo', id)
      this.$store.commit('ui/setActiveContractId', id);
      this.$store.commit('mintFormStore/setMintStatus', 'ready');
    }
  },
}
</script>
