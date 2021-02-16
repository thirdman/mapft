<template>
    
  <div :class="`UserPanel connectPanel shadow`">
      <div class="connectSelect row">
        <div class="column" :class="selectedPanel === 'drafts' ? 'selected' : 'notselected' "
          @click="setSelectedPanel('drafts')"
        >
          <h5>Drafts</h5>
          <!-- <p class="small">Mint data you have saved</p> -->
        </div>
        <div class="column" :class="selectedPanel === 'contracts' ? 'selected' : 'notselected' "
          @click="setSelectedPanel('contracts')"
        >
          <h5>Contracts</h5>
          <!-- <p class="small">Your contracts</p> -->
        </div>
        <div class="column" :class="selectedPanel === 'following' ? 'selected' : 'notselected' "
          @click="setSelectedPanel('following')"
        >
          <h5>Following</h5>
          <!-- <p class="small">Galleries You follow</p> -->
        </div>
      </div>
      
        <div class="connectBody"  v-if="selectedPanel === 'drafts'">
          <label>Drafts</label>
          <transition-group name="card" appear tag="div" class="listWrap">
          <div v-for="(item) in draftsArray" :key="`draftItem${item.draftId}`" class="card">
              <div class="row between draftRow">
                <div class="column col-66" style="flex-direction: column; align-items: flex-start;">
                  
                  <h6>{{ item.data.imageName || `Unnamed: ${item.draftId}` }}</h6>
                  <p class="small draftDescription">{{item.data.artistNote}}</p>
                  <div class="row">
                    <span class="column col-50 draftCheck">
                      <IconCheck size="small" :strokeClass="contrastMode" v-if="item.data.fileIPFSHash"/>
                      <IconClose size="small" strokeClass="danger" v-if="!item.data.fileIPFSHash"/>
                      <span>IPFSHash</span>
                    </span>
                    <span class="column col-50 draftCheck" >
                      <IconCheck size="small" :strokeClass="contrastMode" v-if="item.data.fileArweaveHash"/>
                      <IconClose size="small" strokeClass="danger" v-if="!item.data.fileArweaveHash"/>
                      <span>ArweaveHash</span>
                    </span>
                  </div>
                  <p class="xsmall draftDate" v-if="item.dateModified"><IconCalendar size="small" :strokeClass="contrastMode" /> {{new Date(item.dateModified)}}</p>
                </div>
                <div class="column col-33 actions" v-if="item !== activeContractId">
                  <!-- <button class="btn inactive" @click="logIt(item)">
                    log
                  </button> -->
                  <button class="btn inactive" @click="loadDraft(item)">
                    Select
                  </button>
                  <div class="removeItem">
                    <Button
                      @click="removeDraft(item)"
                      :strokeClass="contrastMode"
                      mode="secondary"
                    >
                      <IconDelete size="small" strokeClass="dark"/>
                    </Button>
                  </div>
                </div>
              </div>
          </div>
          </transition-group>
          <div class="emptyState" v-if="!draftsArray || draftsArray.length === 0">
            <div class="small">No Drafts Saved</div>
          </div>
        </div>

      
        <div class="connectBody" v-if="selectedPanel === 'contracts'">
          <label>Previously used contracts</label>
          <div slot="content" class="content" style="width: 100%">
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
                      mode="secondary"
                    >
                      <IconDelete size="small" strokeClass="dark"/>
                    </Button>
                  </div>
                  <Button  mode="hollow" @click="goToContract(item)">
                    <IconSettings size="small" strokeClass="dark"/>
                  </Button>
                </div>
                <div class="column col-33 actions" v-if="item === activeContractId">
                  <div class="activeTag">ACTIVE</div>
                  <button mode="hollow" class="btn inative" @click="goToGallery(item)">
                    View
                  </button>
                  <div class="removeItem">
                    <Button
                      @click="removeUsedContractId(index)"
                      strokeClass="dark"
                      mode="secondary"
                      disabled
                    >
                      <IconDelete size="small" strokeClass="dark"/>
                    </Button>
                  </div>
                  <Button  mode="hollow" @click="goToContract(item)">
                    <IconSettings size="small" strokeClass="dark"/>
                  </Button>
                </div>
              </div>
            </div>
            <div class="borderTop">
              <AddContract />
