<!-- 我的积分攻略-->
<template>
  <div class="GonglvBox">
    <!-- 头部 -->
    <headerBox title="积分攻略"/>

    <div class="gonglveclass">
      <p>1. 签到赚积分：每天签到赚积分，连续签到 15 天，额外奖励 100 积分；</p>
      <p>2. 分享项目赚积分，每天一次，随机 1-5 个积分；</p>
      <p>3. 首次下载融托金融 APP，注册成功后，送 100 积分；</p>
      <p>4. 玩 APP 发现页小游戏可获得相应积分；</p>
      <p>5. 每满 5000步可兑换 50 积分。</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
body {
  background: #fff;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .displayNO {
    display: none;
  }
  .clear {
    clear: both;
  }
  .mt0 {
    margin-top: 0;
  }
  .c3 {
    color: #333;
  }
  .c_blue {
    color: #0159d5;
  }
  .red {
    color: red;
  }
  .fz14 {
    font-size: 0.14rem;
  }
  .GonglvBox {
    width: 100%;
    height: auto;
    font-size: 14px;
    overflow: hidden;

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

    .gonglveclass {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-top: 0.6rem;
      padding: 0.12rem;
      p {
        line-height: 0.3rem;
      }
    }
  }
}
</style>
 