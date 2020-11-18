<!--我的~我的账户信息~~个人信息--->

<template>
  <div class="mineContents">
    <!-- 头部 -->
    <headerBox title="个人信息"></headerBox>

    <div class="mineContent-3">
      <ul>
        <li class="mtop">
          <span class="mineContent-3-s">头像</span>
          <div class="mineContent-3-c">
            <div class="reviseimg">
              <img :src="this.$store.state.invite.invite.avatar" alt />
            </div>
            <!-- <img src="@/assets/img63.png" @click="sheetVisibleclick" /> -->
          </div>
        </li>

        <li>
          <span class="mineContent-3-s">用户名</span>
          <div class="mineContent-3-c">
            <span>{{this.$store.state.invite.invite.username}}</span>
          </div>
        </li>
        <li>
          <span class="mineContent-3-s">手机号</span>
          <div class="mineContent-3-c">
            <span>{{photo}}</span>
          </div>
        </li>
        <li>
          <span class="mineContent-3-s">真实姓名</span>
          <div class="mineContent-3-c">
            <div v-if="this.$store.state.login.token.is_identify==0" class="mineContent-3-c">
              <span class="noSign">未实名</span>
              <img src="@/assets/img63.png" />
            </div>
            <span v-else>{{zsname}}</span>
          </div>
        </li>
        <router-link tag="li" to="/address">
          <span class="mineContent-3-s">我的地址</span>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </router-link>             
      </ul>
    </div>
    <!-- <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet> -->
  </div>
</template>

<script>
import Vue from "vue";
import { Actionsheet } from "mint-ui";
Vue.component(Actionsheet.name, Actionsheet);
export default {
  data() {
    return {
      sheetVisible: false,
      zsname:"",
      actions: [
        {
          name: "拍照",
          method: this.getCamera, // 调用methods中的函数
          photo: "",
          name: ""
        },
        {
          name: "从相册中选择",
          method: this.getLibrary // 调用methods中的函数
        }
      ]
    };
  },
  methods: {
    sheetVisibleclick() {
      this.sheetVisible = true;
    },
    actionSheet: function() {
      // 打开action sheet
      this.sheetVisible = true;
    },
    getCamera: function() {
      console.log("打开照相机");
    },
    getLibrary: function() {
      console.log("打开相册");
    }
  },
  created() {
    this.photo = this.$store.state.invite.invite.mobile;
    var reg = /^(\d{3})\d+(\d{4})$/;
    this.photo = this.photo.replace(reg, "$1****$2");
    // *替换姓
    var reg = /^(\S{1})/;
    this.zsname = this.$store.state.invite.invite.realname;
    this.zsname = this.zsname.replace(reg, "*"); //replace方法的返回值是一个新字符串，原字符串并没有改变
  }
};
</script>


<style lang="scss" >
  .mineContents {
    /*  margin: 0 0.11rem 0;
        border-radius: 0.07rem;
 */
    width: 100%;
    height: 100%;
    font-size: 14px;
    position: absolute;
    background: #f9f9f9;
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
          .noSign {
            color: #fe6633;
          }
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
