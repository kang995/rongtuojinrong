<template>
  <div class="rtjrBox">
      <headerBox title="融托金融账户"/>
    <div class="rtjrBox-1">
        <div class="rtjrBox-1a">
            <van-icon name="question-o" color="#0058d5" @click="popupVisible=!popupVisible"/>
        </div>

       <div class="rtjrBox-1b">
          <span>总资产(元)</span>
          <span @click="ztShow">
              <van-icon v-if="isShow" name="eye-o" color="" size="20px"/>
              <van-icon v-else name="closed-eye" color="" size="20px"/>
          </span>
      </div>
      <div v-if="isShow" class="rtjrBox-1c">{{zichanzongshu}}</div>
      <div v-else class="rtjrBox-1c">******</div>
      <div class="rtjrBox-1d">
          <div class="rtjrBox-1d1">
              <span>待收本金（元）</span>
              <span v-if="isShow">{{toubiaozhong}}</span>
              <span v-else>****</span>
          </div>
          <div class="rtjrBox-1d1">
              <span>待收利息（元）<van-icon name="question-o" color="#0058d5" @click="popupVisible1=!popupVisible1"/></span>
              <span v-if="isShow">{{yuqishouyi}}</span>
              <span v-else>****</span>
          </div>
          <div class="rtjrBox-1d1">
              <span>可用余额（元）</span>
              <span v-if="isShow">{{keyong}}</span>
              <span v-else>****</span>
          </div>
      </div>
    </div>

    <div class="rtjrBox-2">
        <router-link class="rtjrBox-2a" tag="div" :to="{name:'creDitor'}">
            <div class="rtjrBox-2a1">
                <div class="rtjrBox-2a1a">
                    <img src="../../../assets/ld_08.png">
                </div>
                <div class="rtjrBox-2a1b">我的债权</div>
            </div>
            <div class="rtjrBox-2a2">
                <span>查看详情</span>
                <van-icon name="arrow" />
            </div>
        </router-link>

        <router-link class="rtjrBox-2a" :to="{name:'shouYi'}" tag="div">
            <div class="rtjrBox-2a1">
                <div class="rtjrBox-2a1a">
                    <img src="../../../assets/ld_09.png">
                </div>
                <div class="rtjrBox-2a1b">已赚收益</div>
            </div>
            <div class="rtjrBox-2a2">
                <span>{{yizhuan}}元</span>
                <van-icon name="arrow"/>
            </div>
        </router-link>

        <router-link :to="{name:'plan'}" class="rtjrBox-2a" tag="div">
            <div class="rtjrBox-2a1">
                <div class="rtjrBox-2a1a">
                    <img src="../../../assets/ld_10.png">
                </div>
                <div class="rtjrBox-2a1b">回款计划</div>
            </div>
            <div class="rtjrBox-2a2">
                <span>查看详情</span>
                <van-icon name="arrow" />
            </div>
        </router-link>

        <router-link :to="{name:'Bill'}" class="rtjrBox-2a" tag="div">
            <div class="rtjrBox-2a1">
                <div class="rtjrBox-2a1a">
                    <img src="../../../assets/ld_11.png">
                </div>
                <div class="rtjrBox-2a1b">我的账单</div>
            </div>
            <div class="rtjrBox-2a2">
                <span>查看详情</span>
                <van-icon name="arrow" />
            </div>
        </router-link>                        

    </div>

      <mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="false">
        <div class="popupContent">
          <div class="popupContent-1">
            <span>什么是总资产？</span>
          </div>
          <p>总资产=待收本金+待收利息+冻结中资产+可用余额</p>
        </div>
        <div class="popupFooter">
          <div class="popupFooter-btn" @click="popupShow">好的</div>
        </div>
      </mt-popup>

      <mt-popup v-model="popupVisible1" popup-transition="popup-fade" :closeOnClickModal="false">
        <div class="popupContent">
          <!-- <div class="popupContent-1">
            <span>什么是总资产？</span>
          </div> -->
          <p>待收利息仅供参考，可能会因节假日顺延而发生变动，以实际计息天数为准。</p>
        </div>
        <div class="popupFooter" @click="popupShow1">
          <div class="popupFooter-btn" >好的</div>
        </div>
      </mt-popup>

  </div>
