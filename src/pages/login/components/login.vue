<template lang="html">
    <div class="">
      <div class="cloth-green"></div>
      <div class="login_body">
  			<div class="log_ad"></div>
  			<!--登录框-->
  			<div class="login_border">
  				<!--PC登录-->
  				<div class="pc_login" v-if='codeswitch1'>
              <el-tabs v-model="activeName">
                <el-tab-pane name="first"><span slot="label" @click='clicktableone(1)'>项目团队</span></el-tab-pane>
                <el-tab-pane name="second"><span slot="label" @click='clicktabletwo(2)'>管理员</span></el-tab-pane>
                <el-tab-pane name="third"><span slot="label" @click='clicktablethree(3)'>投智人</span></el-tab-pane>
              </el-tabs>
              <div class="error" v-show='errorstate'><i class="fa fa-exclamation-circle"></i> 您输入的用户名和密码不匹配，请重新输入！</div>
              <!--项目团队-->
              <section :class="{show:firstcontent}">
                  <form class="validForm form-horizontal">
                    <div class="form-group user">
                      <p class="yText" v-if='phoneerror'><input type='text' v-model='phoneerrortext' readonly></p>
                      <i></i>
                      <input class="form-control noEmpty phone" :class="{errred:phoneerror}" maxlength="11" type="text" placeholder="请输入您的手机号" v-model='phonenum1'>
                    </div>
                    <div class="form-group mbl lock">
                      <p class="yText" v-if='passworderror'><input type='text' v-model='passwordtext' readonly></p>
                      <i></i>
                      <input class="form-control noEmpty length(6-20) letter digit" maxlength="20" type="password" placeholder="请输入您的密码" :class="{errred:passworderror}" v-model='passwordnum1'>
                    </div>
                    <div class="form-group ovh">
                      <input class="fl" type="checkbox" v-model="studentCheackIdea" @click='alocked(studentCheackIdea)'>
                      <span>7天内自动登录</span>
                      <router-link :to="{path:'/forgotpassword'}" class="fr">忘记密码？</router-link>
                    </div>
                    <div class="form-group mbm">
                      <button class="btn btn-block btn-primary submitForm" type="button" @click='democlick(phonenum1,passwordnum1)'>登 录</button>
                    </div>
                    <div class="form-group ovh">
                      <router-link :to="{path:'/studentadminregister'}">注册申请</router-link>
                    </div>
                  </form>
                  </section>
  		            <!--管理员-->
  		            <section :class="{show:secondcontent}">
  		            	<form class="validForm form-horizontal">
  			            	<div class="form-group user">
                        <p class="yText" v-if='phoneerror2'><input type='text' v-model='phoneerrortext' readonly></p>
  			            		<i></i>
  								<input class="form-control noEmpty phone" maxlength="11" type="text" placeholder="请输入您的账号" v-model='phonenum2' :class="{errred:phoneerror2}">
  							</div>
  			            	<div class="form-group mbl lock">
                          <p class="yText" v-if='passworderror2'><input type='text' v-model='passwordtext' readonly></p>
  			            		<i></i>
  							<input class="form-control noEmpty length(6-20) letter digit" maxlength="20" type="password" placeholder="请输入您的密码" v-model='passwordnum2' :class="{errred:passworderror2}">
  							</div>
  							<div class="form-group ovh">
  								<input class="fl" type="checkbox" v-model="adminCheackIdea" @click='alocked2(adminCheackIdea)'>
  								<span>7天内自动登录</span>
  								<!--<a class="fr" href="../login/findPD.html">忘记密码？</a>-->
  							</div>
  							<div class="form-group mbx">
  								<button class="btn btn-block btn-primary submitForm" type="button" @click='democlick(phonenum2,passwordnum2)'>登 录</button>
  							</div>
  							<div class="form-group ovh">
  								<router-link :to="{path:'/scrolladminregister'}"><i class="fa fa-user-circle mls"></i> 申请校管理员</router-link>
  								<router-link :to="{path:'/teacheradminregister'}" class="mlm"><i class="fa fa-user-circle-o mls"></i> 教师试用申请</router-link>
  							</div>
  						</form>
  		            </section>
  		            <!--评委-->
  		            <section :class="{show:threecontent}">
  		            	<form class="validForm form-horizontal">
  			            	<div class="form-group user">
                        <p class="yText" v-if='phoneerror3'><input type='text' v-model='phoneerrortext' readonly></p>
  			            		<i></i>
  								<input class="form-control noEmpty phone" maxlength="11" type="text" placeholder="请输入您的手机号" v-model='phonenum3' :class="{errred:phoneerror3}">
  							</div>
  			            	<div class="form-group mbl lock">
                          <p class="yText" v-if='passworderror3'><input type='text' v-model='passwordtext' readonly></p>
  			            		<i></i>
  								<input class="form-control noEmpty length(6-20) letter digit" maxlength="20" type="password" placeholder="请输入您的密码" v-model='passwordnum3' :class="{errred:passworderror3}">
  							</div>
  							<div class="form-group ovh">
  								<input class="fl" type="checkbox" v-model="judgesCheackIdea" @click='alocked3(judgesCheackIdea)'>
  								<span>7天内自动登录</span>
                  <router-link :to="{path:'/forgotpassword'}" class="fr">忘记密码？</router-link>
  							</div>
  							<div class="form-group mbm">
  								<button class="btn btn-block btn-primary submitForm" type="button" @click='democlick(phonenum3,passwordnum3)'>登 录</button>
  							</div>
  							<div class="form-group ovh">
  								<!-- <a href="../register/investor.html">还没有账号？</a> -->
  							</div>
  						</form>
  		            </section>
  		            <!--切换到扫码-->
  					<div class="login-switch" @click='clickswitch'></div>
  					<div class="login-tip">
  						<div class="poptip">
  							<div class="poptip-arrow">
  								<em></em>
  								<span></span>
  							</div>
  							<div class="poptip-content"><i class="fa fa-mobile-phone"></i> 手机扫码登录</div>
  						</div>
  					</div>

  				</div>
  				<!--扫码登录-->
  				<div class="app_login" v-if='codeswitch2'>
  					<h4 class="app_title">使用投智圈APP 扫码登录</h4>
  					<div class="app_code">
              <img id="appLoginCode" :src="QRimg" alt="">
  					</div>
  					<div class="qrcode-desc">
  						<i class="fa fa-qrcode"></i> 管理员、教师不支持扫码登录！
  					</div>
  					<!--切换到PC-->
  					<div class="login-switch" @click='clickswitch' style="background-position:left bottom;"></div>
  					<div class="login-tip">
  						<div class="poptip">
  							<div class="poptip-arrow">
  								<em></em>
  								<span></span>
  							</div>
  							<div class="poptip-content"><i class="fa fa-television"></i> 账号密码登录</div>
  						</div>
  					</div>
            <div class="app_help" v-show='apphelp' :class="{'helpstyle':apphelp}">
  						<span class="caret"></span>
  						<img src="../assets/app_help.jpg">
  					</div>
  				</div>
  				<!--登录框END-->
  			</div>
  		</div>
      <footer class="lgoin-footer bg-t">
        <div class="container">
          <div class="copy-right">
            <span>版权所有 © 2017</span>
            <span>北京行云尚学科技有限公司</span>
            <a href="http://www.miibeian.gov.cn/" target="_blank"> 京ICP备17010019号</a>
          </div>
        </div>
      </footer>

      <!--选择角色-->
      <!-- md-show -->
      <div class="md-modal md-effect-1" :class="{'md-show':mdshowed}" id="modal-role" >
        <div class="md-content modal-content">
          <div class="modal-header">
            <h4 class="modal-title fl mrl">请选择您要登录的组织</h4>
            <span class="fl c-alizarin" v-if='iforgidNull'><i class="fa fa-exclamation-circle"></i> 请选择您要登录的组织！</span>
          </div>
          <form class="validForm form-horizontal">
            <div class="modal-body">
              <ul class="ovh validRequired radioGroup">
                <li v-for='orglisted in orglist'>
                   <label class="radio">
                            <input type="radio" v-model='radiotext' name="optionsRadios" :value="orglisted.orgid" data-toggle="radio">
                            <span class="col-md-12" style="font-size: 16px;">{{orglisted.orgname}}</span>
                  </label>
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-sm btn-default md-close" @click='cancelmdshow'>取消</button>
              <button type="button" class="btn btn-sm btn-primary" @click='suremd'>确定</button>
            </div>
          </form>
        </div>
      </div>
      <div class="md-overlay"></div>

      <!-- <input type="text" name="" value="" v-model='phonenum1'>
      <input type="text" name="" value="" v-model='passwordnum1'>
      <button type="button" name="button" @click='democlick(phonenum1,passwordnum1)'>登录</button> -->
      <!-- <img :src="QRimg" alt=""> -->
    </div>
