<template>  
  <div class="codebox">
    <div class="boxContent">
        <div class="topCont"></div>
        <div class="midCont">
            <div class="centerMid">
                <div class="xuanx">
                   <span>姓名</span><input placeholder="请输入姓名" v-model="name">
                </div>

                <div class="xuanx">
                   <span>身份证号</span><input placeholder="请输入身份证号" v-model="IDcard">
                </div>

                <div class="xuanx">
                   <span>手机号</span><input readonly :value="phone" >
                </div>

                <div class="xuanx duanx">
                   <span class="duanxs">短信验证码</span><input class="tddx" placeholder="请输入短信验证码" v-model="yanz" >
                   <div class="btnHuo">
                    <div class="btnduanx" v-if="isShow" @click="huoQ">
                        {{btnval}}
                    </div>
                    <div class="btnduanx" v-else>{{btnval}}  <span class="sign">({{count}}S)</span>   </div>
                   </div>

                </div>                                                
            </div>
        </div>
        <div class="botCont" @click="queD">
            <div class="define">确定</div>
        </div>
    </div>
    <!-- 提交申请 -->
    <!-- <van-popup round v-model="showts">
    <div class="tcont">
        <div class="contop">
            <img src="@/assets/zhux_001.png" alt="sucess">
        </div>
        <div class="contop1">
        您的注销申请已提交
        </div>
        <div class="conmid">
        <div class="conmid1">三个工作日内将为您注销账号，注销账号成功后，您将无法通过本账号登录融托金融。</div>
        </div>          
        <div class="conbot">
        确定
        </div>
    </div>
    </van-popup>         -->

  </div>
</template>

<script>
import qs from	'qs'
export default {
    data(){
        return{
            isShow: true,
            btnval: '获取验证码',
            count: 60,
            showts: false,
            name: '',
            IDcard: '',
            yanz: '',
            user_id: '',
            phone: '',
        }
    },
    created(){
        this.phone = this.$route.query.mobile;
    },
    methods:{       
        queD(){

            //验证姓名和身份证号
            if(this.name==''&&this.IDcard==''){
                this.$toast({
                duration: 2000, 
                message: '请输入姓名和身份证号'
                });                
                return false;
            };

            if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.IDcard)){
                this.$toast({
                    duration: 2000, 
                    message: '请输入正确的身份证号格式'
                }); 
                return false;
            }            


            let info = JSON.parse(sessionStorage.getItem("info"));
            let time = parseInt(new Date().getTime()/1000);
            let params = {
                user_id: info.user_id,
                type: 10,
                code: this.yanz,
                appid: info.appid,
                ssid: info.ssid,
                time: time
            }
            this.$http.post(this.$url+"/rongtuojinrong/certificate/commonAuth/auth.json",qs.stringify(params))
            .then(res=>{

                if(res.data.status == 1){
                        this.$toast({
                        duration: 2000, 
                        message: '验证码不正确，请重新获取'
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
                this.$http.post(this.$url+"/rongtuojinrong/closeAccount/verifyConsistent.json",qs.stringify(params2))
                .then(res=>{

                    if(res.data.status == "1"){
                        this.$toast({
                        duration: 2000, 
                        message: res.data.msg
                        });
                        return false;
                    }



                    try{
                        window.demo.shirenRenzheng();
                    }catch(e){

                    }

                    try{
                        parent.testobject.shiRenRenZheng();
                    }catch(e){

                    }                
                })
                .catch(err=>{
                    
                })               
            })
            .catch(err=>{
                
            })  


           
        },
        huoQ(){          

            let info = JSON.parse(sessionStorage.getItem("info"));
            let time = parseInt(new Date().getTime()/1000);
            let params1 = {
                user_id: info.user_id,
                type: 10,
                appid: info.appid,
                ssid: info.ssid,
                time: time
            };
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
        }
    }
    
}
</script>

<style lang="scss" scoped>
.codebox{
    font-size: 0.12rem;  
    .boxContent{
        .topCont{
            height: 0.09rem;
            background-color: #fafafa;
        }
        .midCont{
            .centerMid{
                margin: 0 0.45rem;
                .xuanx{
                    height: 0.56rem;
                    line-height: 0.55rem;
                    color: #333;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    align-items: center;
                    span{
                        display: inline-block;
                        width: 0.94rem;                        
                    }
                    input{
                        border: none;
                        width: 1.9rem;
                        height: 0.3rem;
                        line-height: 0.3rem;
                    }
                }
                

                .duanx{
                    position: relative;     
                    .tddx{
                        width: 1rem;
                    }
                    .btnHuo{
                        font-size: 0.1rem;
                        position: absolute;
                        top: 0;
                        right: 0;   
                        display: flex;
                        align-items: center;
                        height: 0.56rem;                     
                        .btnduanx{                     
                            width: 0.85rem;
                            height: 0.28rem;
                            line-height: 0.28rem;
                            text-align: center;
                            border-radius: 0.2rem;
                            border: 1px solid #0159d5;
                            .sign{
                                width: auto;
                                color: #0159d5;
                            }
                        }
                    }
                }

            }
        }
        .botCont{
            width: 100%;
            position: absolute;
            bottom: 0.55rem;
            display: flex;
            justify-content: center;            
            .define{
                width: 2.85rem;
                height: 0.425rem;
                line-height: 0.425rem;
                text-align: center;
                background-color: #0159d5;
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
}
</style>