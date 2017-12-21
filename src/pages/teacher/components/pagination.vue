<template>
	<div class="text-center">
		<div class="pagination">
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				layout="prev, pager, next"
				:total="PageCount">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {},
		data() {
			return {
				PageCount: 100, //总数
				handleCurrentChange: 1, //触发当前页
				currentPage: 1, //当前页数
			};
		}
	}
</script>
<style>
</style>