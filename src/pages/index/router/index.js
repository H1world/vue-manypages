import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import cooperateschool from '../pages/cooperateSchool.vue'
import schooldetailed from '../pages/school_detailed.vue'
import sapiens from '../pages/sapiens.vue'
import sapiensdetailed from '../pages/sapiensdetailed.vue'
import hotproject from '../pages/hotproject.vue'
import hotprojectdetailed from '../pages/hotprojectdetailed.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/sapiens',
      component: sapiens
    },
    {
      path: '/cooperateschool',
      component: cooperateschool
    },
    {
      path: '/schooldetailed/:orgid',
      component: schooldetailed
    },
    {
      path: '/sapiensdetailed/:accountid',
      component: sapiensdetailed
    },
    {
      path: '/hotproject',
      component: hotproject
    },
    {
      path: '/hotprojectdetailed/:projectid',
      component: hotprojectdetailed
    },
  ]
})
