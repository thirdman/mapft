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
          autoCropArea="0.95"
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
    // ...mapMutations({
    //   // setCropperModalMode: 'ui/setCropperModalMode',
    // }),
    ...mapActions({
      showCropperModal: 'mintFormStore/showCropperModal',
    }),
    handleCropperModal(newState) {
        this.$store.commit('mintFormStore/setShowCropper', newState)
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
    handleApplyCrop(event) {
      console.log("apply crop", event);

      const thumbnailElement = document.getElementById("outputThumbnailImage");
      const outputElement = document.getElementById("output");
      const previewImageElement = document.getElementById("output").firstChild;
      console.log("outputElement", outputElement);
      console.log("previewImageElement", previewImageElement);
      if (thumbnailElement && thumbnailElement.src) {
        const newImage = thumbnailElement.src;
        const mimeType = getMimeType(newImage);
        const fileExtension = mimeType.replace("image/", "");
        const fileName = `thumbnail.${fileExtension}`;
        const thumbnailAsFile = dataURLtoFile(newImage, fileName);
        startUploadThumbnailProcess(thumbnailAsFile, this, "thumbnail");
        this.$store.commit("mintFormStore/setShowCropper", false);
        this.destroyCropper();

        // setClass('cropContainer', "hidden", "visible");
      } else {
        console.error("no crop image");
      }
    },
    handleCropResult(croppedImage) {
      console.log('cropped!', croppedImage)
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
