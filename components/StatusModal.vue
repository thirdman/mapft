<template>
  <modal
    name="status-modal"
    class="status-modal"
    :adaptive="true"
    :min-width="200"
    :min-height="200"
    :scrollable="false"
    :reset="true"
    width="60%"
    height="auto"
    :focus-trap="true"
    :clickToClose="true"
    :show="showStatusModal"
  >
    <div class="modal-content">
      <div class="top-right" v-if="1 === 2">
        <button
          @click="handleStatusModal(statusModalMode === 'fixed' ? false : true)"
          class="btn"
        >
          {{ statusModalMode }} handle status modal
        </button>
        <button @click="$modal.hide('status-modal')" class="btn iconButton">
          <IconClose strokeClass="dark" />
        </button>
        <button
          class="btn iconButton"
          @click="
            setStatusModalMode(statusModalMode === 'fixed' ? 'inline' : 'fixed')
          "
        >
          <IconContract strokeClass="dark" v-if="statusModalMode === 'fixed'" />
          <IconExpand strokeClass="dark" v-if="statusModalMode === 'inline'" />
        </button>
      </div>
      <StatusInformation />
    </div>
  </modal>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'StatusModal',
  computed: {
    devMode() {
      return this.$store.state.ui.devMode
    },
    ...mapGetters({
      statusModalMode: 'ui/statusModalMode',
    }),
  },
  methods: {
    ...mapMutations({
      setStatusModalMode: 'ui/setStatusModalMode',
    }),
    ...mapActions({
      showStatusModal: 'mintFormStore/showStatusModal',
    }),
    handleStatusModal(newState) {
      console.log('this.$modal', this.$modal)
      if (newState) {
        this.$store.commit('ui/setStatusModalMode', 'fixed')
        console.log('newState', newState)
        this.$modal.show('status-modal')
      } else {
        this.$store.commit('ui/setStatusModalMode', 'inline')
        console.log('newState', newState)
        this.$modal.hide('status-modal')
      }
    },
  },
}
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
  z-index: 20;
}

.modal-content {
  background: var(--background-color, #eee);
  color: var(--ui-color, #111);
  border: 2px solid var(--ui-color, #111);
}
</style>
