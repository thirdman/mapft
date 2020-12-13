<template>
  
  <div
    
    class="column"
    style="flex-basis: 100%"
  >
    <div class="contractSection" v-if="1==2">
        <!-- SECTION TO DISPLAY ACTIVE CONTRACT-->
    <div
      class="fieldset formContent"
      id="fieldsetContractView"
      v-if="!showEditContract"
    >
      <label>Active Contract </label>
      <div class="row">
        <div class="column col-66">
          <div id="userContractAddress">{{ activeContractId }}</div>
        </div>
        <div class="column col-33">
          <button
            class="btn"
            id="editUserContractButton"
            @click="handleAccountModal(true)"
          >
            <IconEdit strokeClass="light" size="small" />
          </button>
        </div>
      </div>
    </div>

    <!-- FORM FOR LOADING CONTRACT-->
    <div
      class="fieldset contractContent"
      id="fieldsetContract"
      v-if="showEditContract && 1===2"
    >
      <ValidationProvider rules="required">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Contract Id</label>
          <div>
            <input
              name="Contract ID"
              oldId="j"
              id="temporaryContractId"
              class="w3-input"
              type="string"
              max="99"
              required
              placeholder="Eg. 0x1235..."
              style="text-transform: uppercase"
              v-model="temporaryContractId"
            />
            <div>
              <span class="validationMessage">{{ errors && errors[0] }}</span>
            </div>
          </div>
          <FormItemHelp
            required="true"
            message="Tokens will be minted using this contract. If you do not have one,
              use the section below to create."
          />
        </div>
      </ValidationProvider>

      <div>
        <button
          id="loadContractButton"
          class="w3-button w3-block w3-padding-large w3-black w3-margin-bottom"
          @click="setActiveContractId(temporaryContractId)"
        >
          Load Contract
        </button>
      </div>
      <div class="ctaWrap" style="padding: 0">
        <p style="font=size: 0.875rem; margin: 0 0 0.5rem">
          Don't have a contract ID yet?
        </p>
        <p>
          <a href="#deploy" class="btn hero">Get Started »</a>
        </p>
      </div>
    </div>
    
    </div>
    <div
    id="mintForm"
    class="form create column shadow"
    :class="`${mintStatus} ${uiMode}`"
    v-if="activeContractId"
  >
    <!-- STATUS SECTION-->
    <StatusInformation
      displayMode="inline"
      :title="mintStatus || 'Confirmation Required'"
      :status="mintStatus"
      :message="
        mintStatusMessage ||
        'Please confirm this transaction in your Web3 wallet (eg. MetaMask)'
      "
      :mintTransactionId="mintTransactionId"
      v-if="
        mintStatus === 'confirming' ||
        mintStatus === 'working' ||
        mintStatus === 'stillWorking' ||
        mintStatus === 'stillWorkingMore' ||
        mintStatus === 'checkTransaction' ||
        mintStatus === 'noContract' ||
        mintStatus === 'error'
      "
    />
    <div id="mintStatusWrap" class="mintStatusWrap">
      <!-- {{ mintStatus }}
      <div class>
        <div id="mintStatus" class="statusElement">
          {{ mintStatusMessage }}
          <div
            id="mintAddressLabel"
            style="
              font-size: 0.75rem;
              font-weight: bold;
              font-variation-settings: 'wght' 800;
            "
          ></div>
        </div>
        
      </div> -->
        <MintedInformation v-if="mintStatus === 'completed'" />
    </div>


  

    <!-- SECTION FOR IMAGE FIELDSET-->
    <div
      class="fieldset imageContent formContent"
      id="fieldsetImage"
      v-if="activeContractId && !shouldHideForm()"
    > 
      <div class="sectionNumber">1.</div>
      <div class="sectionTitle">
        <h6>Token File</h6>
      </div>
      <div class="formItem block">
        <label>Upload</label>
        <FormItemHelp required="true" message="This is the primary file associated with the token. Usually an image, this will be used for previews unkess a thumbnail image is set." />
        <client-only>
          <FileUpload
            mode="file"
            :arweaveStatus="arweaveStatus"
            :ipfsStatus="ipfsStatus"
            :setUploadStatus="setUploadStatus"
            :allowMultiple="false"
            :files="uploadFiles || []"
            :handleAddFile="handleAddFile"
            :onRequestSave="onRequestSave"
            :onRequestClear="onRequestClear"
          />
        </client-only>
        
      </div>
      <UploadStatus
        displayMode="inline"
        :title="uploadStatusTitle"
        :arweaveStatus="arweaveStatus"
        :arweaveProgress="fileArweaveProgress"
        :arweaveHash="fileArweaveHash"
        :ipfsStatus="ipfsStatus"
        :ipfsProgress="fileIpfsProgress"
        :ipfsHash="fileIpfsHash"
        :contrastMode="contrastMode"
      />
      <div class="formItem block" style="margin-top: .5rem;" v-if="devMode">
        <Button 
        size="small"
        mode="hollow"
        @click="setShowThumbnailField(!showThumbnailField)">{{showThumbnailField ? "Hide" : 'Show'}} Thumbnail Upload
        </Button>
      </div>
    </div>
    
    <!-- THUMBNAIL SECTION -->
    <div
      id="thumbnailFormElement"
      class="formContent fieldset"
      v-if="showThumbnailField &&  !shouldHideForm()"
    >
      
      <div class="formItem optional">
        <label>Thumbnail</label>
        <p style="line-height: 1rem" class="betaElement help">
          Applies when non-image files are used. Appears on Opensea and gallery list
          previews.
        </p>
        
        <FileUpload
          mode="thumbnail"
          :arweaveStatus="thumbnailArweaveStatus"
          :ipfsStatus="thumbnailIpfsStatus"
          :labelIdle="thumbnailUploadLabel"
          :allowMultiple="false"
          :handleAddFile="handleAddThumbnail"
          :onRequestSave="onRequestSave"
          :onRequestClear="onRequestClear"
        />
        
        <!-- <label class="file">
          <input
            type="file"
            id="thumbnailFile"
            aria-label="File upload input"
            @change="handleOpenThumbnail"
          />
          <span class="file-custom">
            <span id="thumbnailFileLabelText">Select...</span>
          </span>
        </label> -->
        <div class="itemHelp">
          <div class="helpIcon"><IconHelp :strokeClass="contrastMode" /></div>
          <div class="helpContent">
            <p>
              For non image based tokens (eg. mp3) you may assign a preview
              image.
            </p>
          </div>
        </div>
      </div>
      <UploadStatus
        displayMode="inline"
        :title="uploadThumbnailStatusTitle"
        :arweaveStatus="thumbnailArweaveStatus"
        :arweaveHash="thumbnailArweaveHash"
        :ipfsStatus="thumbnailIpfsStatus"
        :ipfsHash="thumbnailIpfsHash"
        :arweaveProgress="thumbnailArweaveProgress"
        :ipfsProgress="thumbnailIpfsProgress"
        :contrastMode="contrastMode"
      />
      <!-- <div class="cropContainer" id="cropContainer" style='max-width: 300px' :class="showCropper ? 'visible' : 'visible'">
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
        :disabled="false"
        @click="handleApplyCrop"
        >Apply</Button
      > -->
      
    </div>
    <!-- TOKEN META FIELDSET -->
    <div
      class="fieldset metaContent formContent"
      id="fieldsetMeta"
      v-if="activeContractId && !shouldHideForm()"
    >
      <!-- <div class="divider"></div> -->
      <div class="sectionNumber">2.</div>
      <div class="sectionTitle">
        <h6>Required Data</h6>
      </div>
      <ValidationProvider rules="required">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Artist Name*</label>
          <div class="validatedInputWrap">
            <input
              name="Artist / Author Name"
              class="w3-input"
              id="a"
              oldId="a"
              type="string"
              max="99"
              required
              v-model="authorName"
            />
            <!--
              onBlur="validateMintForm(event)"
              onChange='updatePreview(event, "artistName"); validateMintForm(event)'
            -->
            <span class="validity shadow hidden" id="artistNameMessage"></span>
          </div>
          <div>
            <span class="validationMessage">{{ errors && errors[0] }}</span>
          </div>

          <FormItemHelp required="true" message="Artist/Author name" />
        </div>
      </ValidationProvider>

      <ValidationProvider rules="required">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Art Title*</label>
          <div class="validatedInputWrap">
            <input
              class="w3-input"
              type="string"
              max="99"
              required
              name="Title"
              id="title"
              oldId="b"
              v-model="title"
            />
            <!-- onBlur="validateMintForm(event)"
              onChange='updatePreview(event, "title");validateMintForm(event)'
              
            -->
            <!--
            <span class="validity shadow hidden" id="artTitleMessage"></span>
            -->
          </div>
          <div>
            <span class="validationMessage">{{ errors && errors[0] }}</span>
          </div>
          <FormItemHelp
            required="true"
            message="This is the primary label associated with the token."
          />
        </div>
      </ValidationProvider>

      <ValidationProvider rules="required">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Artist Note</label>
          <div class="validatedInputWrap">
            <textarea
              class="w3-input"
              type="string"
              max="999"
              name="Description"
              id="description"
              oldId="c"
              v-model="description"
            ></textarea>
          </div>
          <div>
            <span class="validationMessage">{{ errors && errors[0] }}</span>
          </div>
          <FormItemHelp
            required="true"
            message="Appears as description in most marketplaces."
          />
        </div>
      </ValidationProvider>

      <ValidationProvider rules="required|min:1|max:10">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Total Editions* (Max of 10)</label>
          <div class="validatedInputWrap">
            <input
              class="small w3-input"
              type="number"
              min="1"
              max="10"
              value="1"
              required
              name="Editions"
              id="editions"
              oldId="f"
              v-model="editions"
            />
          </div>
          <div>
            <span class="validationMessage">{{ errors && errors[0] }}</span>
          </div>
          <FormItemHelp
            required="true"
            message="The number of tokens to be minted. If in doubt, choose 1 for
              optimum rarity! Min: 1, Max: 10."
          />
        </div>
      </ValidationProvider>
    </div>
    <div
      class="fieldset metaContent formContent"
      id="fieldsetMetaOptional"
      v-if="activeContractId  && !shouldHideForm()"
    >
      <!-- OPTIONAL SECTION -->
      <!-- <div class="divider"></div> -->
      <div class="sectionNumber">3.</div>
      <div class="sectionTitle">
        <h6>Optional Data</h6>
      </div>
      <ValidationProvider >
        <!-- rules="regex" -->
        <div class="formItem" :class="classes" slot-scope="{ classes, errors }">
          <label>Exhibition / Set</label>
          <input
            class="w3-input"
            type="string"
            max="999"
            name="Series"
            id="series"
            oldId="d"
            v-model="series"
          />
          <div>
            <span class="validationMessage">{{ errors && errors[0] }}</span>
          </div>
          <FormItemHelp
            required="false"
            message="This allows you to group tokens into a series or collection. 
              Eg. 'Art 2020' or 'Nomad Series'."
          />
        </div>
      </ValidationProvider>

      <ValidationProvider rules="min:0|max:99">
        <div
          class="formItem optional"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Royalty Fee</label>
          <div class="validatedInputWrap">
            <input
              class="small w3-input"
              type="number"
              min="0"
              max="99"
              name="Royalty Fee"
              id="royaltyFee"
              oldId="e"
              v-model="royaltyFee"
            />
            <div class="suffix">%</div>
            <!--
            <span class="validity shadow hidden" id="royaltyFeeMessage"></span>
