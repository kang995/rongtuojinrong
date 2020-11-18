<!--我的邀请~推荐客户--->

<template>
  <div
    class="Recommend"
  >
    <!-- 头部 -->
    <!--    <mt-header title="推荐客户">
      <router-link to="/myinviteindex" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link slot="right" to>
        <mt-button @click="openPicker">
          <img src="@/assets/sm_13.jpg" class="rimgtop" />
        </mt-button>
        <van-popup v-model="show">
          <van-datetime-picker
            type="date"
            @confirm="clickConfirm"
            @cancel="clickCancel"
            :visible-item-count="3"
            v-model="currentDate"
            title="开始日期"
          />
        </van-popup>

        <van-popup v-model="showser">
          <van-datetime-picker
            v-model="currentDate1"
            type="date"
            @confirm="clickConfirm1"
            @cancel="clickCancel"
            :visible-item-count="3"
            title="结束日期"
          />
        </van-popup>
      </router-link>
    </mt-header>-->

    <headerBox title="推荐客户">
      <span slot="rightTo" class="right_content">
        <router-link slot="rightTo" to>
          <mt-button @click="openPicker">
            <img src="@/assets/sm_13.jpg" class="rimgtop" />
          </mt-button>
          <van-popup v-model="show">
            <van-datetime-picker
              type="date"
              @confirm="clickConfirm"
              @cancel="clickCancel"
              :visible-item-count="3"
              v-model="currentDate"
              title="开始日期"
            />
          </van-popup>

          <van-popup v-model="showser">
            <van-datetime-picker
              v-model="currentDate1"
              type="date"
              @confirm="clickConfirm1"
              @cancel="clickCancel"
              :visible-item-count="3"
              title="结束日期"
            />
          </van-popup>
        </router-link>
      </span>
    </headerBox>


    <div class="recommendcount">
      <input
        type="text"
        placeholder="输入手机号或姓名搜索"
        class="sousuo"
        v-model="content"
        @change="clickChange"
      />
      <div>
        <ul class="listnav">
          <li>姓名</li>
          <li>注册时间</li>
          <li>
            <van-dropdown-menu :overlay="false">
              <van-dropdown-item v-model="value" :options="option1" @change="clickChoice()" />
            </van-dropdown-menu>
          </li>
        </ul>

        <ul class="listconter">
          <li v-for="(khdetail,index) in khlist" :key="index">
            <p>{{khdetail.zhenshixingming}}</p>
            <P>{{khdetail.reg_time*1000 | date-format}}</P>
            <p v-if="khdetail.touzishu>0">已出借</p>
            <p v-if="khdetail.touzishu==0">未出借</p>
          </li>
        </ul>

        <div
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="loading" 
        infinite-scroll-distance="10">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import Vue from "vue";
