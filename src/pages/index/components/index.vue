<template lang="html">
  <div class="">
    <!-- banner -->
    <div	class="webbanner">
        <el-carousel :interval="5000">
          <el-carousel-item v-for="item in bannerurllist" :key="item.id" :style="{ background: item.color}">
            <img :src="item.image" alt="">
          </el-carousel-item>
        </el-carousel>
    </div>
    <!-- 合作院校 -->
    <div class="schoolfunc">
			<div  class="container">
				<ul class='school-index-listul'>
					<h5><router-link :to="{path:'/cooperateschool'}">全部 {{orgAlldata}} 所合作院校</router-link></h5>
					<li v-for='indexschool in hotSchool'><router-link :to="{path:'/schooldetailed/'+indexschool.orgid+''}" target="_blank"><img :src="indexschool.hotimg"></router-link></li>
				</ul>
			</div>
		</div>
    <!-- 列表 -->
    <div  class="container section-website mtl">
			<!--一行五列-->
			<section class="section-1-5">
				<div class="section-name">
					<h6>投智人</h6>
					<ul>
						<li v-for='(indextrade,index) in tradedata'><a @click='clickTrade(index)'>{{indextrade.name}}</a></li>
					</ul>
					<a class="more" @click='allTrade()'>全部信息 <i class="fa fa-angle-double-right"></i></a>
				</div>
				<div class="row">
					<div class="col-md-1-5" v-for="wisemannum in 5">
						<router-link :to="{path:'/sapiensdetailed/'+wisemanaccountid[wisemannum-1]+''}" target="_blank" >
							<div class="section-img">
								<img :src="wisemanUrl[wisemannum-1]">
							</div>
							<div class="section-info">
								<h4 class="wb50 fl">{{wisemanusername[wisemannum-1]}}</h4>
								<span class="wb50 fr text-right mt10">{{wisemanpostname[wisemannum-1]}}</span>
								<p>{{wisemancontext[wisemannum-1]}}</p>
							</div>
						</router-link>
					</div>
				</div>
			</section>

			<!--一行三列-->
			<section class="section-1-3">
				<div class="section-name">
					<h6>热门项目</h6>
					<ul>
						<li v-for='(indexstage,index) in stagedata'><a @click='clickStage(index)'>{{indexstage.processname}}</a></li>
					</ul>
					<a class="more" @click='allStage()'>全部信息 <i class="fa fa-angle-double-right"></i></a>
				</div>
				<div class="row">
					<div class="col-md-4" v-for='indexhot in 3'>
						<router-link target="_blank" :to="{path:'/hotprojectdetailed/'+hotprojectid[indexhot-1]+''}">
							<div class="section-logo">
								<img :src="hotimg[indexhot-1]">
							</div>
							<div class="section-title">
								<h4>{{hotname[indexhot-1]}}</h4>
								<p>{{hotfrominfo[indexhot-1]}} {{hotorgname[indexhot-1]}}</p>
								<ul class="tags">
									<li v-for='hottech in hottechnology[indexhot-1]'>
										<!-- <i v-for='hottech2 in hottech.technologylist'>{{hottech2.technologyname}}</i> -->
										{{hottech.technologyname}}
									</li>
								</ul>
							</div>
						</router-link>
					</div>
          </div>
          <div class="row">
          <div class="col-md-4" v-for='indexhot in 3'>
            <router-link target="_blank" :to="{path:'/hotprojectdetailed/'+hotprojectid[indexhot+2]+''}">
              <div class="section-logo">
                <img :src="hotimg[indexhot+2]">
              </div>
              <div class="section-title">
                <h4>{{hotname[indexhot+2]}}</h4>
                <p>{{hotfrominfo[indexhot+2]}} {{hotorgname[indexhot+2]}}</p>
                <ul class="tags">
                  <li v-for='hottech in hottechnology[indexhot+2]'>
                    <!-- <i v-for='hottech2 in hottech.technologylist'>{{hottech2.technologyname}}</i> -->
                    {{hottech.technologyname}}
                  </li>
                </ul>
              </div>
            </router-link>
          </div>


				</div>
			</section>
		</div>
    <!-- 待续 -->
    		<div class="footer-nav">
			<div class="container">

				<ul>
					<h4>关于我们</h4>
					<li><a target="_blank" href="/about/about_pc.html">了解投智圈</a></li>
					<li><a target="_blank" href="/about/contact_pc.html">联系我们</a></li>
				</ul>
				<ul>
					<h4>在线帮助</h4>
					<li><a target="_blank" href="/help/process.html">校赛举办流程</a></li>
					<li><a target="_blank" href="/problem/problem.html">常见问题</a></li>
				</ul>
				<ul>
					<h4>操作说明</h4>
					<li><a target="_blank" href="/help/admin.html">校管理员操作</a></li>
					<li><a target="_blank" href="/help/teacher.html">导师管理员操作</a></li>
					<li><a target="_blank" href="/help/student.html">项目报名操作</a></li>
				</ul>

				<div class="fr">
					<img src="../assets/qrcode.jpg">
					<span>微信公众号</span>
				</div>
				<div class="fr">
					<img src="../assets/downloadApp.png">
					<span>APP下载</span>
				</div>

			</div>
		</div>
  </div>
