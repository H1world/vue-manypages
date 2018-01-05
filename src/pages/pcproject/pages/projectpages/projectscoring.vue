<template lang="html">
  <div class="">
    <div class="scoring-top">
        <el-progress type="circle" :percentage="demosum" :show-text='false' :stroke-width='10' status="success"></el-progress>
        <span><input v-model="demosum" readonly=true></input></span>
    </div>
    <div class="scoring-content" v-for='(scoring,index) in scoringlist.criterialist'>
      <div class="scoringltable">
        <i class="tabletitle">{{scoring.criterianame}}：(最高分为{{scoring.criteriascore}}分)</i>
        <div class="tabledaf">
          <p v-if='scoring.ifscoreno'><input type="text" v-model='scoring.issay' readonly></p>
          <p v-if='scoring.ifzzscoreno'><input type='text' v-model='scoring.issay' readonly></p>
          <el-input-number v-model="scoring.score" controls-position="right" @change="handleChange(index,$event)" :min="0" :step="scorrule" :max="scoring.criteriascore"></el-input-number>分
          <!-- <input type="number" v-model='cishi'> -->
          <!-- <input type="number" class='isscore' name="" value="" :min="0" :step="0.1" @keyup="handleChange(index)" v-model='scoring.score'> -->
        </div>
      </div>
      <div class="scoringtext">
        <el-collapse>
          <el-collapse-item title="评分规则">
            <div style="white-space: pre-wrap;word-wrap:break-word;">{{scoring.criteriacontext}}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="scoring-span">
      <i>标签</i>
      <span v-for='(spanscor,index) in scorspan' :class="{'spanselect': spanscor.select}" @click='selectspan(index)'>{{spanscor.name}}</span>
      <span class="addspantext el-icon-plus" @click='addSpan'>&nbsp</span>
    </div>
    <!-- 添加标签 -->
    <div class="addspan" v-if='addspan'>
      <span>添加标签</span>
      <input type="text" name="" placeholder="标签内容" v-model='maketext' class='inputspan_class'>
      <div class="spanbutton">
        <span @click='addSpanHide'>取消</span>
        <span @click='makesure'>确定</span>
      </div>
    </div>
    <!-- 添加评语 -->
    <div class="addsayyu">
      <i>评语</i>
      <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 10000}" placeholder="请输入内容" v-model="textareatext"></el-input>
    </div>
    <!-- 保存和暂存 -->
    <div class="bottom-btn">
      <el-button @click='clickZC' class='fl afterbutton buttoniso1'>暂存</el-button>
      <el-button type="primary" @click='clickTJ' class='fr afterbutton buttoniso2'>提交</el-button>
    </div>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
  data(){
    return{
      projectid:this.$route.params.projectid,
      token:Base64.decode(localStorage.getItem('token')),
      accountid:Base64.decode(localStorage.getItem('accountid')),
      projectgameid:Base64.decode(this.$route.params.projectgameid),
      //————————————————————————————————————————————————————————————
      scoringlist:'',
      scorrule:0,
      demosum:0,
      scorodd:'',
      scorspan:'',
      addspan:false,
      maketext:'',
      textareatext:'',
      //
      aftersubmission:'',
    }
  },
  beforeUpdate(){
      if(this.aftersubmission != ''){
        this.$store.commit('aftersure',this.aftersubmission)
      };
  },
  updated(){
    if(this.scorrule == 0.1){
      let sum = 0;
      for(let i in this.scoringlist.criterialist){
        if(this.scoringlist.criterialist[i].score == ''){
          this.scoringlist.criterialist[i].score = 0;
        }
        sum += parseFloat(this.scoringlist.criterialist[i].score);
      }
      this.demosum = Number(sum.toFixed(1));
    }
    if(this.scorrule == 1){
      let sum = 0;
      for(let i in this.scoringlist.criterialist){
        if(this.scoringlist.criterialist[i].score == ''){
          this.scoringlist.criterialist[i].score = 0;
        }
        sum += parseFloat(this.scoringlist.criterialist[i].score);
      }
      this.demosum = parseInt(sum);
    }
  //   //input输入框如果用鼠标滑轮或者点击上下按钮 会触发不了keyup时间 故做此处理  有些繁琐
  //   for(let i in this.scoringlist.criterialist){
  //     if(this.scoringlist.criterialist[i].score > this.scoringlist.criterialist[i].criteriascore){
  //       this.scoringlist.criterialist[i].issay = '最高分为'+this.scoringlist.criterialist[i].criteriascore+'分';
  //       this.scoringlist.criterialist[i].ifscoreno = true;
  //       this.scoringlist.criterialist[i].score = this.scoringlist.criterialist[i].criteriascore;
  //     }
  //   }
  },
  methods:{
    //获取评分规则
    getConfigKeyValue(){
      this.$http.post(this.$store.state.url+'pc/project/game/getProjectGameConfigKeyValue', {'projectgameid':this.projectgameid,'key':'averagerule'},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        // this.resourcelisted = response.data.data;  如果是1就是小数点     0就是 整数
        if(response.data.data.value == 1){
          this.scorrule = 0.1;
        }
        if(response.data.data.value == 0){
          this.scorrule = 1;
        }
      })
    },
      handleChange(index,value) {
        if(this.scorrule == 0.1){    //小数
          let reg = /^\d+(\.\d{1,1})?$/;
          this.scoringlist.criterialist[index].issay = '请把分数保留至一位小数';

            if(RegExp(reg).test(value) == false){
              this.scoringlist.criterialist[index].ifscoreno = true;
            }else{
              this.scoringlist.criterialist[index].ifscoreno = false;
            };
            //处理大于的情况
            // if(value > this.scoringlist.criterialist[index].criteriascore){
            //   this.scoringlist.criterialist[index].issay = '最高分为'+this.scoringlist.criterialist[index].criteriascore+'分';
            //   this.scoringlist.criterialist[index].ifscoreno = true;
            //   this.scoringlist.criterialist[index].score = this.scoringlist.criterialist[index].criteriascore;
            // }
        }
        if(this.scorrule == 1){   //整数
          let reg = /^-?\d+$/;
          this.scoringlist.criterialist[index].issay = '请把分数保留至整数';
          if(RegExp(reg).test(value) == false){
            this.scoringlist.criterialist[index].ifzzscoreno = true;
          }else{
            this.scoringlist.criterialist[index].ifzzscoreno = false;
          }
        }
      },
    //获得某个赛事，某个项目评分规则信息（同时，也用于得分与评语中的圆）
    getByRaterId(){
      this.$http.post(this.$store.state.url+'pc/project/game/getProjectScoreByRaterId', {'projectgameid':this.projectgameid,'projectid':this.projectid,'accountid':this.accountid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.scoringlist = response.data.data;
        for(let i in this.scoringlist.criterialist){
          this.scoringlist.criterialist[i]['ifscoreno']=false;
          this.scoringlist.criterialist[i]['ifzzscoreno']=false;
          this.scoringlist.criterialist[i]['issay']='';
        }

        this.demosum = this.scoringlist.totalscore;
      })
    },
    //获得某个赛事，某个项目标签
    getLabel(){
      this.$http.post(this.$store.state.url+'pc/project/getProjectLabel', {'projectid':this.projectid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
      this.info = JSON.stringify(response.data, null, 4);
        this.scorspan = response.data.data;
      })
    },
    //点击span并且传给后台思密达
    selectspan(index){
      if(this.scorspan[index].select == 0){
        this.$http.post(this.$store.state.url+'pc/project/addProjectLabel', {'projectid':this.projectid,'accountid':this.accountid,'labeltitle':this.scorspan[index].name},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
        this.info = JSON.stringify(response.data, null, 4);
          this.scorspan[index].select = 1;
        })
      }
      if(this.scorspan[index].select == 1){
        this.$http.post(this.$store.state.url+'pc/project/deleteProjectLabel', {'projectid':this.projectid,'accountid':this.accountid,'labeltitle':this.scorspan[index].name},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
        this.info = JSON.stringify(response.data, null, 4);
          this.scorspan[index].select = 0;
        })
      }
    },
    addSpan(){
      this.maketext = '';
      this.addspan = true;
    },
    addSpanHide(){
      this.maketext = '';
      this.addspan = false;
    },
    //提交标签
    makesure(){
      if(this.maketext == ''){
        this.$notify.error({
         title: '错误',
         message: '您输入的标签不能为空'
        });
      }
      else{
        this.$http.post(this.$store.state.url+'pc/project/addProjectLabel', {projectid:this.projectid,accountid:this.accountid,labeltitle:this.maketext},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {
        this.info = JSON.stringify(response.data, null, 4);
        if(response.data.result == 'success'){
          var person = {name:this.maketext, select:1};
          this.scorspan.push(person);
          // this.$toast('添加标签成功');
          this.addspan = false;
        }
        if(response.data.result == "unsuccess") {
              this.$notify({
              title: '警告',
              message: '该标签您已经评价过了',
              type: 'warning'
            });
        }
      })
      }
    },
    //获取评语
    getSayYu(){
      this.$http.post(this.$store.state.url+'pc/project/game/getProjectGameAdviseByRaterId', {projectid:this.projectid,projectgameid:this.projectgameid,accountid:this.accountid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {
      this.info = JSON.stringify(response.data, null, 4);
        this.textareatext = response.data.data.context;
        if(response.data.data.context == 'undefined'){
          this.textareatext = '';
        }
      })
    },
    //暂存功能和保存功能
    gameCache(status){
      //判断一下打分规不规则
      if(this.scorrule == 0.1){
        for(let i in this.scoringlist.criterialist){
          let reg = /^\d+(\.\d{1,1})?$/;
          if(RegExp(reg).test(this.scoringlist.criterialist[i].score) == false){
              this.$message({
                showClose: true,
                message: '请检查你的打分是否符合要求',
                type: 'warning'
              });
              return;
            }
        }
      };
      if(this.scorrule == 1){
        for(let i in this.scoringlist.criterialist){
          let reg = /^-?\d+$/;
          if(RegExp(reg).test(this.scoringlist.criterialist[i].score) == false){
              this.$message({
                showClose: true,
                message: '请检查你的打分是否符合要求',
                type: 'warning'
              });
              return;
            }
        }
      }

      let criteriascorelist = [];
      for(let i in this.scoringlist.criterialist) {
        let sysgamecriteriaid = this.scoringlist.criterialist[i].criteriaid;
        let score = this.scoringlist.criterialist[i].score;
        criteriascorelist.push({"sysgamecriteriaid":sysgamecriteriaid,"score":score});
      }
      let scorelist = JSON.stringify(criteriascorelist);
      this.$http.post(this.$store.state.url+'pc/project/game/addProjectGameScoreAndAdvise', {projectgameid:this.projectgameid,projectid:this.projectid,score:this.demosum,criteriascorelist:scorelist,advise:this.textareatext,raterid:this.accountid,status:status},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {
      this.info = JSON.stringify(response.data, null, 4);
      // console.log(response.data);
      if(response.data.result != "success"){
        if(status == 1){
          this.$message({
          showClose: true,
          message: response.data.describe,
          type: 'error'
          });
        };
        if(status == 2){
          this.$message({
          showClose: true,
          message: response.data.describe,
          type: 'error'
          });
        }
      };
        if(response.data.result == "success"){
          if(status == 1){
            this.$message({
              showClose: true,
              message: '暂存成功',
              type: 'success'
            });
            this.aftersubmission = 'isaftertow';
            let t = setTimeout(() => {
              this.aftersubmission = '';
            }, 10);
          };
          if(status == 2){
            this.$message({
              showClose: true,
              message: '提交成功',
              type: 'success'
            });
            this.aftersubmission = 'isafter';
            let t = setTimeout(() => {
              this.aftersubmission = '';
            }, 10);
          };
        }
      })
    },
    //暂存
    clickZC(){
      let status = 1;
      this.gameCache(status);
    },
    //提交
    clickTJ(){
      let status = 2;
      this.gameCache(status);
    }
  },
  mounted(){
    this.getConfigKeyValue();
    this.getByRaterId();
    this.getLabel();
    this.getSayYu();
  }
}
</script>

