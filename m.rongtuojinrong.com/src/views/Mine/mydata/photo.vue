<!--我的~~安全设置~实名认证~未认证~更换手机号--->
<template>
  <div class="mineContents">
    <!-- 头部 -->
    <!-- <mt-header title="修改手机号">
      <router-link to="/safe" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox title="修改手机号"></headerBox>

    <div class="mineContent-3">
      <p class="p1">
        您现在使用的手机号是：
        <span class="cju">15115123654</span>
      </p>

      <input type="text" placeholder="请输入新的手机号" class="addphoto" />
      <div class="yzm">
        验证码
        <input type="text" placeholder="请输入验证码" />
        <button>点击获取</button>
      </div>

      <div class="photoend">
        <button>完成修改</button>
      </div>
    </div>
  </div>
</template>

<script>
import headerBox from '../../../components/header'
export default {
    components:{
        headerBox
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

    .mineContent-3 {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin: 0.6rem auto;
      .p1 {
        text-align: center;
        padding: 0.15rem;
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
        line-height: 0.45rem;

        input {
          border: none;
          width: 50%;
          padding-left: 0.2rem;
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
          white-space:nowrap;
        }
      }
      .photoend {
        width: 100%;
        height: auto;
        overflow: hidden;
        position: fixed;
        left: 0;
        bottom: 0;
        padding:0.2rem 0.1rem;
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
</style>
