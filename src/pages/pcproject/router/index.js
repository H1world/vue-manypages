import Vue from 'vue'
import Router from 'vue-router'
// import login from '../pages/loginDemo.vue'
import home from '../pages/homepages'
import homecontent from '../pages/homeindex/homecontent'
import matchhome from '../pages/matchhome/matchhome'
import projectindex from '../pages/projectpages/projectindex'
import essentialnew from '../pages/projectpages/projectessentialnew'
import Modifypassword from '../components/Modifypassword'



Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   component: login
    // },
    {
      path: '/home',
      component: home,
      children:[
        {path:'/',
        meta: {
          // keepAlive: true,
        },
        component:homecontent}
      ]
    },
    {
      path: '/matchhome/:year/:state/:orgid/:index/:projectgameid',
      component: matchhome
    },
    {
      path: '/projectindex/:index/:projectgameid/:status/:projectid',
      component: projectindex,
      children:[
        {
          path:'/essentialnew',
          component:essentialnew,
        }
      ]
    },
    {
      path: '/Modifypassword',
      component: Modifypassword,
    },
  ]
})
