<template>
  <div class="defintBox">
    <headerBox title="明细">
      <span slot="rightTo" class="right_content">
        <router-link to="/inquiry" class="img_button" tag="div">
          <img src="../../../assets/sousuo.png" alt />
          <!-- @click="popupVisible=!popupVisible" -->
        </router-link>
      </span>
    </headerBox>
    <div class="defconter">
      <div class="xxxxl">
        <div class="cxtime">
          <input type="button" class="form-control" id="datetimepicker" @click="reduceMonth" />
          <span>{{newDate}}</span>
          <input type="button" class="form-control" id="dateEnd" @click="addMonth" />
        </div>
        <div class="redtext">
          <div>
            <span class="left">收入</span>
            <span class="right">{{definite.currrentMonthIncome}}</span>
          </div>
          <div>
            <span class="left">支出</span>
            <span class="right">{{definite.currrentMonthExpend}}</span>
          </div>
        </div>
      </div>

      <!-- e5421a -->
      <div class="zong">
        <div>
          <div class="xunhuan" v-for="item in delist" :key="item.id">
            <div class="jiconter">
              <p class="left">{{item.secDate}}</p>
              <p class="right">
                <span>
                  支:￥
                  <span>{{item.lendTotalMoney}}</span>
                </span>
                <span class="pl05">
                  收:￥
                  <span>{{item.incomeTotalMoney}}</span>
                </span>
              </p>
            </div>
            <ul class="jilist" v-for="(liet,index) in item.detailListArr" :key="index">
              <router-link
                tag="li"
                :to="{name:'book',query:{state:liet.state,money:liet.money,cate_title:liet.cate_title,dates:item.secDate+' '+liet.time,id:liet.id,remark:liet.remark}}"
              >
                <van-swipe-cell>
                  <van-cell>
                    <div class="left w80">
                      <p class="pt6">{{liet.cate_title}}</p>
                      <p>
                        <img class="lineimg" src="../../../assets/biao2.png" />
                        <span class="imgtext">{{liet.time}}</span>
                      </p>
                    </div>
                    <div class="right">
                      <p v-if="liet.state==1" class="pt6 red">{{liet.money}}</p>
                      <p v-else class="pt6 clv">{{liet.money}}</p>
                    </div>
                  </van-cell>
                  <template slot="right">
                    <van-button square type="danger" text="删除" @click="del(liet)" />
                  </template>
                </van-swipe-cell>
              </router-link>
            </ul>
          </div>
        </div>
        <div class="he"></div>
      </div>
      <router-link class="book" tag="button" to="/book">记一笔</router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { SwipeCell } from "vant";
import qcriteria from "../booking/inquiry.vue";
Vue.use(SwipeCell);
export default {
  data() {
    return {
      newDate: "",
      definite: "",
      delist: [],
      qcrite: false,
      criteriat: "",
      date: "",
      date1:""
    };
  },
  components: {
    qcriteria
  },
  beforeRouteLeave(to, from, next) {
    console.log(to);
    if (Object.keys(to.query).length === 0) {
      //console.log(111);
      // to.push({
      //   query: {
      //     sign: '1'
      //   }
      // });
    } else {
      //console.log(222);
    }
    next();
  },
  methods: {
    getlist() {   
      //明细列表
      this.$post("/rongtuojinrong/jizhang/detail.json", {
        date: this.newtime,
       // state:1,
      }).then(res => {
        this.definite = res.data.data;
        this.delist = res.data.data.list;
        console.log(res.data.data);
      });
    },

    //月份加处理
    addMonth() {
      var s = this.newDate;
      var arr = s.split("-");
      var year = parseInt(arr[0]);
      var month = parseInt(arr[1]);
      //判断month
      if (month == 12) {
        year = year + 1;
        month = 1;
      } else {
        month = month + 1;
      }
      this.newDate = year + "-" + month;
      var newdate = new Date(year, month - 1).getTime() / 1000;
      //var postime = parseInt(value.getTime()/1000);
      this.newtime = newdate;
      console.log(newdate);
      this.getlist();
    },
    //月份减处理
    reduceMonth() {
      var s = this.newDate;
      var arr = s.split("-");
      var year = parseInt(arr[0]);
      var month = parseInt(arr[1]);
      //判断month
      if (month == 1) {
        year = year - 1;
        month = 12;
      } else {
        month = month - 1;
      }
      this.newDate = year + "-" + month;

      var newdate = new Date(year, month - 1).getTime() / 1000;

      this.newtime = newdate;
      console.log(this.newtime);
      this.getlist();
    },
    //删除
    del(obj) {
      this.$post("/rongtuojinrong/jizhang/delete.json", {
        id: obj.id
      }).then(res => {
        this.getlist();
      });
    },
    hidcirdow() {
      this.qcrite = false;
    },
    getlistc() {
      var postdata = this.$route.query;
      // console.log(this.$route.query)
      if (postdata.state == "全部") {
        postdata.state = 0;
      }
      if (postdata.state == "支出") {
        postdata.state = 1;
      }
      if (postdata.state == "收入") {
        postdata.state = 2;
      }
      if (postdata.state == "借贷") {
        postdata.state = 3;
      }
      postdata.date = this.newtime;
      if (postdata.timeEnd) {
        var end = postdata.timeEnd.split("-");
        postdata.timeEnd = new Date(end[0], end[1] - 1, end[2]) / 1000;
      } else {
        postdata.timeEnd = "";
      }
      if (postdata.timeStart) {
        var star = postdata.timeStart.split("-");
        postdata.timeStart = new Date(star[0], star[1] - 1, star[2]) / 1000;
      } else {
        postdata.timeStart = "";
      }
      console.log(postdata);
      //明细列表
      this.$post("/rongtuojinrong/jizhang/detail.json", postdata).then(res => {
        this.definite = res.data.data;
        this.delist = res.data.data.list;
        //console.log(res.data.data.list);
      });
    }
  },
  created() {
  if(this.$route.query.date){
     this.date= this.$route.query.date;   
     this.newDate = this.date;
     this.newtime= this.$moment(this.date, 'YYYY-MM').valueOf()/1000;
     console.log(this.newtime);
  }else{
    var time = this.$moment(new Date()).format("YYYY-MM");
    this.newDate = time;

  }
    console.log(this.newDate);
    this.newtime = Math.round(new Date() / 1000);
    this.getlist();
  }
};
</script>

