<template>
    <div class="redenvelopeBox">
        <div class="redenvelopeBox-1">
            <van-icon name="warning-o" />
            <router-link :to="{name:'experienceUse'}" class="redenvelopeBox-1s" tag="span">使用说明</router-link>
        </div>
        <div class="redenvelopeBox-2">
            <div class="redenvelopeBox-2-a">暂无体验金</div>
            <router-link :to="{name:'usedExperience'}" tag="div">查看已使用和过期体验金 ></router-link>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
body{
    .redenvelopeBox{
        padding-top: 0.83rem;
        .redenvelopeBox-1{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-right: 0.2rem;
            margin-top: 0.05rem;
            .redenvelopeBox-1s{
                padding-left: 0.05rem;
                
            }
        }
        .redenvelopeBox-2{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 0.3rem;
            .redenvelopeBox-2-a{
                font-size: 0.14rem;
                color: black;
                height: 0.3rem;
                line-height: 0.3rem;
            }
        }
    }
}
</style>