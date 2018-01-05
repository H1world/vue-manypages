<template>
  <div class="main">
    <div class="user-home">
      <div class="container">
        <div class="user-information">
            <div class="userphoto">
              <img :src="user.userimage" alt="">
              <span class='vip' :class="{'vip2':ifvip2,'vip3':ifvip3}"></span>
            </div>
            <div class="usercontent">
              <div class="username">
                <span>{{user.username}}</span>
                <button type="button" name="button" v-if='ifnovip'>未认证<i></i></button>
              </div>
              <div>
                <p>{{provincename}} - {{cityname}}</p>
                <p>{{orgname}} - {{collegename}}</p>
              </div>
            </div>
          <div class="usernew-right">
            <div class="newright">
              <span>总赛事数量：{{tongj.totalgamenumber}}</span>
              <span>已评赛事：{{tongj.pinggamenumber}}</span>
              <span>未评赛事：{{tongj.nopinggamenumber}}</span>
            </div>
            <div class="newright">
              <span>总项目数量：{{tongj.totalprojectnumber}}</span>
              <span>已评项目：{{tongj.pingprojectnumber}}</span>
              <span>未评项目：{{tongj.nopingprojectnumber}}</span>
              <span>暂存项目：{{tongj.saveprojectnumber}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                token:Base64.decode(localStorage.getItem('token')),
                accountid:Base64.decode(localStorage.getItem('accountid')),
                user:'',//评委个人信息（用于头部）
                tongj:'',//评委个人评审的统计信息
                getyso:'',//年代、状态以及组织列表
                ProjectGameList:'',
                provincename: '',
                cityname: '',
                orgname: '',
                collegename: '',
                ifvip2: false,
                ifvip3: false,
                ifnovip: false,
            }
        },
        methods:{
                //获取用户头像
                getUserInformation(){
                    this.$http.post(this.$store.state.url+'pc/person/getMyBrieflyInfo', {accountid :this.accountid},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
                        this.info = JSON.stringify(response.data, null, 4);
                        this.user = response.data.data;
                        if(this.user.layer == 1){
                            this.ifnovip = true;
                        };
                        if(this.user.layer == 2){
                            this.ifvip2 = true;
                        };
                        if(this.user.layer == 3){
                            this.ifvip3 = true;
                        };
                        this.provincename = response.data.data.orglist[0].provincename;
                        this.cityname = response.data.data.orglist[0].cityname;
                        this.orgname = response.data.data.orglist[0].orgname;
                        this.collegename = response.data.data.orglist[0].collegename;
                    })
                },
                //获取数量
                getUserTj(){
                    this.$http.post(this.$store.state.url+'pc/project/game/getRaterGameTotalInfoByRaterId', {},  {emulateJSON: true,headers:{'xytoken':this.token}}).then((response) => {    
                    this.info = JSON.stringify(response.data, null, 4);
                        this.tongj = response.data.data;
                    })
                },
        },
        mounted(){
            this.getUserInformation();
            this.getUserTj();
        }
    }
</script>