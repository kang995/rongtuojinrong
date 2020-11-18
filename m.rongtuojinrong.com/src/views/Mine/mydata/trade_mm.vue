<!--我的~我的账户信息~~交易密码管理--->

<template>
  <div class="mineContents">
    <!-- 头部 -->
    <!-- <mt-header title="交易密码管理">
      <router-link to="/safe" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
<headerBox title="交易密码管理"></headerBox>

    <div class="mineContent-3">
      <ul>
        <router-link to="/xg_trademm" tag="li">
          <span class="mineContent-3-s">修改交易密码</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link>

        <router-link to="/cz_end_trademm" tag="li">  <!--   to="/cz_end_trademm" -->
          <span class="mineContent-3-s">重置交易密码</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link>
        
      </ul>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss" >
  .mineContents {
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #f9f9f9;
    position: absolute;
  .left {
    float: left;
  }
  .mtop {
    margin-top: 0.1rem;
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

    .mineContent-3 {
      margin-top: 0.5rem;
      ul li {
        height: 0.51rem;
        display: flex;
        align-items: center;
        padding: 0 0.18rem 0;
        justify-content: space-between;
        border-bottom: 1px solid #eff2f8;
        background-color: #fff;
        .mineContent-3-s {
          color: #333333;
        }
        .mineContent-3-c {
          display: flex;
          align-items: center;
          span {
            margin-right: 0.1rem;
          }
          .mineContent-3-c-ls {
            margin-right: 0;
          }
          .reviseimg {
            width: 0.37rem;
            height: 0.37rem;
            border-radius: 0.5rem;
            overflow: hidden;
            margin-right: 0.05rem;
            img {
              width: 100%;
            }
          }
        }
      }
      ul li img {
        display: inline-block;
        width: 0.06rem;
      }

   
    }
  }
</style>
