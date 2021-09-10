<template>
  <div id="newMetaTemplate">
    <div class="divider"></div>
    <div class="formItem">
      <h6>New Meta Template</h6>
      <p class="help">
        Templates allow you to define data fields that will appear on the
        minting form when this contract is used. This does NOT save data, but
        rather defines a template for collecting data.
      </p>
      <ValidationProvider rules="required|min:2">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Unique ID</label>
          <p class="help"></p>
          <input
            id="newId"
            v-model="newId"
            name="Template Id"
            class="base-input small"
            type="string"
            max="999"
          />
          <div>
            <span class="validationMessage">{{ errors && errors[0] }}</span>
          </div>
          <!--onChange='updateTemplateField(event, "id");'-->
          <FormItemHelp
            required="true"
            message="A unique id string used to
          identify this content. No spaces or special characters. Eg. 'infourl'"
          />
        </div>
      </ValidationProvider>
      <ValidationProvider rules="required|min:2">
        <div
          class="formItem required"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Display Title</label>
          <input
            id="newName"
            name="New Title"
            class="base-input"
            type="string"
            max="999"
            v-model="newName"
          />
          <div>
            <span class="validationMessage">{{ errors && errors[0] }}</span>
          </div>
          <!--onChange='updateTemplateField(event, "name");'-->

          <FormItemHelp
            required="true"
            message="The label that will appear above the field. Mat be the same as ID.
              Eg. 'Info Url'"
          />
        </div>
      </ValidationProvider>
      <div class="formItem required">
        <label>Type</label>
        <div class="buttonGroup">
          <button
            class="btn btn-small  selected"
            onClick='alert("body", "lemon")'
          >
            Text
          </button>
          <button class="btn btn-small" onClick='alert("body", "lemon")'>
            Long Text
          </button>
          <button class="btn btn-small" onClick='alert("body", "lemon")'>
            Number
          </button>
        </div>
        <div class="itemHelp">
          <div class="helpIcon"><IconHelp strokeClass="light" /></div>
          <div class="helpContent">
            <p>
              The type of data if you wish to restrict input values. Most meta
              will be text string, so if in doubt leave it as string.
            </p>
          </div>
        </div>
      </div>
      <ValidationProvider rules="min:2">
        <div
          class="formItem optional"
          :class="classes"
          slot-scope="{ classes, errors }"
        >
          <label>Help Text</label>
          <input
            id="newHelpText"
            class="base-input"
            type="string"
            max="999"
            name="Help Text"
            v-model="newHelpText"
          />
          <!--onChange='updateTemplateField(event, "helpText");'-->
          <div>
            <span class="validationMessage">{{ errors && errors[0] }}</span>
          </div>
          <FormItemHelp
            required="true"
            message="Text to remind you what this data is for. Eg 'The link to more
              information for the token.'"
          />
        </div>
      </ValidationProvider>
      <div v-if="showPreview" class="previewWrap">
        <MetaFieldEdit :field="previewData" :removeAction="fakeRemove" />
      </div>
      <div style="padding-top: 1rem;">
        <button class=" btn btn-large" @click="showPreview = true">
          Preview
        </button>
        <button class=" btn btn-large" @click="addAction(templateData)">
          Add
        </button>
        <button class=" btn btn-large" @click="cancelAction(false)">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<style>
#newMetaTemplate {
  padding-top: 1rem;
}
.previewWrap {
  background: rgba(0, 0, 0, 0.1);
  padding: 1rem;
}
</style>

<script>
import { ValidationProvider, extend } from 'vee-validate'
import { required, min, max, email } from 'vee-validate/dist/rules'

extend('min', {
  ...min,
})
extend('max', {
  ...max,
})
extend('required', {
  ...required,
  message: 'This field is required',
})

export default {
  props: ['template', 'addAction', 'cancelAction'],
  components: {
    ValidationProvider,
  },
  data() {
    return {
      showPreview: false,
      newId: '',
      newName: '',
      newHelpText: '',
      newRequired: false,
    }
  },
  computed: {
    previewData: ({ newId, newName, newRequired, newHelpText }) => {
      console.log('newId, newTitle', newId, newName)
      const theData = {
        id: newId,
        name: newName,
        required: newRequired,
        helpText: newHelpText,
        value: 'example value',
      }
      return theData
    },
    templateData: ({ newId, newName, newRequired, newHelpText }) => {
      const theData = {
        id: newId,
        name: newName,
        required: newRequired,
        helpText: newHelpText,
      }
      return theData
    },
  },
  methods: {
    setNewTemplate: () => {
      console.log('set new template')
    },
    setShowPreview: (newState) => {
      showPreview = newState
    },

    fakeRemove: () => {
      alert('PREVIEW: This would remove the field')
    },
  },
}
</script>
