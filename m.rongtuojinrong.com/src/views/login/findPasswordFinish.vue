<template>
    <div class="findPasswordFinish">
       <!-- 头部 -->
        <!-- <div class="back">
            <img src="../../assets/img61.png" alt="" @click="goback">
            <p>完成</p>
        </div> -->
        <headerBox title='完成'></headerBox>
        <div class="contentBox">
            <input :class="{'active1':isShow1}" v-model="clear_input1" @input="changeShow1,changeInput1" @blur="change1" @focus="nav1" type="text" placeholder="密码(6位数字)">
            <input :class="{'active2':isShow2}" v-model="clear_input2" @input="changeShow2,changeInput2" @blur="change2" @focus="nav2" type="text" placeholder="确认密码(6位数字)">
            <input @click="commitData" type="submit" value="下一步"/>
            <img @click="clearInput1" v-show="Show1" src="../../assets/delect_03.jpg" alt=""> 
            <img @click="clearInput2" v-show="Show2" src="../../assets/delect_03.jpg" alt=""> 
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
    },
    data(){
        return{
            clear_input1:'',//密码
            clear_input2:'',//确认密码
            Show1:false,//控制删除图片
            Show2:false,
            isShow1:false,//控制获取焦点样式
            isShow2:false,//控制获取焦点样式
            tel:this.$route.query.tel,//接收上个页面传来的手机号
            submit:''
        }
    },
    methods:{
        // 提交用户数据（点击下一步按钮触发）
        commitData(){
            if(this.clearInput1!==''){
                this.isShow1 = false;
                this.isShow2 = true;
            }else{
                this.isShow1 = true;
                this.isShow2 = false;
            }
            // 正则验证
            if(this.clear_input1==''){
                Toast({
                    message: '请输入密码',
                    position: 'middle',
                    duration: 1500
                });
            }else if(!/^\d{6}$/.test(this.clear_input1)){
                Toast({
                    message: '密码长度为6位',
                    position: 'middle',
                    duration: 1500
                }); 
            }else if(this.clear_input1!==''&&this.clear_input2==''){
                Toast({
                    message: '请输入确认密码',
                    position: 'middle',
                    duration: 1500
                });
            }else if(this.clear_input1!==this.clear_input2){
                Toast({
                    message: '密码和确认密码不一致',
                    position: 'middle',
                    duration: 1500
                });
            }else{
                //请求找回密码接口提交用户数据
                this.$post('/rongtuojinrong/resetLoginPwd.json',{
                    tel:this.tel,
                    loginPwd:this.clear_input1
                }).then(res=>{
                    // this.submit = res.data.data;
                    console.log(res.data)
                    if(res.data.status==1){//该账号不存在,请先注册!
                        Toast({
                            message: res.data.msg,
                            position: 'middle',
                            duration: 1500
                        });
                    }else if(res.data.status==0){//找回密码成功
                        Toast({
                            message: '找回密码成功!',//res.data.data
                            position: 'middle',
                            duration: 1500
                        });
                        setTimeout(()=>{
                            this.$router.push({path:'/login',query:{distinguish:'code'}})
                        },1500)
                    }
                })
            }
        },
        goback(){
            this.$router.go(-1)
        },
        //1.清空输入框内容
        clearInput1(){  
            this.clear_input1 = '';
            this.Show1 = false;
        },
        clearInput2(){  
            this.clear_input2 = '';
            this.Show2 = false;
        },
         // 2.input事件删除按钮显示
        changeShow1(){
            this.Show1 = true;
        },
        changeShow2(){
            this.Show2 = true;
        },
          //3.blur事件
        change1(){
            setTimeout(()=>{
                this.Show1 = false;
            },0)
            this.isShow1 = false;
        },
        change2(){
            setTimeout(()=>{
                this.Show2 = false;
            },0)
            this.isShow2 = false;
        },
         //4.focuss事件
        nav1(){
            if(this.clear_input1){
                this.Show1 = true;
            }else{
                this.Show1 = false;
            }
            this.isShow1 = true;
            this.isShow2 = false;
        },
        nav2(){
            if(this.clear_input2){
                this.Show2 = true;
            }else{
                this.Show2 = false;
            }
            this.isShow2 = true;
            this.isShow1 = false;
        }
    },
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
            padding:0 0.3rem 0 0.23rem;
            position: relative;
            input:nth-child(1){
                border:none;
                width:100%;
                height:0.42rem;
                margin-left:0.07rem;
                margin-top:0.75rem;
                text-indent:0.45rem;
                border-radius:0.21rem;
                background:url(../../assets/person_08.jpg) no-repeat 0.12rem 0.12rem;
                background-size:4%;
            }
            .active1{
                box-shadow: 0 0 5px cornflowerblue;
            }
            input:nth-child(2){
                border:none;
                width:100%;
                height:0.42rem;
                margin-left:0.07rem;
                margin-top:0.35rem;
                text-indent:0.45rem;
                border-radius:0.21rem;
                background:url(../../assets/person_08.jpg) no-repeat 0.12rem 0.12rem;
                background-size:4%;
            }
            .active2{
                box-shadow: 0 0 5px cornflowerblue;
            }
            input:nth-of-type(3){
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
            img:nth-of-type(1){
                width:0.13rem;
                height:0.11rem;
                position: absolute;
                top:0.92rem;
                right:0.32rem; 
            }
            img:nth-of-type(2){
                width:0.13rem;
                height:0.12rem;
                position: absolute;
                top:1.68rem;
                right:0.32rem; 
            }
        }
    }
</style>
