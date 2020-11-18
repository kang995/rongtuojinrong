<!--我的~安全设置~实名认证~开通银行存管--->
<template>
  <div class="realmineContents2">
    <!-- 头部 -->
    <!-- <mt-header title="开通存管">
      <router-link to="/safe" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox title="开通存管账户"></headerBox>
    <!--页面判断2中状态1已实名、2未实名 -->

    <div class="mineContent-3">
      <div class="minimg">
        <img src="@/assets/sm_01.jpg" />
      </div>
      <div class="bdka">
       <span class="left">请绑定本人的储蓄卡，目前仅支持绑定一张卡</span>
        <span class="tjbank" @click="showTjyh">推荐银行</span>
      </div>
      <ul>
        <li>
          <input
            type="text"
            placeholder="请输入持卡人姓名"
            class="inputname"
            v-model="clear_input1"
            @input="changeShow1"
            @blur="change1"
            @focus="nav1"
          />
          <img @click="clearInput1" v-show="Show1" src="../../../assets/delect_03.jpg" alt />
        </li>
        <li>
          <input
            type="text"
            placeholder="请输入持卡人身份证号"
            class="inputsfz"
            v-model="clear_input2"
            @input="changeShow2"
            @blur="change2"
            @focus="nav2"
          />
          <img @click="clearInput2" v-show="Show2" src="../../../assets/delect_03.jpg" alt />
        </li>
        <li>
          <input type="text" v-model="value1" readonly class="inputphoto" />
          <router-link tag="a" to='/photo' class="right textinput">更换</router-link>
        </li>
      </ul>
      <p>
        <i class="jing"></i> &nbsp;注册手机号和银行卡预留手机号必须一致
      </p>
      <div class="fuwu">
        <input type="checkbox" v-model="check"/>
        <span>
          我已阅读并同意
          <router-link tag="span"  to='/ptxieyis'   class="c_blue">《融托金融用户服务协议》</router-link>和
          <router-link tag="span" to='/ptxieyi'  class="c_blue">《网贷平台风险提示及禁止性行为》</router-link>
        </span>
      </div>

      <div class="endbutton" @click="subinfo">
        <button>确定</button>
      </div>

      <!-- 弹出框 -->
      <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade"
        :closeOnClickModal="false">
        <div class="cgpop">
          <div class="cgpop-1">请先同意《融托金融用户服务协议》和《网贷平台风险提示及禁止性行为》</div>
          <div class="cgpop-2" @click="closecgpop">确定</div>
        </div>
      </mt-popup>

      <!-- 推荐银行弹出框 -->
      <mt-popup
        class="tjpopall"
        v-model="popupVisible1"
        popup-transition="popup-fade"
        :closeOnClickModal="false"
        >
        <div class="tjpop">
          <div class="tjpop-1">
            <div class="tjpop-1-a"></div>
            <div class="tjpop-1-b">推荐银行</div>
            <div class="tjpop-1-c"></div>
          </div>
          <div class="tjpop-3">
            <span>渠道银行</span>
            <span>单笔/每日</span>
          </div>
          <div class="tjpop-2">
            <div class="tjpop-2-a tjpop-2-b" v-for="bankdetail in banklist" :key="bankdetail.Id">
              <span>{{bankdetail.BankName}}</span>
              <span>{{bankdetail.CashAmt}}</span>
            </div>
          </div>
          <div class="tjpop-4" @click="closecgpop1">
            <img src="../../../assets/tc_close_01.png">
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components:{

  },
  data() {
    return {
      clear_input1: "",
      clear_input2: "",
      Show1: "",
      Show2: "",
      // value: '',
      value1:'',
      check:'',
      popupVisible: false,
      popupVisible1: false,
      banklist: [],
    };
  },
  computed:{
     value:{
          get(){
            return this.$store.state.invite.invite.mobile;
          },
          set(val){
           this.$store.state.invite.invite.mobile = val;
          }
      }
    },
  methods: {
    showTjyh(){
      this.popupVisible1 = true;        
    },
    closecgpop(){
      this.popupVisible = false;
    },
    closecgpop1(){
      this.popupVisible1 = false;
    },

    //1.清空输入框内容
    //this.$store.state.invite.invite.mobile
    clearInput1() {
      this.clear_input1 = "";
      this.Show1 = false;
    },
    clearInput2() {
      this.clear_input2 = "";
      this.Show2 = false;
    },
    // 2.input事件删除按钮显示
    changeShow1() {
      this.Show1 = true;
    },
    changeShow2() {
      this.Show2 = true;
    },
    //3.blur事件
    change1() {
      setTimeout(() => {
        this.Show1 = false;
      }, 0);
    },
    change2() {
      setTimeout(() => {
        this.Show2 = false;
      }, 0);
    },
    //4.focuss事件
    nav1() {
      if (this.clear_input1) {
        this.Show1 = true;
      } else {
        this.Show1 = false;
      }
    },
    nav2() {
      if (this.clear_input2) {
        this.Show2 = true;
      } else {
        this.Show2 = false;
      }
    },
  /*   subinfo(){
      if(this.check){
        this.$post('/rongtuojinrong/userCenter/securitySetting/realnameAuthentication.json',{
          xingming: this.clear_input1,
          shenfenzheng: this.clear_input2,
          shouji: this.$store.state.invite.invite.mobile
        })
        .then(res=>{
            if(res.data.status==1){
              this.$toast(res.data.msg);
            }else{
              this.$toast("提交成功");             
            }            
        })
        .catch(err=>{
            this.$toast("提交失败，请重新提交");
        })  
      }else{
        this.popupVisible = true;
        return
      } 
    }, */
      
    subinfo(){
     if(this.clear_input1==""){
        Toast("请输入持卡人姓名！");
       return false;
     }
     if(this.clear_input2==""){
        Toast("请输入持卡人身份证号！");
       return false;
     }
      if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.clear_input2)){
       Toast("请输入正确格式的持卡人身份证号！");
       return false;
     } 
     if(this.check){
         setTimeout(()=>{
            this.$router.push({
              name:'confirmrealname',query:{xingming:this.clear_input1,shenfenzheng:this.clear_input2,shouji:this.$store.state.invite.invite.mobile}}
              
              ) },1500) 
      }else{
        this.popupVisible = true;
        return
      } 
    },


    //通过正则隐藏手机号中间位的方法
    changeValue(){
      var reg = /^(\d{3})\d+(\d{4})$/;
      // this.value1 = this.$store.state.invite.invite.mobile;
      this.value1 = this.value.replace(reg, "$1****$2"); //replace方法的返回值是一个新字符串，原字符串并没有改变
      return this.value1;
      // console.log(this)
    }
  },
  
  created(){
      this.$store.state.invite.invite.mobile&&this.changeValue();
      // console.log(this.$store)
      //通过正则隐藏手机号中间位
      // this.value = this.$store.state.invite.invite.mobile;
      // var reg = /^(\d{3})\d+(\d{4})$/;
      // this.value = this.value.replace(reg, "$1****$2");

      //推荐银行列表  
      this.$post('/rongtuojinrong/userCenter/securitySetting/recommendBandList.json',{
        defidenshuxing: this.$store.state.invite.defidenshuxing
      })
      .then(res=>{
          this.banklist = res.data.data.CardsList;
          
      })
      .catch(err=>{
          this.$toast("获取银行列表失败，请重新打开");
      })
      //正则身份证
      
  }
};
</script>

