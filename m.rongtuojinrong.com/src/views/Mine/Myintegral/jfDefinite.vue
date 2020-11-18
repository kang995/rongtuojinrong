<!-- 我的积分首页-->
<template>
  <div class="jfDefiniteBox">
    <!-- 头部 -->
    <mt-header>
      <!-- title="积分明细" -->
      <router-link to="" slot="left" @click.native="gos">
        <mt-button icon="back"></mt-button>
      </router-link>
      <div slot="left" class="mingxi">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" @change="clickChoice(value1)"/>
        </van-dropdown-menu>
      </div>
      <mt-button slot="right" @click="openPicker">日期</mt-button>
    </mt-header>
    

    <div class="jfDefinite">
      <div class="time" @click="openPicker">
        <span ref="termStart" class="cblue">{{start}}</span> --
        <span ref="endStart" class="cblue">{{end}}</span>
      </div>

      <van-popup v-model="show">
        <van-datetime-picker
          v-model="startTime"
          type="date"
          :visible-item-count="3"
          @cancel="cancelPicker"
          @confirm="confirmPicker"
          datePicker="startTime"
          title="日期1"
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
          title="日期2"
        />    
      </van-popup>
        <!-- :min-date="minDate"  :max-date="maxDate" -->
      <ul class="jflist">
        <li v-for="jfitem in jflist" :key="jfitem.index">
          <div class="left leftdet">
            <P>{{jfitem.time}}</P>
            <P v-if="jfitem.flag==1" class="fz14 cju">+{{jfitem.points}}</P>
            <P v-else class="fz14 cju">-{{jfitem.points}}</P>
            <P class="detset">{{jfitem.remarks}}</P>
          </div>
          <div class="right rightdet">{{jfitem.cate}}</div>
        </li>
      </ul>
      <!-- 无数据显示页面内容 -->
      <div class="Nodata displayNO">
        <img src="@/assets/sm_19.jpg" />
      </div>
      <div
      v-infinite-scroll="loadMore" 
      infinite-scroll-disabled="loading" 
      infinite-scroll-distance="20">

      </div>      

    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui";
import Vue from "vue";
import { DropdownMenu, DropdownItem } from "vant";
Vue.use(DropdownMenu).use(DropdownItem);
import { METHODS } from "http";

export default {
  data() {
    return {
      page:1,
      limit:20,
      loading:false,//默认开启无限滚动   true的话就代表关闭无限滚动
      hasMore:true,//有更多数据
      val:'',
      start: '',
      end: '',
      jflist: [],
      jfendtime: '',
      jfstarttime: '',
      show: false,
      // minDate: new Date(),
      // maxDate: new Date(2029, 10, 1),
      currentDate: new Date(),
      startTime: new Date(), // 开始时间
      endTime: new Date(), // 结束时间
      showser: false,
      value1: 0,
      option1: [
        //{ text: "积分明细", value: 10 },
        { text: "全部", value: 0 },
        { text: "投资积分", value: 30 },
        { text: "投资奖励积分", value: 31 },
        { text: "邀请积分", value: 36 },
        { text: "邀请奖励积分", value: 37 }
      ]
    };
  },
  watch:{
      type(){
          this.jflist = [];  //数组内容要清空
          this.page = 1;     //页码从第一页开始
          this.hasMore = true; //默认都是有更多数据
          this.getList();//请求数据
      }
  },
  methods: {
    gos(){
      this.$router.go(-1);
    },
    clickChoice(c){
      //this.showList(c)
      this.val = c;
      this.start = this.$refs["termStart"].innerHTML;
      this.end = this.$refs["endStart"].innerHTML;
      this.jflist = [];
      this.page=1;
      this.hasMore =true;
      this.loadMore();
    },

    loadMore(){ //加载更多的方法  
           if(!this.hasMore){ //如果没有更多数据了
                Toast({
                    message: '我是有底线的....',
                    duration:2000,
                    position:"bottom"
                });
                //关闭无限滚动
               this.loading = true;
               return false;//不在请求数据
            }
            this.getList() 
        },
        getList(){
            let {page,limit} = this; //不使用{}解构时的写法：let page = this.page           
            this.loading = true;//关闭无限滚动  5s
            let toast = Toast({
                message: '正在加载....',
                iconClass: 'fa fa-cog fa-spin',
                duration:-1
            });
            console.log(page,limit,this.start,this.end,this.val);
            this.$post('/rongtuojinrong/points/getList.json',{
              page,
              limit,
              start_time: this.start,
              end_time: this.end,
              cate_id: this.val
            }).then(res=>{
                this.jflist = this.jflist.concat(res.data.data);
                // console.log(this.jflist);
                this.loading = false;//继续开启无限滚动
                // console.log(this.loadig);
                toast.close();//关闭toast.
                 console.log(page*limit , res.data.count)
                if(page*limit >= res.data.count){ //判断是否有更多数据
                    this.hasMore = false; //没有更多数据了
                    return false;
                }
               
                this.page++;
            })
        },


    showList(){
      console.log(this.start,this.end);
      this.$post('/rongtuojinrong/points/getList.json',{
        start_time: this.start,
        end_time: this.end,
        cate_id: this.val
      })
      .then(res=>{
        this.jflist = res.data.data;

      })
      .catch(err=>{

      })
      this.page=2;
    },

    openPicker() {
      ////活动截止弹出层并显示时间选择器
      this.show = true;
      //this.datePicker = picker;
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
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d;
      this.$refs["termStart"].innerHTML = timer;
      //this.showser = false;
      this.datePicker = "";
      this.start = timer;
    },
    confirmPicker_s(value) {
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d;
      this.$refs["endStart"].innerHTML = timer;
      this.showser = false;
      this.datePicker = "";
      this.end = timer;
      //第二次日期选择后，根据开始结束日期筛选
      this.jflist = [];
      this.page=1;
      this.hasMore =true;
      this.loadMore();
    }
  },
  created(){
    //this.getList();
    //获取当前日期
    var time1 = this.$moment(new Date()).format('YYYY-MM-DD');
    //this.jfendtime = time1;
    this.end = time1;
    //获取上个月
    var time2 = this.$moment().subtract(1, 'months').format('YYYY-MM-DD');
    //this.jfstarttime = time2;    
    this.start = time2    
  },
};
</script>

<style lang="scss">
body {
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
  .jfDefiniteBox {
    width: 100%;
    height: auto;
    font-size: 14px;
    overflow: hidden;

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
      .mingxi {
        margin-left: 1rem;
        position: absolute;
        top: 0;
        left: 10%;
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
    .jfDefinite {
      width: 100%;
      margin: 0.5rem auto;
      height: auto;
      overflow: hidden;
      .time {
        height: 0.25rem;
        background: #e6effb;
        width: 100%;
        text-align: center;
        line-height: 0.25rem;
        margin: auto;
        color: #0159d5;
      }
      .cblue {
        color: #0159d5;
      }
      .jflist {
        li {
          border-bottom: 1px solid #e5e9e5;
          padding: 0.1rem;
          height: 1rem;
          color: #999;
          font-size: 0.12rem;
          div:nth-child(1) p {
            line-height: 0.27rem;
          }
          div:nth-child(2) {
            line-height: 0.8rem;
          }
          .leftdet{
            max-width: 50%;
            .detset{
              max-width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;              
            }
          } 
          .rightdet{
            max-width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .van-popup {
        width: 90%;
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
    }
  }
}
</style>
