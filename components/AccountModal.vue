<template>
  <modal
    name="account-modal"
    class="account-modal"
    :adaptive="false"
    :min-width="200"
    :min-height="200"
    :scrollable="true"
    :reset="true"
    width="60%"
    height="auto"
    :focus-trap="true"
    :clickToClose="true"
  >
    <div class="modal-content">
      <div class="top-right">
        <button
          @click="$modal.hide('account-modal')"
          class="btn iconButton"
          tabindex="0"
        >
          <IconClose
            :strokeClass="contrastMode === 'dark' ? 'dark' : 'dark'"
          />
        </button>
      </div>
      <div class="account-header" v-if="walletAddress">
        <div class="row titleRow">
          <div class="userAvatar shadow">
            <IconUser
              :strokeClass="contrastMode === 'dark' ? 'light' : 'dark'"
              size="large"
            />
          </div>
          <h4>User Settings</h4>
        </div>
        <div class="subtitle row contentRow between">
          <div class="column">{{ walletName }}</div>
          <Button
            @click="handleDisconnect"
            size="small"
            mode="secondary"
            v-if="walletAddress"
          >
            Disconnect
          </Button>
          
          <!-- <div class="column">
          </div> -->
        </div>
      </div>

      <div class="account-content modalSection" v-if="walletAddress">
        <label>Active Contract</label>
        <p class="help" style="margin: 0" v-if="!activeContractId">None Selected</p>
        <div class="activeContractWrap shadow" v-if="activeContractId">
          <div class="row" v-if="activeContractSymbol">
            <div class="column col-50">
              <label class="subtitle">SYMBOL</label>
              <div>{{ activeContractSymbol || "-" }}</div>
            </div>
            <div class="column col-50">
              <label class="subtitle">Name</label>
              <div>{{ activeContractName || "-" }}</div>
            </div>
          </div>
          <label class="subtitle">Address</label>
          <div class="row between">
            <div class="subtitle">
              {{ activeContractId || "None Selected" }}
            </div>
            <Button
              @click="clearActiveContractId(null)"
              size="small"
              class="inactive"
              v-if="activeContractId"
            >
              Disconnnect
            </Button>
          </div>
        </div>
        <div class="row contentRow">
          <Button
            @click="toggleAddInterface(true)"
            size="small"
            mode="secondary"
            v-if="!showAddInterface"
          >
            Add custom contract...
          </Button>
        </div>
        <div class="addInterface row" v-if="showAddInterface">
          <div class="column col-100">
            <input
              name="Custom Contract ID"
              id="customTokenId"
              class="w3-input"
              type="string"
              max="99"
              required
              placeholder="Eg. 0xd0c402bcbcb5e701576..."
              v-model="customContractId"
            />
          </div>
          <div class="column col-25">
            <Button @click="addContract">Add</Button>
            <Button @click="toggleAddInterface(false)" mode="secondary"
              >Cancel</Button
            >
          </div>
        </div>
      
        <ToggleSection :colorMode="contrastMode" :active="true">
          <span slot="header">Previously Used Contracts</span>
          <div slot="content">
            <div v-for="(item, index) in usedContracts" :key="index">
          <div class="row between contractRow">
            <span class="column col-66">{{ item }}</span>
            <div class="column col-33 actions" v-if="item !== activeContractId">
              <button class="btn inactive" @click="setActiveContractId(item)">
                Select
              </button>
              <button class="btn inactive" @click="goToGallery(item)">
                View
              </button>
              <div class="removeItem">
                <Button
                  @click="removeUsedContractId(index)"
                  strokeClass="dark"
                >
                  <IconDelete size="small" strokeClass="dark"/>
                </Button>
              </div>
              <Button  mode="hollow" @click="goToContract(item)">
                <IconSettings size="small" strokeClass="dark"/>
              </Button>
            </div>
            <div class="column col-33" v-if="item === activeContractId">
              <div class="activeTag">ACTIVE</div>
              <button mode="hollow" class="btn inative" @click="goToGallery(item)">
                View
              </button>
              <Button  mode="hollow" @click="goToContract(item)">
                <IconSettings size="small" strokeClass="dark"/>
              </Button>
            </div>
          </div>
        </div>
          </div>
        </ToggleSection>
        <!-- <label>Previously Used Contracts</label>
        <div v-for="(item, index) in usedContracts" :key="index">
          <div class="row between contractRow">
            <span class="column col-66">{{ item }}</span>
            <div class="column col-33 actions" v-if="item !== activeContractId">
              <button class="btn inactive" @click="setActiveContractId(item)">
                Select
              </button>
              <div class="removeItem">
                <button
                  @click="removeUsedContractId(index)"
                  class="btn inactive"
                >
                  <span>Remove</span>
                </button>
              </div>
            </div>
            <div class="column col-33" v-if="item === activeContractId">
              <div class="activeTag">ACTIVE</div>
            </div>
          </div>
        </div> -->
      </div>

      <div class="settings-content modalSection" v-if="walletAddress">
        <label>Settings</label>
        <div class="row contentRow">
          <div class="column col-66">Status Information:</div>
          <div class="column col-33">
            <button
              class="btn small"
              :class="statusModalMode === 'fixed' ? 'active' : 'inactive'"
              @click="setStatusModalMode('fixed')"
            >
              Modal
            </button>
            <button
              class="btn small"
              :class="statusModalMode === 'inline' ? 'active' : 'inactive'"
              @click="setStatusModalMode('inline')"
            >
              Inline
            </button>
          </div>
        </div>
      </div>
      <div class="settings-ui modalSection">
        <label>UI</label>
        <div class="row contentRow">
          <div class="column col-66">Interface Mode</div>
          <div class="column col-33">
            <div class="buttonGroup uiMode">
              <button
                @click="setUiMode('full')"
                class="small toggleItem"
                :class="uiMode === 'full' ? 'active' : 'notActive'"
              >
                Full
              </button>
              <button
                @click="setUiMode('minimal')"
                class="small toggleItem"
                :class="uiMode === 'minimal' ? 'active' : 'notActive'"
              >
                minimal
              </button>
              <button
                @click="setUiMode('none')"
                class="small toggleItem"
                :class="uiMode === 'none' ? 'active' : 'notActive'"
              >
                none
              </button>
            </div>
          </div>
        </div>
        <div class="row contentRow">
          <div class="column col-66">Color Theme</div>
          <div class="column col-33">
            <div class="buttonGroup themeGroup">
              <div class="swatch lemon" @click="setUiTheme('lemon')">
                <span class="swatchLabel">Lemon</span>
              </div>
              <div class="swatch violet" @click="setUiTheme('violet')">
                <span class="swatchLabel">Violet</span>
              </div>
              <div class="swatch peach" @click="setUiTheme('peach')">
                <span class="swatchLabel">Peach</span>
              </div>
              <div class="swatch sand" @click="setUiTheme('sand')">
                <span class="swatchLabel">Sand</span>
              </div>
              <div class="swatch greyscale" @click="setUiTheme('gryscale')">
                <span class="swatchLabel">Gray</span>
              </div>
              <div class="swatch turquoise" @click="setUiTheme('turquoise')">
                <span class="swatchLabel">Turquoise</span>
              </div>
              <div class="swatch teal" @click="setUiTheme('teal')">
                <span class="swatchLabel">Teal</span>
              </div>
              <div class="swatch charcoal" @click="setUiTheme('charcoal')">
                <span class="swatchLabel">Charcoal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="devSettings modalSection" v-if="isDevAddress">
        <div class="row contentRow">
          <div class="column">Dev Mode:</div>
          <div class="column">
            <button
              class="btn small"
              :class="devModeClass(!devMode)"
              @click="setDevMode(false)"
            >
              off
            </button>
            <button
              class="btn small"
              :class="devModeClass(devMode)"
              @click="setDevMode(true)"
            >
              on
            </button>
          </div>
        </div>
        <div class="row contentRow" v-if="isDevAddress">
          <div class="column">Allow Chain Select (when Flow exists):</div>
          <div class="column">
            <button
              class="btn small"
              :class="chainSelectClass(!hasChainSelect)"
              @click="setHasChainSelect(false)"
            >
              No
            </button>
            <button
              class="btn small"
              :class="chainSelectClass(hasChainSelect)"
              @click="setHasChainSelect(true)"
            >
              Yes
            </button>
          </div>
        </div>
        <div class="row contentRow">
          <div class="column">Show vertical Grid:</div>
          <div class="column">
            <button
              class="btn small"
              :class="hasVerticalGridLines ? 'inactive' : 'active'"
              @click="setHasVerticalGrid(false)"
            >
              No
            </button>
            <button
              class="btn small"
              :class="hasVerticalGridLines ? 'active': 'inactive'"
              @click="setHasVerticalGrid(true)"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </modal>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "AccountModal",
  data() {
    return {
      showAddInterface: false,
      customContractId: "",
      hasVerticalGrid: false,
    };
  },
  mounted() {
    // console.log('account modal mounted: ', this.devAddresses)
    // console.log('does it contain 0xDbB59151b18Dd72E9AC092706e93De5b5d7a9325', this.devAddresses.includes('0xDbB59151b18Dd72E9AC092706e93De5b5d7a9325'))
  },
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
      walletName: "ui/walletName",
      isDevAddress: "ui/isDevAddress",
      uiMode: "ui/uiMode",
      contrastMode: "ui/contrastMode",
      uiTheme: "ui/uiTheme",
      usedContracts: "ui/usedContracts",
      hasChainSelect: "ui/hasChainSelect",
      hasVerticalGridLines: "ui/hasVerticalGridLines",
      statusModalMode: "ui/statusModalMode",
      activeContractId: "ui/activeContractId",
      activeContractName: "ui/activeContractName",
      activeContractSymbol: "ui/activeContractSymbol",
    }),

    devMode() {
      return this.$store.state.ui.devMode;
    },
    devAddresses() {
      return this.$store.state.ui.devAddresses;
    },
  },
  methods: {
    ...mapMutations({
      setStatusModalMode: "ui/setStatusModalMode",
      removeUsedContractId: "ui/removeUsedContractId",
      setUiMode: "ui/setUiMode",
      setUiTheme: "ui/setUiTheme",
      setWalletChain: "ui/setWalletChain",
      setHasChainSelect: "ui/setHasChainSelect",
    }),

    clearActiveContractId(value) {
      this.$store.commit("ui/clearActiveContractId", value);
    },
    setActiveContractId(value) {
      this.$store.commit("ui/setActiveContractId", value);
    },

    setDevMode(value) {
      this.$store.commit("ui/setDevMode", value);
    },
    devModeClass(state) {
      return state ? "active" : "inactive";
    },
    chainSelectClass(state) {
      return state ? "active" : "inactive";
    },
    setHasVerticalGrid(value){
      console.log('value', value)
      this.hasVerticalGrid = value
      this.$store.commit("ui/setHasVerticalGridLines", value);
    },
    accountLink() {
      console.log("test");
    },
    setWallet(value) {
      this.$store.commit("ui/setWallet", value);
    },
    handleDisconnect() {
      this.setWallet(null);
      this.setWalletChain("");
      this.$modal.hide("account-modal");
    },
    addContract() {
      console.log("adding contract", this.customContractId);
      this.$store.commit("ui/setActiveContractId", this.customContractId);
      this.showAddInterface = false;
    },
    handleModal() {
      this.$modal.show("account-modal");
    },
    toggleAddInterface(newState) {
      this.showAddInterface = newState;
    },
    goToGallery(contractId){
      this.$router.push({
        path: `/gallery/${contractId}`,
      })
    },
    goToContract(contractId){
      const requiredNetwork = this.$config.requiredNetwork;
      // console.log('req', requiredNetwork);
      const etherScanUrl = requiredNetwork === 'main' ? 'https://etherscan.io' : 'https://rinkeby.etherscan.io'
      const theUrl = `${etherScanUrl}/token/${contractId}#writeContract`
      console.log('theUrl', theUrl)
      if(window){
        window.open(theUrl, '_blank');

      }
      // this.$router.push({
      //   path: `/gallery/${contractId}`,
      // })
    }
  },
};
</script>

