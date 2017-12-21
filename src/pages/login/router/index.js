import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import scrolladminregister from '../components/schooladmin.vue'
import teacheradminregister from '../components/teacheradmin.vue'
import studentadminregister from '../components/studentadmin.vue'
import forgotpassword from '../components/forgotpassword.vue'
import agreement from '../components/agreement.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/scrolladminregister',
      name: 'scrolladminregister',
      component: scrolladminregister
    },
    {
      path: '/teacheradminregister',
      name: 'teacheradminregister',
      component: teacheradminregister
    },
    {
      path: '/studentadminregister',
      name: 'studentadminregister',
      component: studentadminregister
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: forgotpassword
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: agreement
    },
  ]
})
