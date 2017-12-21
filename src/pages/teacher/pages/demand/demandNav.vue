<template>
	<ul class="nav fl pbl">
		<h6>需求大厅</h6>
		<el-row class="tac">
			<el-col :span="24">
				<el-menu default-active="1" class="el-menu-vertical-demo">
					<el-menu-item index="1">
						<router-link :to="{path:'/demandList'}">需求发布</router-link>
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