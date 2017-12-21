<template lang="html">
  <div class="">
    <div class="scoreoverpage">
      <div id='mainscore' style="width: 600px;height:400px;margin:0 auto;">
      </div>
      <div class="scoreZf">
        <h3>{{scoreZf}}分</h3>
      </div>
    </div>
    <div class="saylist" v-for='scorelists in scorelist'>
      <div class="pwNew">
        <!-- <img :src="scorelists.userimage" alt=""> -->
        <img :src="scorelists.userimage" alt="">
        <span>{{scorelists.username}}</span>
        <span>
          {{scorelists.raterscore}}
        </span>
        <div class="pwTwoC">
          <span>{{scorelists.orglist[0].collegename}}</span>
          <span>{{scorelists.orglist[0].context}}</span>
        </div>
      </div>
      <div class="Comment">
        <h5>评语:</h5>
        {{scorelists.advise}}
      </div>
    </div>
  </div>

</template>

<script>
let Base64 = require('js-base64').Base64;
import echarts from 'echarts';
export default {
  data(){
    return{
      projectid:this.$route.params.projectid,
      token:Base64.decode(localStorage.getItem('token')),
      projectgameid:Base64.decode(this.$route.params.projectgameid),
      accountid:Base64.decode(localStorage.getItem('accountid')),
      //
      scoreData:'',
      scoreZf:'',
      scorelist:[],
      showraterscore:0,
    }
  },
  mounted(){
    this.getScoreAndAdvise();
  },
  beforeUpdate(){
  		this.getGameShowScore();
      if(this.$store.state.aftersure != ''){
        this.$store.state.aftersure='';
        this.getScoreAndAdvise();
      };
    },
  methods:{
  	
  	//获取是否显示其他评委成绩
    getGameShowScore(){
      this.$http.post(this.$store.state.url+'pc/project/game/getProjectGameConfigKeyValue', {'projectgameid':this.projectgameid,'key':'scoreshow'},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        // this.resourcelisted = response.data.data;  如果是1就是小数点     0就是 整数
        console.log(response.data.data.value);
        if(response.data.data.value == 1){
          this.showraterscore=1;
        }
        if(response.data.data.value == 0){
          this.showraterscore = 0;
        }
        console.log(this.showraterscore)
      })
    },
    //获得某个赛事，某个项目，所有评委的给的分数以及评语
    getScoreAndAdvise(){
      this.$http.post(this.$store.state.url+'pc/project/game/getProjectAllRaterScoreAndAdvise', {'projectgameid':this.projectgameid,'projectid':this.projectid,'flag':1},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
      
      console.log(this.info);
      
        let arr=[];
        this.scoreChartData = response.data.data.currentraterscorelist.criteriascorelist;
        if(this.scoreChartData == ''){
          arr.push({'value':'100','name':'未评'})
        }else{
          for(let i in this.scoreChartData){
            arr.push({'value':this.scoreChartData[i].score,'name':this.scoreChartData[i].criterianame})
          }
        };
        this.scoreData = arr;
        
        //var arrraterscoreList=[];
        this.scorelist=[];
        
          this.scoreZf = response.data.data.currentraterscorelist.raterscore;
          for(let i in response.data.data.raterscorelist){
            if(response.data.data.raterscorelist[i].orglist[0] == undefined){
              response.data.data.raterscorelist[i].orglist[0] = '';
            }
            console.log(response.data.data);
            if(response.data.data.showraterscore==0)
            {
            	if(this.accountid==response.data.data.raterscorelist[i].accountid)
            	{
            		this.scorelist.push(response.data.data.raterscorelist[i]);
            	}
            }
            else
            	this.scorelist.push(response.data.data.raterscorelist[i]);
          }
          
          
          //this.scorelist = response.data.data.raterscorelist;
          //
          var myChart = echarts.init(document.getElementById('mainscore'));
          var option = {
            color: ['#46d185','#f2c955', '#0092ff', '#ec5845'],
            tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
        // legend: {
        //     orient: 'vertical',
        //     x: 'left',
        //     data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        // },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'得分',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                data:this.scoreData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
          };
          myChart.setOption(option);
          //--
        // })
      })
    }
  }
}
</script>

<style lang="less">
.scoreoverpage{
  position: relative;
  width: 600px;
  height: 400px;
  margin: 0 auto;
  .scoreZf{
    position: absolute;
    z-index: 999;
    top: 150px;
    left: 250px;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 25px;
    h3{
      color:#000;
    }
  }
}
.saylist{
  border-bottom: 1px solid #ccc;
  margin: 30px 0;
  padding-bottom: 20px;
}
.pwNew{
    display: inline-block;
    width: 100%;
    img{
      width: 60px;
      height: 60px;
      border-radius: 10px;
      vertical-align: middle;
      border: 1px solid #ccc;
    }
    span{
      font-size: 20px;
      color: #666;
      margin:0 10px;
    }
    .pwTwoC{
      display: block;
      margin: 20px;
      span{
        font-size: 16px;
        color: #666;
        margin:0;
        margin-right: 20px;
      }
    }
}
.Comment{
  font-size:15px;
}
</style>
