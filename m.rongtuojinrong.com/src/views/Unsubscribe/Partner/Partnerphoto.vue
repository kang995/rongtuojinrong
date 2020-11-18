<template>  
  <div class="photbox">
    <div class="boxContent">
        <div class="topCont"></div>
        <div class="midCont">
            <div class="centerMid">

            <div class="xuanx duanx newdus">
                   <span class="duanxs newhight">手机号：</span><input  readonly :value="phone" class="backNo">
                   <div class="btnHuo">
                    <div class="btnduanx" v-if="isShow" @click="Coda">
                        {{btnval}}
                    </div>
                    <div class="btnduanx" v-else>{{btnval}} <span>({{count}}S)</span></div>
                   </div>
                </div> 

                <div class="xuanx">
                   <span>验证码：</span><input placeholder="请输入短信验证码" v-model="yanz">
                </div>

                <div class="xuanx">
                   <span>身份证号：</span><input placeholder="请输入身份证后四位" v-model="IDcard">
                </div>
                                                   
            </div>
        </div>
        <div class="botCont">
            <div class="define" @click="Ascertain">确定</div>
        </div>
    </div>
  </div>
</template>

<script>
import qs from	'qs'
import { Dialog } from "vant";
export default {
    data(){
        return{
            isShow: true,
            btnval: '获取验证码',
            count: 60,
            showts: false,
            IDcard: '',
            yanz: '',
            user_id: '',
            phone: ''
        }
    },
    methods:{
            //验证码
            Coda(){
            let info = JSON.parse(sessionStorage.getItem("info"));
            let time = parseInt(new Date().getTime()/1000);
            let params1 = {
                user_id: info.user_id,
                type: 11,
                appid: info.appid,
                ssid: info.ssid,
                time: time
            }
            this.$http.post(this.$url+"/rongtuojinrong/certificate/commonAuth/send.json",qs.stringify(params1))
            .then(res=>{
                //60秒倒计时方法（获取验证码）  
                let time = 60;
                let timer = setInterval(() => {
                if(time == 0) {
                    clearInterval(timer);
                    this.isShow = true;
                    this.btnval = "重新获取";
                } else {
                    this.count = time;//赋值
                    this.isShow = false;
                    this.btnval ='已发送';
                    time --;
                    }
                },1000)                
            })
            .catch(err=>{
                
            })
        },
        //确定
        Ascertain(){
            if(this.yanz==""&&this.IDcard==""){
              this.$toast({
                duration: 2000, 
                message: '请输入验证码和身份证号'
                });                
                return false;
            }   
           let info = JSON.parse(sessionStorage.getItem("info"));
            let time = parseInt(new Date().getTime()/1000);
            console.log(time);
            let params = {
                user_id: info.user_id,
                type: 11,
                code: this.yanz,
                appid: info.appid,
                ssid: info.ssid,
                time: time
            }
          this.$http.post(this.$url+"/rongtuojinrong/certificate/commonAuth/auth.json",qs.stringify(params)).then(res=>{
          if(res.data.status == 1){
           Dialog.alert({
             //message:res.data.msg,
            message: '您输入的短信验证码不正确或已失效，请重新输入。',
            width: "2.7rem",
            }).then(() => {
            });
            
         return false;                    
        }

             let params2 = {
                    user_id: info.user_id,
                    realname: this.name,  
                    Id_number: this.IDcard,
                    appid: info.appid,
                    ssid: info.ssid,
                    time: time
                }
             this.$http.post(this.$url+"/partner/closeAccount/verifyConsistent.json",qs.stringify(params2))
                .then(res=>{
                    if(res.data.status == "1"){
                        Dialog.alert({
                        message: res.data.msg,
                        width: "2.7rem"
                        }).then(() => {
                        // on close
                        });
                        return false;
                    }
                     try{
                        window.demo.shirenRenzheng();
                    }catch(e){

                    }

                    try{
                        shiRenRenZheng();
                    }catch(e){

                    }                
                })
                .catch(err=>{
                    
                }) 

        })

        }
    },
    created(){
        this.phone = this.$route.query.mobile;
    },   
}
</script>

<style lang="scss" scoped>
.photbox{
    font-size: 0.14rem;
    width: 100%;
    height: 100%;
    .boxContent{
        .topCont{
            height: 0.09rem;
            background-color: #fafafa;
        }
        .midCont{
            .centerMid{
                margin: 0 0.11rem;
                .xuanx{
                    height: 0.41rem;
                    line-height: 0.41rem;
                    color: #333;
                    margin-top:0.2rem;
                    span{
                        display: inline-block;
                        //width: 0.75rem;
                        width:23%;                        
                    }
                    input{
                        border: none;
                       // width: 1.9rem;
                       width:77%;
                        background: #fafafa;
                        padding-left:0.13rem;
                    }
                }
                
      
                .duanx{
                    position: relative;                    
                    .btnHuo{
                        font-size: 0.1rem;
                        position: absolute;
                        top: 0;
                        right: 0;   
                        display: flex;
                        align-items: center;
                        height: 0.31rem;                     
                        .btnduanx{                           
                            width: 0.97rem;
                            height: 0.31rem;
                            line-height: 0.31rem;
                            text-align: center;
                            border-radius: 0.02rem;
                            background: #fb5a5c;
                            color:#fff;
                            font-size: 0.12rem;
                            .sign{
                                width: auto;
                                color: #0159d5;
                            }
                        }
                    }
                    .backNo{background: none;width:49%;}
                }
               .newdus{height: 0.31rem;line-height:0.31rem;}
               .newhight{line-height:0.31rem;}
            }
        }
        .botCont{
            width: 100%;
            position: absolute;
            bottom: 0.55rem;
            display: flex;
            justify-content: center;            
            .define{
                width: 3.25rem;
                height: 0.39rem;
                line-height: 0.425rem;
                text-align: center;
                background-color: #fb5a5c;
                color: #fff;
                border-radius: 0.2rem;
            }
        }
    }
    .tcont{
        width: 2.45rem;
        height: auto;
        font-size: 0.12rem;
        .contop{
            width: 0.56rem;
            margin: 0.24rem auto 0.075rem;
            img{
                max-width: 100%;
                height: auto;
            }
        }
        .contop1{
            text-align: center;
            font-size: 0.15rem;
            color: #333;
        }
        .conmid{
            border-bottom: 1px solid #eee;
            .conmid1{
                padding: 0.18rem 0.21rem 0.3rem;
            }
        }
        .conbot{
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            font-size: 0.15rem;
            color: #0099e9;
        }
    }
    .van-dialog__message{font-size: 0.15rem;}
}
</style>