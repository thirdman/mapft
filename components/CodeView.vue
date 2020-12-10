<template>
  <div class="codeWrap" >
    <div class="row" style="justify-content:  space-between">
      <div class="column col-66">
        <label v-if="title">{{title}} </label>
      </div>
      <Button v-if="onClose ? true : false" @click="onClose" class="transparent">
        <IconClose strokeClass="dark" />
      </Button>
    </div>
    <div class="codeView" >
      <pre><code>{{code && JSON.stringify(code)}}</code></pre>
    </div>
  </div>
  
</template>
  
<style>
.codeView {
  background: #111;
  color: #ddd;
  padding: 1rem;
  font-size: .875rem;
  margin-bottom: .5rem;
}
</style>

<script>
export default {
  props: ['code', 'title', 'onClose'],
  methods: { 
  }
}
</script>