import { DropdownMenu, DropdownItem } from "vant";
Vue.use(DropdownMenu).use(DropdownItem);
import { DatetimePicker } from "mint-ui";
Vue.component(DatetimePicker.name, DatetimePicker);
export default {
  data() {
    return {
      content: "",
      khnum: 0,
      page: 1,
      limit: 10,
      loading: false, //默认开启无限滚动   true的话就代表关闭无限滚动
      hasMore: true, //有更多数据
      value: 0,
      option1: [
        { text: "全部", value: 0 },
        { text: "未出借", value: 2 },
        { text: "已出借", value: 1 }
      ],
      currentDate1: new Date(),
      currentDate: new Date(2014, 1, 1),
      show: false,
      showser: false,
      timer: "",
      endtimer: "",
      khlist: []
    };
  },

  methods: {
    clickChange() {
      this.khlist = [];
      this.page = 1;
      this.hasMore = true;
      this.loadMore();
    },
    clickChoice() {
      this.khlist = [];
      this.page = 1;
      this.hasMore = true;
      this.loadMore();
    },
    loadMore() {
      //加载更多的方法
      if (!this.hasMore) {
        //如果没有更多数据了
        // Toast({
        //   message: "我是有底线的....",
        //   duration: 2000,
        //   position: "bottom"
        // });
        //关闭无限滚动
        this.loading = true;
        return false; //不在请求数据
      }
      this.getList();
    },
    getList() {
      let { page, limit } = this; //不使用{}解构时的写法：let page = this.page
      this.loading = true; //关闭无限滚动  5s
      this.$toast.loading({
          message: '加载中...',
          forbidClick: true
      });
      console.log(this.value,page,limit,this.content,this.timer,this.endtimer);
      this.$post("/rongtuojinrong/userCenter/invite/recommendClients.json", {
        defidenshuxing: this.$store.state.invite.defidenshuxing,
        status: this.value,
        page,
        search: this.content,
        starttime: this.timer,
        endtime: this.endtimer,
        limit
      }).then(res => {
        if (res.data.status == 0) {
          this.khlist = this.khlist.concat(res.data.data);
          console.log(this.khlist);
          this.loading = false; //继续开启无限滚动
          this.$toast.clear();//关闭toast
          if (page * limit > this.khnum) {
            console.log(page * limit, Number(this.khnum));
            //判断是否有更多数据
            this.hasMore = false; //没有更多数据了
            return false;
          }
          this.page++;
        } else {
          this.$toast.clear();//关闭toast
        }
      });
    },

    clickConfirm(value) {
      this.show = false;
      this.showser = true;
      var date = value;
      console.log(date);
      this.$moment(date).valueOf();
      //console.log(this.$moment(date).unix());
      // var m = date.getMonth() + 1;
      // var d = date.getDate();
      // if (m >= 1 && m <= 9) {
      //   m = "0" + m;
      // }
      // if (d >= 0 && d <= 9) {
      //   d = "0" + d;
      // }
      // var timer = date.getFullYear() + "-" + m + "-" + d;
      // this.$refs["termStart"].innerHTML = timer;
      // //this.showser = false;
      // this.datePicker = "";
      // this.start = timer;
      var timer = this.$moment(date).unix();
      this.timer = timer;
    },
    clickConfirm1(value) {
      var date = value;
      var endtimer = this.$moment(date).unix();
      this.endtimer = endtimer;
      this.showser = false;
      this.khlist = [];
      this.page = 1;
      this.hasMore = true;
      this.loadMore();
    },
    clickCancel() {
      this.show = false;
      this.showser = false;
    },
    openPicker() {
      this.show = true;
    }
  },
  created() {
    this.khnum = this.$route.params.khs;
  }
};
</script>

<style lang="scss" >
  .Recommend {
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #fff;
    position: absolute;
  .left {
    float: left;
  }
  .right {
    float: right;
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
      
      .van-popup--center {
        width: 90%;
        border-radius: 0.04rem;
      }
    }
  }
  .recommendcount {
    margin: 0.65rem 0.18rem;
    .sousuo {
      border-radius: 0.5rem;
      box-shadow: 0 0 5px cornflowerblue;
      width: 100%;
      height: 0.37rem;
      border: none;
      background: url(../../../assets/sm_12.jpg) no-repeat;
      text-align: center;
      background-size: 6%;
      background-position: 0.15rem 0.08rem;
    }
    input::-webkit-input-placeholder {
      color: #cecece;
    }

    .listnav li {
      float: left;
      width: 33%;
      color: #333;
      text-align: center;
      margin-top: 0.25rem;
    }

    .van-dropdown-menu {
      height: auto;
    }
    .van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
      border-width: 0;
    }
    .van-dropdown-menu__title::after {
      border-color: transparent transparent currentColor currentColor;
    }
    .van-ellipsis {
      font-size: 0.14rem;
    }

    .listconter {
      padding-top: 0.15rem;
      height: auto;
      overflow: hidden;
      width: 100%;
      li {
        height: 0.55rem;
        line-height: 0.55rem;
        p {
          width: 33%;
          float: left;
          text-align: center;
          color: #999;
        }
      }
    }
  }
  .back{
    .rimgtop {
        width: 0.29rem;
        height: 0.29rem;
      }
      .mint-button--default{background: none;box-shadow:none;margin-top: 0.08rem}
  }
.van-popup{ width: 90%; margin: auto;}
</style>