</template>

<script>
//引用bootstrap
import '../login-jq/bootstrap.css';
import '../login-jq/flat-ui.css';
import '../login-jq/font-awesome.min.css';
let Base64 = require('js-base64').Base64;
import hotimg0 from '../assets/hbnd.png';
import hotimg1 from '../assets/nmkd.png';
import hotimg2 from '../assets/lzlg.png';
import hotimg3 from '../assets/hzxy.png';
import hotimg4 from '../assets/ynjg.png';

export default {
  data () {
    return {
        bannerurllist: '',
        orglist: '',
        orgAlldata: '',
        wisemanUrl:'',
        wisemanusername:'',
        wisemanpostname:'',
        wisemancontext:'',
        wisemanaccountid:'',
				stagedata:'',
				tradedata:'',
				indexHotproject:'',
				hotimg :'',
				hotname :'',
				hotfrominfo :'',
				hotfromcity :'',
				hotorgname :'',
				hottechnology :'',
				hotprojectid :'',
				//
				hotSchool : [
					{ hotimg: hotimg0 , orgid: Base64.encode('1607')},
					{ hotimg: hotimg1 , orgid: Base64.encode('1766')},
					{ hotimg: hotimg2 , orgid: Base64.encode('3538')},
					{ hotimg: hotimg3 , orgid: Base64.encode('3674')},
					{ hotimg: hotimg4 , orgid: Base64.encode('3418')},
				]
    }
  },
  methods:{
    //轮播图列表
    getBannerUrl(){
      this.$http.post(this.$store.state.url+'pc/system/getBannerImageUrlList',{},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
				this.bannerurllist = response.data.data;
       })
    },
    //合作院校
    getOrgSchoolList(){
      this.$http.post(this.$store.state.url+'pc/system/getOrgList',{provinceid:0,cityid:0,orgname:'',page:1},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
        this.orglist = [];
        for(let i in response.data.data.orglist){
          this.orglist.push(response.data.data.orglist[i].orglogo);
        };
        this.orgAlldata = response.data.data.totalresult
       })
    },
    //投智人
    getWisemanList(){
      this.$http.post(this.$store.state.url+'pc/person/getBigVWisemanList',{},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
        this.wisemanUrl = [];
        this.wisemanusername = [];
        this.wisemanpostname = [];
        this.wisemancontext = [];
        this.wisemanaccountid = [];
        for(let i in response.data.data){
          this.wisemanUrl.push(response.data.data[i].bigvimage);
          this.wisemanusername.push(response.data.data[i].username);
          this.wisemanpostname.push(response.data.data[i].postname);
          this.wisemancontext.push(response.data.data[i].context);
          this.wisemanaccountid.push(Base64.encode(response.data.data[i].accountid));
        };
       })
    },
    //获取阶段
    getStagemethods(){
      this.$store.dispatch('getStage');
			this.stagedata = this.$store.state.getStageData;
		},
		//获取行业
    getTrademethods(){
      this.$store.dispatch('getTrade');
      this.tradedata = this.$store.state.getTradeData;
		},
		clickTrade(index){
			// to="{path:'/sapiens', query: { num: indextrade.tradeid} }"
			// this.$router.push({path:'/sapiens', query:{ trade: Base64.encode(this.tradedata[index].tradeid)}})
			// /'+tradeid+'/'+tradename+'
			let tradeid = Base64.encode(this.tradedata[index].tradeid);
			let tradename = Base64.encode(this.tradedata[index].name);
			this.$store.commit('indextosapienstradid', tradeid);
			this.$store.commit('indextosapienstradname', tradename);
			this.$router.push({path:'/sapiens'})
		},
		allTrade(){
			this.$store.commit('indextosapienstradid', '');
			this.$store.commit('indextosapienstradname', '');
			this.$router.push({path:'/sapiens'})
		},
		clickStage(index){
			let stageid = Base64.encode(this.stagedata[index].processid);
			let stagename = Base64.encode(this.stagedata[index].processname);
			this.$store.commit('indextohotprojectstageid', stageid);
			this.$store.commit('indextohotprojectstagename', stagename);
			this.$router.push({path:'/hotproject'})
		},
		allStage(){
			this.$store.commit('indextohotprojectstageid', '');
			this.$store.commit('indextohotprojectstagename', '');
			this.$router.push({path:'/hotproject'})
		},
		//获取热门项目
		gethotprojectInindex(){
       this.$http.post(this.$store.state.url+'pc/project/getHotProjectList',{tradeid:0,processid:0,projectname:''},{emulateJSON: true}).then((response) => {this.info = JSON.stringify(response.data, null, 4);
				this.indexHotproject = response.data.data.projectlist;
				this.hotimg = [];
        this.hotname = [];
        this.hotfrominfo = [];
        this.hotfromcity = [];
				this.hotorgname = [];
				this.hottechnology = [];
				this.hotprojectid = [];
         for(let i in this.indexHotproject){
					this.hotprojectid.push(Base64.encode( this.indexHotproject[i].projectid ));
					this.hotimg.push(this.indexHotproject[i].logourl);
					this.hotname.push(this.indexHotproject[i].name);
					this.hotfrominfo.push(this.indexHotproject[i].provincename);
					this.hotfromcity.push(this.indexHotproject[i].cityname);
					this.hotorgname.push(this.indexHotproject[i].orgname);
					this.hottechnology.push(this.indexHotproject[i].technologylist);

					// for(let j in this.indexHotproject[i].technologylist){
					// }
				 }
        //  console.log(this.hottechnology);

        })
		},
  },
  mounted(){

    this.getBannerUrl();

    this.getOrgSchoolList();

    this.getWisemanList();

		this.getStagemethods();

		this.getTrademethods();

		this.gethotprojectInindex();

		var windowWidth = window.screen.width;
		var bannerButtonLeft = windowWidth - 1140;
		$('.el-carousel__arrow--left').css("left",bannerButtonLeft/2+'px');
		$('.el-carousel__arrow--right').css("right",bannerButtonLeft/2+'px');
  },
}
</script>

<style lang="less">
  .el-carousel{
    // width: 1170px;
    width: 100%;
    margin: 0 auto;
    height:100% !important;
  }
  .el-carousel__item{
    height:320px !important;
  }
  .el-carousel__container{
    // width: 1170px;
    // margin: 0 auto;
    img{
      width: 1140px;
      margin: 0 auto;
      display: block;
    }
	}
//bootstrap
  .school-index-listul{
    margin-bottom:0;
	}
	.section-name{
		a{
			cursor:pointer;
		}
	}
</style>
