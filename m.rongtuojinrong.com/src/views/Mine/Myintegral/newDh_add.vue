<!--我的~我的账户信息~~个人信息--->

<template>
  <div class="DHmineContents">
    <!-- 头部 -->
    <headerBox title="确认订单" />

    <div class="DHmineContent-3">
      <ul>

        <li class="ziti" tag="li">
          <div v-if="sign == 2" class="zicont zisele" @click="bankshow = true">
            <div class="seleleft">
              <div class="signadd">
                <img src="@/assets/jf-006.png" />
              </div>
              <div v-if="zixobj.name!=null" class="selecenter">
                <div class="topsele">
                  <div>{{zixobj.name}}</div>
                  <div>{{zixobj.mobile}}</div>
                </div>
                <div class="botsele">{{zixobj.fullAddr}}</div>
              </div>

              <span v-else>选择自提地址</span>
            </div>
            <van-icon name="arrow" />
          </div>

          <div v-if="sign == 0 " class="zicont zisele" @click="bankshow = true">
            <div class="seleleft">
              <div class="signadd">
                <img src="@/assets/jf-006.png" />
              </div>
              <span>选择自提地址</span>

            </div>

            <van-icon name="arrow" />
          </div>

          <div v-if="sign == 1" class="zicont zisele" @click="bankshow = true">
            <div class="seleleft">
              <div class="signadd">
                <img src="@/assets/jf-006.png" />
              </div>
              <div class="selecenter">
                <div class="topsele">
                  <div>店铺：{{detadd.shopName | xzhishu}}</div>
                  <div>电话：{{detadd.managerMobile}}</div>
                </div>
                <div class="botsele">地址：{{detadd.address}}</div>
              </div>
            </div>
            <van-icon name="arrow" />
          </div>
        </li>

        <li class="mtop" @click="xuanz">
          <span class="mineContent-3-s">自提时间</span>
          <div class="mineContent-3-c">
            <span class>{{xdate}}</span>
            <van-icon name="arrow-down" />
          </div>
        </li>

        <li class="mtop topthree">
          <div v-if="biaozhi==0" class="topthree1">
            <div class="topthree1cont" v-for="(item,index) in shoplist.items" :key="index">
              <img :src="item.goodsImage" class="addspimg" />
              <div class="linep">           
                <div class="linep1">{{item.goodsName}}</div>
              </div>
              <div class="liner">
                <div class="liner1">{{item.score}}积分</div>
                <div class="liner2">x{{item.goodnum}}</div>
              </div>  
            </div> 

          </div>
          <!-- 1代表购物车页跳转到此 -->
          <div v-if="biaozhi==1" class="topthree1">
            <div class="topthree1cont" v-for="(item,index) in shoplist.items" :key="index">
              <img :src="item.goodsImage" class="addspimg" />
              <div class="linep">           
                <div class="linep1">{{item.goodsName}}</div>
              </div>
              <div class="liner">
                <div class="liner1">{{item.score}}积分</div>
                <div class="liner2">x{{item.goodnum}}</div>
              </div>  
            </div>        
          </div>          

          <div class="topthree2">
            <span>买家留言：</span>
            <input type="text" v-model="liuy" class="inpwd" placeholder="选填" />            
          </div>

          <div v-if="biaozhi==0" class="topthree3">
            <span class="topthree3a">共{{zongnum}}件 </span>
            <span class="cju topthree3b">
              <span>{{shoplist.costScore}}</span>
              <span>积分</span>
            </span>
          </div>

          <!-- 1代表购物车页跳转到此 -->
          <div v-if="biaozhi==1" class="topthree3">
            <span class="topthree3a">共{{zongnum}}件 </span>
            <span class="cju topthree3b">
              <span>{{shoplist.costScore}}</span>
              <span>积分</span>
            </span>
          </div>
        </li>

      </ul>
      <div class="quit">
        <div class="leftqu">
          <p v-if="biaozhi==0">
            <span class="leftqus1">共{{zongnum}}件 </span>
            <span class="leftqus2">合计：</span>
            <span class="cju leftqus3">        
              <span>{{shoplist.costScore}}</span>
              <span>积分</span>
            </span>
          </p>
          <!-- 1代表购物车页跳转到此 -->
          <p v-if="biaozhi==1">
            <span class="leftqus1">共{{zongnum}}件 </span>
            <span class="leftqus2">合计：</span>
            <span class="cju leftqus3">        
              <span>{{shoplist.costScore}}</span>
              <span>积分</span>
            </span>
          </p>          
        </div>
        <div class="rightqu">
          <button class="btn" @click="tijiao">提交订单</button>
        </div>
        
      </div>

      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        :close-on-click-overlay="false"
        @select="onSelect"
        @cancel="onCancel"
      />

      <van-popup v-model="bankshow" position="right" :style="{ height: '100%' ,width:'100%'}">
        <banktitle @getbank="getbank" @hidshandow="hidshandow" :goodsid='goodid' :goodsnum='goodnum'></banktitle>
      </van-popup>

   
      <!-- 积分超出弹窗 -->
      <van-popup round v-model="showcc">
        <div class="ccont">
          <div class="contop">
            您所选商品所需积分已经超出了您所拥有的积分哦！
          </div>
          <div class="conbot">我知道了</div>
        </div>
      </van-popup>     
      
      <!-- 温馨提示 -->
      <van-popup round v-model="showts" :close-on-click-overlay="false">
        <div class="tcont">
          <div class="contop">
            温馨提示
          </div>
          <div class="conmid">
            <div class="conmid1">是否兑换选中的商品，</div>
            <div class="conmid2">兑换后随即扣除积分。</div>
          </div>          
          <div class="conbot">
            <span @click="tijiaodd">是</span>
            <span @click="quxiao">否</span>
          </div>
        </div>
      </van-popup>        
    </div>
  </div>
