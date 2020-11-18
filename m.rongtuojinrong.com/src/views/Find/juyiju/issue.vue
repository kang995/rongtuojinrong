<!-- 聚一聚 发布任务--> 
<template>
  <div class="issueBox">
    <!-- 头部 -->
    <!-- <mt-header title="组织聚会">
      <router-link to="/m" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
     <mt-button slot="right"  @click="activityissue">发布</mt-button>
    </mt-header> -->
   <headerBox title="组织聚会">
      <span slot="rightTo" class="right_content"  @click="activityissue">发布</span>
    </headerBox>

    <div class="issueclass">
      <form>
      <div class="theme">
        活动主题：
        <input type="text" name="" v-model="title"/>
      </div>
      <!-- ref="termend" 
          @cancels="cancelPicker"
          @confirms="confirmPicker"
      datePickers="currentDate"
          :formatter="formatter"
      -->
      <div class="themes" @click="TwopenPicker" >
        活动时间：
        <span ref="TWOtermStart" class="c3"></span> --
        <span ref="TWOendStart" class="c3"></span>
      </div>
         <van-popup v-model="showtwo">
          <van-datetime-picker
            v-model="startTime"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            :visible-item-count="3"
            @cancel="cancelPickertwo"
            @confirm="confirmPickertwo"
            datePicker="startTime"
            title="活动开始时间"
          />
        </van-popup>
        <!-- 结束时间    @cancel="cancelPickerTwo"
         
        datePickerShree="currentDates_Shree"-->
        <van-popup v-model="showshree">
          <van-datetime-picker
            v-model="endTime"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            :visible-item-count="3"
            title="活动结束时间"
            datePicker="endTime"
            @cancel="cancelPickertwo"
            @confirm="confirmPicker_s"
             
          />
        </van-popup>

      <div class="theme mt0" @click="openPicker">
        报名截止：
        <span class="c3" ref="termStart"></span>
      </div>
      <!--   代码   v-if="datePicker == 'currentDate' " -->
      <van-popup v-model="show">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          :visible-item-count="3"
          @cancel="cancelPicker"
          @confirm="confirmPicker"
          datePicker="currentDate"
          
        />
      </van-popup>
      <div class="theme add adddf">
        <span>活动地点：</span>
        <van-radio-group v-model="radio">
          <van-radio name="济南">济南</van-radio>
          <van-radio name="聊城">聊城</van-radio>
        </van-radio-group>
      </div>
      <div class="themetext clear">
        <p>活动详情:</p>
        <textarea rows="3" cols="20" name="comment" required v-model="conter"></textarea>
      </div>
      <br />
      <div class="theme">
        人数上限：
        <input type="number"  v-model="sums"/>
      </div>
     </form>

      <div class="theme df">
        <van-checkbox v-model="checked" disabled>同意</van-checkbox>
        <router-link class="bc" :to="{name:'xieyi'}">《聚一聚服务协议》</router-link>
      </div>
    </div>

    <!-- 底部 -->
    <!-- <ul class="nav displayNO">
      <router-link :to="{name:'meet'}" tag="li">
        <img src="../../../assets/ju.png" alt />
        <span class="a1">我的参与</span>
      </router-link>
      <router-link :to="{name:'issue'}" tag="li">
        <img src="../../../assets/img102.png" alt />
        <span>发布</span>
      </router-link>
      <router-link :to="{name:'mypublish'}" tag="li">
        <img src="../../../assets/ju0.png" alt />
        <span>我的发布</span>
      </router-link>
    </ul> -->
  </div>
</template>

