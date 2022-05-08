// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './polyfill'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import store from './store/index'
import router from './router/index'
import VueSocketIO from "vue-socket.io";
import {i18n} from "@/plugin/i18n";

// todo
// cssVars()
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:2000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))

Vue.use(BootstrapVue)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

  let language = to.params.lang;
  if (!language) {
    language = 'en'
  }

  i18n.locale = language
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  template: '<App/>',
  components: {
    App
  }
})
