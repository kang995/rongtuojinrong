<!-- 我的积分首页-->
<template>
  <div class="integralBox">
    <!-- 头部 -->
    <!-- <mt-header title="积分兑换">
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link> -->
      <!-- <router-link to="/gonglv" slot="right">
       <mt-button slot="right">攻略</mt-button>
      </router-link> -->

<!-- <mt-button slot="right"><router-link tag="a" class="fz14"  to="/gonglv">攻略</router-link></mt-button>

    </mt-header> -->

<headerBox title="积分兑换">
      <router-link slot="rightTo" class="right_content" tag="span" to="">
        <van-icon name="plus" class="xuanz" :class="[rotate?  'go' : 'aa' ]" @click="start"/>
      </router-link>
</headerBox>


    <van-popup 
    class="upshow"
    v-model="show" 
    :close-on-click-overlay="false" 
    @click-overlay="showlist"
    :style="{ top: '15%',left: 'auto',right: '-10%'}"
    >
      <div class="popshowjf">
        <router-link class="showcho" tag="div" to="/gonglv"><span><img src="../../../assets/jf-gl.png"></span><span>积分攻略</span></router-link>
        <router-link class="showcho" tag="div" to="/jfDefinite"><span><img src="../../../assets/jf-mx.png"></span><span>积分明细</span></router-link>
        <router-link class="showcho" tag="div" to="/newduihuan"><span><img src="../../../assets/jf-jl.png"></span><span>兑换记录</span></router-link>
      </div>
    </van-popup>


    <div class="integralclass">
      <div v-show="showjifen1">
        <div class="jifen">
          <span class="jif1">{{jifen.points}}</span>
          <span class="jif2">积分</span>       
        </div>
        <!-- <div ref="topTab" class="xunzcont" :class="{fixed:isFixed}">
          <ul class="xunzjf">
            <li v-for="(item,index) in jialist" :key="index" @click="choicem(index)" :class="{active:index == num}">
              {{item}}
            </li>
          </ul>
        </div> -->
      </div>

      <div v-show="showjifen2" class="jifen2content">
        <div class="jifentwo">
          <span class="twopoints">{{jifen.points}}积分</span> 
        </div>
        <!-- <div class="twolistcont">
          <ul class="twolist">
            <li v-for="(item,index) in jialist" :key="index" @click="choicem(index)" :class="{active:index == num}">
              {{item}}
            </li>
          </ul>
        </div>         -->
      </div>
      <div ref="topTab" class="xunzcont" :class="{fixed:isFixed}">
        <ul class="xunzjf">
          <li v-for="(item,index) in jialist" :key="index" @click="choicem(index,item)" :class="{active:index === num}">
            {{item.xshi}}
          </li>
        </ul>
      </div>      
      <div 
      v-infinite-scroll="loadMore" 
      infinite-scroll-disabled="loading" 
      infinite-scroll-distance="10"      
      class="clear shopplist">
        <ul v-if="sign>0">
           <router-link v-for="shop in list"  :to="{name:'newjfDetails',query:{goodsId:shop.goodsId}}"   :key="shop.index" tag="li"  >
            <p><img :src="shop.coverImageApp"></p>
            <p class="c3">{{shop.goodsName}}</p>
            <p>
              <span class="left jfsign">{{shop.score}}积分</span> 
              <!-- 判断剩余为0 -->
              <span v-if="shop.avlStoreAll!=0" class="right">仅剩<span class="jfsign">{{shop.avlStoreAll}}</span>个</span>
              <span v-else class="right">已兑完</span>

            </p>
           </router-link>

           <!-- <router-link v-for="shop in newlist"  :to="{name:'newjfDetails',query:{product_id:shop.product_id,flag:'1'}}"   :key="shop.index" tag="li"  >
            <p><img :src="shop.img"></p>
            <p class="c3">{{shop.title}}</p>
            <p>
              <span class="left jfsign">{{shop.needjifen}}积分</span> 
              
              <span v-if="shop.remaining!=0" class="right">仅剩<span class="jfsign">{{shop.remaining}}</span>个</span>
              <span v-else class="right">已兑完</span>

            </p>
           </router-link>           -->

        </ul>

        <div class="showk" v-if="sign==0">
          <div class="kongpig">
            <img src="@/assets/jf-007.png">
          </div>

          <p>暂时没有此区间的商品哦~</p>

        </div>

      </div>
      <router-link to="/cart" class="showche" tag="div">
        <img src="../../../assets/jf-che.png">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      sign: -1,
      list: [],
      jifen: {},
      newlist: [],
      pageNumber:1,
      pageSize:10,
      loading:false,//默认开启无限滚动   true的话就代表关闭无限滚动
      hasMore:true,//有更多数据     
      rotate: false,
      show: false, 
      isFixed: false,
      showjifen1: true,
      showjifen2: false,
      jialist: [
        {
          min: 0,
          max: 2000,
          xshi: '2000以下'
        },
        {
          min: 2001,
          max: 5000,
          xshi: '2001-5000'
        },
        {
          min: 5001,
          max: 10000,
          xshi: '5001-10000'
        },   
        {
          min: 10001,
          max: 20000,
          xshi: '10001-20000'
        },  
        {
          min: 20000,
          xshi: '20000以上'
        },
      ],
      num: '',
      minzhi: '',
      maxzhi: ''
    }
  },
  methods:{
    choicem(a,b){
      this.num = a;
      this.minzhi = b.min;
      this.maxzhi = b.max;
      this.list = [];
      this.pageNumber = 1;
      this.loading = false;
      this.hasMore = true;
      this.loadMore();      
    },
    onScroll() {  
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = this.$refs.topTab.offsetTop;
      if (scrollTop > offsetTop) {
        //this.showjifen1 = false;
        this.showjifen2 = true;
        this.isFixed = true;
      }else{
        //this.showjifen1 = true;
        this.showjifen2 = false;        
        this.isFixed = false;
      }; 
     
    }, 
      showlist(){
        this.start();
      },
      start() {
          this.rotate = !this.rotate;
          this.show = !this.show;
          console.log(this.rotate)
      },    
      loadMore(){ //加载更多的方法  
          if(!this.hasMore){ //如果没有更多数据了
                  // this.$toast({
                  //     message: '我是有底线的....',
                  //     position: 'bottom'
                  // });
              this.loading = true;
              return false;//不在请求数据
              }
              this.getList() 
      },
      getList(){
          let {pageNumber,pageSize} = this; //不使用{}解构时的写法：let page = this.page           
          this.loading = true;//关闭无限滚动  5s
          this.$toast.loading({
              message: '加载中...',
              forbidClick: true
          });
          this.$post('/vipshop/v1/goods/lists.json',{
          pageNumber,
          pageSize,
          minScore: this.minzhi,
          maxScore: this.maxzhi
          }).then(res=>{
          
              this.sign = res.data.data.total;

              this.list = this.list.concat(res.data.data.data);
              this.loading = false;//继续开启无限滚动
              this.$toast.clear();//关闭toast
              // if(page*limit >= res.data.data.Num){ //判断是否有更多数据
              //     this.hasMore = false; //没有更多数据了
              //     return false;
              // }               
              if(pageNumber*pageSize>res.data.data.total){
                  this.hasMore = false;
                  return false;
              }
              
              this.pageNumber++;                        
          })
      },
  },


  created(){
      // this.$post("/youshangcheng/hotProduct.json")
      // .then(res=>{
      //   this.list = res.data.data;
      //   console.log(res);
      // })
      // .catch(err=>{
      //   console.log("查询失败");
      // })

      this.$post("/rongtuojinrong/points/getTotal.json")
      .then(res=>{
        this.jifen = res.data.data;
        console.log(res.data.data);
      })
      .catch(err=>{
        console.log("查询失败");
      })
    
      window.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  }    
};
</script>