<script>
import Vue from "vue";
import { DropdownMenu, DropdownItem } from "vant";
Vue.use(DropdownMenu).use(DropdownItem);
import { Toast } from 'vant';
export default {
  data() {
    return {
      show: false,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2029, 10, 1),
      currentDate: new Date(),
      showtwo: false,
      showshree: false,
      currentDates_Two: new Date(),
      currentDates_Shree: new Date(),
      checked: true,
      radio: "济南",
      startTime: new Date(), // 开始时间
      endTime: new Date(), // 结束时间
      title:'',//发布活动主题
      sums:'', //活动上限人数
      conter:'',//活动详情
      issue:''
    };
  },
  methods: {
    openPicker() {
      ////活动截止弹出层并显示时间选择器
      this.show = true;
      //this.datePicker = picker;
    },
    cancelPicker() {
      // 活动截止选择器取消按钮点击事件
      this.show = false;
      this.datePicker = "";
    },
    confirmPicker(value) {
      // 确定按钮，时间格式化并显示在页面上
      var date = value;
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var min = date.getMinutes();
      var timer = date.getFullYear() + "-" + m + "-" + d + " " + h + ":" + min;
      //  console.log(this.$refs['termStart'])
      this.$refs["termStart"].innerHTML = timer;
      this.show = false;
      this.datePicker = "";
    },
    //活动开始弹出层显示时间选择器
    TwopenPicker() {
      this.showtwo = true;
      //this.show = false;
    },
    //活动开始取消按钮
    cancelPickertwo() { 
      this.showtwo = false;
      this.showshree= false;
      this.datePicker = "";
    },

    //开始第一确定弹窗
    confirmPickertwo(value) {
      this.showtwo = false;
      this.showshree = true;
      var date = value;
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var min = date.getMinutes();
      var timer =
        date.getFullYear() + "-" + m + "-" + d + " " + h + ":" + min;
      //  console.log(this.$refs['termStart'])
      this.$refs["TWOtermStart"].innerHTML = timer;
       /* var timer = parseInt(value.getTime() / 1000);
       this.start_time= timer;
       console.log(timer) */;
      this.datePicker = "";
    },

    //第二确定
    confirmPicker_s(value) {
      var date = value;
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var min = date.getMinutes();
      var timer = date.getFullYear() + "-" + m + "-" + d + " " + h + ":" + min;
      //  console.log(this.$refs['termStart'])
      this.$refs["TWOendStart"].innerHTML = timer;
      this.showshree = false;
      this.datePicker = "";
    },
     //发布
    activityissue(){
    if (!this.title) {
           Toast('活动主题不能为空！')
            return false
      }
      if (!this.$refs["TWOtermStart"].innerHTML & !this.$refs["TWOendStart"].innerHTML) {
           Toast('活动时间不能为空！')
            return false
        }  
     if (!this.$refs["termStart"].innerHTML) {
           Toast('报名截止时间不能为空！')
            return false
        } 
        /*  if (this.$refs["termStart"].innerHTML > this.$refs["TWOendStart"].innerHTML & this.$refs["TWOtermStart"].innerHTML) {
           Toast('报名截止时间不能大于活动结束时间！')
            return false
        }  */ 

      if (!this.conter) {
           Toast('活动详情不能为空！')
            return false
        } 
 if (!this.sums) {
           Toast('人数上限不能为空！')
            return false
        } 
    this.$post("/rongtuojinrong/activity/juyiju/ActivityPublish.json",{
   // user_id:31753,
    topic:this.title,
    submit_limit:this.sums,
    content:this.conter,
    activity_start_time:this.$refs["TWOtermStart"].innerHTML,
    //activity_start_time:this.start_time,
    activity_end_time:this.$refs["TWOendStart"].innerHTML,
    submit_end_time:this.$refs["termStart"].innerHTML,
    address:this.radio,
   }).then(res =>{
      this.issue=res.data;
       Toast('发布成功请等待审核!')
      setTimeout(() => {    
          this.$router.push("/meets");
        }, 1800); 
   });
    

  },
  },
  //  created(){
  //    this.activityissue();
  //  },
};
</script>
<style lang="scss">
.datePickerDemo {
  .head {
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #f60;
  }
  .demo {
    display: flex;
    justify-content: space-around;
    padding: 0 15px;
    border-bottom: 1px gray solid;
    span {
      flex-basis: 50%;
      font-size: 16px;
      line-height: 50px;
    }
    .format {
      text-align: left;
    }
    .show {
      text-align: right;
    }
  }
  .demo1 {
    padding: 0 15px;
    border-bottom: 1px gray solid;
    font-size: 16px;
    line-height: 50px;
    .format {
      text-align: left;
    }
    .show {
      text-align: right;
    }
  }
}
  .issueBox {
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #f9f9f9;
        overflow: hidden;
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
  .mt0 {
    margin-top: 0;
  }
  .c3 {
    color: #333;
  }
  .bc {
    color: #0159d5;
  }
    /*  .mint-header {
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

    .img_button {
      width: 0.16rem;
      height: 0.165rem;
      overflow: hidden;
      img {
        width: 100%;
      }
    }  */
    .issueclass {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-top: 0.6rem;
      margin-bottom: 0.8rem;
      .theme {
        padding-left: 0.1rem;
        height: 0.44rem;
        background: #fff;
        line-height: 0.44rem;
        text-align: left;
        color: #999;
        margin-bottom: 0.1rem;
        input {
          width: 70%;
          height: 0.44rem;
          padding-left: 0.06rem;
          border: none;
          color: #333;
          background: #fff;
        }
        .van-radio__icon {
          font-size: 15px;
        }
        .van-radio-group {
          display: flex;
          width: 35%;
          justify-content: space-between;
          margin-left: 0.1rem;
        }
      }
      .df {
        display: flex;
        background: #f9f9f9 !important;
      }
      .adddf{display: flex;}
      .themes {
        padding-left: 0.1rem;
        height: 0.45rem;
        background: #fff;
        line-height: 0.44rem;
        text-align: left;
        color: #999;
        border-bottom: 1px solid #e5e9f2;
        input {
          width: 70%;
          height: 0.44rem;
          padding-left: 0.06rem;
          border: none;
          color: #333;
          background: #fff;
        }
      }
      .add input {
        width: 20px;
        height: auto;
        font-weight: normal;
      }

      label {
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: normal;
      }
      .themetext {
        p {
          padding: 0.1rem;
        }
        textarea {
          width: 100%;
          border: none;
          padding: 0.1rem;
          resize: none;
          height: 1.95rem;
        }
      }

      .raw {
        width: 0.15rem !important;
        height: auto !important;
      }
      .van-popup {
        width: 90%;
      }
    }

    .theme span.bc {
      color: #0159d5;
    }

    .nav {
      width: 100%;
      height: 0.52rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      border-top: 1px solid #ebeefc;
      li {
        height: 0.96rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 0.01rem;
        img {
          width: 0.2rem;
          height: 0.2rem;
        }
        span {
          font-size: 0.11rem;
          color: #505050;
          margin-top: 0.08rem;
        }
      }
      li:nth-child(2) {
        width: 0.5rem;
        border-radius: 0.5rem;
        border-top: 1px solid #ebeefc;
        background: #fff;
        position: relative;
        img {
          width: 0.38rem;
          height: 0.38rem;
          position: absolute;
          top: 4px;
        }
        span {
          margin-top: 0.26rem;
        }
      }
    }
    .van-ellipsis {
    overflow: hidden;
     white-space: inherit; 
     text-overflow: inherit; 
}
  }
</style>
 