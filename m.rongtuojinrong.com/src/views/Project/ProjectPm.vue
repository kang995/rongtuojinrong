<template>
  <div class="ProjectPm">
    <div class="Project-head-a">
      <mt-header title="优质项目" style fixed>
        <router-link to="/" slot="left"></router-link>
        <mt-button slot="right">
          <span class="ProjectPm-span" @click="showPopup">筛选</span>
          <van-popup v-model="showa" position="right" :style="{ height: '100%' , width: '70%',}">
            <div class="ProjectPm-span-a">
              <img src="../../assets/shaixuan1.png" alt />
              <!-- 这是x号 -->
              <div class="ProjectPm-span-a-img" @click="getDelete">
                <img src="../../assets/guanbi2x.png" alt />
              </div>
            </div>
            <div class="ProjectPm-span-b">
              <div class="ProjectPm-span-b1">
                <span>期限</span>
                <div class="ProjectPm-span-b1-b">
                  <div  class="ProjectPm-span-b1-b1"  @click="setTerm(0,5)"  :class="{activea:terma==5}"  >全部</div>
                  <div  class="ProjectPm-span-b1-b2"  @click="setTerm(1,6)"  :class="{activea:terma==6}"  >1个月</div>
                  <div  class="ProjectPm-span-b1-b3"  @click="setTerm(2,7)"  :class="{activea:terma==7}"  >2~3个月</div>
                </div>

                <div class="ProjectPm-span-b1-c">
                  <div  class="ProjectPm-span-b1-c1"  @click="setTerm(3,8)"  :class="{activea:terma==8}"  >4~5个月</div>
                  <div  class="ProjectPm-span-b1-c2"  @click="setTerm(4,9)"  :class="{activea:terma==9}"  >6个月及以上</div>
                </div>
              </div>

              <div class="ProjectPm-span-b1">
                <span>利率</span>
                <div class="ProjectPm-span-b1-b">
                  <div  class="ProjectPm-span-b1-b1"  @click="setApr(0,10)"  :class="{activea:apra==10}"  >全部</div>
                  <div  class="ProjectPm-span-b1-b2"  @click="setApr(1,11)"  :class="{activea:apra==11}"  >10%以下</div>
                  <div  class="ProjectPm-span-b1-b3"  @click="setApr(2,12)"  :class="{activea:apra==12}"  >10%</div>
                </div>

                <div class="ProjectPm-span-b1-c">
                  <div  class="ProjectPm-span-b1-c1"  @click="setApr(3,13)"  :class="{activea:apra==13}"  >10.5%</div>
                  <div  class="ProjectPm-span-b1-c2"  @click="setApr(4,14)"  :class="{activea:apra==14}"  >11%及以上</div>
                </div>
              </div>

              <div class="ProjectPm-span-b1">
                <span class="ProjectPm-span-b1-span">项目类型</span>
                <div class="ProjectPm-span-b1-d">
                  <div  class="ProjectPm-span-b1-b1"  @click="setType(0,20)"  :class="{activea:typea==20}"  >全部</div>
                  <div  class="ProjectPm-span-b1-b2"  @click="setType(1,21)"  :class="{activea:typea==21}"  >供应链融资</div>
                </div>

                <div class="ProjectPm-span-b1-c">
                  <div  class="ProjectPm-span-b1-c1"  @click="setType(2,22)"  :class="{activea:typea==22}"  >企业经营贷</div>
                  <div  class="ProjectPm-span-b1-c2"  @click="setType(3,23)"  :class="{activea:typea==23}"  >个人借款</div>
                </div>
              </div>
              <!-- 重置 确定 -->
              <div class="ProjectPm-span-b-btn">
                <div class="ProjectPm-span-b-btn1" @click="reSet()">
                  <img src="../../assets/shaixuan3.png" alt />
                </div>
                <!-- 确定按钮 点击事件 添加 筛选 之前的获取的相反值 -->
                <div class="ProjectPm-span-b-btn2" @click="getList()">
                  <img src="../../assets/shaixuan2.png" alt />
                </div>
              </div>
            </div>
          </van-popup>
        </mt-button>
      </mt-header>
    </div>

    <!-- 第一行 -->
    <div v-if="rongtuo!=0">
      <router-link
        class="Project-list"
        :to="{name:'ProjectBidOne',query:{id:list.jie_id}}"
        tag="div"
        v-for="list in lists"
        :key="list.id"
      >
        <!-- 项目开始 -->
        <div class="Project-list-one">
          <span class="Project-list-one-text1">{{list.title}}</span>
          <span class="Project-list-one-text2">{{shijian(list)}}</span>
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
                :text="getAdd(list)"
                :rate="list.jindu"
                v-model="list.rate"
                size="57.5px"
                :stroke-width="60"
                :color="getColor(list)"
                layer-color="#ebedf0"
                :spend="70"
                default
                :clockwise="true"
              />
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div v-else class="imgs">
      <img src="../../assets/sm_19.jpg" alt />
    </div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="15"
    ></div>
  </div>
