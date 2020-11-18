<!--开通存管确认页--->
<template>
  <div class="conmineContents2">
    <!-- 头部 -->
    <headerBox title="开通存管账户"></headerBox>
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
      sign:this.$sign+'/rongtuojinrong/userCenter/securitySetting/realnameAuthentication.json?user_id='+this.$store.state.login.token.user_id+'&xingming='+this.$route.query.xingming+'&shouji='+this.$store.state.invite.invite.mobile+'&shenfenzheng='+this.$route.query.shenfenzheng
    }
  },
  methods:{},
  created(){
  

  }

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
        .iframeBox{
            width:100%;
            height:100%;
        }
    } 
  }
   
</style>
