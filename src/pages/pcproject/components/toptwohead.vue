<template lang="html">
  <div class="user-home">
    <div class="container">
      <div class="user-information">
          <div class="userphoto">
            <img src="../../assets/nophoto.png" alt="">
          </div>
          <div class="usercontent">
            <div class="username">
              <span>阿不来提阿不都热西提</span>
              <button type="button" name="button">未认证<i></i></button>
            </div>
            <p>河北 - 保定</p>
            <p>河北农业大学 - 动物医学院/中兽医学院（创新创业课程成果）</p>
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
</template>

<script>
export default {
}
</script>

<style lang="less">
.user-home{
  width: 100%;
  background: #1abc9c;
  .container{
    width: 1170px;
    margin:0 auto;
    .user-information{
      width: 100%;
      margin-bottom: 40px;
      margin-top: 40px;
      display: inline-flex;
      position: relative;
      .userphoto{
        width: 100px;
        height: 100px;
        margin-right: 30px;
        background-color: #ffffff;
        border-radius: 50px;
        border: 3px solid rgba(255, 255, 255, .2);
        img{
          width: 100%;
          height: 100%;
        }
      }
      .usercontent{
        .username{
          font-size: 28px;
          color: #fff;
          margin-bottom: 15px;
          span{
            float: left;
            max-width: 300px;
            vertical-align: middle;
            display: block;
          }
          button{
            padding: 4px 9px;
            font-size: 12px;
            line-height: 1.083;
            border-radius: 3px;
            color: #ffffff;
            background-color: #bdc3c7;
            border: none;
            outline: none;
            margin-left: 20px;
            cursor: pointer;
          }
        }
        p{
          font-size: 16px;
          height: 28px;
          color:#fff;
        }
      }
      .usernew-right{
        position: absolute;
        right:0;
        font-size: 16px;
        .newright{
          margin-top:20px;
          color:#fff;
        }
      }
    }
  }
}
</style>
