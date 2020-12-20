<template>
    
  <div :class="`UserPanel connectPanel shadow`">
      <div class="connectSelect row">
        <div class="column" :class="selectedPanel === 'drafts' ? 'selected' : 'notselected' "
          @click="setSelectedPanel('drafts')"
        >
          <h4>Drafts</h4>
          <!-- <p class="small">Mint data you have saved</p> -->
        </div>
        <div class="column" :class="selectedPanel === 'contracts' ? 'selected' : 'notselected' "
          @click="setSelectedPanel('contracts')"
        >
          <h4>Contracts</h4>
          <!-- <p class="small">Your contracts</p> -->
        </div>
        <div class="column" :class="selectedPanel === 'following' ? 'selected' : 'notselected' "
          @click="setSelectedPanel('following')"
        >
          <h4>Following</h4>
          <!-- <p class="small">Galleries You follow</p> -->
        </div>
      </div>
      <transition name="fade" appear>
        <div class="connectBody"  v-if="selectedPanel === 'drafts'">
          <label>Drafts</label>
          <div v-for="(item, index) in draftsArray" :key="index" class="listWrap">
              <div class="row between draftRow">
                <div class="column col-66" style="flex-direction: column; align-items: flex-start;">
                  <h6>{{ item.data.imageName || item.draftId }}</h6>
                  <p class="small draftDescription">{{item.data.artistNote}}</p>
                  <div class="row">
                    <span class="column col-50 draftCheck">IPFSHash
                      <IconCheck size="small" :strokeClass="contrastMode" v-if="item.data.fileIPFSHash"/>
                      <IconClose size="small" strokeClass="danger" v-if="!item.data.fileIPFSHash"/>
                    </span>
                    <span class="column col-50 draftCheck" >ArweaveHash
                      <IconCheck size="small" :strokeClass="contrastMode" v-if="item.data.fileArweaveHash"/>
                      <IconClose size="small" strokeClass="danger" v-if="!item.data.fileArweaveHash"/>
                    </span>
                  </div>
                </div>
                <div class="column col-33 actions" v-if="item !== activeContractId">
                  <button class="btn inactive" @click="logIt(item)">
                    log
                  </button>
                  <button class="btn inactive" @click="loadDraft(item)">
                    Select
                  </button>
                </div>
                <!-- 
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
                </div> -->
              </div>
            </div>
        </div>

      </transition>
      <transition name="fade" appear>
        <div class="connectBody" v-if="selectedPanel === 'contracts'">
          <label>Previously used contracts</label>
          <div slot="content" class="content">
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
        </div>
        
      </transition>
      <transition name="fade" appear>
        <div class="connectBody" v-if="selectedPanel === 'following'">
          <div v-if="walletAddress" class="row NewFormRow">
            folowing
          </div>
        </div>
      </transition>
            
  </div>
</template>
  
<style lang="scss">
  .UserPanel{
    width: 100%;
  }
  .listWrap{
    width: 100%;
  }
  .draftRow{
    border: 1px solid var(--line-color, #111);
    padding: .25rem;
    font-size: .75rem;
    border-radius: .25rem;;
    .draftDescription{
      margin: 0;
    }
    .draftCheck{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }

  }

</style>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "UserData",
  // props: ['selectedPanel'],
  
  data(){
     return {
       selectedPanel: 'drafts'
     }
   },
   mounted() {

   },
  computed: {
    ...mapGetters({
      devMode: "ui/devMode",
      walletAddress: "ui/walletAddress",
      activeContractId: "ui/activeContractId",
      contrastMode: "ui/contrastMode",
      usedContracts: "ui/usedContracts",
      draftsArray: "ui/draftsArray",
    }),
  },
  methods: {
    ...mapMutations({
      
    }),
    setSelectedPanel(newId){
      this.selectedPanel = newId;
    },
    logIt(item){
      console.log('item', item)
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
    }
  },

}
</script>