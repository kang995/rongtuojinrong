<template>
    <div class="findPasswordNote">
         <!-- 头部 -->
        <!-- <div class="back">
            <img src="../../assets/img61.png" alt="" @click="goback">
            <p>找回密码</p>
        </div> -->
        <headerBox title='找回密码'></headerBox>
        <div class="contentBox">
            <p>验证码已下发，请注意查收短信</p>
            <input v-model="clear_input"  @input="changeShow,changeInput" @blur="change" @focus="nav" type="number" placeholder="验证码">
            <!-- 发送验证码按钮--不可点击的 -->
            <span v-if="disabled">{{btnTitle}}({{count}}s)</span>
            <!-- 发送验证码按钮--可点击的 -->
            <i v-else  @click="commit">{{btnTitle}}</i>
            <input @click="commitData" type="submit" value="下一步"/>
            <img @click="clearInput" v-show="Show" src="../../assets/delect_03.jpg" alt=""> 
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';//轻提示
// import HeaderBox from '@/components/header'
export default {
    // components:{
    //     HeaderBox
    // },
    computed:{
        changeInput(){
           if(this.clear_input){
               this.Show = true;
           }else{
               this.Show = false;
           }
        },
    },
    data(){
        return{
            clear_input:'',//验证码
            Show:false,//控制删除图片
            tel:this.$route.query.tel,//接收上个页面传来的手机号
            // 倒计时数据
            count:60,
            disabled:false,
            btnTitle:'重新获取验证码',
        }
    },
    created(){
        this.validateBtn();//初始化时执行倒计时
    },
    methods:{
        // 1.校验验证码(点击下一步时触发)
        commitData(){
            if(this.clear_input==''){
                Toast({
                    message: '请输入验证码',
                    position: 'middle',
                    duration: 1500
                });
            }else if(!/^\d{6}$/.test(this.clear_input)){
                Toast({
                    message: '验证码错误',
                    position: 'middle',
                    duration: 1500
                });
            }else{
                //请求校验验证码接口（找回密码）
                this.$post('/rongtuojinrong/certificate/commonAuth/auth.json',{
                    mobile:this.tel,
                    code:this.clear_input,
                    type:6//找回密码--短信验证码校验通用接口(非注册)
                }).then(res=>{
                    console.log(res.data)
                    // 对返回值验证码进行校验
                    if(res.data.status==1){//验证码校验失败时给予提示信息
                        Toast({
                            message: '验证码错误!',//res.data.msg
                            position: 'middle',
                            duration: 1500
                        });
                    }else if(res.data.status==0){//验证码校验成功时跳转下一页
                        this.$router.push({path:'/findPasswordFinish',query:{tel:this.tel}})
                    }
                })
            }
        },
        // 2.重新请求发送验证码接口并执行倒计时方法（点击重新获取验证码按钮时触发）
        commit(){
            this.validateBtn()//再次执行倒计时方法
            this.$post('/rongtuojinrong/certificate/commonAuth/send.json',{
              mobile:this.tel,
              type:6
            }).then(res=>{
                console.log(res.data.data)
            })
        },
        //3.60秒倒计时方法（初始化时触发）
        validateBtn(){
            let time = 60;
            this.count = time;//重新赋值
            this.disabled = true;
            this.btnTitle ='重新获取验证码';
            let timer = setInterval(() => {
            time --;
            if(time == 0) {
                clearInterval(timer);
                this.disabled = false;
                this.btnTitle = "重新获取验证码";
            }else{
                    this.count = time;//赋值
                }
            },1000)
        },
        // goback(){
        //     this.$router.go(-1)
        // },
         //1.清空输入框内容
        clearInput(){  
            this.clear_input = '';
            this.Show = false;
        },
        // 2.input事件删除按钮显示
        changeShow(){
            this.Show = true;
        },
        //3.blur事件
        change(){
            setTimeout(()=>{
                this.Show = false;
            },0)
        },
         //4.focuss事件
        nav(){
            if(this.clear_input){
                this.Show = true;
            }else{
                this.Show = false;
            }
        },
    }  
}
</script>

<style lang="scss" scoped>
    html,body{
        width:100%;
        height:100%;
        .back{
            width: 100%;
            height:0.5rem;
            display:flex;
            justify-content:center;
            position: relative;
            border-bottom:1px solid #ddd;
            padding:0 0.1rem;
            img{
                line-height:0.5rem;
                width:0.08rem;
                height:0.12rem;
                position:absolute;
                left:0;
                top:0.18rem;
                margin-left:0.13rem;
            }
            p{
                line-height:0.5rem;
                font-size: 0.15rem;
                color: #404040;
            }
        }
        .contentBox{
            width:100%;
            padding:0 0.28rem 0 0.22rem; 
            position: relative;
            p{
                font-size:0.13rem;
                color:#333;
                margin-top:0.6rem;
                margin-bottom:0.08rem;
            }
            input:nth-of-type(1){
                border:none;
                width:100%;
                height:0.42rem;
                text-indent:0.45rem;
                border-radius:0.21rem;
                box-shadow: 0 0 5px cornflowerblue;
                background:url(../../assets/person_06.jpg) no-repeat 0.12rem 0.12rem;
                background-size:4.5%;
                margin-left:0.07rem;
            }
            span{
                display:block;
                width:100%;
                text-align:right;
                font-size:0.12rem;
                color:#0359d4;
                margin-top:0.3rem;
            }
            i{
                display:block;
                font-size:0.12rem;
                color:#0359d4;
                margin-top:0.3rem;
                padding-right:0.205rem;
                text-align:right;
            }
            input:nth-of-type(2){
                width:100%;
                height:0.42rem;
                background:#0359d4;
                font-size:0.15rem;
                color:#fff;
                border-radius:0.21rem;
                border:none;
                text-align:center;
                line-height:0.42rem;
                margin-top:0.5rem;
            }
            img{
                width:0.13rem;
                height:0.12rem;
                position: absolute;
                top:0.42rem;
                right:0.32rem; 
            }
        }
    }
</style>
