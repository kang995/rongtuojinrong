<template>
  <div class="mineContents">
    <headerBox :title="xz_flag ? title[0] : title[1]">
      <span slot="rightTo" class="right_content" tag="span" @click="submit"
        >保存</span
      >
    </headerBox>

    <div class="mineContent-3">
      <div>
        <van-cell-group>
          <van-field v-model="name" clearable placeholder="收货人" />
          <van-field v-model="tel" clearable placeholder="手机号" />
          <van-field
            v-model="address"
            readonly="readonly"
            placeholder="配送地址"
            @focus="dizhi_focus"
          />
          <van-field
            v-model="message"
            type="textarea"
            placeholder="详细地址:如地址，门牌号，小区，楼栋号，单元室等"
            rows="1"
            autosize
          />
          <van-field
            v-model="zip"
            type="textarea"
            placeholder="邮编"
            rows="1"
            autosize
          />
        </van-cell-group>
        <van-popup
          v-model="show"
          position="bottom"
          :style="{ height: '260px' }"
        >
          <!-- @change="onChange" -->
          <div class="addr_top">
            <div @click="cancel">取消</div>
            <div @click="confirm">确定</div>
          </div>
          <div class="adress_gp">
            <van-picker
              :columns="province"
              :item-height="height"
              :visible-item-count="num"
              @change="changeP"
            />
            <van-picker
              :columns="city"
              :item-height="height"
              :visible-item-count="num"
              @change="changeC"
            />
            <van-picker
              :columns="area"
              :item-height="height"
              :visible-item-count="num"
              @change="changeA"
              v-show="area_flag"
            />
          </div>
        </van-popup>
        <!-- @change-default="onChangeDefault"   <van-area :area-list="areaList" /> -->
      </div>

      <van-cell-group>
        <van-switch-cell v-model="checked" title="设置默认地址" />
      </van-cell-group>
      <div v-show="xz_flag">
        <van-button plain type="danger" size="small" @click="onDelete"
          >删除收货地址</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import headerBox from "../../../components/header";
