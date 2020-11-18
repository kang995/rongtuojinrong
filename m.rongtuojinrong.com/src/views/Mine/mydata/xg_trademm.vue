<!--我的~~安全设置~交易密码管理~修改交易密码--->
<template>
  <div class="mineContents">
    <!-- 头部 -->
    <!-- <mt-header title="修改交易密码">
      <router-link to="/trade_mm" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox title="修改交易密码"></headerBox>

    <div class="mineContent-mm">
      <!--   <input type="text" placeholder="请输入新的手机号" class="addphoto" /> -->
      <div class="yzm">
        <span>验证码</span>
        <input type="text" placeholder="请输入收到的验证码"  v-model="yzm"/>
        <!-- <button>点击获取</button> -->
        <button v-if="isShow" @click="clickYz">{{btnval}}</button>
        <button class="yzm-zh" v-else>{{btnval}}({{count}}S)</button>
      </div>
      <div class="yzm">
        <span>姓名</span>
        <input type="text" placeholder="请输入姓名" v-model="addname" />
      </div>
      <div class="yzm">
        <span>身份证号</span>
        <input type="number" placeholder="请输入身份证号(18位数字)" v-model="shenfen"/>
      </div>

      <div class="photoend">
        <button @click="geteadmm">下一步</button>  <!-- to="/xg_end_trademm" -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
   yzm:"",
   addname:"",
   shenfen:"",
   isShow: true,
   count: 60,
   btnval: '点击获取'
 }
  },
  methods:{
  //验证码
    clickYz(){    
        this.$post('/rongtuojinrong/certificate/commonAuth/send.json',{
          type: 7,
          mobile: this.ymoval
        })
        .then(res=>{
        //60秒倒计时方法（获取验证码）  
        let time = 60;
        let timer = setInterval(() => {
        if(time == 0) {
            clearInterval(timer);
            this.isShow = true;
            this.btnval = "重新获取";
        } else {
            this.count = time;//赋值
            this.isShow = false;
            this.btnval ='已发送';
            time --;
            }
        },1000)
          //this.$toast(res.data.data);             
        })
        .catch(err=>{
          this.$toast("发送失败，请重新点击获取");
        })
      },
    geteadmm(){  //下一步
     if(this.yzm==" "){
       this.$toast("请输入手机验证码!");
        return false;
     }
     if(this.addname==" "){
       this.$toast("请输入姓名!");
        return false;
     }
      if(this.shenfen==" "){
       this.$toast("请输入身份证号!");
        return false;
     }
     if(this.addname!=this.$store.state.invite.invite.realname){
      this.$toast("请输入!");
        return false;
     }
     if(this.shenfen!=this.$store.state.invite.invite.IDNumber){
      this.$toast("请输入正确的身份证号!");
        return false;
     }
     //验证码校对
      this.$post('/rongtuojinrong/certificate/commonAuth/auth.json',{
        mobile: this.$store.state.invite.invite.mobile,
        type: 7,
        code:this.vscode
      }).then(res=>{
         if(res.data.status==0){
         this.$toast(res.data.data);
         this.getNextstep()
         }else{
            this.$toast(res.data.msg);
         }
      })
    },
    //按钮下一步接口
   getNextstep(){
       this.$post('/rongtuojinrong/userCenter/securitySetting/modifyTradePassword.json',{
         defidenshuxing: this.$store.state.invite.defidenshuxing,
         name:this.addname,
        IDNumber:this.shenfen,
        FlagChnl:3
      }).then(res=>{
         setTimeout(() => {
          this.$router.push("/xg_end_trademm");
        }, 1000);  
      })
   }



  } ,
  created(){
    /* :this.$store.state.invite.defidenshuxing, */
  }

}
</script>
<style lang="scss">
  .mineContents {
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

    .mineContent-mm {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin: 0.5rem auto;
      .yzm {
        width: 100%;
        height: 0.44rem;
        background: #fff;
        padding: 0 0.1rem;
        color: #333;
        line-height: 0.45rem;
        border-bottom: 1px solid #e5e9e5;
        span {
          width: 20%;
          display: inline-block;
          color: #333;
        }
        input {
          border: none;
          width: 50%;
          line-height: 0.4rem;
        }
        button {
          width: 23%;
          color: #fff;
          text-align: center;
          border-radius: 0.5rem;
          background: #0099e9;
          border: none;
          float: right;
          font-size: 0.12rem;
          display: block;
          margin-top: 0.1rem;
          line-height: 0.2rem;
        }
        .yzm-zh{
          background-color: #eee;
        }
      }
      .photoend {
        width: 100%;
        height: auto;
        overflow: hidden;
        padding: 0.2rem 0.1rem;
        button {
          width: 100%;
          height: 0.47rem;
          background: #005ad4;
          color: #fff;
          line-height: 0.47rem;
          text-align: center;
          border: none;
          border-radius: 0.04rem;
        }
      }
    }
  }
</style>
