import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _49ff19c9 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _7676571a = () => interopDefault(import('../pages/alpha.vue' /* webpackChunkName: "pages/alpha" */))
const _b1b073bc = () => interopDefault(import('../pages/flow.vue' /* webpackChunkName: "pages/flow" */))
const _4c854e11 = () => interopDefault(import('../pages/gallery/index.vue' /* webpackChunkName: "pages/gallery/index" */))
const _4483a154 = () => interopDefault(import('../pages/mint.vue' /* webpackChunkName: "pages/mint" */))
const _c1028848 = () => interopDefault(import('../pages/view/index.vue' /* webpackChunkName: "pages/view/index" */))
const _5fb032d0 = () => interopDefault(import('../pages/gift/notgift.vue' /* webpackChunkName: "pages/gift/notgift" */))
const _125756a0 = () => interopDefault(import('../pages/gallery/_contract.vue' /* webpackChunkName: "pages/gallery/_contract" */))
const _432cfe49 = () => interopDefault(import('../pages/gift/_contract/index.vue' /* webpackChunkName: "pages/gift/_contract/index" */))
const _b2ecf984 = () => interopDefault(import('../pages/view/_contract/index.vue' /* webpackChunkName: "pages/view/_contract/index" */))
const _5aac6530 = () => interopDefault(import('../pages/gift/_contract/notid/index.vue' /* webpackChunkName: "pages/gift/_contract/notid/index" */))
const _4547fef1 = () => interopDefault(import('../pages/gift/_contract/_id.vue' /* webpackChunkName: "pages/gift/_contract/_id" */))
const _af0985b4 = () => interopDefault(import('../pages/view/_contract/_id.vue' /* webpackChunkName: "pages/view/_contract/_id" */))
const _69b6f48e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _49ff19c9,
    name: "about"
  }, {
    path: "/alpha",
    component: _7676571a,
    name: "alpha"
  }, {
    path: "/flow",
    component: _b1b073bc,
    name: "flow"
  }, {
    path: "/gallery",
    component: _4c854e11,
    name: "gallery"
  }, {
    path: "/mint",
    component: _4483a154,
    name: "mint"
  }, {
    path: "/view",
    component: _c1028848,
    name: "view"
  }, {
    path: "/gift/notgift",
    component: _5fb032d0,
    name: "gift-notgift"
  }, {
    path: "/gallery/:contract",
    component: _125756a0,
    name: "gallery-contract"
  }, {
    path: "/gift/:contract",
    component: _432cfe49,
    name: "gift-contract"
  }, {
    path: "/view/:contract",
    component: _b2ecf984,
    name: "view-contract"
  }, {
    path: "/gift/:contract?/notid",
    component: _5aac6530,
    name: "gift-contract-notid"
  }, {
    path: "/gift/:contract?/:id",
    component: _4547fef1,
    name: "gift-contract-id"
  }, {
    path: "/view/:contract/:id",
    component: _af0985b4,
    name: "view-contract-id"
  }, {
    path: "/",
    component: _69b6f48e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
