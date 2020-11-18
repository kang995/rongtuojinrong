<template>
  <div class="authenok">
       <div class="autconter">
        <div class="autopimg"><img src="../../../assets/authenok.png"></div>  
        <p class="font16">注销成功</p>
        <p class="ptd">您已成功注销融托金融账号，即日起将无法<br/>通过本账号登录融托金融。</p>
        <button @click="returned">确定</button>
       </div>
  </div>

</template>

<script>
export default {
   methods:{
      returned(){
         
      try{
         window.demo.cancleAccount();
      }catch(e){

      }        
      
      try{
         parent.testobject.cancleAccount();
      }catch(e){

      }   
      // window.demo.cancleAccount();    
      // parent.testobject.cancleAccount();
      }
   }
}
</script>

<style lang="scss">
.authenok{
    width: 100%;
    height: 100%;
   margin:auto;
   color:#333;
   font-size: 0.12rem;
   background: #fff;
   //padding-top:0.5rem;
   position: absolute;
   .autconter{
       width: 100%;
       padding-top:1.3rem;
    .autopimg{
        width: 0.61rem;
        margin:auto;
       img{width: 100%;height: 100%;}
    }
        p{text-align: center;line-height: 0.24rem;}
        .font16{font-size: 0.14rem;padding-top:0.25rem;font-weight: bold;letter-spacing: 0.02rem;} 
        .ptd{padding-top:0.15rem;}
        
     button{
     width:1.65rem;
     height:0.4rem;
     border:none;
     border:1px solid #2a2a2a;
     border-radius:0.2rem;
     background:#fff;
     font-size: 0.14rem;
     margin:auto;
     display: block;
     margin-top:0.25rem;
     
     }
   }


 

}
</style>