<!--我的~我的账户信息~~个人信息--->

<template>
  <div class="DHmineContents">
    <!-- 头部 -->
    <headerBox title="确认订单"/>

    <div class="DHmineContent-3">
      <ul>

        <!-- <router-link tag="li" to="/address" v-for="(addet,index) in addlist" :key="index" >
        <div v-if="addet.def_addr == 1">
          <div class="left mineContent-3-s" >
           <img src="@/assets/img101.png" class="addspimg2">
           <van-icon name="location" />
          </div>
          <div class="left mineContent-3-s w80">
           <p class="c3"><span class="mineContent-3-s left">收货人：{{addet.name}}</span>
           <span class="right">手机号：{{addet.mobile}}</span></p>
           <p class="left">收货地址：{{addet.addr}}</p>
         </div>
          <div class="mineContent-3-c">
            <img src="@/assets/img63.png" />
          </div>
        </div>

        </router-link> -->

        <router-link v-if="flag == 0" class="addli" tag="li" to="/address">
          <div v-for="(addet,index) in addlist" :key="index">
            <div class="address" v-if="addet.def_addr == 1">
              <div class="leftcont">
                <div class="sign">
                  <span>
                    <van-icon name="location" />
                  </span>                
                </div>
                <div class="addetail">
                  <div class="addetaild">收货人:{{addet.name}}</div>
                  <div class="addetaildy">收货地址:{{addet.area | dizhi}} {{addet.addr}}</div>
                </div>
              </div>
  
              <div class="phone">
                <div class="addetaild">{{addet.mobile}}</div>
                <div class="phonesign">
                  <van-icon name="arrow" />
                </div>
              </div>
            </div>
          </div>
        </router-link>

        <li v-if="flag == 1" class="ziti" tag="li">


          <div v-if="sign == 2" class="zicont" @click="bankshow = true">
            <span>已联系客服</span>
          </div>  

          <div v-if="sign == 0" class="zicont" @click="bankshow = true">
            <van-icon name="add-o" />
            <span>选择自提地址</span>
          </div>

          <div v-if="sign == 1" class="address" @click="bankshow = true">
            <div>显示选择的地址</div>
          </div>

        </li>        

         <li  class="mtop">
           <img :src="picture" class="addspimg">
           <p class="w80 linep">{{name}}  <br/> <span class="cju">{{jifen}}积分</span></p>
           <p class="c3">x{{num}}</p>
        </li>


        <li class="mtop">
          <span class="mineContent-3-s">配送方式：</span>
          <div class="mineContent-3-c">
            <span class="cju">{{fangs}}</span>
            <img src="@/assets/img63.png" />
          </div>
        </li>

        <li class="mtop" @click="xuanz">
          <span class="mineContent-3-s">自提日期：</span>
          <div class="mineContent-3-c">
            <span class="">{{xdate}}</span>
            <img src="@/assets/img63.png" />
          </div>
        </li>

        <li><span>买家留言：</span><input type="text" class="inpwd" placeholder="此项选填，可填写您和卖家达成的一致要求"></li>
        
        <li>
          <span class="mineContent-3-s"></span>
          <div class="mineContent-3-c">
            <span class="cju">{{zongjif}}积分</span>
          </div>
        </li>

        <li class="mtop">
          <span class="mineContent-3-s">积分支付</span>
          <div class="mineContent-3-c">
            <span class="fz10">可用积分{{points}}</span>
            <input type="checkbox" checked="checked">
          </div>
        </li>
       
      </ul>
      <div class="quit">
        <div><p>合计：<span class="cju">{{zongjif}}积分</span></p>
        <p>(含运费 0.00元)</p>
        </div>
        <button class="btn">积分不足</button>
      </div>

      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        :close-on-click-overlay="false"
        @select="onSelect"
        @cancel="onCancel"
      />      

      <van-popup v-model="bankshow"  position="right" :style="{ height: '100%' ,width:'100%'}">   
        <banktitle @getbank="getbank" @hidshandow="hidshandow"></banktitle>  
      </van-popup>
    </div>
  </div>
</template>