<style  lang="scss">
.defintBox {
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
  .pl05 {
    padding-left: 0.05rem;
  }
  .img_button {
    width: 0.19rem;
    height: 0.19rem;
    margin-top: 0.15rem;
    img {
      width: 100%;
    }
  }
  .defconter {
    margin-top: 0.5rem;
    .cxtime {
      color: #e5421a;
      text-align: center;
      height: 0.4rem;
      background: #ebebeb;
      border-bottom: 1px solid #c6c6c6;
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
    }
    .redtext {
      height: 0.4rem;
      border-bottom: 1px solid #c6c6c6;
      background: #ebebeb;
      div {
        width: 50%;
        float: left;
        color: #e5421a;
        line-height: 0.4rem;
        text-align: left;
        padding: 0 0.1rem;
      }
      div:first-child {
        border-right: 1px solid #c6c6c6;
      }
    }

    .jiconter {
      padding: 0 0.1rem;
      background: #ebebeb;
      width: 100%;
      height: 0.22rem;
      p {
        line-height: 0.22rem;
        text-align: left;
        font-size: 0.12rem;
      }
    }
    .jilist {
      overflow: hidden;
      li {
        height: 0.5rem;
        border-bottom: 1px solid #c6c6c6;
        //padding: 0 0.1rem;
        font-size: 0.12rem;
        // overflow: auto;
        background: blue;
        .clv {
          color: #72d881;
        }
        .red {
          color: #df2800;
        }
        .lineimg {
          display: inline-block;
          width: 0.15rem;
          height: 0.15rem;
          vertical-align: middle;
        }
        .imgtext {
          color: #ccc;
          vertical-align: middle;
          line-height: 0.25rem;
          padding-left: 0.02rem;
          font-size: 0.12rem;
        }
        div {
          text-align: center;
        }
        p {
          font-size: 0.12rem;
          text-align: left;
        }
        .delete {
          background: #ff0103;
          width: 0.82rem;
          height: 0.5rem;
          float: right;
        }
        .w80 {
          width: 80%;
        }
        .pt6 {
          padding-top: 0.06rem;
        }
      }
      .van-cell {
        line-height: inherit;
        padding: 0 0.1rem;
        height: 0.5rem;
      }
      .van-button--danger {
        height: 0.5rem;
      }
    }
    .book {
      position: fixed;
      bottom: 0;
      left: 0;
      background: #0159d5;
      height: 0.45rem;
      width: 100%;
      border: none;
      color: #fff;
    }
    .van-cell {
      padding: 4px 16px;
    }
    .xxxxl {
      width: 100%;
      position: fixed;
      z-index: 99;
    }

    .zong {
      padding-top: 0.8rem;
    }
  }
  .he {
    height: 0.8rem;
  }
}
</style>
