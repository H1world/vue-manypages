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
import headtop from './components/mainheader.vue';

import './scriptfile/jquery.min.js'
import './scriptfile/bootstrap.min.js'
import './scriptfile/bootstrap-paginator.js'//分页
import './scriptfile/page.js'
import './scriptfile/header.js'//下拉菜单
import './scriptfile/jquery.poshytip.js'//效验
import './scriptfile/fantaValid.js'

export default {
  components: {
  'v-headtop':headtop,
	},
}
</script>
