<template>
  <div class="Bid_Records">
    <!-- 头部 -->
    <headerBox title="投标记录"></headerBox>
    <iframe class="iframeBox" :src="src" frameborder="0"></iframe>

  </div>
</template>
<script>
export default {
  name: "Bid_Records",
  data() {
    return {
      src:
        "http://p2pxin.rongtuojinrong.com/Rongtuoxinsoc/Huishang/GetbidRecords/jie_id/" +
        this.$route.query.id +
        "?ssid=" +
        this.$store.state.login.token.ssid,
      code: "",
      id: ""
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.code = this.$route.query.code;
  }
};
</script>

<style lang="scss" >
body {
  background: #f4f4f4;
  height: 100%;
  width: 100%;
  #app {
    width: 100%;
    height: 100%;
    .Bid_Records {
      width: 100%;
      height: 100%;
      .mint-header {
        background: #fff;
        height: 0.5rem;
        .mint-button-icon {
          color: #404040;
        }
        .mint-header-title {
          font-size: 0.18rem;
          color: #0a0a0a;
        }
      }
      .iframeBox {
        width: 100%;
        height: 100%;
        padding-top: 0.5rem;
      }
    }
  }
}
</style>