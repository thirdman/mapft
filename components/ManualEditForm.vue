<template>
  <div class="ManualEditForm">    
    <div
      class="fieldset contractContent"
    >
    <p class="small">Manually entering file hash locations will override files uploaded using the upload form.</p>
    
      <ValidationProvider rules="">
        <div
          class="formItem"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>IPFS Hash</label>
          <div class="inputRow row">
            <input
              name="temporaryIpfsHash"
              oldId="j"
              id="temporaryIpfsHash"
              class="base-input"
              type="string"
              max="99"
              placeholder="Eg. 0x1235..."
              v-model="temporaryIpfsHash"
            />
            <transition name="fade" appear>
            <button
              @click="clearIpfsHash()"
              class="btn iconButton closeButton"
              tabindex="-1"
              v-if="temporaryIpfsHash"
            >
              <IconClose
                :strokeClass="contrastMode"
              />
            </button>
            </transition>
            <div>
              <span class="validationMessage">{{ errors && errors[0] }}</span>
            </div>
          </div>
          <FormItemHelp
            required="true"
            message="The hash of a file you have previously uploaded to IPFS."
          />
        </div>
      </ValidationProvider>
      <div class="manualPreview" v-if="temporaryIpfsHash">
        
        <div class="thumbnailPreviewRow">
          <div class="column col-33">
            <RenderImage
              v-if="temporaryIpfsHash"
              :src="temporaryIpfsHash"
              :optimisedSrc="`${imageOptimizationUrl}https://gateway.pinata.cloud/ipfs/${temporaryIpfsHash}/?width=200}`"
              :thumbnailSrc="`${imageOptimizationUrl}https://gateway.pinata.cloud/ipfs/${temporaryIpfsHash}/?width=200`"
              :hasImageOptimization="true"
              resolution="thumbnail"
            />
          </div>
          <div class="actions column col-66">
            <label>Preview</label>
        <div v-if="temporaryIpfsHash" class="small">
          <p class="xsmall help">This can take some time to load if the file is large.</p>
          <!-- <p class="xsmall">{{temporaryIpfsHash}}</p> -->
        </div>
            <Button
                mode="hollow"
                size="small"
                @click="openLink(`https://ipfs.io/ipfs/${temporaryIpfsHash}`)">
                <IconExternalLink size="small" :strokeClass="contrastMode" /> View on Ipfs
              </Button>
          </div>
        </div>
      </div>

      <ValidationProvider rules="">
        <div
          class="formItem"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Arweave Hash</label>
          <div class="inputRow row">
            <input
              name="temporaryIpfsHash"
              oldId="j"
              id="temporaryIpfsHash"
              class="base-input"
              type="string"
              max="99"
              placeholder="Eg. 0x1235..."
              v-model="temporaryArweaveHash"
            />
            <transition name="fade" appear>
              <button
                v-if="temporaryArweaveHash"
                @click="clearArweaveHash()"
                class="btn iconButton closeButton"
                tabindex="0"
              >
                <IconClose
                  :strokeClass="contrastMode"
                />
              </button>
            </transition>
            <div>
              <span class="validationMessage">{{ errors && errors[0] }}</span>
            </div>
          </div>
          <FormItemHelp
            required="true"
            message="The hash of a file you have previously uploaded to Arweave."
          />
        </div>
      </ValidationProvider>
      <div class="manualPreview" v-if="temporaryArweaveHash">
        
        
        <div class="thumbnailPreviewRow row">
          <div class="column col-33">
            <RenderImage
              v-if="temporaryArweaveHash"
              :src="temporaryArweaveHash"
              :optimisedSrc="`${imageOptimizationUrl}https://arweave.net/${temporaryArweaveHash}/?width=200}`"
              :thumbnailSrc="`${imageOptimizationUrl}https://arweave.net/${temporaryArweaveHash}/?width=200`"
              :hasImageOptimization="true"
              resolution="thumbnail"
            />
          </div>
          <div class="actions column col-66">
            <label>Preview </label>
          <div v-if="temporaryArweaveHash" class="small">
            <p class="xsmall help">This can take some time to load if the file is large.</p>
            <!-- <p class="xsmall">{{temporaryArweaveHash}}</p> -->
          </div>
            <Button 
              mode="hollow"
              size="small"
              @click="openLink(`https://arweave.net/${temporaryArweaveHash}`)"
              ><IconExternalLink size="small" :strokeClass="contrastMode" /> View on Arweave
            </Button>
          </div>
        </div>
      </div>
      <div class="actions">
        <Button
          full
          mode="primary"
          size="large"
          :disabled="canWeApply()"
          @click="applyManualData"
        >
          Apply Data
        </Button>
        <Button
          mode="hollow"
          @click="cancelManualEdit()"
        >
          Cancel
        </Button>
      </div>
    </div>
    </div>
    
</template>

<style lang="scss">
.ManualEditForm{
  flex-basis: 100%;
  width: 100%;
  .inputRow{
    .closeButton{
      position: absolute;
      right: .5rem;
      margin-top: .5rem;
    }
  }
  .manualPreview{
    border: 1px solid var(--line-color, #eee);
    background: var(--light-color, #eee);
    padding: .5rem;
    border-radius: .5rem;
    .thumbnailPreviewRow{
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;;
    }
    .imageItem.tokenImageThumbnail.thumbnail{
      max-width: 100px;
      max-height: 100px;
      object-fit: contain;
    }
  }
}
</style>

<script>
import { mapFields } from "vuex-map-fields";
import { mapMutations, mapGetters } from "vuex";
import { ValidationProvider, extend } from "vee-validate";
import { required, min, max } from "vee-validate/dist/rules";

extend("min", {
  // (value) => {
  ...min,
  // return value.length >= 3
});
extend("max", {
  ...max,
});
extend("required", {
  ...required,
  message: "This field is required",
});

export default {
  components: {
    ValidationProvider,
  },
  data() {
    return {
      temporaryIpfsHash: "",
      temporaryArweaveHash: "",
      // These are the validation arrays
      errors: [],
      classes: [],
    };
  },
  computed: {
    ...mapGetters({
      // ui
      devMode: "ui/devMode",
      contrastMode: "ui/contrastMode",
      imageOptimizationUrl: 'ui/imageOptimizationUrl',
      }),
    ...mapFields("mintFormStore", [
      "temporaryIpfsHashNOTE",
      "temporaryArweaveHashNOT",
    ]),
  },
  methods: {
    ...mapMutations({
      setShowManualEdit: "mintFormStore/setShowManualEdit",
      // setManualData: "mintFormStore/setManualData",
    }),
    cancelManualEdit(){
      this.$modal.hide("manual-modal");
    },
    canWeApply(){
      if(!!this.temporaryIpfsHash || !!this.temporaryArweaveHash){
        return false
      } else {
        return true
      }
    },
    clearIpfsHash(){
      this.temporaryIpfsHash = ""
    },
    clearArweaveHash(){
      this.temporaryArweaveHash = ""
    },
    applyManualData(){
      const manualData = {
        fileIPFSHash: this.temporaryIpfsHash,
        fileArweaveHash: this.temporaryArweaveHash,
      }
      this.$store.dispatch('mintFormStore/applyManualData', manualData);
      this.$modal.hide("manual-modal");
    },
    openLink(url){
      window && window.open(url);
    },
    // handleAccountModal() {
    //   this.$modal.show("account-modal");
    // },

  },
};
</script>
