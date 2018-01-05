import Vue from 'vue'
import Router from 'vue-router'
// import login from '../pages/loginDemo.vue'
import home from '../pages/homepages'
import homecontent from '../pages/homeindex/homecontent'
import matchhome from '../pages/matchhome/matchhome'
import projectindex from '../pages/projectpages/projectindex'
import essentialnew from '../pages/projectpages/projectessentialnew'
import Modifypassword from '../components/Modifypassword'
//教学
import teaching from '../pages/teaching/teachindex'
import teachingindex from '../pages/teaching/teachingindex'
import teachingcourse from '../pages/teaching/teachingcourse'
import foundcourse from '../pages/teaching/course/foundcourse'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: home,
      children:[
        {path:'/teaching',
          component: teaching,
          children: [
            {
              path: '/',
              component: teachingindex,
            },
            {
              path: '/teaching/teachingcourse',
              component: teachingcourse,
            },
            {
              path: '/teaching/foundcourse',
              component: foundcourse,
            },
          ]
        },
        {
          path: '/homecontent',
          meta: {
            keepAlive: true,
          },
          component: homecontent
        },
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
