<!--我的~~登录密码管理~重置登录密码3--->

<template>
  <div class="mineContents2">
    <!-- 头部 -->
    <!-- <mt-header title="完成">
      <router-link to="/password" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>-->
    <headerBox title="完成"></headerBox>

    <div class="mineContent-32">
      <div class="passinput_box">
        <div class="pin">
          <input type="password" placeholder="密码（6位数字）" class="passinput2" v-model="newpassA" />
        </div>
        <div class="pin">
          <input type="password" placeholder="确认密码（6位数字）" class="passinput2" v-model="newpassB" />
        </div>
      </div>
      <div class="quit">
        <button @click="getend">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newpassA: "",
      newpassB: ""
    };
  },
  methods: {
    getend() {
       if(!(/^\d{6}$/.test(this.newpassA))){ 
        this.$toast('请输入6位数字'); 
        return false; 
      } 
       if(!(/^\d{6}$/.test(this.newpassB))){ 
        this.$toast('请输入6位数字'); 
        return false; 
      } 

      if(this.newpassA==''||this.newpassB==''){
         this.$toast("请输入密码！");
         return false;
      }
      if(this.newpassA!=this.newpassB){
        this.$toast("输入的两次密码不相同！");
        return false;
      }  
     
      let invite = this.$store.state.invite;
      this.$post( "/rongtuojinrong/userCenter/securitySetting/modifyLoginPassword.json",
        {
          //tel: this.$store.state.invite.invite.mobile,
          newpass:this.newpassA,
          repeatnewpass:this.newpassB,
          type:2,
        }
      ).then(res => {
         if(res.data.status==0){
          this.$toast(res.data.data);
          setTimeout(() => {
          this.$router.push("/password");
        }, 1000);
        } else{
           this.$toast(res.data.msg);
        }

      });
    }
  }
};
</script>

<style lang="scss" >
  .mineContents2 {
    width: 100%;
    height: 100%;
    font-size: 14px;
    position: absolute;
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

    .mineContent-32 {
      margin-top: 0.6rem;
      .passinput_box {
        padding: 0.18rem;

        .pin {
          height: 0.45rem;
          overflow: hidden;
          line-height: 0.45rem;
          border-radius: 0.5rem;
          margin-bottom: 0.025rem;
          .passinput2 {
            width: 100%;
            height: 0.45rem;
            border: none;
            padding-left: 0.2rem;
            background: url(../../../assets/suo.jpg) no-repeat;
            background-size: 5%;
            text-indent: 0.15rem;
            background-position: 0.1rem;
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
