<template lang="html">
  <div>
      <div class="website-banner">
        <div class="container">
  				<div>
  					<!--Logo-->
  					<div class="logo br50">
  						<img :src="detailData.userimage">
  						<!-- <span class="vip v1 v24"></span> -->
              <span class="vip v24" :class="{'v1':detailData.layerselectone, 'v2':detailData.layerselecttwo}"></span>
  					</div>
  					<!--信息-->
  					<div class="information">
  						<h5>{{detailData.username}}</h5>
  						<div>关注阶段：<i class="stageI" v-for='process in detailData.processlist'>{{process.processname}}</i></div>
  						<div class="tags">
  							<span  v-for='trade in detailData.tradelist'>{{trade.tradename}}</span>
  						</div>
  					</div>
  				</div>
  			</div>
      </div>

      <div class="container section-website mb80">
        <div class="row">
          <div class="col-md-9">
            <section class="section-name" v-if='ifcontextNo'>
              <h6>个人简介</h6>
              <p class="ti2">
                {{detailData.context}}
              </p>
            </section>
            <section class="section-name" v-if='iforglistNo'>
              <h6>工作单位</h6>
              <ul class="sapoens-ul">
                <li v-for='orgdata in detailData.orglist'>
                  <div class="row">
                    <span class="col-md-6 name"><i class="fa fa-suitcase"></i>{{orgdata.orgname}}</span>
                    <span class="col-md-3 text-right">{{orgdata.postname}}</span>
                  </div>
                  <p>{{orgdata.orgcontext}}</p>
                </li>
              </ul>
            </section>

            <section class="section-name" v-if='ifworkNo'>
              <h6>工作经历</h6>
              <ul class="sapoens-ul">
                <li v-for='workexp in detailData.workexplist'>
                  <div class="row">
                    <span class="col-md-6 name"><i class="fa fa-building"></i>{{workexp.workexpname}}</span>
                    <span class="col-md-3 text-right">{{workexp.workexppostname}}</span>
                    <span class="col-md-3 text-right">{{workexp.starttime}} 至 {{workexp.endtime}}</span>
                  </div>
                  <p>{{workexp.workexpcontext}}</p>
                </li>
              </ul>
            </section>

            <section class="section-name" v-if='ifstudyexpNo'>
              <h6>教育经历</h6>
              <ul class="sapoens-ul">
                <li v-for='studyexp in detailData.studyexplist'>
                  <div class="row">
                    <span class="col-md-6 name"><i class="fa fa-book"></i>{{studyexp.studyexpname}}</span>
                    <span class="col-md-3 text-right">{{studyexp.studyexppostname}}</span>
                    <span class="col-md-3 text-right">{{studyexp.starttime}} 至 {{studyexp.endtime}}</span>
                  </div>
                  <p>{{studyexp.studyexpcontext}}</p>
                </li>
              </ul>
            </section>

          </div>

          <div class="col-md-3">
            <aside class="section-name aside-right" v-if='ifcasedatapNo'>
              <h6>投资案例</h6>
              <div class="section-title aside-right">
                <div class="ovh" v-for='casedata in detailData.caselist'>
                  <span class="section-photo">
                    <img :src="casedata.caselogo">
                  </span>
                  <div class="name">
                    <span>{{casedata.casename}}</span>
                    <p class="mt-10">{{casedata.caseprocessname}}</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
  data(){
    return{
      accountid: Base64.decode(this.$route.params.accountid),
      detailData:'',
      ifcontextNo:true,
      iforglistNo:true,
      ifworkNo:true,
      ifstudyexpNo:true,
      ifcasedatapNo:true,
    }
  },

  methods:{
    getDdetailedData(){
      this.$http.post(this.$store.state.url+'pc/person/getWisemanInfo',{accountid:this.accountid},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
        this.detailData = response.data.data;
        if(this.detailData.context == '' || this.detailData.context == null ){
          this.ifcontextNo = false;
        }
        if(this.detailData.orglist == ''){
          this.iforglistNo = false;
        }
        if(this.detailData.workexplist == ''){
          this.ifworkNo = false;
        }
        if(this.detailData.studyexplist == ''){
          this.ifstudyexpNo = false;
        }
        if(this.detailData.caselist == ''){
          this.ifcasedatapNo = false;
        }
        if(this.detailData.processlist.length == 1){
          if(this.detailData.processlist[0].processid == '' && this.detailData.processlist[0].processname == ''){
            this.detailData.processlist[0].processname = '暂无';
            }
        }

            if(this.detailData.layerid == 2){
              this.detailData['layerselectone'] = true;
              this.detailData['layerselecttwo'] = false;
            }
            if(this.detailData.layerid == 3){
              this.detailData['layerselectone'] = false;
              this.detailData['layerselecttwo'] = true;
            }

       })
    }
  },

  mounted(){
    this.getDdetailedData();
  },

}
</script>

<style lang="less">
.stageI{
  font-style: normal;
  padding-right: 15px;
}
</style>
