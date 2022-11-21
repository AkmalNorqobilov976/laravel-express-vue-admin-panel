import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import transport from './modules/transport'
import region from './modules/region'
import news from './modules/news'
import storage from './modules/storage'
import cargo from './modules/cargo'
import cabOrder from './modules/cab-order'
import packages from './modules/package'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    transport,
    region,
    news,
    storage,
    cargo,
    "cab-order": cabOrder,
    packages
  },
  getters
})

export default store
