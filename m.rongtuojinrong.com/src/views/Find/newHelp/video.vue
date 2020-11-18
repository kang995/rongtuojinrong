<!-- 新手帮助 视频教程--> 
<template>
  <div class="videoBox">
    <!-- 充值 -->
    <router-link tag="div" :to="{path:'/videoRedeem',query:{article_id:nav.article_id}}" v-for="nav in navs" :key="nav.id" class="video_img">
      <!--  <video id="video_id" controls="controls" src=""></video>  -->
    </router-link>
    <!-- 列表 -->
    <div class="news">
      <ul>
        <!-- 循环生成列表 -->
        <router-link tag="li" :to="{name:'videoChangeCard',params:{article_id:list.article_id}}" v-for="list in lists" :key="list.id" >
          <div class="left listw">
            <div class="listte">{{list.title}}</div>
            <div class="pt">
              <span class="left">融托金融</span>
              <span class="right">{{list.addtime}}</span>
            </div>
          </div>
          <div class="right t_img">
            <img :src="list.thumb" alt />
            <img src="../../../assets/矢量智能对象3@2x_56.png" alt=""/>
          </div>
        </router-link>
        <!-- 更换银行卡 -->
         <!-- <router-link tag="li" :to="{name:'videoChangeCard',params:{article_id:lists[0]['article_id']}}">
          <div class="left listw">
            <div class="listte">{{lists[0].title}}</div>
            <div class="pt">
              <span class="left">融托金融</span>
              <span class="right">{{lists[0].addtime}}</span>
            </div>
          </div>
          <div class="right t_img">
            <img :src="lists[0].thumb" alt />
            <img src="../../../assets/矢量智能对象3@2x_56.png" alt=""/>
          </div>
        </router-link> -->
        <!-- 修改密码 -->
        <!-- <router-link tag="li" :to="{name:'videoChangeCard1',params:{article_id:lists[1]['article_id']}}">
          <div class="left listw">
            <div class="listte">{{lists[1].title}}</div>
            <div class="pt">
              <span class="left">融托金融</span>
              <span class="right">{{lists[1].addtime}}</span>
            </div>
          </div>
          <div class="right t_img">
                <img :src="lists[1].thumb" alt />
                <img src="../../../assets/矢量智能对象3@2x_56.png" alt=""/>
          </div>
        </router-link> -->
        <!-- 修改手机号 -->
        <!-- <router-link tag="li" :to="{name:'videoChangeCard2',params:{article_id:lists[2]['article_id']}}">
          <div class="left listw">
            <div class="listte">{{lists[2].title}}</div>
            <div class="pt">
              <span class="left">融托金融</span>
              <span class="right">{{lists[2].addtime}}</span>
            </div>
          </div>
          <div class="right t_img">
              <img :src="lists[2].thumb" alt />
              <img src="../../../assets/矢量智能对象3@2x_56.png" alt=""/>
          </div>
        </router-link> -->
      </ul>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import headerBox from "@/components/header"
export default {
   components:{
    headerBox
  },
    data(){
      return{
        lists:[],//列表数据
        navs:[]//banner图数据
      }
    },
    methods:{
      getLists(){
          // let postData = qs.stringify({ 
          //   cate_id:4
          // })
          this.$post('/rongtuojinrong/article/lists.json',{
                cate_id:4
          }).then(res=>{
            this.lists = res.data.data.list;
            // 1.测试环境中的接口数据
            // this.lists = this.lists.slice(4);//不改变原数组（从下标为4开始截取）
            // this.navs = res.data.data.list.splice(3,1)//改变原数组(截取下标为3的一个元素)
            // 2.正式环境中的接口数据
            this.lists = this.lists.slice(1);//不改变原数组（从下标为1开始截取）
            this.navs = res.data.data.list.splice(0,1)//改变原数组(截取下标为0的一个元素)
            // console.log(this.lists);
          })
      }
    },
    created(){
      this.getLists();
    }
};
</script>

<style lang="scss" scoped>
body {
  background: #f9f9f9;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .displayNO {
    display: none;
  }
  .videoBox {
    width: 100%;
    height: auto;
    font-size: 14px;
    .mint-header {
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

    .img_button {
      width: 0.16rem;
      height: 0.165rem;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .head_nav {
      background: #fff;
      overflow: hidden;
      padding: 0.14rem 0 0.14rem 0;
      margin-top:0.5rem;
      li {
        width: 50%;
        float: left;
        height: 0.31rem;
        line-height: 0.31rem;
        text-align: center;
      }
      .rborder {
        border-right: 1px solid #e5e9f2;
      }
      .active {
        color: #0159d5;
        /*  border-bottom: 1px solid #0159d5; */
      }
    }
    .video_img {
      width: 100%;
      height: 1.37rem;
      background: url(../../../assets/v_02.jpg) no-repeat center;
      background-size: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .news {
      height: auto;
      overflow: hidden;
      margin: 0.3rem 0.11rem 1rem 0.11rem;
      border-radius: 0.1rem;
      background: #fff;
      ul {
        li {
          padding: 0 0.1rem 0 0.1rem;
          height: 0.86rem;
          border-bottom: 1px solid #e5e9f2;
          .listw {
            width: 70%;
            color: #333;
            line-height: 0.2rem;
            .listte {
              margin-top: 0.09rem;
              height: 0.42rem;
              line-height: 0.15rem;
              text-overflow: ellipsis;
              overflow: hidden;
              /* white-space:nowrap; */
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
            border-radius: 0.02rem;
            margin-top: 0.08rem;
            position:relative;
            img:nth-child(1){
              width: 100%;
            }
            img:nth-child(2){
              display:inline-block;
              width:0.18rem;
              height:0.19rem;
              position: absolute;
              top:0;
              bottom:0;
              left:0;
              right:0;
              margin:auto; 
            }
          }
        }
        li:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
 
