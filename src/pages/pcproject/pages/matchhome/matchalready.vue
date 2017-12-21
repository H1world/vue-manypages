<template lang="html">
  <div class="matchtables">
    <el-row>
      <el-col :xs="4" :sm="6" :md="8" :lg="6"><div class="grid-content bg-purple-light">
        行业：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.tradeid"
            :label="item.name"
            :value="item.tradeid">
          </el-option>
        </el-select>
      </div></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="15"><div class="grid-content bg-purple-light">
        <div class="input-project-name">
          项目名称：<el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </div></el-col>
       <el-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content bg-purple">
          <el-button type="primary" class="queryButton" icon="el-icon-search" @click='searchGameIdAndRaterId()'>查询</el-button>
       </div></el-col>
    </el-row>

    <div class="get-projectgame" v-for='(check,index) in checked'>
      <img :src="check.projectlogourl" alt="">
      <div class="projectgame-right">
        <h3>{{check.projectname}}</h3>
        <p>
          <span>项目分类：{{check.classname}}</span>
          <span>行业：{{check.tradename}}--{{check.subtradename}}</span>
          <span>项目阶段：{{check.processname}}</span>
          <span>负责人：{{check.creater}}</span>
          <span class="fr score">{{check.score}}分</span>
        </p>
        <p><span>{{check.orgname}}</span><span>{{check.collegename}}</span><el-button type="primary" class="queryButton fr" @click='goToxmsy(index)'>进入</el-button></p>
      </div>
    </div>
    <div class="ifnohave" v-show='ifnohavealready'>
      <--暂无数据-->
    </div>

  </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
  data(){
    return {
      options:'',
      value:"0",
      input: '',
      token:Base64.decode(localStorage.getItem('token')),
      accountid:Base64.decode(localStorage.getItem('accountid')),
      projectgameid:Base64.decode(this.$route.params.projectgameid),
      //已评
      checked:'',
      checkeded:'',
      ifnohavealready:false,
      valuealready:'',
      inputalready:'',
    }
  },
  mounted(){
    this.getTrade();
    this.getGameIdAndRaterId();
  },
  beforeUpdate(){
    if(this.valuealready != '' || this.inputalready != ''){
      this.checked = this.checkeded;
    }else{
      this.checked = this.$store.state.checked;
    };
    if(this.checked == ''){
      this.ifnohavealready = true;
    }else{
      this.ifnohavealready = false;
    }
  },
  methods:{
    //获取大行业
    getTrade(){
      this.$http.post(this.$store.state.url+'system/getTrade', {},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        // console.log(response.data.data);
        let arr = [{tradeid:"0",name:"全部"}]
        this.options = response.data.data;
        this.options.unshift(...arr);
      })
    },
    //获得某个赛事项目列表
    getGameIdAndRaterId(){
      // this.$http.post(this.$store.state.url+'pc/project/game/getProjectListByProjectGameIdAndRaterId', {'projectgameid':this.projectgameid,'accountid':this.accountid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      // this.info = JSON.stringify(response.data, null, 4);
        // this.$store.commit('checked',response.data.data.Checked)
        // this.$store.commit('nochecked',response.data.data.NotChecked)
        // this.$store.commit('PauseChecked',response.data.data.PauseChecked)
        // this.checked = response.data.data.Checked;
        // console.log(1);
        // if(response.data.data.Checked == ''){
        //   this.ifnohave = true;
        // }
        // this.checked = this.$store.state.checked;
        // console.log(this.$store.state.checked);
        // console.log(2);
      // })
    },
    //根据查询条件获得项目列表
    searchGameIdAndRaterId(){
      this.$http.post(this.$store.state.url+'pc/project/game/searchProjectListByProjectGameIdAndRaterId', {'projectgameid':this.projectgameid,'accountid':this.accountid,'tradeid':this.value,'status':2,'projectname':this.input},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.valuealready = this.value;
        this.inputalready = this.input;
        this.checkeded = response.data.data;
    })
    },
    //跳转到项目首页
    goToxmsy(index){
      let projectgameid = this.$route.params.projectgameid;
      let projectid = this.checked[index].projectid;
      this.$router.push({path:'/projectindex/'+index+'/'+projectgameid+'/2/'+projectid+''});
    }
  }
}
</script>

<style lang="less">
.el-select{
  width: 80%;
}
.input-project-name{
  margin-left: 20px;
  display: inline-block;
  width: 100%;
  .el-input{
    width: 85%;
  }
}
.queryButton{
  .el-icon-search{
    display: inline-block;
  }
  span{
    display: inline-block;
    padding-right: 0px !important;
  }
  float:right;
  background: #1abc9c;
  border-color:#1abc9c;
  margin-right: 20px;
}
.get-projectgame{
  display: inline-block;
  width: 100%;
  margin-top: 30px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  img{
    display: inline-block;
    width: 150px;
    height: 150px;
    border: 3px solid #fff;
    float: left;
    background: #1abc9c;
  }
  .projectgame-right{
    display: inline-block;
    padding: 10px 0 10px 50px;
    width: 964px;
    h3{
      font-size: 25px;
      font-weight: 600;
      padding-bottom: 5px;
    }
    p{
      padding: 15px 0;
      width: 100%;
      span{
        padding-right: 30px;
      }
      .score{
        font-size: 40px;
        line-height: 20px;
      }
      .queryButton{
          margin-top: 20px;
      }
    }
  }
}
</style>
