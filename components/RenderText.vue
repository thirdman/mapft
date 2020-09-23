<template>
  <div>
    <div class="textItem shadow">
      <pre>{{ text }}</pre>
    </div>
  </div>
</template>
<!-- v-html="text" -->

<style>
.textItem {
  box-sizing: border-box;
  background: #f9f9f9;
  color: #111;
  padding: 2rem;

  max-width: 40rem;
  height: auto;
  width: 100%;
}
.textItem pre {
  white-space: pre-line;
}
</style>

<script>
export default {
  props: ['src'],
  head: {
    title: 'sdfsdf',
  },
  data: () => ({ text: 'sdfsdf' }),
  mounted() {
    this.asyncGet()
  },
  computed: {
    tempText(file) {
      console.log('this', this)
      console.log('this.props', this.props)

      console.log('file', file)
      console.log('src', this.src)
      const text2 = this.loadTextFromFile(this.src)
      console.log('text2', text2)
      return 'tempText'
    },
  },
  methods: {
    asyncGet(src) {
      console.log('this.src', this.src)
      fetch(this.src)
        .then((response) =>
          response.text().then((result) => {
            this.text = result
          })
        )
        .catch((error) => console.error(error))

      // return 'temp'
    },
    span(text) {
      return `<span> ${text} </span>`
    },
    loadTextFromFile(file) {
      console.log('loadtext file', file)
      const reader = new FileReader()

      // reader.onload = e => this.$emit("load", e.target.result);
      // reader.readAsText(file)
    },
  },
}
</script>
