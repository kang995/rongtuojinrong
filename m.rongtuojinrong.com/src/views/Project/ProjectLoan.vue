<template>
  <div id="ProjectLoan">
     <headerBox title="项目出借" ></headerBox>
     <iframe class="iframeBox" :src="src" frameborder="0"></iframe>  
  </div>
</template>


<script>
import qs from "qs";
import { mapState } from "vuex";
import Dialog from "@/components/TheDialog1.vue";
export default {
  components: {
    Dialog
  },
  name: "ProjectLoan",
  data() {
    return {
      projet: false,
      code: "",
      lists:{},
      src:
        this.$sign +
        // 在 ifrome 跳转需要穿 user_id的时候 那就 在链接后面加上
        // json 拼接
        // ? user_id=" + this.$store.state.login.token.user_id + "&ssid=" +this.$store.state.login.token.ssid
        "/rongtuojinrong/h5/invest/input.json?user_id=" +this.$store.state.login.token.user_id +
        // 往后台传的 ssid
        "&ssid=" +
        this.$store.state.login.token.ssid +
        // 忘后台传的 id 从项目信息页面传过来的 jie_id
        "&borrow_id=" +
        this.$route.query.id +
        "&referer=" +
        1
    };
  },
  methods: {
    dianji() {
      //  判断如果 user_id 没有的话就是没有登录，那就直接跳到登录页面
      if (!this.user_id) {
        this.$router.push({
          // 编程式导航
          path: "/login",
          // 这是传给 login 的组件的 query传值
          // 发送给登录页的login参数
          query: {
            // 接受的ProjectBidOne 传过来的组件路由
            redirect: this.$route.query.redirect,
            // 接受的ProjectBidOne 传过来的首页组件
            distinguish: this.$route.query.distinguish,
            // 接受的ProjectBidOne 传过来的code字符串
            code: this.$route.query.code,
            // 接受ProjectBidOne 传过来的jie_id
            id: this.$route.query.id
          }
        });
      } else {
      }
    },
    
  },
  computed: {
    // 获取的注册user_id
    ...mapState({
      user_id: state => state.login.token.user_id
    }),
    // 获取的的开户信息
    ...mapState({
      is_identify: state => state.login.token.is_identify
    }),
    // 获取到的出借信息
    ...mapState({
      invest_count: state => state.login.token.invest_count
    })
  },

  created() {
    this.dianji();
    this.code = this.$route.query.code;
    //  this.getlist()
  }
};
</script>



<style lang='scss'>
body,
html {
  height: 100%;
  width: 100%;
  #app {
    width: 100%;
    height: 100%;
    #ProjectLoan {
      height: 100%;

      .iframeBox {
        width: 100%;
        height: 100%;
        padding-top: 0.5rem;
      }
    }
  }
}
</style>

