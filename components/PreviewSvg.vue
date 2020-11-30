<template>

<div class="column previewColumn svgPreviewColumn">
<div
      id="previewWrap"
      class="previewWrap shadow"
    >
  <div class="preview svgPreview border">
    <div
      id="svgPreveiw"
      class="svgPreviewWrap"
      v-html="code"
    />
     <div class="previewContent">
          <div class="row">
            <div class="previewElement title col-50">
              <label>Title</label>
              <div id="preview_title">{{ previewData && previewData.svgTitle }}</div>
            </div>
            <div class="previewElement">
              <label>By</label>
              <div id="preview_artistName">
                {{ previewData && previewData.svgCreator }}
              </div>
            </div>
            
          </div>
          <div class="previewElement">
            <label>Description</label>
            <div id="preview_artistNote">
              {{ previewData && previewData.svgDescription }}
            </div>
          </div>
          <div class="previewElement">
            <label>Character Length</label>
            <div >
              {{previewBytes}} / <strong>Ξ</strong>{{calculatedFee}} (@30 gas)
            </div>
          </div>

        </div>
  </div>
</div>
</div>

</template>

<style lang="scss">
.svgPreviewColumn{
  display: flex;
  flex-basis: 400px;
  flex-grow: 0;
}
  .svgPreviewWrap{
    // background: #fff;
    width: 400px;
    height: 400px;
    .svgPreview{

    }
    svg {
      width: 100%;
      height: 100%;
    }
  }
</style>

<script>

import { mapMutations, mapGetters, mapActions } from "vuex";


export default {
  props: ['code', 'previewData'],
  computed: {
    ...mapGetters({
      //UI
      devMode: "ui/devMode",
      previewBytes: "svgFormStore/previewBytes",
      calculatedFee: "svgFormStore/calculatedFee",
    }),
    characterCount() {
      console.log(this.code)
        var chars = this.code.length;
            // limit = 140;
          //return (limit - char) + " / " + limit + "characters remaining";
          return chars
      }
  },

};
</script>


