<template>
  <div id="app">
    <v-headtop></v-headtop>
    <router-view></router-view>
    <!-- <footer class="lgoin-footer bg-t">
      <div class="container">
        <div class="copy-right">
          <span>版权所有 © 2017</span>
          <span>北京行云尚学科技有限公司</span>
          <a href="http://www.miibeian.gov.cn/" target="_blank"> 京ICP备17010019号</a>
        </div>
      </div>
    </footer> -->
  </div>
</template>


<script>
import 'babel-polyfill';
import headtop from './components/header.vue';

export default {
  components: {
  'v-headtop':headtop,
  },
  mounted(){
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
}
</script>

<style>

</style>