</template>

<script>
import banktitle from "../Myintegral/choosead";
export default {
  data() {
    return {
      addlist: [],
      picture: "",
      num: 0,
      name: "",
      jifen: 0,
      zongjif: 0,
      points: 0,
      flag: 0,
      fangs: "",
      show: false,
      actions: [
        // { name: '选项1' },
        // { name: '选项2' },
        // { name: '选项3' }
      ],
      datelist: [],
      xdate: "",
      clickflag: true,
      bankshow: false,
      sign: 0,
      showcc: false,
      showts: false,
      biaozhi: '',    //0代表详情页跳转到此，1代表购物车页跳转到此
      cardid: '',
      shoplist: {},
      zongnum: 0,
      goodid: '',
      goodnum: '',
      detadd: {},
      liuy: '',
      zixobj: {},
      shopId: '',
      shopAddr: ''
    };
  },
  components: {
    banktitle
  },

  filters:{

  },
  mounted(){

  },
  methods: {

    quxiao(){
      this.showts = false;
    },

    //提交订单
    tijiaodd(){
      var dancans = {};
      console.log(this.shopId,this.shopAddr);

      if(this.$route.query.biaoz==1){
          dancans = {
          shopId: this.shopId,
          shopAddr: this.shopAddr,
          appointDay: this.xdate,
          cartIds: this.$route.query.cartids,
          costScore: this.zongjif,
          tostr: this.liuy,
          //addrId
        };
      }else{
      //购物车传参


      //商品详情传参
        dancans = {
        shopId: this.shopId,
        shopAddr: this.shopAddr,
        appointDay: this.xdate,       
        goodsIds: this.$route.query.goodsid,
        goodsNums: this.$route.query.shul,
        costScore: this.zongjif,
        tostr: this.liuy
      }
      };
   

      this.$post(
        "/vipshop/v1/commonSubmitOrder.json",dancans)
        .then(res => {
          this.addlist = res.data.data;
        })
        .catch(err => {});      
    },


    //详情页跳转到此

    //购物车跳转到此页面数据显示
    showche(){
      let postcan = {}
      if(this.$route.query.biaoz == 0){
        postcan = {
          goodsIds: this.$route.query.goodsid,
          goodsNums: this.$route.query.shul
        } 
      }else{
        postcan = {
          cartIds: this.cardid
        }       
      };


      this.$post(
        "/vipshop/v1/commonInitialize.json",postcan
      )
        .then(res => {
          this.shoplist = res.data.data.data;
          this.zongjif = this.shoplist.costScore;
          for(var i=0; i<this.shoplist.items.length; i++){
            this.zongnum += parseInt(this.shoplist.items[i].goodnum);
          }


          let idarr=[];
          let numarr=[];
          let newarr='';
          let newarr1='';
          for(var i=0;i<this.shoplist.items.length;i++){
              
            idarr.push(this.shoplist.items[i].goodsId);
            numarr.push(this.shoplist.items[i].goodnum);  
          }
          
          newarr = idarr.join(","); 
          newarr1 = numarr.join(","); 

          this.goodid = newarr;
          this.goodnum = newarr1;

          //console.log(newarr,newarr1);
        })
        .catch(err => {});      
    },


    tijiao(){
      //this.showcc = true;

      if(!this.zixobj.name&&!this.detadd.shopName){
        this.$toast('请选择地址');
        return;
      };

      
      if(this.sign!=2){
        if(this.xdate==''){
          this.$toast('请选择自提日期');
          return;
        }
      };      
      this.showts = true;
    },
    hidshandow(val) {
      this.bankshow = false;
    },
    getbank(obj) {
      this.detadd = obj;
      this.shopId = obj.shopId;
      this.shopAddr = obj.address;


      if (obj != null && obj!=1) {
        this.sign = 1;
      }  else {
        this.sign = 0;
      }
    },

    xuanz() {
      if (!this.clickflag) {
        return false;
      }
      this.clickflag = false;
      this.show = true;
      this.$post("/vipshop/v1/order/pickTime.json")
        .then(res => {
          this.clickflag = true;
          this.datelist = res.data.data.data;
          for (let i = 0; i < this.datelist.length; i++) {
            var obj = {
              name: this.datelist[i],
              color: "#393939",
              className: "shezhi"
            };
            this.actions.push(obj);
          }
        })
        .catch(err => {});
    },

    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;
      this.xdate = item.name;
      this.actions = [];
    },

    onCancel() {
      this.show = false;
      this.actions = [];
    }
  },
  filters: {
    dizhi(obj) {
      let num = obj.split(":");
      return num[1];
    },
    xzhishu(value){
      if(!value){
        return;
      };

      if(value.length>7){
        var sub = value.slice(0,7);
        var sub1 = sub+'...'
        return sub1;           
      }else{
        return value;
      }
  
    }
  },
  created() {
    // this.bus.$on("ReceiveMessage", (itemy)=> { 
    //   this.zixobj = itemy;
    // })

    if(this.$addr){
      this.zixobj = this.$addr;
    }


    //账号总积分
    this.$post("/vipshop/v1/user/integral.json").then(res => {
      this.points = res.data.data.data.allScore;
    });

    //区分详情页和购物车页
    this.biaozhi = this.$route.query.biaoz;
    //获取购物车页cardid
    this.cardid = this.$route.query.cartids;

    this.showche();

    if(localStorage.getItem("MM")){
      this.sign=2;
    }else{
      
    }

  },

  watch:{
      zixobj(val,val2){
          this.zixobj = val;
          console.log(val,val2);
      },
  },

  mounted(){
      
  },
  destroyed(){
    localStorage.removeItem("MM");
    this.bus.$off("ReceiveMessage");
  }
};
</script>

