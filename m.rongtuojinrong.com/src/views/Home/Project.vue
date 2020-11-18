<template>
  <div id="Project">
    <div class="Project-head">
      <span class="Project-text">热投项目</span>
      <router-link tag="span" to="/Project" class="Project-text2">更多</router-link>
      <img src="@/assets/img63.png" alt />
    </div>
    <!-- 第一行 -->
    <router-link
      tag="div"
      :to="{name:'ProjectBidOne',query:{id:list.jie_id}}"
      class="Project-list"
      v-for="list in lists"
      :key="list.id"
    >
      <!-- 项目开始 -->

      <div class="Project-list-one">
        <span class="Project-list-one-text1">{{list.title}}</span>
        <span class="Project-list-one-text2">{{list.qixian}}个月</span>
        <span class="Project-list-one-text3">{{list.start_time | formatDate}}</span>
      </div>
      <!-- 项目利率 -->
      <div class="Project-list-two">
        <div class="Project-list-two-text1">
          <div class="Project-list-two-text1-interest1">
            <span>{{list.lilv}}%</span>
          </div>
          <div class="Project-list-two-text1-interest2">
            <span>预期年化利率</span>
          </div>
        </div>

        <div class="Project-list-two-text2">
          <div class="Project-list-two-text2-interest3">
            <span class="Project-list-two-text2-wan">{{list.jiner}}</span>
          </div>
          <div class="Project-list-two-text2-interest4">
            <span>先息后本</span>
          </div>
        </div>
        <!-- 项目指标 -->
        <div class="Project-list-two-text3">
          <div class="Project-list-two-text3-circle">
            <van-circle
              v-model="list.rate"
              :text="getAdd(list)"
              size="57.5px"
              :rate="list.jindu"
              :color="geiJin(list)"
              :stroke-width="60"
              layer-color="#ebedf0"
              :spend="50"
              :clockwise="true"
            />
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { formatDate } from "../../modules/datab.js";
import qs from "qs";
import { Circle } from "vant";
import Vue from "vue";
Vue.use(Circle);
export default {
  name: "Project",
  data() {
    return {
      lists: [],
      rate: 0
    };
  },
  // 时间戳转换
  filters: {
    formatDate(time) {
      let date = new Date(time * 1000);
      return formatDate(date, "y-MM-dd");
    },
    formatDate2(time) {
      let date = new Date(time * 1000);
      return formatDate(date, "hh:mm");
    }
  },

  methods: {
    // 函数传参 对象 传值 进行判断
    // 绑定rate 接收参数 判断状态，按照后台返回的状态进行渲染
    getAdd(obj) {
      if (obj.zhuangtai == 4) {
        return "已售罄";
      } else if (obj.zhuangtai == 6) {
        return "收益中";
      } else if (obj.zhuangtai == 8) {
        return "还款中";
      } else if (obj.zhuangtai == 10) {
        if (obj.jindu == 0) {
          let date = new Date(obj.start_time * 1000);
          return formatDate(date, "hh:mm");
        } else {
          return "剩" + (100 - obj.jindu) + "%";
        }
      }
    },

    // 绑定颜色属性，接收参数 直接 判断状态 输出 颜色
    geiJin(obj) {
      if (obj.zhuangtai == 4) {
        return "#ebedf0";
      } else if (obj.zhuangtai == 6) {
        return "#f63";
      } else if (obj.zhuangtai == 10 && obj.jindu != 0) {
        return "#f63";
      } else {
        return "#ebedf0";
      }
    }
  },

  mounted() {
    let postData = qs.stringify({
      //第二种方式
      type: 0,
      term: 0,
      apr: 0
    });
    this.$http
      .post(
        "http://api.php.rongtuojinrong.com/rongtuojinrong/project/borrowList.json",
        postData
      )
      .then(res => {
        let data = res.data.data.list;
        for (let key in data) {
          data[key].jindu = parseInt(data[key].jindu);
          data[key].rate = 0;
        }
        this.lists = this.lists.concat(data);
      });
  }
};
</script>

