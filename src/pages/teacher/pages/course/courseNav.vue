<template>
	<ul class="nav fl pbl">
		<h6>课程</h6>
		<el-row class="tac">
			<el-col :span="24">
				<el-menu default-active="1"
					class="el-menu-vertical-demo"
					@open="handleOpen"
      				@close="handleClose">
					<el-menu-item index="1">
						<router-link :to="{path:'/courseMaterial'}">课程资料</router-link>
					</el-menu-item>
					<el-submenu index="2" class='index-1'>
						<template slot="title">
							<span>问卷调查</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="2-1">
								<router-link :to="{path:'/papersTemplate'}"><i class="fa fa-file-text-o"></i>模板</router-link>
							</el-menu-item>
							<el-menu-item index="2-2">
								<router-link :to="{path:'/papersCopy'}"><i class="fa fa-copy"></i>问卷</router-link>
							</el-menu-item>
							<el-menu-item index="2-3">
								<router-link :to="{path:'/papersTrash'}"><i class="fa fa-trash-o"></i>回收站</router-link>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<!--<el-menu-item index="3">
						<span slot="title">案例</span>
					</el-menu-item>-->
				</el-menu>
			</el-col>
		</el-row>
	</ul>
</template>

<script>
	$(function(){
		
		$('.el-submenu').addClass('is-opened');
		$('.el-menu').css('display','block');
	});
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>

</style>