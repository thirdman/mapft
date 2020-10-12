<template>
  <div
    id="previewWrap"
    class="column previewColumn shadow"
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
</template>

<style></style>
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
