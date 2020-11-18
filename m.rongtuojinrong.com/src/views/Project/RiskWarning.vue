<template>
  <div id="risk-warning">
    <div class="backa">
      <img class="b" src="../../assets/img61.png" @click="goback" />
      <p>风险提示</p>
    </div>
    <div class="entire">
      <div class="entire-one">
        <div class="entire-one-blank"></div>
        <span>
          在网络借贷信息中介平台进行出借时,可能会获得较高的出借收益,
          但同时也存在着较大的出借风险。为了使您更好的了解其中的风险,
          根据有关网络借贷法律法规规定,特提供本风险提示书,请认真阅读：
          出借人从事网络借款存在如下风险：
        </span>
      </div>
      <div class="entire-two">
        <h5>1.政策风险</h5>
        <span>
          因国家金融监管政策、财政政策、货币政策、行业政策、地区发展、法律法规
          等因素引起的风险,您将可能无法按时足额获得应收账款项下款项。
        </span>
      </div>
      <div class="entire-three">
        <h5>2.信用风险</h5>
        <span>如债务人发生资金状况或经营状况的风险,您将可能无法按时足额获得应收账款项下款项。</span>
      </div>
      <div class="entire-four">
        <h5>3.流动性风险</h5>
        <span>借贷存在一定的存续期,出借人无提终止权,可能导致您需要资金时无法随时变现,并可能是您丧失其他出借机会。</span>
      </div>
      <div class="entire-five">
        <h5>4.技术风险</h5>
        <span>
          由于交易撮合及资金划转等过程是通过电子通讯技术和电脑技术
          来实现的,这些技术存在着被网络黑客和计算机病毒攻击的可能,
          同时通讯技术、电脑技术和相关软件具有存在缺陷的可能,
          这些风险可能给您带来损失或转账资金不能及时到账。
        </span>
      </div>
      <div class="entire-six">
        <h5>5.不可抗力因素导致的风险</h5>
        <span>
          由于战争、动乱、自然灾害、公共网络瘫痪等不可抗拒因素的出现
          而可能导致您无法按时足额获得应收账款项下款项的风险。
        </span>
      </div>
      <div class="entire-seven">
        <h5>6.其他风险</h5>
        <span>
          由于您密码失密、操作不当、出借决策失误等原因可能会使您发生损失;
          网上委托、热键操作完毕后未及时退出,他人进行恶意操作而造成的损失;
          网上交易未及时退出还可能遭遇黑客攻击,从而造成损失;委托他人代理出借,
          致使他人恶意操作而造成的损失;其他意义时间造成的损失;上述损失都将由您自行承担。
          融托金融再次郑重提示:再出前,出借人应确保自己完全理解该项出借性质和所涉及的风险,
          详细了解和审慎评估该项目的资金流向、风险类型及预期年化利率等基本情况。
          融托金融提醒用户本着 “充分了解风险、自主选择出借” 的原则,谨慎决策,
          自愿出借其合法所有资金,在慎重考虑后自行决定出借与自身风险承受的能力和资产
          管理需求相匹配的项目;在出借项目后,随时关注该项目的信息披露情况,及时获取相关信息。
        </span>
      </div>
      <div class="entire-eight">
        <span>网络借贷有风险,出借需谨慎</span>
        <span>融托金融</span>
      </div>
    </div>
  </div>
</template>

<script>
name: "risk-warning";
export default {
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>


<style lang='scss' scoped>
.risk-warning-a {
  background-color: #ffffff;
  color: black;
}
.entire {
  margin-top: 1.2rem;
  width: 100%;
  height: 100%;
  padding: 3%;
  .entire-one {
    width: 100%;
    height: 1rem;
    margin-top: -0.8rem;
    .entire-one-blank {
      width: 4px;
      height: 11px;
      background-color: #005ad5;
      display: inline-block;
    }
    .entire-one span {
      font-size: 10px;
    }
  }
  .entire-two {
    width: 100%;
    height: 0.92rem;
    margin-top: 0.3rem;
    span {
      font-size: 10px;
    }
    h5 {
      margin-bottom: 0.12rem;
      font-weight: bold;
      color: black;
    }
  }
  .entire-three {
    width: 100%;
    height: 0.76rem;
    margin-top: 0.3rem;
    span {
      font-size: 10px;
    }
    h5 {
      margin-bottom: 0.12rem;
      font-weight: bold;
      color: black;
    }
  }

  /* 流动性风险 */
  .entire-four {
    width: 100%;
    height: 0.76rem;
    margin-top: 0.3rem;
    span {
      font-size: 10px;
    }
    h5 {
      margin-bottom: 0.12rem;
      font-weight: bold;
      color: black;
    }
  }
  /* .技术风险 */
  .entire-five {
    width: 100%;
    height: 1.18rem;
    margin-top: 0.3rem;
    span {
      font-size: 10px;
    }
    h5 {
      margin-bottom: 0.12rem;
      font-weight: bold;
      color: black;
    }
  }
  /* 不可抗力因素导致的风险 */
  .entire-six {
    width: 100%;
    height: 0.77rem;
    margin-top: 0.3rem;
    span {
      font-size: 10px;
    }
    h5 {
      margin-bottom: 0.12rem;
      font-weight: bold;
      color: black;
    }
  }

  /* 其他风险 */
  .entire-seven {
    width: 100%;
    height: 2.805rem;
    margin-top: 0.3rem;
    span {
      font-size: 10px;
    }
    h5 {
      margin-bottom: 0.12rem;
      font-weight: bold;
      color: black;
    }
  }
  .entire-eight {
    width: 100%;
    height: 0.615rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
    margin-top: 0.6rem;
    span {
      display: block;
      margin-top: 0.15rem;
      font-weight: bold;
      color: black;
    }
  }
}
.backa {
  width: 100%;
  height: 0.5rem;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: #ffffff;
  padding: 0 0.1rem;
  img {
    line-height: 0.5rem;
    height: 0.15rem;
    position: absolute;
    left: 0;
    top: 0.18rem;
    margin-left: 0.1rem;
  }
  p {
    line-height: 0.5rem;
    font-size: 0.15rem;
    color: #000;
    font-weight: bold;
  }
}
</style>
