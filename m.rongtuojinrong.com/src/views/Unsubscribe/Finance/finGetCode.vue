<template>
    <div class="finGetCodeBox">
        <form :action="action" ref="text_form" method="post" target="tiao"  v-if="isShow1">
            <!-- <headerBox title="手机号验证"></headerBox> -->
            <div class="bgcolor"></div>
            <div class="finGetCode">
                <div class="inphoneBox">
                    <span>手机号</span>
                    <input type="text" v-model="iphone" placeholder="请输入手机号">
                </div>
                <div class="codeBox">
                    <span>短信验证码</span>
                    <input type="text" v-model="code" placeholder="请输入验证码">
                    <!-- 获取验证码按钮 -->
                    <p @click="getCode" v-if="disabled">{{btnTitle}}</p>
                    <div v-else class="coding">
                        <i >{{btnTitle}}</i>
                        <i>({{count}}s)</i>
                    </div>
                </div>
                <div v-show="isShow" class="errorCode">验证码错误!</div>
                <div :class="{inputBtn:true,'active':(isShow ? true:false)}" @click="commitData">确定</div>
                <!-- <div :class="[inputBtn,(isShow ? 'active':'')]" @click="commitData">确定</div> -->
            </div>
            <input type="hidden" name="appid" :value="appid">
            <input type="hidden" name="ssid"  :value="ssid">
            <input type="hidden" name="user_id" :value="user_id">
            <input type="hidden" name="time" :value="time">
            <input type="hidden" name="result" :value="result">
        </form>
        <!-- 验证成功展示iframe标签的内容 -->
        <iframe class="iframeBox" src="" name="tiao" frameborder="0" v-show="!isShow1"></iframe>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';//轻提示
import qs from 'qs';
export default {
    data(){
        return{
            result:1,
            appid:'app_h5',
            user_id:'',//user_id
            ssid:'',//ssid_id
            time:parseInt(new Date().getTime()/1000),
            iphone:this.$route.query.mobile,//手机号
            code:'',//验证码 
            isShow:false,//控制验证码错误提示信息显示与隐藏
            isShow1:true,//控制Dom结构显示与隐藏
            // 倒计时数据
            count:60,
            disabled:true,
            btnTitle:'获取验证码',
            action:this.$url+'/rongtuojinrong/closeAccount/result.json'
        }
    },
    created(){
        var info = JSON.parse(sessionStorage.getItem("info"));
        this.user_id = info.user_id;
        this.ssid = info.ssid;

    },
    methods:{
        //1.60秒倒计时方法
          validateBtn(){
            let time = 60;
            let timer = setInterval(() => {
            if(time == 0) {
                clearInterval(timer);
                this.disabled = true;
                this.btnTitle = "获取验证码";
            } else {
                this.count = time;//赋值
                this.disabled = false;
                this.btnTitle ='重新获取';
                time --;
                }
            },1000)
        },
        //2.点击发送验证码按钮发送验证码
        getCode(){
            this.validateBtn();//执行倒计时方法
            let postData = qs.stringify({
                //  mobile:13964035142,//手机号
                appid:'app_h5',
                ssid:this.ssid,
                user_id:this.user_id,//user_id
                type:10,//短信注销金融
                time:this.time
            })
            // 发送请求--获取验证码
            this.$http.post(this.$url+'/rongtuojinrong/certificate/commonAuth/send.json',postData).then(res=>{
                console.log(res.data)
            })
        },
        //3.点击提交按钮进行短信验证码校验
        commitData(){
            if (this.code == ''){//验证码不能为空
                Toast("验证码不能为空")
            }else{
                let postData = qs.stringify({
                    code:this.code,//短信验证码
                    user_id:this.user_id,//user_id
                    ssid:this.ssid,
                    appid:'app_h5',
                    type:10,
                    time:this.time
                })
                // 发送请求--短信校验
                this.$http.post(this.$url+'/rongtuojinrong/certificate/commonAuth/auth.json',postData).then(res=>{
                   console.log(res.data)
                    if(res.data.status==0){//短信验证成功--请求接口跳转页面
                        this.isShow = false;//关闭验证码错误提示
                        this.isShow1 = false;//显示对应的Dom结构
                        // 请求成功后提交form表单数据
                        var form = this.$refs.text_form;
                        form.submit();
                    }else if(res.data.status==1){//短信验证失败
                        this.isShow = true;//显示验证码错误提示
                   }
               })
            }
        }
        
    }
}
</script>

<style lang='scss'>
#app{
    width:100%;
    height:100%;
    .finGetCodeBox{
        width:100%;
        height:100%;
        .bgcolor{
            width:100%;
            height:0.09rem;
            background:#fafafa;
            // margin-top:0.5rem;
        }
    .finGetCode{
            width:100%;
            height:100%;
            padding:0 0.45rem;
            .inphoneBox{
                width:100%;
                height:0.53rem;
                line-height:0.53rem;
                overflow: hidden;
                display:flex;
                align-items:center;
                border-bottom:1px solid #ebeaea;
                span{
                    // display:block;
                    // width:0.95rem;
                    color:#0c0c0c;
                    font-size:0.13rem;
                    white-space:nowrap;
                    padding-right:0.48rem;
                }
                input{
                    // width:100%;
                    border:none;
                }
            }
            .codeBox{
                height:0.53rem;
                // line-height:0.53rem;
                overflow: hidden;
                display:flex;
                flex:1;
                align-items:center;
                border-bottom:1px solid #ebeaea;
                position:relative;
                span{
                    // display:block;
                    // width:0.95rem;
                    color:#0c0c0c;
                    font-size:0.13rem;
                    white-space:nowrap;
                    padding-right:0.2rem;
                }
                input{
                    width:1rem;
                    // width:calc(100% - 170px);
                    border:none;
                }
                p{
                    width:0.95rem;
                    height:0.30rem;
                    line-height:0.30rem;
                    text-align:center;
                    // display:flex;
                    // justify-content:center;
                    // align-items: center;
                    font-size:0.12rem;
                    color:#0159d5;
                    white-space:nowrap;
                    border-radius:0.14rem;
                    border:1px solid #0159d5;
                    position: absolute;
                    right:0;
                }
                .coding{
                    width:0.95rem;
                    height:0.30rem;
                    display:flex;
                    justify-content:center;
                    align-items: center;
                    font-size:0.1rem;
                    white-space:nowrap;
                    border-radius:0.14rem;
                    border:1px solid #0159d5;
                    i:first-child{
                        color:#0c0c0c;
                    }
                    i:last-child{
                        color:#0159d5;
                    }
                }
            }
            .errorCode{
                color:#f66f41;
                font-size:0.12rem;
                letter-spacing: 2px;
                margin-top:0.13rem;
            }
            .inputBtn{
                // display:block;
                position:fixed;
                bottom:0.6rem;
                left:auto;
                width:2.86rem;
                height:0.44rem;
                line-height:0.44rem;
                text-align:center;
                // margin-top:3.9rem;
                background:#0159d5;
                border-radius:0.22rem;
                border:none;
                color:#fff;
                font-size:0.15rem;
            }
             //验证码错误提示出现时改变margin-top值，使确定按钮保持原先位置
            .active{
                margin-top:3.61rem;
            }
        }
    }
    .iframeBox{
        width:100%;
        height:100%;
    }
}
</style>