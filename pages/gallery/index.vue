<template>
  <div class="pageContainer">
    <Header />

    <section id="gallery" class>
      <div class="tertiary">
        <label>Galleries</label>
        <p class="small">A gallery displays the tokens created by a contract.
        </p>
        <div v-if="walletAddress && usedContracts && usedContracts.length > 0 &&  1===2">
          <label>Your Contracts</label>
          <p class="small">Contracts you have created</p>
          <GalleriesUserMenu :contracts="usedContracts" mode="list" />
        </div>
      </div>
      <div class="primary">
        <h4>Load Gallery Contract</h4>
        <div class="loadContractRow row">
          <div class="column col-66">
          <input
            name="Contract Id"
            id="galleryContractId"
            class="hero"
            type="string"
            max="99"
            required
            placeholder="0xd0c402bcbcb5e70157635c41b2810b42fe592bb0"
            v-model="tempContractId"
          />
          </div>
          <div class="col-33 column">
          <Button size="large" mode="primary" @click="handleLoad(tempContractId)" :disabled="!tempContractId">
            Load Gallery
          </Button>

          </div>
        </div>
        <h4>Featured Galleries</h4>
        <GalleriesMenu mode="hero" :contrastMode="contrastMode" />
        <p class="small"><IconHelp :strokeColor="contrastMode" style="vertical-align: middle"/> Talk to us on Discord to be listed here.</p>
        <client-only>
        <div v-if="devMode">
          <div >
            <Button @click="updateUsedContractsObj({data: {
              id: '0x12345',
              name: 'test name',
              symbol: 'TEST'
            }, remove: true})"><span>test updateCOntractsObj</span>
            </Button>
          </div>
        </div>
        </client-only>
        <client-only>
        <div v-if="devMode">
          <h3>Your Contracts </h3>
          <div v-if="usedContractsObj">
            <GalleriesUserMenu mode="hero" :contractsArray="usedContractsObj" :contrastMode="contrastMode"/>
          </div>
          <div>
            <GalleriesUserMenu mode="hero" :contracts="usedContracts" :contrastMode="contrastMode"/>
          </div>
        </div>
        </client-only>
      </div>
      <div class="secondary">
        <label>Elsewhere</label>
        <GalleriesElsewhere :galleryContractId="galleryContractId" />
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'GalleryPage',
  created() {
    // this.setInitialAccount();
  },
  data() {
    return {
      tempContractId: "0xa0AfEDcC9446fD1F41706EaA4931512bDb2efAe7"
    }
  },
  computed: {
    ...mapFields('galleryStore', ['galleryContractId']),
    ...mapGetters({
      devMode: "ui/devMode",
      contrastMode: "ui/contrastMode",
      activeContractId: "ui/activeContractId",
      usedContracts: "ui/usedContracts",
      usedContractsObj: "ui/usedContractsObj",
      walletAddress: "ui/walletAddress",
      galleryContractId: 'galleryStore/galleryContractId',
      galleryAssets: 'galleryStore/galleryAssets',
      galleryStatus: 'galleryStore/galleryStatus',
      galleryDisplayMode: 'galleryStore/galleryDisplayMode',
    }),
    displayMode() {
      // return 'expanded'
      // return 'compact'
      return 'full'
    },
  },
  methods: {
    ...mapMutations({
      getItems: 'galleryStore/getItems',
      setGalleryDisplayMode: 'galleryStore/setGalleryDisplayMode',
      setUsedContractsObj: 'ui/setUsedContractsObj',
    }),
    ...mapActions({
      updateUsedContractsObj: 'ui/updateUsedContractsObj',
    }),
    handleLoad(contractId) {
      if(!contractId){return}
      console.log('$nuxt._router', $nuxt._router)
      console.log('contractId', contractId)
      
      $nuxt._router.push({ path: `/gallery/${contractId}`});
    },
    setInitialAccount() {
      setTimeout(() => {
        this.tempContractId = this.activeContractId
      }, 800);
    }
  },
}
</script>

<style lang="scss">
.linkRow {
  padding: 20px;
  min-height: 100px;
  justify-content: center;
  align-items: center;
}
.loadingWrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.loadContractRow {
  flex-basis: auto;
  // padding: 1rem 0;
  flex-direction: row;
  justify-content:center;
  align-items: center;
  // background: var(--line-color, #eee);
  // border-radius: .5rem;
  // padding: .5rem;
  #galleryContractId{
    background: var(--fill-color);
    border: 0px solid;
    
  }
  input#galleryContractId{
    width: 100%;
    padding-left: 1rem;
    border-radius: 1rem 0 0 1rem ;
    &:focus, &:active{
      box-shadow: 0px 0px 0 2px var(--ui-color, #111) inset;
    }
  }
  button, button.btn.large{
    margin-left: 0rem;
    border-radius: 0 1rem 1rem 0;
    font-size: 1rem;
    padding: 0.75rem 1rem;
  }
  
}
figure {
  margin: 0.25rem;
  background: var(--line-color, rgba(0, 0, 0, 0.05));
  display: inline-block;
  padding: 0.25rem;
  vertical-align: top;
}
</style>
