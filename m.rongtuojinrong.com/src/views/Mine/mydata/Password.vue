<!--我的~~~安全设置~登录密码管理--->

<template>
  <div class="mineContents">
    <!-- 头部 -->
    <!-- <mt-header title="登录密码管理">
      <router-link to="/safe" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox title="登录密码管理"></headerBox>

    <div class="mineContent-3">
      <ul>
        <router-link to="/xg_password"   tag="li">
          <span class="mineContent-3-s">修改登录密码</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link>

        <router-link     :to="{name:'cz_password',query:{title:'重置登录密码'}}"  tag="li">  <!-- to="/cz_password" -->
          <span class="mineContent-3-s">重置登录密码</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link>
        <router-link  :to="{name:'cz_password',query:{title:'设置登录密码'}}" tag="li">
          <span class="mineContent-3-s">设置登录密码</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
         </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import headerBox from '../../../components/header'
export default {
    components:{
        headerBox
    }
}
</script>

<style lang="scss" >
  .left {
    float: left;
  }
  .mtop {
    margin-top: 0.1rem;
  }
  .mineContents {
    /*  margin: 0 0.11rem 0;
        border-radius: 0.07rem;
 */
    position:absolute;
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #f9f9f9;
    position: absolute;
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
      .addstyle {
        height: 0.71rem;
        .addimg {
          width: 0.5rem;
          height: 0.5rem;
          overflow: hidden;
          border-radius: 0.5rem;
          float: left;
          img {
            width: 100%;
          }
        }
        .addpd p {
          padding: 0.04rem 0 0 0.1rem;
          color: #333;
        }
      }
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

      .quit {
        width: 100%;
        height: auto;
        overflow: hidden;
        padding: 0.8rem 0.18rem;
        button {
          width: 100%;
          height: 0.43rem;
          border: none;
          background: #005ad4;
          color: #fff;
          text-align: center;
          border-radius: 0.04rem;
        }
      }
    }
  }
</style>
