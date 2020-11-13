<template>
  <modal
    name="info-modal"
    class="info-modal"
    :adaptive="true"
    :min-width="200"
    :min-height="200"
    :scrollable="false"
    :reset="true"
    width="60%"
    height="auto"
    :focus-trap="true"
    :clickToClose="true"
  >
    <div class="modal-content">
      <div class="top-right">
        <button
          @click="$modal.hide('info-modal')"
          class="btn iconButton"
          tabindex="0"
        >
          <IconClose
            :strokeClass="contrastMode"
          />
        </button>
      </div>

      <div class="modalSection">
        <label>Network Error {{contrastMode}}</label>
        <p>You are using the <strong style="text-transform: uppercase;">{{this.walletNetwork}}</strong> Ethereum network. Please change to <strong style="text-transform: uppercase;">Rinkeby</strong> network in your ethereum wallet.</p>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "InfoModal",
  data() {
    return {
      // showAddInterface: false,
      // customContractId: '',
    };
  },
  computed: {
    ...mapGetters({
      walletNetwork: "ui/walletNetwork",
      walletAddress: "ui/walletAddress",
      contrastMode: "ui/contrastMode",
    }),
  },
  methods: {
    ...mapMutations({}),
    
    closeModal() {
      alert("This funciton is incomplete!");
      this.$modal.hide("info-modal");
    },
  },
};
</script>

<style lang="scss">

</style>
