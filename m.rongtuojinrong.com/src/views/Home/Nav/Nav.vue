<!-- 已出借时导航页 -->
<template>
<!-- 未出借时隐藏，已出借时显示（根据出借状态显示或隐藏） -->
  <div class="navBox" v-show="isShow">
    <ul class="nav">
      <router-link :to="{name:'plan'}" tag="li">
        <img src="../../../assets/img03.png" alt />
        <span class="a1">回款计划</span>
      </router-link>
      <li @click="popupVisible=!popupVisible">
        <img src="../../../assets/img04.png" alt />
        <span>邀请好友</span>
      </li>
       <mt-popup v-model="popupVisible">
          <div class="popupBox">
            <div class="popup_header">
              <p>奖励政策</p>
            </div>
            <div class="popup_top">
              每成功邀请1位好友首次出借成功后，邀请人可获得20元红包奖励;还可享受好友自首次出借开始日起30天内，好友每笔出借金额年化2‰的现金奖励。
            </div>
            <div class="popup_center">
              <img src="../../../assets/img15.png" alt="">
              <span>选择分享平台</span>
              <img src="../../../assets/img15s.png" alt="">
            </div>
            <div class="popup_bottom">
              <ol>
                <li>
                  <img src="../../../assets/img16.png" alt="">
                  <span>微信好友</span>
                </li>
                <li><img src="../../../assets/img17.png" alt=""><span>朋友圈</span></li>
                <li><img src="../../../assets/img19.png" alt=""><span>QQ</span></li>
                <li><img src="../../../assets/img18.png" alt=""><span>微博</span></li>
              </ol>
            </div>
          </div>
        </mt-popup>
      <router-link :to="{name:'message',query:{title:title}}" tag="li">
          <img src="../../../assets/img05.png" alt />
          <span>信息披露</span>
      </router-link>
      <router-link :to="{name:'today'}" tag="li">
        <img src="../../../assets/img06.png" alt />
        <span>今日任务</span>
      </router-link > 
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data() {
    return {
      popupVisible: false,
      title:'信息披露',
      isShow:false//控制出借状态变量
      // config:{
      //   url                 : '', // 网址，默认使用 window.location.href
      //   source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
      //   title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
      //   description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
      //   image               : '', // 图片, 默认取网页中第一个img标签
      //   sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
      //   disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
      //   wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
      //   wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
      // }
    }
  },
  computed:{
    ...mapState({
        invest_count:state=>state.login.token.invest_count
    })
  },
  methods:{
    getToken(){
          if(+this.invest_count){//判断出借状态(0-N)
            this.isShow= true;
            // console.log(typeof this.invest_count)
        }
    }
  },
  created(){
    this.getToken();
  }
};
</script>

<style lang="scss" scoped>
.navBox {
  width: 100%;
  height: 0.96rem;
  background:#fff;
  padding: 0 0.20rem;
  .nav {
    width:100%;
    height: 0.96rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      height: 0.96rem;
      width:25%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 0.44rem;
        height: 0.44rem;
      }
      span {
        font-size: 0.11rem;
        color: #333;
        margin-top: 0.08rem;
      }
    }
     .mint-popup {
        border-radius: 10px;
        .popupBox {
          width: 3rem;
          height: 3.25rem;
          border-radius: 10px;
          .popup_header {
            width: 3rem;
            height: 0.75rem;
            background: url(../../../assets/img40.png) no-repeat center;
            background-size: 100%;
            border-radius:10px 10px 0 0;
            p {
              font-size: 0.25rem;
              color: #724301;
              padding: 0.29rem 0 0 0.37rem;
            }
          }
          .popup_top{
            font-size:0.12rem;
            color:#292929;
            padding: 0.2rem 0 0.12rem 0;
            border-bottom:1px dashed #e3edfc;
            margin:0 0.20rem;
            line-height:0.17rem;
          }
          .popup_center{
            height:0.7rem;
            width:100%;
            display:flex;
            justify-content:center;
            align-items:center;
            img{
              display:block;
              width:0.14rem;
              height:0.1rem;
              margin-top:8px;
            }
            span{
              font-size:0.15rem;
              color:#161616;
              padding:0 0.11rem;
            }
          }
          .popup_bottom{
            width:100%;
            height:0.75rem;
            padding:0 0.27rem;
            ol{
              display:flex;
              justify-content:space-between;
              align-items:center;
              height:0.75rem;
              li{
                display:flex;
                justify-content:flex-start;
                align-items:center;
                flex-direction:column;
                height:0.75rem;
                img{
                  width:0.3rem;
                  height:0.3rem;
                }
                span{
                  color:#1c1c1c;
                  height:0.1rem;
                  margin-top:0.07rem;
                }
              }
            }
          }
        }
      }
  }
}
</style>
