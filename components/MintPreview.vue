<template>
  <div class="column previewColumn">
    <div
      id="previewWrap"
      class="previewWrap shadow"
      :class="previewMode"
      v-if="activeContractId"
    >
      <div class="preview">
        <div class="hashPreview" v-if="tokenPreviewData.tokenPreviewMode === 'hash'">
          <RenderImage
            v-if="tokenPreviewData.fileArweaveHash"
            :src="tokenPreviewData.fileArweaveHash"
            :optimisedSrc="`${imageOptimizationUrl}https://arweave.net/${tokenPreviewData.fileArweaveHash}/?width=200}`"
            :thumbnailSrc="`${imageOptimizationUrl}https://arweave.net/${tokenPreviewData.fileArweaveHash}/?width=200`"
            :hasImageOptimization="true"
            resolution="thumbnail"
          />
        </div>
        <div
          id="output"
          class="previewImage"
          :class="tokenPreviewData.fileName ? 'hasImage' : 'noImage'"
          :style="`${tokenPreviewData.tokenPreviewMode === 'hash' ? 'opacity: 0; position: absolute; z-index: -1;' : ''}`"
        >
          <img
            :src="`https://arweave.net/${tokenPreviewData.thumbnailArweaveHashDefault}`"
            v-if="!tokenPreviewData.fileName"
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
              <div id="preview_title">{{ tokenPreviewData && tokenPreviewData.title }}</div>
            </div>
            <div class="previewElement artistName">
              <label>By</label>
              <div id="preview_artistName">
                {{ tokenPreviewData && tokenPreviewData.authorName }}
              </div>
            </div>
          </div>
          <div class="previewElement artistNote">
            <label>Description</label>
            <div id="preview_artistNote">
              {{ tokenPreviewData && tokenPreviewData.description }}
            </div>
          </div>
          <div class="row">
            <div class="previewElement col-50 royaltyFee">
              <label>Royalty</label>
              <div>
                <span id="preview_royaltyFee">
                  {{ tokenPreviewData && tokenPreviewData.royaltyFee }} </span
                >%
              </div>
            </div>
            <div class="previewElement col-50 editionsCount">
              <label>Editions</label>
              <div id="preview_editionsCount">
                {{ tokenPreviewData && tokenPreviewData.editions }}
              </div>
            </div>
          </div>
          <div class="previewElement col-100 series" v-if="tokenPreviewData.series">
            <label>Series</label>
            <div>
              <span id="preview_series">
                {{ tokenPreviewData && tokenPreviewData.series }}
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
            <p class="xsmall clamp" ><a :href="`https://ipfs.io/ipfs/${fileIpfsHash}`" target="_blank" v-if="fileIpfsHash" style="display: inline-block"><IconExternalLink size="small" :strokeClass="contrastMode" /></a>
            {{fileIpfsHash}}</p>
          </div>
          <div class="formItem">
            <label>File Arweave Hash</label>
            <p class="xsmall clamp" >
            <a :href="`https://arweave.net/${fileArweaveHash}`" target="_blank" v-if="fileArweaveHash" style="display: inline-block"><IconExternalLink size="small" :strokeClass="contrastMode"/></a>
            {{fileArweaveHash}}</p>
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
            <a :href="`https://arweave.net/${thumbnailArweaveHash}`" target="_blank" v-if="thumbnailArweaveHash"><IconExternalLink size="small" /></a>
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
  position: absolute;
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
      contrastMode: "ui/contrastMode",
      activeContractId: "ui/activeContractId",
      imageOptimizationUrl: "ui/imageOptimizationUrl",
      tokenPreviewMode: "mintFormStore/tokenPreviewMode",
      tokenPreviewData: "mintFormStore/tokenPreviewData",
      showThumbnailField: "mintFormStore/showThumbnailField",
      fileIpfsHash: "mintFormStore/fileIpfsHash",
      thumbnailIpfsHash: "mintFormStore/thumbnailIpfsHash",
      fileArweaveHash: "mintFormStore/fileArweaveHash",
      thumbnailArweaveHash: "mintFormStore/thumbnailArweaveHash",
    }),
    // tokenPreviewData() {
    // return this.$store.state.mintFormStore.tokenPreviewData
    // },
  },
};
// ...mapGetters({
// tokenPreviewData: 'mintFormStore/tokenPreviewData',
// }),
</script>
