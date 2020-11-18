<!--我的邀请~设置推荐权限--->
<template>
  <div class="mineContents">
    <!-- 头部 -->
    <!-- <mt-header title="设置">
      <router-link to="/myinviteindex" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
     -->
     <headerBox title="设置"></headerBox>

    <div class="mineContent-mm">
    
      <!-- <div class="yzm">
        <span>姓名</span>
        <input type="text" placeholder="请输入姓名" />
      </div> -->
      <div class="yzm">
        <span>好友手机号：</span>
        <input type="text" placeholder="请输入好友手机号" />
      </div>

      <div class="quanxian">
        <span>设置推荐权限:</span>
         <input type="radio" />0.5
         <input type="radio" class="ml7" />0.7
      </div>


      <div class="photoend">
        <router-link tag="button" to="/xg_end_trademm">确认提交</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
body {
  background: #f9f9f9;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .mtop {
    margin-top: 0.1rem;
  }
  .ml7{margin-left:0.7rem;}
  .c3 {
    color: #333;
  }
  .clear {
    clear: both;
  }
  .cju {
    color: #ff6632;
  }
  .mineContents {
    width: 100%;
    height: auto;
    font-size: 14px;
    overflow: hidden;

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

    .mineContent-mm {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin: 0.5rem auto;
      .yzm {
        width: 100%;
        height: 0.44rem;
        background: #fff;
        padding: 0 0.1rem;
        color: #333;
        line-height: 0.45rem;
        border-bottom: 1px solid #e5e9e5;
        span {
          width: 25%;
          display: inline-block;
          color: #333;
        }
        input {
          border: none;
          width: 50%;
          line-height: 0.4rem;
        }
  
      }

 .quanxian {
        width: 100%;
        height: 0.44rem;
        background: #fff;
        padding: 0 0.1rem;
        color: #333;
        line-height: 0.45rem;
        border-bottom: 1px solid #e5e9e5;
        span {
          width: 25%;
          display:block;
          color: #333;
          float: left;
        }
        input {
          border: none;
          width: 10%;
          line-height: 0.4rem;
        }
  
      }


      .photoend {
        width: 100%;
        height: auto;
        overflow: hidden;
        padding: 0.5rem 0.1rem;
        button {
          width: 100%;
          height: 0.47rem;
          background: #005ad4;
          color: #fff;
          line-height: 0.47rem;
          text-align: center;
          border: none;
          border-radius: 0.04rem;
        }
      }
    }
  }
}
</style>
