<template lang="html">
  <div class="">
    <div class="container mt50">
      <div class="bg-white register-main">
        <h6>教师试用申请</h6>
        <form class="validForm form-horizontal">
          <div class="form-group">
            <label class="col-lg-3 control-label">所在地区</label>
            <div class="col-lg-3">
              <el-select :class="{errredadmin:shengidea}" v-model="shengvalue" placeholder="请选择省" @change=chooseMedicine(shengvalue)>
                <el-option
                  v-for="item in province"
                  :key="item.provinceid"
                  :label="item.name"
                  :value="item.provinceid">
                </el-option>
              </el-select>
            </div>
            <div class="col-lg-3">
              <el-select :class="{errredadmin:shiidea}" v-model="shivalue" placeholder="请选择市区" @change=getSchoolOrg(shivalue)>
                <el-option
                  v-for="city in CityInfo"
                  :key="city.cityid"
                  :label="city.name"
                  :value="city.cityid">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">所在学校</label>
            <div class="col-lg-3">
              <el-select class='isangry' :class="{errredadmin:shoolidea}" v-model="schoolvalue" placeholder="请选择学校" @change=getBranchData(schoolvalue)>
                <input class="el-input__inner" v-model="schoolName" placeholder="您可以输入您要查找的学校名字" @blur='schoolblur()' @keyup="schoolnameM()" v-on:keyup.13="schoolkeyup()">
                <el-option
                  v-for="old in schoolold"
                  :key="old.orgid"
                  :label="old.name"
                  :value="old.orgid">
                </el-option>
              </el-select>
            </div>
            <div class="col-lg-3 form-angry">
              <el-select :class="{errredadmin:branchidea}" v-model="branchvalue" placeholder="请选择分院">
                <el-option
                  v-for="branched in branch"
                  :key="branched.collegeid"
                  :label="branched.collegename"
                  :value="branched.collegename">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">申请教师姓名</label>
            <div class="col-lg-6">
              <el-input type="text" :class="{errredadmin:usernameidea}" v-model="isname" :placeholder='youname' :minlength='2' :maxlength="20" class="" @blur='inputkey()'></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">邮箱</label>
            <div class="col-lg-6">
              <el-input type="mail" v-model="ismail" :placeholder='mailtext' :class="{errredadmin:mailidea}"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">密码</label>
            <div class="col-lg-3">
              <el-input type="password" v-model="ispassword" :placeholder='passwordtext' :maxlength="20" :class="{errredadmin:passwordidea}"></el-input>
            </div>
            <div class="col-lg-3">
              <el-input type="password" v-model="issurepassword" :placeholder='surepasswordtext' :maxlength="20" :class="{errredadmin:surepasswordidea}"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">联系电话</label>
            <div class="col-lg-6">
              <el-input type="text" v-model="isphone" :placeholder='phonetext' :maxlength="11" :class="{errredadmin:phoneidea}"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">短信验证码</label>
            <div class="col-lg-2">
              <el-input type="text" v-model="iscode" placeholder='验证码' :maxlength="4" :class="{errredadmin:codeidea}"></el-input>
            </div>
            <div class="col-lg-2">
              <div class="">
                <div class="ismober"> </div>
                <el-button type="primary" :disabled="codeType" @click='sendCod()'>{{codeText}}</el-button>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-3"></div>
            <div class="col-lg-6">
              申请即同意
              <router-link :to="{path:'/agreement'}" class="agreement" target="_blank">《投智圈用户协议》</router-link>
            </div>
          </div>
          <div class="text-center">
            <button role="button" type="button" class="btn btn-primary w100 submitForm addminSchoolbtn" @click='getAll()'>申请</button>
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
import '../login-jq/jquery.min.js';
let Base64 = require('js-base64').Base64;
export default {
  data(){
    return{
      shengvalue: '',
      shivalue:'',
      schoolvalue:'',
      branchvalue:'',
      schoolName:'',
      schoolBt:'',
      //
      province:'',
      CityInfo:'',
      schoolold:'',
      branch:'',
      //
      isname:'',
      youname:'请输入您的姓名（学校老师）',
      //
      ismail:'',
      mailtext:'请输入您的邮箱',
      //
      ispassword:'',
      issurepassword:'',
      passwordtext:'密码不能少于6位，字母和数字组合',
      surepasswordtext:'请输入确认密码',
      passwordidea:'',
      surepasswordidea:'',
      //
      isphone:'',
      phonetext:'请输入您的联系电话',
      //验证码的思密达
      codeText:'发送验证码',
      codeType:false,
      //
      iscode:'',
      //验证的
      shengidea:false,
      shiidea:false,
      shoolidea:false,
      usernameidea:false,
      positionidea:false,
      mailidea:false,
      phoneidea:false,
      codeidea:false,
      branchidea:false,

    }
  },
  mounted(){
    this.getProvinceInfo();
  },
  methods:{
    // 省
    getProvinceInfo(){
      this.$http.post(this.$store.state.url+'system/getProvinceInfo', {},  {emulateJSON: true}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.province = response.data.data;
      })
    },
    chooseMedicine(provinceid){
      this.$http.post(this.$store.state.url+'system/getCityInfo', {provinceid:provinceid},  {emulateJSON: true}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.CityInfo = response.data.data;
        this.shivalue = '';
        this.schoolvalue = '';
        this.branchvalue = '';
        this.schoolName = '';
      })
    },
    getSchoolOrg(shivalue){
      this.$http.post(this.$store.state.url+'system/getOrgInfo', {cityid:shivalue},  {emulateJSON: true}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.schoolold = response.data.data;
        this.schoolBt = response.data.data;
        this.schoolvalue = '';
        this.branchvalue = '';
        this.schoolName = '';
      })
    },
    //获取学校下面的院校
    getBranchData(schoolvalue){
      this.$http.post(this.$store.state.url+'system/getCollegeListByOrgId', {orgid:schoolvalue},  {emulateJSON: true}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.branch = response.data.data;
        this.branchvalue = '';
      })
    },
    schoolnameM(){
      this.$http.post(this.$store.state.url+'system/getOrgListByOrgName', {provinceid:this.shengvalue,cityid:this.shivalue,orgname:this.schoolName},  {emulateJSON: true}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        if(this.schoolName == ''){
          this.schoolold = this.schoolBt;
        };
        if(this.schoolName != ''){
          this.schoolold = response.data.data;
        }
      })
    },
    schoolblur(){
      if(this.schoolName != ''){
        this.schoolvalue = this.schoolold[0].orgid;
      }
    },
    schoolkeyup(){
      // $('.isangry .el-input i').removeClass('is-reverse');
      $('.isangry .el-input i').click();
      $('.el-select-dropdown').css('display','none');
      $('.form-angry input').focus();
    },
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
            message: '发送失败',
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
    //提交申请
    getAll(){
      //验证
      if(this.shengvalue==''){
        this.shengidea = true;
        return;
      }else{
        this.shengidea = false;
      };
      if(this.shivalue==''){
        this.shiidea = true;
        return;
      }else{
        this.shiidea = false;
      };
      if(this.schoolvalue==''){
        this.shoolidea = true;
        return;
      }else{
        this.shoolidea = false;
      };
      if(this.branchvalue==''){
        this.branchidea = true;
        return;
      }else{
        this.branchidea = false;
      };
      if(this.isname.trim() == '' || this.isname.length < 2){
        this.usernameidea = true;
        return;
      }else{
        this.usernameidea = false;
      };
      let mainjy = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if(RegExp(mainjy).test(this.ismail) == false){
        this.mailidea = true;
        return;
      }else{
        this.mailidea = false;
      };
      //密码  issurepassword   passwordidea   surepasswordidea
      let passwordjy = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/;
      if(RegExp(passwordjy).test(this.ispassword) == false){
        this.passwordidea = true;
        return;
      }else{
        this.passwordidea = false;
      };
      if(this.issurepassword != this.ispassword || this.issurepassword == ''){
        this.surepasswordidea = true;
        this.$notify.error({
          title: '错误',
          message: '请重新确认密码',
          duration: 2000,
        });
        return;
      }else{
        this.surepasswordidea = false;
      };
      //手机号
      let phoneyz = /^1[3456789]\d{9}$/;
      if(RegExp(phoneyz).test(this.isphone) == false){
        this.phoneidea = true;
        return;
      }else{
        this.phoneidea = false;
      };
      if(this.iscode == ''){
        this.codeidea = true;
        return;
      }else{
        this.codeidea = false;
      };
      let admintokeed = Base64.decode(localStorage.getItem('admintoke'));
      // pc/project/temporary/school/addNewTempSchool
      this.$http.post(this.$store.state.url+'pc/temporary/addNewTempUse', {orgid:this.schoolvalue,username:this.isname,collegename:this.branchvalue,email:this.ismail,phone:this.isphone,verifycode:this.iscode,xytoken:admintokeed,password:this.issurepassword},{emulateJSON: true,headers:{'xytoken':admintokeed}}).then((response) => {
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

<style lang="less">
</style>