</template>
<script>
//引用JQ  bootstrap
import '../login-jq/bootstrap.css';
import '../login-jq/flat-ui.css';
import '../login-jq/font-awesome.min.css';
import '../login-jq/site.css';
import '../login-jq/fantaStyle.css'
import '../login-jq/component.css'

let Base64 = require('js-base64').Base64;
export default {
  data(){
    return{
      activeName: 'first',
      firstcontent:true,
      secondcontent:false,
      threecontent:false,
      phonenum1:'',
      passwordnum1:'',
      phonenum2:'',
      passwordnum2:'',
      phonenum3:'',
      passwordnum3:'',
      inputa:'',
      inputb:'',
      token:'',
      QRimg:'',
      //vue里面的页面跳转是前端跳转，不会向后台重新请求页面，页面也不会刷新jquery的代码并不会在vue跳转以后执行，内容当然是空的，所以再按一遍F5东西就出来了  我还是再写一遍吧.
      codeswitch1:true,
      codeswitch2:false,
      errorstate:false,
      //
      phoneerror:false,
      passworderror:false,
      phoneerror2:false,
      passworderror2:false,
      phoneerror3:false,
      passworderror3:false,
      // phonenulltext:'密码不能为空',
      phoneerrortext:'',
      passwordtext:'',
      //选中状态
      studentCheackIdea:false,
      adminCheackIdea:false,
      judgesCheackIdea:false,
      //管理员
      orglist:'',
      mdshowed:false,
      radiotext:'',
      iforgidNull:false,
      apphelp:false,

    }
  },
  methods:{
    clickswitch(){
      this.codeswitch1 = !this.codeswitch1;
      this.codeswitch2 = !this.codeswitch2;
      this.apphelp=true;
    },
    clicktableone(code){
      sessionStorage.setItem('theTableCode',code);
      this.firstcontent = true;
      this.secondcontent = false;
      this.threecontent = false;
    },
    clicktabletwo(code){
      sessionStorage.setItem('theTableCode',code);
      this.secondcontent = true;
      this.firstcontent = false;
      this.threecontent = false;
    },
    clicktablethree(code){
      sessionStorage.setItem('theTableCode',code);
      this.threecontent = true;
      this.firstcontent = false;
      this.secondcontent = false;
    },
    //保存7天的一系列操作？
    alocked(studentCheackIdea){
      studentCheackIdea = !studentCheackIdea;
    },
    alocked2(adminCheackIdea){
      adminCheackIdea = !adminCheackIdea;
    },
    alocked3(judgesCheackIdea){
      judgesCheackIdea = !judgesCheackIdea;
    },
    //点击登录
    democlick(num1,num2){
      this.inputa = num1;
      this.inputb = num2;
      let tablecode = sessionStorage.getItem('theTableCode');
      let reg = /^1[3456789]\d{9}$/;
//    let passwordreg = /^[a-zA-Z0-9]{6,20}$/;
      if(tablecode == '1'){
        if(RegExp(reg).test(this.phonenum1) == false){
          this.phoneerror = true;
          return;
        }else{
          this.phoneerror = false;
        };
//      if(RegExp(passwordreg).test(this.passwordnum1) == false){
//        this.passworderror = true;
//        return;
//      }else{
//        this.passworderror = false;
//      }
      };
      if(tablecode == '2'){
        if(this.phonenum2 == ''){
          this.phoneerror2 = true;
          return;
        }else{
          this.phoneerror2 = false;
        };
//      if(RegExp(passwordreg).test(this.passwordnum2) == false){
//        this.passworderror2 = true;
//        return;
//      }else{
//        this.passworderror2 = false;
//      }
      };
      if(tablecode == '3'){
        if(RegExp(reg).test(this.phonenum3) == false){
          this.phoneerror3 = true;
          return;
        }else{
          this.phoneerror3 = false;
        };
//      if(RegExp(passwordreg).test(this.passwordnum3) == false){
//        this.passworderror3 = true;
//        return;
//      }else{
//        this.passworderror3 = false;
//      }
      };
      this.$http.post(this.$store.state.url+'pc/login/dologin', {accountname:this.inputa,password:this.inputb},  {emulateJSON: true}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
      this.token = response.data.data.xytoken;
      if(response.data.result == "success"){
        if(tablecode == 1){
          if(response.data.data.roleid == '1'){           //跳转到学生.
            if(this.studentCheackIdea == true){           //判断有没有保存七天.
              this.$cookie.set('Pc_V_Save_token',Base64.encode(this.token), 7); //保存7天 token
              this.$cookie.set('Pc_V_Save_roleid','1', 7);                      //保存7天 身份
              this.$cookie.set('Pc_V_Save_accountid',Base64.encode(response.data.data.accountid), 7);  //保存7天 accountid
            }
            sessionStorage.setItem('Pc_V_Yes_login','student');
            this.$cookie.set('Pc_V_Yes_login','student', { expires: '1h' });
            let studenttoken = Base64.encode(response.data.data.xytoken);
            let accountid = Base64.encode(response.data.data.accountid);
            let miprojectid = Base64.encode('xytoken=');
            let accountidend = Base64.encode('&accountid=');
            window.location.href= this.$store.state.studentUrl+miprojectid+""+studenttoken+""+accountidend+""+accountid+"";
          }else{
              this.$notify.error({
                title: '错误',
                message: '您没有权限登录',
                duration: 2000,
              });
          }
        };
        if(tablecode == 2){
          if(response.data.data.roleid >= '2' && response.data.data.roleid <= '6'){
            this.dologin = response.data.data;
            if(response.data.data.orglist != undefined){
            	this.orglist = response.data.data.orglist;
              if(response.data.data.orglist.length >1){
                this.mdshowed=true;
              }
              else
              {
                  if(this.adminCheackIdea == true){           //判断有没有保存七天.
                    this.$cookie.set('Pc_V_Save_token',Base64.encode(this.token), 7); //保存7天 token
		                this.$cookie.set('Pc_V_Save_roleid','3', 7);                      //保存7天 身份
		            	}
                  sessionStorage.setItem('Pc_V_Yes_login','orgmanage');
                  this.$cookie.set('Pc_V_Yes_login','orgmanage', { expires: '1h' });
                  //添加方便首页读取到得token和accountid
                  localStorage.setItem('tzq_org_token', Base64.encode(this.dologin.xytoken));
                  localStorage.setItem('tzq_org_accountid', Base64.encode(this.dologin.accountid));
              	  localStorage.setItem('tzq_org_orgid', Base64.encode(this.dologin.orgid));


		              this.$cookie.set('tzq_org_sessionid',Base64.encode(this.dologin.xytoken), {expires: 7, path: '/orgmanage'}); //管理员

		              this.$cookie.set('tzq_org_accountid',Base64.encode(this.dologin.accountid), {expires: 7, path: '/orgmanage'});

		              this.$cookie.set('tzq_org_roleid',Base64.encode(this.orglist[0].roleid), {expires: 7, path: '/orgmanage'});
		              this.$cookie.set('tzq_org_username',Base64.encode(encodeURI(this.dologin.username)), {expires: 7, path: '/orgmanage'});
		              this.$cookie.set('tzq_org_orgid',Base64.encode(this.orglist[0].orgid), {expires: 7, path: '/orgmanage'});
		              if(this.dologin.roleid == 6){ //1才是超级管理员,且必须是北京行云的组织
		              		this.$cookie.set('tzq_org_username',Base64.encode(encodeURI('超级管理员')), {expires: 7, path: '/orgmanage'});
		              }
		              window.location.href=this.$store.state.adminUrl;
              }
            }
            else
            {                                                                      //直接跳转
              if(this.adminCheackIdea == true){           //判断有没有保存七天.
                this.$cookie.set('Pc_V_Save_token',Base64.encode(this.token), 7); //保存7天 token
                this.$cookie.set('Pc_V_Save_roleid','3', 7);                      //保存7天 身份
            	}
              sessionStorage.setItem('Pc_V_Yes_login','orgmanage');
              this.$cookie.set('Pc_V_Yes_login','orgmanage', { expires: '1h' });
              //添加方便首页读取到得token和accountid
              localStorage.setItem('tzq_org_token', Base64.encode(this.dologin.xytoken));
              localStorage.setItem('tzq_org_accountid', Base64.encode(this.dologin.accountid));
              localStorage.setItem('tzq_org_orgid', Base64.encode(this.dologin.orgid));

              this.$cookie.set('tzq_org_sessionid',Base64.encode(this.dologin.xytoken), {expires: 7, path: '/orgmanage'}); //管理员

              this.$cookie.set('tzq_org_accountid',Base64.encode(this.dologin.accountid), {expires: 7, path: '/orgmanage'});

              this.$cookie.set('tzq_org_roleid',Base64.encode(this.dologin.roleid), {expires: 7, path: '/orgmanage'});
              this.$cookie.set('tzq_org_username',Base64.encode(encodeURI(this.dologin.username)), {expires: 7, path: '/orgmanage'});
              this.$cookie.set('tzq_org_orgid',Base64.encode(this.dologin.orgid), {expires: 7, path: '/orgmanage'});
              if(this.dologin.roleid == 6){ //1才是超级管理员,且必须是北京行云的组织
              		this.$cookie.set('tzq_org_username',Base64.encode(encodeURI('超级管理员')), {expires: 7, path: '/orgmanage'});
              }
              window.location.href=this.$store.state.adminUrl;
            }
          }else{
            this.$notify.error({
              title: '错误',
              message: '您没有权限登录',
              duration: 2000,
            });
          }
        };
        if(tablecode == 3){
          if(response.data.data.roleid == '2'){
            if(this.judgesCheackIdea == true){           //判断有没有保存七天.
              this.$cookie.set('Pc_V_Save_token',Base64.encode(this.token), 7); //保存7天 token
              this.$cookie.set('Pc_V_Save_roleid','2', 7);                      //保存7天 身份
              this.$cookie.set('Pc_V_Save_accountid',Base64.encode(response.data.data.accountid), 7);  //保存7天 accountid
            }
            sessionStorage.setItem('Pc_V_Yes_login','pcproject');
            this.$cookie.set('Pc_V_Yes_login','pcproject', { expires: '1h' });
            localStorage.setItem('token', Base64.encode(this.token));
            localStorage.setItem('accountid', Base64.encode(response.data.data.accountid));
            window.location.href=this.$store.state.scoreUrl;
          }else{
            this.$notify.error({
              title: '错误',
              message: '您没有权限登录',
              duration: 2000,
            });
          }
        };
      };
      if(response.data.result != "success"){
        this.errorstate = true;
        let t = setTimeout(() => {
          this.errorstate = false;
        }, 2000);
      };
    })
  },
  //
  cancelmdshow(){
    this.mdshowed=false;
  },
  suremd(){         //
    if(this.radiotext==''){
      this.iforgidNull = true;
      return;
    };
    if(this.adminCheackIdea == true){           //判断有没有保存七天.
      this.$cookie.set('Pc_V_Save_roleid','3', 7);                      //保存7天 身份
    }
    this.$cookie.set('tzq_org_sessionid',Base64.encode(this.dologin.xytoken), {expires: 7, path: '/orgmanage'}); //管理员
    this.$cookie.set('tzq_org_accountid',Base64.encode(this.dologin.accountid), {expires: 7, path: '/orgmanage'});
    this.$cookie.set('tzq_org_roleid',Base64.encode(this.dologin.roleid), {expires: 7, path: '/orgmanage'});
    this.$cookie.set('tzq_org_username',Base64.encode(encodeURI(this.dologin.username)), {expires: 7, path: '/orgmanage'});
    this.$cookie.set('tzq_org_orgid',Base64.encode(this.radiotext), {expires: 7, path: '/orgmanage'});
    if(this.dologin.roleid == 6){ //1才是超级管理员,且必须是北京行云的组织
        this.$cookie.set('tzq_org_username',encodeURI('超级管理员'), {expires: 7, path: '/orgmanage'});
    }
  window.location.href=this.$store.state.adminUrl;
  },
  //获取token
  gettoken(){
    this.$http.post(this.$store.state.url+'pc/login/getXyToken',{},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
      let getXyTokensdeKey = response.data.data.xytoken;
      this.getQrcode(getXyTokensdeKey);
    })
  },
  //拿二维码
    getQrcode(getXyTokensdeKey){
      this.$http.post(this.$store.state.url+'pc/login/getLoginQRCode', {xytoken:getXyTokensdeKey},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
        this.QRimg = response.data;
        this.socket(getXyTokensdeKey)
      })
    },
    socket(getXyTokensdeKey){
      var socket = new WebSocket(this.$store.state.webSockentUrl+";xytoken="+getXyTokensdeKey+";sockettype=LOGIN");
      socket.onopen = function(evt) {

       };
       socket.onerror = function(evt) {

       };
       socket.onmessage = (evt) => {
          let message = JSON.parse(evt.data);
          if(message.jumpflag == '1'){  //上传项目
            let idflag = Base64.encode(message.map.idflag);
            let xytoken = Base64.encode(message.map.xytoken);
            let accountidend = Base64.encode(message.map.accountid);
            let yuxytoken = Base64.encode('xytoken=');
            let miprojectid = Base64.encode('&projectid=');
            let accountid = Base64.encode('&accountid=');
            window.location.href=this.$store.state.projectRoomUrl+"#?"+yuxytoken+""+xytoken+""+accountid+""+accountidend+""+miprojectid+""+idflag+"";
          };
          if(message.jumpflag == '2'){   //上传项目
            let idflag = Base64.encode(message.map.idflag);
            let xytoken = Base64.encode(message.map.xytoken);
            let accountid = Base64.encode(message.map.accountid);
            let miprojectid = Base64.encode('xytoken=');
            let accountidend = Base64.encode('&accountid=');
            let requirementid = Base64.encode('&requirementid=');
            window.location.href= this.$store.state.personrequirementUrl+miprojectid+""+xytoken+""+accountidend+""+accountid+""+requirementid+""+idflag+"";
          };
          if(message.jumpflag == '0'){
            if(message.map.roleid == '1'){  //学生
              let xytoken = Base64.encode(message.map.xytoken);
              let accountid = Base64.encode(message.map.accountid);
              let miprojectid = Base64.encode('xytoken=');
              let accountidend = Base64.encode('&accountid=');
              this.$cookie.set('Pc_V_Yes_login','student', { expires: '1h' });
              window.location.href= this.$store.state.studentUrl+miprojectid+""+xytoken+""+accountidend+""+accountid+"";
            };
            if(message.map.roleid == '2'){  //投智人
              let xytoken = Base64.encode(message.map.xytoken);
              let accountidend = Base64.encode(message.map.accountid);
              localStorage.setItem('token', xytoken);
              localStorage.setItem('accountid', accountidend);
              this.$cookie.set('Pc_V_Yes_login','pcproject', { expires: '1h' });
              window.location.href=this.$store.state.scoreUrl;
            }
          };
          // socket.close();
        };
        socket.onclose = function(evt) {

        };
    },
  },
  mounted(){
    this.gettoken();
    sessionStorage.setItem('theTableCode','1');
    //点击回车
      window.onkeydown = (event) => {
        if(event.keyCode==13){
          let tablecode = sessionStorage.getItem('theTableCode');
          if(tablecode == 1){
            this.democlick(this.phonenum1,this.passwordnum1)
          };
          if(tablecode == 2){
            this.democlick(this.phonenum2,this.passwordnum2)
          };
          if(tablecode == 3){
            this.democlick(this.phonenum3,this.passwordnum3)
          };
        }
      };

  },
}
</script>

