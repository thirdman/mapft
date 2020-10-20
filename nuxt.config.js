export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  env: {
    // baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  /**
   * this brings in environment variables to public and private nuxt references
   */
  publicRuntimeConfig: {
    network: "rinkeby",
    infuraUrlRinkeby: process.env.INFURA_URL_RINKEBY,
    infuraUrlMain: process.env.INFURA_URL_RINKEBY,
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "@/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
      },
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js",
      },
      {
        src: "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js",
      },
      {
        src: "/arweaveFinal.js",
      },
      // {
      //   src: "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js",
      //   type: "module",
      // },
      // {
      //   nomodule: true,
      //   src:
      //     "https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js",
      // },
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    "@/assets/css/main.css",
    "@/assets/css/style.css",
    // SCSS file in the project
    // '@/assets/css/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "~/plugins/localStorage.js", ssr: false },
    { src: "~plugins/vue-js-modal.js" }, // mode: 'client'
    // { src: '~plugins/web3Load.js' },
    // { src: '~plugins/arweaveFinal.js' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    // Doc: https://github.com/nuxt/content
    // "@nuxt/content",
    // 'vue-ethereum/nuxt',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    // Add exception
    transpile: ["vee-validate/dist/rules"],
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    // ...
    // },
    friendlyErrors: false,
  },
};
