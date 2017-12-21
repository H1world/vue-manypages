<template lang="html">
  <div class="">
    <div class="projectClass-style" v-if='introduce'>
        <h3><img src="../../assets/introduce.png" alt="">项目介绍</h3>
      <p>{{projectdatalisht.intro}}</p>
    </div>
    <div class="projectClass-style" v-if='highlights'>
      <h3><img src="../../assets/highlights.png" alt="">项目亮点</h3>
      <p>{{projectdatalisht.highlights}}</p>
    </div>
    <div class="projectClass-style" v-if='userlist'>
      <h3><img src="../../assets/team.png" alt="">核心团队</h3>
      <!-- <p>{{projectdatalisht.userlist}}</p> -->
      <div class="" v-for='usernews in projectdatalisht.userlist'>
        <p><span>{{usernews.roleid}} | {{usernews.username}}</span>
          <span>{{usernews.usercontext}}</span>
        </p>
      </div>
    </div>
    <div class="projectClass-style" v-if='wisemanlist'>
      <h3><img src="../../assets/tutor.png" alt="">指导老师</h3>
      <div class="wiseman-style" v-for='wiseman in projectdatalisht.wisemanlist'>
        <img :src="wiseman.userimage" alt="">
        <span><i>{{wiseman.username}}</i> <i>{{wiseman.collegename}}</i> <i>{{wiseman.postname}}</i></span>
        <span><i>辅导方向：{{wiseman.coachdirection}}</i> <i>{{wiseman.teachercount}}</i></span>
      </div>
    </div>
    <div class="projectClass-style" v-if='patentlist'>
      <h3><img src="../../assets/honor.png" alt="">已获专利</h3>
      <div class="patentlist-style patentlist-style-title">
        <p><span>专利名称</span> <span>专利类型</span> <span>专利编号</span> <span>获取时间</span></p>
      </div>
      <div class="patentlist-style" v-for='patent in projectdatalisht.patentlist'>
        <p><span>{{patent.patentname}}</span> <span>{{patent.patenttypename}}</span> <span>{{patent.patentcode}}</span> <span>{{patent.gettime}}</span></p>
      </div>
    </div>
    <div class="projectClass-style" v-if='investmentlist'>
      <h3><img src="../../assets/investment.png" alt="">已获投资</h3>
      <div class="patentlist-style patentlist-style-title">
        <p><span>投资金额</span> <span>公司名称</span> <span>关注阶段</span> <span>投资时间</span></p>
      </div>
      <div class="patentlist-style" v-for='investment in projectdatalisht.investmentlist'>
        <p><span>{{investment.investmentvalue}}万</span> <span>{{investment.investmentorg}}</span> <span>{{investment.processclassname}}</span> <span>{{investment.gettime}}</span></p>
      </div>
    </div>
    <div class="projectClass-style" v-if='stock'>
      <div class="sellstock-Style">投智人股权额度：{{sellstockvalue}}%</div>
    </div>
    <div class="projectClass-style" v-if='business'>
      <h3><img src="../../assets/honor.png" alt="">工商信息</h3>
      <div class="business-style" v-for='busin in projectdatalisht.business'>
        <p><span><i>公司名称：{{busin.companyname}}万</i><i>注册所在地：{{busin.addr}}</i></span></p>
        <p><span><i>法人代表：{{busin.legalperson}}</i><i>组织机构代码或工商注册号：{{busin.orgcode}}</i></span></p>
        <p><span><i>注册资金：{{busin.registeredcapital}}万</i><i>经营范围：{{busin.scope}}</i></span></p>
        <p><span><i>注册时间：{{busin.createtime}}</i><i>经营期限：{{busin.businessterm}}</i></span></p>
      </div>
    </div>

    <div class="projectClass-style Key-results" v-if='resultlist'>
      <h3><img src="../../assets/honor.png" alt="">关键成果</h3>
      <ul>
        <li v-for='resultlist in projectdatalisht.resultlist'>
          <ul>
            <h4>{{resultlist.year}}</h4>
            <li v-for='monthlists in resultlist.monthlist'>
              <i>{{monthlists.month}}月</i>
              <span v-for='resultlists in monthlists.resultlist'>
                时间：{{resultlists.createtime}}<br/>
                {{resultlists.title}}
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="projectClass-style" v-if='resourcelist'>
      <h3><img src="../../assets/honor.png" alt="">项目资料</h3>
      <ul>
        <li v-for='(resour,index) in resourcelisted' @click='datacontent(index)'>
          <img :src="resour.resourcelogo" alt="">
          <p>{{resour.resourcename}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
  data(){
    return{
      projectid:this.$route.params.projectid,
      token:Base64.decode(localStorage.getItem('token')),
      accountid:Base64.decode(localStorage.getItem('accountid')),
      projectgameid:Base64.decode(this.$route.params.projectgameid),
      projectdatalisht:'',
      sellstockvalue:'',
      resourcelisted:'',
      //如果数据有空值，那么连整个div都隐藏掉
      introduce:true,
      highlights:true,
      userlist:true,
      wisemanlist:true,
      patentlist:true,
      investmentlist:true,
      stock:true,
      business:true,
      resultlist:true,
      resourcelist:true,
    }
  },
  methods:{
    //获取基本信息的接口思密达
    getProjectInfo(){
      this.$http.post(this.$store.state.url+'pc/project/game/getProjectInfoByProjectGameId', {'projectgameid':this.projectgameid,'projectid':this.projectid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.projectdatalisht = response.data.data;
        this.sellstockvalue = this.projectdatalisht.stock.sellstockvalue;
        //如果数据有空值，将对应的数据变为false
        if(this.projectdatalisht.intro == ''){
          this.introduce = false;
        }
        if(this.projectdatalisht.highlights == ''){
          this.highlights = false;
        }
        if(this.projectdatalisht.userlist == ''){
          this.userlist = false;
        }
        if(this.projectdatalisht.wisemanlist == ''){
          this.wisemanlist = false;
        }
        if(this.projectdatalisht.patentlist == ''){
          this.patentlist = false;
        }
        if(this.projectdatalisht.investmentlist == ''){
          this.investmentlist = false;
        }
        if(this.projectdatalisht.resultlist == ''){
          this.resultlist = false;
        }
        if(this.projectdatalisht.business == ''){
          this.business = false;
        }
        if(this.projectdatalisht.resourcelisted == '' || this.projectdatalisht.resourcelisted == undefined){
          this.resourcelist = false;
        }
        //判断核心团队的那啥身份
        for(let i in this.projectdatalisht.userlist){
          if(this.projectdatalisht.userlist[i].roleid == 1){
            this.projectdatalisht.userlist[i].roleid = '创始人'
          }
          if(this.projectdatalisht.userlist[i].roleid == 3){
            this.projectdatalisht.userlist[i].roleid = '联合创始人'
          }
        }
        //转换时间戳
      })
    },
    //获取项目资料思密达
    getProjectResourceList(){
      this.$http.post(this.$store.state.url+'pc/project/resources/getProjectResourceList', {'projectid':this.projectid,'status':1},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {   
      this.info = JSON.stringify(response.data, null, 4);
        this.resourcelisted = response.data.data;
      })
    },
    datacontent(index){
      let proUrlName = this.resourcelisted[index].resourceurl;
      let num = proUrlName.lastIndexOf(".");
			let strs = proUrlName.substring(num).toLowerCase();
      if(strs == '.pdf'||strs == '.doc'||strs == '.docx'||strs == '.xlsx'||strs == '.xls'||strs == '.ppt'||strs == '.pptx'){
				window.pdfUrl = Base64.encode(proUrlName);
        window.open(this.$store.state.viewUrl + '/pdfjs/web/viewer.html?' + window.pdfUrl);
				// parent.location.href = this.$store.state.currenturl + 'pdfjs/web/viewer.html?' + window.pdfUrl;
      }
      if(strs == '.mp4'){
        window.pdfUrl = Base64.encode(proUrlName);
        let mpurl = Base64.decode(pdfUrl);
        window.open(this.$store.state.viewUrl + '/playVideo/playVideo.html?' + window.pdfUrl);
        // parent.location.href = this.$store.state.currenturl + 'playVideo/playVideo.html?' + window.pdfUrl;
      }
      if(strs == ".png"||strs == ".jpg"||strs == ".jpeg"){
        window.pdfUrl = proUrlName;
        window.open(this.$store.state.viewUrl + '/picturePreview/new.html?' + window.pdfUrl);
        // parent.location.href = window.currenturl + 'picturePreview/new.html?' + window.pdfUrl;
      }
    }
  },
  mounted(){
    this.getProjectInfo();
    this.getProjectResourceList();
  }

}
</script>

