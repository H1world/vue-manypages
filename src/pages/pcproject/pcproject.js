// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
// import VueQuillEditor from 'vue-quill-editor'

import './scriptfile/style/css.less'
import './scriptfile/style/animate.css'
import './scriptfile/style/font-awesome.min.css'
import 'babel-polyfill'

// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
// import ispeizhi from './scriptfile/public.js'
import store from '../../vuex'
import vueResource from 'vue-resource'
var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(ElementUI)
// Vue.use(iView)
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
