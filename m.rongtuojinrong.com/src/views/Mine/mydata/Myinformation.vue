<!--我的~我的账户信息--->

<template>
  <div class="mineContents">
    <headerBox title="账户信息"></headerBox>
    <div class="mineContents-3">
      <ul>
        <router-link class="addstyle" :to="{name:'Mydata'}" tag="li">
          <div class="mineContent-3-s">
            <div class="addimg">
              <img :src="this.$store.state.invite.invite.avatar" alt />
            </div>
            <div class="left addpd">
              <P>{{value}}</P>
              <p>{{value1}}</p>
            </div>
          </div>

          <div class="mineContent-3-c"  >
            <span v-if="this.$store.state.login.token.is_identify==0" class="noSign">未实名</span>
            <span v-else>个人信息</span>
            <img src="@/assets/img63.png" />
          </div>
        </router-link>

        <li v-if="this.$store.state.login.token.is_identify==0" @click="ifbank">
          <span class="mineContent-3-s">银行卡</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div></li>

        <router-link class="mtop" to="/bank" tag="li" v-else>
          <span class="mineContent-3-s">银行卡</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link>


        <router-link  to="/safe" tag="li">
          <span class="mineContent-3-s">安全设置</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link>
        <router-link  to="/fengxian" tag="li">
          <span class="mineContent-3-s">风险承受能力评估</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link> 
        <!-- <li> to="/logoutindex" 
          <span class="mineContent-3-s">版本号</span>
          <div class="mineContent-3-c">
            <span>版本号v6.4.1（已是最新版）</span>
            <img src="@/assets/img63.png" />
          </div>
        </li> -->
      </ul>
      <div class="quit">
        <button @click="popupVisible=!popupVisible">退出账户</button>
        <!-- 退出账户弹出框 -->
        <mt-popup
          v-model="popupVisible"
          closeOnClickModal
        > 
          <div class="popupVisibleBox">
              <p>提示</p>
              <p>确定要退出？</p>
              <p>
                <span @click="popupVisible=!popupVisible">取消</span>
                <span @click="exit">确定</span>
              </p>
          </div>
        </mt-popup>
      </div>
    </div>
    <!-- 立即开通存管账户弹窗 未实名不可以绑银行卡-->
      <Dialog :show="bankpopupVisible"></Dialog> 
  </div>
</template>

<script>
// import headerBox from '../../../components/header';
import {SET_TOKEN} from '@/store/login/const.js';
import {SET_INVITE} from '@/store/invite/const.js';
import router from '@/router'
import {mapState} from 'vuex';
import Dialog from '@/components/TheDialog1.vue'
export default {
    // components:{
    //     headerBox
    // },
    components:{
       Dialog 
    },
 data(){
    return{
     personal:'',
     popupVisible:false,//控制退出账户弹出框
     value:'',//存储姓名字段
     value1:'',//存储手机号字段
     bankpopupVisible:false,
  
    }
 },
 methods:{
  //  退出账户
  exit(){
    localStorage.clear();
    sessionStorage.clear();
    this.$store.commit(SET_TOKEN,'');
    this.$store.commit(SET_INVITE,'');
    router.replace({
      path: '/login',
      query: {redirect:'/mine',distinguish:'code'}//登录后跳转的路由;distinguishsh是为了区分登录页header样式
    })
    // console.log(this.$store);
  },
  //用*号替换姓名和手机号
  changeValue(){
    // *替换姓
    var reg = /^(\S{1})/;
    this.value = this.$store.state.invite.invite.realname;
    this.value = this.value.replace(reg, "*"); //replace方法的返回值是一个新字符串，原字符串并没有改变
    // *替换手机号
    var reg1 = /^(\d{3})\d+(\d{4})$/;
    this.value1 = this.$store.state.invite.invite.mobile;
    this.value1 = this.value1.replace(reg1, "$1****$2"); //replace方法的返回值是一个新字符串，原字符串并没有改变
    // return this.value,this.value1;
  },
  ifbank(show){
          //  this.showDialog = show;
          this.bankpopupVisible = show;
        },

 },
 created(){
   this.changeValue();
 }
}
</script>

<style lang="scss" scoped>
body {
 
  .left {
    float: left;
  }
  .mtop {
    margin-top: 0.1rem;
  }
  .mineContents {
    /*  margin: 0 0.11rem 0;
        border-radius: 0.07rem;
 */
    width: 100%;
    height: auto;
    font-size: 14px;
    overflow: hidden;
    background: #f9f9f9;
    position:absolute;
    height:100%;
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

    .mineContents-3 {
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
          .noSign{
            color: #fe6633;
          }
          span {
            margin-right: 0.1rem;
          }
          .mineContent-3-c-ls {
            margin-right: 0;
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
         .popupVisibleBox{
          width:3.25rem;
          padding:0 0.31rem 0 0.26rem;
          p:nth-child(1){
            font-size:0.19rem;
            color:#2b2b2b;
            font-weight:bold;
            padding-top:0.25rem;
          }
          p:nth-child(2){
            font-size:0.15rem;
            color:#2b2b2b;
            padding-top:0.15rem;
          }
          p:nth-child(3){
            padding:0.52rem 0 0.21rem 0;
            display:flex;
            justify-content:flex-end;
            span{
              color:#147970;
              font-size:0.14rem;
            }
            span:nth-child(1){
              margin-right:0.4rem;
            }
          }
        }
      }
    }
  }
}
</style>
