<template>
  <div id="logout-failed">
    <div class="header">
      <div class="kong"></div>
      <img src="@/assets/zxsb.png" alt />
    </div>
    <div class="characte">
      <strong>① 账号未处于安全状态</strong>
      <br />
      <span> 在最近两周内，您进行过改密，改绑等敏感操作。（请两周之后再进行注销操作）</span>
    </div>
    <div class="characte2">
      <strong>② 资产总额不为0</strong>
      <br />
      <span>您的出借资金以及账户余额不为0，或融托金融账号上有资金问题待结算。（请等待您的所有出借资金回款，且可用余额全部提现后再进行注销操作）</span>
    </div>
    <div class="tel">如有疑问, 请致电客服: 400-878-8686</div>
  </div>
</template>

<script>
export default {
  name: "logout-failed",
  data() {
    return {};
  }
};
</script>


<style lang="scss">
#logout-failed {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    height: 1.59rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .characte {
    margin-top: 0.25rem;
    padding: 3%;
    strong {
      font-weight: bold;
      color: black;
      font-size: 0.12rem;
    }
    span {
      font-size: 0.12rem;
      color: #333333;
    }
  }
  .characte2 {
    padding: 3%;
    strong {
      font-weight: bold;
      color: black;
      font-size: 0.12rem;
    }
    span {
      font-size: 0.12rem;
      color: #333333;
    }
  }
  .tel {
    position: fixed;
    width: 2.88rem;
    height: 0.435rem;
    border: 1px solid #0030cc;
    margin: 0 auto;
    bottom: 0.475rem;
    left: 0.45rem;
    color: #0030cc;
    border-radius: 30px 30px 30px 30px;
    text-align: center;
    line-height: 0.435rem;
    display: table-cell;
    vertical-align: middle;
  }
}
</style>