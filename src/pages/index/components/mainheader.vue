<template lang="html">
  <header>
    <nav class="navbar-inverse">
      <div class="container">
        <!--Logo-->
        <div class="navbar-header">
          <a class="navbar-brand" href="http://192.168.1.120"><img alt="投智圈" src="../assets/logo.png"></a>
        </div>
        <!--菜单-->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

          <ul class="nav navbar-nav navbar-left">
            <li :class="{'active':head1}"><a @click='inHeaderSapiens()'>投智人</a></li>
            <li :class="{'active':head2}"><a @click='inHeaderHotproject()'>热门项目</a></li>
            <!-- <li><a href="">教学案例</a></li> -->
            <li :class="{'active':head3}"><router-link :to="{path:'/cooperateschool'}">合作院校</router-link></li>
            <li><a href="https://www.xytzq.cn/download/APP.html">APP下载</a></li>
          </ul>

          <!--未登录-->
          <ul class="nav navbar-nav navbar-right" v-if='ifUserNoLogin'>
            <li>
              <li><a href='http://192.168.1.120/login.html#/'>登录</a></li>
            </li>
            <li role="presentation" class="dropdown" v-on:mouseleave='nologinHover()'>
              <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true" v-on:mouseenter='nologinHoverShow()'>注册申请 <span class="caret"></span></a>
              <ul class="dropdown-menu" v-if='loginNoHover'>
                <div class="plug"><span class="caret"></span></div>
                <li></li>
                <li><a href='http://192.168.1.120/login.html#/scrolladminregister'>校管理员申请</a></li>
                <li><a href='http://192.168.1.120/login.html#/teacheradminregister'>教师试用申请</a></li>
                <li><a href='http://192.168.1.120/login.html#/studentadminregister'>项目团队注册</a></li>
                <li></li>
              </ul>
            </li>
          </ul>
          <!--未登录 end-->
          <!--已登录-->
          <ul class="nav navbar-nav navbar-right" v-if='ifUserLogin'>
            <li class="head-portrait" @click='signGo()'>
              <a class="img-circle"><img class="img-circle" :src="userimg"></a>
            </li>
            <li class="dropdown" @click='signGo()'>
              <a>{{username}}</a>
              <!-- <ul class="dropdown-menu">
                <div class="plug"><span class="caret"></span></div>
                <li></li>
                <li><a href="../index/index.html#personal_details"><i class="fa fa-address-card-o"></i>个人资料</a><li>
                <li><a href="../index/index.html#personal_friend"><i class="fa fa-address-book-o"></i>我的好友</a></li>
                <li><a href="../index/index.html#personal_message"><i class="fa fa-cogs"></i>赛事消息 <span class="navbar-unread">10</span></a></li>
                <li><a href="../index/index.html#personal_update"><i class="fa fa-bell-o"></i>修改密码</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#"><i class="fa fa-sign-out"></i>退出</a></li>
                <li></li>
              </ul> -->
              </li>
              <li class="dropdown">
                <a @click='signOut()'>退出</a>
              </li>
          </ul>
          <!--已登录 end-->
        </div>
      </div>
    </nav>

  </header>
</template>

