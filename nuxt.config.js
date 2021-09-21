export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  // mode: "universal", // deprecaded
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",

  /**
   * this brings in environment variables to public and private nuxt references
   */
  publicRuntimeConfig: {
    network: "rinkeby",
    infuraUrlRinkeby: process.env.INFURA_URL_RINKEBY,
    infuraUrlMain: process.env.INFURA_URL_RINKEBY,
    // baseUrl: process.env.BASE_URL,
    // rootUrl:
    //   process.env.PROD_BASE_URL ||
    //   process.env.STAGING_BASE_URL ||
    //   process.env.DEV_BASE_URL,
    // factoryContract:
    //   process.env.PROD_FACTORY_CONTRACT ||
    //   process.env.STAGING_FACTORY_CONTRACT ||
    //   process.env.DEV_FACTORY_CONTRACT,
    // requiredNetwork:
    //   process.env.PROD_NETWORK ||
    //   process.env.STAGING_NETWORK ||
    //   process.env.DEV_NETWORK,
    // infuraUrl:
    //   process.env.PROD_INFURA_URL ||
    //   process.env.STAGING_INFURA_URL ||
    //   process.env.DEV_INFURA_URL,
    // VERCEL_ENV: process.env.VERCEL_ENV,
    // VERCEL_GIT_REPO_SLUG: process.env.VERCEL_GIT_REPO_SLUG,
    // VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
    // VERCEL_GIT_COMMIT_MESSAGE: process.env.VERCEL_GIT_COMMIT_MESSAGE,
  },
  env: {
    tempUrl:
      // process.env.PROD_BASE_URL ||
      // process.env.STAGING_BASE_URL ||
      // process.env.DEV_BASE_URL ||
      "http://localhost:3333",
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Unknown Game",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "og:site_name", name: "og:site_name", content: "Unknown Game" },
      {
        hid: "description",
        name: "description",
        content: "NFT map tiles.",
      },
    ],
    link: [
      // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
      },
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js",
      },

      {
        type: "module",
        src: "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js",
      },

      { src: "https://unpkg.com/3box/dist/3box.api.min.js", mode: "client" },
    ],
  },
  /*
   ** Global CSS
   */
  css: ["@/assets/css/style.css", "@/assets/css/main.scss"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "~/plugins/localStorage.js", ssr: false },
    { src: "~plugins/vue-js-modal.js" }, // mode: 'client'
    { src: "~plugins/web3ModalPlugin.js", mode: "client" },
    // { src: "~plugins/web3Load.js", mode: "client" },
    // { src: "~/plugins/vue-tooltip.js", mode: "client" },
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
    "@nuxtjs/google-analytics",
    "@nuxtjs/vuetify",
  ],

  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: "#ff00ff",
          secondary: "#424242",
          accent: "#FF1744",
          error: "#b71c1c",
          transparent: "rgba(0,0,0,.00)",
        },
        light: {
          primary: "#101010",
          secondary: "#424242",
          accent: "#FF1744",
          error: "#b71c1c",
          transparent: "rgba(0,0,0,.00)",
        },
      },
    },
  },
  // googleAnalytics: {
  //   id: "UA-183944269-2",
  // },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // Doc: https://github.com/nuxt/content
    // "@nuxt/content",
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    [
      "nuxt-mq",
      {
        // Default breakpoint for SSR
        defaultBreakpoint: "sm",
        breakpoints: {
          sm: 450,
          md: 780,
          lg: 1250,
          xl: Infinity,
        },
      },
    ],
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
    transpile: [
      "vee-validate/dist/rules",
      "@devlop-ab/dialog",
    ],
    babel: {
      plugins: [["@babel/plugin-proposal-private-methods", { loose: true }]],
    },

    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    // ...
    // },
    friendlyErrors: false,
  },
};
