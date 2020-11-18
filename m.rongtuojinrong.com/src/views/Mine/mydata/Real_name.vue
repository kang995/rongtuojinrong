<!--我的~安全设置~实名认证--->
<template>
  <div class="mineContents">
    <!-- 头部 -->
    <!-- <mt-header title="安全设置">
      <router-link to="/safe" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>-->
    <headerBox title="安全设置"></headerBox>
    <!--页面判断2中状态1已实名、2未实名 -->
    <div class="mineContent-3">
      <!--  状态1已认证 -->
      <!--  <div class="bankbox">
         <div><span class="left">实名认证</span> <span class="right fz12">已认证</span></div>
      </div>-->

      <!--  状态2未认证 -->
      <div class="bankbox">
        <router-link to="/realname1" tag="div" class="clear">
          <span class="left">实名认证</span>
          <span class="right fz12">未认证</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import headerBox from "../../../components/header";
export default {
  components: {
    headerBox
  }
};
</script>


<style lang="scss" >
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
  .fz12 {
    font-size: 0.12rem;
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
      .bankbox {
        background: #fff;
        margin: 0 0.1rem;
        padding: 0.1rem;
        height: auto;
        overflow: hidden;
        .blog {
          width: 0.37rem;
          height: 0.37rem;
          overflow: hidden;
          border-radius: 0.5rem;
          margin-right: 0.1rem;
        }

        .logstyle {
          padding-top: 0.15rem;
          p {
            line-height: 0.37rem;
            text-align: left;
          }
        }
      }
    }
    .bankbutton {
      width: 1.5rem;
      height: 0.33rem;
      border-radius: 0.15rem;
      background: #029ae6;
      border: none;
      color: #fff;
      margin: 0.5rem auto;
      display: block;
    }
  }
</style>
