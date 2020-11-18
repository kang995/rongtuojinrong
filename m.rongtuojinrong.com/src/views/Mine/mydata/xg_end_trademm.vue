<!--我的~~安全设置~交易密码管理~修改交易密码 最后一步--->
<template>
  <div class="mineContents2">
    <!-- 头部 -->
  <!--   <mt-header title="修改交易密码">
      <router-link to="/xg_trademm" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox title="修改交易密码"></headerBox>
    <!-- 使用iframe跳转web页 -->
     <div class="jlglBox">
      <iframe class="iframeBox" :src="sign" frameborder="0" ></iframe>
      <div class="mtop"></div>
     </div>


   <!--   自写的页面结构 勿删 -->
    <div class="mineContent-endmm displayNO">
      <img src="@/assets/hsbank.png" />

      <div class="clear libor">
        <span class="left c3">姓名</span>
        <span class="right">李牧子</span>
      </div>
      <div class="clear libor">
        <span class="left c3">存管子账户</span>
        <span class="right">9930014210297112236</span>
      </div>

      <div class="yzm mtop">
        <span>原始密码</span>
        <input type="password" placeholder="请输入原始密码" />
      </div>
      <div class="yzm">
        <span>设置密码</span>
        <input type="password" placeholder="请输入交易密码" />
      </div>
      <div class="yzm">
        <span>确认密码</span>
        <input type="password" placeholder="请输入交易密码" />
      </div>

      <div class="photoend">
        <button>确定</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      sign:this.$sign+'/rongtuojinrong/userCenter/securitySetting/resetTradePassword.json?user_id='+this.$store.state.login.token.user_id+'&defidenshuxing='+this.$store.state.invite.defidenshuxing+'&name='+this.$store.state.invite.invite.realname+'&IDNumber='+this.$store.state.invite.IDNumber
    }
  }
}
</script>
<style lang="scss">
  .mineContents2 {
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
  .displayNO{display: none;}
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

    .mineContent-endmm {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin: 0.5rem auto;
      .libor {
        height: 0.45rem;
        background: #fff;
        padding: 0.1rem;
        border-bottom: 1px solid #e5e9e5;
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
          width: 20%;
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
</style>