onChange='updatePreview(event, "royaltyFee");validateMintForm(event)'
              
            -->
          </div>
          <div>
            <span class="validationMessage">{{ errors && errors[0] }}</span>
          </div>
          <FormItemHelp
            required="false"
            message="This is the portion of subsequent sales that will be transferred
              to the artist. Eg. 2%"
          />
        </div>
      </ValidationProvider>
      <div class="formItem" :style="`${devMode ? 'visibility: visible;' : 'display: none; visibilty: hidden;'}`" >
        <label>File Type</label>sdf {{devMode ? "devmode" :"not"}}
        <input
          class="small w3-input"
          id="g"
          type="string"
          max="99"
          :value="fileType"
        />
      </div>
    </div>
    <div
      class="fieldset customContent formContent"
      id="fieldsetCustomFields"
      v-if="devMode && activeContractId  && !shouldHideForm()"
    >
      <!-- CUSTOM FIELDS-->
      <!-- <div class="divider"></div> -->
      <div class="sectionNumber">4.</div>
      <div class="sectionTitle">
        <h6>Custom Meta Data</h6>
      </div>
      <div class="formItem" v-if="devMode">
        <div class="help">
          Add your own meta data. Initial fields are generated using templates
          created in your deploy contract.
        </div>
        <div v-for="(item, index) in metaFieldsObj" v-bind:key="index">
          <transition-group name="list" tag="div">
            <MetaFieldEdit
              :field="item"
              :removeAction="removeMetaField"
              :key="index"
            />
          </transition-group>
        </div>
        <transition name="slide-fade">
          <div v-if="showNewMetaField">
            <MetaFieldAdd
              :addAction="addMetaField"
              :cancelAction="setShowNewMetaField"
            />
          </div>
        </transition>

        <!-- <div id="newMetaField" style="padding-top: 1rem;">
          <div class="divider"></div>
          <div class="formItem">
            <div class="row">
              <div class="column col-33">
                <label>Name</label>
                <input class="w3-input" id="newName" type="string" max="999"
                onchange="updateMetaField(event, "name")" />
              </div>
              <div class="column col-66" style="padding-left: 1rem;">
                <label>Value</label>
                <input class="w3-input" id="newValue" type="string" max="999"
                onchange="updateMetaField(event, "value")" />
              </div>
              <div class="column btn-column">
                <label>&nbsp;</label>
                <button class="w3-black btn btn-small" onclick="addMetaField()">
                  Add
                </button>
              </div>
              <div class="column btn-column">
                <label>&nbsp;</label>
                <button
                  class="w3-black btn btn-small"
                  onclick="hideNewMetaField()"
                >
                  Cancel
                </button>
              </div>
            </div>
            <div class="itemHelp">
              <div class="helpIcon"></div>
              <div class="helpContent">
                <p>Add your own custom meta data</p>
              </div>
            </div>
          </div>
        </div> -->
        <div class="row" style="padding-bottom: 1rem">
          <Button class="w3-black btn" @click="setShowNewMetaField(true)"
            >New Meta Field</Button
          >
        </div>
      </div>
      
    </div>

    <div class="devContent fieldset" v-if="devMode">
      <div>fileIpfsHash: {{ fileIpfsHash }}</div>
      <div>fileArweaveHash: {{ fileArweaveHash }}</div>
      <!-- <div class="divider" /> -->
      <button @click="setShowThumbnailField(true)">show thumb</button>
      <button @click="handleCropperModal(true)">show Cropper</button>
      <div class="row">
        <button @click="setMintStatus('confirming')">set confirming</button>
        <button @click="setMintStatus('working')">set working</button>
        <button @click="setMintStatus('stillWorking')">set stillWorking</button>
        <button @click="setMintStatus('checkTransaction')">
          set checkTransaction
        </button>
        <button @click="setMintStatus('error', 'example text')">
          set error
        </button>
        <button @click="setMintStatus('noContract')">
          noContract
        </button>
        <button @click="setMintStatus('completed')">completed</button>
        
      </div>
    </div>
    <!-- ACTIONS -->
    <div
      class="fieldset formContent"
      style="padding-top: 0.5rem"
      v-if="showTestMintData"
    >
      <label>Data To be Minted</label>
      <div class="contentRow">
        <div class="contentLabel">IPFS Hash:<br>
          <div class="xsmall">'fileIPFSHash'</div>
        </div>
        {{testMintData.fileIPFSHash}} <div v-if="!testMintData.fileIPFSHash" class="undefinedContent">Undefined</div>
      </div>
      <div class="contentRow">
        <div class="contentLabel">Arweave Hash:<br>
          <div class="xsmall">'fileArweaveHash'</div></div>
          {{testMintData.fileArweaveHash}}
          <div v-if="!testMintData.fileArweaveHash" class="undefinedContent">Undefined</div>
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
        <div class="contentLabel">editions:<br>
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
      <hr />
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
        <!-- <div v-if="!testMintData.thumbnailArweaveHash" class="undefinedContent">Undefined</div> -->
      </div>
      <div class="contentRow">
        <div class="contentLabel">thumbnailIPFSHash:<br>
          <div class="xsmall">'thumbnailIPFSHash'</div>
        </div>
        {{testMintData.thumbnailIPFSHash}}
        <!-- <div v-if="!testMintData.fileType" class="undefinedContent">Undefined</div> -->
      </div>
      <hr />
      <div class="actions">
        <Button mode="hollow" @click="toggleTestData(!showTestMintData)">
          Hide Preview
        </Button>
        <Button mode="hollow" @click="handleTest">
          Re-Test
        </Button>
      </div>
    </div>
    <div
      class="fieldset actionContent formContent"
      id="fieldsetAction"
      style="padding-top: 0.5rem"
    >
      <h1 class="w3-xlarge" style="max-width: 1000px; margin: auto">
        <button
          id="h"
          class="w3-button w3-block w3-padding-large w3-black w3-margin-bottom"
          :disabled="!canMint"
          @click="handleMint"
        >
          MINT
        </button>
      </h1>
      <div v-if="this.customButtonId">
        <div class="customMintButton">
          <Button 
            @click="handleCustomMint" 
            mode="hero" 
            size="large" 
            :full="true"
            :disabled="!canMint"
            >{{this.customButtonLabel}}</Button>
        </div>
      </div>
      <div class="row" style="justify-content: center">
      <Button mode="hollow" @click="handleTest">
        Preview Data
      </Button>
      
      <!-- <button class="w3-button w3-block w3-black" id="resetFormButton" style="margin-left: .25rem;">
        Reset Form
      </button> -->
      </div>
    </div>
    </div>
  </div>
