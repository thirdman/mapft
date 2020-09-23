<template>
  <div id="newMetaField">
    <div class="divider"></div>
    <div class="formItem">
      <div class="row">
        <ValidationProvider rules="required|min:2">
          <div
            class="column columnItem col-33"
            :class="classes"
            slot-scope="{ classes, errors }"
          >
            <label>Name</label>
            <input
              class="w3-input"
              id="newName"
              type="string"
              max="999"
              name="Name"
              v-model="newName"
            />
            <div>
              <span class="validationMessage">{{ errors && errors[0] }}</span>
            </div>
          </div>
        </ValidationProvider>
        <ValidationProvider rules="required">
          <div
            class="column columnItem col-66"
            style="padding-left: 1rem;"
            :class="classes"
            slot-scope="{ classes, errors }"
          >
            <label>Value</label>
            <input
              class="w3-input"
              name="Value"
              id="newValue"
              type="string"
              max="999"
              v-model="newValue"
            />
            <div>
              <span class="validationMessage">{{ errors && errors[0] }}</span>
            </div>
          </div>
        </ValidationProvider>
        <div class="column btn-column" style="padding-top: 0.25rem;">
          <label>&nbsp;</label>
          <button class="w3-black btn btn-small" @click="addAction(fieldData)">
            Add
          </button>
          <!--onClick="addMetaField()"-->
        </div>
        <div class="column btn-column" style="padding-top: 0.25rem;">
          <label>&nbsp;</label>
          <button class="w3-black btn btn-small" @click="cancelAction(false)">
            Cancel
          </button>
          <!--onClick="hideNewMetaField()" -->
        </div>
      </div>

      <!-- <label>help Text</label>
                <input class="w3-input " id="newHelpText" type="string" max="999"
                onChange='console.log(event, "optional");'
                > -->
      <div class="itemHelp">
        <div class="helpIcon"><IconHelp strokeClass="light" /></div>
        <div class="helpContent">
          <p>
            Add your own custom meta data
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
#newMetaField {
  padding-top: 1rem;
}
#newMetaField .row {
  align-items: flex-start;
}
#newMetaField .row .column {
  /*align-items: flex-start; */
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
  props: ['field', 'addAction', 'cancelAction'],
  components: {
    ValidationProvider,
  },
  data() {
    return {
      showPreview: false,
      // newId: '',
      // newHelpText: '',
      newName: '',
      newValue: '',
      newRequired: false,
    }
  },
  computed: {
    fieldData: ({ newId, newName, newValue }) => {
      const theData = {
        // id: newId,
        name: newName,
        value: newValue,
      }
      return theData
    },
  },
}
</script>
