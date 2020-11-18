<template>
    <div class="getCodeBox">
        <headerBox router='code'></headerBox>
        <!-- 内容 -->
        <div class="contentBox">
            <div class="content">
                <h2>欢迎登录</h2>
                <div class="spanBox">
                    <span>验证码已发送至</span>
                    <span>+86</span>
                    <span>{{tel}}</span>
                </div>
                <!-- input输入框,$event可以传入代表选中的值-->
                <!-- <div class="ys-verification">
                    <div class="input-wrapper" v-for="item in amount" :key="item">
                        <input type="text"  @paste="handlePaste" title="code" v-focus="(item - 1) === currentIndex" maxlength="1" @input="handleInput($event,(item-1))" 
                        @keyup.delete="onDelete($event,(item-1))"  v-model="code[item-1]">
                    </div>
                </div> -->
                <!-- 密码输入框 -->
                <van-password-input
                    :value="value"
                    :mask="false"
                    :gutter="15"
                    :length="6"
                    :focused="showKeyboard"
                    @focus="showKeyboard = true"
                />
                <!-- 数字键盘 -->
                <van-number-keyboard
                    :show="showKeyboard"
                    @input="onInput"
                    @delete="onDelete"
                    @blur="showKeyboard = false"
                />
                <!-- 发送验证码 -->
                <div class="mintBox">
                    <div v-if="disabled">
                        <span>{{count}}</span>
                        <p>{{btnTitle}}</p>
                    </div>
                    <i v-else @click="request">{{btnTitle}}</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import HeaderBox from '@/components/header'
import { Toast } from 'mint-ui';//轻提示
export default {
    // components:{
    //     HeaderBox
    // },
    data(){
        return {
            code:[],
            currentIndex: 0,
            tel:this.$route.query.tel,//上一页面传来的手机号
            redirect:'',//存储来源路由
            // 倒计时数据
            count:60,
            disabled:false,
            btnTitle:'秒后重新获取验证码',
            // vant组件，密码输入框、数字键盘数据
            value: '',
            showKeyboard: true
        }
     },
    methods: {
        //1.vant插件方法--Input事件
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
            // 字符串最后一个值进行验证-请求接口
            if(this.value.length>=6){
               this.$post('/rongtuojinrong/smsLogin.json',{
                    tel:this.tel,//手机号
                    code:this.value//输入的值
                }).then(res=>{
                    // console.log(res.data.data);
                    if(res.data.status==0){//登录成功
                        this.$store.dispatch('changeToken',res.data.data);
                        Toast({
                            message: '登录成功!',
                            iconClass: 'fa fa-check fa-lg',
                            position: 'middle',
                            duration: 1500,
                        });
                        // 调用用户信息接口方法
                        let _this = this;
                        _this.receiveUserInfo();
                        // 判断跳转后页面（有来源页面跳转来源页面；没有跳转首页）
                        setTimeout(()=>{
                            if(this.redirect){
                                this.$router.replace({path:this.redirect})
                            }else{
                                this.$router.replace({path:'/home'})
                            }
                        },1500)
                    }else if(res.data.status == 1){//登录失败
                        Toast({
                            message:'验证码错误!',//res.data.msg
                            iconClass: 'fa fa-times fa-lg',
                            position: 'middle',
                            duration: 2000,
                        });
                    }   
                }).catch(err => {
                  console.log(err)
                })
            }
        },
        //2.vant插件方法--Delete事件
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        //3.60秒倒计时方法
        validateBtn(){
            let time = 60;
            this.count = time;//重新赋值
            this.disabled = true;
            this.btnTitle ='秒后重新获取验证码';
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
        // 4.点击重新获取验证码按钮时重新发送验证码
        request(){
            this.validateBtn()//再次执行倒计时方法
            this.$post('/rongtuojinrong/certificate/commonAuth/send.json',{
                mobile:this.tel,
                type:9//短信登录--短信发送验证码通用接口(非注册)
            }).then(res=>{
                // console.log(res.data.data);
            })
        },
        // 5.定义请求用户信息接口方法
        receiveUserInfo(){
            this.$post('/rongtuojinrong/userCenter/accountInformation/userInformation.json').then(res=>{
                // console.log(res.data.data)
                this.$store.dispatch('changeInvite',res.data.data);
                //判断接口请求中defidenshuxing的值
                //未实名
                if(this.$store.state.login.token.is_identify==0){
                    console.log(0);
                    this.$store.dispatch('changeDefidenshuxing',0);
                //已实名    
                }else{  
                    //出借个人          
                    if(res.data.data.primary_role==0){
                        //借款个人 
                        if(res.data.data.personal_type==1){
                            console.log(2);
                            this.$store.dispatch('changeDefidenshuxing',2);
                        //出借个人    
                        }else{
                            // console.log(1);
                            this.$store.dispatch('changeDefidenshuxing',1);
                        }
                    }
                    //借款企业
                    if(res.data.data.primary_role==1){
                        console.log(2);
                        this.$store.dispatch('changeDefidenshuxing',2);
                    }
                    //担保企业
                    if(res.data.data.primary_role==2){
                        console.log(4);
                        this.$store.dispatch('changeDefidenshuxing',4);
                    }
                }
            })
        },
        // props: {
        //     amount: {
        //         type: Number,
        //         default: 6
        //     }
        // },
        // // 自定义指令实现自动换焦
        // directives: {
        //     focus: {
        //         componentUpdated: function (el, obj) {
        //             // console.log(obj)
        //             obj.value && el.focus()
        //         }
        //     }
        // },
        //3.以下为输入框方法
        //给Input绑定一个input事件，输入一位数字之后就让currentIndex + 1
        // handleInput (e, index) {
        //     this.currentIndex = index;
        //     // e.target.value = this.validateNumber(e.target.value);
        //     this.code[index] =  this.validateNumber(e.target.value);
        //     this.code[index] !== '' && ++this.currentIndex;
        //     !this.code.includes('') && this.$emit('onCompleted', this.code.join(''))//includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。
        //     //请求校验验证码接口（验证码登录）
        //     if(index==5 && !this.code.includes('')){//下标为5且code数组中不包含空字符串
        //         this.$post('/rongtuojinrong/smsLogin.json',{
        //             tel:this.tel,
        //             code:this.code.join('')//调用join方法将code数组拼接成字符串（返回值拼接好的字符串，原数组不改变）
        //         }).then(res=>{
        //             // console.log(res.data.data);
        //             this.$store.dispatch('changeToken',res.data.data)
        //             if(res.data.status==0){//登录成功
        //                 Toast({
        //                     message: '登录成功!',
        //                     iconClass: 'fa fa-check fa-lg',
        //                     position: 'middle',
        //                     duration: 1500,
        //                 });
        //                 // 调用用户信息接口方法
        //                 let _this = this;
        //                 _this.receiveUserInfo();
        //                 // 判断跳转后页面（有来源页面跳转来源页面；没有跳转首页）
        //                 setTimeout(()=>{
        //                     if(this.redirect){
        //                         this.$router.replace({path:this.redirect})
        //                     }else{
        //                         this.$router.replace({path:'/home'})
        //                     }
        //                 },1500)
        //             }else if(res.data.status == 1){//登录失败
        //                 Toast({
        //                     message:'验证码错误!',//res.data.msg
        //                     iconClass: 'fa fa-times fa-lg',
        //                     position: 'middle',
        //                     duration: 2000,
        //                 });
        //             }   
        //         }).catch(err => {
        //           console.log(err)
        //         })
        //         // console.log(this.code.includes(''))
        //     }
        // },
        
        // 删除方法
        // onDelete (e, index) {
        //     if (e.target.value === '') {
        //         this.currentIndex = index - 1
        //     }
        // },
        // 校验非数字
        // validateNumber (val) {
        //     // var a = /\D/g;
        //     // console.log(a.test(val),typeof(val));
        //     return val.replace(/\D/g, '');  //将所用的非数字用''替换
        // },
        // // 粘贴方法
        // handlePaste (e) {
        //     e.preventDefault()
        // },
    },
    created(){
        // this.code = new Array(this.amount).fill('');//fill() 方法用于将一个固定值替换数组的元素。
        this.validateBtn();
        this.redirect = this.$route.query.redirect;//接受路由拦截传来的参数redirect(来源路由)
    }

}
</script>

