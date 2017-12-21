<!-- 投智人 -->
<template lang="html">
  <div class="container mb80">

    <!--路径-->
    <el-breadcrumb separator="/" class="breadcrumb mt30">
      <el-breadcrumb-item><router-link :to="{path:'/'}">首页</router-link></el-breadcrumb-item>
      <el-breadcrumb-item>投智人</el-breadcrumb-item>
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
            <label class="mll">关注阶段</label>
            <el-select class='select-org' v-model="stagevalue" placeholder="全部">
              <el-option
                v-for="stage in stagedata"
                :key="stage.processid"
                :label="stage.processname"
                :value="stage.processid">
              </el-option>
            </el-select>
            <label class="mll">关注行业</label>
            <el-select class='select-org' v-model="tradvalue" placeholder="全部">
              <el-option
                v-for="trad in traddata"
                :key="trad.tradeid"
                :label="trad.name"
                :value="trad.tradeid">
              </el-option>
            </el-select>
            <button type="button" class="btn btn-primary btn-sm" @click='getQueryData()'><i class="fa fa-search"></i> 查询</button>
          </form>
        </div>
        <!--左侧列表，每页显示十条-->
        <div class="section-home">
          <div class="f-line">
            <span class="fr">共 {{orgAllNumData}} 个投智人</span>
            <div>
              <a class="curr"><i class="fa fa-long-arrow-down"></i> 综合</a>
            </div>
          </div>
          <ul class="school-list">
            <li  v-for='listData in orgListData'>
              <router-link :to="{path:'/sapiensdetailed/'+listData.accountid+''}" target="_blank">
                <div class="logo br50 mrl fl">
                  <img :src="listData.userimage">
                  <span class="vip v18" :class="{'v1':listData.layerselectone, 'v2':listData.layerselecttwo}"></span>
                </div>
                <div class="ovh">
                  <h5 class="fl">{{listData.username}}</h5>
                  <span class="fr">{{listData.provincename}} - {{listData.cityname}}</span>
                </div>
                <div class="ovh">
                  <span class="fl">关注阶段：<i class='stageI' v-for='process in listData.processlist'>{{process.processname}}</i></span>
                </div>
                <div class="tags">
                  <span v-for='trade in listData.tradelist' v-if='trade.selected'>{{trade.tradename}}</span>
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
        <h5>推荐投智人</h5>
        <div class="section-title aside-right">
          <router-link :to="{path:'/sapiensdetailed/'+bigvdata.accountid+''}" target="_blank" v-for='bigvdata in bigVlist' :key="bigvdata.id">
          <!-- :to="{path:'/sapiensdetailed/'+listData.accountid+''}" -->
            <div class="ovh">
              <span class="section-photo">
                <img :src="bigvdata.userimage">
              </span>
              <div class="name">
                <span>{{bigvdata.username}}</span>
                <p class="mt-15">关注阶段：<i class="stageI" v-for='bigvprocess in bigvdata.processlist'>{{bigvprocess.processname}}</i></p>
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
      orglist: '',
      shengvalue: '',
      citylist: '',
      cityvalue: '',
      stagedata:'',
      traddata:'',
      stagevalue:'',
      tradvalue:'',
      orgListData: '',
      orgAllNumData: '',
      ifListNohaveData: false,
      PageCount:0,
      currentpage:1,
      bigVlist:'',
      pageState:'',
    }
  },
  methods: {
      handleCurrentChange(val) {
        this.pageState = true;
        if(typeof(this.tradvalue) == 'string'){
        var r = '';
        for(let i in this.traddata){
          if(this.traddata[i].name == this.tradvalue){
            r = this.traddata[i].tradeid;
          }
        }
        this.tradvalue = r;
        }
        this.getwisemanList (this.shengvalue,this.cityvalue,this.tradvalue,this.stagevalue,val);
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

      getStagemethods(){
        this.$store.dispatch('getStage');
        this.stagedata = this.$store.state.getStageData;
      },

      getTrademethods(){
          this.$store.dispatch('getTrade');
          this.traddata = this.$store.state.getTradeData;
      },

      getwisemanList( provinceid, cityid, tradeid, processclassid, page) {

        if(provinceid === ''){
          provinceid = 0;
        };
        if(cityid === ''){
          cityid = 0;
        };
        if(tradeid === ''){
          tradeid = 0;
        };
        if(processclassid === ''){
          processclassid = 0;
        };
        this.$http.post(this.$store.state.url+'pc/person/getWisemanList',{provinceid:provinceid,cityid:cityid,tradeid:tradeid,processclassid:processclassid,page:page},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
          this.orgListData = response.data.data.wisemanlist;
          this.orgAllNumData = response.data.data.totalresult;
          this.PageCount = parseInt(response.data.data.totalresult);
          // console.log(this.orgListData);
          this.currentpage = response.data.data.page;
          // console.log(response.data.data);

          for(let i in this.orgListData){
            if(this.orgListData[i].layerid == 2){
              this.orgListData[i]['layerselectone'] = true;
              this.orgListData[i]['layerselecttwo'] = false;
            }
            if(this.orgListData[i].layerid == 3){
              this.orgListData[i]['layerselectone'] = false;
              this.orgListData[i]['layerselecttwo'] = true;
            }
          }

          if(this.orgListData == ''){
            this.ifListNohaveData = true;
          }else{
            this.ifListNohaveData = false;
          };
          for(let i in this.orgListData){
            this.orgListData[i].accountid = Base64.encode(this.orgListData[i].accountid)
            if(this.orgListData[i].processlist.length == 1){
              //如果后台只传了一个值，并且都是控制的话.
              if(this.orgListData[i].processlist[0].processid == '' && this.orgListData[i].processlist[0].processname == ''){
                this.orgListData[i].processlist[0].processname = '暂无';
              }
            }
            for(let j in this.orgListData[i].tradelist){
              if(this.orgListData[i].tradelist[j].tradename == ''){
                this.orgListData[i].tradelist[j]['selected'] = false;
              }else{
                this.orgListData[i].tradelist[j]['selected'] = true;
              }
            }
          }
          if(response.data.result == "success"){
            this.pageState = false;
          }
         })
      },

      getBigVWisemanList(){
        this.$http.post(this.$store.state.url+'pc/person/getBigVWisemanList',{},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
          this.bigVlist = response.data.data;
          for(let i in this.bigVlist){
            this.bigVlist[i].accountid = Base64.encode(this.bigVlist[i].accountid)
            if(this.bigVlist[i].processlist.length == 1){
              //如果后台只传了一个值，并且都是控制的话.
              if(this.bigVlist[i].processlist[0].processid == '' && this.bigVlist[i].processlist[0].processname == ''){
                this.bigVlist[i].processlist[0].processname = '暂无';
              }
            }
          }

         })
      },

      inputKeyEnter(ev){
        if(ev.keyCode == 13){
          this.getQueryData();
        }
      },

      getQueryData(){
        if(typeof(this.tradvalue) == 'string'){
        var r = '';
        for(let i in this.traddata){
          if(this.traddata[i].name == this.tradvalue){
            r = this.traddata[i].tradeid;
          }
        }
        this.tradvalue = r;
        }
        this.getwisemanList (this.shengvalue,this.cityvalue,this.tradvalue,this.stagevalue,1);
      },

    },
    beforeUpdate(){
        //   if(this.$route.query.trade != undefined){
        //   for(var i = 0;i<this.$store.state.tradeLength;i++){
        //     if(this.traddata[i].tradeid == Base64.decode(this.$route.query.trade)){
        //       this.tradvalue = this.traddata[i].tradeid;
        //     }
        //   }
        // }
    },
    updated(){
        // console.log(this.$store.state.tradeLength);
  },
  mounted(){

    this.getOrgInAction ();

    this.getStagemethods();

    this.getTrademethods();

    this.getBigVWisemanList();

    // if(this.$route.params.tradeid != undefined){
    //   this.tradvalue = Base64.decode(this.$route.params.tradname);
    //   this.getwisemanList (0,0,0,Base64.decode(this.$route.params.tradeid),1);
    // }else{
    //   this.getwisemanList (0,0,0,0,1);
    // }
    this.getwisemanList (0,0,Base64.decode(this.$store.state.indextosapienstradid),0,1);
    this.tradvalue = Base64.decode(this.$store.state.indextosapienstradname);
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
