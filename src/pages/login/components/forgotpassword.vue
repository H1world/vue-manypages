<template lang="html">
  <div class="">
    <div class="container mt50">
      <div class="bg-white register-main">
        <h6>忘记密码</h6>
        <form class="validForm form-horizontal w500 pt50">
          <div class="form-group">
            <label class="col-lg-3 control-label">手机号</label>
            <div class="col-lg-8">
              <el-input type="text" v-model="isphone" :placeholder='phonetext' :maxlength="11" :class="{errredadmin:phoneidea}"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">短信验证码</label>
            <div class="col-lg-4">
              <el-input type="text" v-model="iscode" placeholder='验证码' :maxlength="4" :class="{errredadmin:codeidea}"></el-input>
            </div>
            <div class="col-lg-4">
              <div class="">
                <div class="ismober"> </div>
                <el-button type="primary" :disabled="codeType" @click='sendCod()'>{{codeText}}</el-button>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">密码</label>
            <div class="col-lg-8">
              <el-input :type='type' v-model="ispassword" :placeholder='passwordtext' :maxlength="20" :class="{errredadmin:passwordidea}"></el-input>
              <i class="fa" :class="[{'fa-eye-slash':faeye == false},{'fa-eye':faeye == true }]" @click='faeyeed()'></i>
            </div>
          </div>
          <div class="text-center">
            <button role="button" type="button" class="btn btn-primary w100 submitForm addminSchoolbtn" @click='getAll()'>确定</button>
          </div>
        </form>
      </div>
    </div>
    <footer class="mt50">
      <div class="container">
        <div class="copy-right">
          <span>版权所有 © 2017</span>
          <span>北京行云尚学科技有限公司</span>
          <a href="http://www.miibeian.gov.cn/" target="_blank"> 京ICP备17010019号</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
  data(){
    return{
      faeye:true,
      type:'password',
      //
      ispassword:'',
      passwordtext:'密码不能少于6位，字母和数字组合',
      passwordidea:'',
      //
      isphone:'',
      phonetext:'请输入您的联系电话',
      phoneidea:false,

      //验证码的思密达
      codeText:'发送验证码',
      codeType:false,
      //
      iscode:'',
      codeidea:false,
    }
  },
  mounted(){
  },
  methods:{
    //发送验证码
    sendCod(){
      this.$http.post(this.$store.state.url+'system/base/sendSMSCode', {phonenumber:this.isphone},  {emulateJSON: true}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        if(response.data.result == "success"){
          this.codeType = true;
          this.codeText = 60;
          let interval = setInterval(() => {
          if ((this.codeText--) <= 0) {
              this.codeText = '重新发送';
              this.codeType = false;
              clearInterval(interval);
            }
          }, 1000);
          // this.admintoke = response.data.data.xytoken;
          localStorage.setItem('admintoke', Base64.encode(response.data.data.xytoken));
        }else{
          this.$notify.error({
            title: '错误',
            message: response.data.describe,
            duration: 2000,
          });
        }
      })
    },
    //keyup验证
    inputkey(){
      if(this.isname.trim() == '' || this.isname.length < 2){
        this.usernameidea = true;
      }else{
        this.usernameidea = false;
      };
    },
    faeyeed(){
      this.faeye = !this.faeye;
      if(this.faeye == true){
        this.type = 'password';
      }
      if(this.faeye == false){
        this.type = 'text';
      }
    },
    //提交申请
    getAll(){
      //验证
      //手机号
      let phoneyz = /^1[3456789]\d{9}$/;
      if(RegExp(phoneyz).test(this.isphone) == false){
        this.phoneidea = true;
        return;
      }else{
        this.phoneidea = false;
      };
      //密码  issurepassword   passwordidea   surepasswordidea
      let passwordjy = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/;
      if(RegExp(passwordjy).test(this.ispassword) == false){
        this.passwordidea = true;
        return;
      }else{
        this.passwordidea = false;
      };
      if(this.iscode == ''){
        this.codeidea = true;
        return;
      }else{
        this.codeidea = false;
      };
      let admintokeed = Base64.decode(localStorage.getItem('admintoke'));
      // return;
      // pc/project/temporary/school/addNewTempSchool
      this.$http.post(this.$store.state.url+'pc/login/modifyPassWord', {accountname:this.isphone,password:this.ispassword,smscode:this.iscode},  {emulateJSON: true,headers:{'xytoken':admintokeed}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
      if(response.data.result == "success"){
          this.$notify({
            title: '成功',
            message: '您已经注册成功，即将跳转到登录页',
            type: 'success',
            duration: 2000,
          });
          let t = setTimeout(() => {
            this.$router.push({path:'/login'});
          }, 2200);
        };
        if(response.data.result != "success"){
          this.$notify.error({
            title: '错误',
            message: response.data.describe,
            duration: 2000,
          });
        };
      })
    },
  },
}
</script>

<style lang="less" scoped>
  .fa{
    position: absolute;
    right: 22px;
    top: 0;
    height: 36px;
    vertical-align: middle;
    line-height: 36px;
  }
</style>
