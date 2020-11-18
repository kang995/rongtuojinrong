<template>
  <div class="jlglBox">
      <headerBox title="奖励攻略"/>
      <!-- <div v-html="gonglue" class="jlglBox-1"></div> -->
      <!-- 使用iframe跳转web页 -->
      <iframe class="iframeBox" :src="sign" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
    data(){
        return{
            gonglue:'',
            navs:[],
            sign:this.$sign+'/rongtuojinrong/userCenter/invite/rewardStrategy.json?user_id='+this.$store.state.login.token.user_id,
        }
    },
    created(){
        this.$post('/rongtuojinrong/userCenter/invite/rewardStrategy.json')
        .then(res=>{
            this.gonglue = res.data;
            console.log(res);
        })
        .catch(err=>{

        })        
    }
}
</script>

<style lang="scss" scoped>
body,html{
    width:100%;
    height:100%;
        .jlglBox{
            width:100%;
            height:100%;
            position: absolute;
        .iframeBox{
            width:100%;
            height:100%;
            padding-top:0.5rem;
        }
    }  
}

</style>