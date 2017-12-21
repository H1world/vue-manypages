<template>
  <div class="istophead">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo xy-topul" mode="horizontal"  @select="handleSelect">
      <div class="logo">
        <a href="https://www.xytzq.cn/"><img src="../assets/logo.png" alt=""></a>
      </div>
      <el-menu-item index="1"><router-link :to="{path:'/home'}">首页</router-link></el-menu-item>
      <!-- <el-menu-item index="2">分析</el-menu-item> -->
      <div class="userportrait">
        <div class="xyuserzp">
          <img :src="userimg" alt="">
        </div>
        <el-dropdown>
          <el-button type="primary">
            {{username}}<i class="xy-top-ico"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <router-link :to="{path:'/Modifypassword'}"><el-dropdown-item>修改密码</el-dropdown-item></router-link>
            <a @click='signOut()'><el-dropdown-item divided >退出</el-dropdown-item></a>
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
      token:Base64.decode(localStorage.getItem('token')),
      accountid:Base64.decode(localStorage.getItem('accountid')),
      username:'',
      userimg:'',
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
      this.userimg = response.data.data.userimage
    })
    },
    signOut(){
      this.$cookie.delete('Pc_V_Save_token');
      this.$cookie.delete('Pc_V_Save_roleid');
      this.$cookie.delete('Pc_V_Save_accountid');
      this.$cookie.delete('Pc_V_Yes_login');
      window.location.href=this.$store.state.currenturl;
    },
  },

  mounted(){
    this.getUserInformation();
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
a{
  color:#000;
}
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
        border-radius: 50%;
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
  .el-menu--horizontal{
    border-bottom: none !important;
  }
</style>
