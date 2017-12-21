<template lang="html">
  <h1>全部资料</h1>
</template>

<script>
export default {
  data(){
    return{
      project:'19522',
      token:Base64.decode(localStorage.getItem('token')),
    }
  },
  mounted(){
    this.getAllProcess();
  },
  methods:{
    //获取全部资料
    getAllProcess(){
      this.$http.post(this.$store.state.url+'pc/project/resources/getAllResourceProcessList', {project:this.project},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
      this.username = response.data.data.username;
      })
    },
  },
}
</script>

<style lang="css">
</style>
