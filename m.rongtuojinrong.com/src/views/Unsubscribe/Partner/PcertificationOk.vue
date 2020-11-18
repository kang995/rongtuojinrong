<template>
  <div class="Pcertification">
       <div class="pceconter">
        <div class="pcetopimg"><img src="../../../assets/pceok.png"></div>  
        <p class="font16">您的注销申请已提交成功</p>
        <p>账号将在2个工作日后注销成功并取消合伙人身份</p>
        <button @click="returned">返回</button>
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
        cancleAccount();
      }catch(e){

      }   
      // window.demo.cancleAccount();    
      // parent.testobject.cancleAccount();
      }
   }
}
</script>

<style lang="scss">
.Pcertification{
    width: 100%;
    height: 100%;
   margin:auto;
   color:#333;
   font-size: 0.12rem;
   background: #fff;
   //padding-top:0.5rem;
   position: absolute;
   .pceconter{
       width: 100%;
       padding-top:1.95rem;
    .pcetopimg{
        width: 0.55rem;
        margin:auto;
       img{width: 100%;height: 100%;}
    }
        p{text-align: center;line-height: 0.24rem;}
        .font16{font-size: 0.14rem;padding-top:0.25rem;} 
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