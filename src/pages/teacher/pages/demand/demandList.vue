<template>
	<div class="child-page mt50 mb80">
		<div class="container">
			<v-demandNav></v-demandNav>
			<div id="page-main">
				<!--路径-->
				<ol class="breadcrumb">
					<li>首页</li>
					<li>需求大厅</li>
					<li>需求发布</li>
					<router-link :to="{path:'/newDemand'}" target="_blank">
						<button class="btn btn-info btn-sm fr" type="button">发布新需求</button>
					</router-link>
				</ol>
				<!--查询-->
				<div class="search mbl">
					<form>
						<v-typeIndustry></v-typeIndustry>
						<input class="form-control" type="text" placeholder="需求标题">
						<button type="button" class="btn btn-primary btn-sm" @click="search()"><i class="fa fa-search"></i> 查询</button>
					</form>
				</div>
				<!--列表-->
				<div class="list-studio">
					<ul id="myprojectlist">
						<li>
							<div class="worry"></div>
							<span class="navbar-unread">12</span>
							<div class="ovh">
								<router-link :to="{path:'/demandDetails'}" target="_blank">
									<h5 class="fl">测试工程师（硬件方向）</h5>
								</router-link>
							</div>
							<div class="ovh mbm">
								<span class="fl">北京-海淀</span>
								<span class="fl mll">互联网+信息服务 - 社交网络</span>
								<span class="fr">发布于：2017-09-01</span>
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

import demandNav from './demandNav.vue';//左侧菜单
import pagination from '../../components/pagination.vue';//分页
import typeIndustry from '../../components/typeIndustry.vue';//行业分类

export default {
	components: {
  		'v-demandNav':demandNav,
  		'v-pagination':pagination,
  		'v-typeIndustry':typeIndustry,
	},
	
	methods:{
		search(){//查询
		},
		newDemand(){
			this.$router.push({path:'/newDetails'});
		},
		demandDetails(){//工作室详细
		   this.$router.push({path:'/demandDetails'});
		},
	}
}
</script>

<style>
</style>