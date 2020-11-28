<template>
  <modal
    name="cropper-modal"
    class="account-modal"
    :adaptive="true"
    :min-width="200"
    :min-height="200"
    :scrollable="false"
    :reset="true"
    width="400px"
    height="auto"
    :focus-trap="true"
    :clickToClose="true"
  >
    <div class="modal-content">
      <div class="modalSection">
      <label>Crop Thumbnail</label>
      
      <div class="cropContainer" id="cropContainer" :class="cropStatus">
        <vue-cropper
          ref="cropper"
          :src="thumbnailSource"
          alt="Source Image"
          :aspectRatio="1 / 1"
          :viewMode="2"
          v-if="thumbnailSource"
          :autoCropArea="0.95"
          @crop="crop"
          @ready="cropReady"
          @cropend="cropEnd"
        >
        </vue-cropper>
        <div class="cropLoadingWrap" v-if="cropStatus === 'loading'">
          <Loading size="large" />
        </div>
      </div>
      <Button
        class="dark"
        size="large"
        :fill="true"
        :disabled="!cropOutputSource"
        @click="handleApplyCrop"
        >Apply</Button
      >
    </div>
    </div>
  </modal>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import {
  openFile,
  openThumbnail,
  processUpload,
  startUploadProcess,
  startUploadThumbnailProcess,
  personalSignFiles,
  pinFiletoIPFS,
  pinThumbnailFileToIPFS,
  removePinFromIPFS,
  getMimeType,
  dataURLtoFile,
} from "../utils/files.js";

export default {
  name: 'CropperModal',
  components: {
    VueCropper,
   
  },
  data() {
    return {
      cropStatus: "loading",
    }
  },
  computed: {
    // devMode() {
    //   return this.$store.state.ui.devMode
    // },
    ...mapGetters({
      // cropperModalMode: 'ui/statusModalMode',
      showCropper: 'mintFormStore/showCropper',
      thumbnailSource: "mintFormStore/thumbnailSource",
      cropOutputSource: "mintFormStore/cropOutputSource",
      
    }),
  },
  methods: {
    personalSignFiles,
    pinThumbnailFileToIPFS,
    removePinFromIPFS,
    ...mapMutations({
      setThumbnailUploadStatus: "mintFormStore/setThumbnailUploadStatus",
      setProgress: "mintFormStore/setProgress",
      setArweaveStatus: "mintFormStore/setArweaveStatus",
      setArweaveHash: "mintFormStore/setArweaveHash",
      setIpfsStatus: "mintFormStore/setIpfsStatus",
      setIpfsHash: "mintFormStore/setIpfsHash",
      setUploadStatus: "mintFormStore/setUploadStatus",
    }),
    ...mapActions({
      showCropperModal: 'mintFormStore/showCropperModal',
      arUploadFile: "arweaveStore/arUploadFile",
    }),
    handleModal(newState) {
      console.log('this.$modal', this.$modal)
      this.$modal.hide("cropper-modal");
    },
    crop(event) {
      console.log(event.detail.x);
    },
    cropEnd(event) {
      // console.log('this', this)
      // console.log('this.$refs.cropper', this.$refs.cropper)
      const cropper = this.$refs.cropper;
      if (!cropper) {
        return null;
      }
      const cropResult = cropper.getCroppedCanvas({
        width: 500,
        height: 500,
      });
      const image = cropResult.toDataURL("image/png");
      this.handleCropResult(image);
    },
    cropReady: function (item) {
      console.log("ready: ");
      // console.log('this', this)
      // console.log('this.$refs.cropper', this.$refs.cropper)
      const cropper = this.$refs.cropper;
      if (!cropper) {
        return null;
      }
      const cropResult = cropper.getCroppedCanvas({
        width: 500,
        height: 500,
      });
      const image = cropResult.toDataURL("image/png");
      this.cropStatus = "ready"
      this.handleCropResult(image);
    },
    handleApplyCrop() {
      
      // temp set the context to be mint form instead of cropper
      // TODO: this can be handled more nicer!
      const tempContext = {
        setThumbnailUploadStatus: this.setThumbnailUploadStatus,
        personalSignFiles: this.personalSignFiles,
        setArweaveStatus: this.setArweaveStatus,
        setArweaveHash: this.setArweaveHash,
        setIpfsStatus: this.setIpfsStatus,
        setIpfsHash: this.setIpfsHash,
        showCropper: this.showCropper,
        setProgress: this.setProgress,
        setUploadStatus: this.setUploadStatus,
        removePinFromIPFS: this.removePinFromIPFS,
        arUploadFile: this.arUploadFile
      }
      
      // SET THE PRVIEW
      // TODO: refactor this into another function as
      // it diesn't really belong in here,
      // combine with 'handleCropResult()' below
      const thumbnailElement = document.getElementById("outputThumbnailImage");
      const outputElement = document.getElementById("output");
      const previewImageElement = document.getElementById("output").firstChild;      
      if (!thumbnailElement ||  thumbnailElement && !thumbnailElement.src) {
        console.error("no crop image");
      }

      const newImage = thumbnailElement.src;
      const mimeType = getMimeType(newImage);
      const fileExtension = mimeType.replace("image/", "");
      const fileName = `thumbnail.${fileExtension}`;
      const thumbnailAsFile = dataURLtoFile(newImage, fileName);
      this.$store.commit("mintFormStore/setShowCropper", false);
      this.$modal.hide('cropper-modal')
      // startUploadThumbnailProcess(thumbnailAsFile, tempContext, "thumbnail");
      processUpload({
          mode: "thumbnail",
          context: tempContext,
          file: thumbnailAsFile,
          // inputElement: file,
        }).catch((error) => {
          alert(error);
        });
      
    },
    handleCropResult(croppedImage) {
      // console.log('cropped!', croppedImage)
      this.$store.commit('mintFormStore/setCropOutputSource', croppedImage)
      const thumbnailElement = document.getElementById("outputThumbnailImage");
      if (thumbnailElement) {
        thumbnailElement.src = croppedImage;
      }
    },
  },
}
</script>

<style lang="scss">

.cropContainer{
  position: relative;
  &.loading{
    .cropLoadingWrap{
      opacity: .7;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: var(--fill-color, #111);
      display: flex;
      align-items: center;
      justify-content: center;
      
    }
  }
  &.ready{
    .cropLoadingWrap{
      display: none;
    }
  }
}
</style>
