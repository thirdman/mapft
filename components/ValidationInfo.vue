<template>
  <div
      class=""
    >
    <p class="help small" style="max-width: 24rem;">
      This shows the data that will be sent to your minting function. Minting will return an error if any items are red.
    </p>
    <hr class="dividerItem" />
      <label>Data To be Minted</label>
      <div class="contentRow">
        <div class="contentLabel">IPFS Hash:<br>
          <div class="xsmall">'fileIPFSHash'</div>
        </div>
        {{testMintData.fileIPFSHash}} <div v-if="!testMintData.fileIPFSHash" class="undefinedContent">Undefined</div>
        <a :href="`https://ipfs.io/ipfs/${testMintData.fileIPFSHash}`" target="blank" v-if="testMintData.fileIPFSHash" class="asButton small">Open on IPFS</a>
      </div>
      <div class="contentRow">
        <div class="contentLabel">Arweave Hash:<br>
          <div class="xsmall">'fileArweaveHash'</div></div>
          {{testMintData.fileArweaveHash}}
          <div v-if="!testMintData.fileArweaveHash" class="undefinedContent">Undefined</div>
          <a :href="`https://arweave.net/${testMintData.fileArweaveHash}`" target="blank" class="asButton small" v-if="testMintData.fileArweaveHash">Open on Arweave</a>
      </div>
      <div class="contentRow">
        <div class="contentLabel">Thumbnail Hash:<br>
          <div class="xsmall">'thumbnailHashToUse' (only used if needed)</div>
        </div>
        {{testMintData.thumbnailHashToUse}}
        <div v-if="!testMintData.thumbnailHashToUse" class="undefinedContent">Undefined</div>
      </div>
      <div class="contentRow">
        <div class="contentLabel">Artist Name:<br>
          <div class="xsmall">'artistName'</div>
        </div>
        {{testMintData.artistName}}
        <div v-if="!testMintData.artistName" class="undefinedContent">Undefined</div>
      </div>
      <div class="contentRow">
        <div class="contentLabel">Title:<br>
          <div class="xsmall">'imageName'</div>
        </div>
        {{testMintData.imageName}}
        <div v-if="!testMintData.imageName" class="undefinedContent">Undefined</div>
      </div>
      <div class="contentRow">
        <div class="contentLabel">Description:<br>
          <div class="xsmall">'artistNote'</div>
        </div>
        {{testMintData.artistNote}}
        <div v-if="!testMintData.artistNote" class="undefinedContent">Undefined</div>
      </div>
      <div class="contentRow">
        <div class="contentLabel">Exhibition:<br>
          <div class="xsmall">'exhibition'</div>
        </div>
        {{testMintData.exhibition}}
        <div v-if="!testMintData.exhibition" class="undefinedContent">Undefined</div>
      </div>
      <div class="contentRow">
        <div class="contentLabel">Royalty Fee:<br>
          <div class="xsmall">'royaltyFee'</div>
        </div>
        {{testMintData.royaltyFee}}
        <div v-if="Number.isNaN(testMintData.royaltyFee)" class="undefinedContent">Undefined/Not a number</div>
      </div>
      <div class="contentRow">
        <div class="contentLabel">Editions:<br>
          <div class="xsmall">'totalCap'</div>
        </div>
          {{testMintData.totalCap}}
          <div v-if="!testMintData.totalCap" class="undefinedContent">Undefined</div>
      </div>
      <div class="contentRow">
        <div class="contentLabel">File Type:<br>
          <div class="xsmall">'fileType'</div>
        </div>
        {{testMintData.fileType}}
        <div v-if="!testMintData.fileType" class="undefinedContent">Undefined</div>
      </div>

      <hr class="dividerItem" />
      <div class="contentRow">
        <div class="contentLabel">Contract Address:<br>
          <div class="xsmall">'userContractAddress'</div>
        </div>
        {{testMintData.userContractAddress}}
        <div v-if="!testMintData.userContractAddress" class="undefinedContent">Undefined</div>
      </div>
      <div class="contentRow">
        <div class="contentLabel">isMissingVariables:<br>
          <div class="xsmall">'isMissingVariables'</div>
        </div>
        {{testMintData.isMissingVariables ? "" : "no"}}
        <div v-if="testMintData.isMissingVariables" class="undefinedContent">YES</div>
      </div>
      <div class="contentRow">
        <div class="contentLabel">thumbnailArweaveHash:<br>
          <div class="xsmall">'thumbnailArweaveHash'</div>
        </div>
        {{testMintData.thumbnailArweaveHash}}
        <a :href="`https://arweave.net/${testMintData.thumbnailArweaveHash}`" target="blank" class="asButton small" v-if="testMintData.thumbnailArweaveHash">Open on Arweave</a>
      </div>
      <div class="contentRow">
        <div class="contentLabel">thumbnailIPFSHash:<br>
          <div class="xsmall">'thumbnailIPFSHash'</div>
        </div>
        {{testMintData.thumbnailIPFSHash}}
        <a :href="`https://ipfs.io/ipfs/${testMintData.thumbnailIPFSHash}`" target="blank" v-if="testMintData.thumbnailIPFSHash" class="asButton small">Open on IPFS</a>
      </div>
      
            <hr class="dividerItem" />
    </div>
</template>

<style>
.dividerItem{
  border: none;
  border-top: 1px solid currentColor;
  background: transparent;
}
</style>

<script>
export default {
  props: ['testMintData'],
  data() {
    return {
      example: 'hello',
    }
  },
}
</script>
