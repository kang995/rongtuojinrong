<!--开通存管确认页--->
<template>
  <div class="conmineContents2">
    <!-- 头部 -->
    <headerBox title="绑定银行卡号"></headerBox>
    <!-- 使用iframe跳转web页 -->
     <div class="jlglBox">
      <iframe class="iframeBox" :src="sign" frameborder="0" ></iframe>
      <div class="mtop"></div>
     </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      sign:this.$sign+'/rongtuojinrong/userCenter/accountInformation/bindBankCard.json?user_id='+this.$store.state.login.token.user_id+'&defidenshuxing='+this.$route.query.defidenshuxing+'&FlagChnl='+this.$route.query.FlagChnl
    }
  },
  
}
</script>
<style lang="scss">
  .conmineContents2 {
    width: 100%;
    height: 100%;
    font-size: 14px;
     background: #f9f9f9;
     position: absolute;
    
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
  .displayNO{display: none;}
    
   .jlglBox{
            width:100%;
            height:100%;
            position: absolute;
             margin-top:0.5rem;
        .iframeBox{
            width:100%;
            height:100%;
        }
    } 
  }
   
</style>