export default {
  data() {
    return {
      regionIda:'',
      lists: {},
      list: {},
      data: {},
      zip: "",
      name: "",
      dizhi: "",
      tel: "",
      address: "",
      message: "",
      addrId: "",
      show: false,
      province: ["请选择"],
      city: ["请选择"],
      area: ["请选择"],
      obj_city: {},
      num: 6,
      height: 36,
      xs_addr: [],
      area_flag: true,
      checked: true,
      area_num: "",
      xz_flag: true,
      type: "",
      title: ["编辑收货地址", "新增地址"]
    };
  },

  methods: {
    onSave(obj) {
      if (obj.status == 0) {
        alert(obj.msg);
      } else {
        this.$router.go(-1);
      }
    },
    bbc() {
      console.log();
    },
    onDelete() {
      let item = this.$route.query;
      this.$dialog
        .confirm({
          title: "确认删除该地址么？",
          message: "是否删除地址后就无法恢复该地址了"
        })
        .then(() => {
          //地址删除
          let postdata = {
            addrId: item.addrId,
            user_id: this.$store.state.login.token.user_id
          };
          this.$post("/vipshop/v1/address/found/delete.json", postdata).then(
            res => {
              this.$toast("删除成功");
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            }
          );
        })
        .catch(() => {});
    },
  // 使用函数 来疯转 三个接口
    init_province(num, level) {
      this.$toast.loading({
        mask: false,
        duration: 0,
        message: "加载中...",
        forbidClick: true
      });
      var Url;
      if (level == 1) {
        Url = "/vipshop/v1/address/found/getProvince.json";
        var postdata = {
          regionId: num,
          level: level
        };
      } else if (level == 2) {
        Url = "/vipshop/v1/address/found/getCityProper.json";
        var postdata = {
          regionId: num,
          level: level,
          type: "city"
        };
      } else if (level == 3) {
        Url = "/vipshop/v1/address/found/getCityProper.json";
        var postdata = {
          regionId: num,
          level: level,
          type: "region"
        };
      }
  // 接受 接口 和 参数
      this.$post(Url, postdata).then(res => {
        this.$toast.clear();
        this.data = res.data.data.data;
        if (level == 1) {
          this.province = ["请选择"];
        } else if (level == 2) {
          this.city = ["请选择"];
        } else if (level == 3) {
          this.area = ["请选择"];
        }
        for (let key in this.data) {
          let array = this.data[key];
          this.obj_city["" + array.localName] = array.regionId;
          if (level == 1) {
            this.province.push(array.localName);
          } else if (level == 2) {
            this.city.push(array.localName);
          } else if (level == 3) {
            this.area.push(array.localName);
          }
        }
      });
    },

    // 这是省
    changeP(e, b, c) {
      this.init_province(this.obj_city[b], 2);
      this.xs_addr = [];
      this.xs_addr[0] = b;
    },
    // 这是市
    changeC(e, b, c) {
      this.init_province(this.obj_city[b], 3);
      this.xs_addr[1] = b;
      if (this.xs_addr.length == 3) {
        this.xs_addr.pop();
      }
    },
    // 这是 区
    changeA(e, b, c) {
      this.xs_addr[2] = b;
      this.area_num = this.obj_city[b];
      this.regionIda = this.obj_city[b]
      console.log(this.regionIda);
      
    },
    // 这时取消
    cancel() {
      this.show = false;
    },
    // 这是确定
    confirm() {
      if (!this.area_flag || this.xs_addr.length == 3) {
        this.address = this.xs_addr.join("");
        this.show = false;
      }
    },

    dizhi_focus() {
      this.show = true;
    },

    // 保存
    submit() {
      console.log(this.regionIda);
      if (!this.input_yz()) {
        return;
      }
      let item = this.$route.query;
      this.$post("/vipshop/v1/address/found/addOrEdit.json", {
        mobile: this.tel,
        addrId: item.addrId,
        area: this.address,
        addr: this.message,
        name: this.name,
        defAddr: this.checked ? 1 : 0,
        regionId: this.regionIda,
        zip: this.zip
      }).then(res => {
        this.$toast("更新成功");
        setTimeout(() => {
          this.$router.go(-1);
        }, 1500);
      });
    },
    input_yz() {
      if (this.name == "") {
        this.$toast("收件人姓名不能为空");
        return false;
      }
      if (this.address == "") {
        this.$toast("收件地址不能为空");
        return false;
      }
      if (this.message == "") {
        this.$toast("详细地址不能为空");
        return false;
      }
      let zengze = /^1[3456789]\d{9}$/;
      if (!zengze.test(this.tel)) {
        this.$toast("手机号格式正确");
        return false;
      }
      return true;
    }
  },

  components: {
    headerBox
  },
  created() {
    this.init_province(0, 1);
    let query_arr = this.$route.query;
    let arr = Object.keys(query_arr);
    if (arr.length == 0) {
      this.xz_flag = false;
      return;
    }
    // 名字
    this.name = query_arr.name;
    // 手机号
    this.tel = query_arr.mobile;
    // 地址
    let addr = query_arr.area.split("/");
    this.xs_addr = addr;
    this.area_num = query_arr.area.split(":");
    this.address = addr.join("");
    this.message = query_arr.addr;
    this.checked = Boolean(+query_arr.defAddr);
    this.regionIda = query_arr.regionId;
    this.zip = query_arr.zip;
   
  }
};
</script>

<style lang="scss">
.adress_gp {
  display: flex;
  padding: 0 5%;
  height: 25%;
  justify-content: center;
  .van-picker {
    width: 33.33%;
  }
  .van-picker-column__item {
    font-size: 0.14rem;
  }
}
.addr_top {
  display: flex;
  justify-content: space-between;
  padding: 0 0.12rem;
  height: 0.44rem;
  align-items: center;
  color: #0159d5;
  div {
    width: 0.4rem;
    text-align: center;
  }
}
.mineContents {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #f9f9f9;
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
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 0.6rem auto;
    .bankbox {
      border-radius: 0.04rem;
      background: #fff;
      margin: 0.1rem;
      padding: 0.2rem 0.1rem;
      height: auto;
      overflow: hidden;
      .blog {
        width: 0.37rem;
        height: 0.37rem;
        overflow: hidden;
        border-radius: 0.5rem;
        margin-right: 0.1rem;
      }

      .logstyle {
        padding-top: 0.15rem;
        p {
          line-height: 0.37rem;
          text-align: left;
        }
      }
    }
    .van-button--danger {
      width: 100%;
      height: 100%;
      color: #ff6633;
      // border: 1px solid #ff6633;
      height: 44px;
      line-height: 44px;
      font-size: 16px;
      background-color: #fff;
      border: 1px solid #fff;
    }
  }
  .addbutton {
    width: 100%;
    height: 0.47rem;
    background: #003f8e;
    position: fixed;
    left: 0;
    bottom: 0;
    color: #fff;
    line-height: 0.47rem;
    text-align: center;
  }
  .van-cell-group {
    margin-bottom: 10px;
  }
}
</style>
