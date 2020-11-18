<!--我的~我的账户信息~~安全设置--->

<template>
  <div class="mineContents">
    <!-- 头部 -->
    <headerBox title="安全设置"></headerBox>
    <div class="mineContent_safe">
      <ul>
        <li @click="clickSm" class="mtop">
          <span class="mineContent-3-s">实名认证</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </li>
        <!-- 修改手机号分实名认证和未实名认证的  to="/photo"未实名认证、-->
        <router-link v-if="this.$store.state.login.token.is_identify==0" to="/shiming_newphoto" tag="li">
          <span class="mineContent-3-s">修改手机号</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link>
        <!-- 已实名修改手机号跳转 -->
        <router-link v-else to="/shiming_photo" tag="li">
          <span class="mineContent-3-s">修改手机号</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link>


        <router-link to="/password" tag="li">
          <span class="mineContent-3-s">登录密码管理</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link>

      <!--  <span v-if="this.$store.state.login.token.is_identify==0" class="noSign">未实名</span> -->

         <li v-if="this.$store.state.login.token.is_identify==0" @click="bindname">
          <span class="mineContent-3-s">交易密码管理</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </li>

        <router-link to="/trade_mm" tag="li" v-else>
          <span class="mineContent-3-s">交易密码管理</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link>
        <router-link  :to="{name:'logoutindex',query:{user_id:xxxxl.user_id,ssid:xxxxl.ssid,appid:'app_h5'} }"     tag="li">
          <span class="mineContent-3-s">注销账号</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link>
        <!-- <router-link  :to="{name:'Cancel',query:{user_id:xxxxl.user_id,ssid:xxxxl.ssid,appid:'app_h5'} }"     tag="li">
          <span class="mineContent-3-s">合伙人注销账号</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link> -->
        <!-- <li>
          <span class="mineContent-3-s">修改手势密码</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </li>-->
        <!--    <li>
          <span class="mineContent-3-s">指纹登录</span>
          <div class="mineContent-3-c">
          </div>
        </li>-->
      </ul>
     
    </div>
   <!-- 立即开通存管账户弹窗 未实名不可以修改交易密码-->
      <Dialog :show="popupVisible"></Dialog> 
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Dialog from '@/components/TheDialog1.vue'
export default {
  components:{
       Dialog 
    },
    data(){
      return{
        popupVisible:false,//控制立即开通存管账户的变量
        xxxxl:this.$store.state.login.token
      }
    },
    methods:{
      clickSm(){
        if(this.$store.state.login.token.is_identify==1){
          this.$toast("您已通过实名认证");
        }else{
          this.$router.push({
            name:'realname1'
          })
        }
      },
       bindname(){
          //  this.showDialog = show;
          this.popupVisible = true;
        },
        /* cancel() {
                this.showDialog = false;
               // this.sloveBodyOverflow()
            }, */
    },
    
    created(){

    }
}
</script>

<style lang="scss" >
  .mineContents {
    /*  margin: 0 0.11rem 0;
        border-radius: 0.07rem;
 */ 
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 14px;
   background: #f9f9f9;
  .left {
    float: left;
  }
  .mtop {
    margin-top: 0.1rem;
  }

    .mineContent_safe {
      margin-top: 0.5rem;
      .addstyle {
        height: 0.71rem;
        .addimg {
          width: 0.5rem;
          height: 0.5rem;
          overflow: hidden;
          border-radius: 0.5rem;
          float: left;
          img {
            width: 100%;
          }
        }
        .addpd p {
          padding: 0.04rem 0 0 0.1rem;
          color: #333;
        }
      }
      ul li {
        height: 0.51rem;
        display: flex;
        align-items: center;
        padding: 0 0.18rem 0;
        justify-content: space-between;
        border-bottom: 1px solid #eff2f8;
        background-color: #fff;
        .mineContent-3-s {
          color: #333333;
        }
        .mineContent-3-c {
          display: flex;
          align-items: center;
          span {
            margin-right: 0.1rem;
          }
          .mineContent-3-c-ls {
            margin-right: 0;
          }
          .reviseimg {
            width: 0.37rem;
            height: 0.37rem;
            border-radius: 0.5rem;
            overflow: hidden;
            margin-right: 0.05rem;
            img {
              width: 100%;
            }
          }
        }
      }
      ul li img {
        display: inline-block;
        width: 0.06rem;
      }

      .quit {
        width: 100%;
        height: auto;
        overflow: hidden;
        padding: 0.8rem 0.18rem;
        button {
          width: 100%;
          height: 0.43rem;
          border: none;
          background: #005ad4;
          color: #fff;
          text-align: center;
          border-radius: 0.04rem;
        }
      }
    }
  }
</style>
