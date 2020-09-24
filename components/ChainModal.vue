<template>
  <modal
    name="chain-modal"
    class="chain-modal"
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
          @click="$modal.hide('chain-modal')"
          class="btn iconButton"
          tabindex="0"
        >
          <IconClose
            :strokeClass="contrastMode === 'dark' ? 'light' : 'dark'"
          />
        </button>
      </div>
   
   

      <div class="modalSection" >
        <label>Select Chain</label>
        
        <div class="chainSelect">
          <a class="chainOption chainEthereum" @click="connectEthereum">
            <h3>Ethereum</h3>
            <p>Connect using your Ethereum wallet (MetaMask etc)</p>
          </a>
          <a class="chainOption chainFlow" @click="connectEthereum">
            <h3>Flow</h3>
            <p>Connect using your Flow identity</p>
          </a>
        </div>
      </div>
      
    </div>
  </modal>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import * as fcl from '@onflow/fcl'
export default {
  name: 'ChainModal',
  data() {
    return {
      // showAddInterface: false,
      // customContractId: '',
    }
  },
  computed: {
    ...mapGetters({
      contrastMode: 'ui/contrastMode'
      
    }),

    
    
  },
  methods: {
    ...mapMutations({
      
      
    }),
    connectFlow(){
      fcl.authenticate();
      this.$modal.hide('chain-modal')
    },
    connectEthereum(){
      fcl.authenticate();
      this.$modal.hide('chain-modal')
    }
  },
}
</script>

<style>
.chainSelect{
  width: 100%;
  /* margin: 1rem; */
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 0;
  grid-row-gap: 0;
}
.chainSelect > .chainOption{
  border: 1px solid var(--line-color, #eee);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
}
.chainSelect > .chainOption:hover{
  background: var(--fill-color, #111);
}
.chainSelect > .chainOption p{
  flex-basis: 70%;
  text-align: center;
  font-size: .875rem;
  opacity: .75;
}
.chainSelect > .chainOption:first-child{
  border-radius: .5rem 0 0 .5rem;
  border-right: none;;
}
.chainSelect > .chainOption:last-child{
  border-radius: 0 .5rem .5rem 0;
}
</style>
