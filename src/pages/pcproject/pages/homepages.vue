<template lang="html">
  <div class="">
    <!-- <v-headtop></v-headtop> -->
    <div class="iscontent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import headtop from '../components/tophead.vue';
export default {
  data(){
    return{}
  },
  components: {
    'v-headtop':headtop,
  },

}
</script>

<style lang="less" scoped>
</style>