<!-- <div class="row contentRow">
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
        </div> -->

            </div>
            <div class="emptyState" v-if="!usedContracts || usedContracts.length === 0">
              <div class="small">No Contracts Saved.</div>
            </div>
          </div>
        </div>
        
      
        <div class="connectBody" v-if="selectedPanel === 'following'">
          <div class="row">
            <div class="column col-75">
              <label v-if="usedContracts">Following</label>
            </div>
            <!-- <div class="column col-25" style="display: flex; justify-content: flex-end;">
              <Button @click="getAllContractsMeta" mode="hollow" >Refresh Info</Button>
            </div> -->
          </div>
          <div v-if="usedContractsObj" class="row">
            <GalleriesUserMenu
              mode="hero"
              :userAddress="walletAddress"
              :contractsArray="usedContractsObj"
              :contrastMode="contrastMode"
              :activeContractId="activeContractId"
              show="following"
              />
          </div>
          <div class="emptyState" v-if="!usedContractsObj || usedContractsObj.length === 0">
            <div class="small">No Galleries Followed. Save galleries here by clicking the heart button.</div>
          </div>
          
        </div>
      
            
  </div>
</template>
  
<style lang="scss">
  .UserPanel{
    &.connectPanel{
      margin-top: 1rem;;
    }
    width: 100%;
  }
  .emptyState{
    width: 100%;
    min-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .listWrap{
    width: 100%;
  }
  .draftRow{
    border: 1px solid var(--line-color, #111);
    padding: .5rem;
    font-size: .75rem;
    border-radius: .25rem;
    margin-bottom: .5rem;
    align-items: flex-start !important; // overrides the .between class alignment
    // background: var(--background-color, #eee);
    
    .draftDate{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      opacity: .6;
      svg{
        margin-right: .25rem;
      }
    }
    .draftDescription{
      margin: 0;
    }
    .draftCheck{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
    .actions{
      font-size: .75rem;
    }

  }

  .card {
    transition: all 0.3s ease-out;
    transform-origin: top center;
  }
  .card-enter, .card-leave-to
  /* .card-leave-active for <2.1.8 */ {
    opacity: 0;
    transform: scale(1) translateX(3rem);
  }
  .card-enter-to {
    opacity: 1;
    transform: scale(1) translateX(0rem);
  }

  .card-leave-active {
    /*position: absolute;*/
    transform: scale(1) translateX(0rem);
  }

  .card-move {
    opacity: 1;
    transition: all 0.3s ease-out;
  }

</style>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "UserData",
  props: ['selected'],
  
  data(){
     return {
       selectedPanel: 'drafts',
       hasRemovedDraft: false,
     }
   },
   mounted() {
    if(this.selected){
      this.selectedPanel = this.selected; // sets the default panel from query
    }
   },
  computed: {
    ...mapGetters({
      devMode: "ui/devMode",
      walletAddress: "ui/walletAddress",
      activeContractId: "ui/activeContractId",
      contrastMode: "ui/contrastMode",
      usedContracts: "ui/usedContracts",
      usedContractsObj: "ui/usedContractsObj",
      draftsArray: "ui/draftsArray",
    }),
  },
  methods: {
    ...mapMutations({
      getAllContractsMeta: 'ui/getAllContractsMeta',
      setActiveContractId: "ui/setActiveContractId",
      clearActiveContractId: "ui/clearActiveContractId",
      removeUsedContractId: "ui/removeUsedContractId",
    }),
    
    setSelectedPanel(newId){
      this.selectedPanel = newId;
    },
    logIt(item){
      console.log('item', item)
    },
    removeDraft(item){
      console.log('item to remove', item);
      if(!item){return}
      this.$store.dispatch("ui/updateDrafts", {data: item, action: "remove"})
        .then(() => {
          console.log('DONE')
          this.hasRemovedDraft = true;
          })
        .catch(error => console.error(error));
    },
    loadDraft(item){
      this.$router.push({
        path: `/mint?draft=${item.draftId}`,
      })
    },
    goToGallery(contractId){
      this.$router.push({
        path: `/gallery/${contractId}`,
      })
    },
    goToContract(contractId){
      const requiredNetwork = this.$config.requiredNetwork;
      const etherScanUrl = requiredNetwork === 'main' ? 'https://etherscan.io' : 'https://rinkeby.etherscan.io'
      const theUrl = `${etherScanUrl}/token/${contractId}#writeContract`
      if(window){
        window.open(theUrl, '_blank');
      }
    },
  },

}
</script>