<template>
  <div class="inquiryBox">
    <headerBox title="查询条件">
      <span slot="rightTo" class="right_content">
        <router-link
          class="img_button"
          replace
          tag="div"
          :to="{name:'definite',query:{timeStart:startime,timeEnd:endtime,moneyStart:min,moneyEnd:max,key:keywords,state:leiname}}"
        >
          <img src="../../../assets/duihao.png" alt />
        </router-link>
      </span>
    </headerBox>
    <div class="inquiryconter">
      <input type="text" placeholder="输入关键字或者拼音" class="text1" v-model="keywords" />
      <van-cell title="查找范围" :value="leiname" size="large" is-link @click="fanweishow = true" />
      <van-cell title="日期范围" :value="datefw" size="large" is-link @click="dateishow = true" />
      <!--   <div class="timestyle"><span>2019-01</span>至<span>2019-01</span></div> -->
      <div class="tmoney">
        <input type="text" v-model="startime" @click="optdate" />
        <P>至</P>
        <input type="text" v-model="endtime" @click="copydate" />
        <!-- <span class="spanw"> {{startime}}</span> 
         <span class="spanw">至</span>
        <span class="spanw">{{endtime}}</span>-->
      </div>
      <div class="tmoney mt">
        <input placeholder="输入起始金额" type="number" v-model="min" />
        <P>至</P>
        <input placeholder="输入最高金额" type="number" v-model="max" />
      </div>
    </div>
    <!--  查找范围展示内容 -->
    <van-popup v-model="fanweishow" position="right" :style="{ height: '100%' ,width:'100%'}">
      <fanwetitle :scopeId="scopeid" @hidshandow="hidshandow" @getbank="getbank"></fanwetitle>
    </van-popup>
    <!-- 日期范围内容 -->
    <van-popup v-model="dateishow" position="right" :style="{height:'100%',width:'100%'}">
      <datetitle :dateId="datecen" @hidatedow="hidatedow" @getdate="getdate"></datetitle>
    </van-popup>

    <!-- 时间区间选择 -->
    <div class="dateStyle">
      <van-popup v-model="onedate">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :visible-item-count="3"
          @cancel="cancelPicker"
          @confirm="confirmPicker"
          title="选择日期"
        />
      </van-popup>

      <van-popup v-model="twodate">
        <van-datetime-picker
          v-model="currentDate2"
          type="date"
          :visible-item-count="3"
          @cancel="cancelPickertwo"
          @confirm="confirmPickertwo"
          title="选择日期"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import fanwetitle from "../booking/fanwei.vue";
