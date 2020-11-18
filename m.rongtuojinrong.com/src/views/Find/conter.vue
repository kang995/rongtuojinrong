<template>
  <div class="navBox">
    <ul class="nav">
      <router-link :to="{name:'helps'}" tag="li">
        <img src="../../assets/img26.png" alt />
        <span class="a1">新手帮助</span>
      </router-link>
      <router-link :to="{name:'meets'}"  tag="li">
        <img src="../../assets/img27.png" alt />
        <span>聚一聚</span>
      </router-link>
      <router-link :to="{name:'booking'}" tag="li">
        <img src="../../assets/img28.png" alt />
        <span>记账工具</span>
      </router-link>
      <router-link :to="{name:'counter'}" tag="li">
        <img src="../../assets/img29.png" alt />
        <span>收益计算</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .navBox {
    margin: 0 0.11rem 0 0.11rem;
    height: 0.96rem;
    background: #fff;
    border-radius: 0 0 0.03rem 0.03rem;
    .nav {
      height: 0.96rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        height: 0.96rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 0.01rem;
        img {
          width: 0.44rem;
          height: 0.44rem;
        }
        span {
          font-size: 0.11rem;
          color: #505050;
          margin-top: 0.08rem;
        }
      }
      li:nth-child(2) {
        .mint-popup {
          border-radius: 10px;
          .popupBox {
            width: 3rem;
            height: 3.25rem;
            border-radius: 10px;
            .popup_header {
              width: 3rem;
              height: 0.83rem;
              background: url(../../assets/img40.png) center;
              background-size: 100%;
              border-radius: 10px 10px 0 0;
              p {
                font-size: 0.25rem;
                color: #724301;
                padding: 0.29rem 0 0 0.37rem;
              }
            }
            .popup_top {
              font-size: 0.12rem;
              color: #292929;
              padding: 0.2rem 0 0.12rem 0;
              border-bottom: 1px dashed #e3edfc;
              margin: 0 0.2rem;
              line-height: 0.17rem;
            }
            .popup_center {
              height: 0.7rem;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                display: block;
                width: 0.14rem;
                height: 0.1rem;
                margin-top: 8px;
              }
              span {
                font-size: 0.15rem;
                color: #161616;
                padding: 0 0.11rem;
              }
            }
            .popup_bottom {
              width: 100%;
              height: 0.75rem;
              padding: 0 0.27rem;
              ol {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 0.75rem;
                li {
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  flex-direction: column;
                  height: 0.75rem;
                  img {
                    width: 0.3rem;
                    height: 0.3rem;
                  }
                  span {
                    color: #1c1c1c;
                    height: 0.1rem;
                    margin-top: 0.07rem;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>





