<!-- 合作院校 -->
<template lang="html">
  <div class="container mb80">

    <!--路径-->
    <el-breadcrumb separator="/" class="breadcrumb mt30">
      <el-breadcrumb-item><router-link :to="{path:'/'}">首页</router-link></el-breadcrumb-item>
      <el-breadcrumb-item>合作院校</el-breadcrumb-item>
    </el-breadcrumb>


    <div class="row">
      <div class="col-md-9">
        <!--查询-->
        <div class="search mbl">
          <form>
            <label class="mll">地区</label>
            <el-select class='select-org' v-model="shengvalue" placeholder="选择省" @change=getSchoolInAction(shengvalue)>
              <el-option
                v-for="org in orglist"
                :key="org.provinceid"
                :label="org.name"
                :value="org.provinceid">
              </el-option>
            </el-select>
            -
            <el-select class='select-org' v-model="cityvalue" placeholder="选择市">
              <el-option
                v-for="city in citylist"
                :key="city.cityid"
                :label="city.name"
                :value="city.cityid">
              </el-option>
            </el-select>
            <label class="mll">院校名称</label>
            <input class="form-control" type="text" placeholder="请输入院校名称" v-model="querySchoolName" @keyup="inputKeyEnter($event)">
            <button type="button" class="btn btn-primary btn-sm" @click='getQueryData()'><i class="fa fa-search"></i> 查询</button>
          </form>
        </div>
        <!--左侧列表，每页显示十条-->
        <div class="section-home">
          <div class="f-line">
            <span class="fr">共 {{orgAllNumData}} 所院校</span>
            <div>
              <a class="curr"><i class="fa fa-long-arrow-down"></i> 综合</a>
              <!-- <a href=""><i class="fa fa-long-arrow-down"></i> 热门</a>
              <a href=""><i class="fa fa-long-arrow-down"></i> 最新</a> -->
            </div>
          </div>
          <ul class="school-list">
            <li v-for='listData in orgListData'>
              <!-- <a target="_blank" href="school_detailed.html"> -->
                <!-- <router-link :to="{path:'/schooldetailed'}"> -->
                <router-link :to="{path:'/schooldetailed/'+listData.orgid+''}" target="_blank">
                <div class="logo br12 mrl fl">
                  <img :src="listData.orglogo">
                </div>
                <div class="ovh">
                  <h5 class="fl">{{listData.orgname}}</h5>
                  <span class="fr">{{listData.provincename}} - {{listData.cityname}}</span>
                </div>
                <div class="ovh">
                  <span class="fl"><i class="mrm fa fa-flag"></i>赛事活动：{{listData.gamenum}}</span>
                  <span class="fl"><i class="mrm fa fa-cubes"></i>创建项目：{{listData.projectnum}}</span>
                  <span class="fr"><i class="mrm fa fa-id-card"></i>指导老师：{{listData.teacherenum}}</span>
                </div>
                </router-link>
                <!-- </router-link> -->
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
        <h5>热门院校</h5>
        <ul>
          <li class="mbm" v-for='hotschool in hotSchoolList'>
            <router-link :to="{path:'/schooldetailed/'+hotschool.orgid+''}" target="_blank">
            <div class="logo mrm fl br12"><img :src="hotschool.orglogo"></div>
            <span title="" class="right-title">{{hotschool.orgname}}</span>
          </router-link>
        </li>

        </ul>
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
      orglist: '',
      shengvalue: '',
      citylist: '',
      cityvalue: '',
      orgListData: '',
      orgAllNumData: '',
      querySchoolName: '',
      ifListNohaveData: false,
      PageCount:0,
      currentpage:1,
      hotSchoolList:'',
      pageState:'',
    }
  },
  methods: {
      handleCurrentChange(val) {
        this.pageState = true;
        this.getCooperateSchoolList (this.shengvalue,this.cityvalue,this.querySchoolName,val);
      },

      getOrgInAction() {
        this.$store.dispatch('getShareOrgData');
        this.orglist = this.$store.state.getorgData;
      },

      getSchoolInAction(orgid) {
        this.cityvalue = '';
        this.$store.dispatch({
            type: 'getShareCityData',
            provinceid: orgid
        });
        this.citylist = this.$store.state.getcityData;
      },

      getCooperateSchoolList( provinceid, cityid, orgname, page) {
        if(provinceid === ''){
          provinceid = 0;
        };
        if(cityid === ''){
          cityid = 0;
        };

        this.$http.post(this.$store.state.url+'pc/system/getOrgList',{provinceid:provinceid,cityid:cityid,orgname:orgname,page:page},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
          this.orgListData = response.data.data.orglist;
          this.orgAllNumData = response.data.data.totalresult;
          this.PageCount = parseInt(response.data.data.totalresult);
          this.currentpage = response.data.data.page;
          for(let i in this.orgListData){
            this.orgListData[i].orgid = Base64.encode(this.orgListData[i].orgid);
          }
          if(this.orgListData == ''){
            this.ifListNohaveData = true;
          }else{
            this.ifListNohaveData = false;
          }
          if(response.data.result == "success"){
            this.pageState = false;
          }
         })
      },

      inputKeyEnter(ev){
        if(ev.keyCode == 13){
          this.getQueryData();
        }
      },

      getQueryData(){
        this.getCooperateSchoolList (this.shengvalue,this.cityvalue,this.querySchoolName,1);
      },

      // hrefTodetailed(listData){
      //   let orgid = Base64.encode(listData.orgid);
      //   this.$router.push({path:'/schooldetailed/'+orgid+''})
      // },

      getHotOrgList(){
        this.$http.post(this.$store.state.url+'pc/system/getHotOrgList',{},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
          this.hotSchoolList = response.data.data;
          for(let i in this.hotSchoolList){
            this.hotSchoolList[i].orgid = Base64.encode(this.hotSchoolList[i].orgid)
          }
        })
      }
    },

  mounted(){

    this.getOrgInAction ();

    this.getCooperateSchoolList (0,0,'',1);

    this.getHotOrgList();

  },

}
</script>

<style lang="less">
  .breadcrumb{
    padding-left: 0 !important;
    background: none !important;
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
