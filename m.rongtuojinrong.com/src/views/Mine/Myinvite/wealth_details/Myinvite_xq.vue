<!--财富明细详情页--->
<template>
  <div class="myinveBox">
    <div class="wealthC">
      <!-- 奖励明细 this.$route.query.nianyue-->
      <!-- <mt-header title="奖励明细" fixed>
        <router-link to="/Mydetailed" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>-->
      <headerBox :title="this.$route.query.nianyue.split('-')[0]+'年'+this.$route.query.nianyue.split('-')[1]+'月奖励明细'"></headerBox>
      <ul class="nav">
        <!-- <router-link :to="{name:'All'}" tag="li" class="header-nav-a">全部</router-link>
        <router-link :to="{name:'rongtuo'}" tag="li" class="header-nav-a">融托奖励</router-link>
        <router-link :to="{name:'mindeng'}" tag="li" class="header-nav-a">民登奖励</router-link>
        <router-link :to="{name:'youxuan'}" tag="li" class="header-nav-a">优选奖励</router-link>
        <router-link :to="{name:'guwen'}" tag="li" class="header-nav-a">顾问奖励</router-link>
        -->
      <li  v-for="item in list1"
      :key="item.id"
      :class="{'header-nav-a':true,'router-link-active' :item.id==num}"
      @click="selectClick(item.id,item.type)"
     >{{item.title}}</li>
     <!--    @click.native="type=item.type"  -->
      </ul> 
      <!-- 列表内容 -->
      <ul class="alldetails"  :id="num">
        <div v-if="alldetails.length>0">
          <li  v-for="listde in  alldetails" :key="listde.index">
            <div>
              <p class="left w40">{{listde.title}}</p>
              <p class="right w60">{{listde.jiner}}元</p>
            </div>
            <div class="clear">
              <p class="left w40">{{listde.riqi}}</p>
              <P class="right w60">{{listde.beizhu}}</P>
            </div>
          </li>
        </div>
        <div v-else class="nullinfo">
                <div class="shownull">
                    <img src="@/assets/sm_19.jpg">
                </div>
       </div> 
        <!--   <li>
         <div class="left"><p class="c3">融托民登奖励</p><p>2018-11-30</p></div> 
         <div class="right"><p class="c3">8.33元</p><p>duncc12456</p></div>
      </li>
       <li>
         <div class="left"><p class="c3">优选奖励</p><p>2018-11-30</p></div> 
         <div class="right"><p class="c3">8.33元</p><p>duncc12456</p></div>
        </li>-->
      </ul>
      <div v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="7"
    ></div>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      alldetails: [],
      list1:[
        {id:1,title:'全部',type:0},  
        {id:2,title:'融托奖励',type:1},
        {id:3,title:'优选奖励',type:2},
        {id:4,title:'民登奖励',type:3},
        {id:5,title:'顾问奖励',type:4},
      ],
      num: '',
      loading: false,
      hasMore: true ,
      page: 1,
      limit:7,
      type:''
    };
  },
  methods: {
    loadMore(){
      //加载更多的方法
      if (!this.hasMore){ //如果没有更多数据了
        if(this.page<=2){
            return false;
        }
        Toast({
          message: "我是有底线的....",
          duration: 2000,
          position: "bottom"
        });
        //关闭无限滚动
        this.loading = true;
        return false; //不在请求数据
      }
      this.getList(this.num,this.type);
    },
    getList(num,id) {
        this.loading = true; //关闭无限滚动  5s
        let toast = Toast({
          message: "正在加载....",
          iconClass: "fa fa-cog fa-spin",    
          duration: -1
        });
    this.$post("/rongtuojinrong/userCenter/invite/sentRewardDetail.json", {
      date: this.$route.query.nianyues,
      type: id,
      page: this.page,
      defidenshuxing: this.$store.state.invite.defidenshuxing,
    }).then(res => {
      this.loading = false;
      if(res.data.status){
          this.hasMore = false; 
          toast.close(); 
          return;
        }
      this.alldetails = this.alldetails.concat(res.data.data);
      this.page++;
     
      toast.close(); 
      console.log(res.data.data);
    });
    },
    selectClick(num,id){
        this.num = num;
        this.type = id;
        this.page = 1;
        this.hasMore =true;
        this.alldetails = [];
        this.getList(num,id);
    }

  },
  created() {
    this.selectClick(1,0);
  }
};
</script>

<style lang="scss" >
body {
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .c3 {
    color: #333;
  }
  .w40 {
    width: 32%;
  }
  .w60 {
    width: 68%;
    text-align: right;
    word-break: break-all;
    word-wrap: break-word;
  }
  .clear {
    clear: both;
  }
  .myinveBox {
    .wealthC {
      overflow: hidden;
      .mint-header {
        color: black;
        font-size: 0.15rem;
        background: #fff;
        height: 0.5rem;
        border-bottom: 1px solid rgb(229, 233, 242);
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
      .nav {
        display: flex;
        margin-top: 0.5rem;
        width: 100%;
        background: #fff;
        position: fixed;
        .header-nav-a {
          width: 25%;
          height: 0.46rem;
          display: flex;
          line-height: 0.32rem;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          border-bottom: 1px solid #e5e9e5;
        }
        .router-link-active {
          border-bottom: 1px solid #3776f7;
          color: #3776f7;
        }
      }
    }
    .alldetails {
      margin-top: 0.97rem;
      height: auto;
      overflow: hidden;
      li {
        height: auto;
        border-bottom: 1px solid #e5e9e5;
        padding: 0.1rem;
        overflow: hidden;
        p {
          line-height: 0.3rem;
        }
      }

      .zanwu{
        font-size: 0.14rem;
        margin-top: 0.2rem;
        text-align: center;
        
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
  }
}
</style>
