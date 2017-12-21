<template lang="html">
  <div class="main">
    <div class="user-home">
      <div class="container">
        <div class="user-information">
            <div class="userphoto">
              <img :src="user.userimage" alt="">
            </div>
            <div class="usercontent">
              <div class="username">
                <span>{{user.username}}</span>
                <button type="button" name="button">未认证<i></i></button>
              </div>
              <div>
                <p>{{user.orglist[0].provincename}} - {{user.orglist[0].cityname}}</p>
                <p>{{user.orglist[0].orgname}} - {{user.orglist[0].collegename}}</p>
              </div>
            </div>
          <div class="usernew-right">
            <div class="newright">
              <span>总赛事数量：{{tongj.totalgamenumber}}</span>
              <span>已评赛事：{{tongj.pinggamenumber}}</span>
              <span>未评赛事：{{tongj.nopinggamenumber}}</span>
            </div>
            <div class="newright">
              <span>总项目数量：{{tongj.totalprojectnumber}}</span>
              <span>已评项目：{{tongj.pingprojectnumber}}</span>
              <span>未评项目：{{tongj.nopingprojectnumber}}</span>
              <span>暂存项目：{{tongj.saveprojectnumber}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mainsize">
      <div class="projectgame-list">
        <div class="list-query">
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">
              年代：
              <el-select v-model="yearvalue" placeholder="请选择">
                <el-option
                  v-for="year in yeass"
                  :key="year.year"
                  :label="year.yearname"
                  :value="year.year">
                </el-option>
              </el-select>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              状态：
              <el-select v-model="statevalue" placeholder="请选择">
                <el-option
                  v-for="state in states"
                  :key="state.state"
                  :label="state.statename"
                  :value="state.state">
                </el-option>
              </el-select>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              组织：
              <el-select v-model="organizavalue" placeholder="请选择">
                <el-option
                  v-for="organiza in organizas"
                  :key="organiza.orgid"
                  :label="organiza.orgname"
                  :value="organiza.orgid"
                  >
                </el-option>
              </el-select>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-button type="primary" class="queryButton" icon="search" @click='queryYSO()'>查询</el-button>
            </div></el-col>
          </el-row>

        </div>

      </div>
      <div class="list-review">
        <ul>
          <li v-for='(ProjectGameLists,index) in ProjectGameList'>
      			<div class="review-match-photo">
              <img :src="ProjectGameLists.projectgamelogo" alt="">
      			</div>
      			<div class="review-match">
      				<h5 class="review-match-name">{{ProjectGameLists.projectgamename}}
      					<span class="in-organiza">{{ProjectGameLists.orgname}}</span>
      				</h5>
      			</div>
            <div class="review-main">
              <div class="review-list fl">
                <span>开始时间：{{ProjectGameLists.starttime}}</span>
                <span>评分截止时间：{{ProjectGameLists.signendtime}}</span>
                <span>结束时间：{{ProjectGameLists.endtime}}</span>
              </div>
              <div class="review-list fr">
                <p>
                  <span>项目总数：{{ProjectGameLists.projectcount}}</span>
                  <span>评审项目：{{ProjectGameLists.rateprojectcount}}</span>
                </p>
                <p>
                  <span>已评项目：{{ProjectGameLists.ratednum}}</span>
                  <span>未评项目：{{ProjectGameLists.nopingnum}}</span>
                  <span>暂存项目：{{ProjectGameLists.savenum}}</span>
                  <span>评审进度：{{ProjectGameLists.reviewRrate}}</span>
                </p>
              </div>
            </div>
            <div>
              <el-button type="primary" class="queryButton" @click='theMatchHome(index)'>查看</el-button>
            </div>
      		</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
  data(){
    return{
      token:Base64.decode(localStorage.getItem('token')),
      accountid:Base64.decode(localStorage.getItem('accountid')),
      user:'',                                            //评委个人信息（用于头部）
      tongj:'',                                           //评委个人评审的统计信息
      getyso:'',                                          //年代、状态以及组织列表
      yearvalue:0,                                        //年代
      statevalue:0,                                       //状态
      organizavalue:0,                                    //组织
      yeass:[{}],                                         //年代容器
      states:[{}],                                        //状态容器
      organizas:[{}],                                     //组织容器
      ProjectGameList:'',
    }
  },
  mounted(){
    this.getUserInformation();
    this.getUserTj();
    this.getYSO();
    // localStorage.setItem('token', this.$route.params.token);
    // localStorage.setItem('accountid', this.$route.params.accountid);

    if(this.$store.state.yearvalue == ''){
      this.$store.state.yearvalue = 0;
    }
    if(this.$store.state.statevalue == ''){
      this.$store.state.statevalue = 0;
    }
    if(this.$store.state.organizavalue == ''){
      this.$store.state.organizavalue = 0;
    }
    this.yearvalue = this.$store.state.yearvalue;
    this.statevalue = this.$store.state.statevalue;
    this.organizavalue = this.$store.state.organizavalue;
    this.getProjectGameList(this.$store.state.yearvalue,this.$store.state.statevalue,this.$store.state.organizavalue);
  },
  methods:{
    //获取用户头像
    getUserInformation(){
      this.$http.post(this.$store.state.url+'pc/person/getMyBrieflyInfo', {accountid :this.accountid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.user = response.data.data;
    })
    },
    //获取数量
    getUserTj(){
      this.$http.post(this.$store.state.url+'pc/project/game/getRaterGameTotalInfoByRaterId', {},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.tongj = response.data.data;
      })
    },
  //获取查询条件
    getYSO(){
      this.$http.post(this.$store.state.url+'pc/project/game/getProjectGameSearchCondition', {},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.getyso = response.data.data;
        this.yeass = this.getyso.yearlist;
        this.states = this.getyso.statelist;
        this.organizas = this.getyso.orglist;
      })
    },
  //跳转赛事首页
  theMatchHome(index){
    let projectgameid = Base64.encode(this.ProjectGameList[index].projectgameid);
    let yearvalue = Base64.encode(this.yearvalue);
    let statevalue = Base64.encode(this.statevalue);
    let organizavalue = Base64.encode(this.organizavalue);
    this.$router.push({path:'/matchhome/'+yearvalue+'/'+statevalue+'/'+organizavalue+'/'+index+'/'+projectgameid+''});
  },
  //获得评委评审的赛事列表
  getProjectGameList(year,state,orgid){
    this.$http.post(this.$store.state.url+'pc/project/game/getProjectGameListByRaterId', 
    {'year':year,'state':state,'orgid':orgid},
    {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
    this.info = JSON.stringify(response.data, null, 4);
        this.ProjectGameList = response.data.data;
        for(let i in this.ProjectGameList){
          this.ProjectGameList[i]['reviewRrate'] = parseInt(this.ProjectGameList[i].ratednum/this.ProjectGameList[i].rateprojectcount*100)+'%';
          if(this.ProjectGameList[i].ratednum == 0){
            this.ProjectGameList[i]['reviewRrate'] = 0+'%';
          }
        }
    })
  },
  queryYSO(){
    this.$store.commit('yearvalue',this.yearvalue);
    this.$store.commit('statevalue',this.statevalue);
    this.$store.commit('organizavalue',this.organizavalue);
    this.getProjectGameList(this.yearvalue,this.statevalue,this.organizavalue)
  },

  },

}
</script>

