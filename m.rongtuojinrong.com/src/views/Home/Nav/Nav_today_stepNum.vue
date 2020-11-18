<!--今日任务--步数排行 -->
<template>
  <div class="stepNum">
    <!-- 头部 -->
    <!-- <mt-header title="步数排行" fixed>
      <router-link to="/today" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox title="步数排行"></headerBox>
    <!-- 图片 -->
    <div class="imgBox">
        <img src="../../../assets/排行榜banner@2x.png" alt="">
    </div>
    <!-- 中部cell -->
    <div class="step_center">
        <div class="step_top">
            <span>用户名</span>
            <span>步数</span>
            <span>兑换积分</span>
            <span>名次</span>
        </div>
        <!-- 循环生成cell -->
        <div v-for="num in nums" :key="num.id" class="step_bot">
            <div class="circleBox">
                <div v-if="isShow" class="showBox1">
                    <!-- 判断border圆角颜色 -->
                    <p  v-if="num.ranking===1" style="border:2px solid #fbc924;">
                        <img v-lazy="num.avatar" alt="">
                    </p>
                    <p  v-else-if="num.ranking===2" style="border:2px solid #cccccc;">
                        <img v-lazy="num.avatar" alt="">
                    </p>
                    <p  v-else-if="num.ranking===3" style="border:2px solid #cd986e;">
                        <img v-lazy="num.avatar" alt="">
                    </p>
                     <p v-else>
                        <img v-lazy="num.avatar" alt="">
                    </p>
                </div>
            </div>
            <i>{{num.username}}</i>
            <i class='bold'>{{num.current_steps}}</i>
            <i>{{num.num}}</i>
            <!-- 判断名次 -->
            <i class='bold' v-if="num.ranking===1" style="color:#ff561c">{{num.ranking}}</i>
            <i class='bold' v-else-if="num.ranking===2" style="color:#ff561c">{{num.ranking}}</i>
            <i class='bold' v-else-if="num.ranking===3" style="color:#ff561c">{{num.ranking}}</i>
            <i class='bold' v-else>{{num.ranking}}</i>
            <div class="crownBox">
                <!-- 判断皇冠 -->
                <img v-if="num.ranking===1" class="img1" src="../../../assets/第一名@2x.png" alt="">
                <img v-if="num.ranking===2"  class="img1" src="../../../assets/第二名@2x.png" alt="">
                <img v-if="num.ranking===3"  class="img1" src="../../../assets/第三名@2x.png" alt="">
            </div>
        </div>
    </div>
    <!-- 底部 -->
    <div class="step_Bottom">
        <div class="step1">
            <img src="../../../assets/排行榜-状态2_02.png" alt="">
        </div>
        <div class="step2"> 
           <ul>
               <p>我的步数</p>
               <span class='bold'>{{myNums.steps}}</span>
           </ul>
            <ul>
               <p>我的名次</p>
               <span class='bold'>{{myNums.ranking}}</span>
           </ul>
            <ul>
               <p>可兑换积分</p>
               <span class='bold'>{{myNums.sure_points}}</span>
           </ul>
        </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            nums:'', //排行榜列表
            myNums:'', //我的步数信息
            isShow:true
        }
    },
    methods:{
       getNum(){
        //    let postData = qs.stringify({ //向后台传入user_id
        //         user_id:34278
        //     });
            this.Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$post('/rongtuojinrong/activity/sports/v1/Feet2PointsAwards.json').then(res=>{
               this.nums = res.data.data.list;//list：排行榜列表
               this.myNums = res.data.data.my;//my：我的步数信息
               this.Indicator.close();
            //    console.log(this.nums)
            })
        }
    },
    created(){
        this.getNum();
    }
};
</script>



<style lang='scss'>
.stepNum {
    width:100%;
    .mint-header {
        background: #fff;
        height: 0.5rem;
        .mint-button-icon {
        color: #404040;
        }
        .mint-header-title {
        font-size: 0.15rem;
        color: #404040;
        }
    }
    .imgBox{
        width:100%;
        height:1.51rem;
        margin-top:0.5rem;
        img{
            width:100%;
            height:100%;
        }
    }
    .step_center{
        width:100%;
        border-radius:0.1rem;
        .step_top{
            width:100%;
            height:0.38rem;
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding:0 0.18rem 0 0.81rem;
            span{
                font-size:0.11rem;
                color:#515151;
            }
        }
        .step_bot{
            width:100%;
            height:0.65rem;
            padding:0 0.27rem 0 0.1rem;
            display:flex;
            justify-content:space-between;
            align-items:center;
            position:relative;
            background:#fff;
           .circleBox{
                display:flex;
                justify-content:space-between;
                align-items:center;
                p{
                    width:0.36rem;
                    height:0.36rem;
                    border:1px solid #dedfde;
                    border-radius:50%;
                    overflow: hidden;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
               
            }
            i:nth-of-type(1){
                position:absolute;
                left:0.55rem;
                color:#000000;
                font-size:0.1rem;
            }
             i:nth-of-type(2){
                position:absolute;
                left:1.58rem;
                color:#353535;
                font-size:0.1rem;
                font-weight:bolder;
            }
            i:nth-of-type(3){
                position:absolute;
                left:2.45rem;
                font-size:0.1rem;
                color:#070707;
            }
            i:nth-of-type(4){
                color:#282828;
                font-size:0.1rem;
            }
           .crownBox{
                width:0.12rem;
                height:0.1rem;
                position:absolute;
                top:0.08rem;
                left:0.10rem;
                .img1{
                   width:100%;
                   height:100%;
                }
           }
        }
    }
    .step_Bottom{
        width:100%;
        height:1.57rem;
        .step1{
            width:100%;
            height:1.02rem;
            img{
                width:100%;
                height:100%;
            }
        }
        .step2{
            width:100%;
            background:#0159d5;
            display:flex;
            justify-content:space-between;
            align-items: center;
            position:fixed;
            bottom:0;
            z-index:10;
            ul{
                width:33%;
                display: flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                height:0.55rem;
                p{
                    color:#fff;
                }
                span{
                    color:#fff;
                }
            }
        }
    }
}
</style>
