<template>
  <div class="UploadStatus" :class="displayMode">
    <!-- <div class="help" v-if="!title">No file selected</div> -->
    <div 
      v-if="title"
      class="row uploadStatusWrap statusBox"
      :class="`${displayMode === 'inline' ? 'nope' : 'shadow'} test`"
    >
      <div id="uploadStatus">
        <div class="status-box">
          <span id="file-status-box-icon"></span>
          <span id="file-status-box-subtitle" class="subtitle"><strong>{{
            title || "No file selected"
          }}</strong></span>
        </div>
        <div
          id="file-status-subtitle-ipfs"
          class="subtitle statusRow"
          :class="ipfsStatus"
          v-if="ipfsStatus"
        >
          <div
            class="status-icon"
            :class="ipfsStatus === 'uploaded' ? 'complete' : ''"
          ></div>
          {{ ipfsStatus === "uploading" ? `Saving to IPFS... ${ipfsProgress && ipfsProgress + '%'}` : `Ipfs File ${ipfsStatus}` }}
          <a :href="`https://ipfs.io/ipfs/${ipfsHash}`" target="blank" v-if="ipfsHash">link</a>
          
        </div>
        <ProgressBar
          :percentage="ipfsProgress"
          v-if="ipfsProgress && ipfsStatus !== 'uploaded'"
          :showNumber="false"
          />
        <div
          id="file-status-subtitle-arweave"
          class="subtitle statusRow"
          :class="arweaveStatus"
          v-if="arweaveStatus"
        >
          <div
            class="status-icon"
            :class="arweaveStatus === 'uploaded' ? 'complete' : ''"
          ></div>
          {{
            arweaveStatus === "uploading"
              ? `Saving to Arweave... ${arweaveProgress && arweaveProgress + '%'}`
              : `Arweave File ${arweaveStatus}`
          }}
          <a :href="`https://arweave.net/${arweaveHash}`" target="blank" v-if="arweaveHash">link</a>
        </div>
          <ProgressBar
          :percentage="arweaveProgress"
          v-if="arweaveProgress && arweaveStatus !== 'uploaded'"
          :showNumber="false"
          />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.UploadStatus{
  // margin-top: .5rem;
  &.inline{
    .status-box{
      color: var(--ui-color, #eee);
    }
    .uploadStatusWrap{
      background: transparent;
      border: none;
      color: var(--background-color, #eee);
    }
  }
  .subtitle.statusRow{
    padding: .25rem;
    display: block;
    color: var(--ui-color, #eee) !important;
    &.uploaded{
      // background: var(--success-color, lime);
      border-radius: .25rem;
      color: var(--ui-color, #eee) !important
    }
  }
  
}
</style>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  props: ["displayMode", "title", "ipfsStatus", "arweaveStatus", "ipfsHash", "arweaveHash", "ipfsProgress", "arweaveProgress"],
  computed: {
    ...mapGetters({
      statusModalMode: 'ui/statusModalMode',
    }),
  }
};
</script>
