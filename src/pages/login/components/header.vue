<template lang="html">
  <header>
  <nav :class="{'navbar-inverse':noInloginIndex}">

    <div class="container">
      <!--Logo-->
      <div class="navbar-header">
        <a class="navbar-brand" href="https://www.xytzq.cn/"><img alt="投智圈" src="../assets/logo.png"></a>
      </div>
      <!--菜单-->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">

          <li role="presentation" class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">注册申请 <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <div class="plug"><span class="caret"></span></div>
              <li></li>
              <li><router-link :to="{path:'/scrolladminregister'}">校管理员申请</router-link></li>
              <li><router-link :to="{path:'/teacheradminregister'}">教师试用申请</router-link></li>
              <li><router-link :to="{path:'/studentadminregister'}">项目团队注册</router-link></li>
              <!-- <li><a href="../register/investor.html">评委账号开通</a></li> -->
              <li></li>
            </ul>
          </li>

          <li role="presentation" class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">在线帮助 <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <div class="plug"><span class="caret"></span></div>
              <li></li>
              <li><a href="https://www.xytzq.cn/help/process.html">校赛举办流程</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="https://www.xytzq.cn/help/admin.html">校管理员操作说明</a></li>
              <li><a href="https://www.xytzq.cn/help/teacher.html">导师管理员操作说明</a></li>
              <li><a href="https://www.xytzq.cn/help/student.html">项目报名操作说明</a></li>

              <li role="separator" class="divider"></li>
              <li><a href="https://www.xytzq.cn/problem/problem.html">常见问题</a></li>
              <li></li>
            </ul>
          </li>
          <li role="presentation"><a href="https://www.xytzq.cn/download/APP.html">下载APP</a></li>

          <li role="presentation" class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">关于我们 <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <div class="plug"><span class="caret"></span></div>
              <li></li>
              <li><a href="https://www.xytzq.cn/about/about_pc.html" target="_blank">了解投智圈</a></li>
              <li><a href="https://www.xytzq.cn/about/contact_pc.html" target="_blank">联系我们</a></li>
              <li></li>
            </ul>
          </li>

        </ul>
      </div>
    </div>
    </nav>
  </header>
</template>

<script>
import '../login-jq/jquery.min.js';
import '../login-jq/header.js'
  export default {
    data(){
      return{
        noInloginIndex:true,
      }
    },
    methods: {
      ifrouter(){
        if(this.$route.path == '/'){
          this.noInloginIndex = false;
        }else{
          this.noInloginIndex = true;
        }
      },
    },
    watch:{
      "$route": "ifrouter"
    },
    mounted(){
      if(this.$route.path == '/'){
        this.noInloginIndex = false;
      }
    }
  }
</script>

<style lang="css">
  header{
    z-index: 3 !important;
  }
</style>
