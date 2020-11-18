  <template>
  <div class="textBox" ref="topTab">
    <div class="absolute">
      <div class="header">融言融讯</div>
      <!-- <ul class="nav">
        <router-link :to="{name:'cjnew'}" tag="li" class="header-nav-a" >财经新闻</router-link>
        <router-link :to="{name:'mdtime'}" tag="li" class="header-nav-a" >美读时光</router-link>
        <router-link :to="{name:'jrclass'}" tag="li" class="header-nav-a" >金融课堂</router-link>
      </ul>-->
      <ul class="nav" :class="{fixed:isFixed}">
        <li
          v-for="item in list1"
          :key="item.id"
          :class="{'header-nav-a':true,'router-link-active':item.id==num}"
          @click="selectClick(item.id)"
        >{{ item.cate_name}}</li>
      </ul>
      <mt-navbar v-model="selected">
        <!-- <mt-tab-item id="1">财经新闻</mt-tab-item>
        <mt-tab-item id="2">美读时光</mt-tab-item>
        <mt-tab-item id="3">金融课堂</mt-tab-item>-->
        <!-- <mt-tab-item v-for="item in list1" :key="item.id" :id="item.id" @click.native="selectClick(item.id)">{{ item.cate_name}}</mt-tab-item> -->
      </mt-navbar>
    </div>
    <div>
      <div :id="num">
        <div class="news">
          <ul>
            <router-link
              v-for="item in list"
              :to="{name:'cjdetail',query:{acticle_id:item.article_id}}"
              tag="li"
              :key="item.index"
            >
              <div class="left listw">
                <div class="listte">{{item.title}}</div>
                <div class="pt">
                  <span class="left">{{item.addtime}}</span>
                  <span class="right">融托金融</span>
                </div>
              </div>
              <div class="right t_img">
                <img v-lazy="item.thumb" alt />
              </div>
            </router-link>
          </ul>
          <div
            v-infinite-scroll="loadMore"
            infinite-scroll-immediate-check="false"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
          ></div>
        </div>
      </div>
    </div>

    <!-- <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="num" style="display:block">
          <div class="news">
        <ul>
          <router-link  v-for="item in list" :to="{name:'cjdetail',query:{acticle_id:item.article_id}}"  tag="li" :key="item.index" >
            <div class="left listw">
              <div class="listte">{{item.title}}</div>
              <div class="pt">
                <span class="left">{{item.addtime}}</span>
                <span class="right">融托金融</span>
              </div>
            </div>
            <div class="right t_img">
              <img  v-lazy="item.thumb" alt />
            </div>
          </router-link>
        </ul>
      </div>
        </mt-tab-container-item>
    </mt-tab-container>-->
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      scrollTop: "",
      offsetTop: "",

      isFixed: false,
      selected: "5",
      list: [],
      list1: [],
      num: "",
      notices: [],
      page: 1,
      limint: 10,
      loadig: false, //默认开启无限滚动   true的话就代表关闭无限滚动
      hasMore: true //有更多数据
    };
  },
  components: {},
  watch: {
    type() {
      this.list = []; //数组内容要清空
      this.page = 1; //页码从第一页开始
      this.hasMore = true; //默认都是有更多数据
      this.getList(); //请求数据
    }
  },
  methods: {
    loadMore() {
      //加载更多的方法
      if (!this.hasMore) {
        //如果没有更多数据了
        Toast({
          message: "我是有底线的....",
          duration: 2000,
          position: "bottom"
        });
        //关闭无限滚动
        this.loading = true;
        return false; //不在请求数据
      }
      this.getList();
    },
    getList() {
      let { page, limit } = this; //不使用{}解构时的写法：let page = this.page
      // let postData = qs.stringify({ //向后台传入user_id
      //     cate_id:this.num,
      //     page,
      //     limit
      // });

      this.loading = true; //关闭无限滚动  5s
      this.$toast.loading({
          message: '加载中...',
          forbidClick: true
      });
      this.$post("/rongtuojinrong/article/lists.json", {
        cate_id: this.num,
        page,
        limit
      }).then(res => {
        this.list = this.list.concat(res.data.data.list);
        this.loading = false; //继续开启无限滚动
        this.$toast.clear();//关闭toast
        if (page * limit >= res.data.data.count) {
          //判断是否有更多数据
          this.hasMore = false; //没有更多数据了
          return false;
        }
        this.page++;
      });
    },

    selectClick(id) {
      if (this.scrollTop >= this.offsetTop) {
        window.scroll(0, this.offsetTop);
      }

      this.num = id;

      // let postData = qs.stringify({
      //   cate_id: id,
      // });
      this.$post("/rongtuojinrong/article/lists.json", {
        cate_id: id
      })
        .then(res => {
          this.list = res.data.data.list;
        })
        .catch(err => {
          console.log("查询失败");
        });
      this.page = 2;
    },
    onScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = this.$refs.topTab.offsetTop;
      var test = this.$refs.topTab.parentNode.firstChild;
      this.scrollTop = scrollTop;
      this.offsetTop = offsetTop;
      // console.log(this.scrollTop, this.offsetTop)
      if (scrollTop >= offsetTop) {
        this.isFixed = true;
        test.innerHTML = "融言融信";
      } else {
        this.isFixed = false;
        test.innerHTML = "发现更多精彩";
      }
    }
    // scrollT(){
    //   window.scroll(0,this.offsetTop)
    // },
  },
  created() {
    this.$post("/rongtuojinrong/article/cates.json")
      .then(res => {
        this.list1 = res.data.data;
      })
      .catch(err => {
        console.log("查询失败");
      });

    window.addEventListener("scroll", this.onScroll);
    this.selectClick(5);
  },

  activated() {
    this.loading = false;
  },
  deactivated() {
    this.loading = true;
  },

  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style lang="scss" scoped>
  .textBox {
    margin: 0.08rem 0.11rem 0.1rem 0.11rem;
    height: auto;
    background: #fff;
    border-radius: 0 0 0.03rem 0.03rem;
    button,
  img {
    padding: 0;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
    .absolute {
      .mint-navbar {
        .mint-tab-item {
          text-decoration: none;
        }
        .is-selected {
          border-bottom: 1px solid #26a2ff;
        }
      }
    }

    .fixed {
      position: fixed;
      width: 94.2%;
      top: 0.5rem;
      background-color: #fff;
      z-index: 99;
    }
    .header {
      width: 100%;
      height: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333;
      font-size: 0.16rem;
      background: #fff;
      letter-spacing: 2px;
    }
    .nav {
      font-size: 0.12rem;
      display: flex;
      flex-wrap: wrap;
      height: 0.33rem;
      justify-content: space-around;
      .header-nav-a {
        width: 16%;
        height: 0.32rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .router-link-active {
        line-height: 0.32rem;
        border-bottom: 1px solid #3776f7;
        color: #3776f7;
      }
    }
    .news {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin: 0 auto 1rem;
      ul {
        li {
          width: 92%;
          height: 0.86rem;
          border-bottom: 1px solid #e5e9f2;
          display: flex;
          justify-content: space-between;
          margin: 0 auto;
          .listw {
            width: 60%;
            color: #333;
            line-height: 0.2rem;
            .listte {
              margin-top: 0.12rem;
              height: 0.42rem;
              line-height: 0.15rem;
              text-overflow: ellipsis;
              overflow: hidden;
              font-size: 0.12rem;
            }
            .pt {
              margin-top: 0.02rem;
              color: #999;
              font-size: 12px;
            }
          }
          .t_img {
            width: 0.9rem;
            height: 0.68rem;
            overflow: hidden;
            border-radius: 0.05rem;
            margin-top: 0.08rem;
            img {
              width: 100%;
              height: 0.68rem;
            }
          }
        }
        li:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
