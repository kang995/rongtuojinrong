<!-- 新手帮助--> 
<template>
  <div class="helpBox">
    <!-- 头部 -->
    <headerBox title="新手帮助"></headerBox>
    <ul class="head_nav">
      <router-link :to="{name:'help'}" tag="li"  class="rborder" replace>客户服务</router-link>
      <router-link :to="{name:'video'}" tag="li" replace>视频教程</router-link>
    </ul>
    <router-view></router-view>
  </div>
  
</template>

<script>

export default {
 
  }

  
  // beforeRouteLeave(to, from, next){
  //   if(to.path=='/home'){
  //     next({path:'/home'});
  //   }else if(to.path=='/find'){
  //     next({path:'/find'})
  //   }
  // },
</script>

<style lang="scss">
body{
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
.helpBox {
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
    } 
     .router-link-active {
                color: #0159d5;
                }
  }

  .help_img {
    width: 100%;
    height: 1.37rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .help_lei {
    width: 100%;
    height: 3.55rem;
    padding: 0.11rem;
    background: #f9f9f9;
    .help_box {
      background: #fff;
      border-radius: 0.1rem;
      overflow: hidden;
      .introduce {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
         padding: 0.25rem 0 0.25rem 0;
        li {
          width: 33.2%;
          height: 1.05rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          span {
            color: #666;
            font-size: 0.12rem;
            margin-top: 0.1rem;
          }
        }
        li:nth-child(1) {
          border-right: 1px solid #e5e9f2;
        }
        li:nth-child(2) {
          border-right: 1px solid #e5e9f2;
        }
        li:nth-child(4) {
          border-right: 1px solid #e5e9f2;
        }
        li:nth-child(5) {
          border-right: 1px solid #e5e9f2;
        }
        li:nth-child(1) img {
          width: 0.2rem;
          height: 0.25rem;
        }
        li:nth-child(2) img {
          width: 0.25rem;
          height: 0.22rem;
        }
        li:nth-child(3) img {
          width: 0.25rem;
          height: 0.21rem;
        }
        li:nth-child(4) img {
          width: 0.2rem;
          height: 0.2rem;
        }
        li:nth-child(5) img {
          width: 0.2rem;
          height: 0.18rem;
        }
        li:nth-child(6) img {
          width: 0.21rem;
          height: 0.21rem;
        }
      }
    }

    .xian {
      width: 98%;
      margin: 0.15rem auto;
      height: 1px;
      border-bottom: 1px solid #e5e9f2;
    }
  }
}
}
</style>
 
