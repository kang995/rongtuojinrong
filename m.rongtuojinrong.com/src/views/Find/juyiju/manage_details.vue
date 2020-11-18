<!-- 聚一聚 管理报名审核通过页面--> 
<template>
  <div class="TomandelBox">
    <!-- 头部 -->
    <!-- <mt-header :title="this.$route.query.realname">
      <router-link :to="{name:'manage'}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox :title="this.$route.query.realname"></headerBox>

    <div class="mandel">
      <div class="mandela">
        <div class="mantext">
          姓名   
          <span class="c3">{{this.$route.query.realname}}</span>
        </div>
        <div class="mantext">
          手机
          <span class="c3">{{this.$route.query.mobile}}</span>
        </div>
        <ul class="mantul">
          <li>
            <a :href="'tel:' + this.$route.query.mobile" class="classphoto">
              <img src="../../../assets/g_01.jpg" alt />
              <span>打电话</span>
            </a>
          </li>
          <li>
            <img src="../../../assets/g_02.jpg" alt />
            <span>发短信</span>
          </li>
          <li @click="getenrolladopt">
            <img src="../../../assets/g_05.jpg" alt />
            <!-- <span v-if="enrol.status==0">已通过</span> -->
            <span v-if="this.$route.query.sub_status==2">已通过</span>
            <span v-else>通过</span>
          </li>
           <li @click="showenail" v-if="play">
            <img src="../../../assets/g_03.jpg" alt />
            <span class="c9">拒绝报名</span>
          </li> 
        </ul>
        <!--   拒绝报名弹窗 -->
        <van-dialog v-model="show" show-cancel-button 
          @cancel="cancelPickerenail"
          @confirm="confirmPickerenail"
        >
          <div class="refuse">
            <p>真的要拒绝此用户参加本次活动吗？</p>
            <p>拒绝后此人将从报名列表中消失</p>
          </div>
        </van-dialog>

        <!-- 通过报名弹窗 -->
        <van-dialog
          v-model="getenrolladopts"
          show-cancel-button
          @cancel="cancelPicker"
          @confirm="confirmPicker"
        >
          <div class="refuse">确定同意此用户参加本次活动吗？</div>
        </van-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
import { Toast } from "vant";
Vue.use(Toast);
// 全局注册
Vue.use(Dialog);
export default {
  data() {
    return {
      show: false,
      enrol: [],
      enroltwo: [],
      getenrolladopts: false,
      play:true,
      timer: '',
       
    };
  },
  methods: {
    getenrolladopt(){ 
      if(this.$route.query.sub_status==1){
        this.getenrolladopts = true;
      }
      else{
        return;
      }
      },
    cancelPicker() {
      // 取消按钮点击事件
      this.getenrolladopts = false;
    },
    confirmPicker(){
       this.$post("/rongtuojinrong/activity/juyiju/ItemAccept.json", {
        activity_id: this.$route.query.activity_id,
        mobile: this.$route.query.mobile
      }).then(res => {
        this.enroltwo = res.data;
        console.log();
        this.getenrolladopts = false;
         Toast("活动审核通过");
         this.play=false;
        setTimeout(()=>{
         this.$router.push('/manage')
       },1000);
      });  
    },

    //拒绝报名弹出弹窗
    showenail(){
          this.show = true;
    },
cancelPickerenail(){
  //拒绝报名弹窗取消
  this.show = false;
},
confirmPickerenail(){
  //拒绝确认（列表页删除此人信息）
   this.$post("/rongtuojinrong/activity/juyiju/ItemDeny.json",{
        activity_id: this.$route.query.activity_id,
        //submit_user_id: this.$route.query.user_Id,
        mobile: this.$route.query.mobile
  }).then(res =>{
         this.enrol = res.data;
        console.log( res.data);
        this.show = false;

        Toast("已成功拒绝此用户参加活动"); 
         setTimeout(()=>{
         this.$router.push('/manage')
       },1500);
  }).catch(err=>{
        console.log(err);
      }); 
 
},
  },
created(){
   //this.getenrolladopt();
 if(this.$route.query.sub_status==2){
  this.play=false;
  
 }
 } 
};
</script>

<style lang="scss">
  .TomandelBox {
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #f9f9f9;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .displayNO {
    display: none;
  }
  .clear {
    clear: both;
  }
  .c3 {
    color: #333;
  }
  .cf5 {
    color: #ff5715;
  }
  .c9 {
    color: #999 !important;
  }
  .f12 {
    font-size: 0.12rem;
  }
  .tr {
    text-align: right;
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
        overflow: visible;
      }
      .mint-button-text {
        display: block;
        color: #333333;
        font-weight: normal;
        margin: 0;
      }
    }

    .img_button {
      width: 0.16rem;
      height: 0.165rem;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .head_nav {
      margin-top: 0.5rem;
      height: 0.46rem;
      overflow: hidden;
      li {
        width: 50%;
        float: left;
        height: 0.46rem;
        line-height: 0.46rem;
        text-align: center;
        border-bottom: 1px solid #e5e9f2;
        background: #fff;
      }
      .router-link-active {
        color: #0159d5;
        border-bottom: 1px solid #0159d5;
      }
    }
    .mandel {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-top: 0.1rem;
      .mandela {
        width: 100%;
        height: 1.25rem;
        background: #fff;
        margin-top: 0.5rem;

        .mantext {
          height: 0.4rem;
          line-height: 0.4rem;
          color: #999;
          padding-left: 0.15rem;
          border-bottom: 1px solid #e5e9f2;
          font-size: 0.14rem;
          span {
            padding-left: 0.2rem;
          }
        }

        .mantul {
          width: 100%;
          display: flex;
          height: 0.42rem;
          align-items: center;
          /* justify-content:space-between; */
          li {
           /*  width: 25%; */
            height: 0.21rem;
            width:calc(100%);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            border-right: 1px solid #e5e9e5;
            span {
              color: #333;
              font-size: 0.14rem;
              padding-left: 0.05rem;
            }
            .classphoto {
              display: flex;
              align-items: center;
            }
          }
          li:nth-child(1) img {
            width: 0.14rem;
            height: 0.12rem;
          }
          li:nth-child(2) img {
            width: 0.15rem;
            height: 0.12rem;
          }
          li:nth-child(3) img {
            width: 0.15rem;
            height: 0.15rem;
          }
          li:nth-child(4) img {
            width: 0.12rem;
            height: 0.12rem;
          }
          li:last-child {
            border-right: none;
          }
        }
      }
      .refuse {
        padding: 0.15rem 0.1rem;
        text-align: center;
        p:first-child {
          color: #333;
        }
        p:last-child {
          color: #999;
          font-size: 0.12rem;
        }
      }
    }
  }
</style>
 