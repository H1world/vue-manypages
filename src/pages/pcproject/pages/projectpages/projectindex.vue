<template lang="html">
  <div class="match-home">
    <div class="user-home">
      <div class="container">
        <div class="user-information">
            <div class="userphoto-project">
              <img :src="projectClassData.projectlogourl" alt="">
            </div>
            <div class="usercontent">
              <div class="username">
                <span>{{projectClassData.projectname}}</span>
              </div>
              <div class="p-project">
                <p><span>项目分类：{{projectClassData.classname}}</span><span>行业：{{projectClassData.tradename}}</span></p>
                <p><span>{{projectClassData.orgname}}</span><span>{{projectClassData.subtradename}}</span></p>
              </div>
            </div>
            <div class="project-socke">
              {{projectClassData.score}}分
            </div>
        </div>
      </div>
    </div>
    <div class="markBox">
      <div class="bookmarkBtn" @click='bookMarkpost()'>
        <el-button type="primary" icon="edit" class='submitbookmark btn-btn'>笔记</el-button>
      </div>
      <div class="isbigBox animated bounceInRight" v-if='bookmarkif' :class="{'bounceOutRight': OutRight}">
      </div>
        <div class="bookmark animated bounceInRight" :class="{'bounceOutRight': OutRight}" v-if='bookmarkif'>
          <!-- <div class="gotoRightHide" @click='bookmarkover'> -->
            <!-- <span>&gt&gt</span> -->
          <!-- </div> -->
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="您可以在这里编辑笔记" v-model="bookmarktext"></el-input>
          <div class="butbaba">
            <el-button @click='addNoteText()' class='submitbookmark fr'>提交</el-button>
            <el-button @click='bookmarkover' class='gotoRightHide'>收起</el-button>
          </div>
        </div>

    </div>
    <div class="mainsize">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><a @click='goHome()'>首页</a></el-breadcrumb-item>
        <el-breadcrumb-item><a @click='goToppages()'>赛事</a></el-breadcrumb-item>
        <el-breadcrumb-item>项目</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-tabs v-model="activeName" @tab-click="tableSelect">
      <el-tab-pane name="essentialnew" :data='projectClassData'><span slot="label" @click='projecttab_1()'>基本信息</span><v-essentialnew></v-essentialnew></el-tab-pane>
      <el-tab-pane name="projectscoring"><span slot="label" @click='projecttab_2()'>项目评分</span><v-projectscoring></v-projectscoring></el-tab-pane>
      <el-tab-pane name="projectscore"><span slot="label" @click='projecttab_3()'>项目得分</span><v-projectscore></v-projectscore></el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
