<template lang="html">
	<div>
		<!--个人信息-->
		<div class="user-home">
			<div class="container">
				<div class="mt40 mb40">
					<!--头像-->
					<div class="user-photo fl mr30">
						<router-link :to="{path:'/personalDetails'}" class="img-circle">
							<img class="img-circle" src="../../assets/nophoto.png">
							<span class="hide-s">修改头像</span>
							<span class="certified vip1"></span>
						</router-link>
					</div>
					<!--个人信息-->
					<div class="user-information fl">
						<h5 class="mtn mb15 fwn">
							<span>{{username}}</span>
							<button type="button" class="btn btn-xs mll btn-default" @click='personalDetails()'>未认证 <i class="fa fa-exclamation-circle"></i></button>
							<!--<button type="button" class="btn btn-xs mll btn-white" @click='personalDetails()>已认证 <i class="fa fa-check-circle"></i></button>-->
						</h5>
						<div>所在省 - 市</div>
						<div>最新创建所在单位</div>
					</div>
				</div>
			</div>
		</div>
		<!--列表信息-->
		<div class="container mtl min-h400 mb80">
			<div class="row">
				<div class="col-md-8 section-home">
					<!--工作室-->
					<section>
						<h6>工作室辅导
							<button type="button" class="btn btn-primary btn-sm fr" @click='studioList()'>查看全部</button>
						</h6>
						<ul>
							<li class="line-dashed">
								<router-link :to="{path:'/studioDetails'}"  target="_blank">
									<div class="mbm ovh">
										<div class="logo mrl fl"><img src="../../assets/tzq.png"></div>
										<div class="event-home fr">
											<div class="title por">
												<h5 title="">红外线远程监控辅助系统</h5>
											</div>
											<div class="attribute text-right">
												<span class="fl">河北省农业大学</span>
												<span class="fl">互联网+信息服务 - 社交网络</span>
												<span class="fr">未融资</span>
											</div>
										</div>
									</div>
									<div class="tags clear ml80">
										<span>移动互联网</span>
										<span>云计算</span>
										<span>人工智能</span>
									</div>
								</router-link>
							</li>
						</ul>
					</section>
					<!--赛事活动-->
					<section>
						<h6>赛事评审 <button type="button" class="btn btn-primary btn-sm fr" @click='eventReview()'>查看全部</button></h6>
						<ul>
							<li class="line-dashed">
								<router-link :to="{path:'/#'}"  target="_blank">
									<div class="logo mrl fl"><img src="../../assets/tzq.png"></div>
									<div class="event-home fl">
										<div class="title por">
											<h5 title="">河北省互联网+创新创意大赛</h5>
											<span class="mbm tag-state">已开赛</span>
										</div>
										<div class="attribute text-right">
											<span class="fl">报名日期：2017-01-01 至 2017-01-01 </span>
											<span class="fr">创建者：校管理员</span>
										</div>
									</div>
								</router-link>
							</li>

						</ul>
					</section>
				</div>
				<div class="col-md-4 aside-home">
					<aside>
						<h6>
							<router-link :to="{path:'/eventList'}"  target="_blank">
							赛事消息<i class="fa fa-angle-double-right"></i>
							</router-link>
						</h6>
						<ul>
							<li>
								<router-link :to="{path:'/eventDetails'}"  target="_blank">
									<span class="fl">河北省互联网+创新创意大赛第三届金奖争夺战</span>
									<span class="fr">2017-01-01</span>
								</router-link>
							</li>
						</ul>
					</aside>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	
	$(function(){
		//修改头像
		$('.user-photo > a').mouseover(function() {
			$(this).find('span.hide-s').show();
		}).mouseout(function() {
			$(this).find('span.hide-s').hide();
		});
	});
	export default {
		data() {
			return {
				username: '姓名'
			}
		},
		
		methods:{
			personalDetails(){//个人资料
			   this.$router.push({path:'/personalDetails'});
			},
			studioList(){//工作室
			   this.$router.push({path:'/studioList'});
			},
			eventReview(){//赛事
			   this.$router.push({path:'/eventReview'});
			},
		}
	}
</script>

<style>
</style>