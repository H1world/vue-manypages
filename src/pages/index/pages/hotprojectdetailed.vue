<template lang="html">
  <div class="">
    <div class="website-banner">
			<div class="container">
				<div>
					<!--Logo-->
					<div class="logo br12">
						<img :src="projectinfo.logourl">
					</div>
					<!--信息-->
					<div class="information">
						<h5>{{projectinfo.name}}</h5>
						<div>
							<div class="fl">{{projectinfo.tradename}}</div>
							<div class="fl mll" v-for='headerprocess in projectinfo.processlist'>{{headerprocess.processclassname}}</div>
							<!-- <button class="btn btn-xs btn-white fr" type="button"><i class="fa fa-star-o"></i> 关注</button> -->
							<!--<button class="btn btn-xs btn-white fr" type="button"><i class="fa fa-star"></i> 已关注</button>-->
						</div>
						<div class="tags">
							<span v-for='technologydata in projectinfo.technologylist'>{{technologydata.technologyname}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="container section-website mb80">
			<div class="row">
				<div class="col-md-9">

					<section class="section-name" v-if='isindex1All'>
						<h6>项目介绍</h6>
						<div class="form-group" v-if='isindexintro'>
							<label class="col-md-2 control-label">项目简介</label>
							<div class="col-md-10">{{projectinfo.intro}}</div>
						</div>
						<div class="form-group" v-if='isindexhighlights'>
							<label class="col-md-2 control-label">项目亮点</label>
							<div class="col-md-10">
								{{projectinfo.highlights}}
							</div>
						</div>
					</section>

					<section class="section-name" v-if='isindex2All'>
						<h6>获得专利</h6>
						<ul class="project-table">
							<li>
								<span>专利名称</span>
								<span>专利号</span>
								<span>专利类别</span>
								<span>授权公告日</span>
							</li>
							<li v-for='patent in projectinfo.patentlist'>
								<span>{{patent.patentname}}</span>
								<span>{{patent.patentcode}}</span>
								<span>{{patent.patenttypename}}</span>
								<span>{{patent.gettime}}</span>
							</li>
						</ul>
					</section>

					<section class="section-name" v-if='isindex3All'>
						<h6>获得荣誉</h6>
						<ul class="project-table">
							<li>
								<span>获得奖项</span>
								<span>获得日期</span>
							</li>
							<li v-for='honor in projectinfo.honorlist'>
								<span>{{honor.title}}</span>
								<span>{{honor.gettime}}</span>
							</li>
						</ul>
					</section>

					<section class="section-name" v-if='isindex4All'>
						<h6>获得投资</h6>
						<ul class="project-table">
							<li>
								<span>投资方（机构/个人）</span>
								<span>融资阶段</span>
								<span>融资金额（万元）</span>
								<span>投资日期</span>
							</li>
							<li v-for='investment in projectinfo.investmentlist'>
								<span>{{investment.investmentorg}}</span>
								<span>{{investment.processclassname}}</span>
								<span>{{investment.investmentvalue}}</span>
								<span>{{investment.gettime}}</span>
							</li>
						</ul>
					</section>

					<section class="section-name" v-if='isindex5All'>
						<h6>获得项目成果</h6>
						<ul class="project-table">
							<li>
								<span>获得项目成果</span>
								<span>获得日期</span>
							</li>
							<li v-for='result in projectinfo.resultlists'>
								<span>{{result.title}}</span>
								<span>{{result.createtime}}</span>
							</li>
						</ul>
					</section>

					<section class="section-name" v-for='synext in projectinfo.business'>
						<h6>商业信息</h6>
						<div class="form-group">
							<label class="col-lg-2 control-label">公司名称</label>
							<div class="col-lg-10">{{synext.companyname}}</div>
						</div>
						<div class="form-group">
							<label class="col-lg-2 control-label">公司类型</label>
							<div class="col-lg-10">{{synext.companyclassname}}</div>
						</div>
						<div class="form-group">
							<label class="col-lg-2 control-label ">注册号</label>
							<div class="col-lg-3">{{synext.orgcode}}</div>
						</div>
						<div class="form-group">
							<label class="col-lg-2 control-label">所在地区</label>
							<div class="col-lg-10">{{synext.address}}</div>
						</div>
						<div class="form-group">
							<label class="col-lg-2 control-label">法定代表人</label>
							<div class="col-lg-10">{{synext.legalperson}}</div>
						</div>
						<div class="form-group">
							<label class="col-lg-2 control-label ">注册资本</label>
							<div class="col-lg-10">{{synext.registeredcapital}}万元</div>
						</div>
						<div class="form-group">
							<label class="col-lg-2 control-label">经营范围</label>
							<div class="col-lg-10">
								{{synext.scope}}
							</div>
						</div>
					</section>

					<section class="section-name" v-if='isindex6All'>
						<h6>出让股权</h6>
						<div class="form-group" v-if='isindex6Allspan1'>
							<label class="col-lg-2 control-label">可出让额度</label>
							<div class="col-lg-10">{{projectinfo.stock.sellstockvalue}} %</div>
						</div>
						<div class="form-group" v-if='isindex6Allspan2'>
							<label class="col-lg-2 control-label">出让股权描述</label>
							<div class="col-lg-10">
								{{projectinfo.stock.context}}
							</div>
						</div>
					</section>

				</div>

				<div class="col-md-3">
					<aside class="section-name aside-right" v-if='isindex7All'>
						<h6>核心团队</h6>
						<div class="section-title aside-right">
							<div class="ovh" v-for='usernext in projectinfo.userlist'>
								<span class="section-photo">
									<img :src="usernext.userimage">
								</span>
								<div class="name">
									<span>{{usernext.username}}</span>
									<p class="mt-10">{{usernext.identityname}}</p>
								</div>
							</div>
						</div>
					</aside>

					<aside class="section-name aside-right" v-if='isindex8All'>
						<h6>指导老师</h6>
						<div class="section-title aside-right">
							<div class="ovh" v-for='wisemannext in projectinfo.wisemanlist'>
								<span class="section-photo">
									<img :src="wisemannext.userimage">
								</span>
								<div class="name">
									<span>{{wisemannext.username}}</span>
									<p class="mt-10">指导方向：{{wisemannext.coachdirection}}</p>
								</div>
							</div>

						</div>
					</aside>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
	data(){
		return{
			projectid: Base64.decode(this.$route.params.projectid),
			projectinfo: '',
			//项目介绍
			isindex1All:false,
			isindexintro:false,
			isindexhighlights:false,
			//获得专利
			isindex2All:false,
			//荣誉
			isindex3All:false,
			//投资
			isindex4All:false,
			//项目成果
			isindex5All:false,
			isindex6All:false,
			isindex6Allspan1:false,
			isindex6Allspan2:false,
			isindex7All:false,
			isindex8All:false,
		}
	},
	methods:{
		getProjectInfo(){
			this.$http.post(this.$store.state.url+'pc/project/getProjectInfo',{projectid:this.projectid},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
				this.projectinfo = response.data.data;
        console.log(this.projectinfo);
				if(this.projectinfo.intro != '' && this.projectinfo.intro != undefined){
					this.isindexintro=true;
				}
				if(this.projectinfo.highlights != '' && this.projectinfo.highlights != undefined){
					this.isindexhighlights=true;
				}
				if(this.isindexintro != false || this.isindexhighlights != false){
					this.isindex1All=true;
				}

				if(this.projectinfo.patentlist != '' && this.projectinfo.patentlist != undefined){
					this.isindex2All=true;
				}

				if(this.projectinfo.honorlist != '' && this.projectinfo.honorlist != undefined){
					this.isindex3All=true;
				}
				if(this.projectinfo.investmentlist != '' && this.projectinfo.investmentlist != undefined){
					this.isindex4All=true;
				}
				if(this.projectinfo.resultlists != '' && this.projectinfo.resultlists != undefined){
					this.isindex5All=true;
				}

				if(this.projectinfo.stock.sellstockvalue != '' && this.projectinfo.stock.sellstockvalue != undefined){
					this.isindex6Allspan1=true;
				}
				if(this.projectinfo.stock.context != '' && this.projectinfo.stock.context != undefined){
					this.isindex6Allspan2=true;
				}
				if(this.isindex6Allspan1 != false || this.isindex6Allspan2 != false){
					this.isindex6All=true;
				}

				if(this.projectinfo.userlist != '' && this.projectinfo.userlist != undefined){
					this.isindex7All=true;
				}
				if(this.projectinfo.wisemanlist != '' && this.projectinfo.wisemanlist != undefined){
					this.isindex8All=true;
				}
			})
		},
	},
	mounted(){
		this.getProjectInfo();
	},
}
</script>

<style lang="less">
</style>
