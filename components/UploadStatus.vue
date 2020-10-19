<template>
  <div>
    <div class="help" v-if="!title">No file selected</div>
    <div class="row uploadStatusWrap statusBox shadow" v-if="title">
      <div id="uploadStatus">
        <div class="status-box">
          <span id="file-status-box-icon"></span>
          <span id="file-status-box-subtitle" class="subtitle">{{
            title || "No file selected"
          }}</span>
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
          {{ ipfsStatus === "uploading" ? "Saving to IPFS..." : ipfsStatus }}
        </div>
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
              ? "Saving to Arweave..."
              : arweaveStatus
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  props: ["title", "ipfsStatus", "arweaveStatus"],
};
</script>
