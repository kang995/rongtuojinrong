<template>
    <div class="registerBox">
        <!-- 头部 -->
        <!-- <div class="back">
            <img src="../../assets/img61.png" alt="" @click="goback">
            <p>注册</p>
        </div> -->
        <headerBox></headerBox>
        <div class="content_box">
            <!-- navBar导航条 -->
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">个人用户注册</mt-tab-item>
                <mt-tab-item id="2">企业用户注册</mt-tab-item>
            </mt-navbar>
            <!-- 个人用户注册内容区域-->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <ul class="content">
                        <li>
                            <img src="../../assets/person_03.jpg" alt="">
                            <input v-model="clear_input1" @input="changeShow1,changeInput1" @blur="change1" @focus="nav1" type="tel" placeholder="请输入手机号">
                            <span v-if="disabled"  @click="getIphone">{{btnTitle}}</span>
                            <i v-else>{{btnTitle}}({{count}})s</i>
                            <img @click="clearInput1" v-show="Show1"  src="../../assets/delect_03.jpg" alt=""> 
                        </li>
                        <li>
                            <img src="../../assets/person_06.jpg" alt="">
                            <input v-model="clear_input2" @input="changeShow2,changeInput2" @blur="change2" @focus="nav2" type="text" placeholder="请输入验证码">
                            <img @click="clearInput2" v-show="Show2" src="../../assets/delect_03.jpg" alt=""> 
                        </li>
                        <li>
                            <img src="../../assets/person_08.jpg" alt="">
                            <input v-model="clear_input3" @input="changeShow3,changeInput3" @blur="change3" @focus="nav3" type="text" placeholder="请设置登录密码（6位数字）">
                            <img @click="clearInput3" v-show="Show3"  src="../../assets/delect_03.jpg" alt=""> 
                        </li>
                        <li>
                            <img src="../../assets/person_08.jpg" alt="">
                            <input v-model="clear_input4" @input="changeShow4,changeInput4" @blur="change4" @focus="nav4" type="text" placeholder="请确认登录密码（6位数字）">
                            <img  @click="clearInput4" v-show="Show4" src="../../assets/delect_03.jpg" alt=""> 
                        </li>
                        <li>
                            <input type="submit" @click="commitData" ref="node" :class="{'active':showData}"  value="注册">
                        </li>
                    </ul>
                </mt-tab-container-item>
                <!-- 企业用户注册内容区域 -->
                <mt-tab-container-item id="2">
                     <ul class="content1">
                        <li>
                            <img src="../../assets/person_03.jpg" alt="">
                            <input v-model="clear_input5" @input="changeShow5,changeInput5" @blur="change5" @focus="nav5" type="text" placeholder="请输入用户名（6-20位字母或数字）">
                            <img @click="clearInput5" v-show="Show5" src="../../assets/delect_03.jpg" alt=""> 
                        </li>
                        <li>
                            <img src="../../assets/person_03.jpg" alt="">
                            <input v-model="clear_input6" @input="changeShow6,changeInput6" @blur="change6" @focus="nav6" type="tel" placeholder="请输入手机号">
                            <span v-if="disabled1" @click="getIphone1">{{btnTitle1}}</span> 
                            <i v-else>{{btnTitle1}}({{count1}})s</i>
                            <img @click="clearInput6" v-show="Show6" src="../../assets/delect_03.jpg" alt=""> 
                        </li>
                        <li>
                            <img src="../../assets/person_06.jpg" alt="">
                            <input v-model="clear_input7" @input="changeShow7,changeInput7" @blur="change7" @focus="nav7" type="text" placeholder="请输入验证码">
                            <img @click="clearInput7" v-show="Show7" src="../../assets/delect_03.jpg" alt=""> 
                        </li>
                        <li>
                            <img src="../../assets/person_08.jpg" alt="">
                            <input v-model="clear_input8" @input="changeShow8,changeInput8" @blur="change8" @focus="nav8" type="password" placeholder="请设置登录密码（6位数字）">
                            <img @click="clearInput8" v-show="Show8" src="../../assets/delect_03.jpg" alt=""> 
                        </li>
                        <li>
                            <img src="../../assets/person_08.jpg" alt="">
                            <input v-model="clear_input9" @input="changeShow9,changeInput9" @blur="change9" @focus="nav9" type="password" placeholder="请确认登录密码（6位数字）">
                            <img @click="clearInput9" v-show="Show9" src="../../assets/delect_03.jpg" alt=""> 
                        </li>
                        <li @click="actionSheet">
                            <p> {{isShow}}
                                <img src="../../assets/sanjiao_04.jpg" alt="">
                            </p>
                        </li>
                       <li>
                            <!-- <input type="checkbox" :checked="isChecked" @click="handleDisabled"> -->
                            <van-checkbox icon-size='16px' @click="changeCheckBox" v-model="checked" :disabled="Disabled"></van-checkbox>
                            <p>我已阅读并同意</p>
                            <router-link to="/protocol" tag="span">《融托金融用户服务协议》</router-link>
                        </li>
                        <li >
                            <input  type="submit" :disabled='isDisabled' @click="commitData1" :class="{'active1':showData1}" value="注册">
                        </li>
                        <mt-actionsheet
                            :actions="data"
                            v-model="sheetVisible">
                        </mt-actionsheet>
                        <!-- 一人有限公司 -->
                        <mt-actionsheet
                            :actions="data1"
                            v-model="sheetVisible1">
                        </mt-actionsheet>
                        <!-- 非法企业人 -->
                        <mt-actionsheet
                            :actions="data2"
                            v-model="sheetVisible2">
                        </mt-actionsheet>
                    </ul>
                </mt-tab-container-item>
            </mt-tab-container>
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
     data(){
        return{
            //复选框按钮--Vant组件
            checked: true,//绑定复选框的勾选状态
            Disabled:false,//通过设置disabled属性可以禁用复选框
            //input[type=submit]按钮--自定义组件
            isDisabled:false,//控制注册按钮禁用变量（企业用户）
            // isChecked:true,//控制复选框按钮默认选中变量（企业用户）
            showData:false,//个人用户控住注册按钮颜色
            showData1:false,//企业用户控住注册按钮颜色
            // 倒计时数据(个人用户注册)
            count:60,
            disabled:true,
            btnTitle:'获取验证码',
            code:'',//验证码数据
            submit:'',//个人用户注册数据
            // 倒计时数据(企业用户注册)
            count1:60,
            disabled1:true,
            btnTitle1:'获取验证码',
            code1:'',//验证码数据
            submit1:'',//企业用户注册数据
            // 个人用户注册数据
            clear_input1:'',
            clear_input2:'',
            clear_input3:'',
            clear_input4:'',
            Show1:'',
            Show2:'',
            Show3:'',
            Show4:'',
            // 企业用户注册数据
            clear_input5:'',
            clear_input6:'',
            clear_input7:'',
            clear_input8:'',
            clear_input9:'',
            Show5:'',
            Show6:'',
            Show7:'',
            Show8:'',
            Show9:'',
            //选择企业类型弹出框数据
            selected:'1',
            sheetVisible: false,
            sheetVisible1: false,
            sheetVisible2: false,
            isShow:'请选择企业类型',
            // 第一个面板数组
            data: [
            {
               name: '请选择企业类型',
               method : this.getCamera	// 调用methods中的函数
            },
            {
               name: '核心企业',
               method : this.getCamera	// 调用methods中的函数
            }, 
            {
               name: '一人有限责任公司',
               method : this.getCompany	// 调用methods中的函数
            }, 
            {
               name: '非法人企业',
               method : this.getPerson	// 调用methods中的函数
            }, 
            {
               name: '有限公司',
               method : this.getCamera	// 调用methods中的函数
            },  
            {
               name: '个体工商户', 
               method : this.getCamera // 调用methods中的函数
            }],
         // 一人有限公司面板数组
         data1: [
            {
               name: '请选择企业类型',
               method : this.getCamera	// 调用methods中的函数
            },
            {
               name: '自然人独资',
               method : this.getCamera	// 调用methods中的函数
            }, 
            {
               name: '法人独资',
               method : this.getCamera	// 调用methods中的函数
            }, 
           ],
        //  非法企业人面板数组 
            data2: [
            {
               name: '请选择企业类型',
               method : this.getCamera	// 调用methods中的函数
            },
            {
               name: '个人独资',
               method : this.getCamera	// 调用methods中的函数
            }, 
            {
               name: '合伙企业',
               method : this.getCamera	// 调用methods中的函数
            }, 
            {
               name: '企业分支机构或合作机构',
               method : this.getCamera	// 调用methods中的函数
            },
           ]
        }
    },
    computed:{
        changeInput1(){
           if(this.clear_input1){
                this.Show1 = true;
           }else{
                this.Show1 = false;
           }
        },
        changeInput2(){
           if(this.clear_input2){
               this.Show2 = true;
           }else{
               this.Show2 = false;
           }
        },
        changeInput3(){
           if(this.clear_input3){
               this.Show3 = true;
           }else{
               this.Show3 = false;
           }
        },
        changeInput4(){
           if(this.clear_input4){
               this.Show4 = true;
           }else{
               this.Show4 = false;
           }
        },
        changeInput5(){
           if(this.clear_input5){
               this.Show5 = true;
           }else{
               this.Show5 = false;
           }
        },
        changeInput6(){
           if(this.clear_input6){
               this.Show6 = true;
           }else{
               this.Show6 = false;
           }
        },
        changeInput7(){
           if(this.clear_input7){
               this.Show7 = true;
           }else{
               this.Show7 = false;
           }
        },
        changeInput8(){
           if(this.clear_input8){
               this.Show8 = true;
           }else{
               this.Show8 = false;
           }
        },
        changeInput9(){
           if(this.clear_input9){
               this.Show9 = true;
           }else{
               this.Show9 = false;
           }
        },
    },
    created(){
        // this.handleDisabled();//执行用户协议方法
    },
    methods:{
        // 同意用户协议进行表单验证及数据提交（Vant组件复选框按钮禁用或开启）
        changeCheckBox(){
            this.Disabled = !this.Disabled;
            if(this.Disabled==true){//复选框禁用
                this.isDisabled = true;//不可以进行表单验证及数据提交
                this.checked = false;//不被勾选状态
            }else{//复选框不被禁用--代表同意用户协议
                this.isDisabled = false;//可以进行表单验证及数据提交
                this.checked = true;//被勾选状态
            }
        },
        //复选按钮控制注册按钮禁用或选中
        // handleDisabled(){
        //     this.isChecked = !this.isChecked;
        //     if(this.isChecked==true){//同意用户服务协议
        //         this.isDisabled =  false;//可以进行表单验证及数据提交
        //     }else{
        //         this.isDisabled =  true;//不可以进行表单验证及数据提交
        //     }
        // },
        //60秒倒计时方法（个人用户注册）
        validateBtn(){
            let time = 60;
            let timer = setInterval(() => {
            if(time == 0) {
                clearInterval(timer);
                this.disabled = true;
                this.btnTitle = "重新获取";
            } else {
                this.count = time;//赋值
                this.disabled = false;
                this.btnTitle ='已发送';
                time --;
                }
            },1000)
        },
         //60秒倒计时方法（企业用户注册）
        validateBtn1(){
            let time = 60;
            let timer = setInterval(() => {
            if(time == 0) {
                clearInterval(timer);
                this.disabled1 = true;
                this.btnTitle1 = "重新获取";
            } else {
                this.count1 = time;//赋值
                this.disabled1 = false;
                this.btnTitle1 ='已发送';
                time --;
                }
            },1000)
        },
        //个人用户手机号发送验证码
        getIphone(){
            if(!/^1[3456789]\d{9}$/.test(this.clear_input1)) {
                Toast({
                    message: '请输入正确的手机号码!',
                    position: 'middle',
                    duration: 1500
                });
            }else{
                this.showData = true;
                this.validateBtn();//当手机号格式输入正确时执行倒计时方法
                // 请求接口
                this.$post('/rongtuojinrong/certificate/reg/personal/send.json',{
                    tel:this.clear_input1
                }).then(res=>{
                    this.code = res.data.data;
                    Toast({
                        message:this.code,
                        position: 'middle',
                        duration: 1500
                    });
                    console.log(this.code);
                })
            }  
        },
        //企业用户手机号发送验证码
        getIphone1(){
            if(!/^1[3456789]\d{9}$/.test(this.clear_input6)) {
                Toast({
                    message: '请输入正确的手机号码!',
                    position: 'middle',
                    duration: 1500
                });
            }else{
                this.showData1 = true;
                this.validateBtn1();//手机号正确执行倒计时方法
                //请求接口
                this.$post('/rongtuojinrong/certificate/reg/company/send.json',{
                    tel:this.clear_input6
                }).then(res=>{
                    this.code1 = res.data.data;
                    Toast({
                        message:this.code1,
                        position: 'middle',
                        duration: 1500
                    });
                    console.log(this.code1);
                })
            }
        },
        //个人用户提交注册数据
        commitData(){
            if(this.showData==true){
                if(this.clear_input2==''){
                    Toast({
                        message: '验证码不能为空!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(!/^\d{6}$/.test(this.clear_input2)){
                    Toast({
                        message: '验证码格式不正确!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(this.clear_input3==''){
                    Toast({
                        message: '请设置登录密码!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(!/^\d{6}$/.test(this.clear_input3)){
                    Toast({
                        message: '请输入6位密码!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(/^\d{6}$/.test(this.clear_input3) && this.clear_input4==''){
                    Toast({
                        message: '请再次确认登录密码!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(this.clear_input3!==this.clear_input4){
                    Toast({
                        message: '两次输入的密码不一致,请重新输入!',
                        position: 'middle',
                        duration: 1500
                    });
                }else{
                    //提交个人用户数据
                    this.$post('/rongtuojinrong/personReg.json',{
                        tel:this.clear_input1,//手机号
                        code:this.clear_input2,//验证码
                        password:this.clear_input3,//登录密码
                    }).then(res=>{
                        this.submit = res.data;
                        if(this.submit.status==1){//手机号已被注册或者验证码输入不正确
                            Toast({
                                message: this.submit.msg,
                                position: 'middle',
                                duration: 1500
                            });
                        }else if(this.submit.status==0){//注册成功
                            Toast({
                                message: '注册成功!',
                                position: 'middle',
                                duration: 1500
                            });
                            setTimeout(()=>{
                                this.$router.push({
                                    path:'/login',
                                    query:{distinguish:'code'}
                                })
                            },1500)
                        }
                        
                    })
                }
            }
        },
        //企业用户提交注册数据
        commitData1(){
            if(this.showData1==true){
                if(this.clear_input5==''){
                    Toast({
                        message: '用户名不能为空!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(!/^[0-9A-Za-z]{6,20}$/.test(this.clear_input5)){
                    Toast({
                        message: '用户名必须为6-20位字母或数字!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(this.clear_input7 == ''){
                    Toast({
                        message: '验证码不能为空!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(!/^\d{6}$/.test(this.clear_input7)){
                    Toast({
                        message: '验证码格式不正确!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(this.clear_input8==''){
                    Toast({
                        message: '请设置登录密码!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(!/^\d{6}$/.test(this.clear_input8)){
                    Toast({
                        message: '请输入6位密码!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(/^\d{6}$/.test(this.clear_input8) && this.clear_input9==''){
                    Toast({
                        message: '请再次确认登录密码!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(this.clear_input8!==this.clear_input9){
                    Toast({
                        message: '两次输入的密码不一致,请重新输入!',
                        position: 'middle',
                        duration: 1500
                    });
                }else if(this.isShow=="请选择企业类型"){
                    Toast({
                        message: '请选择企业类型',
                        position: 'middle',
                        duration: 1500
                    });
                }else{
                    //提交企业用户数据
                    this.$post('/rongtuojinrong/companyReg.json',{
                        username:this.clear_input5,//用户名
                        tel:this.clear_input6,//手机号
                        code:this.clear_input7,//验证码
                        password:this.clear_input8,//登录密码
                        company_type:this.isShow,//企业类型
                    }).then(res=>{
                        this.submit1 = res.data;
                        if(this.submit1.status==1){//手机号已被注册或者验证码输入不正确--异常提示
                            Toast({
                                message: this.submit1.msg,
                                position: 'middle',
                                duration: 1500
                            });
                        }else if(this.submit1.status==0){//注册成功
                            Toast({
                                message: '注册成功!',
                                position: 'middle',
                                duration: 1500
                            });
                            setTimeout(()=>{
                                this.$router.push({
                                    path:'/login',
                                    query:{distinguish:'code'}
                                })
                            },1500)
                        }
                    })
                }
            }
        },
        // 个人用户注册input输入框方法
        //1.清空输入框内容
        clearInput1(){  
            this.clear_input1 = '';
            this.Show1 = false;
        },
        clearInput2(){  
            this.clear_input2 = '';
            this.Show2 = false;
        },
        clearInput3(){  
            this.clear_input3 = '';
            this.Show3 = false;
        },
        clearInput4(){  
            this.clear_input4 = '';
            this.Show4 = false;
        },
        // 2.input事件删除按钮显示
        changeShow1(){
            this.Show1 = true;
        },
        changeShow2(){
            this.Show2 = true;
        },
        changeShow3(){
            this.Show3 = true;
        },
        changeShow4(){
            this.Show4 = true;
        },
         //3.blur事件
        change1(){
            setTimeout(()=>{
                this.Show1 = false;
            },0)
        },
        change2(){
            setTimeout(()=>{
                this.Show2 = false;
            },0)
        },
        change3(){
            setTimeout(()=>{
                this.Show3 = false;
            },0)
        },
         change4(){
            setTimeout(()=>{
                this.Show4 = false;
            },0)
        },
         //4.focuss事件
        nav1(){
            if(this.clear_input1){
                this.Show1 = true;
            }else{
                this.Show1 = false;
            }
        },
        nav2(){
            if(this.clear_input2){
                this.Show2 = true;
            }else{
                this.Show2 = false;
            }
        },
        nav3(){
            if(this.clear_input3){
                this.Show3 = true;
            }else{
                this.Show3 = false;
            }
        },
        nav4(){
            if(this.clear_input4){
                this.Show4 = true;
            }else{
                this.Show4 = false;
            }
        },
        // 企业用户注册input输入框方法
         //1.清空输入框内容
        clearInput5(){  
            this.clear_input5 = '';
            this.Show5 = false;
        },
        clearInput6(){  
            this.clear_input6 = '';
            this.Show6 = false;
        },
        clearInput7(){  
            this.clear_input7 = '';
            this.Show7 = false;
        },
        clearInput8(){  
            this.clear_input8 = '';
            this.Show8 = false;
        },
        clearInput9(){  
            this.clear_input9 = '';
            this.Show9 = false;
        },
         // 2.input事件删除按钮显示
        changeShow5(){
            this.Show5 = true;
        },
        changeShow6(){
            this.Show6 = true;
        },
        changeShow7(){
            this.Show7 = true;
        },
        changeShow8(){
            this.Show8 = true;
        },
        changeShow9(){
            this.Show9 = true;
        },
         //3.blur事件
        change5(){
            setTimeout(()=>{
                this.Show5 = false;
            },0)
        },
        change6(){
            setTimeout(()=>{
                this.Show6 = false;
            },0)
        },
        change7(){
            setTimeout(()=>{
                this.Show7 = false;
            },0)
        },
        change8(){
            setTimeout(()=>{
                this.Show8 = false;
            },0)
        },
        change9(){
            setTimeout(()=>{
                this.Show9 = false;
            },0)
        },
         //4.focuss事件
        nav5(){
            if(this.clear_input5){
                this.Show5 = true;
            }else{
                this.Show5 = false;
            }
        },
         nav6(){
            if(this.clear_input6){
                this.Show6 = true;
            }else{
                this.Show6 = false;
            }
        },
        nav7(){
            if(this.clear_input7){
                this.Show7 = true;
            }else{
                this.Show7 = false;
            }
        },
         nav8(){
            if(this.clear_input8){
                this.Show8 = true;
            }else{
                this.Show8 = false;
            }
        },
        nav9(){
            if(this.clear_input9){
                this.Show9 = true;
            }else{
                this.Show9 = false;
            }
        },
        goback(){
            this.$router.go(-1)
        },
         // 1.动态给Dom元素赋值方法
        getCamera: function(e){
          this.isShow = e.name;
        },
        // 2.控制第一个面板显示
        actionSheet: function(){
        	// 打开action sheet
          this.sheetVisible = true;
        },
        // 3.控制一人有限公司面板显示
        getCompany: function(e){
            var _this = this;
            setTimeout(function(){
                _this.sheetVisible1 = true;
            },200)
    //       console.log(e.name)
        },
        // 4.控制非法企业人面板显示
         getPerson: function(e){
            var _this = this;
            setTimeout(function(){
                _this.sheetVisible2 = true;
            },200)
    //       console.log(e.name)
        },
    },
}
</script>

<style lang="scss">
.registerBox{
    width:100%;
    overflow: hidden;
    // position:absolute;
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
    .content_box{
        width:100%;
        .mint-navbar{
            justify-content: space-around;
            .mint-tab-item{
                flex:none;
                width:0.85rem;
                color:#ababab;
                .mint-tab-item-label{
                    font-size:0.14rem;
                    white-space:nowrap;
                }
            }
            .is-selected{
                border-bottom: 2px solid #2169e0;
                color:#2169e0;
            }
        }
        //个人用户注册样式
        .content{
            width:100%;
            padding:0 0.24rem;
            li:nth-child(1){
                width:100%;
                margin-top:0.4rem;
                display:flex;
                align-items:center;
                position:relative;
                img:nth-of-type(1){
                    width:0.12rem;
                    height:0.13rem;
                    margin:0 0.15rem 0  0.2rem;
                }
                input{
                    height:0.17rem;
                    border:none;
                    font-size:0.14rem;
                    color:#333;
                }
                span{
                    font-size:0.14rem;
                    color:#2169e0;
                    margin-left:auto;
                    padding-right:0.32rem;
                    white-space:nowrap;
                }
                i{
                    margin-left:auto;
                    padding-right:0.32rem;
                    white-space:nowrap;
                }
                img:nth-of-type(2){
                    width:0.12rem;
                    height:0.11rem;
                    position: absolute;
                    top:0.04rem;
                    right:1.1rem;
                }
            }
            li:nth-child(2){
                width:100%;
                margin-top:0.45rem;
                display:flex;
                align-items:center;
                position:relative;
                img:nth-of-type(1){
                    width:0.12rem;
                    height:0.13rem;
                    margin:0 0.15rem 0  0.2rem;
                }
                input{
                    width:100%;
                    height:0.17rem;
                    border:none;
                    font-size:0.14rem;
                    color:#333;
                }
                img:nth-of-type(2){
                    width:0.13rem;
                    height:0.11rem;
                    position: absolute;
                    top:0.04rem;
                    right:0.3rem;
                }
            }
            li:nth-child(3){
                width:100%;
                margin-top:0.45rem;
                display:flex;
                align-items:center;
                position:relative;
                img:nth-of-type(1){
                    width:0.12rem;
                    height:0.13rem;
                    margin:0 0.15rem 0  0.2rem;
                }
                input{
                    width:100%;
                    height:0.17rem;
                    border:none;
                    font-size:0.14rem;
                    color:#333;
                }
                img:nth-of-type(2){
                    width:0.13rem;
                    height:0.11rem;
                    position: absolute;
                    top:0.04rem;
                    right:0.3rem;
                }
            }
            li:nth-child(4){
                width:100%;
                margin-top:0.45rem;
                display:flex;
                align-items:center;
                position:relative;
                img:nth-of-type(1){
                    width:0.12rem;
                    height:0.13rem;
                    margin:0 0.15rem 0  0.2rem;
                }
                input{
                    width:100%;
                    height:0.17rem;
                    border:none;
                    font-size:0.14rem;
                    color:#333;
                }
                img:nth-of-type(2){
                    width:0.13rem;
                    height:0.12rem;
                    position: absolute;
                    top:0.04rem;
                    right:0.3rem;
                }
            }
            li:nth-child(5){
                width:100%;
                margin-top:1.37rem;
                display:flex;
                align-items:center;
                input{
                    width:100%;
                    height:0.4rem;
                    line-height:0.4rem;
                    text-align:center;
                    border:none;
                    font-size:0.16rem;
                    color:#fff;
                    background-color:#ebebeb;
                    border-radius:0.2rem;
                }
                .active{
                    background-color:#0159d5;
                }
            }
        }
        // 企业用户注册样式
        .content1{
            width:100%;
            padding:0 0.24rem;
            li:nth-child(1){
                width:100%;
                margin-top:0.45rem;
                display:flex;
                align-items:center;
                position:relative;
                img:nth-of-type(1){
                    width:0.12rem;
                    height:0.13rem;
                    margin:0 0.15rem 0  0.2rem;
                }
                input{
                    width:100%;
                    height:0.17rem;
                    border:none;
                    font-size:0.14rem;
                    color:#333;
                }
                img:nth-of-type(2){
                    width:0.13rem;
                    height:0.12rem;
                    position: absolute;
                    top:0.04rem;
                    right:0.3rem;
                }
            }
            li:nth-child(2){
                width:100%;
                margin-top:0.4rem;
                display:flex;
                align-items:center;
                position:relative;
                img:nth-of-type(1){
                    width:0.12rem;
                    height:0.13rem;
                    margin:0 0.15rem 0  0.2rem;
                }
                input{
                    height:0.17rem;
                    border:none;
                    font-size:0.14rem;
                    color:#333;
                }
                span{
                    font-size:0.14rem;
                    color:#2169e0;
                    margin-left:auto;
                    padding-right:0.32rem;
                    white-space:nowrap;
                }
                i{
                    margin-left:auto;
                    padding-right:0.32rem;
                    white-space:nowrap;
                }
                img:nth-of-type(2){
                    width:0.12rem;
                    height:0.11rem;
                    position: absolute;
                    top:0.04rem;
                    right:1.07rem;
                }
            }
            li:nth-child(3){
                width:100%;
                margin-top:0.45rem;
                display:flex;
                align-items:center;
                position:relative;
                img:nth-of-type(1){
                    width:0.12rem;
                    height:0.13rem;
                    margin:0 0.15rem 0  0.2rem;
                }
                input{
                    width:100%;
                    height:0.17rem;
                    border:none;
                    font-size:0.14rem;
                    color:#333;
                }
                img:nth-of-type(2){
                    width:0.13rem;
                    height:0.11rem;
                    position: absolute;
                    top:0.04rem;
                    right:0.3rem;
                }
            }
            li:nth-child(4){
                width:100%;
                margin-top:0.45rem;
                display:flex;
                align-items:center;
                position: relative;
                img:nth-of-type(1){
                    width:0.12rem;
                    height:0.13rem;
                    margin:0 0.15rem 0  0.2rem;
                }
                input{
                    width:100%;
                    height:0.17rem;
                    border:none;
                    font-size:0.14rem;
                    color:#333;
                }
                img:nth-of-type(2){
                    width:0.13rem;
                    height:0.12rem;
                    position: absolute;
                    top:0.04rem;
                    right:0.3rem;
                }
            }
            li:nth-child(5){
                width:100%;
                margin-top:0.45rem;
                display:flex;
                align-items:center;
                position: relative;
                img:nth-of-type(1){
                    width:0.12rem;
                    height:0.13rem;
                    margin:0 0.15rem 0  0.2rem;
                }
                input{
                    width:100%;
                    height:0.17rem;
                    border:none;
                    font-size:0.14rem;
                    color:#333;
                }
                img:nth-of-type(2){
                    width:0.13rem;
                    height:0.12rem;
                    position: absolute;
                    top:0.04rem;
                    right:0.3rem;
                }
            }
            li:nth-child(6){
                width:100%;
                margin-top:0.42rem;
                display:flex;
                align-items:center;
                p{
                    width:100%;
                    height:0.4rem;
                    line-height:0.4rem;
                    text-align:center;
                    font-size:0.14rem;
                    color:#030207;
                    background:#fff;
                    border-radius:0.2rem;
                    border:1px solid #2169e0;
                    background-size:0.12rem 0.08rem;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    img{
                        display:block;
                        width:0.1rem;
                        height:0.07rem;
                        margin-left:0.04rem;
                    }

                }
            }
            li:nth-child(7){
                width:100%;
                margin-top:0.35rem;
                display:flex;
                justify-content:center;
                input{
                    border:none;
                    margin:0 0.06rem 0 0.28rem;
                }
                p{
                    font-size:0.12rem;
                    color:#000;
                    margin-left:5px;
                }
                span{
                    font-size:0.12rem;
                    color:#2169e0;
                }
            }
            li:nth-child(8){
                width:100%;
                margin-top:0.27rem;
                input{
                    width:100%;
                    height:0.4rem;
                    line-height:0.4rem;
                    text-align:center;
                    border:none;
                    font-size:0.16rem;
                    color:#fff;
                    background-color:#ebebeb;
                    border-radius:0.2rem;
                }
                .active1{
                    background-color:#0159d5;
                }
            }
            .mint-actionsheet{
                background:rgba(1, 1, 1, 0.01);
                padding:0 0.05rem;
                .mint-actionsheet-list{
                    display:flex;
                    flex-direction:column;
                    padding-bottom:0.08rem;
                    margin-bottom: 0!important;
                    .mint-actionsheet-listitem{
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        margin:0;
                        font-size:0.16rem;
                        color:#055afb;
                    }
                    li:first-child{
                        border-radius:0.08rem 0.08rem 0 0;
                        font-size:0.11rem;
                        color:#8d8d8d;
                    }
                    li:last-child{
                        border-radius:0 0 0.08rem 0.08rem;
                    }
                }
                .mint-actionsheet-button{
                    border-radius:0.08rem;
                    margin-bottom:5px;
                    color:#055afb;
                    font-size:0.16rem;
                }
            }
        }
    }
}
   
</style>