<style lang="scss">
  .realmineContents2 {
    width: 100%;
    font-size: 14px;
    height: 100%;
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
  .fz12 {
    font-size: 0.12rem;
  }
  .c_blue {
    color: #0558da;
  }
    .mineContent-3 {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin: 0.5rem auto;
      .minimg {
        width: 100%;
        height: 1.41rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .bdka {
        height: auto;
        border-bottom: 1px solid #e5e9f2;
        padding: 0 0.05rem;
        line-height: 0.4rem;
        text-align: left;
        background: #fff;
        .tjbank {
          padding: 0.02rem 0.08rem;
          background: #0099e9;
          border-radius: 0.15rem;
          color: #fff;
          float: right;
          line-height: 0.2rem;
          margin-top: 0.07rem;
          font-size: 0.12rem;
          //display: block;
        }
      }

      ul {clear: both;
        li {
          height: 0.58rem;
          border-bottom: 1px solid #e5e9f2;
          background: #fff;
          padding: 0 0.1rem;
          position: relative;
          .textinput {
            float: right;
            display: block;
            line-height: 0.58rem;
            color: #0458d2;
            font-size: 0.14rem;
            font-weight: 600;
          }
          img {
            width: 0.17rem;
            height: 0.14rem;
            position: absolute;
            top: 0.2rem;
            right: 0.1rem;
          }
        }
        .inputname {
          background: url(../../../assets/sm_02.jpg) no-repeat;
          text-indent: 0.35rem;
          background-size: 8%;
          height: 0.56rem;
          width: 100%;
          background-position-y: 0.2rem;
          border: none;
        }
        .inputsfz {
          background: url(../../../assets/sm_03.jpg) no-repeat;
          text-indent: 0.35rem;
          background-size: 8%;
          height: 0.56rem;
          width: 90%;
          background-position-y: 0.2rem;
          border: none;
        }
        .inputphoto {
          background: url(../../../assets/sm_04.jpg) no-repeat;
          text-indent: 0.35rem;
          background-size: 8%;
          height: 0.56rem;
          width: 80%;
          background-position-y: 0.2rem;
          border: none;
          float: left;
        }
      }
      p {
        font-size: 0.12rem;
        padding: 0.1rem;
        color: #999;
        .jing {
          background: url(../../../assets/sm_05.jpg) no-repeat;
          background-size: 100%;
          display: inline-block;
          width: 0.11rem;
          height: 0.12rem;
        }
      }
      .fuwu {
        text-align: center;
      }
      .endbutton {
        width: 100%;
        height: auto;
        overflow: hidden;
        padding: 0.1rem;
        margin: 0.2rem auto;
        button {
          height: 0.42rem;
          width: 100%;
          border-radius: 0.04rem;
          background: #005ad4;
          text-align: center;
          border: none;
          color: #fff;
          letter-spacing: 0.02rem;
        }
      }
      .mint-popup{
        width: 2.45rem;
        border-radius: 0.2rem;
        text-align: center;
        font-size: 0.15rem;
        color: #333;
        font-weight: bold;  
        .cgpop{
          .cgpop-1{
            padding: 0.2rem;
            border-bottom: 1px solid #ddd;
            font-weight: normal;
            font-size: 0.14rem;
          }
          .cgpop-2{
            height: 0.35rem;
            line-height: 0.35rem;
            color: #0159d5;
            font-size: 0.14rem;
           font-weight: normal;
          }
        }
      }
      .tjpopall{
        width: 3rem;
        height: 4rem;
        font-size: 0.1rem;
        .tjpop{
          .tjpop-1{
            display: flex;
            justify-content: space-around;
            margin-top: 0.2rem;
            font-size: 0.14rem;
            .tjpop-1-a{
              border-top: 1px solid #0159d5;
              width: 0.8rem;
              margin-top: 0.1rem;
            }
            .tjpop-1-b{
              color: #0159d5;
            }
            .tjpop-1-c{
              border-top: 1px solid #0159d5;
              width: 0.8rem;
              margin-top: 0.1rem;
            }
          }
          .tjpop-2{
            height: 3.3rem;
            overflow: auto;
            .tjpop-2-a{
              height: 0.3rem;
              line-height: 0.3rem;
            }
            .tjpop-2-b{
              color: #999;
              font-weight: normal;
              display: flex;
              span{
                display: block;
                width: 50%;
              }
            }
          }
          .tjpop-3{
            display: flex;
            justify-content: space-around;
            height: 0.3rem;
            line-height: 0.3rem;
          }
          .tjpop-4{
            width: 0.3rem;
            margin: 0.3rem auto;
            img{
              max-width: 100%;
              height: auto;
            }
          }
        }
      }


    }
  }
</style>