<style lang="scss" >
#Project {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  padding-bottom: 0.18rem;
  .Project-head {
    width: 100%;
    height: -15px;
    display: flex;
    justify-content: space-between;
    padding: 3%;
    img {
      height: 0.14rem;
      margin-top: 0.01rem;
    }
    .Project-text {
      font-size: 0.14rem;
      color: #333;
      font-weight: bold;
    }
    .Project-text2 {
      color: #7f7f7f;
      display: flex;
      font-size: 0.12rem;
      margin-left: 2.5rem;
    }
  }
    // .Project-list:nth-child(2){
    //   margin-top:0;
    // }
  .Project-list {
    width: 94%;
    height: 1.2rem;
    background-color: #ffffff;
    margin: 0 auto;
    margin-top: 0.13rem;
    /* border:1px solid black; */
    border-radius: 0.07rem;
    &:nth-of-type(2){
      margin-top: 0
    }
    .Project-list-one {
      width: 100%;
      padding: 2.5%;
      height: 0.44rem;
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      .Project-list-one-text1 {
        color: #202020;
        display: inline-block;
        width: 1.4rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 0.19rem;
      }
      .Project-list-one-text2 {
        padding: 0 2% 0 2%;
        color: #2b6cda;
        background-color: #e6e9fa;
         margin-left: -0.8rem;
         align-self:flex-start;
      }
      .Project-list-one-text3 {
        float: right;
        font-size: 0.1rem;
        color: #8f8f8f;
      }
    }
    /* 项目利率 */
    .Project-list-two {
      width: 100%;
      padding: 2.5%;
      height: 0.5415rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      .Project-list-two-text1 {
        height: 0.415rem;
        .Project-list-two-text1-interest1 span {
          color: #fe6633;
          font-weight: bold;
          font-size: 0.2rem;
        }
        .Project-list-two-text1-interest2 span {
          font-size: 0.1rem;
          color: #646464;
        }
      }
      .Project-list-two-text2 {
        height: 0.415rem;
        margin-top: 0.16rem;
        .Project-list-two-text2-interest3 .Project-list-two-text2-wan {
          color: #1c1c1c;
          font-weight: bold;
        }
        .Project-list-two-text2-wan1 {
          font-size: 0.09rem;
          padding: 1px;
        }
        .Project-list-two-text2-interest4 span {
          font-size: 0.1rem;
        }
      }
      .Project-list-two-text3 {
        height: 0.415rem;
      }
    }
  }

  // .Project-list-one {
  //   width: 100%;
  //   padding: 2.5%;
  //   height: 0.44rem;
  //   // line-height: 0.44rem;
  // }
  // .Project-list-one-text1 {
  //   color: #202020;
  //   overflow: hidden; //超出的文本隐藏
  //   text-overflow: ellipsis; //溢出用省略号显示
  //   white-space: nowrap; //溢出不换行
  // }
  // .Project-list-one-text2 {
  //   padding: 0 2% 0 2%;
  //   color: #2b6cda;
  //   background-color: #e6e9fa;
  // }
  // .Project-list-one-text3 {
  //   float: right;
  //   font-size: 0.1rem;
  //   color: #8f8f8f;
  // }

  /* 项目利率 */
  // .Project-list-two {
  //   width: 100%;
  //   padding: 2.5%;
  //   height: 0.5415rem;
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   flex-direction: row;
  // }
  // .Project-list-two .Project-list-two-text1 {
  //   height: 0.415rem;
  // }
  // .Project-list-two
  //   .Project-list-two-text1
  //   .Project-list-two-text1-interest1
  //   span {
  //   color: #fe6633;
  //   font-weight: bold;
  //   font-size: 0.2rem;
  // }
  // .Project-list-two
  //   .Project-list-two-text1
  //   .Project-list-two-text1-interest2
  //   span {
  //   font-size: 0.1rem;
  //   color: #646464;
  // }
  // .Project-list-two-text2 {
  //   height: 0.415rem;
  //   margin-top: 0.16rem;
  // }
  // .Project-list-two
  //   .Project-list-two-text2
  //   .Project-list-two-text2-interest3
  //   .Project-list-two-text2-wan {
  //   color: #1c1c1c;
  //   font-weight: bold;
  // }
  // .Project-list-two
  //   .Project-list-two-text2
  //   .Project-list-two-text2-interest3
  //   .Project-list-two-text2-wan1 {
  //   font-size: 0.09rem;
  //   padding: 1px;
  // }
  // .Project-list-two
  //   .Project-list-two-text2
  //   .Project-list-two-text2-interest4
  //   span {
  //   font-size: 0.1rem;
  // }
  // .Project-list-two-text3 {
  //   height: 0.415rem;
  // }

  /* 第二行 */
  // .Project-list2 {
  //   width: 94%;
  //   height: 1.25rem;
  //   background-color: #ffffff;
  //   margin: 0 auto;
  //   border-radius: 0.07rem;
  //   /* border: 1px solid black; */
  //   margin-top: 0.08rem;
  // }
  /* 第三行 */
  // .Project-list3 {
  //   width: 94%;
  //   height: 1.25rem;
  //   background-color: #ffffff;
  //   margin: 0 auto;
  //   border-radius: 7px;
  //   /* border: 1px solid black; */
  //   margin-top: 0.08rem;
  // }

  // .Project-list4 {
  //   width: 94%;
  //   height: 1.25rem;
  //   background-color: #ffffff;
  //   margin: 0 auto;
  //   border-radius: 0.07rem;
  //   /* border: 1px solid black; */
  //   margin-top: 0.08rem;
  // }
  // .Project-list5 {
  //   width: 94%;
  //   height: 1.25rem;
  //   background-color: #ffffff;
  //   margin: 0 auto;
  //   border-radius: 0.07rem;
  //   /* border: 1px solid black; */
  //   margin-top: 0.08rem;
  // }
  // .Project-list7 {
  //   width: 94%;
  //   height: 1.25rem;
  //   background-color: #ffffff;
  //   margin: 0 auto;
  //   border-radius: 0.07rem;
  //   /* border: 1px solid black; */
  //   margin-top: 0.08rem;
  //   margin-bottom: 0.08rem;
  // }
}
</style>