<script>
import banktitle from '../Myintegral/choosead';
export default {
  data(){
    return{
      addlist: [],
      picture: '',
      num: 0,
      name: '',
      jifen: 0,
      zongjif: 0,
      points: 0,
      flag: 0,
      fangs: '',
      show: false,
      actions: [
        // { name: '选项1' },
        // { name: '选项2' },
        // { name: '选项3' }
      ],
      datelist: [],
      xdate: '',
      clickflag: true,
      bankshow: false,      
      sign: 0
    }
  },
  components:{
    banktitle
  },  
  methods:{
    hidshandow(val){
      this.bankshow = false;
    },  
    getbank(obj){
      console.log(obj);
      if(obj!=null&&obj != 1){
        this.sign = 1;
      }else if(obj == 1){
        this.sign = 2;
      }else{
        this.sign = 0;
      }
    },

    xuanz(){
      if(!this.clickflag){
        return false;
      };
      this.clickflag = false;
      this.show = true;
      this.$post('/vipshop/getDate.json')
      .then(res=>{
        this.clickflag = true;
          this.datelist = res.data.data;
          for(let i = 0; i<this.datelist.length; i++){
            var obj = {name: this.datelist[i],color: '#005ad4',className:'shezhi'}
            this.actions.push(obj);
          }
      })
      .catch(err=>{

      }) 
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
  filters:{
    dizhi(obj) {
      let num = obj.split(":");
      return num[1];
    }    
  },
  created(){
    this.$post('/rongtuojinrong/userCenter/accountInformation/myShippingAddress.json',{
      defidenshuxing: this.$store.state.invite.defidenshuxing,
      //mobile: this.$store.state.invite.invite.mobile,      
      mobile: 13688629789
    })
    .then(res=>{
        this.addlist = res.data.data;
    })
    .catch(err=>{

    })      


    //获取数量
    this.num = this.$route.query.shul;
    //获取名称
    this.name = this.$route.query.name;
    //获取积分
    this.jifen = this.$route.query.jifen;
    //获取图片
    this.picture = this.$route.query.pic;
    //兑换需要的总积分
    this.zongjif = this.num*this.jifen;
    //商品分类标志
    this.flag = this.$route.query.flag;
    if(this.flag == 0){
      this.fangs = '包邮';
    }else{
      this.fangs = '自提';
    }

    //账号总积分  
    this.$post('/rongtuojinrong/points/getTotal.json')
    .then(res=>{
      this.points = res.data.data.points;
    })    

  }
};
</script>

<style lang="scss" >
body {
  background: #f9f9f9;
  .left {
    float: left;
  }
  .right{float: right;}
  .mtop {
    margin-top: 0.1rem;
  }
  .cju {
    color: #fe6633;
  }
  
  .fz10{    font-size: 0.09rem;
    line-height: 0.18rem;}
  .red{color:red;}
  .DHmineContents {
    width: 100%;
    height: auto;
    font-size: 14px;
    overflow: hidden;

    .DHmineContent-3 {
      margin-top: 0.5rem;

      .van-action-sheet{
        background-color: transparent;
        .shezhi{
          width: 96%;
          margin: 0 auto;
        }
        .van-action-sheet__cancel{
          width: 96%;
          margin: 0 auto;          
        }
        div:first-of-type{
          border-radius: 0.1rem 0.1rem 0 0;
          overflow: hidden;
        }
        div:nth-last-child(2){
          border-radius: 0 0 0.1rem 0.1rem;
          overflow: hidden;
        }   
        .van-action-sheet__cancel{
          margin: 0.05rem auto;
          border-radius: 0.1rem;
          color: #005ad4;
        }
        .van-action-sheet__cancel::before{
          height: 0;
        }     
      }


      ul{
        .addli{
          border-bottom: none;
          .address{
            width: 100%;
            display: flex;
            justify-content: space-between;
            .leftcont{
              display: flex;
              .sign{
                margin-right: 0.05rem;
                display: flex;
                align-items: flex-end;
              }
              .addetail{
                .addetaild{
                  margin-bottom: 0.1rem;
                }
              }
              .addetaildy{
                height: 0.18rem;
              }
            }
            .phone{
                .addetaild{
                  margin-bottom: 0.1rem;
                }
                .phonesign{
                  height: 0.18rem;
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                }
            }
          }
        }
        .ziti{
          .zicont{
            width: 100%;
            height: 0.2rem;            
            color: #fe6633;     
            display: flex;
            justify-content: center;
            align-items: center;     
            span{
              margin-left: 0.05rem;
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
      ul li {
        height:auto;
        display: flex;
        align-items: center;
        padding: 0 0.18rem 0;
        justify-content: space-between;
        border-bottom: 1px solid #eff2f8;
        background-color: #fff;
        padding:0.15rem 0.15rem;
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
        .addspimg{
            width: 0.83rem;
    height: 0.83rem;
    padding: 0.02rem;
    border: 1px solid #e5e9e5;
    }
     .addspimg2{width: 0.1rem;height:0.12rem;}
      .w80{width: 90%;}
      .linep{line-height: 0.4rem;padding-left:0.05rem;}
      .inpwd{width: 80%;border:none;}
      }
      ul li img {
        display: inline-block;
        width: 0.06rem;
      }

      .quit {
        width: 100%;
        height:0.6rem;
        overflow: hidden;
        position: fixed;
        bottom:0;
        left:0;
        background: #fff;
          border-top:2px solid #e5e9e5;
        button {
          width: 40%;
          height:0.6rem;
          border: none;
          color: #fff;
          text-align: center;
          background: #e5e9e5;
          float: right;
         
        }
        div{width: 60%;height: 0.6rem;text-align: right;float:left;
         line-height: 0.25rem;
         padding-right:0.15rem; 
         p:first-child{padding-top:0.05rem;}
        }
      }
    }
  }
}
</style>
