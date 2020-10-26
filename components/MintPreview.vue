<template>
  <div class="column previewColumn">
    <div
      id="previewWrap"
      class="previewWrap shadow"
      :class="previewMode"
    >
      <div class="preview">
        <div
          id="output"
          class="previewImage"
          :class="previewData.fileName ? 'hasImage' : 'noImage'"
        >
          <img
            :src="`https://gateway.pinata.cloud/ipfs/${previewData.thumbnailIpfsHashDefault}`"
            v-if="!previewData.fileName"
          />
        </div>
        <div class="assetPills">
          <div class="assetPill">
            <div class="assetPillImage">
              <img src />
            </div>
            <span>InfinFT</span>
          </div>
        </div>
        <div class="previewContent">
          <div class="row">
            <div class="previewElement title col-50">
              <label>Title</label>
              <div id="preview_title">{{ previewData && previewData.title }}</div>
            </div>
            <div class="previewElement artistName">
              <label>By</label>
              <div id="preview_artistName">
                {{ previewData && previewData.authorName }}
              </div>
            </div>
          </div>
          <div class="previewElement artistNote">
            <label>Description</label>
            <div id="preview_artistNote">
              {{ previewData && previewData.description }}
            </div>
          </div>
          <div class="row">
            <div class="previewElement col-50 royaltyFee">
              <label>Royalty</label>
              <div>
                <span id="preview_royaltyFee">
                  {{ previewData && previewData.royaltyFee }} </span
                >%
              </div>
            </div>
            <div class="previewElement col-50 editionsCount">
              <label>Editions</label>
              <div id="preview_editionsCount">
                {{ previewData && previewData.editions }}
              </div>
            </div>
          </div>
          <div class="previewElement col-100 series" v-if="previewData.series">
            <label>Series</label>
            <div>
              <span id="preview_series">
                {{ previewData && previewData.series }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- preview toggle -->
      <div class="row previewToggle">
        <div class="col-50" @click="previewMode = 'infinft'">InfiNFT</div>
        <div class="col-50" @click="previewMode = 'opensea'">Opensea</div>
      </div>
      <div
        id="previewThumbnailContainer"
        class="previewThumbnailContainer shadow"
        v-if="showThumbnailField"
      >
        <label>Thumbnail</label>
        <div id="outputThumbnail" class="previewThumbnail">
          <img id="outputThumbnailImage" src alt />
        </div>
      </div>
    </div>
    <div class="additionalMetaPreview">
      <ToggleSection v-if="fileIpfsHash">
        <span slot="header">File Meta</span>
        <div slot="content">
          <div class="formItem">
            <label>File IPFS Hash</label>
            <p class="xsmall clamp" >{{fileIpfsHash}}</p>
            <a :href="`https://ipfs.io/ipfs/${fileIpfsHash}`" target="_blank" v-if="fileIpfsHash"><IconExternalLink size="small" /></a>
          </div>
          <div class="formItem">
            <label>File Arweave Hash</label>
            <p class="xsmall clamp" >{{fileArweaveHash}}</p>
            <a :href="`https://ipfs.io/ipfs/${fileArweaveHash}`" target="_blank" v-if="fileArweaveHash"><IconExternalLink size="small" /></a>
          </div>
        </div>
      </ToggleSection>
      <ToggleSection v-if="thumbnailIpfsHash">
        <span slot="header">Thumbnail Meta</span>
        <div slot="content">
          <div class="formItem">
            <label>Thumbnail IPFS hash </label>
            <p class="xsmall clamp" >{{thumbnailIpfsHash}}</p>
            <a :href="`https://ipfs.io/ipfs/${thumbnailIpfsHash}`" target="_blank" v-if="thumbnailArweaveHash"><IconExternalLink size="small" /></a>
          </div>
          <div class="formItem">
            <label>Thumbnail Arweave Hash</label>
            <p class="xsmall clamp" >{{thumbnailArweaveHash}}</p>
            <a :href="`https://arweave.rocks/${thumbnailArweaveHash}`" target="_blank" v-if="thumbnailArweaveHash"><IconExternalLink size="small" /></a>
          </div>
        </div>
      </ToggleSection>
    </div>
  </div>
</template>

<style>
.additionalMetaPreview{
  overflow: hidden;
  width: 100%;
  padding-left: .5rem;
  margin-top: 1rem;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      previewMode: "infinft",
    };
  },

  computed: {
    ...mapGetters({
      previewData: "mintFormStore/previewData",
      showThumbnailField: "mintFormStore/showThumbnailField",
      fileIpfsHash: "mintFormStore/fileIpfsHash",
      thumbnailIpfsHash: "mintFormStore/thumbnailIpfsHash",
      fileArweaveHash: "mintFormStore/fileArweaveHash",
      thumbnailArweaveHash: "mintFormStore/thumbnailArweaveHash",
    }),
    // previewData() {
    // return this.$store.state.mintFormStore.previewData
    // },
  },
};
// ...mapGetters({
// previewData: 'mintFormStore/previewData',
// }),
</script>
