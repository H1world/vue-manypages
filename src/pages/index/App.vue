<template>
  <div id="app">
    <v-headtop></v-headtop>
    <router-view></router-view>

    <footer class="lgoin-footer bg-t">
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
import 'babel-polyfill';
import headtop from './components/mainheader.vue';

export default {
  components: {
  'v-headtop':headtop,
},
  methods:{
    //在首页获取省 市 等共用数据
    // getShareOrgData(){
    //   this.$http.post(this.$store.state.url+'system/getProvinceInfo',{existall:1},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
    //     this.$store.commit('getorgData',response.data.data);
    //    })
    // },
  },
  mounted(){
    // this.$store.commit('getorgData',this);
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
  }
}
</script>

<style>

</style>
