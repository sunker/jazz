// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Vuefire from 'vuefire'
import { db } from './services/firebase'
import App from './App'
import router from './router'
import createStore from './store'

Vue.use(Vuex)
Vue.use(Vuefire)
Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  firebase: {
    series: db.ref('series').orderByChild('created_at')
  },
  store: createStore(),
  router,
  template: '<App/>',
  components: { App }
})