</template>

<script>
export default {
    data(){
        return{
            isShow: true,
            popupVisible: false,
            popupVisible1: false,
            zichanzongshu: 0,
            toubiaozhong: 0,
            yuqishouyi: 0,
            keyong: 0,
            yizhuan: 0

        }
    },
    components:{
        
    },
    methods:{
        ztShow(){
            this.isShow = !this.isShow;
            if(this.isShow){
                localStorage.setItem("myjrstatus",1);
            }
            if(!this.isShow){
                localStorage.setItem("myjrstatus",0);
            }            
        },
        popupShow() {
            this.popupVisible = false;
        },
        popupShow1() {
            this.popupVisible1 = false;
        }
    },
    created(){
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true
        });        
      this.$post('/rongtuojinrong/userCenter/huiShang.json')
      .then(res=>{
        this.$toast.clear();//关闭toast
        this.zichanzongshu = res.data.data.data.zichanzongshu;
        this.toubiaozhong = res.data.data.data.toubiaozhong;
        this.yuqishouyi = res.data.data.data.yuqishouyi;
        this.keyong = res.data.data.data.keyong;
        this.yizhuan = res.data.data.data.yizhuan;
      })
      .catch(err=>{

      }) 

      //从本地缓存中取状态
      if(localStorage.getItem("myjrstatus")==1){
        this.isShow = true;
      }
      if(localStorage.getItem("myjrstatus")==0){
        this.isShow = false;
      }        
    }
}
</script>

<style lang="scss" scoped>
.rtjrBox{
    width: 100%;
    min-height: 100%;
    position: absolute;
    background-color: #e7eaf1;
    .rtjrBox-1{
        margin-top: 0.5rem;
        padding: 0 0.2rem;
        background-color: #fff;
        .rtjrBox-1a{
            height: 0.5rem;
            line-height: 0.5rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        .rtjrBox-1b{
            display: flex;
            span:first-of-type{
                font-size: 0.1rem;
                margin-right: 0.1rem;
            }
        }
        .rtjrBox-1c{
            color: #0159d5;
            font-size: 0.2rem;

        }
        .rtjrBox-1d{
            display: flex;
            justify-content: space-between;
            margin-top: 0.15rem;
            padding-bottom: 0.1rem;
            .rtjrBox-1d1{
                display: flex;
                flex-direction: column;
                span:first-of-type{
                    font-size: 0.1rem;
                }
                span:nth-child(2){
                    font-size: 0.15rem;
                    color: #0159d5;
                }
            }
        }
    }
    .rtjrBox-2{
        margin-top: 0.05rem;
        background-color: #fff;
        .rtjrBox-2a{
            height: 0.4rem;
            padding: 0 0.2rem;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            .rtjrBox-2a1{
                display: flex;
                align-items: center;
                .rtjrBox-2a1a{
                    width: 0.25rem;
                    margin-right: 0.1rem;
                    img{
                        max-width: 100%;
                        height: auto;
                    }
                }
            }
            .rtjrBox-2a2{
                display: flex;
                align-items: center;
                span{
                    margin-right: 0.1rem;
                }
            }
        }
    }
    .mint-popup {
        width: 3rem;
        border-radius: 10px;
        color: #333333;
        overflow: hidden;
        text-align: center;
        .popupContent {
          margin: 0.12rem;
          .popupContent-1 {
            text-align: center;
            font-weight: bold;
          }
        }
        .popupFooter {
          border-top: 1px solid #eff2f8;
          border-radius: 10px;
          .popupFooter-btn {
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            color: #fff;
            background-color: #0159d5;
          }
        }
    }

}
</style>