<style>
.row.between {
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.vm--overlay {
  background: var(--ui-color, #111);
  opacity: 0.6;
}
.vm--modal {
  box-shadow: 4px 4px 0px -2px var(--ui-color),
    0 20px 60px -2px rgba(27, 33, 58, 0.4);
}
.top-right {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.account-modal {
  /* background: var(--ui-color, #111); */
}
.modal-content {
  background: var(--background-color, #eee);
  color: var(--ui-color, #111);
  border: 2px solid var(--ui-color, #111);
}

.account-header {
  padding: 1rem;
  border-bottom: 1px solid var(--ui-color, #111);
}
.titleRow {
  align-items: center;
}
.userAvatar {
  border-radius: 2rem;
  width: 3rem;
  height: 3rem;
  background: var(--background-color, #eee);
  border: 1px solid var(--ui-color, #111);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}
.removeItem {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}
.account-content {
  padding: 1rem;
  margin-top: 1rem;
}
.activeContractWrap {
  padding: 0.5rem;
  border: 1px solid var(--ui-color, #111);
  background: var(--line-color, #eee);
}

.addInterface {
  padding: 0.5rem;
  margin-bottom: .5rem;
  align-items: center;
  background: var(--fill-color, #eee);
}
.addInterface .btn {
  margin-left: 0.5rem;
}

.activeTag {
  color: var(--success-color, #ccc);
  padding: 2px 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  line-height: 2rem;
  font-variation-settings: "wght" 800;
}
.row.contractRow {
  font-size: 0.75rem;
}
.row.contractRow .column {
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.contentRow {
  padding: 0.25rem 0;
  font-size: .875rem;
}
.modalSection {
  padding: 1rem;
}
.devSettings {
  border-top: 1px solid var(--ui-color, #111);
  position: relative;
}
.devSettings:before {
  content: "DEV WALLETS ONLY";
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 0.5rem;
  background: red;
  font-weight: 800;
  border-radius: 0;
  font-variation-settings: "wght" 600;
  font-size: 0.675rem;
}
.actions > button {
  margin: 0.25rem;
}
</style>