<style lang="scss" >
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
  .cju {
    color: #fe6633;
  }

  .fz10 {
    font-size: 0.09rem;
    line-height: 0.18rem;
  }
  .red {
    color: red;
  }
  .DHmineContents {
    width: 100%;
    height: auto;
    font-size: 0.13rem;
    overflow: hidden;
    color: #333;
    .DHmineContent-3 {
      margin-top: 0.5rem;

      .ccont{
        width: 2.23rem;
        height: 1.1rem;
        .contop{
          height: 0.73rem;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eee;
          padding: 0 0.33rem;
          text-align: center;          
        }
        .conbot{
          color: #0e9fea;
          text-align: center;
          height: 0.36rem;
          line-height: 0.36rem;
        }
      }
      .tcont{
        width: 2.23rem;
        height: 1.43rem;       
        .contop{
          height: 0.475rem;
          line-height: 0.475rem;
          font-size: 0.15rem;
          text-align: center;          
        } 
        .conmid{
          text-align: center;
          border-bottom: 1px solid #eee;
          color: #666;
          .conmid1{
            margin-bottom: 0.05rem;
          }
          .conmid2{
            margin-bottom: 0.19rem;
          }
        }
        .conbot{
          width: 100%;
          height: 0.33rem;
          line-height: 0.33rem;
          display: flex;
          span{
            width: 50%;
            text-align: center;
          }
          span:first-of-type{
            color: #e97740;
            border-right: 1px solid #eee;
          }
          span:nth-child(2){
            color: #0099e9;
          }
        }
      }
      .van-action-sheet {
        background-color: transparent;
        .shezhi {
          width: 96%;
          margin: 0 auto;
        }
        .van-action-sheet__cancel {
          width: 96%;
          margin: 0 auto;
        }
        div:first-of-type {
          border-radius: 0.1rem 0.1rem 0 0;
          overflow: hidden;
        }
        div:nth-last-child(2) {
          border-radius: 0 0 0.1rem 0.1rem;
          overflow: hidden;
        }
        .van-action-sheet__cancel {
          margin: 0.05rem auto;
          border-radius: 0.1rem;
          color: #666;
        }
        .van-action-sheet__cancel::before {
          height: 0;
        }
      }

      ul {
        padding-top: 0.15rem;
        .addli {
          border-bottom: none;
          .address {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .leftcont {
              display: flex;
              .sign {
                margin-right: 0.05rem;
                display: flex;
                align-items: flex-end;
              }
              .addetail {
                .addetaild {
                  margin-bottom: 0.1rem;
                }
              }
              .addetaildy {
                height: 0.18rem;
              }
            }
            .phone {
              .addetaild {
                margin-bottom: 0.1rem;
              }
              .phonesign {
                height: 0.18rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
              }
            }
          }
        }
        li {
          margin: 0 0.11rem 0.11rem;
          border-radius: 0.1rem;
          .zisele {
            display: flex;
            justify-content: space-between;
            .seleleft {
              display: flex;
              align-items: center;
            }
          }
          .zicont {
            width: 100%;
            color: #333;
            display: flex;
            align-items: center;
            .seleleft{
              width: 95%;
            }
            .signadd {
              width: 0.285rem;
              img {
                width: 100%;
                height: auto;
              }
            }
            .selecenter{
              width: 90%;
              padding-left: 0.05rem;
              .topsele{
                display: flex;
                justify-content: space-between;
              }
            }
            span {
              margin-left: 0.1rem;
            }
          }
        }
      }
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

      ul{
        .topthree{
            display: flex;
            flex-direction: column;
            align-items: normal;   
            .topthree1{
              .topthree1cont{
                display: flex;
                margin-bottom: 0.1rem;
              }
            }      
            .topthree2{
              margin-top: 0.15rem;
            }
            .topthree3{
              margin-top: 0.25rem;
              font-size: 0.15rem;
              text-align: right;
              .topthree3a{
                color: #999;
              }
              .topthree3b{
                span:first-of-type{
                  
                }
                span:nth-child(2){
                  font-size: 0.12rem;
                }                
              }
            }
        }        
      }

      ul {
        li {
          height: auto;
          display: flex;
          align-items: center;
          padding: 0 0.18rem 0;
          justify-content: space-between;
          border-bottom: 1px solid #eff2f8;
          background-color: #fff;
          padding: 0.15rem 0.15rem;
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
          .addspimg {
            width: 0.83rem;
            height: 0.83rem;
            padding: 0.02rem;
            border: 1px solid #e5e9e5;
          }
          .addspimg2 {
            width: 0.1rem;
            height: 0.12rem;
          }
          .w80 {
            width: 90%;
          }
          .linep {
            width: 50%;
            height: 0.83rem;
            padding-left: 0.05rem;
            .linep1{

            }
            .linep2{
              color: #999;
              margin-top: 0.05rem;
            }
          }
          .liner{
            width: 30%;
            height: 0.83rem;
            text-align: right;
            div:nth-child(2){
              color: #999;
              margin-top: 0.05rem;
            }
          }
          .inpwd {
            width: 75%;
            border: none;
          }
        }        
      }

      ul li img {
        display: inline-block;
        width: 0.06rem;
      }

      .quit {
        width: 100%;
        height: 0.6rem;
        overflow: hidden;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        border-top: 2px solid #e5e9e5;

        .leftqu {
          width: 70%;
          height: 0.6rem;
          text-align: right;
          float: left;
          line-height: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          p{
            .leftqus1{
              color: #999;
              font-size: 0.15rem;
            }
            .leftqus2{
              font-size: 0.15rem;
            }
            .leftqus3{
              span:first-of-type{
                font-size: 0.15rem;
              }
            }                     
          }
        }
        .rightqu{
          height: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: 0.2rem;
          button {
            width: 0.84rem;
            height: 0.36rem;
            border-radius: 0.2rem;
            background-color: #ff6633; 
            border: none;
            color: #fff;
            text-align: center;
            float: right;
          }
        }
      }
    }
  }
}
</style>