<style lang="scss" scoped>
.contentBox{
    width:100%;
    .content{
        width:100%;
        padding:0 0.3rem;
        margin-top:0.5rem;
        h2{
            width:100%;
            height:0.78rem;
            line-height:0.78rem;
            font-size:0.3rem;
            color:#323232;;
        }
        .spanBox{
            width:100%;
            margin-bottom:0.4rem;
            span:nth-child(1){
                font-size:0.13rem;
                color:#747474;
                margin-right:0.2rem;
            }
            span:nth-child(2){
                font-size:0.13rem;
                color:#747474;
                margin-right:0.05rem;
            }
            span:nth-child(3){
                font-size:0.13rem;
                color:#747474;
                margin-right:0.05rem;
            }
        }
    // vant组件样式-密码输入框
    .van-password-input{
        margin:0;
        li{
            border-bottom:1px solid #504b4b6b;
            font-size: 24px;
        }
    }
    // //自定义样式-密码输入框
    // .ys-verification{
    //     width:100%;
    //     display: flex;
    //     justify-content: space-around;
    //     margin-bottom:0.26rem;
    //     .input-wrapper{
    //         border-bottom: 1px solid #D6D6D6;
    //         width: 15%;
    //         height: 0;
    //         padding-bottom:20%;
    //         position: relative;
    //         input{
    //             position: absolute;
    //             width: 100%;
    //             height: 100%;
    //             text-align: center;
    //             // transition: all 0.3s;
    //             font-size:0.28rem;
    //             color: #333333;
    //             border:none;
    //         }
    //     }
    //     input:focus{//选择获得焦点的输入字段，并设置其样式
    //         border-bottom: 1px solid #3b56cf;
    //         border:none;
    //     }
    // }
    // 发送验证码样式
    .mintBox{
        width:100%;
        height:0.16rem;
        margin-top:0.25rem;
            span{
                float:left;
                line-height:0.16rem;
                color:#1a4cbb;
                font-size:0.12rem;  
                margin-right:0.07rem;
                margin-top:0.03rem;              
            }
            p{
                float:left;
                line-height:0.16rem;
                font-size:0.14rem;
                color:#646464;
                margin-top:0.03rem;   
            }
            
            i{
                display:block;
                margin-left:0.12rem; 
                color:#3b56cf;
                font-size:0.14rem;
            }
        }
    }
}
</style>