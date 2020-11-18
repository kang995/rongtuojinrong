<!--我的~~风险评估--->
<template>
  <div class="mineContents">
    <!-- 头部 -->
    <headerBox title="风险承受能力" >
       <router-link slot="rightTo"  class="right_content" to="/commonproblem" tag="span">常见问题</router-link>
    </headerBox>
    <div class="mineContent_fx">
      <div class="fengxs">
        <div class="fenglogimg">
          <div class="text_right">
            <span class="fxbor">
              您的风险承受能力评级：
              <span class="cju fz18">{{result.GradeName}}</span>
            </span>
            <br />
            <p class="pt1">
              评估完成时间：
              <span class="c3">{{result.LastTime*1000 | date-format}}</span>
            </p>
            <p>
              评估失效时间：
              <span class="c3">{{result.InvalidTime*1000 | date-format}}</span>
            </p>
          </div>
        </div>
        <div class="cishu">
          今年您还可以重新评估
          <span>{{result.IsInvalid}}</span>次
        </div>
        <button :class="{pgbutton:true,nocolor:result.IsInvalid==0}" @click="qupinggu">重新评估</button>
        <!-- <div v-show="cxpg" class="cju textcen">今年评估次数已达3次上限，2020-01-01后可重新评估</div> -->
      </div>
      <!--  评估列表  -->
      <div class="list">
        <p>评估记录</p>
        <ul>
          <li v-for="detail in fengxianlist" :key="detail.Id">
            <span class="left">{{detail.Time*1000 | date-format}}</span>
            <span class="right">{{detail.GradeName}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      result: {},
      fengxianlist: [],
      cxpg:false,
      newyear:''
    }
  },
  methods:{
    qupinggu(){
      if(this.result.IsInvalid>0){
        this.$router.push({path:'/rishquestion'});
      }
    },
  },
  
  created(){
        //风险评估结果
        this.$post('/rongtuojinrong/userCenter/accountInformation/riskEvaluateResult.json',{
          defidenshuxing: this.$store.state.invite.defidenshuxing,
        })
        .then(res=>{
            this.result = res.data.data;
            console.log(res.data.data);
            // if(this.result.IsInvalid==0){
            //     this.cxpg = true;
            //   }
        })
        .catch(err=>{  
        })      

        //风险评估列表
        this.$post('/rongtuojinrong/userCenter/accountInformation/evaluateList.json',{
          defidenshuxing: this.$store.state.invite.defidenshuxing,
        })
        .then(res=>{
            this.fengxianlist = res.data.data.Detail;
            console.log(res.data.data.Detail);
        })
        .catch(err=>{

        })  
      this.id = this.$route.query.id;
    
  }
};
</script>

<style lang="scss">
  .mineContents {
    width: 100%;
    height: 100%;
    font-size: 14px;
    position: absolute;
    background: #fff;
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
  .cju {
    color: #ff6632;
  }
  .fz18 {
    font-size: 0.18rem;
  }
  .pt1 {
    padding-top: 0.08rem;
  }
  .textcen{text-align: center;line-height: 0.3rem;}
    .mineContent_fx {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin: 0.6rem auto;
      .fengxs {
        margin: 0.2rem 0.1rem;
        .fenglogimg {
          width: 100%;
          height: 1.79rem;
          background: url(../../../assets/sm_09.jpg) no-repeat;
          background-size: 100%;
          .text_right {
            margin: 0.2rem 0.1rem;
            width: 68%;
            height: auto;
            overflow: hidden;
            float: right;
            text-align: center;
            p {
              line-height: 0.25rem;
            }
            .fxbor {
              line-height: 0.4rem;
              border-bottom: 1px solid #e5e9e5;
              padding-bottom: 0.1rem;
              font-size: 0.16rem;
            }
          }
        }
        .cishu {
          text-align: center;
          padding: 0.2rem 0 0.1rem 0;
          color: #333;
        }
        .pgbutton {
          width: 100%;
          height: 0.43rem;
          border: none;
          background: #005ad4;
          color: #fff;
          text-align: center;
          border-radius: 0.04rem;
          &.nocolor{
            background: #aaaaaa;
          }
        }
      }
      .list {
        border-bottom: 1px solid #e5e9e5;

        p {
          line-height: 0.4rem;
          padding-left: 0.15rem;
          border-bottom: 1px solid #e5e9e5;
        }
        ul {
          padding-left: 0.2rem;
          li {
            height: 0.45rem;
            border-bottom: 1px solid #e5e6e5;
            line-height: 0.45rem;
            padding-right: 0.2rem;
          }
          li:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>
