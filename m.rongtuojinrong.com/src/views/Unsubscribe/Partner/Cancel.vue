<template >
  <div id="cancel">
    <div class="kong"></div>
    <div class="characte">
      您在申请注销前, 应当认真阅读《账号注销协议》
      <br />
      <span>如果您仍欲继续注销帐号， 您的帐号需同时满足以下条件：</span>
      <br />
      <span>（1）帐号不在处罚状态中，且能正常登录;</span>
      <br />
      <span>（2）帐号最近一个月内并无修改密码、修改关联手机、绑定手机记录。</span>
    </div>
    <div class="cancellation">
      <span>轻按下方的“申请注销”,即表示你已阅读并同意</span>
      <br />
      <router-link to="/Protocol" tag="p">《账号注销协议》</router-link>
    </div>
    <div @click="tanchuang" class="button">
      <p class="p">申请注销</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
import { Dialog } from "vant";
import { setTimeout } from "timers";
export default {
  name: "cancel",
  data() {
    return {};
  },
  methods: {
    //   弹窗1
    tanchuang() {
      this.interfaces();
    },
    interfaces() {
      let postDate = qs.stringify({
        user_id: this.$route.query.user_id,
        //user_id:109,
        appid: this.$route.query.appid,
        ssid: this.$route.query.ssid,
        time: (this.newdate = parseInt(new Date().getTime() / 1000))
      });
      this.$http.post(this.$url+"/partner/closeAccount/check.json", postDate)
        .then(res => {
          // data：为1，不符合注销条件,不符合就提示没法注销
          console.log(res.data);
          if(res.data.status == 1){
            this.$toast(res.data.msg)
            return
          }
          if (res.data.data == 1) {
            Dialog.alert({
              message:
                "您的账号不符合注销条件,请确认后\n重新申请或联系 <p style='display: inline-block;color:#1989fa;text-indent:2px'>400-878-8686</p>",
              width: "2.7rem",
            });
          } else {
            // data：为数组是符合条件，realname为1，是实名认证的，realname为0，是未实名认证的
            Dialog.confirm({
              message: "账号注销合伙人身份也会随之消失, \n确认是否注销。",
              width: "2.7rem",
              confirmButtonText:'是',
              cancelButtonText:'否',
              cancelButtonColor:'#1989fa',
              confirmButtonColor:'#323233'
            }).then(() => {
              if (res.data.data.realname == 1) {
                this.$router.push({name: "Partnerphoto", query: { mobile: res.data.data.mobile }});
                //return;
              }else{
                this.$toast("该账号未实名！")
              }
            });
          }
        });
    }
  },
  created() {
    //在 sessionStorage 里面获取到user_id,appid,和ssid,在DOM渲染前就获取到，把它存到data里面
    // 进行调用
    var information = {
      user_id: this.$route.query.user_id,
      appid: this.$route.query.appid,
      ssid: this.$route.query.ssid
    };
    sessionStorage.setItem("info", JSON.stringify(information));
    console.log(information);
  }
};
</script>

<style lang='scss'>
#cancel {
  /* .kong {
    height: 0.49rem;
  } */
  .characte {
    width: 3.75rem;
    padding: 3.5%;
    font-weight: bold;
    color: #333333;
    letter-spacing: 0.02rem;
    span {
      font-size: 0.12rem;
      font-weight: normal;
      color: #333333;
      letter-spacing: 0;
    }
  }
  .button {
    position: fixed;
    width: 3.265rem;
    height: 0.415rem;
    bottom: 0.356rem;
    left: 0.225rem;
    border-radius: 20px 20px 20px 20px;
    background-color: #fb5a5c;
    .p {
      color: #fffdfd;
      line-height: 0.415rem;
      text-align: center;
      font-size: 0.16rem;
    }
  }
  .cancellation {
    position: absolute;
    bottom: 0.92rem;
    width: 3rem;
    height: 0.4rem;
    // line-height: 0.50rem;
    left: 0.35rem;
    text-align: center;
    p {
      color: #47a7f3;
      font-size: 0.12rem;
      margin-top: 0.05rem;
    }
    span {
      color: #333333;
      font-size: 0.12rem;
    }
  }
}
</style>