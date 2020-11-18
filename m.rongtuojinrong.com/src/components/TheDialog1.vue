<template>
  <!-- 开通存管账户 -->
  <div v-if="showSelf" class="dialog" :style="{'z-index': zIndex}">
    <div class="dialog-mark" :style="{'z-index': zIndex + 1}"></div>
    <div class="dialog-sprite">
      <!-- 标题 -->
      <!-- <section v-if="title" class="header">临时标题</section> -->

      <!-- 弹窗的主题内容 -->
      <section class="body">银行存管系统已正式运行！为确保正常交易，请开通银行存管专用账户。</section>

      <!-- 按钮 -->
      <section class="footer">
        <router-link :to="{name:'realname1'}" class="btn btn-confirm" tag="div" @click.native="cancel"  >立即开通</router-link>
      </section>

      <section class="bottom">
        <div class="bottom-1">
          <span></span>账户资金由银行直接存管
        </div>
      </section>

      <div class="popclose">
        <van-icon @click="cance" name="close" color="white" size="25px" />
      </div>

      <div class="topSign">
        <img src="../assets/sm_20.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //弹窗组件是否显示 默认不显示 必传属性
    show: {
      //type: Boolean,
      default: false
      //required: true,
    },
    code: {
      type: String
    }
  },
  data() {
    return {
      name: "dialog",
      showSelf: false, //挂载的新数据
      zIndex: this.getZIndex(),
      bodyOverflow: ""
    };
  },
  watch: {
    show(val) {
      console.log(val);
      if (!val) {
        this.closeMyself();
      } else {
        this.showSelf = val;
      }
    }
  },
  created() {
    this.showSelf = this.show;
  },
  methods: {
    /** 禁止页面滚动 */
    forbidScroll() {
      this.bodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    },

    /**  每次获取之后 zindex 自动增加 */
    getZIndex() {
      let zIndexInit = 20190315;
      return zIndexInit++;
    },

    /** 取消按钮操作 */
    cancel() {
      this.showSelf = false;
      this.sloveBodyOverflow();
    },
    cance() {
      this.showSelf = false;
      this.sloveBodyOverflow();
      //   判断 传过来的code 并且 user_id 登录 没登录  并且 没开户
      if (
        // 有code值
        this.code &&
        // 没有开户
        +this.$store.state.login.token.is_identify == 0 &&
        // 已经登录
        +this.$store.state.login.token.user_id
      ) {
        //    强制性跳转到 原来的页面
        this.$router.push({
          path: "/ProjectBidOne",
          query: {
            // 接受从登录页传过来的 jie_id
            id: this.$route.query.id,
         
          }
        });
      }
    },
    /** 恢复页面的滚动 */
    sloveBodyOverflow() {
      document.body.style.overflow = this.bodyOverflow;
    }
  }
};
</script>

<style lang="scss" scoped>
// 弹窗动画
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.5s;
}

.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}

// 最外层 设置position定位
// 遮罩 设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩
.dialog {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  // 内容层 z-index要比遮罩大，否则会被遮盖
  .dialog-mark {
    position: absolute;
    top: 0;
    height: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
}

.dialog-sprite {
  // 移动端使用felx布局
  position: fixed;
  top: 25%;
  left: 15%;
  right: 15%;
  display: flex;
  flex-direction: column;
  max-height: 75%;
  z-index: 23456765435;
  background: #fff;
  border-radius: 8px;
  .header {
    padding: 15px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #333;
  }
  .body {
    margin: 0.4rem 0.1rem 0.2rem;
    text-align: center;
    font-size: 0.13rem;
  }
  .footer {
    position: relative;
    display: flex;
    width: 80%;
    margin: 0 auto 0.2rem;
    // flex-shrink: 1;

    .btn {
      flex: 1;
      text-align: center;
      //padding: 15px;
      font-size: 0.14rem;
      background-color: #0159d5;
      border-radius: 10px;
      height: 0.3rem;
      line-height: 0.3rem;
    }
    .btn-confirm {
      color: #fff;
    }
  }
  .bottom {
    .bottom-1 {
      text-align: center;
      margin: 0 auto 0.3rem;
    }
  }
  .popclose {
    position: absolute;
    top: 120%;
    left: 47%;
    z-index: 999;
  }
  .topSign {
    width: 0.5rem;
    position: fixed;
    top: 20.5%;
    left: 44%;
    z-index: 1999;
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>