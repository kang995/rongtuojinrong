<!--我的~~登录密码管理~重置登录密码1--->

<template>
  <div class="mineContentsheight">
    <!-- 头部 -->
    <!-- <mt-header title="重置登录密码">
      <router-link to="/password" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>-->
    <headerBox :title="this.$route.query.title"></headerBox>

    <div class="mineContent-height">
      <div class="passinput_box">
        <div class="active pin">
          <input type="number" placeholder="手机号" class="passinput2" v-model="xgpass" />
        </div>
        <p class="ptcss">输入已绑定的手机号，通过验证后可{{this.$route.query.title}}</p>
      </div>
      <div class="quit">
        <button @click="getczpass">下一步</button>
        <!-- to="/cz_yzm_password" -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xgpass: "",
      title:"",
    };
  },
  methods: {
    getczpass() {
      if (this.xgpass == "") {
        this.$toast("请输入的手机号！");
        return false;
      }
      if (this.xgpass == this.$store.state.invite.invite.mobile) {
        this.$toast("正在核对手机号");
        //setTimeout(() => {this.$router.push("/cz_yzm_password"); }, 1000);
        this.$router.push({name:"cz_yzm_password",query:{title:this.$route.query.title}});
      } else {
        this.$toast("输入的手机号与绑定手机号不相符！");
      }
    }
  },
  /* created(){
    this.title=
  } */
};
</script>

<style lang="scss" >
  .mineContentsheight {
    width: 100%;
    height: 100%;
    font-size: 14px;
   background: #fff;
  .left {
    float: left;
  }
  .mtop {
    margin-top: 0.1rem;
  }
  .clear {
    clear: both;
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

    .mineContent-height {
      padding-top: 0.6rem;
      .passinput_box {
        padding: 0.55rem 0.2rem 0.2rem 0.2rem;

        .pin {
          height: 0.4rem;
          overflow: hidden;
          line-height: 0.4rem;
          border-radius: 0.5rem;
          margin-bottom: 0.025rem;
          .passinput2 {
            width: 100%;
            height: 0.4rem;
            border: none;
            padding-left: 0.2rem;
            background: url(../../../assets/img103.png) no-repeat;
            background-size: 7%;
            text-indent: 0.15rem;
            background-position: 0.07rem 0.09rem;
          }
        }

        .active {
          box-shadow: 0 0 5px cornflowerblue;
        }
        .ptcss {
          line-height: 0.4rem;
          text-align: center;
        }
      }

      .quit {
        width: 100%;
        height: auto;
        overflow: hidden;
        padding: 0.1rem;
        button {
          width: 100%;
          height: 0.43rem;
          border: none;
          background: #005ad4;
          color: #fff;
          text-align: center;
          border-radius: 0.5rem;
        }
      }
    }
  }
</style>
