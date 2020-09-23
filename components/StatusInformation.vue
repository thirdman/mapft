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
          v-if="statusModalMode === 'fixed'"
        />
        <IconExpand
          :strokeClass="contrastMode"
          v-if="statusModalMode === 'inline'"
        />
      </button>
    </div>

    <h3>{{ title || mintStatusTitle }}</h3>
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
        <IconError v-if="mintStatus === 'error'" :strokeClass="contrastMode" />
        <IconInfo
          v-if="
            mintStatus === 'confirming' || mintStatus === 'checkTransaction'
          "
          :strokeClass="contrastMode"
        />
      </div>
      <p class="statusMessage">{{ mintStatusMessage }}</p>
    </div>
    <span id="status-box-icon" class="status-icon status-active"></span>

    <div class="transactionInfo" v-if="mintStatus !== 'ready'">
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
.statusInformation.fixed .closeButtonWrap {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.statusInformation.inline .closeButtonWrap {
  position: absolute;
  top: 0rem;
  right: 0rem;
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
  justify-content: center;
}
.statusRow .statusIcon {
  flex-basis: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.transactionInfo {
  border-top: 1px solid var(--line-color, #ccc);
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
    }),
    ...mapActions({
      showStatusModal: 'mintFormStore/showStatusModal',
    }),
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
  },
}
</script>
