<template>
  <div
    class="formItem"
    :class="[field.required === true ? 'required' : 'optional']"
  >
    <label>{{ field.name }}</label>
    <div class="row">
      <input
        id="field.id"
        name="field.name"
        type="field.string"
        class="w3-input"
        :value="field.value"
        required="field.required"
      />
      <FormItemHelp :required="field.required" :message="field.helpText" />
      <!-- onchange='validateDeployForm(event)'-->

      <div class="column btn-column">
        <button
          @click="removeAction(field.id)"
          class="w3-black btn btn-small"
          :disabled="field.required"
        >
          Remove
        </button>
        <!-- onClick='removeMetaField("${field.id}")' -->
      </div>
    </div>
  </div>
</template>
<style></style>

<script>
import { ValidationProvider, extend } from 'vee-validate'
import { required, min, max, email } from 'vee-validate/dist/rules'

extend('min', {
  // (value) => {
  ...min,
  // return value.length >= 3
})
extend('max', {
  ...max,
})
extend('required', {
  ...required,
  message: 'This field is required',
})

export default {
  props: ['template', 'removeAction'],
  components: {
    ValidationProvider,
  },
}
</script>
