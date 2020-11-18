<!--普通用户我的邀请好友列表-->
<template>
  <div class="friderlistBox">
    <!-- 头部 -->
    <!-- <mt-header  title="邀请好友列表">
      <router-link to="/commonuser" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="openPicker">筛选</mt-button> 
    </mt-header>-->
    <headerBox title="邀请好友列表">
      <span slot="rightTo" class="right_content c_blue fz14" @click="openPicker">筛选</span>
    </headerBox>

    <van-popup v-model="show">
      <van-datetime-picker
        v-model="startTime"
        type="date"
        :visible-item-count="3"
        @cancel="cancelPicker"
        @confirm="confirmPicker"
        datePicker="startTime"
        title="日期"
      />
    </van-popup>
    <van-popup v-model="showser">
      <van-datetime-picker
        v-model="endTime"
        type="date"
        :visible-item-count="3"
        @cancel="cancelPicker"
        @confirm="confirmPicker_s"
        datePicker="endTime"
        title="日期"
      />
    </van-popup>
    <div class="friderlist"  v-if="sign!=null">
      <table>
        <tr>
          <th>好友手机号</th>
          <th>首次出借时间</th>
        </tr>
        <tr v-for="itme in firder" :key="itme.id">
          <td>{{itme.shouji}}</td>
          <td>{{itme.shijianxinde}}</td>
        </tr>
      </table>
      <div class="bottom_yq" @click="popupVisible=!popupVisible">立即邀请</div>
    </div>
      <div v-else class="nullinfo">
                <div class="shownull">
                    <img src="@/assets/sm_19.jpg">
                </div>
            </div> 
    <van-popup v-model="popupVisible" position="bottom" id="cc">
      <div class="popup_bottom">
        <P>选择要分享到的平台</P>
        <ol>
          <li>
            <img src="../../../assets/img16.png" alt />
            <span>微信好友</span>
          </li>
          <li>
            <img src="../../../assets/img17.png" alt />
            <span>朋友圈</span>
          </li>
          <li>
            <img src="../../../assets/img19.png" alt />
            <span>QQ</span>
          </li>
          <li>
            <img src="../../../assets/img18.png" alt />
            <span>微博</span>
          </li>
        </ol>
        <div class="fxx"></div>
        <button class="priend" @click="popupShow">取消</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { formatDate } from "../../../modules/datab.js";
import { Toast } from "mint-ui";
import Vue from "vue";
import { DropdownMenu, DropdownItem } from "vant";
Vue.use(DropdownMenu).use(DropdownItem);
import { METHODS } from "http";

export default {
  data() {
    return {
      firder: [], //列表
      page: 1,
      show: false,
      currentDate: new Date(),
      startTime: new Date(), // 开始时间
      endTime: new Date(), // 结束时间
      showser: false,
      popupVisible: false,
      sign:'',
    };
  },
  methods: {
    getList() {
      //列表接口
      this.$post(
        "/rongtuojinrong/userCenter/invite/ordinaryUser/friendsList.json",
        {
          defidenshuxing: this.$store.state.invite.defidenshuxing,
          page: this.page,
          starttime: this.starttimes,
          endtime: this.endtimes
        }
      ).then(res => {
        this.firder = res.data.data;
        this.sign = res.data.data;
      });
    },
    openPicker() {
      //活动截止弹出层并显示时间选择器
      this.show = true;
    },
    //取消
    cancelPicker() {
      this.show = false;
      this.showser = false;
      this.datePicker = "";
    },
    //第一个弹窗确定
    confirmPicker(value) {
      this.show = false;
      this.showser = true;
      var timer = parseInt(value.getTime() / 1000);
      console.log(timer);
      this.starttimes = timer; //获取开始的时间
      this.datePicker = "";
    },
    confirmPicker_s(value) {
      //var timer = date.getFullYear() + "-" + m + "-" + d; //时间格式
      var timer = parseInt(value.getTime() / 1000);
      console.log(timer);
      this.endtimes = timer; //获取结束时间
      this.showser = false;
      this.datePicker = "";
      //第二次日期选择后，根据开始结束日期筛选
      this.firder = [];
      this.getList();
    },
    //邀请分享
    popupShow() {
      this.popupVisible = false;
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="scss" >
.friderlistBox {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #fff;
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
  .c_blue {
    color: #0159d5;
  }
  .red {
    color: red;
  }
  .fz16 {
    font-size: 0.16rem;
  }
  .fz14 {
    font-size: 0.14rem;
  }
  .cju {
    color: #fe6633;
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
    .mint-button-icon {
      color: #333333;
    }
    .mint-header-title {
      font-size: 0.15rem;
      color: #333333;
    }
    .mint-button-text {
      display: block;
      color: #0159d5;
      font-weight: normal;
      margin: 0;
    }
    .mingxi {
      margin-left: 1rem;
      position: absolute;
      top: 0;
      left: 10%;
    }
  }
  .van-popup {
    width: 90%;
    margin: auto;
  }
  .mint-popup {
    border-radius: 0.1rem;
  }
  .img_button {
    width: 0.16rem;
    height: 0.165rem;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .friderlist {
    width: 100%;
    margin: auto;
    height: auto;
    overflow: hidden;
    padding-top: 0.5rem;

    table {
      width: 100%;
      text-align: center;
      td {
        line-height: 0.3rem;
        color: #999;
      }
      th {
        line-height: 0.45rem;
        color: #333;
        font-weight: normal;
        padding-top: 0.1rem;
      }
    }

    .Nodata {
      width: 1.19rem;
      height: 1.92rem;
      margin: auto;
      margin: 0.6rem auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .displayNO {
      display: none;
    }
    .bottom_yq {
      position: fixed;
      bottom: 0;
      background: #0159d5;
      height: 0.55rem;
      color: #fff;
      width: 100%;
      line-height: 0.55rem;
      text-align: center;
      z-index: 2;
    }
  }
  #cc {
    width: 100% !important;
  }
  .popup_bottom {
    width: 100%;
    height: auto;
    padding: 0.15rem 0.27rem 0 0.27rem;

    p {
      text-align: center;
      line-height: 0.3rem;
    }
    ol {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.85rem;
      padding-top: 0.2rem;
      li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        height: 0.75rem;
        img {
          width: 0.3rem;
          height: 0.3rem;
        }
        span {
          color: #1c1c1c;
          height: 0.1rem;
          margin-top: 0.07rem;
        }
      }
    }
    .priend {
      border: none;
      width: 100%;
      background: none;
      text-align: center;
      color: #333;
      /* margin-top: 0.1rem; */
      height: 0.4rem;
    }
    .fxx {
      height: 2px;
      border-top: 3px solid #f7f8fc;
      width: 100%;
    }
  }
    .nullinfo{
                background-color: #fff;
                display: flex;
                justify-content: center;
                margin-top: 1rem;
                .shownull{
                    width: 1.5rem;
                    img{
                        max-width: 100%;
                        height: auto;
                    }
                }
            }
}
</style>