<style lang="less" scoped>
.projectClass-style{
  background: #fff;
  h3{
    font-size: 15px;
    display: inline-block;
    font-weight: 600;
    padding: 10px 0;
    position: relative;
    // border-bottom: 1px solid #1abc9c;
    // padding-right: 150px;
    img{
      display: inline-table;
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
  }
  h3::after{
    background-color: #1abc9c;
    content: '';
    position: absolute;
    bottom: -16px;
    left: 5px;
    width: 20px;
    height: 1px;
    border-radius: 1px;
    top: 50px;
  }
  p{
    font-size: 15px;
    padding: 15px 2em;
    span{
      display: block;
      padding:10px 0 0;
      i{
        font-style: normal;
      }
    }
  }
  .wiseman-style{
    display: block;
    margin: 15px 10px;
    height: 100px;
    // border-bottom: 1px solid #1abc9c;
    padding-bottom: 20px;
    img{
      width: 100px;
      height: 100px;
      background: #b00;
      float: left;
      margin-right: 20px;
    }
    span{
      line-height: 50px;
      display: block;
      i{
        font-style: normal;
        margin-right:30px;
      }
    }
  }
  .patentlist-style{
    // border-bottom: 1px solid #ccc;
    p{
      font-size: 15px;
      padding: 15px 2em;
      display: inline-flex;
      width: 100%;
      text-align: center;
      span{
        display: inline-block;
        width: 25%;
      }
    }
  }
  .patentlist-style-title{
    background: #dcdcdc;
    p{
      span{
        padding:0;
      }
    }
  }
  .sellstock-Style{
    font-size: 15px;
    display: inline-block;
    font-weight: 600;
    padding: 10px 0;
    // border-bottom: 1px solid #1abc9c;
    width: 100%;
  }
  .business-style{
    p{
      span{
        i{
          width: 50%;
          display: inline-block;
          text-align: left;
        }
      }
    }
  }
  ul{
    display: table;
    margin-top: 30px;
    li{
      float: left;
      text-align: center;
      cursor: pointer;
      img{
        display: inline-block;
        width: 50px;
        height: 50px;
        // background: #b00;
      }
    }
  }
}
.Key-results{
  ul{
    margin: 10px 0;
    width: 100%;
    background-color: #ddd;
    padding-left: 10px;
    li{
      margin: 0;
      width: 100%;
      h4{
        display: block;
        text-align: left;
      }
      h4:before{
        content:"·";
        font-size: 70px;
        display: inline-block;
        line-height: 8px;
        padding-left: 24px;
        vertical-align: text-top;
        color: #1abc9c;
      }
      li{
        width: 100%;
        i{
          font-style: normal;
          float: left;
          height: 40px;
          line-height: 40px;
          vertical-align: middle;
          padding-top: 5px;
        }
        i:after{
          content:"·";
          font-size: 100px;
          display: inline-block;
          line-height: 8px;
          padding-left: 2px;
          vertical-align: text-top;
          color: #1abc9c;
        }
        span{
          display: block;
          padding-left: 20px;
          text-align: left;
          margin-left: 39px;
          border-left: 1px solid #666;
          padding-top: 12px;
          font-size: 15px;
        }
      }
      }
    }

}
</style>