</template>

<script>
import { formatDate } from "../../modules/datab.js";
import qs from "qs";
import { Toast } from "mint-ui";
import { Circle } from "vant";
import Vue from "vue";
import { all } from "q";
import { type } from "os";
import { log } from 'util';
Vue.use(Circle);

export default {
  name: "Project",
  watch: {
    bba() {
      this.lists = []; //数组的内容清空
      this.page = 1; //页码从第一页开始
      this.hasMore = true; // 默认都是有更多数据
    }
  },
  data() {
    return {
      // 筛选
      showa: false,
      typea: 0,
      apra: 0,
      terma: 0,
      term: 0,
      apr: 0,
      type: 0,
      // 时间戳
      date1: 1565067600,
      date2: 1572998400,
      // 后台接口
      lists: [],
      page: 1,
      limit: 15,
      // loading
      loading: false,
      hasMore: true,
      rate: 0,
      id: this.$route.query.id,
      rongtuo:10
    };
  },
  methods: {
    // 筛选上面的x号，删除
    getDelete() {
      this.showa = false;
    },

    // 个人借款判断赋值
    shijian(obj) {
      if (obj.qixian < 1) {
        return obj.tianshu + "天";
      } else {
        return obj.qixian + "个月";
      }
    },

    //绑定上面的text 函数 传送 参数 ，这个接受参数
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
    // 根据状态来判断每个状态所要显示颜色
    getColor(obj) {
      if (obj.zhuangtai == 4) {
        return "#ebedf0";
      } else if (obj.zhuangtai == 6) {
        return "#f63";
      } else if (obj.zhuangtai == 10 && obj.jindu != 0) {
        return "#f63";
      } else {
        return '#ebedf0'
      }
    },

    //  筛选展示层 点击 是否弹出
    showPopup() {
      this.showa = true;
    },

    //  loading 无限加载
    loadMore() {
      // 加载更多的方法
      if (!this.hasMore) {
        this.loading = true;
        return false; //不在请求数据
      }
      // 在 loading 里面进行调用。
      this.getLoding();
    },

    getLoding() {
      let { page, limit } = this; //不使用{}结构时的写法 let page = this.page
      this.loading = true; //关闭无限滚动 5s
      // 插件提示语
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      let postData = qs.stringify({
        type: this.type,
        term: this.term,
        apr: this.apr,
        page: this.page,
        limit: this.limit
      });
      this.$http
        .post(
          "http://api.php.rongtuojinrong.com/rongtuojinrong/project/borrowList.json",
          postData
        )
        .then(res => {
          this.rongtuo = res.data.data.list.length
          //for in 求接口的key
          let data = res.data.data.list;
          for (let key in data) {
            data[key].jindu = parseInt(data[key].jindu);
            data[key].rate = 0;
          }
          this.lists = this.lists.concat(data); 
          this.loading = false; //继续开启无限滚动
          this.$toast.clear(); //关闭toast
          if (page * limit >= res.data.data.count) {
            //判端 是否有更多语句
            this.hasMore = false; //没有更多数据了
            return false;
          }
          this.page++;
        });
    },

    // 获取当前数据
    getList() {
      // 点击筛选确定 直接退出筛选页
      this.showa = false;
      this.page = 1;
        // 清空数据，开启loading，开启 hasMore ，调用loadMore方法
        this.lists= [];
        // 开启loading
        this.loading = false;
        // 开启hasMore
        this.hasMore = true;
        // 调用loadMore方法
        this.loadMore()
    },
    // 设置term ,给后台传参，和背景颜色的转变
    // v参数是传递的改变颜色的参数
    // e是吧每个点击的参数传给后台，返回值得数据参数
    setTerm(v, e) {
      this.terma = e;
      this.term = v;
    },
    // 设置apr
    setApr(v, e) {
      this.apra = e;
      this.apr = v;
    },
    // 设置type
    setType(v, e) {
      this.typea = e;
      this.type = v;
    },
    // 重置函数
    // 点击重置把所有的参数设置为初始值
    reSet() {
      this.term = 0;
      this.apr = 0;
      this.type = 0;
      this.terma = 5;
      this.apra = 10;
      this.typea = 20;
    }
  },
  //事件戳转换
  filters: {
    formatDate(time) {
      var date = new Date(time * 1000);
      return formatDate(date, "y-MM-dd");
    },
    formatDate2(time) {
      var date = new Date(time * 1000);
      return formatDate(date, "hh:mm");
    }
  },
  // 添加钩子`1
  created() {
    this.reSet();
  }
};
</script>

