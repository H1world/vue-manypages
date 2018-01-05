<template lang="html">
  <div class="">
    <v-pubilctop></v-pubilctop>
    <div class="iscontent">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script>
import pubilctop from '../components/public-teachingandhome-top.vue';
export default {
  data(){
    return{}
  },
  
  components: {
    'v-pubilctop':pubilctop,
  },

  beforeMount(){
    var isheight = document.body.clientHeight;
    this.$store.commit('pcprojectTeachingHeight',isheight)
  }
}
</script>

<style lang="less" scoped>
</style>
