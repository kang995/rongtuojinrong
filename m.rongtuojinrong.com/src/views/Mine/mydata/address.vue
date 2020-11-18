<!--我的~~个人信息~我的地址--->
<template>
  <div class="EDmineContents">
    <!-- 头部 -->
    <headerBox :title="title"></headerBox>

    <div class="edmineContent-3">
      <van-radio-group v-model="radio" @change="onchange">
        <ul class="addlist">
          <li v-for="(item, index) in lists" :key="index.id" @click="changcheng(item)">
            <div class="zong">
              <div class="zong1">
                <div class="mingzi">
                  <span class="left">{{ item.name }}</span>
                  <span :class="{ active: shuzi == item.defAddr }">{{item.defAddr | moren}}</span>
                </div>

                <div class="zhuce">
                  <span class="right">{{ item.mobile | phone }}</span>
                  <span class="dizhi">
                    {{ item.area | dizhi }}
                    <span>{{ item.addr }}</span>
                  </span>
                </div>
              </div>

              <div class="bianji" v-if="flag != 0">
                <router-link
                  tag="a"
                  :to="{
                    name: 'editAddress',
                    query: {
                      id: item.user_id,
                      name: item.name,
                      mobile: item.mobile,
                      addr: item.addr,
                      tel: item.tel,
                      addrId: item.addrId,
                      defAddr: item.defAddr,
                      area: item.area,
                      zip: item.zip,
                      addrId: item.addrId,
                      regionId: item.regionId
                    }
                  }"
                >
                  <img src="../../../assets/h_02.jpg" alt />
                </router-link>
              </div>
            </div>
          </li>
        </ul>
      </van-radio-group>

      <router-link class="addbutton" tag="div" to="/editaddress">+新建地址</router-link>
    </div>
  </div>
</template>

<script>
import img from "@/assets/ld_02.jpg";
import img1 from "@/assets/ld_03.jpg";
import { Dialog } from "vant";
import Vue from "vue";
export default {
  data() {
    return {
      flag: "",
      isShow: false,
      title: "地址管理",
      radio: -1,
      icon: {
        active: img,
        inactive: img1
      },
      lists: [],
      shuzi: 1,
      list: [],
      num: [],
      date: []
    };
  },
  methods: {
    changcheng(a) {
      if (this.flag == 0) {
        this.bus.$emit("ReceiveMessage", a);
        Vue.prototype.$addr = a;
        console.log(this.$addr,123)
        localStorage.setItem("MM",1); 
        this.$router.go(-1);

      }
    },
    goback() {
      this.$router.go(-1);
    },
    // 通过 change 事件 遍历 索引值
    onchange(a) {
      for (let n in this.lists) {
        this.lists[n].defAddr = 0;
      }
      this.lists[a].defAddr = 1;
    },

    delAddress(item) {
      Dialog.confirm({
        title: "确定要删除么",
        message: ""
      })
        .then(() => {
          // 在删除的方法里调用删除的接口
          this.getDel(item);
        })
        .catch(() => {});
    },

    getList() {
      this.$post("/vipshop/v1/address/found/lists.json").then(res => {
        this.lists = res.data.data.data;
      });
    },
    getAdd(item) {
      this.$post("/vipshop/v1/address/found/addOrEdit.json", {
        mobile: this.tel,
        addrId: this.addrId,
        area: this.xs_addr + this.area_num,
        addr: this.message,
        name: this.name,
        defAddr: 0,
        regionId: this.regionId,
        zip: this.zip
      }).then(res => {
        this.list = res.data;
      });
    }
  },

  // 过滤去 通过 后台传过来的item，def_addr来进行判断
  filters: {
    moren(obj) {
      if (obj == 1) {
        return "[默认]";
      } else {
        return "";
      }
    },
    dizhi(obj) {
      let num = obj.split(":");
      return num[0];
    },
    phone(obj) {
      return obj.substr(0, 3) + "****" + obj.substr(7);
    }
  },
  created() {
    this.getList();
    console.log(this.$store.state.invite.invite.mobile);
    this.flag = this.$route.query.flag;
    console.log(this.flag);
  }
};
</script>

<style lang="scss">
.EDmineContents {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #fff;
  position: absolute;
  .right {
    margin-left: 0.11rem;
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
  .cju {
    color: #fe6633;
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
      overflow: visible !important;
    }
    .mint-button-text {
      display: block;
      color: #333333;
      font-weight: normal;
      margin: 0;
    }
  }
  .edmineContent-3 {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 0.5rem auto;
    .addlist {
      .bianji {
        float: right;
      }
      li {
        padding: 0 0.1rem;
        .zong {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 0.715rem;
          padding: 3%;
           .zong1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .mingzi {
            
            display: flex;
            flex-direction: column;
            height: 0.4rem;ya
            .left {
              width: 0.6rem;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .active {
              color: #fe6633;
            }
          }
          .zhuce {
            margin-left: 0.25rem;
            display: flex;
            flex-direction: column;
            .right {
              margin: 0;
            }
            .dizhi {
              width: 2rem;
            }
          }
        }
        }
       

        .bianji {
          display: flex;
          justify-content: first baseline;
          align-items: center;
        }
        img {
          width: 0.2rem;
          right: 0.1rem;
          top: 0.66rem;
        }
      }
      .edit {
        padding: 0.1rem 0.1rem 0.1rem 0;
        height: auto;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        .edit-b {
          display: flex;
          width: 30%;
          justify-content: space-between;
        }
        .van-radio {
          padding: 0;
          border-bottom: none;
          .van-radio__icon {
            padding: 0;
            border-bottom: none;
            img {
              width: 0.15rem;
            }
          }
        }
        .w92 {
          width: 92%;
        }
        span.acitve {
          color: #fe6633;
        }
        label.bui-checkbox-label input[type="checkbox"] {
          visibility: hidden;
          opacity: 0;
        }
        label.bui-checkbox-label .bui-checkbox {
          display: inline-block;
          position: relative;
          width: 0.12rem;
          height: 0.12rem;
          border: 2px solid #ddd;
          background-color: #fff;
          vertical-align: -2px;
          margin-right: 5px;
        }
        label.bui-checkbox-label
          input[type="checkbox"]:checked
          + .bui-checkbox:after {
          position: absolute;
          content: "";
          width: 8px;
          height: 4px;
          border-left: 2px solid #fff;
          border-bottom: 2px solid #fff;
          transform: rotate(-45deg) translate(-50%, -50%);
          /*top:50%;*/
          left: 55%;
        }
        label.bui-checkbox-label
          input[type="checkbox"]:checked
          + .bui-checkbox {
          background-color: #fe6633;
          border: none;
        }
        label.bui-checkbox-label
          input[type="checkbox"]:disabled
          + .bui-checkbox {
          background-color: #e8e8e8;
          border: 1px solid #979797;
        }
        label.bui-checkbox-label
          input[type="checkbox"]:disabled:checked
          + .bui-checkbox:after {
          border-color: #000;
        }
        label.bui-checkbox-label.bui-checkbox-anim .bui-checkbox {
          -webkit-transition: background-color ease-in-out 0.3s;
          transition: background-color ease-in-out 0.3s;
        }
        a {
          display: block;
          line-height: 0.2rem;
        }
      }
    }
    .addbutton {
      width: 90%;
      height: 0.47rem;
      background: #0159d5;
      position: fixed;
      left: 0.18rem;
      bottom: 0;
      color: #fff;
      line-height: 0.47rem;
      text-align: center;
      bottom: 10px;
      border-radius: 0.08rem;
    }
  }
}
</style>
