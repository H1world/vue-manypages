<template>
  <div id="app">
    <v-headtop></v-headtop>
    <!-- <div class="iscontent"> -->
    <router-view></router-view>
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <!-- </div> -->
    <!-- 底部 -->
    <footer>
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
import headtop from './components/tophead.vue';
export default {
  name: 'app',
  mounted () {
		function IsPC(){
    	var userAgentInfo = navigator.userAgent;
    	var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    	var flag = true;
    	for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    	}
    	return flag;
		}
		var flag = IsPC(); //true为PC端，false为手机端
		if(flag == false){
			window.location.href = 'https://www.xytzq.cn/download/APP_mobile.html';
		}
  },
  components: {
    'v-headtop':headtop,
  }
}
</script>

<style lang="less" scoped>
#heightenh{
  width: 100%;
  height: 100%;
  display: block;
}
  footer {
    background-color: #7f8c8d;
    color: #ffffff;
    font-size: 14px;
    padding: 0;
    font-weight: 100;
    position: absolute;
    bottom: 0;
    width: 100%;
    .container{
      width: 1170px;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
      .copy-right{
        height: 50px;
        line-height: 50px;
        text-align: center;
        a{
          border-bottom: 1px dotted rgba(255, 255, 255 , .6);
          color: #ffffff;
          margin-left: 12px;
          transition: .25s;
          text-decoration: none;
        }
      }
    }
  }
  footer .copy-right > * + * {
    margin-left: 12px;
  }
</style>
