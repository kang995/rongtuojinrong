<template>
  <div class="billMonthBox">
    <headerBox title="月账单"></headerBox>
    <div class="billMonthBox-a">
      <span>总收入</span>
      <span>+{{zsr}}</span>
    </div>
    <div class="billMonthBox-b">
      <div id="myChart" :style="{width: '3.3rem', height: '2.5rem'}"></div>
      <div></div>
    </div>
    <div class="billMonthBox-c">
      <div class="billMonthBox-c-al billMonthBox-c-1">
        <span>总支出</span>
        <span>-{{zzc}}</span>
      </div>
      <div class="billMonthBox-c-al billMonthBox-c-2">
        <span>本月投标金额</span>
        <span>-{{yuezd.BidAmt}}</span>
      </div>
      <div class="billMonthBox-c-al billMonthBox-c-3">
        <span>本月提现金额</span>
        <span>-{{yuezd.WithdrawAmt}}</span>
      </div>
    </div>

    <div class="billMonthBox-c">
      <div class="billMonthBox-c-al billMonthBox-c-1">
        <span>会员积分</span>
      </div>
      <div class="billMonthBox-c-al billMonthBox-c-2">
        <span>本月获得积分</span>
        <span>{{yuezd.IncomeScore}}分</span>
      </div>
      <div class="billMonthBox-c-al billMonthBox-c-3">
        <span>本月消耗积分</span>
        <span>{{yuezd.ConsumeScore}}分</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      yuezd: {},
      zzc: 0,
      zsr: 0,
      rechar: "",
      back: "",
      option: {
        color: ["#5AB3EC", "#EB6B6A", "#2457CD", "#62B48D", "#F3B668"], //配置颜色
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        legend: {
          orient: "vertical",
          align: "left",
          icon: "circle", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 5, // 设置宽度
          itemHeight: 5, // 设置高度 //itemGap: 40, // 设置间距
          x: "right",
          y: "center",
          itemGap: 20,
          //data:['充值:元','回款本金','本月佣金','本月收益','其他收入'],
          textStyle: {
            //------------此处更改表格中的字体颜色
            fontSize: "12",
            color: "black"
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            center: ["30%", "50%"], //设置图像的位置
            radius: ["20%", "40%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "16",
                  fontWeight: "normal"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          }
        ]
      }
    };
  },
  mounted(){
    // if(!+localStorage.getItem("script")){
    //     var a = document.createElement("script");
    //     a.src = "https://cdn.bootcss.com/echarts/4.4.0-rc.1/echarts.min.js";
    //     document.body.appendChild(a);
    //     a.onload = ()=>{
    //         localStorage.setItem("script",1);
    //         this.drawLine();
    //     }
    // }else{
    //     this.drawLine();
    // }
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption(this.option);
      this.$post("/rongtuojinrong/userCenter/bill/monthBill.json", {
        defidenshuxing: this.$store.state.invite.defidenshuxing,
        month: this.$route.query.month
      })
        .then(res => {
          this.yuezd = res.data.data;
          //总支出
          this.zzc = (
            Number(this.yuezd.BidAmt) + Number(this.yuezd.WithdrawAmt)
          ).toFixed(2);
          //总收入
          this.zsr = (
            Number(this.yuezd.RechargeAmt) +
            Number(this.yuezd.BackPrincipalAmt) +
            Number(this.yuezd.CommissionAmt) +
            Number(this.yuezd.IncomeAmt) +
            Number(this.yuezd.OtherIncomeAmt)
          ).toFixed(2);
          console.log(this.zzc);
          myChart.setOption({
            //动画的配置
            legend: [
              {
                data: [
                  "充值：" + res.data.data.RechargeAmt + "元",
                  "回款本金：" + res.data.data.BackPrincipalAmt + "元",
                  "本月佣金：" + res.data.data.CommissionAmt + "元",
                  "本月收益：" + res.data.data.IncomeAmt + "元",
                  "其他收入：" + res.data.data.OtherIncomeAmt + "元"
                ]
              }
            ],
            series: [
              {
                silent: true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
                data: [
                  {
                    value: res.data.data.RechargeAmt,
                    name: "充值：" + res.data.data.RechargeAmt + "元"
                  },
                  {
                    value: res.data.data.BackPrincipalAmt,
                    name: "回款本金：" + res.data.data.BackPrincipalAmt + "元"
                  },
                  {
                    value: res.data.data.CommissionAmt,
                    name: "本月佣金：" + res.data.data.CommissionAmt + "元"
                  },
                  {
                    value: res.data.data.IncomeAmt,
                    name: "本月收益：" + res.data.data.IncomeAmt + "元"
                  },
                  {
                    value: res.data.data.OtherIncomeAmt,
                    name: "其他收入：" + res.data.data.OtherIncomeAmt + "元"
                  }
                ] //这里数据是一个数组的形似
              }
            ]
          });
        })
        .catch(err => {});
    }
  }
};

// export default {
//     data(){
//         return{
//             popshow: false,
//             show: false
//         }
//     },
//     methods:{

//     },

//     components:{

//     }
// }
</script>

<style lang="scss">
body {
  background-color: #f9f9f9;
  .billMonthBox {
    color: black;
    width: 100%;
    min-height: 100%;
    position: absolute;
    background-color: #e7eaf1;
    .mint-header {
      color: black;
      font-size: 0.15rem;
      background: #fff;
      height: 0.5rem;
      border-bottom: 1px solid rgb(229, 233, 242);

      .mint-header-title {
        font-size: 0.15rem;
        color: #333333;
        line-height: normal;
      }
    }
    .billMonthBox-a {
      background-color: #fff;
      padding: 0 0.1rem;
      margin-top: 0.5rem;
      height: 0.4rem;
      line-height: 0.4rem;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      justify-content: space-between;
      span {
        color: black;
        font-weight: bold;
      }
    }
    .billMonthBox-b {
      background: #fff;
      width: 100%;
      #myChart {
        width: 100%;
        height: auto;
      }
    }

    .billMonthBox-c {
      background: #fff;
      margin-top: 0.05rem;
      .billMonthBox-c-al {
        height: 0.4rem;
        line-height: 0.4rem;
        display: flex;
        justify-content: space-between;
      }
      .billMonthBox-c-1 {
        padding: 0 0.1rem;
        border-bottom: 1px solid #e5e9f2;
        span {
          color: black;
          font-weight: bold;
        }
      }
      .billMonthBox-c-2 {
        margin: 0 0.1rem;
        border-bottom: 1px solid #e5e9f2;
      }
      .billMonthBox-c-3 {
        margin: 0 0.1rem;
      }
    }
  }
}
</style>
