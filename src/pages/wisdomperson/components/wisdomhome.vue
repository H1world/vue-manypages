<template lang="html">
    <div class="">
      <v-headtop></v-headtop>
      <div class="mainsize">
        <el-tabs v-model="activeName" type="card">
         <el-tab-pane label="全部资料" name="first"><v-allProcess></v-allProcess></el-tab-pane>
         <el-tab-pane label="我的资料" name="second"><v-myProcess></v-myProcess></el-tab-pane>
       </el-tabs>
      </div>
    </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
import headtop from './headtop.vue';
import allProcess from './allProcess.vue';
import myProcess from './myProcess.vue';
export default {
  data(){
    return{
      activeName: 'first',
      project:'19522',
    }
  },
  components: {
    'v-headtop':headtop,
    'v-allProcess':allProcess,
    'v-myProcess':myProcess,
  },
  methods:{
  },
  mounted(){

  },
  computed:{

  }
}
</script>

<style lang="css" scoped>
</style>
