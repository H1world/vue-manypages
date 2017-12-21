// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '../../vuex'
import ElementUI from 'element-ui'

import './style/bootstrap.css'
import './style/bootstrap-datetimepicker.css'
import './style/fantaStyle.css'
import './style/animation.min.css'
import './style/flat-ui.css'
import './style/font-awesome.min.css'
import './style/style.css'

import 'element-ui/lib/theme-chalk/index.css'
import './style/element-ui-rewrite.less'

//引用vue-resource
import vueResource from 'vue-resource'

var VueCookie = require('vue-cookie');

// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(ElementUI)
Vue.use(vueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
new Vue({
  el:'title',
  computed : {
    title () {
      return store.state.title
    }
  }
})
