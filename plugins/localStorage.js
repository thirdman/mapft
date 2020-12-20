import createPersistedState from "vuex-persistedstate";

// export default ({ store }) => {
//   createPersistedState({
//     key: 'vuex',
//     paths: ['activeContractId', 'ui'],
//     storage: {
//       getItem: (key) => sessionStorage.get(key),
//       setItem: (key, value) => sessionStorage.set(key, value),
//       removeItem: (key) => {
//         sessionStorage.remove(key)
//       },
//     },
//   })(store)
// }

export default async ({ app, store, $axios, isHMR }) => {
  // Just in case nuxt.config.js gets a change in ssr:false when adding this plugin.
  // Notice isClient is deprecated, instead use process.browser.
  if (process.browser) {
    // In case of HMR, mutation occurs before nuxtReady, so previously saved state
    // gets replaced with original state received from server. So, we've to skip HMR.
    // Also nuxtReady event fires for HMR as well, which results multiple registration of
    // vuex-persistedstate plugin
    if (isHMR) return;
    createPersistedState({
      key: "infinft",

      // An array of any paths to partially persist the state.
      // Paths are using dots to indicate nestedness.
      paths: [
        "ui.walletAddress",
        "ui.usedContracts",
        "ui.usedContractsObj",
        "ui.draftsArray",
        "ui.contrastMode",
        "ui.devMode",
        "ui.uiMode",
        "ui.uiTheme",
        "ui.statusModalMode",
        "ui.activeContractId",
        "mintFormStore.activeContractId",
      ],
    })(store); // vuex plugins can be connected to store, even after creation
  }
};
