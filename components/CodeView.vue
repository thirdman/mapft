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
      <pre><code>{{code && code.data}}</code></pre>
    </div>
      <!-- && JSON.stringify(code) -->
  </div>
  
</template>
  
<style lang="scss">
.codeView {
  background: #111;
  color: #ddd;
  padding: .25rem 1rem;
  font-size: .75rem;
  margin-bottom: .5rem;
  overflow: scroll;
  min-height: 10rem;
  max-height: 20rem;
  code, pre{
    font-size: .75rem;
  }
}
</style>

<script>
export default {
  props: ['code', 'title', 'onClose'],
  methods: { 
  }
}
</script>