import datetitle from "../booking/timeincome.vue";
export default {
  props: ["dateId"],
  data() {
    return {
      fanweishow: false, //查找范围
      dateishow: false, //日期范围内容
      scopeid: "",
      datecen: "",
      leiname: "",
      datefw: "",
      startime: "",
      endtime: "",
      currentDate: new Date(), //开始时间
      currentDate2: new Date(), //开始时间
      onedate: false,
      twodate: false,
      min: "",
      max: "",
      keywords: ""
    };
  },
  components: {
    fanwetitle,
    datetitle
  },
  methods: {
    hidshandow(val) {
      this.fanweishow = false;
    },
    getbank(val) {
      this.leiname = val;
      this.fanweishow = false;
    },
    //日期类型
    hidatedow(val) {
      this.dateishow = false;
    },
    getdate(val) {
      this.datefw = val.name;
      this.dateishow = false;
      if (val.id == 0) {
        var now = this.$moment().format("YYYY-MM-DD");
        console.log(now)
        this.startime = now;
        this.endtime = now;
      }
      if (val.id == 1) {
        var tll = this.$moment().day(1).format("YYYY-MM-DD");
        this.startime = tll;
        this.endtime = tll;
      }
      //本周
      if (val.id == 2) {
        var nows = this.$moment().day(1).format("YYYY-MM-DD");
        var wek = this.$moment().day(7).format("YYYY-MM-DD");
        this.startime = nows;
        this.endtime = wek;
      }
      //上周
      if (val.id == 3) {
        var tll = this.$moment().day(0).format("YYYY-MM-DD");
        var wek2 = this.$moment().weekday(-7).format("YYYY-MM-DD");
        this.startime = wek2;
        this.endtime = tll;
      }
      //本月
      if (val.id == 4) {
        var start = this.$moment().startOf("month").format("YYYY-MM-DD");
        var end = this.$moment().endOf("month").format("YYYY-MM-DD");
        this.startime = start;
        this.endtime = end;
      }
      //上月
      if (val.id == 5) {
        var ago = this.$moment().month(this.$moment().month() - 1).startOf("month").format("YYYY-MM-DD");
        var agoends = this.$moment().month(this.$moment().month() - 1).endOf("month").format("YYYY-MM-DD");
        this.startime = ago;
        this.endtime = agoends;
      }
      //最近3月
      if (val.id == 6) {
        var yue = this.$moment().month(this.$moment().month() - 2).startOf("month").format("YYYY-MM-DD");
        var yuends = this.$moment().month(this.$moment().month()).endOf("month").format("YYYY-MM-DD");
        this.startime = yue;
        this.endtime = yuends;
      }
      //本季
      if (val.id == 7) {
        var jidu = this.$moment().startOf("quarter").format("YYYY-MM-DD");
        var jdends = this.$moment().endOf("quarter").format("YYYY-MM-DD");
        this.startime = jidu;
        this.endtime = jdends;
      }
      //上季
      if (val.id == 8) {
        var sjidu = this.$moment().quarter(this.$moment().quarter() - 1).startOf("quarter").format("YYYY-MM-DD");
        var sjdends = this.$moment().quarter(this.$moment().quarter() - 1).endOf("quarter").format("YYYY-MM-DD");
        this.startime = sjidu;
        this.endtime = sjdends;
      }
      //今年
      if (val.id == 9) {
        var year = this.$moment().year(this.$moment().year()).startOf("year").format("YYYY-MM-DD");
        var yend = this.$moment().year(this.$moment().year()).endOf("year").format("YYYY-MM-DD");
        this.startime = year;
        this.endtime = yend;
      }

      //去年
      if (val.id == 10) {
        var lasty = this.$moment().year(this.$moment().year() - 1).startOf("year").format("YYYY-MM-DD");
        var lastyend = this.$moment().year(this.$moment().year() - 1).endOf("year").format("YYYY-MM-DD");
        this.startime = lasty;
        this.endtime = lastyend;
      }
      //最近7天
      if (val.id == 11) {
        var seven = this.$moment().subtract(6, "days").format("YYYY-MM-DD");
        var now = this.$moment().format("YYYY-MM-DD");
        this.startime = seven;
        this.endtime = now;
      }

      //最近30天
      if (val.id == 12) {
        var thirty = this.$moment().subtract(29, "days").format("YYYY-MM-DD");
        var now = this.$moment().format("YYYY-MM-DD");
        this.startime = thirty;
        this.endtime = now;
      }
    },
    //时间区间选择事件
    optdate() {
      this.onedate = true;
    },
    copydate() {
      this.twodate = true;
    },
    cancelPicker() {
      this.onedate = false;
    },
    cancelPickertwo() {
      this.twodate = false;
    },
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
      this.startime = timer;
      this.onedate = false;
      var postime = parseInt(value.getTime() / 1000);
      this.newStartime = postime; //化为时间戳传参
      this.datePicker = "";
    },
    confirmPickertwo(value) {
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
      this.endtime = timer;
      var postime = parseInt(value.getTime() / 1000);
      this.newEndtime = postime; //最终化为时间戳传参
      this.twodate = false;
      this.datePicker = "";
    }
    //点击查询
    /*       Serach(){
  
      this.$post("/rongtuojinrong/jizhang/detail.json",{
      timeStart:this.newStartime,
      timeEnd:this.newEndtime,
      moneyStart:this.min,
      moneyEnd:this.max,
      key:this.keywords,
      state:this.state,
      }).then(res=>{

      })
    }, */
  }
};
</script>

<style  lang="scss">
.inquiryBox {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #f9f9f9;
  position: absolute;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .clear {
    clear: both;
  }
  .c3 {
    color: #333;
  }
  .red {
    color: #df2800;
  }
  .clv {
    color: #72d881;
  }
  .img_button {
    width: 0.19rem;
    height: 0.19rem;
    margin-top: 0.15rem;
    img {
      width: 100%;
    }
  }
  .inquiryconter {
    margin-top: 0.6rem;
    .text1 {
      background: #fff url(../../../assets/sousuohui.png) no-repeat;
      margin: 0.1rem;
      height: 0.31rem;
      text-indent: 0.4rem;
      background-size: 5%;
      border: none;
      width: 95%;
      background-position: 0.05rem;
      display: block;
      color: #333;
    }
    .timestyle {
      height: 0.31rem;
      color: #333;
      background: #fff;
      line-height: 0.31rem;
      text-align: center;
      span {
        padding: 0 0.2rem;
      }
    }
    .tmoney {
      height: 0.31rem;
      background: #fff;
      line-height: 0.31rem;
      input {
        float: left;
        width: 46%;
        border: none;
        color: #333;
      }
      p {
        width: 4%;
        float: left;
        color: #b1b1b1;
      }
      input:first-child {
        padding-left: 0.15rem;
        text-align: left;
      }
      input:last-child {
        text-align: center;
      }
      .spanw {
        width: 40%;
        display: block;
        float: left;
        text-align: center;
      }
    }
    .mt {
      margin-top: 0.2rem;
    }
    .van-cell--large .van-cell__title {
      font-size: 14px;
      color: #999;
    }
    .van-cell__value {
      position: relative;
      overflow: hidden;
      color: #333;
      text-align: right;
      vertical-align: middle;
    }
    input::-webkit-input-placeholder {
      color: #999;
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #999;
    }
    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #999;
    }
    input:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #999;
    }
  }
  .dateStyle {
    .van-popup {
      width: 90%;
      margin: auto;
    }
  }
}
</style>