<style lang="scss" scoped>
.ProjectPm {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  margin-bottom: 0.5rem;
  .imgs {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    img {
      position: absolute;
      right: 0.73rem;
      top: 0.76rem;
    }
  }
  .mint-header {
    width: 100%;
    background: #fff;
    color: #000000;
    height: 0.5rem;
    label.mint-button-text {
      margin-bottom: 0;
      font-weight: bold;
      font-size: 16px;
      color: #5c5b5b;
    }
  }
  .mintui {
    font-size: 18px;
  }
  .mint-header-title {
    font-size: 18px !important;
    font-weight: 550 !important;
  }
  .Project-head-a {
    width: 100%;
    height: 0.5rem;
    display: flex;
    justify-content: space-between;
    padding: 3%;
  }
  .Project-head-name img {
    width: 100%;
    height: 100%;
  }
  .Project-text {
    color: #282828;
  }
  .Project-text2 img {
    display: inline-block;
    height: 0.14rem;
    margin-top: -3px;
  }

  .Project-text2 {
    color: #7f7f7f;
    margin: 0 0.02rem;
    display: flex;
  }
  .Project-list {
    width: 94%;
    height: 1.2rem;
    background-color: #ffffff;
    margin: 0 auto;
    margin-bottom: 0.13rem;
    border-radius: 0.07rem;
  }

  .Project-list-one {
    width: 100%;
    padding: 2.5%;
    height: 0.44rem;
    display: flex;
    justify-content:space-between ;
    align-items:stretch;
  }
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
    align-self:flex-start;
    margin-left: -0.8rem;
  }
  .Project-list-one-text3 {
    float: right;
    font-size: 0.1rem;
    color: #999;
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
  }
  .Project-list-two .Project-list-two-text1 {
    height: 0.415rem;
  }
  .Project-list-two
    .Project-list-two-text1
    .Project-list-two-text1-interest1
    span {
    color: #fe6633;
    font-weight: bold;
    font-size: 0.2rem;
  }
  .Project-list-two
    .Project-list-two-text1
    .Project-list-two-text1-interest2
    span {
    font-size: 0.1rem;
    color: #646464;
  }
  .Project-list-two-text2 {
    height: 0.415rem;
    margin-top: 0.16rem;
  }
  .Project-list-two
    .Project-list-two-text2
    .Project-list-two-text2-interest3
    .Project-list-two-text2-wan {
    color: #1c1c1c;
    font-weight: bold;
  }
  .Project-list-two
    .Project-list-two-text2
    .Project-list-two-text2-interest3
    .Project-list-two-text2-wan1 {
    font-size: 0.09rem;
    padding: 1px;
  }
  .Project-list-two
    .Project-list-two-text2
    .Project-list-two-text2-interest4
    span {
    font-size: 0.1rem;
  }
  .Project-list-two-text3 {
    height: 0.415rem;
  }
  .Project-head-deadline {
    width: 100%;
    position: relative;
  }

  .Project-head-deadline .Project-head-deadline-text {
    width: 100%;
    height: 13px;
    padding: 3%;
    margin-top: 0.31rem;
  }

  .ProjectPm-span {
    float: left;
    line-height: 13px;
    font-weight: bold;
  }

  .Project-reset button {
    width: 100%;
    border-radius: 10px;
  }
  .Project-confirm button {
    width: 100%;
    border-radius: 10px;
  }
  // 筛选 页面

  .ProjectPm-span-a {
    width: 100%;
    height: 1.13rem;
    margin-bottom: 0.3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .ProjectPm-span-b {
    width: 100%;
    height: 1.185rem;
    .ProjectPm-span-b1 {
      width: 2.145rem;
      height: 1.3rem;
      margin: 0px auto;
      span {
        display: inline-block;
        font-size: 0.14rem;
        margin-left: -1.89rem;
        margin-bottom: 0.1rem;
      }
      .ProjectPm-span-b1-b {
        width: 100%;
        height: 0.43rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .ProjectPm-span-b1-b1 {
          // width: 0.575rem;
          padding: 0.09rem;
          // height: 0.35rem;
          // line-height: 0.275rem;
          border-radius: 0.03rem;
          border: 1px solid #ccc;
        }
        .ProjectPm-span-b1-b2 {
          // width: 0.575rem;
          padding: 0.09rem;
          // height: 0.35rem;
          border: 1px solid #ccc;
          border-radius: 0.03rem;
        }
        .ProjectPm-span-b1-b3 {
          // width: 0.64rem;
          padding: 0.09rem;
          // height: 0.37rem;
          border: 1px solid #ccc;
          border-radius: 3px;
        }
      }
      .ProjectPm-span-b1-c {
        width: 100%;
        height: 0.45rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ProjectPm-span-b1-c1 {
          // width: 0.635rem;
          padding: 0.09rem;
          // height: 0.37rem;
          border-radius: 3px;
          border: 1px solid black;
        }
        .ProjectPm-span-b1-c2 {
          // width: 0.86rem;
          padding: 0.09rem;
          // height: 0.3rem;
          border-radius: 3px;
          border: 1px solid #ccc;
          margin-right: 0.44rem;
        }
      }
      .ProjectPm-span-b1-span {
        margin-left: -1.65rem;
      }
      .ProjectPm-span-b1-d {
        width: 100%;
        // height: 0.36rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ProjectPm-span-b1-b1 {
          // width: 0.575rem;
          padding: 0.09rem;
          // height: 0.35rem;
          border-radius: 3px;
          border: 1px solid #ccc;
        }
        .ProjectPm-span-b1-b2 {
          // width: 0.835rem;
          padding: 0.09rem;
          // height: 0.32rem;
          border: 1px solid #ccc;
          margin-right: 0.61rem;
          border-radius: 3px;
        }
      }
      .ProjectPm-span-b1-c {
        width: 100%;
        // height: 0.36rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ProjectPm-span-b1-c1 {
          // width: 0.835rem;
          padding: 0.09rem;
          // height: 0.32rem;
          border-radius: 3px;
          border: 1px solid #ccc;
        }
        .ProjectPm-span-b1-c2 {
          // width: 0.86rem;
          padding: 0.09rem;
          // height: 0.32rem;
          border-radius: 3px;
          line-height: -1.8rem;
          border: 1px solid #ccc;
          margin-left: 20px;
          border-radius: 3px;
        }
      }
    }
    .ProjectPm-span-b-btn {
      width: 100%;
      height: 0.35rem;
      position: fixed;
      bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .ProjectPm-span-b-btn1 {
        width: 1.15rem;
        height: 0.35rem;

        img {
          width: 100%;
          height: 100%;
          margin-left: 10px;
        }
      }
      .ProjectPm-span-b-btn2 {
        width: 1.15rem;
        height: 0.35rem;
        img {
          width: 100%;
          height: 100%;
          margin-left: -0.09rem;
        }
      }
    }
  }
  .activea {
    padding: 0.09rem;
    // height: 0.275rem;
    border: none !important;
    border-radius: 3px;
    background-color: #0159d4;
    color: #ffffff;
  }

  // 新添加的消除号
  .ProjectPm-span-a-img {
    width: 0.245rem;
    height: 0.245rem;
    position: relative;
    left: 87%;
    bottom: 90%;
  }
  .ProjectPm-span-a-img img {
    width: 100%;
    height: 100%;
  }
  .Project-list-two-text3-circle {
    .van-circle {
      .van-circle__text {
        font-size: 10px;
      }
    }
  }
}
</style>
