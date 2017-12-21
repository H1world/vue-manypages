<template lang="html">
  <div class="match-home">
    <div class="user-home">
      <div class="container">
        <div class="user-information">
            <div class="userphoto-2">
              <img :src="ProjectGameList.projectgamelogo" alt="">
            </div>
            <div class="usercontent">
              <div class="username">
                <span>{{ProjectGameList.projectgamename}}</span>
              </div>
              <p>开始时间：{{ProjectGameList.starttime}}</p>
              <p>评分截止时间：{{ProjectGameList.signendtime}}</p>
              <p>结束时间：{{ProjectGameList.endtime}}</p>
            </div>
            <div class="username-match">
              {{ProjectGameList.orgname}}
            </div>
          <div class="usernew-right-match">
            <div class="newright">
              <span>项目总数：{{ProjectGameList.projectcount}}</span>
              <span>评审项目：{{ProjectGameList.rateprojectcount}}</span>
              <span>评审进度：{{ProjectGameList.reviewRrate}}</span>
            </div>
            <div class="newright">
              <span>已评项目：{{ProjectGameList.ratednum}}</span>
              <span>未评项目：{{ProjectGameList.nopingnum}}</span>
              <span>暂存项目：{{ProjectGameList.savenum}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mainsize">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><a @click='goHome()'>首页</a></el-breadcrumb-item>
          <el-breadcrumb-item>赛事</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <el-row :gutter="20">
          <div v-for='(classLists,index) in classList'>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <span>{{classLists.classname}}</span>
                <img :src="classLists.classlog" alt="">
                <ul>
                  <li>项目数：{{classLists.totalnumber}}</li>
                  <li>已评数：{{classLists.ratednum}}</li>
                  <li>未评数：{{classLists.nopingnum}}</li>
                  <li>暂存数：{{classLists.savenum}}</li>
                </ul>
              </div>
            </el-col>
          </div>
        </el-row>

        <el-tabs v-model="activeName" @tab-click="tableSelect">
          <el-tab-pane name="already"><span slot="label" @click='tableck_1()'>已评</span><v-already></v-already></el-tab-pane>
          <el-tab-pane name="temporary"><span slot="label" @click='tableck_2()'>暂存</span><v-mactchtemporary></v-mactchtemporary></el-tab-pane>
          <el-tab-pane name="unrated"><span slot="label" @click='tableck_3()'>未评</span><v-unrated></v-unrated></el-tab-pane>
        </el-tabs>

      </div>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
import alreadypages from '../matchhome/matchalready.vue';
import unrated from '../matchhome/matchunrated.vue';
import mactchtemporary from '../matchhome/mactchtemporary.vue';
import botany0 from '../../assets/botany0.png';
import botany1 from '../../assets/botany1.png';
import botany2 from '../../assets/botany2.png';
import botany3 from '../../assets/botany3.png';

export default {
  data(){
    return{
      activeName: 'already',
      a:'1',
      token:Base64.decode(localStorage.getItem('token')),
      accountid:Base64.decode(localStorage.getItem('accountid')),
      yearvalue:Base64.decode(this.$route.params.year),
      statevalue:Base64.decode(this.$route.params.state),
      organizavalue:Base64.decode(this.$route.params.orgid),
      index:this.$route.params.index,
      ProjectGameList:'',
      projectgameid:Base64.decode(this.$route.params.projectgameid),
      classList:'',
      Checked:'',
      NotChecked:'',
      PauseChecked:'',
    }
  },
  components: {
    'v-already':alreadypages,
    'v-unrated':unrated,
    'v-mactchtemporary':mactchtemporary,
  },
  mounted(){
    this.getProjectGameList(this.yearvalue,this.statevalue,this.organizavalue);
    this.getProjectGameId();
    if(sessionStorage.getItem('tab') == 'temporary'){
      this.activeName = 'temporary';
    }else if(sessionStorage.getItem('tab') == 'unrated'){
      this.activeName = 'unrated';
    }
    this.getGameIdAndRaterId();
  },
  beforeUpdate(){
    this.$store.commit('checked',this.Checked)
    this.$store.commit('nochecked',this.NotChecked)
    this.$store.commit('PauseChecked',this.PauseChecked)
  },
  methods:{
    getGameIdAndRaterId(){
      this.$http.post(this.$store.state.url+'pc/project/game/getProjectListByProjectGameIdAndRaterId', 
	      {'projectgameid':this.projectgameid,'accountid':this.accountid},
	      {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.Checked = response.data.data.Checked;
        this.NotChecked = response.data.data.NotChecked;
        this.PauseChecked = response.data.data.PauseChecked;
        // this.$store.commit('checked',response.data.data.Checked)
        // this.$store.commit('nochecked',response.data.data.NotChecked)
        // this.$store.commit('PauseChecked',response.data.data.PauseChecked)
      })
    },
    goHome(){
      this.$router.push({path:"/home"});
    },
    tableSelect(tab, event){
      // console.log(tab,event);
    },
    tableck_1(){
      sessionStorage.setItem('tab', 'already');
    },
    tableck_2(){
      sessionStorage.setItem('tab', 'temporary');
    },
    tableck_3(){
      sessionStorage.setItem('tab', 'unrated');
    },
    //获取赛事数据
    getProjectGameList(year,state,orgid){
      this.$http.post(this.$store.state.url+'pc/project/game/getProjectGameListByRaterId', 
	      {'year':year,'state':state,'orgid':orgid},
	      {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
            this.ProjectGameList = response.data.data[this.index];
            this.ProjectGameList['reviewRrate'] = parseInt(this.ProjectGameList.ratednum/this.ProjectGameList.rateprojectcount*100)+'%';
            if(this.ProjectGameList.ratednum == 0){
              this.ProjectGameList['reviewRrate'] = 0+'%';
            }
          // this.getGameIdAndRaterId();
      })
    },
    //
    //某个赛事的各分类的统计信息
    getProjectGameId(){
      this.$http.post(this.$store.state.url+'pc/project/game/getClassProjectNumberByProjectGameId', {'projectgameid':this.projectgameid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.classList = response.data.data;
        var mycars=new Array()
            mycars[0]=botany0
            mycars[1]=botany1
            mycars[2]=botany2
            mycars[3]=botany3
        for(let i in this.classList){
          this.classList[i]['classlog'] = mycars[i];
        }
      })
    },
  },
}
</script>

<style lang="less">
.username{
    width: 750px;
    span{
      display: inline-block;
      max-width: 100% !important;
      overflow: hidden;
      word-break: keep-all;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
}
.usernew-right-match{
  right:300px !important;
}
.el-row {
  // width: 1170px;
  &:last-child {
    margin-bottom: 0;
        text-align: center;
  }
}
.bg-purple {
      text-align: center;
  span{
    display: block;
    text-align: left;
    padding-left: 10px;
    font-size: 20px;
    padding-bottom: 10px;
  }
  img{
    width: 80px;
    height: 80px;
    // background: #1abc9c;
    display: inline-block;
  }
  ul{
    display: inline-block;
    font-size: 10px;
    margin-left: 15px;
    li{
      line-height: 18px;
      font-size: 15px;
    }
  }
}
.el-button{
  span{
    margin: 0 !important;
    padding-bottom: 0;
    font-size: 15px;
  }
}
</style>
