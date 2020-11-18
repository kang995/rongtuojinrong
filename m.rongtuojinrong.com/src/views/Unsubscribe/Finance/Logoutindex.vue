 <template>
   <div class="Logouindexs">
        <div class="logoutopimg"><img src="../../../assets/logut.jpg"></div>
        <div class="logutitle">
            <p>您提交的注销申请生效前，融托金融团队将进行以下验证，以保证您的账号、财产安全:</p>
            <p class="padtop"><span>① 账号处于安全状态</span></p>
            <p>在最近两周内，您没有进行改密，改绑等敏感操作，您的账号没有被盗等风险。</p>
            <p class="padtop"><span>② 资产总额为0</span></p>
            <p>您的出借资金以及账户余额为0，融托金融账号上没有资金问题待结算。</p>
            <p></p>
        </div>
         <div class="logouend">
             <p>轻按下方的"申请注销"按钮，即表示你已阅读并同意</p>
             <router-link tag="p" class="blue" to="/Agreement">《注销协议》</router-link>
             <button @click="application">申请注销</button>
         </div>
   </div>

</template>

<script>
import qs from	'qs'

export default {
  data(){
    return {

    }
  },
  methods:{
       application(){
          let postdata = {
                user_id:this.$route.query.user_id,
              // user_id:109,
                appid:this.$route.query.appid,
                ssid:this.$route.query.ssid,
                time:this.nwedate,
            }
           this.$http.post(this.$url+"/rongtuojinrong/closeAccount/check.json",qs.stringify(postdata)).then(res=>{
             console.log(res.data.data)
            if(res.data.status==1){
                this.$toast(res.data.msg)
                return;
            }
            if(res.data.data==1){
                 this.$router.push("/LogoutFailed");
             }else {
                 //未实名
                 if(res.data.data.realname==0){
                   this.$router.push({name:"finGetCode",query:{mobile:res.data.data.mobile}});
                 }else{
                    this.$router.push({name:"codesucess",query:{mobile:res.data.data.mobile}}); 
                 }
                 
             }
           })
       }  
  },
  created(){
      var information={
            user_id:this.$route.query.user_id,
             //user_id:109,
            appid:this.$route.query.appid,
            ssid:this.$route.query.ssid,
        }
       sessionStorage.setItem("info",JSON.stringify(information)); 
       //获取时间
       this.nwedate = Math.round(new Date()/1000);
  }
}
</script>

<style lang="scss">
 .Logouindexs{
   width: 100%;
   height: 100%;
   margin:auto;
   color:#333;
   font-size: 0.12rem;
   background: #f9f9f9;
   position: absolute;
  .logoutopimg{
      width: 100%;
     // padding-top:0.5rem;
     img{
         width: 100%;
         height:100%;
     }
  }
  .logutitle{
   padding: 0.25rem 0.11rem;
   line-height: 0.2rem;
   p span{font-weight:bold;}
   .padtop{padding-top:0.14rem;}
  }
  .logouend{
      position: fixed;
      bottom:0.48rem;
      left:0;
      text-align: center;
      width: 100%;
      .blue{color:#0159d9;}
       p{line-height: 0.22rem;text-align: center;}
       button{
        border:none;
       height: 0.42rem;
       width: 2.85rem;
       margin:auto;
       color:#fff;
       font-size: 0.14rem;
       //font-weight: bold;
       background: #0159d9;
       border-radius: 0.2rem;
       margin-top:0.15rem;
       letter-spacing:0.02rem;
       }
  }
 }
</style>