let Base64 = require('js-base64').Base64;
import essentialnew from '../projectpages/projectessentialnew.vue';
import projectscoring from '../projectpages/projectscoring.vue';
import projectscore from '../projectpages/projectscore.vue';
export default {
    data(){
      return{
        activeName: 'essentialnew',
        token:Base64.decode(localStorage.getItem('token')),
        accountid:Base64.decode(localStorage.getItem('accountid')),
        projectgameid:Base64.decode(this.$route.params.projectgameid),
        projectid:this.$route.params.projectid,
        projectClassData:'',
        bookmarkif:false,
        bookmarktext:'',
        OutRight:false,
      }
    },
    components:{
      'v-essentialnew':essentialnew,
      'v-projectscoring':projectscoring,
      'v-projectscore':projectscore,
    },
    mounted(){
      this.data = this;
      this.getGameIdAndRaterId();
      if(sessionStorage.getItem('projecttab') == 'projectscoring'){
        this.activeName = 'projectscoring';
      }else if(sessionStorage.getItem('projecttab') == 'projectscore'){
        this.activeName = 'projectscore';
      };
      this.getbook();
    },
    beforeUpdate(){
        if(this.$store.state.aftersure == 'isafter'){
          this.$store.state.aftersure == '';
          this.activeName = 'projectscore';
          this.getGameIdAndRaterId();
        };
        if(this.$store.state.aftersure == 'isaftertow'){
          this.$store.state.aftersure == '';
          this.getGameIdAndRaterId();
        };
      },
    methods:{
      goHome(){
        this.$router.push({path:'/home'});
      },
      goToppages(){
        this.$router.go(-1);
      },
      tableSelect(tab, event){

      },
      projecttab_1(){
        sessionStorage.setItem('projecttab', 'essentialnew');
        this.$store.state.aftersure = '';
      },
      projecttab_2(){
        sessionStorage.setItem('projecttab', 'projectscoring');
        this.$store.state.aftersure = '';
      },
      projecttab_3(){
        sessionStorage.setItem('projecttab', 'projectscore');
      },
      //获取上面那玩意
      getGameIdAndRaterId(){
        this.$http.post(this.$store.state.url+'pc/project/game/getProjectPingTitleInfo', {'projectgameid':this.projectgameid,'projectid':this.projectid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
        this.info = JSON.stringify(response.data, null, 4);
          this.projectClassData = response.data.data;
        })
      },
      bookMarkpost(){
        this.bookmarkif=true;
        this.OutRight = false;
      },
      bookmarkover(){
        this.OutRight = true;
        let t = setTimeout(() => {
          this.bookmarkif = false;
        }, 500);
      },
      //获取书签
      getbook(){
        this.$http.post(this.$store.state.url+'pc/project/note/getProjectNoteByProjectIdAndAccountId', {'projectid':this.projectid,'accountid':this.accountid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
        this.info = JSON.stringify(response.data, null, 4);
        if(response.data.data.context == "undefined"){
          response.data.data.context = '';
        }
          this.bookmarktext = response.data.data.context;
        })
      },
      addNoteText(){
        this.$http.post(this.$store.state.url+'pc/project/note/addProjectNote', {'projectid':this.projectid,'accountid':this.accountid,'context':this.bookmarktext},
        {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
        this.info = JSON.stringify(response.data, null, 4);
          if(response.data.result == "success"){
            this.OutRight = true;
            let t = setTimeout(() => {
              this.bookmarkif = false;
            }, 500);
            this.$message({
              showClose: true,
              message: '添加书签成功',
              type: 'success'
            });
          }
          if(response.data.result == "unsuccess"){
            this.$message({
                showClose: true,
                message: '添加失败，原因未知',
                type: 'error'
              });
          }
        })
      },
    }

}
</script>

<style lang="less">
  .markBox{
    position: fixed;
    width: 100px;
    height: 30px;
    float: right;
    cursor: pointer;
    z-index:100;
    right:0;
    .bookmarkBtn{
      position: absolute;
      right: 0;
    }
    .bookmark{
      position: absolute;
      width: 500px;
      right: 15px;
      z-index: 20;
      top: -150px;
    }
    .isbigBox{
      position: absolute;
      width: 530px;
      right: 0;
      height: 370px;
      z-index: 19;
      top: -170px;
      background: #fff;
      box-shadow: 0px 0px 30px #999;
      border-radius: 5px;
    }
    .gotoRightHide{
      background: #999 !important;
      border-color: #999 !important;
      color:#fff !important;
    }
    .el-textarea__inner{
        height: 300px !important;
    }
    .el-textarea__inner:focus{
      border:1px solid #1abc9c;
    }
    .submitbookmark{
      background: #1abc9c;
      color: #fff;
      border-color:#1abc9c;
    }
    .submitbookmark:hover{
      border-color:#1abc9c;
    }
  }
  .btn-btn{
    background: #e67e22 !important;
    border-color: #e67e22 !important;
  }
  .btn-btn:hover{
    background: #e67e22 !important;
    border-color: #e67e22 !important;
  }
  .btn-btn [class*=el-icon-]+span{
    margin-left: 10px !important;
  }
  .butbaba{
    width: 200px;
    margin: 5px auto;
  }
</style>
