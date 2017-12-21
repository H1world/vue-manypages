<template>
	<div class="child-page mt50 mb80">
		<div class="container">
			<v-studioNav></v-studioNav>
			<div id="page-main">
				<!--路径-->
				<ol class="breadcrumb">
					<li>首页</li>
					<li>工作室</li>
					<li>工作室辅导</li>
				</ol>
				<!--查询-->
				<div class="search mbl">
					<form>
						<v-typeIndustry></v-typeIndustry>
						<input class="form-control" type="text" placeholder="项目名称">
						<button type="button" class="btn btn-primary btn-sm" @click="search()"><i class="fa fa-search"></i> 查询</button>
					</form>
				</div>
				<!--列表-->
				<div class="list-studio">
					<ul id="myprojectlist">
						<li>
							<div class="logo mrl fl">
								<router-link :to="{path:'/studioDetails'}" target="_blank">
									<img src="../../assets/tzq.png">
								</router-link>
							</div>
							<div class="ovh">
								<router-link :to="{path:'/studioDetails'}" target="_blank">
									<h5 class="fl">远程红外监控辅助系统</h5>
								</router-link>
								<button type="button" class="btn btn-primary btn-sm fr" @click="studioDetails()"><i class="fa fa-file-text fa-lg"></i> 详细</button>
							</div>
							<div class="ovh">
								<span class="fl">河北农业大学 - 动物医学院/中兽医学院（创新创业课程成果）</span>
							</div>
							<div class="ovh">
								<span class="fl">互联网+信息服务 - 社交网络</span>
							</div>
							<!--分割线-->
							<div class="line-dashed exhibition">
								<div class="ovh">
									<span class="fl mr30"><i class="mrm fa fa-users"></i>团队成员：11</span>
									<span class="fl mr30"><i class="mrm fa fa-user-md"></i>指导老师： 2</span>
									<span class="fl mr30"><i class="mrm fa fa-user-secret"></i>投智人：0</span>
									<span class="fr"><i class="mrm fa fa-flag"></i>参与赛事：2</span>
								</div>
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

import studioNav from './studioNav.vue';//左侧菜单
import pagination from '../../components/pagination.vue';//分页
import typeIndustry from '../../components/typeIndustry.vue';//行业分类

export default {
	components: {
  		'v-studioNav':studioNav,
  		'v-pagination':pagination,
  		'v-typeIndustry':typeIndustry,
	},
	
	methods:{
		search(){//查询
		},
		studioDetails(){//工作室详细
		   this.$router.push({path:'/studioDetails'});
		},
	}
}
</script>

<style>
</style>