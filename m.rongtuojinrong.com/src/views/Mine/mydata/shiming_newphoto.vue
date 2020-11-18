<!--我的~~安全设置~未实名认证后~~修改手机号--->
<template>
  <div class="mineContents">
    <!-- 头部 -->
    <headerBox v-if="this.$store.state.login.token.is_identify==1" title="更换绑定手机号"></headerBox>
    <headerBox v-else title="修改手机号"></headerBox>

    <div class="mineContent-newphoto">
      <div v-if="this.$store.state.login.token.is_identify==0" class="mineContent-newphoto-1">您现在使用的手机号码是：<span>{{this.$store.state.invite.invite.mobile}}</span></div>
      <input type="text" placeholder="请输入新手机号" class="addphoto" v-model="moval"/>
      <div class="yzm">
        <input type="text" placeholder="请输入验证码" v-model="yzval"/>
        <button v-if="this.$store.state.login.token.is_identify==1" @click="clickYz">获取验证码</button>
        <button v-else @click="clickYz">点击获取</button>
      </div>
      <div class="photoends">
        <button v-if="this.$store.state.login.token.is_identify==1" @click="comRev">绑定新手机号</button>
        <button v-else @click="comRev">完成修改</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
        moval:'',
        yzval:''
      }
    },
    methods:{
      clickYz(){
        this.$post('/rongtuojinrong/userCenter/securitySetting/newMobileCode.json',{
          defidenshuxing: this.$store.state.invite.defidenshuxing,
          mobile: this.moval,
          FlagChnl:3
        })
        .then(res=>{
            this.$toast(res.data.msg);            
        })
        .catch(err=>{
            this.$toast("发送失败，请重新点击获取");
        })
      },
      comRev(){
        this.$post('/rongtuojinrong/userCenter/securitySetting/bindNewMobile.json',{
         // Code: this.yzval,  //接口修改，无参数
          Mophone: this.moval,
          FlagChnl:3
        })
        .then(res=>{
            this.$toast(res.data.msg);                         
        })
        .catch(err=>{
            this.$toast("修改失败，请重新修改");
        })        
      }
    }
}
</script>

<style lang="scss">
  .mineContents {
    width: 100%;
    height: 100%;
    font-size: 14px;
    position: absolute;
    background: #f9f9f9;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .mtop {
    margin-top: 0.1rem;
  }
  .c3 {
    color: #333;
  }
  .clear {
    clear: both;
  }
  .cju {
    color: #ff6632;
  }
    .mineContent-newphoto {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin: 0.5rem auto;
      .mineContent-newphoto-1{
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        span{
          font-size: 0.15rem;
          color: #fe6633;
        }
      }
      .addphoto {
        width: 100%;
        height: 0.45rem;
        background: #fff;
        padding: 0 0.1rem;
        border: none;
        border-bottom: 1px solid #e5e9f2;
      }
      .yzm {
        width: 100%;
        height: 0.45rem;
        background: #fff;
        padding: 0 0.1rem;
        color: #333;
        line-height: 0.44rem;
        border-bottom: 1px solid #e5e9f2;
        input {
          border: none;
          width: 60%;
        }
        button {
          width: 25%;
          color: #fff;
          text-align: center;
          border-radius: 0.5rem;
          background: #0099e9;
          border: none;
          float: right;
          font-size: 0.12rem;
          display: block;
          margin-top: 0.1rem;
          line-height: 0.2rem;
        }
      }
      .photoends {
        width: 100%;
        height: auto;
        overflow: hidden;
        padding: 0.3rem 0.1rem;
        position:fixed;
        bottom:0;
        left:0;
        button {
          width: 100%;
          height: 0.47rem;
          background: #005ad4;
          color: #fff;
          line-height: 0.47rem;
          text-align: center;
          border: none;
          border-radius: 0.04rem;
        }
      }
      .tingy {
        width: 100%;
        margin: auto;
        text-align: center; 
        height: auto;
        overflow: hidden;
        color: #333;
        position: relative;
        
        i {
          background: url(../../../assets/sm_06.jpg) no-repeat;
          display: inline-block;
          width: 0.16rem;
          height: 0.17rem;
          background-size: 100%;
          margin: 0.02rem auto;
    position: absolute;
    margin-left:0.5rem;
        } 
        a {
          color: #0099e9;
          font-size: 0.14rem;
        }
      }
    }
  }
</style>
