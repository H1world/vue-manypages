<template>
	<div class="child-page mt50 mb80">
		<div class="container">
			<v-eventNav></v-eventNav>
			<div id="page-main">
				<!--路径-->
				<ol class="breadcrumb">
					<li>首页</li>
					<li>赛事活动</li>
					<li>赛事信息</li>
				</ol>
				<!--查询-->
				<div class="search mbl">
					<form>
						<label>赛事日期</label>
						<v-datePicker></v-datePicker>
						<label class="mlm">创办机构</label>
						<select class="form-control">
							<option>请选择</option>
						</select>
						<button type="button" class="btn btn-primary btn-sm" @click="search()"><i class="fa fa-search"></i> 查询</button>
					</form>
				</div>
				
				<!--列表-->
				<div class="list-studio">
					<ul>
						<li>
							<div class="logo mrl fl">
								<router-link :to="{path:'/eventDetails'}" target="_blank">
									<img src="../../assets/tzq.png">
								</router-link>
							</div>
							<div>
								<router-link :to="{path:'/eventDetails'}" target="_blank">
									<h5 class="title">河北省互联网+创新创意大赛
										<span class="mbm tag-state">已开赛</span>
									</h5>
								</router-link>
							</div>
							<div class="ovh">
								<span class="fl">赛事日期：2017-01-01 至 2017-12-31</span>
								<span class="fr"></span>
							</div>
							<div class="ovh mbm">
								<span class="fl">河北农业大学 - 校本部</span>
								<span class="fr">创建者：校管理员</span>
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

	import eventNav from './eventNav.vue';//左侧菜单
	import pagination from '../../components/pagination.vue';//分页
	import datePicker from '../../components/datePicker.vue';//日期

	export default {
		components: {
			'v-eventNav':eventNav,
			'v-pagination':pagination,
			'v-datePicker':datePicker,
		},
		
		methods:{
			search(){//查询
			},
			eventDetails(){//赛事详细
				this.$router.push({path:'/eventDetails'});
			},
		}
	}
</script>

<style>
</style>