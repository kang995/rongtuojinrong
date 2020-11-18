<!--我的~~~重置登录密码~验证码2--->
<template>
  <div class="mineContents1">
    <!-- 头部 -->
    <!-- <mt-header title="重置登录密码">
      <router-link to="/cz_password" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>-->
    <headerBox :title="this.$route.query.title"></headerBox>
    <div class="mineContent-31">
      <div class="passinput_box">
        <p class="c3 pl">验证码已下发，请注意查收短信</p>
        <div class="active pin">
          <input type="number" placeholder="请输入短信验证码" class="passinput2" v-model="vscode" />
        </div>
        <!-- <p class="ptcss">重新获取验证码（60S）</p> -->
        <!-- 发送验证码 -->
        <div class="mintBox">
          <div v-if="disabled" class="textwz">
            <span>{{count}}</span>
            <p>{{btnTitle}}</p>
          </div>
          <i v-else @click="validateBtn(),getinformation()">{{btnTitle}}</i>
        </div>
      </div>

      <div class="quit">
        <button @click="getpare">下一步</button> <!-- to="/end_cz_password" -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vscode:"",
      count: 60,
      disabled: false,
      btnTitle: "秒后重新获取验证码",
      title:""
    };
  },
  methods: {
    //1.60秒倒计时方法
    validateBtn() {
      let time = 60;
      this.count = time; //重新赋值
      this.disabled = true;
      this.btnTitle = "秒后重新获取验证码";
      let timer = setInterval(() => {
        time--;
        if (time == 0) {
          clearInterval(timer);
          this.disabled = false;
          this.btnTitle = "重新获取验证码";
        } else {
          this.count = time; //赋值
        }
      }, 1000);
    },
    //调用发送短信验证码接口
    getinformation() {
      this.$post("/rongtuojinrong/certificate/commonAuth/send.json", {
        mobile: this.$store.state.invite.invite.mobile,
        type: 8
      }).then(res => {
        if (res.data.status == 0) {
          this.$toast(res.data.data);
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    
    //验证码校队接口
    getpare(){
      this.$post('/rongtuojinrong/certificate/commonAuth/auth.json',{
        mobile: this.$store.state.invite.invite.mobile,
        type: 8,
        code:this.vscode
      }).then(res=>{
         if(res.data.status==0){
           this.$toast(res.data.data);
           setTimeout(() => {
          this.$router.push("/end_cz_password");
        }, 1000);
         }else{
            this.$toast(res.data.msg);
         }
      })
    }
  },
  created() {
    this.validateBtn();
    this.getinformation();
  }
};
</script>

<style lang="scss" >

  .mineContents1 {
    width: 100%;
    height: 100%;
    font-size: 14px;
      background: #fff;
      position: absolute;
  .left {
    float: left;
  }
  .mtop {
    margin-top: 0.1rem;
  }
  .pl {
    padding: 0.2rem 0.1rem;
  }
  .c3 {
    color: #333;
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

    .mineContent-31 {
      margin-top: 0.5rem;
      .passinput_box {
        padding: 0.4rem 0.2rem 0.2rem 0.2rem;
        .pin {
          height: 0.4rem;
          overflow: hidden;
          line-height: 0.4rem;
          border-radius: 0.5rem;
          margin-bottom: 0.025rem;
          .passinput2 {
            width: 100%;
            height: 0.45rem;
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
        .mintBox {
          width: 100%;
          height: 0.4rem;
          text-align: right;
          line-height: 0.4rem;
          span {
            float: left;
            line-height: 0.16rem;
            color: #1a4cbb;
            font-size: 0.12rem;
            margin-right: 0.07rem;
            margin-top: 0.03rem;
          }
          p {
            float: left;
            line-height: 0.16rem;
            font-size: 0.14rem;
            color: #646464;
            margin-top: 0.03rem;
          }

          i {
            display: block;
            margin-left: 0.12rem;
            color: #3b56cf;
            font-size: 0.14rem;
          }
          .textwz {
            display: block;
            text-align: right;
            line-height: 0.4rem;
          }
        }
        .ptcss {
          line-height: 0.4rem;
          text-align: right;
          color: #0099e9;
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