<style lang="less">
.el-tabs{
  height: 48px;
  padding: 0 10px;
  position: relative;
  overflow: hidden;
}
.el-tabs__item{
  width: 100px;
  height: 48px !important;
  line-height: 48px !important;
  text-align: center;
  padding:0 !important;
  color: #8391a5;
  span{
    display: block;
  }
  span:hover{
    color: #1abc9c !important;
  }
}
.el-tabs__item.is-active{
  color: #1abc9c !important;
}
.el-tabs__active-bar{
  // width: 80px !important;
  background-color: #1abc9c !important;
//   height: 1px !important;
  // left: 15px !important;
}
.el-tabs__item.is-active{
//   color: #000 !important;
}
.form-group{
  position: relative;
}
.yText {
  font-size: 14px;
  position: absolute;
  top: -22px;
  left: 0;
  text-align: left;
  width: 100%;
    input{
      border: none;
      color: #b00;
      padding: 0 !important;
      background: transparent;
      width: 100%;
    }
}
.errred{
  border: 1px solid #f00 !important;
  background-color: rgba(255, 107, 107, 0.2) !important;
}
.login_body{
  z-index: 2 !important;
  .login_border{
    z-index: 2 !important;
  }
}
@keyframes mymove
{
from {left:0px;}
to {left:-220px;}
}
.helpstyle{
    left: -220px;
    animation:mymove .5s;
    opacity: 1;
}
</style>
