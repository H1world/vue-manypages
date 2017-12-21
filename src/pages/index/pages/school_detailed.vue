<template lang="html">
  <div>
    <div class="website-banner">
      <div class="container">
        <div>
          <!--Logo-->
          <div class="logo br12">
            <img :src="detailData.orglogo">
          </div>
          <!--信息-->
          <div class="information">
            <h5>{{detailData.orgname}}</h5>
            <div>{{detailData.provincename}} - {{detailData.cityname}}</div>
            <div>
              <span><i class="mrm fa fa-flag"></i>赛事活动：{{detailData.gamenum}}</span>
              <span><i class="mrm fa fa-cubes"></i>创建项目：{{detailData.projectnum}}</span>
              <span><i class="mrm fa fa-id-card"></i>指导老师：{{detailData.teachernum}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container section-website mb80">
      <div class="row">
        <div class="col-md-9">
          <section class="section-name" v-if='iforgtextNo'>
            <h6>院校介绍</h6>
            <p>
                {{detailData.orgcontext}}
            </p>
          </section>
          <section class="section-name">
            <h6>合作支持</h6>
            <p>{{detailData.supportcontext}}</p>
          </section>
        </div>

        <div class="col-md-3">
          <aside class="section-name aside-right">
            <h6>指导老师</h6>
            <div class="section-title aside-right">
              <router-link :to="{path:'/sapiensdetailed/'+teacherdata.accountid+''}" target="_blank" v-for='teacherdata in teacherlist' :key='teacherdata.id'>
                <div class="ovh">
                  <span class="section-photo logo br50">
                    <img :src="teacherdata.userimage">
                  </span>
                  <div class="name">
                    <span>{{teacherdata.username}}</span>
                    <p class="mt-10">指导方向：{{teacherdata.coachdirectionname}}</p>
                  </div>
                </div>
              </router-link>

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
      orgid: Base64.decode(this.$route.params.orgid),
      detailData:'',
      iforgtextNo:false,
      teacherlist:'',
    }
  },

  methods:{
    getDdetailedData(){
      this.$http.post(this.$store.state.url+'pc/system/getOrgInfo',{orgid:this.orgid},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
        this.detailData = response.data.data;
        if(this.detailData.orgcontext != null && this.detailData.orgcontext != ''){
          this.iforgtextNo = true;
        }
        if(this.detailData.supportcontext == null){
          this.detailData.supportcontext = this.detailData.orgname+'已创建'+this.detailData.projectnum+'个项目，举办'+this.detailData.gamenum+'赛事活动，参与学生'+this.detailData.studentnum+'人，参与教师'+this.detailData.teachernum+'人。'
        };
       })
    },
    getProjectTeacher(){
      this.$http.post(this.$store.state.url+'pc/project/getProjectTeacherList',{orgid:this.orgid},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
        // this.detailData = response.data.data;
        this.teacherlist = response.data.data;
        for(let i in this.teacherlist){
            this.teacherlist[i].accountid = Base64.encode(this.teacherlist[i].accountid)
        }       
       })
    },
  },

  mounted(){
    this.getDdetailedData();
    
    this.getProjectTeacher();
  },

}
</script>

<style lang="css">
</style>
