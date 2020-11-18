<template>
  <div class="jourBox">
    <headerBox title="月收支差"></headerBox>
    <div class="jourconter">
      <div class="cxtime">
        <input type="button" class="form-control" @click="dateEnd" />
        <div class="inline" @click="dianji">
          <span>{{this.startime.year}}-{{this.startime.month}}</span>至
          <span>{{this.endtime.year}}-{{this.endtime.month}}</span>
        </div>
        <!--  <div class="inline"> {{stedtime}} </div> -->
        <input type="button" class="form-control" @click="datetimepicker" />
      </div>

      <div class="jourlist">
        <ul v-for="list in total.list" :key="list.id">
          <router-link tag="li" :to="{name:'definite',query:{date:list.date}}">
            <div>{{list.date}}</div>
            <div>
              <p class="clv pl5">{{list.income}}</p>
              <p class="red">{{list.expenditure}}</p>
            </div>
            <div>+{{list.Difference}}</div>
          </router-link>
        </ul>
      </div>

      <div class="jourend">
        <div>
          <span class="c3">总收入：</span>
          <span>{{total.allIncome}}</span>
        </div>
        <div>
          <span class="c3">总收支差：</span>
          <span>{{total.allDifference}}</span>
        </div>
        <div>
          <span class="c3">总支出：</span>
          <span>{{total.allexpenditure}}</span>
        </div>
      </div>
    </div>

    <div>
      <van-popup v-model="tshow" position="center" :style="{width:'3.5rem' }">
        <div class="riqi">
          <span class="riqi1">日期</span>
        </div>
        <div
          style="display:flex;align-items: center;border-top: 1px solid #0159d5;border-bottom:1px solid #0159d5"
        >
          <van-datetime-picker
            v-model="currentDate"
            type="year-month"
            :min-date="minDate"
            :max-date="maxDate"
            :style="{width:'90%'}"
            :show-toolbar="false"
          />
          <div style="white-space: nowrap;">--</div>
          <van-datetime-picker
            v-model="currentDate2"
            type="year-month"
            :min-date="minDate"
            :max-date="maxDate"
            :style="{width:'90%'}"
            :show-toolbar="false"
          />
        </div>
        <div class="queding">
          <button class="btn1" @click="tshow = false">取消</button>
          <div class="kong1"></div>
          <button class="btn2" @click="queren_ok">确认</button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { formatDate } from "../../../modules/datab.js";
