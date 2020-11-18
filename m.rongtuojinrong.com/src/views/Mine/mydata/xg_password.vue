<!--我的~~登录密码管理~修改登录密码--->

<template>
  <div class="mineContentsalter">
    <!-- 头部 -->
    <!-- <mt-header title="修改登录密码">
      <router-link to="/password" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox title="修改登录密码"></headerBox>

    <div class="mineContent-alter">
      <div class="passinput_box">
        <div class="pin"     :class="{active:actives == 1}" @click="active(1)">
          <span class="jiumm">旧密码</span>
          <input type="password" placeholder="请输入旧密码" class="passinput" v-model="pass" />
        </div>

       <div class="pin"  :class="{active:actives == 2}" @click="active(2)">
          <span class="jiumm">新密码</span>
          <input type="password" placeholder="请输入新密码（6位数字）" class="passinput" v-model="newpass" />
        </div>
        <div class="pin"   :class="{active:actives == 3}" @click="active(3)">
          <span class="jiumm">确认密码</span>
          <input type="password" placeholder="请再次输入新密码（6位数字）" class="passinput"  v-model="confirmpass"/>
        </div>

      </div>
      <div class="quit" ><button @click="getpassinput">提交</button></div>

    </div>
  </div>
</template>

<script>
import headerBox from '../../../components/header'
export default {
    components:{
        headerBox
    },
    data(){
      return{
        pass:"",
        newpass:"",
        confirmpass:"",
        actives:1

      }
    },
   methods:{
      getpassinput(){
      //let invite = this.$store.state.invite;
      this.$post('/rongtuojinrong/userCenter/securitySetting/modifyLoginPassword.json',{
      // defidenshuxing: invite.defidenshuxing,
       originpass:this.pass,
       newpass:this.newpass,
       repeatnewpass:this.confirmpass,
       type:1,
      }).then(res=>{
        if(res.data.status==0){
          this.$toast(res.data.data);
          setTimeout(()=>{
         this.$router.push('/password')
       },1000);
        }else{
           this.$toast(res.data.msg);
        }
      })
     .catch(err=>{
            this.$toast("提交失败，请重新提交");
        })
    },

    //点击效果样式
    active(index){               
      this.actives = index;
    }
   },
   created(){
     
   }
}
</script>

<style lang="scss" >
  .mineContentsalter {
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

    .mineContent-alter {
      margin-top: 0.6rem;
      .passinput_box {
        padding: 0.18rem;

        .pin {
          height: 0.4rem;
          overflow: hidden;
          line-height: 0.4rem;
          border-radius: 0.5rem;
        margin-bottom:0.025rem; 
          .jiumm {
            display: block;
            background: url(../../../assets/suo.jpg) no-repeat;
            background-size: 18%;
            float: left;
            text-indent: 0.17rem;
            color: #333;
            width: 22%;
            height: 0.2rem;
            line-height: 0.2rem;
            margin-top: 0.11rem;
            margin-left: 0.15rem;
          }
          .passinput {
            width: 73%;
            height: 0.42rem;
            border: none;
            float: left;
            padding-left: 0.1rem ;
          }
        }

        .active {
          box-shadow: 0 0 5px cornflowerblue;
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
