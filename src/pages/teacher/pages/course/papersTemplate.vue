<template>
	<div class="child-page mt50 mb80">
		<div class="container">
			<v-courseNav></v-courseNav>
			<div id="page-main">
				<!--路径-->
				<ol class="breadcrumb">
					<li>首页</li>
					<li>课程</li>
					<li>问卷调查</li>
					<li>模板</li>
				</ol>
				
				<!--列表-->
				<div class="list-studio">
					<ul id="myprojectlist">
						<li>
							<div class="box60 mrl fl">
								<img class="box60 br0" src="../../assets/papersCopy.png">
							</div>
							<div class="ovh">
								<h5 class="fl">为何培养双创引导师</h5>
								<button type="button" class="btn btn-info btn-xs mts fr" @click="download()"><i class="fa fa-cloud-download"></i> 下载</button>
							</div>
							<div class="ovh">
								<span class="fl">分类：培养双创引导师</span>
								<span class="fr">1.64M</span>
							</div>
						</li>
					</ul>
					<v-pagination></v-pagination>
				</div>

			</div>
		</div>
	</div>
</template>

<script>

import courseNav from './courseNav.vue';//左侧菜单
import pagination from '../../components/pagination.vue';//分页

export default {
	components: {
  		'v-courseNav':courseNav,
  		'v-pagination':pagination,
	},
	
	methods: {
		search(){//查询
		},
		download(){//资料下载
		},
	}
}
</script>

<style>
</style>