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
          <div class="row">
            <div class="previewElement column">
              <label>Bytes</label>
              <div :class="previewBytes && previewBytes > 15000 ? 'danger' : ''">
                {{previewBytes}}
              </div>
              <div v-if="previewBytes && previewBytes > 15000"
                class="small"
                :class="previewBytes && previewBytes > 15000 ? 'danger' : ''"
                >
                TOO BIG! The contract will not work with code > 15000 bytes.
              </div>
            </div>
            <div class="previewElement column" >
              <label>Mint Cost Estimate</label>
              <div v-if="calculatedFee">
                <div><strong>Ξ</strong>{{calculatedFee}} (@30 gas)</div>
                <div size="xsmall">(+ <strong>Ξ</strong>{{svgFee}} base fee)</div>

              </div>
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
  .danger{
    color: var(--danger-color, red);
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
      //SVG
      previewBytes: "svgFormStore/previewBytes",
      calculatedFee: "svgFormStore/calculatedFee",
      svgFee: "svgFormStore/svgFee",
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


