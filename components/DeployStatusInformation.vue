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

    <h3>{{ deployStatusTitle }}</h3>
    <div
      class="statusRow"
      v-if="deployStatus !== 'done' || deployStatus !== 'completed'"
    >
      <div class="statusIcon iconPostion">
        <Loading
          :fillClass="contrastMode"
          message
          v-if="
            deployStatus === 'working' ||
            deployStatus === 'stillWorking' ||
            deployStatus === 'stillWorkingMode'
          "
        />
        <IconError
          v-if="deployStatus === 'error'"
          :strokeClass="contrastMode"
        />

        <IconInfo
          v-if="
            deployStatus === 'confirming' ||
            deployStatus === 'checkTransaction' ||
            deployStatus === 'completed'
          "
          :strokeClass="contrastMode"
        />
      </div>
      <p class="statusMessage">{{ deployStatusMessage }}</p>
    </div>

    <div
      class="transactionInfo"
      v-if="deployStatus !== 'ready' && deployStatus !== 'completed'"
    >
      <label class="mintTransactionLabel">Transaction</label>
      <div
        id="deployTransactionLabel"
        style="font-size: 0.75rem;"
        class="contentRow"
      >
        ID: {{ deployTransactionId }}
      </div>
      <div>
        <a :href="etherscanLink" class="etherscanLink" target="blank">
          <IconExternalLink :strokeClass="contrastMode" />
          View on etherscan
        </a>
      </div>
    </div>
    <div v-if="deployStatus === 'checkTransaction'">
      <a class="etherscanLink" target="blank" href="https://discord.gg/WPpD2X5">
        <IconExternalLink :strokeClass="contrastMode" />
        <span>Discord Server</span>
      </a>
    </div>

    <div id="completedContent" v-if="deployStatus === 'completed'">
      <h4>New Contract Deployed</h4>
      <div class="contractInfo">
      <div class="row">
        <div class="column">
          <label>Name</label>
          <div>{{ activeContractName }}</div>
        </div>
        <div class="column">
          <label>Symbol</label>
          <div>{{ activeContractSymbol }}</div>
        </div>
      </div>

      <label>Deployed Address</label>
      <div>{{ activeContractId }}</div>
      </div>
      <p class="help">
        This address is your deployed contract, and is saved locally in your
        user settings. Copy it for safekeeping, and use it to create NFT tokens
        in the Mint section.
      </p>
    </div>
    <div class="row actions" v-if="deployStatus === 'completed'">
      <Button size="large" :fill="false" @click="handleModal" mode="primary">
        View Settings
      </Button>
      <Button
        id="resetContractButton"
        size="large"
        :fill="false"
        mode="primary"
        @click="resetDeployForm"
      >
        Close
      </Button>
    </div>
  </div>
</template>

<style lang="scss"> 
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
  /* border-top: 1px solid var(--line-color, #ccc); */
}
.etherscanLink {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.75rem;
}

.contractInfo{
  border: 1px solid var(--line-color, #111);
  padding: .5rem;
  .row{
    border-bottom: 1px solid var(--line-color, #111);
  }
}
</style>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'DeployStatusInformation',

  computed: {
    ...mapGetters({
      // UI
      contrastMode: 'ui/contrastMode',
      walletNetwork: 'ui/walletNetwork',
      activeContractId: 'ui/activeContractId',
      activeContractName: 'ui/activeContractName',
      activeContractSymbol: 'ui/activeContractSymbol',
      statusModalMode: 'ui/statusModalMode',
      // DEPLOY
      deployTransactionId: 'deployFormStore/deployTransactionId',
      deployStatus: 'deployFormStore/deployStatus',
      deployStatusTitle: 'deployFormStore/deployStatusTitle',
      deployStatusMessage: 'deployFormStore/deployStatusMessage',
    }),
    etherscanLink() {
      console.log('walletNetwork', this.walletNetwork)
      console.log('deployTransactionId', this.deployTransactionId)

      if (!this.deployTransactionId) {
        return null
      }
      const link =
        this.walletNetwork === 'rinkeby'
          ? `https://rinkeby.etherscan.io/tx/${this.deployTransactionId}`
          : `https://etherscan.io/tx/${this.deployTransactionId}`
      return link
    },
  },
  methods: {
    ...mapMutations({
      setMintStatus: 'mintFormStore/setMintStatus',
      setStatusModalMode: 'ui/setStatusModalMode',
      resetDeployForm: 'deployFormStore/resetDeployForm',
      setContractData: 'deployFormStore/setContractData',
    }),
    ...mapActions({
      showStatusModal: 'mintFormStore/showStatusModal',
    }),
    handleStatusModal(newState) {
      if (newState) {
        this.$store.commit('ui/setStatusModalMode', 'fixed')
        // this.$modal.show('status-modal')
      } else {
        // this.$store.commit('mintFormStore/setShowStatusModal', newState)
        this.$store.commit('ui/setStatusModalMode', 'inline')
        // this.$modal.hide('status-modal')
      }
    },
    handleModal() {
      this.$store.commit('deployFormStore/resetDeployForm')
      this.$modal.show('account-modal')
    },
  },
}
</script>
