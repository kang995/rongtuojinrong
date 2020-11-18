<!--我的~~安全设置~交易密码管理~重置交易密码--->
<template>
  <div class="mineContents">
    <!-- 头部 -->
    <!-- <mt-header title="重置交易密码">
      <router-link to="/trade_mm" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox title="重置交易密码"></headerBox>
    <div class="mineContent-czendmm ">
   
    <!-- 使用iframe跳转web页 -->
     <div class="jlglBox">
      <iframe class="iframeBox" :src="sign" frameborder="0" ></iframe>
      <div class="mtop"></div>
     </div>
   
      <!-- <div v-html="gonglue"> </div> -->

    <!-- 自己写的html结构 勿删-->
      <!-- <van-loading size="24px" vertical>加载中...</van-loading> -->
    <div class="disNo">
        <img src="@/assets/hsbank.png" />
      <div class="clear libor">
        <span class="left c3">存管子账户</span>
        <span class="right">9930014210297112236</span>
      </div>

      <div class="clear libor mtop">
        <span class="left c3 c_blue">流水号</span>
        <br />
        <span class="left">2019082116453635009</span>
      </div>

      <div class="clear libors mtop">
        <span class="left c3">绑定银行卡</span>
        <br />
        <input type="text" placeholder="请输入绑定银行卡" />
      </div>

      <div class="clear libors mtop">
        <span class="left c3">姓名</span>
        <br />
        <input type="text" placeholder="请输入姓名" />
      </div>
      <div class="clear libors">
        <span class="left c3">证件号码</span>
        <br />
        <input type="text" placeholder="请输入开户证件号码" />
      </div>

      <div class="clear libors">
        <span class="left c3">手机号码</span>
        <br />
        <input type="text" placeholder="请输入存管系统手机号" />
      </div>

      <div class="yzm">
        <span>设置密码</span>
        <input type="password" placeholder="请输入交易密码" />
      </div>
      <div class="yzm">
        <span>确认密码</span>
        <input type="password" placeholder="请输入交易密码" />
      </div>
      <div class="yzm">
        <span>验证码</span>
        <input type="text" placeholder="请输入验证码" />
        <button>获取验证码</button>
      </div>

      <div class="photoend">
        <button>确定</button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
/* import Vue from 'vue';
import { Loading } from 'vant';

Vue.use(Loading); */
export default {
  data(){
    return{
      sign:this.$sign+'/rongtuojinrong/userCenter/securitySetting/resetTradePassword.json?user_id='+this.$store.state.login.token.user_id+'&defidenshuxing='+this.$store.state.invite.defidenshuxing+'&FlagChnl='+'3'
    }
  },
  // created(){
  //      let invite = this.$store.state.invite;
  //      this.$post('/rongtuojinrong/userCenter/securitySetting/resetTradePassword.json',{
  //      defidenshuxing: invite.defidenshuxing,
  //      }).then(res=>{
  //         this.gonglue = res.data;
  //           console.log(this.gonglue ); 
  //      })
  //     .catch(err=>{

  //       })
  // }  
}
</script>

<style lang="scss">
  .mineContents {
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #f9f9f9;
    position: absolute;
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
  .c_blue {
    color: #0099e9;
  }
  .disNo{display: none;}


    .mint-header {
      background: #fff;
      height: 0.5rem;
      border-bottom: 1px solid rgb(229, 233, 242);
      position: fixed;
      top: 0;
      right: 0;
      left: 0;

      z-index: 1;
      .mint-popup {
        border-radius: 0.1rem;
      }

      .mint-button-icon {
        color: #333333;
      }
      .mint-header-title {
        font-size: 0.15rem;
        color: #333333;
      }
      .mint-button-text {
        display: block;
        color: #333333;
        font-weight: normal;
        margin: 0;
      }
    }

    .mineContent-czendmm {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin: 0.5rem auto;
      .libor {
        height: auto;
        background: #fff;
        padding: 0.15rem 0.1rem;
        border-bottom: 1px solid #e5e9e5;
        overflow: hidden;
        input {
          border-top: 1px solid #e5e9e5;
          width: 100%;
          width: 100%;
          height: 0.4rem;
          border: none;
          margin-top: 0.1rem;
          border-top: 1px solid #e5e9e5;
        }
      }
      .libors {
        height: auto;
        background: #fff;
        padding: 0.05rem 0.1rem;
        overflow: hidden;
        span {
          color: #333;
        }
        input {
          height: 0.4rem;
          margin-top: 0.05rem;
          width: 100%;
          border: none;
          border-top: 1px solid #e5e9e5;
          border-bottom: 1px solid #e5e9e5;
        }
      }

      img {
        width: 1.44rem;
        height: 0.35rem;
        margin: 0.15rem auto;
      }
      .yzm {
        width: 100%;
        height: 0.44rem;
        background: #fff;
        padding: 0 0.1rem;
        color: #333;
        line-height: 0.45rem;
        border-bottom: 1px solid #e5e9e5;
        span {
          width: 20%;
          display: inline-block;
          color: #333;
        }
        input {
          border: none;
          width: 50%;
          line-height: 0.4rem;
        }
        button {
          width: 22%;
          color: #005ad4;
          text-align: center;
          border: none;
          float: right;
          font-size: 0.12rem;
          display: block;
          line-height: 0.44rem;
          border-left: 1px solid #e5e9e5;
          background: none;
        }
      }
      .photoend {
        width: 100%;
        height: auto;
        overflow: hidden;
        padding: 0.2rem 0.1rem;
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
    }
    .jlglBox{
            width:100%;
            height:100%;
            position: absolute;
        .iframeBox{
            width:100%;
            height:100%;
        }
    } 
  }

</style>