<script>
import '../login-jq/website.css';
import '../login-jq/jquery.min.js';
// import '../login-jq/header.js'
let Base64 = require('js-base64').Base64;
export default {
  data(){
    return{
      ifUserLogin:false,  // false
      ifUserNoLogin:false,  // true
      loginNoHover:false,
      accountid:'',
      orgid:'',
      token:'',
      username:'',
      userimg:'',
      head1:false,
      head2:false,
      head3:false,
    }
  },
  methods:{
    //判断保存七天的同时 如若 后台服务器重新启动 的处理方式
    orSaveDataRestart(cookieToken){
      this.$http.post(this.$store.state.url+'pc/login/checkXyToken',{xytoken:cookieToken},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
        if(response.data.result == "success"){
          if(this.$cookie.get('Pc_V_Save_roleid') == 1){
            let studenttoken = this.$cookie.get('Pc_V_Save_token');
            let accountid = this.$cookie.get('Pc_V_Save_accountid');
            let miprojectid = Base64.encode('xytoken=');
            let accountidend = Base64.encode('&accountid=');
            // window.location.href=this.$store.state.studentUrl+ "?"+miprojectid+""+studenttoken+""+accountidend+""+accountid+"";
            this.token = Base64.decode(studenttoken);
            this.accountid = Base64.decode(accountid);
            this.getUserInformations();
          }
          if(this.$cookie.get('Pc_V_Save_roleid') == 2){
            localStorage.setItem('token', this.$cookie.get('Pc_V_Save_token'));
            localStorage.setItem('accountid',this.$cookie.get('Pc_V_Save_accountid'));
            // window.location.href=this.$store.state.scoreUrl;
            // console.log('这是投智人/');
            this.token = Base64.decode(localStorage.getItem('token'));
            this.accountid = Base64.decode(localStorage.getItem('accountid'));
            this.getUserInformations();
          }
          if(this.$cookie.get('Pc_V_Save_roleid') == 3){
            // window.location.href=this.$store.state.adminUrl;
            this.token = Base64.decode(localStorage.getItem('tzq_org_token'));
            this.orgid = Base64.decode(localStorage.getItem('tzq_org_orgid'));
            this.getOrgInformations();
          }
        }else{
          return;
        }
       })
    },
    //header列表跳转
    inHeaderSapiens(){
      this.$store.commit('indextosapienstradid', '');
			this.$store.commit('indextosapienstradname', '');
			this.$router.push({path:'/sapiens'})
    },
    inHeaderHotproject(){
      this.$store.commit('indextohotprojectstageid', '');
			this.$store.commit('indextohotprojectstagename', '');
			this.$router.push({path:'/hotproject'})
    },
    //跳转over
    //处理点击头像跳转到对应身份的项目
    orSaveDataRestartClick(cookieToken){
      this.$http.post(this.$store.state.url+'pc/login/checkXyToken',{xytoken:cookieToken},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
        if(response.data.result == "success"){
          if(this.$cookie.get('Pc_V_Save_roleid') == 1){
            let studenttoken = this.$cookie.get('Pc_V_Save_token');
            let accountid = this.$cookie.get('Pc_V_Save_accountid');
            let miprojectid = Base64.encode('xytoken=');
            let accountidend = Base64.encode('&accountid=');
            window.location.href=this.$store.state.studentUrl+ "?"+miprojectid+""+studenttoken+""+accountidend+""+accountid+"";
          }
          if(this.$cookie.get('Pc_V_Save_roleid') == 2){
            localStorage.setItem('token', this.$cookie.get('Pc_V_Save_token'));
            localStorage.setItem('accountid',this.$cookie.get('Pc_V_Save_accountid'));
            window.location.href=this.$store.state.scoreUrl;
          }
          if(this.$cookie.get('Pc_V_Save_roleid') == 3){
            window.location.href=this.$store.state.adminUrl;
          }
        }else{
          return;
        }
       })
    },
    //
    getUserInformations(){
      this.$http.post(this.$store.state.url+'pc/person/getMyBrieflyInfo', {accountid :this.accountid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
      this.username = response.data.data.username;
      this.userimg = response.data.data.userimage;
    })
    },
    //如果是管理员
    getOrgInformations(){
      this.$http.post(this.$store.state.url+'system/getOrgInfoByOrgId', {orgid :this.orgid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
      this.username = response.data.data.orgname;
      this.userimg = response.data.data.logourl;

    })
    },
    nologinHoverShow(){
      this.loginNoHover = true;
    },
    nologinHover(){
      this.loginNoHover = false;
    },
    signOut(){
      this.$cookie.delete('Pc_V_Save_token');
      this.$cookie.delete('Pc_V_Save_roleid');
      this.$cookie.delete('Pc_V_Save_accountid');
      this.$cookie.delete('Pc_V_Yes_login');
      sessionStorage.removeItem('Pc_V_Yes_login');
      // window.location.href=this.$store.state.currenturl;
      console.log(1);
      // return;
      // this.$router.go(0);

      this.ifUserLogin = false;
      this.ifUserNoLogin = true;
      // window.history.go(0);
    },
    signGo(){
      //
      if(this.$cookie.get('Pc_V_Save_roleid') != null && this.$cookie.get('Pc_V_Save_roleid') != 'null' && this.$cookie.get('Pc_V_Save_roleid') != ''){
        if(this.$cookie.get('Pc_V_Save_roleid') == 1){
          let studenttoken = this.$cookie.get('Pc_V_Save_token');
          this.orSaveDataRestartClick(Base64.decode(studenttoken))
        };
        if(this.$cookie.get('Pc_V_Save_roleid') == 2){
          this.orSaveDataRestartClick(Base64.decode(this.$cookie.get('Pc_V_Save_token')))
        };
        if(this.$cookie.get('Pc_V_Save_roleid') == 3){
          this.orSaveDataRestartClick(Base64.decode(this.$cookie.get('Pc_V_Save_token')))
        };
      }else{
        if(this.$cookie.get('Pc_V_Yes_login') != null && this.$cookie.get('Pc_V_Yes_login') != 'null' && this.$cookie.get('Pc_V_Yes_login') != ''){
          if(this.$cookie.get('Pc_V_Yes_login') == 'student'){
            window.location.href=this.$store.state.studentUrlGo;
          };
          if(this.$cookie.get('Pc_V_Yes_login') == 'orgmanage'){
            window.location.href=this.$store.state.adminUrl;
          };
          if(this.$cookie.get('Pc_V_Yes_login') == 'pcproject'){
            window.location.href=this.$store.state.scoreUrl;
          };
        }
      }
      //
    },
    getBox(){
      //如果登录时保存七天  再次登录的话.
      //判断是否登录了.（此时并没有选择7天保存登录.）
      if(this.$cookie.get('Pc_V_Yes_login') != null && this.$cookie.get('Pc_V_Yes_login') != ''){
        if(this.$cookie.get('Pc_V_Yes_login') == 'student'){
          this.token = Base64.decode(this.$cookie.get('tzq_std_xytoken'));
          this.accountid = Base64.decode(this.$cookie.get('tzq_std_accountid'));
        };
        if(this.$cookie.get('Pc_V_Yes_login') == 'orgmanage'){
          this.token = Base64.decode(localStorage.getItem('tzq_org_token'));
          this.orgid = Base64.decode(localStorage.getItem('tzq_org_orgid'));
        };
        if(this.$cookie.get('Pc_V_Yes_login') == 'pcproject'){
          this.token = Base64.decode(localStorage.getItem('token'));
          this.accountid = Base64.decode(localStorage.getItem('accountid'));
        };
      };

      if(this.$cookie.get('Pc_V_Save_roleid') != null && this.$cookie.get('Pc_V_Save_roleid') != '' && this.$cookie.get('Pc_V_Save_roleid') != 'null'){
        this.ifUserNoLogin = false;
        this.ifUserLogin = true;
        if(this.$cookie.get('Pc_V_Save_roleid') == 1){
          let studenttoken = this.$cookie.get('Pc_V_Save_token');
          this.orSaveDataRestart(Base64.decode(studenttoken))
        };
        if(this.$cookie.get('Pc_V_Save_roleid') == 2){
          this.orSaveDataRestart(Base64.decode(this.$cookie.get('Pc_V_Save_token')))
        };
        if(this.$cookie.get('Pc_V_Save_roleid') == 3){
          this.orSaveDataRestart(Base64.decode(this.$cookie.get('Pc_V_Save_token')))
        };
      }else{
        this.ifUserNoLogin = true;
        this.ifUserLogin = false;
        if(this.$cookie.get('Pc_V_Yes_login') == null || this.$cookie.get('Pc_V_Yes_login') == 'null' || this.$cookie.get('Pc_V_Yes_login') == ''){
          this.ifUserNoLogin = true;
          this.ifUserLogin = false;
        }else{
          this.ifUserLogin = true;
          this.ifUserNoLogin = false;
          if(this.$cookie.get('Pc_V_Yes_login') == 'orgmanage'){
            this.getOrgInformations();
          }else{
            this.getUserInformations();
          }
        };
      }
    },
    ifrouter(){
        if(this.$route.path == '/'){
          this.head1 = false;
          this.head2 = false;
          this.head3 = false;
          sessionStorage.setItem('headeractive','index');
        }
        if(this.$route.path == '/sapiens'){
          this.head1 = true;
          this.head2 = false;
          this.head3 = false;
          sessionStorage.setItem('headeractive','sapiens');
        }
        if(this.$route.path == '/hotproject'){
          this.head1 = false;
          this.head2 = true;
          this.head3 = false;
          sessionStorage.setItem('headeractive','hotproject');
        }
        if(this.$route.path == '/cooperateschool'){
          this.head1 = false;
          this.head2 = false;
          this.head3 = true;
          sessionStorage.setItem('headeractive','cooperateschool');
        }
    }
  },
  mounted(){
    this.getBox();
    if(this.$route.path == '/'){
      sessionStorage.setItem('headeractive','index');
    }
    if(sessionStorage.getItem('headeractive') == 'index'){
      this.head1 = false;
      this.head2 = false;
      this.head3 = false;
    }
    if(sessionStorage.getItem('headeractive') == 'sapiens'){
      this.head1 = true;
      this.head2 = false;
      this.head3 = false;
    }
    if(sessionStorage.getItem('headeractive') == 'hotproject'){
      this.head1 = false;
      this.head2 = true;
      this.head3 = false;
    }
    if(sessionStorage.getItem('headeractive') == 'cooperateschool'){
      this.head1 = false;
      this.head2 = false;
      this.head3 = true;
    }
  },
  watch:{
    "$route": "ifrouter"
  },
}
</script>

<style lang="less">
  .head-portrait{
    cursor:pointer !important;
  }
  .dropdown{
    cursor:pointer !important;
  }
  .dropdown-menu{
    display: block !important;
    li{
      a{
        color:#fff !important;
      }
      a:hover{
        background: #1abc9c !important;
      }
    }
  }
</style>
