<template>
  <div class="Mydetaileds">
    <div  v-if="sign==0">
      <ul class="minetextlist_yf">
        <li v-for="listing in delist" :key="listing.id">
          <div>
            <p class="left w40">{{listing.lxming}}</p>
            <p class="right w60">{{listing.jiner}}元</p>
          </div>
          <div class="clear">
            <p class="left w40">{{listing.shijian}}</p>
            <P class="right w60">{{listing.xiangmuming}}</P>
          </div>
        </li>
    </ul>
   </div>
      <div v-else class="nullinfo">
                <div class="shownull">
                    <img src="@/assets/sm_19.jpg">
                </div>
       </div> 
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="7"
    ></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data(){
    return{
      delist: [],//列表
      page: 1,
      limit:7,
      loading: false, //默认开启无限滚动   true的话就代表关闭无限滚动
      hasMore: true ,//有更多数据
      sign:''
    }
  },
  methods:{
    loadMore(){
      //加载更多的方法
      if (!this.hasMore){ //如果没有更多数据了
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
    getList(){
      let {page,limit} = this; //不使用{}解构时的写法：let page = this.page
      this.loading = true; //关闭无限滚动  5s
      let toast = Toast({
        message: "正在加载....",
        iconClass: "fa fa-cog fa-spin",
        duration: -1
      });
      //let invite = this.$store.state.invite.invite;
      this.$post("/rongtuojinrong/userCenter/invite/inviteDetail.json", {
        defidenshuxing: this.$store.state.invite.defidenshuxing,
        page,
        limit,
        CmdId: "shberewa"
      }).then(res => {
        this.loading = false; //继续开启无限滚动
        this.sign = res.data.status;
        if(res.data.status){
          this.hasMore = false; //没有更多数据了
          toast.close(); 
          return;
        }
        this.delist = this.delist.concat(res.data.data);
        console.log(res.data.data);
        toast.close(); //关闭toast
        this.page++;
      })
    }   
  },

  created() {}
};
</script>


<style lang="scss" >
  .Mydetaileds {
    width: 100%;
    height: 100%;
    font-size: 14px;
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
  .c3 {
    color: #333;
  }
  .clear {
    clear: both;
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
    }
    .minetextlist_yf {
      height: auto;
      overflow: hidden;
      li {
        height:auto;
        border-bottom: 1px solid #e5e9f2;
        overflow: hidden;
        padding:0.11rem 0.15rem;
        p {
          line-height: 0.35rem;
        }
      }
    }
         .nullinfo{
                background-color: #fff;
                display: flex;
                justify-content: center;
                margin-top: 2rem;
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
