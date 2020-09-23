<template>
  <div
    class="formItem"
    :classes="[template.required === true ? 'required' : 'optional']"
  >
    <label>{{ template.name }}</label>

    <div class="row">
      <div class="column help">{{ template.id }}</div>
      <div class="column help">{{ template.type }}</div>
      <div class="column help">
        {{ template.required === true ? 'required' : 'optional' }}
      </div>
      <div class="column help">{{ template.helpText }}</div>
      <div class="column btn-column">
        <button
          @click="removeAction(template.id)"
          class="w3-black btn btn-small"
        >
          Remove
        </button>
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
    // ValidationProvider,
  },
}
</script>