<style lang="less">
.mainsize{
  .projectgame-list{
    margin-top: 30px;
    z-index: 1;
    position: relative;
    border-bottom: 1px solid #ccc;
    padding-bottom: 30px;
    .list-query{
      .el-select-dropdown__item .selected{
        background-color: #1abc9c !important;
      }
    }

    .queryButton{
      float:right;
      background: #1abc9c;
      border-color:#1abc9c;
      margin-right: 20px;
    }
  }
  .list-review{
    margin: 0 0 20px 0;
    ul{
      li{
        display: block;
        overflow: hidden;
        padding: 20px 10px;
        border-bottom:1px solid #ccc;
        position: relative;
        .review-match-photo{
          width: 150px;
          height: 150px;
          float: left;
          margin-right: 50px;
          img{
            height: 100%;
            width: 100%;
            border-radius: 12%;
            border: 1px solid #ecf0f1;
          }
        }
        .review-match{
          .review-match-name{
            color: #34495e;
            font-size: 22px;
            font-weight: normal;
            margin: 0 0 10px 0;
            .in-organiza{
              float: right;
            }
          }
        }
        .review-main{
          width: 65%;
          display: inline-block;
          .review-list{
            display: inline-block;
            color: #7f8c8d;
            font-size: 16px;
            font-weight: 200;
            p{
              margin: 15px 0;
              span{
                padding:5px;
                display: inline-block;
              }
            }
            span{
              padding:5px 0;
              display:block;
            }
          }
        }
        .queryButton{
          position: absolute;
          right: 20px;
          bottom: 20px;
          background: #1abc9c;
          border-color: #1abc9c;
          cursor: pointer;
        }
      }
    }
  }
}

</style>
