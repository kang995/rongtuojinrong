<!--聚一聚 验票页面-->
<template>
  <div class="stepNum">
    <!-- 头部 -->
    <!-- <mt-header title="密码验票" fixed>
      <router-link to="/m" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
   <headerBox title="密码验票"></headerBox>
    <!-- 取票码-->
    <form>
      <div class="maBox">
        <div class="hi"></div>
        <input type="text" placeholder="请输入用户出示的验票码" />
        <div class="clear quet">
          已成功验票
          <span>{{count}}</span>人<!--  -->
        </div>
      </div>
      <!-- 验票 -->
      <button class="ypbutton" @click="clickPraise">验票</button>
    </form>

    <div class="step_center">
      <table>
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>手机号</th>
          <th>验票时间</th>
        </tr>
        <tr v-if="ticket==''" class="NOdata">
          <td colspan="4">
            <div class="noshu">
              <img src="../../../assets/sm_19.jpg" />
            </div>
          </td>
        </tr>
        <tr v-else v-for="item in ticket" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.realname}}</td>
          <td>{{item.mobile}}</td>
          <td>
            <p>
              <span>{{item.addtime |formatDate}}</span>
              <br />
              <span>{{item.addtime |formatDate2}}</span>
            </p>
          </td>
        </tr>
      </table>
    </div>

    <!-- 中部cell -->
    <!-- <div class="step_center">
      <div class="step_top">
        <span>序号</span>
        <span>姓名</span>
        <span>手机号</span>
        <span>验票时间</span>
      </div>
      <ul class="step_bot">
        <router-link
          tag="li"
          :to="{name:'',query:{user_id:item.user_id,topic_id:item.topic_id}}"
          v-for="item in ticket"
          :key="item.id"
        >
          <span>{{item.id}}</span>
          <span>{{item.realname}}</span>
          <span>{{item.mobile}}</span>
          <span>{{item.addtime |formatDate}}</span>
        </router-link>
      </ul>
    </div>-->
  </div>
</template>

<script>
import { formatDate } from "../../../modules/datab.js";
import { Toast } from 'vant';
export default {
  data() {
    return {
      ticket: [],
      publish:'',
      count:''
    };
  },
  methods: {
    //验票
    clickPraise(){
      this.$post("/rongtuojinrong/activity/juyiju/AccessCheck.json", {
        activity_id: 222,
        code: 13142
      }).then(res => {
         this.publish = res.data;
         console.log( this.publish)
         Toast(this.publish.msg)
        //  if(status==0){
        //   Toast(res.data.data);
        //  }                                                                            
        //   else{
        //     Toast(res.data.msg);
        //   }

      });
    },

    //验票列表
    getlists() {
      this.$post("/rongtuojinrong/activity/juyiju/ActivityAccessPassedList", {
        user_id:this.$route.query.user_id,
        topic_id: 133
      }).then(res => {
         if(res.data.count!=null){
         this.ticket = res.data.data;
        //  console.log(res.data); 
         this.count = res.data.count;
         console.log(this.count); 

         }
          
      });
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time * 1000);
      return formatDate(date, "y-MM-dd");
    },
    formatDate2(time) {
      var date = new Date(time * 1000);
      return formatDate(date, "hh:mm:ss");
    }
  },
  created() {
    this.getlists();
  }
};
</script>

<style lang='scss'>
.clear {
  clear: both;
}
  .stepNum {
    width: 100%;
    background: #fff;
    .mint-header {
      background: #fff;
      height: 0.5rem;
      .mint-button-icon {
        color: #404040;
      }
      .mint-header-title {
        font-size: 0.15rem;
        color: #404040;
        overflow: visible !important;
      }
      .is-fixed {
        top: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 1;
      }
    }
    .maBox {
      width: 100%;
      height: 1.75rem;
      background: #0159d5;
      margin-top: 0.5rem;
      .hi {
        height: 0.55rem;
      }
      input {
      /*   width: 2.2rem;
        height: 0.42rem; */
        background: #fff;
        border-radius: 0.2rem;
        border: none;
        text-align:left;
        margin: 0 auto;
        display: block;
        padding:0.1rem 0.25rem;
      }
      .quet {
        color: #fff;
        text-align: center;
        margin-top: 0.1rem;
      }
    }
    .ypbutton {
      width: 1.33rem;
      height: 0.41rem;
      margin: 0.2rem auto;
      border-radius: 0.2rem;
      background: #0159d5;
      text-align: center;
      color: #fff;
      display: block;
      border: none;
    }
    .step_center {
      width: 95%;
      border-radius: 0.1rem;
      margin: auto;
      overflow: hidden;
      height: auto;
      // background: #f9f9f9;
      padding-bottom: 0.1rem;
      table {
        width: 100%;
        margin: auto;
        overflow: hidden;
        height: auto;
        background: #f9f9f9;
        //padding-bottom: 0.1rem;
        th {
          font-size: 0.11rem;
          color: #333;
          line-height: 0.4rem;
          font-weight: normal;
          background: #f9f9f9;
        }
        tr {
          text-align: center;
          line-height: 0.45rem;
          font-size: 0.11rem;
          color: #333;
          border-bottom: 1px solid #e5e9f2;
          background: #f9f9f9;
        }
        tr td p:last-child {
          line-height: 0.15rem;
          span:last-child {
            color: #999;
          }
        }
        .NOdata {
          width: 100%;
          height: auto;
          overflow: hidden;
          margin: 0.1rem auto;
          border: none;
          background-color: #fff;
          .noshu {
            width: 0.85rem;
            height: auto;
            margin: 0.05rem auto;

            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            text-align: center;
            color: #333;
            line-height: 0.5rem;
          }
          td {
            background-color: #fff;
            padding-top: 0.3rem;
          }
        }
      }
    }
  }
</style>
