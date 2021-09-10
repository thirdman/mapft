<template>
  <div
    class="metaFieldEdit formItem"
    :class="[field.required === true ? 'required' : 'optional']"
  >
    <label>{{ field.name }}</label>
    <div class="row">
      <input
        id="field.id"
        name="field.name"
        type="field.string"
        class="base-input"
        :value="field.value"
        required="field.required"
      />
      <FormItemHelp :required="field.required" :message="field.helpText" />
      <div class="column btn-column">
        <button
          @click="removeAction(field.id)"
          class=" btn btn-small"
          :disabled="field.required"
        >
          Remove
        </button>
        <!-- onClick='removeMetaField("${field.id}")' -->
      </div>
    </div>
  </div>
</template>
<style>
.metaFieldEdit .row {
  flex-direction: row;
  align-items: center;
}
</style>

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
  props: ['field', 'removeAction'],
  components: {
    // ValidationProvider,
  },
}
</script>
