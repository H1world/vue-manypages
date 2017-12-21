<template>
	<div class="child-page mt50 mb80">
		<div class="container">
			<v-eventNav></v-eventNav>
			<div id="page-main">
				<!--路径-->
				<ol class="breadcrumb">
					<li>首页</li>
					<li>赛事活动</li>
					<li>参赛辅导项目</li>
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
					<ul>
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
								<span class="fr">创始人</span>
							</div>
							<div class="ovh">
								<span class="fl">河北农业大学 - 动物医学院/中兽医学院（创新创业课程成果）</span>
								<span class="fr"></span>
							</div>
							<div class="ovh">
								<span class="fl">互联网+信息服务</span>
								<span class="fr"></span>
							</div>
							<!--分割线-->
							<ul class="line-dashed exhibition">
								<div class="ovh">
									<span class="fl">参与赛事： 2</span>
									<button type="button" class="btn btn-primary btn-xs fr h30" @click='onlook()'> {{onlookhtml}} <i class="fa fa-chevron-circle-right" :class='{down: downstate}'></i></button>
								</div>
								<!--赛事列表-->
								<!-- <ul class="join-project animated" :class='[{fadeInDown:joinshow},{fadeOutUp:!joinshow}]'> -->
								<ul class="join-project" :class='{fadeInDown: joinshow}'>
									<li>
										<router-link :to="{path:'/eventDetails'}" target="_blank">
											<i class="fa fa-flag mrm" ></i>河北省互联网+创新创意大赛
										</router-link>
										<span class="mbm tag-state">已报名</span>
									</li>
								</ul>
							</ul>
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
import typeIndustry from '../../components/typeIndustry.vue';//行业分类

export default {
	data(){
		return{
			downstate:false,
			onlookhtml:'查看',
			joinshow:false,
		}
	},
	components: {
  		'v-eventNav':eventNav,
  		'v-pagination':pagination,
  		'v-typeIndustry':typeIndustry,
	},
	
	methods:{
		search(){//查询
		},
		eventDetails(){//赛事详细
		   this.$router.push({path:'/eventDetails'});
		},
		studioDetails(){//工作室详细
		   this.$router.push({path:'/studioDetails'});
		},
		onlook(){
			this.downstate = !this.downstate;
			this.joinshow = !this.joinshow 
			if(this.downstate == true){
				this.onlookhtml = '收起'
			}else{
				this.onlookhtml = '查看'
			}
		},
	},
}
</script>

<style>
	.fadeInDown{
		display:block !important;
	}
</style>