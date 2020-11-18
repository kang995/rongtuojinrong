<template>
  <div class="quxianBox">
      <headerBox title="取现"></headerBox>
      <iframe class="iframeBox" :src="sign" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
    data(){
        return{
            sign:this.$sign+'/rongtuojinrong/userCenter/withdrawal/smallAmount.json?user_id='+this.$store.state.login.token.user_id+'&defidenshuxing='
            +this.$store.state.invite.defidenshuxing+'&TransType='+this.$route.query.TransType+'&FlagChnl='+this.$route.query.FlagChnl+'&TransAmt='+this.$route.query.TransAmt,
        }
    },
    created(){
          
    }
}
</script>

<style lang="scss" scoped>
body,html{
    width:100%;
    height:100%;
        .quxianBox{
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