<!--我的~~安全设置~实名认证~未认证~原号码停用更换绑定手机号--->
<template>
  <div class="mineContents">
    <!-- 头部 -->
  <!--   <mt-header title="更换绑定手机号">
      <router-link to="/safe" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
<headerBox title="更换绑定手机号"></headerBox>

    <ul class="mineContent-3">
      <li>
        <p class="p1 c3">
          <i class="jt"></i>基于安全考虑，若原手机号已停用，请进行一下身份验证，如有疑问请致电：
          <span class="cju">400-878-8686</span>
        </p>
      </li>
      <li>
        <input
          type="text"
          placeholder="请输入姓名/企业名称"
          class="addphoto"
          v-model="clear_input1"
          @input="changeShow1"
          @blur="change1"
          @focus="nav1"
          :readonly="threa"
        />
        <!-- {{clear_input2|guolv}} -->
        <img @click="clearInput1" v-show="Show1" src="../../../assets/delect_03.jpg" alt />
      </li>
      <li>
        <input
          type="number"
          placeholder="请输入身份证号/营业执照编号"
          class="addphoto"
          v-model="clear_input2"
          @input="changeShow2"
          @blur="change2"
          @focus="nav2"
           :readonly="threa"
        />
        <img @click="clearInput2" v-show="Show2" src="../../../assets/delect_03.jpg" alt />
      </li>
      <li>
        <input
          type="number"
          placeholder="请输入绑定银行卡号/绑定的对公账户"
          class="addphoto"
          v-model="clear_input3"
          @input="changeShow3"
          @blur="change3"
          @focus="nav3"
          :readonly="threa"
        />
        <img @click="clearInput3" v-show="Show3" src="../../../assets/delect_03.jpg" alt />
      </li>
      <li>
        <p class="p1 c3">
          添加同时手持身份证和银行卡正面照
          <br />
          <span class="cju f12">(企业用户添加营业执照和法人身份证扫描件，须扫描至一页)</span>
        </p>
      </li>

      <br />

      <li>
        <!-- 上传图片 -->
        <div class="uplod">
          <van-uploader :class="{zzShow:isCz}" :disabled="isuplod" :after-read="afterRead" >
            <van-button icon="photo" type="primary">上传图片</van-button>
            <img v-if="sqobj.reviewStatus==0" class="upadd" src="../../../assets/ld_13.png">
            <span v-if="sqobj.reviewStatus!=0" class="showRe">{{shResult}}</span>
          </van-uploader>
        </div>

      </li>
   
      <li>
        <p class="p1 c3">
          <i class="jt2"></i>融托金融有权限对违规、恶意上传操作进行封号等处理
        </p>
      </li>

      <li>
        <div v-if="sqobj.reviewStatus==2" class="photoend nophotoend">
          <button>下一步</button>
        </div>

        <div v-else class="photoend" @click="clickNext">
          <button>下一步</button>
        </div>


      </li>
    </ul>

    <!-- 弹窗 -->
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <div class="popuptop">温馨提示</div>
      <div class="popupmiddle">您的请求已提交，系统将在3个工作日内进行审核，请关注审核结果！</div>
      <div class="popupbottom" @click="isShow">返回账户</div>
    </mt-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Uploader } from "vant";