</template>

<style>
.menu {
  display: flex;
  flex-direction: row;
}
.devContent {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.1);
  font-size: 0.75rem;
}
.defaultThumbnail {
  width: 120px;
  height: 120px;
}
.undefinedContent{
  color: var(--danger-color, red);
  font-size: .75rem;
  font-family: monospace;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: transform 0.3s cubic-bezier(1, 0.5, 0.8, 1),
    opacity 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(2rem);
  opacity: 0;
}
.list-move {
  transition: transform 0.3s;
}
.list-enter-active,
.list-leave-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(2rem);
}
</style>

<script>
  import { mintThatShit, testThatShit } from "../utils/web3Mint.js";
  import { mintThatShitGarethDev } from "../utils/web3Mint-garethDev.js";
  import { mintThatShitGarethProd } from "../utils/web3Mint-garethProd.js";
  import { mintThatShitGarethStaging } from "../utils/web3Mint-garethStaging.js";
  import { mintThatShitTrislitProd } from "../utils/web3Mint-trislitProd.js";

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
import { mapMutations, mapGetters, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
import { ValidationProvider, extend } from "vee-validate";
import vueFilePond from "vue-filepond";
import { required, min, max, email, regex } from "vee-validate/dist/rules";
import "filepond/dist/filepond.min.css";
const customMinterMap = {
  "0xcd8a0e29514910532db4b500ad109927262f54d8": {
    id: "garethProd",
    label: "gareth Prod button",
    function: mintThatShitGarethProd
  },
  "0xB95Af9b2Afd751760e5031C93F18ebD7aB406815": {
    id: "garethStaging",
    label: "gareth Staging button",
    function: mintThatShitGarethStaging
  },
  "0x83c6AA518316CEe7672d385dD20Af015f6fb28c0": {
    id: "garethDev",
    label: "gareth Staging button",
    function: mintThatShitGarethDev
  },
  
  "0xae056092fa7068dfcd60bb9016d0e2d2448a635e": {
    id: "trislitProd",
    label: "Trislits special button",
    function: mintThatShitTrislitProd
  },
  
};

const FilePond = vueFilePond();
const imageTypes = ["jpg", "png", "gif"];

extend("min", {
  // (value) => {
  ...min,
  // return value.length >= 3
  message: `Minimum length is ${min}`,
});
extend("max", {
  ...max,
});
extend("required", {
  ...required,
  message: "This field is required",
});
extend("regex", {
  validate: value => value.match(/^[\w\-\s]+$/) !== null,
  message: "Limited to alpha-numeric, underscore, dash, and spaces.",
});

export default {
  components: {
    ValidationProvider,
    // VueCropper,
    // FilePond,
  },
  
  head() {
    return {
      
    };
  },
  mounted(){
    this.initCustomMint();
  },
  data() {
    return {
      // These are the validation arrays
      errors: [],
      classes: [],
      uploadFiles: [],
      thumbnailUploadLabel: `Drag & Drop your file or <span class="filepond--label-action"> Browse </span>`,
      testMintData: {},
      showTestMintData: false,
      customButtonId: '',
      customButtonLabel: '',
      // fileIpfsProgress: undefined,
      // fileArweaveProgress: undefined,
      // thumbnailIpfsProgress: '6',
    };
  },
  computed: {
    ...mapGetters({
      // ui
      hasWallet: "ui/hasWallet",
      devMode: "ui/devMode",
      uiMode: "ui/uiMode",
      contrastMode: "ui/contrastMode",
      statusModalMode: "ui/statusModalMode",
      activeContractId: "ui/activeContractId",
      // showEditContract: 'mintFormStore/showEditContract',
      // mint form ...,
      mintedData: "mintFormStore/mintedData",
      metaFieldsObj: "mintFormStore/metaFieldsObj",
      canMint: "mintFormStore/canMint",
      mintStatus: "mintFormStore/mintStatus",
      mintStatusMessage: "mintFormStore/mintStatusMessage",
      mintTransactionId: "mintFormStore/mintTransactionId",
      uploadStatus: "mintFormStore/uploadStatus",
      uploadStatusTitle: "mintFormStore/uploadStatusTitle",
      ipfsStatus: "mintFormStore/ipfsStatus",
      arweaveStatus: "mintFormStore/arweaveStatus",
      fileIpfsHash: "mintFormStore/fileIpfsHash",
      fileIpfsProgress: "mintFormStore/fileIpfsProgress",
      fileArweaveHash: "mintFormStore/fileArweaveHash",
      fileArweaveProgress: "mintFormStore/fileArweaveProgress",
      thumbnailUploadStatus: "mintFormStore/thumbnailUploadStatus",
      thumbnailIpfsStatus: "mintFormStore/thumbnailIpfsStatus",
      thumbnailIpfsProgress: "mintFormStore/thumbnailIpfsProgress",
      thumbnailArweaveStatus: "mintFormStore/thumbnailArweaveStatus",
      thumbnailArweaveProgress: "mintFormStore/thumbnailArweaveProgress",
      thumbnailIpfsHash: "mintFormStore/thumbnailIpfsHash",
      thumbnailIpfsHashDefault: "mintFormStore/thumbnailIpfsHashDefault",
      thumbnailArweaveHash: "mintFormStore/thumbnailArweaveHash",
      thumbnailArweaveHashDefault: "mintFormStore/thumbnailArweaveHashDefault",
      uploadThumbnailStatusTitle: "mintFormStore/uploadThumbnailStatusTitle",
      thumbnailSource: "mintFormStore/thumbnailSource",
      showThumbnailField: "mintFormStore/showThumbnailField",
      showCropper: "mintFormStore/showCropper",
    }),

    showEditContract() {
      if (this.$store.state.ui.activeContractId) {
        return false;
      } else {
        return this.$store.state.mintFormStore.showEditContract;
      }
    },

    showNewMetaField() {
      return this.$store.state.mintFormStore.showNewMetaField;
    },
    fileName() {
      return this.$store.state.mintFormStore.fileName;
    },
    fileType() {
      return this.$store.state.mintFormStore.fileType;
    },

    metaFieldsJson() {
      return this.$store.state.mintFormStore.metaFieldsJson;
    },
    ...mapFields("mintFormStore", [
      "temporaryContractId",
      "authorName",
      "title",
      "description",
      "editions",
      "series",
      "royaltyFee",
    ]),
  },

  methods: {
    ...mapMutations({
      setArweaveStatus: "mintFormStore/setArweaveStatus",
      setIpfsStatus: "mintFormStore/setIpfsStatus",
      setIpfsHash: "mintFormStore/setIpfsHash",
      setArweaveHash: "mintFormStore/setArweaveHash",
      setShowEditContract: "mintFormStore/setShowEditContract",
      setThumbnailUploadStatus: "mintFormStore/setThumbnailUploadStatus",
      setThumbnailSource: "mintFormStore/setThumbnailSource",
      setFileInfo: "mintFormStore/setFileInfo",
      setProgress: "mintFormStore/setProgress",
    }),
    ...mapActions({
      // ARWEAVE
      getBalance: "arweaveStore/getBalance",
      arUploadFile: "arweaveStore/arUploadFile",
      lastTransaction: "arweaveStore/lastTransaction",
      getTransactionStatus: "arweaveStore/getTransactionStatus",
      getTransactionData: "arweaveStore/getTransactionData",
    }),
    initCustomMint(){
      const id = this.activeContractId
      console.log('customMinterMap show custom mint id', id)
      console.log('customMinterMap', customMinterMap)
      console.log('customMinterMap[id]', customMinterMap[id])
      const showButtonId = customMinterMap[id] && customMinterMap[id].id
      const showButtonLabel = customMinterMap[id] && customMinterMap[id].label
      if(showButtonId){
        this.customButtonId = showButtonId
        this.customButtonLabel = showButtonLabel
      }
    },
    shouldHideForm() {
      const activeArray = [
        'confirming',
        'working',
        'stillWorking',
        'stillWorkingMore',
        'checkTransaction',
        'completed',
      ];
      const currentStatus = this.mintStatus
      const isWorking = activeArray.includes(currentStatus)
      return isWorking
    },
    handleAccountModal() {
      this.$modal.show("account-modal");
    },
    handleCropperModal() {
      this.$modal.show("cropper-modal");
    },
    handleStatusModal(newState) {
      this.$store.commit("mintFormStore/setShowStatusModal", newState);
      if (newState === true) {
        // this.$modal.show('status-modal')
      } else {
        //  this.$modal.hide('status-modal')
      }
    },
    handleFilePondInit: function () {
      // console.log("FilePond has initialized");
      // FilePond instance methods are available on `this.$refs.pond`
    },
    
    onRequestSave: function (props) {
      alert("request save called");

      const { id, name, folder, file, target, mode } = props;
      // console.log("onRequestSave was called", id, name, folder, file, target);
      if (!file) {
        return;
      }
    },
    onRequestClear: function (mode, file) {
      // console.log("request clear called with file: ", mode, file);
      if (mode === "file") {
        this.unRenderImage(mode, file);
        this.setUploadStatus({ mode: mode, status: "" });
      }
      if (mode === "thumbnail") {
        this.setThumbnailSource("");
      }
    },
    // MAIN FILE ADD
    handleAddFile: function (error, file) {
      if (!error) {
        const fileName = file.filename;
        const fileType = fileName.split(".").pop().toLowerCase();
        const fileExtension = file.fileExtension;
        this.renderImage(
          fileType,
          window.URL.createObjectURL(file.file),
          "output"
        );
        this.setFileInfo({ fileName, fileType });
        this.toggleThumbnail(fileType);
        
        processUpload({
          mode: "file",
          context: this,
          file: file.file,
          inputElement: file,
        }).catch((error) => {
          alert(error);
        });
      } else {
        this.setUploadStatus({ mode: "file", status: "noFile" });
        console.error("error: ", error);
      }
    },
    // THUMB MAIN FILE ADD
    // This doesn't upload, but instead triggers the 
    // cropper modal
    handleAddThumbnail: function (error, file) {
      if (error) {
        this.setUploadStatus({ mode: "thumbnail", status: "noFile" });
        console.error("error: ", error);
        return;
      }
      if(!file){
        return
      }
      
      const urlElement = window.URL.createObjectURL(file.file);
      this.setThumbnailSource(urlElement);
      this.$store.commit("mintFormStore/setShowCropper", true);
      this.$modal.show("cropper-modal");
      
      // if(oldWay){
      //   console.log("file", file);
      //   const fileName = file.filename;
      //   const fileType = fileName.split(".").pop().toLowerCase();
      //   const fileExtension = file.fileExtension;

      //   const cropImageElement = document.getElementById("cropImage");
      //   console.log("cropImageElement", cropImageElement);
      //   const urlElement = window.URL.createObjectURL(file.file);
      //   console.log("thumbnail urlElement", urlElement);
      //   this.setThumbnailSource(urlElement);

      //   processUpload({
      //     mode: "thumbnail",
      //     context: this,
      //     file: file.file,
      //     inputElement: file,
      //   }).catch((error) => {
      //     alert(error);
      //   });
      // }
    },

    setActiveContractId(value) {
      this.$store.commit("ui/setActiveContractId", value);
    },
    clearActiveContractId(value) {
      this.$store.commit("ui/clearActiveContractId", value);
    },
    setUploadStatus(statusData) {
      // console.log("setUploadStatus(statusData) ", statusData);
      this.$store.commit("mintFormStore/setUploadStatus", statusData);
    },
    removeMetaField(id) {
      // console.log("removeMetaField id", id);
      this.$store.commit("mintFormStore/removeMetaField", id);
    },
    addMetaField(obj) {
      if (!obj) {
        console.error("no obj supplied");
        return null;
      }
      this.$store.commit("mintFormStore/addMetaField", obj);
    },
    setShowNewMetaField(newState) {
      // console.log("setting setShowNewMetaField to", newState);
      this.$store.commit("mintFormStore/setShowNewMetaField", newState);
    },

    setShowThumbnailField(newState) {
      // console.log("setting setShowThumbnailField to", newState);
      this.$store.commit("mintFormStore/setShowThumbnailField", newState);
      
    },
    setFileInfo(fileName, fileType) {
      this.$store.commit("mintFormStore/setFileInfo", fileName, fileType);
    },
    setMintStatus(status) {
      this.$store.commit("mintFormStore/setMintStatus", status);
    },

    toggleTestData(newState){
      this.showTestMintData = newState
    },

    renderImage(fileType, src, parent) {
      let read;
      const previewTypes = ["video", "threeD"];
      switch (fileType) {
        case "glb":
          read = document.createElement("model-viewer");
          read.setAttribute("auto-rotate", "");
          read.setAttribute("camera-controls", "");
          read.className = "tokenImage3d";
          break;
        case "mp4":
        case "mov":
          read = document.createElement("video");
          read.setAttribute("loop", "");
          read.setAttribute("controls", "");
          // commented out this to stop large files trying to load
          // read.setAttribute('autoplay', '');
          read.className = "tokenImage";
          break;
        case "pdf":
        case "mp3":
          read = document.createElement("div");
          (read.className = "unknownTokenImage"),
            (read.innerText =
              "No preview available, use thumbnail to define one.");
          break;
        // default:
        //   read = document.createElement("div");
        //   read.innerText = "Non Image File";
        //   read.className = "tokenImage empty";
        default: 
          read = document.createElement("img");
          read.className = "tokenImage";
      }
      read.src = src;
      var output = document.getElementById(parent);
      output.innerHTML = "";
      output.appendChild(read);
    },
    unRenderImage(mode, parent = "output") {
      var output = document.getElementById(parent);
      if (output) {
        output.innerHTML = "";
      }
      if (mode === "file") {
        this.setIpfsStatus("");
        this.setArweaveStatus("");
      }
    },

    handleOpenFile(event, blah) {
      return openFile(event, this);
    },
    handleOpenThumbnail(file, blah) {
      // let input = file.target;
      if (!file) {
        this.setThumbnailUploadStatus({ mode: "thumbnail", status: "noFile" });
      }
      const fileName = file.filename;
      const fileType = fileName.split(".").pop().toLowerCase();
      const fileExtension = file.fileExtension;
      const cropImageElement = document.getElementById("cropImage");
      const urlElement = window.URL.createObjectURL(fileInput);
      this.setThumbnailSource(urlElement);
    },
    handleApplyCrop(event) {
      const thumbnailElement = document.getElementById("outputThumbnailImage");
      const outputElement = document.getElementById("output");
      const previewImageElement = document.getElementById("output").firstChild;
      
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
    destroyCropper() {
      const cropper = this.$refs.cropper;
      const cropImageElement = document.getElementById("cropImage");
      if (
        cropImageElement &&
        cropImageElement.classList.contains("cropper-hidden")
      ) {
        cropImageElement.src = "";
        cropImageElement.cropper.destroy();
      }
    },
    handleCropResult(croppedImage) {
      const thumbnailElement = document.getElementById("outputThumbnailImage");

      if (thumbnailElement) {
        thumbnailElement.src = croppedImage;
      }
    },
    crop(event) {
      // console.log(event.detail.x);
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

    toggleThumbnail(fileType) {
      const setShowThumbnailField = this.setShowThumbnailField;
      const isImage = imageTypes.includes(fileType);
      setShowThumbnailField(!isImage);
    },
    handleTest(){
      const state = this.$store.state.mintFormStore;
      if(this.activeContractId && !userContractAddress ){
        this.$store.commit("ui/setActiveContractId", this.activeContractId);
      }
      const testMintData = testThatShit({
        data: {},
        state: state,
        useData: false
      })
      this.testMintData = testMintData;
      this.showTestMintData = true;
    },
    handleMint() {
      const state = this.$store.state.mintFormStore;
      const userContractAddress = state.activeContractId;
      if(this.activeContractId && !userContractAddress ){
        this.$store.commit("ui/setActiveContractId", this.activeContractId);
      }
      mintThatShit(event, state, this);
    },
    handleCustomMint(id) {
      console.log('custommint id: ', id)
      console.log('custommint this.customButtonId: ', this.customButtonId)
      console.log('this', this);
      const customId = this.customButtonId;
      const state = this.$store.state.mintFormStore;
      const userContractAddress = state.activeContractId;
      if(this.activeContractId && !userContractAddress ){
        this.$store.commit("ui/setActiveContractId", this.activeContractId);
      }
        if(!customId){return}
      const theObj = customMinterMap[this.activeContractId];
      const theFunction = theObj.function;
      console.log('theObj', theObj)
      console.log('mintThatShitGarethDev', mintThatShitGarethDev)
      console.log('theFunction: ', theFunction)
      theFunction(event, state, this);
    },

    handlePinThumbnailFiletoIPFS(file) {
      pinThumbnailFileToIPFS(file, this);
    },
    triggerUploadProcess() {
      const inputElement = document.getElementById("file");
      startUploadProcess(inputElement, this, "file");
    },
    triggerUploadThumbnailProcess() {
      const inputElement = document.getElementById("thumbnailFile");
      startUploadThumbnailProcess(inputElement, this, "thumbnail");
    },
    
    // ...mapActions({
    //   setArweaveStatus: 'mintFormStore/setArweaveStatus',
    // })
    openFile,
    personalSignFiles,
    // pinFiletoIPFS,
    pinThumbnailFileToIPFS,
    removePinFromIPFS,
  },
};
</script>