<style lang="scss">
body {
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .displayNO {
    display: none;
  }
  .clear {
    clear: both;
  }
  .mt0 {
    margin-top: 0;
  }
  .c3 {
    color: #333;
  }
  .c_blue {
    color: #0159d5;
  }
  .red{color:red;}
  .jfsign{
    color: #ff8860;
  }

  .fz14{font-size: 0.14rem;}
  .integralBox {
    width: 100%;
    height: auto;
    font-size: 14px;
    overflow: hidden;
    background-color: #fff;
    .back{
      border: none;
    }
    .right_content{
        display: flex;
        align-items: center;
        .xuanz{
          font-size: 0.225rem;
        }
        .aa {
            transition: all 0.5s;
        }

        .go {
            transform: rotate(45deg);
            transition: all 0.5s;
        }
    }      

    .upshow{
      padding: 0 2%;
      border-radius: 5%;
      .popshowjf{
        .showcho{
          display: flex;
          align-items: center;
          height: 0.3rem;
          line-height: 0.3rem;
          img{
            width: 0.12rem;
            margin-right: 0.1rem;
          }
        }
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
      margin-top: 0.5rem;
      height: 0.46rem;
      overflow: hidden;
      li {
        width: 50%;
        float: left;
        height: 0.46rem;
        line-height: 0.46rem;
        text-align: center;
        border-bottom: 1px solid #e5e9f2;
        background: #fff;
      }
      .router-link-active {
        color: #0159d5;
        border-bottom: 1px solid #0159d5;
      }
    }
    .integralclass {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-top: 0.5rem;
      margin-bottom: 0.8rem;
      .showche{
        width: 0.8rem;
        position: fixed;
        bottom: 0.66rem;
        right: 0.2rem;
        img{
          max-width: 100%;
          height: auto;
        }
      }
      .jifen2content{
        position: fixed;
        width: 100%;
        background-color: #fff;
        padding-bottom: 0.07rem;   
        top: 0.5rem;   
        .jifentwo{
          width: 100%;
          height: 0.5rem;      
          text-align: center;
          font-size: 0.2rem;
          color: #ff6633;
          border-bottom: 5px solid #f9f9f9;
        }
        .twolistcont{
          overflow: hidden;
          .twolist{
            display: flex;
            overflow: auto;
            li{
              margin: 0.07rem 0.15rem 0;
              white-space: nowrap;
              display: flex;
              align-items: center;
            }
            .active{
              padding: 0.08rem 0.15rem;
              border-radius: 0.2rem;
              background-color: #eef3f9;
              color: #2e74db;
              font-weight: bold;
            }
          }         
        }   
      }
   
      .jifen {
        height: 1.35rem;
        text-align: center;
        line-height: 0.35rem;
        margin: 0 0.15rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ff6633;
        border-radius: 0.1rem;
        background: url('../../../assets/jf-mybg.png');
        background-size:100% 100%;
        background-repeat:no-repeat;
        .jif1{
          font-size: 0.5rem;
          margin-top: -0.2rem;
        }
        .jif2{
          font-size: 0.2rem;
        }
      }

      .fixed {
        position: fixed;
        width: 100%;
        top: 1rem;
        background-color: #fff;
        z-index: 99;
      }
      .xunzcont{
        overflow: hidden;
        .xunzjf{
          padding: 0 0.1rem;
          display: flex;
          overflow: auto;
          li{
            margin: 0.07rem 0;
            padding: 0.07rem 0.15rem;
            white-space: nowrap;
            display: flex;
            align-items: center;
          }
          .active{
            padding: 0.08rem 0.15rem;
            border-radius: 0.2rem;
            background-color: #eef3f9;
            color: #2e74db;
            font-weight: bold;
          }
        }
      }


      .jifennav {
        margin-top: 0.2rem;
        overflow: hidden;
        a {
          display: block;
          width: 50%;
          float: left;
          height: 0.25rem;
          text-align: center;
          line-height: 0.25rem;
          font-size: 0.14rem;
        }
        a:first-child {
          border-right: 1px solid #999;
        }
      }

      .shopplist {
        ul{
          height:auto;
          margin:auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center; 
          justify-content:space-between;
          padding: 0 0.1rem;
          li{
            display: flex; 
            flex-direction:column;
            width: 49%;
            margin-bottom:0.1rem;
            img{width: 1.75rem;height:1.75rem;}
           p{padding:0.05rem 0}
          p:first-of-type{
            padding: 0;
          }
   
          }
        }
        .showk{
          .kongpig{
            width: 100%;
            margin-top: 0.3rem;
            img{
              max-width: 100%;
              height: auto;
            }
          }
          p{
            font-size: 0.12rem;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
