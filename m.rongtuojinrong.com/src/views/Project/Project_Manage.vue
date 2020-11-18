<template>
  <div class="Project_Manage">
    <!-- 头部 -->
    <headerBox title="借后管理"></headerBox>
    <iframe class="iframeBox" ref="box" :src="src" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  name: "Project_Manage",
  data() {
    return {
      src:
        "http://p2pxin.rongtuojinrong.com/Rongtuoxinsoc/Huishang/GetReimburmodel/jie_id/" +
        this.$route.query.id +
        "?ssid=" +
        this.$store.state.login.token.ssid,
      projet: false,
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
    .Project_Manage {
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
        left: 0;
      }
    }
  }
}
</style>