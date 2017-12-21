<template lang="html">
  <div class="mainsize">
    <div class="modifyBox phoneyzm" v-if='overone'>
      <p><span>手机号：</span><el-input v-model="phone" class='phoneinput' :disabled="true"></el-input></p>
      <p>
        <span>验证码：</span><el-input v-model="yzmtext" class='yzminput' :maxlength='4'></el-input>
        <el-button type="primary" class='clickyzm' :disabled="codeType" @click='sendCod()'>{{codeText}}</el-button>
      </p>
      <el-button type="primary" :class="{ nextStep: disabled == false }" style="margin-top: 50px" @click='nextStep()' :disabled="disabled">下一步</el-button>
    </div>
    <div class="modifyBox" v-if='overtwo'>
      <!-- <p><span>旧密码：</span><el-input v-model="oldpassword" placeholder="请输入旧密码"></el-input></p> -->
      <p class="newpass">
        <span>新密码：</span>
        <el-input v-model="newpassword" :class="{ newpascw: newpascw == true}" :type='type' placeholder="请输入新密码"></el-input>
        <i class="fa" :class="[{'fa-eye-slash':faeye == false},{'fa-eye':faeye == true }]" @click='faeyeed()'></i>
        <i class="mast">*</i>
        <input v-if='newpassed' class="prompt" v-model="newpassedtext">
      </p>
<!-- fa-eye
fa-eye-slash -->
      <p class="Prompt"><i class="el-icon-warning"></i>请及时修改密码，长时间未操作则会失效。</p>
      <!-- <p><span>确认密码：</span><el-input v-model="surenewpassword" placeholder="请确认密码"></el-input></p> -->
      <el-button type="primary" class='nextStep' @click='previousStep()'>返回</el-button>
      <el-button type="primary" class='nextStep' @click='surebut()'>修改</el-button>
    </div>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64;

export default {
  data(){
    return{
      token:Base64.decode(localStorage.getItem('token')),
      phone:'',
      phonesend:'',
      issurephone:'',
      yzmtext:'',
      newpassword:'',
      overone:true,
      overtwo:false,
      faeye:true,
      type:'password',
      disabled:false,
      codeType:false,
      codeText:'发送验证码',
      newpascw:false,
      newpassed:false,
      newpassedtext:'',
    }
  },
  mounted(){
    this.getphone();
  },
  methods:{
    //获取手机号
    getphone(){
      this.$http.post(this.$store.state.url+'pc/person/getUserPhone', {},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.phone = response.data.data.encryptionphone;
        this.phonesend = response.data.data.phone;
      })
    },
    //发送验证码
    sendCod(){
      this.$http.post(this.$store.state.url+'system/base/sendSMSCode', {phonenumber:this.phonesend,},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        if(response.data.result == "success"){
          this.codeType = true;
          this.codeText = 90;
          let interval = setInterval(() => {
          if ((this.codeText--) <= 0) {
              this.codeText = '重新发送';
              this.codeType = false;
              clearInterval(interval);
            }
          }, 1000);
        }else{
          this.$notify({
            title: '警告',
            message: '发送验证码有问题',
            type: 'warning'
          });
        }
      })
    },
    //下一步
    nextStep(){
      this.overone = false;
      this.overtwo = true;
    },
    previousStep(){
      this.overone = true;
      this.overtwo = false;
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
    surebut(){
      let reg = /[\u4e00-\u9fa5]/;
      let regs = /\s+/g;
      if(RegExp(regs).test(this.newpassword) == true){
        this.newpascw=true;
        // this.newpassword = '';
        this.newpassed = true;
        this.newpassedtext = '有空格'
        return;
      };
      if(RegExp(reg).test(this.newpassword) == true){
          this.newpascw=true;
          // this.newpassword = '';
          this.newpassed = true;
          this.newpassedtext = '密码规则是大于六位的数字/字母组合'
          return;
      }else{
        this.newpascw=false;
        this.newpassed = false;
      };
      if(this.newpassword.length < 6){
        this.newpascw=true;
        this.newpassed = true;
        this.newpassedtext = '密码不能小于六位'
        return;
      }else{
        this.newpascw=false;
        this.newpassed = false;
      };
      if(this.yzmtext == ''){
        this.$notify({
          title: '警告',
          message: '您的验证码为空',
          type: 'warning'
        });
        return;
      };
      // if(this.newpassword == ''){
      //   this.$notify({
      //     title: '警告',
      //     message: '拜托！你的新密码还没填呢',
      //     type: 'warning'
      //   });
      //   return;
      // };
      this.$http.post(this.$store.state.url+'pc/login/modifyPassWord', {accountname:this.phonesend,password:this.newpassword,smscode:this.yzmtext},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        if(response.data.result == "success"){
          this.$notify({
            title: '成功',
            message: '你的新密码已经修好了，即将跳转到登录页 请用新密码重新登录~',
            type: 'success'
          });
          // sessionStorage.setItem('accountname', this.phonesend);
          let t = setTimeout(() => {
            window.location.href= this.$store.state.currenturl;
          }, 2000);
        }else{
          this.$notify({
            title: '失败',
            message: response.data.describe,
            type: 'warning'
          });
        }
      })
    },
  },
}
</script>

<style lang="less">
.mainsize{
  .modifyBox{
    width: 500px;
    margin:100px auto;
    text-align: center;
    .newpass{
      position: relative;
      .fa-eye, .fa-eye-slash{
        position: absolute;
        right: 62px;
        top: 1px;
        height: 34px;
        vertical-align: middle;
        line-height: 36px;
        width: 30px;
        color: #999;
        border-radius: 2px;
      }
    }
    p{
      display: block;
      margin-top: 20px;
      span{
        display: inline-block;
        width: 90px;
        text-align: left;
      }
      .yzminput{
        width: 170px !important;
      }
      .el-input{
        width: 300px;
        .el-input__inner:focus{
          border-color: #1abc9c;
        }
      }
      .clickyzm{
        text-align: center;
        padding: 10px 0px;
        margin-left: 33px;
        background: #1abc9c;
        border-color: #1abc9c;
        span{
          text-align: center;
        }
      }
      .mast{
        font-style: normal;
        color: #f39c12 !important;
        padding-left: 5px;
      }
      .prompt{
        border: none;
        outline: none;
        width: 300px;
        text-align: left;
        color: #b00;
        padding: 10px 0;
        position: absolute;
        left: 95%;
      }
    }
    .Prompt{
      height: 36px;
      color: #f39c12 !important;
      font-size: 14px;
      i{
        margin-right: 5px;
      }
    }
  }
  .nextStep{
    background: #1abc9c;
    border-color: #1abc9c;
    margin-top: 50px;
  }
}
.newpascw{
  input{
    border-color:#f39c12 !important;
  }
}
</style>
