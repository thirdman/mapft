<!-- accepted-file-types="image/jpeg, image/png" -->
<template>
  <div class="FileUpload" :class="mode">
    <client-only>
      <file-pond
        name="test"
        ref="pond"
        label-idle="Drop files or click to select..."
        :disabled="disabled"
        :allow-multiple="allowMultiple"
        :files="files"
        :labelIdle="labelIdle"
        @init="handleFilePondInit"
        :onaddfile="handleAddFile"
        :onupdatefiles="handleUpdateFiles"
      />
    </client-only>
  </div>
</template>

<style>
.FileUpload {
  margin-bottom: 1rem;
}
</style>
<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import vueFilePond from "vue-filepond";
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
// import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import "filepond/dist/filepond.min.css";
const FilePond = vueFilePond();
const imageTypes = ["jpg", "png", "gif"];

export default {
  props: {
    mode: { type: String, default: "file" },
    labelIdle: {type: String, default: "Drag & Drop your file or <span class='filepond--label-action'> Browse </span>"},
    server: { type: Object },
    // ipfsStatus: { type: String },
    // arweaveStatus: { type: String },
    fileTypes: { type: Array, default: () => ["jpg", "png", "gif"] },
    allowMultiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    // files: { type: Array },
    // setUploadStatus: { type: Function },
    renderImage: { type: Function },
    setFileInfo: { type: Function },
    handleAddFile: { type: Function },
    onRequestSave: { type: Function },
    onRequestClear: { type: Function },
  },
  components: {
    // VueCropper,
    FilePond,
  },
  data() {
    return {
      files: [],
      // mode: props.mode || "file",
    };
  },
  computed: {
    ...mapGetters({
      contrastMode: "ui/contrastMode",
    }),
  },
  methods: {
    handleFilePondInit: function () {
      // Utility in case we need to hook in when the upload component is enabled
      // FilePond instance methods are available on `this.$refs.pond`
      // console.log("this.$refs.pond", this.$refs.pond);
      console.log("FILEPOND init");
      console.log("FILEPOND files: ", this.files);
    },
    handleUpdateFiles: function (fileItems) {
      if (fileItems.length === 0) {
        this.$props.onRequestClear(this.$props.mode, null);
        this.files = [];
      }
      console.log("onupdate files", fileItems);
      const newFiles = fileItems.map((fileItem) => fileItem.file);
      console.log("onupdate newFiles", newFiles);
      this.files = newFiles;
      // setFiles(newFiles);
    },
    // handleAddFile: function (error, file) {
    //   console.group("handleaddfile");
    //   console.log("props", this.$props);
    //   console.log("error", error);
    //   console.log("file", file);
    //   console.log("this", this);
    //   console.groupEnd();
    //   if (error) {
    //     this.$props.setUploadStatus({ mode: "file", status: "noFile" });
    //     console.error("error: ", error);
    //   }

    //   console.log("fileloaded", file);
    //   const fileName = file.filename;
    //   const fileType = fileName.split(".").pop().toLowerCase();
    //   const fileExtension = file.fileExtension;
    //   console.log("fileName", fileName);
    //   console.log("fileType", fileType);
    //   console.log("fileExtension", fileExtension);
    //   this.$props.renderImage(
    //     fileType,
    //     window.URL.createObjectURL(file.file),
    //     "output"
    //   );
    //   this.$props.setFileInfo({ fileName, fileType });
    //   this.toggleThumbnail(fileType);
    //   console.log("would trigger upload process", this.triggerUploadProcess);
    //   processUpload({
    //     mode: "file",
    //     context: this,
    //     file: file.file,
    //     inputElement: file,
    //   });
    // },
  },
};
</script>