import { DatetimePicker } from "vant";
import { COPYFILE_EXCL } from "constants";
Vue.use(DatetimePicker);
export default {
  data() {
    return {
      tshow: false,
      ashow: false,
      total: "",
      stedtime: "",
      currentDate: new Date(),
      currentDate2: new Date(),
      minDate: new Date(2000, 0),
      maxDate: new Date(2100, 12),
      startime:{},
      endtime:{},
    };
  },
  methods: {
    queren_ok() {
      // 把时间改为时间戳来做判断
      let a = this.currentDate.getTime();
      // 把时间改为时间戳来做判断
      let b = this.currentDate2.getTime();
      // 时间格式
      // 判断时间戳两个的大小判断
      if (a > b) {
        this.tshow = false;
        this.$toast({
          message: "查询的结束时间必须大于开始时间",
          position: "bottom"
        });
        return;
      }
      // 把绑定的this.currentDate的年 赋值给this.startime.year
      this.startime.year = this.currentDate.getFullYear()
      // 把绑定的this.currentDate的月 赋值给this.startime.month
      this.startime.month = this.currentDate.getMonth()+1
      // 把绑定的this.currentDate的年 赋值给 this.endtime.year
      this.endtime.year = this.currentDate2.getFullYear()
      // 把绑定的this.endtime的月 赋值给this.startime.month
      this.endtime.month = this.currentDate2.getMonth()+1
      // 点击完确定删除
      this.tshow = false;
      // 判断 时间戳来决定大小判断
      this.getList();
    },
    //减年
    datetimepicker() {
      // 引用this.startime对象
      this.startime.year++
      this.startime.month = 1
      this.endtime.year++
      this.endtime.month = 12
      // 重新调用接口
      this.getList();
    },
    // 减年
    dateEnd() {
       // 引用this.startime对象
      this.startime.year--
      this.startime.month = 1
      this.endtime.year--
      this.endtime.month = 12
      // 调用接口
      this.getList();
    },
    // 点击弹出弹窗
    dianji() {
      this.tshow = true;
    },
    //  接口接受传参返回值
    getList() {
      // 接口在渲染数据前 loading 转圈圈
      this.$toast.loading({
        mask: false,
        duration: 0,
        message: "加载中...",
        forbidClick: true
      });
      this.$post("/rongtuojinrong/jizhang/lists.json", {
        startMonth: this.startime.year + '-' + this.startime.month,
        endMonth: this.endtime.year + '-' + this.endtime.month
      }).then(res => {
        this.total = res.data.data;
        console.log(this.total)
        //渲染出数据后接受转圈
        this.$toast.clear();
      });
    }
  },
  created() {
     // 创建一个新的时间对象
      let date = new Date();
     // 把时间分开为年和月
      let me = new Date(date.getFullYear(), 1);
      // 把分开的年月放到对象里面
      this.startime={
        year :me.getFullYear(),
        month:me.getMonth()
      }
      // 把时间分开为年和月
      let me2 = new Date(date.getFullYear(), 11);
      // 把分开的年月放到对象里面
      this.endtime = {
        year :me2.getFullYear(),
        month:me2.getMonth()+1
      }
      // 调用接口
      this.getList();
      console.log(this.$options);
  }
};
</script>

<style lang="scss">
.jourBox {
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
  .pl5 {
    padding-top: 0.08rem;
  }
  .jourconter {
    margin-top: 0.5rem;
    .cxtime {
      color: #333;
      text-align: center;
      height: 0.4rem;
      /* background: #ebebeb; */
      line-height: 0.4rem;
      input:first-child {
        background: url(../../../assets/jz1.png) no-repeat;
        display: inline-block;
        width: 0.08rem;
        height: 0.16rem;
        border: none;
        background-size: 100%;
        position: absolute;
        /*  background-position: 0.02rem; */
        margin: 0.12rem -0.3rem;
      }
      input:last-child {
        background: url(../../../assets/jz2.png) no-repeat;
        display: inline-block;
        width: 0.08rem;
        height: 0.16rem;
        border: none;
        background-size: 100%;
        position: absolute;
        margin: 0.12rem 0.22rem;
      }
      .inline {
        display: inline;
      }
    }
    .jourlist {
      margin: 0.1rem;
      ul {
        color: #333;

        li {
          height: 0.64rem;
          text-align: center;
          vertical-align: middle;
          background: #fff url(../../../assets/totalmonth_2.png) no-repeat right;
          margin-bottom: 0.05rem;
          /* div {
            float: left;
            width: 30%;
          } */
          div {
            width: 32%;
            line-height: 0.64rem;
            float: left;
          }
          div:nth-child(2) p {
            line-height: 0.25rem;
          }
        }
      }
    }
    .jourend {
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 0.1rem;
      line-height: 0.25rem;
      div {
        float: left;
        text-align: left;
        width: 50%;
      }
    }
  }
}
.riqi {
  padding: 0px 0.1rem;
  height: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #0159d5;
  margin: 0 auto;
}
.riqi1 {
  margin: 0 auto;
}
.queding {
  padding: 0px 0.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.3rem;
  color: #0159d5;
}
.btn1 {
  margin: 0 auto;
  width: 100%;
  border: 0px;
  background-color: transparent;
  color: black;
}
.btn2 {
  margin: 0 auto;
  width: 99%;
  border: 0px;
  background-color: transparent;
  color: black;
}
.kong1 {
  border: 1px solid #0159d5;
  height: 0.3rem;
}
</style>