Vue.use(Uploader);
export default {
  data() {
    return {
      sqobj: {},
      clear_input1: "",
      clear_input2: "",
      clear_input3: "",
      Show1: "",
      Show2: "",
      Show3: "",
      shResult: '',
      isCz: false,
      requestID: 0,
      Filepic: '',
      popupVisible: false,
      isuplod: false,
      threa:false,
    };
    
  },
  methods: {
    //查询之前是否提交更换手机号申请
    chaXun(){
      this.$post('/rongtuojinrong/userCenter/securitySetting/mobileDisable/reviewStatus.json',{
        defidenshuxing: this.$store.state.invite.defidenshuxing,
      })
      .then(res=>{
          console.log(res.data.data);
          //审核状态
          if(res.data.data.reviewStatus==1){
            this.isCz = true;          
            this.shResult='已通过';
            this.threa=true;
          };
          if(res.data.data.reviewStatus==2){
            this.isCz = true;          
            this.shResult='审核中';
            console.log(this.isuplod);
            this.isuplod = false;
            console.log(this.isuplod);
             this.threa=true;
          };
          if(res.data.data.reviewStatus==3){
            this.isCz = true;         
            this.shResult='已拒绝'
             this.threa=true;
          };                      
          this.sqobj = res.data.data;
          this.clear_input1 = res.data.data.userRealName;
          // *替换姓
           var reg = /^(\S{1})/;
           this.clear_input1 = res.data.data.userRealName;
           this.clear_input1 = this.clear_input1.replace(reg, "*"); //replace方法的返回值是一个新字符串，原字符串并没有改变
           this.clear_input2 = res.data.data.userIdNumber;
          this.clear_input3 = res.data.data.userBankCardNum;
          if(!res.data.data.requestID){
            this.requestID = 0;
            console.log(this.requestID);
          }else{
            this.requestID = res.data.data.requestID;
            console.log(this.requestID);
          }
   
      })
      .catch(err=>{
          this.$toast("发送失败，请重新点击获取");
      })  


    },

    isShow(){
      this.popupVisible = false;
      this.chaXun();
    },

    //原手机号已停用，点击此处进去执行下一步时调用
    clickNext(){
      this.$post("/rongtuojinrong/userCenter/securitySetting/mobileDisable/modifyMobileApply.json",
      { 
        IDNumber: this.clear_input2,
        account: this.clear_input3,
        name: this.clear_input1,
        requestID: this.requestID,
        filename: this.Filepic        
      })
      .then(res=>{
        //this.lists = res.data.data;
        console.log(res.data);
        if(res.data.status==1){
          this.$toast(res.data.msg);
        }
        if(res.data.status==0){
          this.popupVisible = true;;
        }
      })      
    },
    //上传图片
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      this.Filepic = file;
    },

    //1.清空输入框内容
    clearInput1() {
      this.clear_input1 = "";
      this.Show1 = false;
    },
    clearInput2() {
      this.clear_input2 = "";
      this.Show2 = false;
    },
    clearInput3() {
      this.clear_input3 = "";
      this.Show2 = false;
    },
    // 2.input事件删除按钮显示
    changeShow1() {
      this.Show1 = true;
    },
    changeShow2() {
      this.Show2 = true;
    },
    changeShow3() {
      this.Show3 = true;
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
    change3() {
      setTimeout(() => {
        this.Show3 = false;
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
    nav3() {
      if (this.clear_input3) {
        this.Show3 = true;
      } else {
        this.Show3 = false;
      }
    }
  },
  created(){
    this.chaXun();
  },
};
</script>

<style lang="scss" scoped>
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
  .fz12 {
    font-size: 0.12rem;
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
      margin: 0.5rem auto;
      position: relative;
      .p1 {
        text-align: center;
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

      .photoend {
        width: 100%;
        height: auto;
        overflow: hidden;
        position: fixed;
        left: 0;
        bottom: 0;
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
      .nophotoend{
        button{
          background-color: #CCC;
        }
      }
      .jt {
        background: url(../../../assets/sm_07.jpg) no-repeat;
        display: inline-block;
        width: 0.16rem;
        height: 0.17rem;
        background-size: 85%;
        vertical-align: middle;
      }
      .jt2 {
        background: url(../../../assets/sm_06.jpg) no-repeat;
        display: inline-block;
        width: 0.16rem;
        height: 0.17rem;
        background-size: 85%;
        vertical-align: middle;
      }
      .uplod {
        margin: 0.25rem;
        background: url(../../../assets/sm_08.png) no-repeat;
        background-size: 100%;
        .zzShow{
          background-color: #d2e9f9;
          opacity: 0.8;
          }
          .showRe{
            position: absolute;
            top: 0.5rem;
            left: 0.85rem;
            color: #99bbd7;
            font-size: 0.5rem;
          }
          .upadd{
            width: 0.45rem;
            height: auto;
            top: 0.7rem;
            left: 1.4rem;
          }
          .van-button--primary {
            width: 100%;
            height: 1.7rem;
            overflow: hidden;
          }
          .van-button--normal {
            padding: 0 1.5rem;
            font-size: 14px;
            opacity: 0;
          }
        


      }
      li {
        position: relative;
        img {
          width: 0.17rem;
          height: 0.14rem;
          position: absolute;
          top: 0.2rem;
          right: 0.1rem;
        }
      }
    }
    .mint-popup{
      width: 3rem;
      height: 1.4rem;
      border-radius: 0.1rem;
      text-align: center;
      .popuptop{
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.15rem;
        color: black;
      }
      .popupmiddle{
        font-size: 0.13rem;
        padding: 0 0.4rem 0.25rem;
        text-align: left;        
      }
      .popupbottom{
        font-size: 0.14rem;
        color: #0159d5;
      }
    }

  }
</style>