<style lang="less">
.el-progress-circle__path{
  stroke: #1abc9c;
}
.scoring-top{
  position: relative;
  text-align: center;
  margin: 20px 0;
  span{
    font-size: 30px;
    position: absolute;
    left: 50%;
    width: 980px;
    margin-left: -490px;
    text-align: center;
    height: 100%;
    line-height: 126px;
    input{
      border: none;
      outline: none;
      font-size: 27px;
      text-align: center;
      line-height: 126px;
      background: transparent;
    }
  }
}
.scoring-content{
  border-bottom: 1px solid #000;
  padding:20px 0 10px 0;
  .scoringltable{
    display: inline-block;
    width: 100%;
    .tabletitle{
      display:inline-block;
      font-style:normal;
      width: 100%;
    }
  }
}
.tabledaf{
  float:right;
  p{
    display: inline-block;
    input{
      outline: none;
      border: none;
      padding-right: 30px;
      color: #b00;
      width: 260px;
      text-align: right;
    }
  }
  .isscore{
    height: 30px;
    line-height: 30px;
    outline: none;
    border: 1px solid #1abc9c;
    width: 200px;
  }
}
.el-input-number {
    display: inline-block;
    width: 180px;
    position: relative;
    line-height: normal;
    margin: 0 10px 10px 20px;
  }
  .el-collapse{
    border:none;
    .el-collapse-item__header{
          text-align: right;
          border-bottom: none;
    }
    .el-collapse-item__wrap{
        background-color:#fff;
        border-bottom:none;
    }
  }
  .scoring-span, .addsayyu{
    i{
      font-style: normal;
      display: block;
      margin: 30px 0 15px;
    }
  }
.scoring-span {
  span {
    padding: 5px 10px;
    display: inline-block;
    border: 1px solid #fff;
    margin: 5px 20px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    background: #dcdcdc;
  }
  .spanselect{
    border: 1px solid #fff;
    color:#fff;
    background: #1abc9c;
  }
  .addspantext{
  }
  }
  .afterbutton{
    width: 150px;
    height: 50px;
    margin-top: 20px;
  }
  .buttoniso1{
    background-color: #7f8c8d;
    color:#fff;
  }
  .buttoniso1:hover{
    color:#fff;
    border-color: #7f8c8d;
  }
  .addspan{
    span{
      font-size: 14px;
      font-weight: 600;
      margin: 10px 0;
      display: block;
    }
    .spanbutton{
      span{
        border-radius: 20px;
        background: #1abc9c;
        padding: 5px 10px;
        display: inline-block;
        margin: 10px 10px 0 0;
        border: none;
        color:#fff;
        cursor: pointer;
      }
      span:first-child{
        background: #7f8c8d
      }
    }
    .inputspan_class{
      outline: none;
      display: block;
      width: 300px;
      height: 30px;
      border: 1px solid #1abc9c;
      padding-left: 10px;
    }
  }

</style>
