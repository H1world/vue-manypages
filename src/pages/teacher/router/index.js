import Vue from 'vue'
import Router from 'vue-router'

import home from '../pages/home/home.vue'//首页

import demandList from '../pages/demand/demandList.vue'//需求列表
//import newDetails from '../pages/demand/newDetails.vue'//新增需求
//import demandDetails from '../pages/demand/demandDetails.vue'//需求详情

import studioList from '../pages/studio/studioList.vue'//工作室列表
//import studioDetails from '../pages/studio/studioDetails.vue'//工作室详情

import eventList from '../pages/event/eventList.vue'//赛事信息
//import eventDetails from '../pages/event/eventDetails.vue'//赛事详情
import eventJoin from '../pages/event/eventJoin.vue'//参赛辅导项目
import eventReview from '../pages/event/eventReview.vue'//赛事评审
import eventRecord from '../pages/event/eventRecord.vue'//赛事历史

import courseMaterial from '../pages/course/courseMaterial.vue'//课程资料
import papersTemplate from '../pages/course/papersTemplate.vue'//问卷调查-模板
//import papersCopy from '../pages/course/papersCopy.vue'//问卷调查-问卷
//import papersTrash from '../pages/course/papersTrash.vue'//问卷调查-回收站
//import courseCase from '../pages/course/courseCase.vue'//案例

Vue.use(Router)

export default new Router({
	routes: [{
      path: '/home',//首页
      component: home
    },
//  
	{
      path: '/demandList',//需求列表
      component: demandList
    },{
//    path: '/newDetails',//新增需求
//    component: newDetails
//  },
// {
//    path: '/demandDetails',//需求详情
//    component: demandDetails
//  },
// {
      path: '/studioList',//工作室列表
      component: studioList
    },{
//    path: '/studioDetails',//工作室详情
//    component: studioDetails
//  },

//  {
      path: '/eventList',//赛事信息
      component: eventList
    },{
      path: '/eventJoin',//参赛辅导项目
      component: eventJoin
//  },{
//    path: '/eventDetails',//赛事详情
//    component: eventDetails
    },{
      path: '/eventReview',//赛事评审
      component: eventReview
     },{
      path: '/eventRecord',//赛事历史
      component: eventRecord
    },
    
    {
	  path: '/courseMaterial',//课程资料
      component: courseMaterial
    },{
      path: '/papersTemplate',//问卷调查-模板
      component: papersTemplate
//  },{
//    path: '/papersCopy',//问卷调查-问卷
//    component: papersCopy
//  },{
//    path: '/papersTrash',//问卷调查-回收站
//    component: papersTrash
//  },{
//    path: '/courseCase',//案例
//    component: courseCase
    },
	
	]
})
