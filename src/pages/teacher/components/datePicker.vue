<template>
	<el-date-picker
      v-model="value1"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
</template>

<script>
 export default {
    data() {
      return {
        value1: '',
//      readonly:true,
      };
    }
  };
</script>

<style>
</style>