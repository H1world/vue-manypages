<!-- 热门项目 -->
<template lang="html">
  <div class="container mb80">

    <!--路径-->
    <el-breadcrumb separator="/" class="breadcrumb mt30">
      <el-breadcrumb-item><router-link :to="{path:'/'}">首页</router-link></el-breadcrumb-item>
      <el-breadcrumb-item>热门项目</el-breadcrumb-item>
    </el-breadcrumb>


    <div class="row">
      <div class="col-md-9">
        <!--查询-->
        <div class="search mbl">
          <form>
            <label class="mll">所属行业</label>
            <el-select class='select-from-control' v-model="tradvalue" placeholder="全部">
              <el-option
                v-for="trad in traddata"
                :key="trad.tradeid"
                :label="trad.name"
                :value="trad.tradeid">
              </el-option>
            </el-select>

            <label class="mll">项目阶段</label>
            <el-select class='select-org' v-model="stagevalue" placeholder="全部">
              <el-option
                v-for="stage in stagedata"
                :key="stage.processid"
                :label="stage.processname"
                :value="stage.processid">
              </el-option>
            </el-select>
            <label class="mll">项目名称</label>
            <input class="form-control" type="text" placeholder="请输入项目名称" v-model="queryprojectName" @keyup="inputKeyEnter($event)">
            <button type="button" class="btn btn-primary btn-sm" @click='getQueryData()'><i class="fa fa-search"></i> 查询</button>
          </form>
        </div>
        <!--左侧列表，每页显示十条-->
        <div class="section-home">
          <div class="f-line">
            <span class="fr">共 {{orgAllNumData}} 个项目</span>
            <div>
              <a class="curr"><i class="fa fa-long-arrow-down"></i> 综合</a>
            </div>
          </div>
          <ul class="school-list">
            <li v-for='listData in orgListData'>
              <router-link :to="{path:'/hotprojectdetailed/'+listData.projectid+''}" target="_blank">
                <div class="logo br12 mrl fl">
                  <img :src="listData.projectlogo">
                </div>
                <div class="ovh">
                  <h5 class="fl">{{listData.name}}</h5>
                </div>
                <div class="ovh">
                  <span class="fl">{{listData.orgname}}</span>
                  <span class="fl">{{listData.tradename}}</span>
                  <span class="fr">{{listData.orgname}}</span>
                </div>
                <div class="tags">
                  <span v-for='technology in listData.technologylist'>{{technology.technologyname}}</span>
                </div>
              </router-link>
            </li>
            <li v-show='ifListNohaveData' class="nohavedatastyle">
              暂无
            </li>
          </ul>
          <!--分页-->
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total= PageCount
              :current-page = currentpage
              @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
      </div>
      <!--右侧列表，显示十条-->
      <div class="col-md-3 right-list">
        <h5>热门项目</h5>
        <div class="section-title aside-right">
          <router-link :to="{path:'/hotprojectdetailed/'+hotproject.projectid+''}" target="_blank" v-for='hotproject in hotProjectData' :key='hotproject.id'>
          <!-- :to="{path:'/sapiensdetailed/'+listData.accountid+''}" -->
            <div class="ovh">
              <span class="section-photo">
                <img :src="hotproject.logourl">
              </span>
              <div class="name">
                <span>{{hotproject.name}}</span>
                <p class="mt-15">{{hotproject.tradename}}</p>
              </div>
            </div>
          </router-link>

        </div>
      </div>

    </div>
    <div class="pageStyle" v-if='pageState'>

    </div>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
  data(){
    return{
      stagedata:'',
      traddata:'',
      stagevalue:'',
      tradvalue:'',
      orgListData: '',
      orgAllNumData: '',
      queryprojectName: '',
      ifListNohaveData: false,
      PageCount:0,
      currentpage:1,
      hotProjectData:'',
      pageState:'',
    }
  },
  methods: {
      handleCurrentChange(val) {
        this.pageState = true;
        if(typeof(this.stagevalue) == 'string'){
        var r = '';
        for(let i in this.stagedata){
          if(this.stagedata[i].processname == this.stagevalue){
            r = this.stagedata[i].processid;
          }
        }
        this.stagevalue = r;
        }
        this.getwisemanList (this.tradvalue,this.stagevalue,this.queryprojectName,val);

      },

      getStagemethods(){
        this.$store.dispatch('getStage');
        this.stagedata = this.$store.state.getStageData;

      },

      getTrademethods(){
        this.$store.dispatch('getTrade');
        this.traddata = this.$store.state.getTradeData;
      },

      getwisemanList( tradeid, processid, projectname, page) {
        if(tradeid === ''){
          tradeid = 0;
        };
        if(processid === ''){
          processid = 0;
        };
        this.$http.post(this.$store.state.url+'pc/project/getAllProjectList',{tradeid:tradeid,processid:processid,projectname:this.queryprojectName,page:page},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
          this.orgListData = response.data.data.projectlist;
          this.orgAllNumData = response.data.data.totalresult;
          this.PageCount = parseInt(response.data.data.totalresult);
          this.currentpage = response.data.data.page;
          if(this.orgListData == ''){
            this.ifListNohaveData = true;
          }else{
            this.ifListNohaveData = false;
          };
          for(let i in this.orgListData){
            this.orgListData[i].projectid = Base64.encode(this.orgListData[i].projectid)
          }
          if(response.data.result == "success"){
            this.pageState = false;
          }
         })
      },

      getHotprojectlist(){
        this.$http.post(this.$store.state.url+'pc/project/getHotProjectList',{tradeid:0,processid:0,projectname:this.queryprojectName},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
          this.hotProjectData = response.data.data.projectlist;
          for(let i in this.hotProjectData){
            this.hotProjectData[i].projectid = Base64.encode( this.hotProjectData[i].projectid )
          }
         })
      },


      inputKeyEnter(ev){
        if(ev.keyCode == 13){
          this.getQueryData();
        }
      },

      getQueryData(){
        if(typeof(this.stagevalue) == 'string'){
        var r = '';
        for(let i in this.stagedata){
          if(this.stagedata[i].processname == this.stagevalue){
            r = this.stagedata[i].processid;
          }
        }
        this.stagevalue = r;
        }
        this.getwisemanList (this.tradvalue,this.stagevalue,this.queryprojectName,1);
      },

    },

  mounted(){
    this.getStagemethods();

    this.getTrademethods();

    this.getHotprojectlist();

    this.getwisemanList (0,Base64.decode(this.$store.state.indextohotprojectstageid),'',1);
    this.stagevalue = Base64.decode(this.$store.state.indextohotprojectstagename);
  },

}
</script>

<style lang="less">
  .breadcrumb{
    padding-left: 0 !important;
    background: none !important;
  }
  .stageI{
    font-style: normal;
    padding-right: 15px;
  }
  .tags span{
    margin-bottom:10px !important;
  }
//element UIstyle
  .el-pagination{
    text-align: center;
    button{
      height: 38px !important;
      line-height: 38px !important;
      width: 38px !important;
    }
    .btn-prev:hover, .btn-next:hover{
      color: #1abc9c;
    }
    .el-pager{
      li{
        // font-size: 15px;
        padding: 0 15px !important;
        height: 38px !important;
        line-height: 38px !important;
      }
      li.active{
        border-color: #1abc9c;
        background-color: #1abc9c;
      }
      li.active:hover{
        z-index: 3;
        color: #fff;
        cursor: default;
        background-color: #1abc9c;
        border-color: #1abc9c;
      }
      li:hover{
        z-index: 2;
        color: #23527c;
        background-color: #eee;
        border-color: #ddd;
        box-shadow: 0px 0 5px #999999;
      }
    }
  }
  .el-pager li.active+li {
    padding-left: 15px !important;
  }
  //element UI over
</style>
