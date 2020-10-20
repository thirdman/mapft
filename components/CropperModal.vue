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
      
      <div class="cropContainer" id="cropContainer" style='max-width: 300px'>
        <vue-cropper
          ref="cropper"
          :src="thumbnailSource"
          alt="Source Image"
          :aspectRatio="1 / 1"
          :viewMode="2"
          v-if="thumbnailSource"
          @crop="crop"
          @ready="cropReady"
          @cropend="cropEnd"
        >
        </vue-cropper>
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

<style>
.row.between {
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.vm--overlay {
  background: var(--ui-color, #111);
  opacity: 0.6;
}
.vm--modal {
  box-shadow: 4px 4px 0px -2px var(--ui-color),
    0 20px 60px -2px rgba(27, 33, 58, 0.4);
}
.top-right {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 20;
}

.modal-content {
  background: var(--background-color, #eee);
  color: var(--ui-color, #111);
  border: 2px solid var(--ui-color, #111);
}
</style>
