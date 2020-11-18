<template>
 <!-- 大额提现页面 -->
  <div class="largeBox">
      <headerBox title="取现"></headerBox>
      <iframe class="iframeBox" :src="sign" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
    data(){
        return{
            sign:this.$sign+'/rongtuojinrong/userCenter/withdrawal/largeAmount.json?user_id='+this.$store.state.login.token.user_id+'&defidenshuxing='
            +this.$store.state.invite.defidenshuxing+'&TransType='+this.$route.query.TransType+'&FlagChnl='+this.$route.query.FlagChnl+'&TransAmt='+this.$route.query.TransAmt+'&BrabankName='+this.$route.query.bankname+'&BankCnaps='+this.$route.query.card,
        }
    },
    created(){
          console.log(this.$store.state.invite.defidenshuxing);
    }
}
</script>

<style lang="scss" scoped>
body,html{
    width:100%;
    height:100%;
        .largeBox{
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