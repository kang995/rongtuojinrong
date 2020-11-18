<template>
    <div class="findBox">
        <!-- 头部 -->
        <!-- <div class="back">
            <img src="../../assets/img61.png" alt="" @click="goback">
            <p>找回密码</p>
        </div> -->
        <headerBox title='找回密码'></headerBox>
        <!-- 内容 -->
        <div class="contentBox">
            <input v-model="clear_input" @input="changeShow,changeInput" @blur="change" @focus="nav" type="number" placeholder="手机号">
            <p>输入已绑定的手机号，通过验证后可找回密码</p>
            <input @click="commitData"  type="submit" value="下一步"/>
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
            clear_input:'',//手机号
            tel:'',//存储验证码接口数据
            Show:false,//控制删除图片
        }
    },
    methods:{
        commitData(){
            if(this.clear_input==''){
                Toast({
                    message: '请输入手机号',
                    position: 'middle',
                    duration: 1500
                });
            }else if(!/^1[3456789]\d{9}$/.test(this.clear_input)){
                Toast({
                    message: '参数错误',
                    position: 'middle',
                    duration: 1500
                });
            }else{
                //输入手机号正确时请求发送验证码接口（找回密码）
                this.$post('/rongtuojinrong/certificate/commonAuth/send.json',{
                    mobile:this.clear_input,
                    type:6//找回密码--短信发送验证码通用接口(非注册)
                }).then(res=>{
                    // this.tel = res.data.data;
                    console.log(res.data)
                    if(res.data.status==1){//该用户不存在
                        Toast({
                            message:res.data.msg,
                            position: 'middle',
                            duration: 1500
                        });
                    }else if(res.data.status==0){//发送成功
                        Toast({
                            message:res.data.data,
                            position: 'middle',
                            duration: 1500
                        });
                        setTimeout(()=>{
                            this.$router.push({
                                path:'/findPasswordNote',
                                query:{tel:this.clear_input}
                            })
                        },1500)
                    }
                })
            }
        },
        goback(){
            this.$router.go(-1)
        },
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
    },
}
</script>

<style lang="scss" scoped>
   html,body{
       width:100%;
       height:100%;
        .findBox{
            width:100%;
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
                padding:0 0.3rem 0 0.24rem;
                position: relative;
                input:nth-of-type(1){
                    width:100%;
                    height:0.42rem;
                    border-radius:0.21rem;
                    border:none;
                    margin:0.73rem 0 0.25rem 0;
                    text-indent:0.45rem;
                    box-shadow: 0 0 5px cornflowerblue;
                    background:url(../../assets/img103.png) no-repeat 0.05rem 0.075rem;
                    background-size:8%;
                    // background-position-y: 0.05rem;
                }
                p{
                    font-size:0.13rem;
                    color:#333;
                    width:100%;
                    text-align:center;
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
                    margin-top:0.35rem;
                }
                img{
                    width:0.13rem;
                    height:0.12rem;
                    position: absolute;
                    top:0.88rem;
                    right:0.4rem;
                }
            }
        }
   }
</style>