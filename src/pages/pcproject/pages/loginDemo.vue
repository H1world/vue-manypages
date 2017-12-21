<template lang="html">
    <div class="">
      <h1></h1>
      <input type="text" name="" value="" v-model='inputa'>
      <input type="text" name="" value="" v-model='inputb'>
      <button type="button" name="button" @click='democlick()'>登录</button>
    </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
  data(){
    return{
      inputa:'13581739246',
      inputb:'a123456',
      token:'',
    }
  },
  methods:{
    democlick(){
      this.$http.post(this.$store.state.url+'pc/login/dologin', {accountname:this.inputa,password:this.inputb},  {emulateJSON: true}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
      this.token = response.data.data.xytoken;
      localStorage.setItem('token', Base64.encode(this.token));
      let accountid = Base64.encode(response.data.data.accountid);
      this.$router.push({path:'/home?'+ 'id=' +accountid})
    })
      // this.$router.push({path:'/home'});<router-link to='home' target = _blank>登录</router-link>
      // this.$router.push({path:'/home'})
    }
  },
  mounted(){
    // if(window.WebSocket){
    //     console.log('This browser supports WebSocket');
    // }else{
    //     console.log('This browser does not supports WebSocket');
    // }
  },
}
</script>

<style lang="css" scoped>
</style>
