<!--我的~~安全设置~实名认证后~~更换手机号--->
<template>
  <div class="mineContents">
    <!-- 头部 -->
     <headerBox title="更换绑定手机号"></headerBox>

    <div class="mineContent-photo">
      <p class="p1 c3">
        绑定手机号:
        <span>{{value}}</span>
      </p>

      <div class="yzm">
        <input type="text" placeholder="请输入原手机号" v-model="ymoval"/>
        <button v-if="isShow" @click="clickYz">{{btnval}}</button>
        <button class="yzm-zh" v-else>{{btnval}}({{count}})S</button>
      </div>
      <input type="text" placeholder="请输入验证码" class="addphoto" v-model="moval"/>
      <div class="photoends">
        <!-- <router-link tag="button" to="/shiming_newphoto">下一步</router-link> -->
        <button @click="nextBd" to="" tag="button">下一步</button>
      </div>
      <div class="tingy">
        <i class="jt"></i>原手机号已停用，请
        <router-link to="/smxg_photo">点击此处</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    data(){
      return{
        ymoval:'',
        value:'',
        moval:'',
        isShow: true,
        count: 60,
        btnval: '获取验证码'
      }
    },
    methods:{
      clickYz(){
        if(this.ymoval==''){
          this.$toast("请输入原手机号");
          return false;
        };
        if(!(/^1[3456789]\d{9}$/.test(this.ymoval))){ 
          this.$toast('请输入正确手机号'); 
          return false; 
        } 
        if(this.ymoval!=this.$store.state.invite.invite.mobile){
          this.$toast("输入手机号与原手机号不一致!");
          return false;
        };        
        this.$post('/rongtuojinrong/certificate/commonAuth/send.json',{
          type: 5,
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
      nextBd(){
        if(this.ymoval=='' || this.moval==''){
          this.$toast("请输入原手机号或验证码");
          return false;
        };
        if(!(/^1[3456789]\d{9}$/.test(this.ymoval))){ 
          this.$toast('请输入正确手机号'); 
          return false; 
        } 
        if(this.ymoval!=this.$store.state.invite.invite.mobile){
          this.$toast("输入手机号与原手机号不一致!");
          return false;
        };        
        this.$post('/rongtuojinrong/certificate/commonAuth/auth.json',{
          type: 5,
          code: this.moval,
          mobile: this.ymoval
        })
        .then(res=>{
          if(res.data.status==0){
            //this.$toast(res.data.data); 
            this.$router.push({
              name:'shiming_newphoto'
            })
          }else{
            this.$toast("请输入正确验证码"); 
          }
              
                 
        })
        .catch(err=>{
          this.$toast("发送失败，请重新点击获取");
        })        
      }


    },

    created(){
      this.value = this.$store.state.invite.invite.mobile;
      var reg = /^(\d{3})\d+(\d{4})$/;
      this.value = this.value.replace(reg, "$1****$2");
    }
}
</script>

<style lang="scss">
  .mineContents {
    width: 100%;
    height: 100%;
    font-size: 14px;
    position: absolute;
    background: #f9f9f9;
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

    .mineContent-photo {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin: 0.5rem auto;
      .p1 {
        padding: 0.1rem;
      }
      .addphoto {
        width: 100%;
        height: 0.45rem;
        background: #fff;
        padding: 0 0.1rem;
        border: none;
        border-bottom: 1px solid #e5e9f2;
      }
      .yzm {
        width: 100%;
        height: 0.45rem;
        background: #fff;
        padding: 0 0.1rem;
        color: #333;
        line-height: 0.44rem;
        border-bottom: 1px solid #e5e9f2;
        input {
          border: none;
          width: 60%;
        }
        .yzm-zh{
          background-color: #eee;
        }
        button {
          width: 25%;
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
      }
      .photoends {
        width: 100%;
        height: auto;
        overflow: hidden;
        padding: 0.3rem 0.1rem;
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
      .tingy {
        width: 100%;
        margin: auto;
        text-align: center;
        height: auto;
        overflow: hidden;
        color: #333;
        position: relative;

       .jt {
        background: url(../../../assets/sm_06.jpg) no-repeat;
        display: inline-block;
        width: 0.16rem;
        height: 0.17rem;
        background-size: 85%;
        vertical-align: middle;
      }
        a {
          color: #0099e9;
          font-size: 0.14rem;
        }
      }
    }
  }
</style>
