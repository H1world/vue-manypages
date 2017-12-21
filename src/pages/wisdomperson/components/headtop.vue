<template>
  <div class="istophead">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo xy-topul" mode="horizontal"  @select="handleSelect">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <el-menu-item index="1">投智人上传资料</el-menu-item>
      <!-- <el-menu-item index="2">分析</el-menu-item> -->
      <div class="userportrait">
        <div class="xyuserzp">
          <img src="../assets/nophoto.png" alt="">
        </div>
        <el-dropdown>
          <el-button type="primary">
            {{username}}<i class="xy-top-ico"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人资料</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
  data () {
    return {
      activeIndex: '1',
      accountid:Base64.decode(localStorage.getItem('accountid')),
      token:Base64.decode(localStorage.getItem('token')),
      username:'',
    }
  },
  methods: {
    handleSelect(key, keyPath){
    },
      //获取用户头像
    getUserInformation(){
      this.$http.post(this.$store.state.url+'pc/person/getMyBrieflyInfo', {accountid :this.accountid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
      this.username = response.data.data.username;
    })
    },
  },

  mounted(){
    this.getUserInformation();
    // this.socket();

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .userportrait{
    float: right;
    height: 100%;
    .xyuserzp{
      border: 1px solid rgba(255, 255, 255, .8);
      background-color: rgba(255, 255, 255, .2);
      width: 34px;
      height: 34px;
      margin-top: 10px;
      padding: 0;
      border-radius: 50%;
      float:left;
      img{
        height: 100%;
        width: 100%;
        max-width: none;
      }
    }
  }
  .el-dropdown{
    height: 100%;
  }
  .el-button{
    background: #2c3e50;
    height: 100%;
    border: none;
  }
  .xy-top-ico{
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 15px;
    vertical-align: baseline;
    border-top: 8px solid;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    -webkit-transition: border-color 0.25s, color 0.25s;
    transition: border-color 0.25s, color 0.25s;
    color: #ffffff;
    border-style: solid;
    border-width: 0 0 6px 6px;
  }
</style>
