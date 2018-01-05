<template>
  <div>
      <h1>教学课程管理</h1>
      <div @click='goFoundCourse()'>创建新课</div>



  </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    methods:{
      goFoundCourse(){
        this.$router.push({path:'/teaching/foundcourse'})
      },
    },
    mounted(){

    },
  }
</script>