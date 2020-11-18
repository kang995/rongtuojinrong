<!--我的~我的账户信息~~银行卡--->
<template>
  <div class="mineContents">
    <!-- 头部 -->
    <headerBox title="我的银行卡"/>
    <!-- <headerBox title="我的银行卡"></headerBox> -->
    <div v-if="flag==0">
      <div class="mineContent-3">
        <div class="bankbox">
          <p>
            <span class="left c3">{{bankdetail.BankName}}</span>
            <span class="right">默认取现卡</span>
          </p>
          <div class="clear logstyle">
            <img :src="bankdetail.BankLogo" class="left blog" />
            <p>{{str}}</p>
          </div>
        </div>

        <button class="bankbutton" @click="getenrolladopt">解绑银行卡</button>
      </div>

      <!--有余额解绑银行卡弹窗 -->
      <van-dialog
        v-model="getenrolladopts"
        show-cancel-button
        confirmButtonColor="#028261"
        :showCancelButton="false"
      >
        <!-- @cancel="cancelPicker"
        @confirm="confirmPicker"-->
        <div class="refuse">
          <h4>温馨提示</h4>
          <p>
            资产总额为0时，可更换银行卡；您当前的资产总额
            <span class="cju">{{bankyue.acctAmtTotal}}元</span>，不满足自行更换银行卡的条件，请联系客服进行更换。
          </p>
        </div>
      </van-dialog>
       
    <!--没有余额解绑银行卡弹窗 -->
      <van-dialog
        v-model="NOgetenrolladopts"
        show-cancel-button
        confirmButtonColor="#028261"
        cancelButtonColor="#028261"
        showCancelButton
       @confirm="confirmPicker"
      >
        <!-- @cancel="cancelPicker"
      -->
        <div class="refuse">
          <h4>温馨提示</h4>
          <p>
            您确定要解绑尾号为<b >{{fourbank}}</b>的银行卡吗？解绑该卡后，您需要重新绑定新的银行卡才能取现，请慎重选择！
          </p>
        </div>
      </van-dialog>
    </div>
    <div v-if="flag==1" class="mineContent-none">
      <router-link class="bankbox" tag="div" :to="{name:'bindCard'}">
        <div class="bankbox-1" >
          <van-icon name="plus" />
          <span>绑定银行卡</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import { Dialog } from "vant";
// 全局注册
Vue.use(Dialog);
//import headerBox from '../../../components/header'
export default {
  data() {
    return {
      flag: 10,
      getenrolladopts: false,
      NOgetenrolladopts:false,
      bankdetail: {},
      bankyue: {},
      str: "",
      fourbank:""
    };
  },
  methods: {
    //解绑按钮
    getenrolladopt() {  
      if(this.bankyue.acctAmtTotal==0){
          this.NOgetenrolladopts=true;
      }else {
          this.getenrolladopts = true; 
      }
    },
    //确认解绑银行卡
    confirmPicker(){
    this.$post('/rongtuojinrong/userCenter/accountInformation/unbindBankCard.json',{
       defidenshuxing: this.$store.state.invite.defidenshuxing,
      SigCard:this.bankdetail.No,
      FlagChnl:3,
    }).then(res=>{
      location.reload();
        /* if(res.data.status==0){
          this.$toast(res.data.data);
        }else{
            this.$toast(res.data.msg);
         } */
    })
    }

  },

  created() {
    //银行卡信息
    this.$post( "/rongtuojinrong/userCenter/accountInformation/myBankCard.json", {
        defidenshuxing: this.$store.state.invite.defidenshuxing,
         FlagChnl:3
      }) .then(res => {
        this.flag = res.data.status;
        this.bankdetail = res.data.data;
        //通过正则隐藏银行卡号中间位
        this.str = res.data.data.No;
        var reg = /^(\d{3})\d+(\d{4})$/;
        this.str = this.str.replace(reg, "$1**********$2");
        //解绑银行卡正则截取后4位
        this.fourbank = res.data.data.No.slice(-4);
       // console.log(this.bankyue.acctAmtTotal);
        //this.fourbank = res.data.data.No.slice(-1,-4);
       /*  var reg = /^(\d{4})$/;
        this.fourbank = this.fourbank.replace(reg, "***********$2"); */

      })
      .catch(err => {});

    //银行卡余额
    this.$post( "/rongtuojinrong/userCenter/accountInformation/bankCardBalance.json", {
        defidenshuxing: this.$store.state.invite.defidenshuxing,
        FlagChnl:3  
        })
      .then(res => {
        this.bankyue = res.data.data;
      })
      .catch(err => {});
  }
};
</script>

<style lang="scss" >
  .mineContents {
    /*  margin: 0 0.11rem 0;
        border-radius: 0.07rem;
 */
    width: 100%;
    height: 100%;
    font-size: 14px;
     background: #f9f9f9;
     position: absolute;
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
  .cju {
    color: #ff6632;
  }
    .mineContent-none {
      padding-top: 0.7rem;
      width: 90%;
      height: 2rem;
      margin: 0 auto;
      text-align: center;
      .bankbox {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        border: 1px dotted #ccc;
        border-radius: 0.1rem;
        background-color: #fff;
        .bankbox-1 {
          display: flex;
          align-items: center;
          span {
            padding-left: 0.1rem;
          }
        }
      }
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
      /*  ul li {
        height: 0.51rem;
        display: flex;
        align-items: center;
        padding: 0 0.18rem 0;
        justify-content: space-between;
        border-bottom: 1px solid #eff2f8;
        background-color: #fff;
      } */
      .bankbox {
        border-radius: 0.04rem;
        background: #fff;
        margin: 0.1rem;
        padding: 0.2rem 0.1rem;
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
    .refuse {
      padding: 0.15rem 0.1rem;
      text-align: left;
      color: #333;
      h4 {
        font-weight: bold;
        padding: 0.05rem 0 0.15rem 0;
      }
      p {
        line-height: 0.23rem;
        color: #333;
      }
    }
    .van-button--large {
      text-align: right;
      padding-right: 0.5rem;
    }
  }
</style>
