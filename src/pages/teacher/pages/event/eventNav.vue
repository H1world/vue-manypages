<template>
	<ul class="nav fl pbl">
		<h6>赛事活动</h6>
		<el-row class="tac">
			<el-col :span="24">
				<el-menu default-active="1" class="el-menu-vertical-demo">
					<el-menu-item index="1">
						<router-link :to="{path:'/eventList'}">赛事信息</router-link>
					</el-menu-item>
					<el-menu-item index="2">
						<router-link :to="{path:'/eventJoin'}">参赛辅导项目</router-link>
					</el-menu-item>
					<el-menu-item index="3">
						<router-link :to="{path:'/eventReview'}">赛事评审</router-link>
					</el-menu-item>
					<el-menu-item index="4">
						<router-link :to="{path:'/eventRecord'}">赛事历史</router-link>
					</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>
	</ul>
</template>
<script>
	
</script>

<style>
	
</style>