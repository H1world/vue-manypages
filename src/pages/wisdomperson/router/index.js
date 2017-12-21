import Vue from 'vue'
import Router from 'vue-router'
import wisdomhome from '../components/wisdomhome.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'wisdomhome',
      component: wisdomhome
    }
  ]
})
