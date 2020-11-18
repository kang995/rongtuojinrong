<template>
    <div class="homeBox">
        <Appheader></Appheader>
        <Banner></Banner>
        <NoticeBar></NoticeBar>
        <Nav></Nav>
        <Navnew></Navnew>
        <NavnewRoal></NavnewRoal>
        <NavnewHand></NavnewHand>
        <Tabbar></Tabbar>
        <Project></Project> 
        <Data></Data> 
        <!-- 风险评估失效弹窗 -->
        <van-popup v-model="show">
            <div class="bankBox">
                <p>温馨提示</p>
                <p>尊敬的用户，您的风险评估已失效，为不影您的正常使用，请重新进行评估。</p>
                <p>
                    <span @click="show=!show">取消</span>
                    <router-link tag="span" :to="{path:'/rishquestion'}">重新评估</router-link>
                </p>
            </div>
        </van-popup>
    </div>
</template>

<script>
//正常页面组件
import Appheader from './Header'
import Banner from '@/components/Home_banner'
import Tabbar from '@/components/Tabbar'
import NoticeBar from './NoticeBar'
import Nav from './Nav/Nav'
import Project from './Project'
import Data from './Data'
// 分角色组件
import Navnew from './Nav_new/Nav_new'
import NavnewRoal from './Nav_new/Nav_new_role'
import NavnewHand from './Nav_new/Nav_new_hand'
import {mapState} from 'vuex';
export default {
    components:{
        Appheader,
        Banner,
        Tabbar,
        NoticeBar,
        Nav,
        Navnew,
        NavnewRoal,
        NavnewHand,
        Project,
        Data
    },
    computed:{
        ...mapState({//evaluate_overdue：1：未过期，0为已过期(风险评估状态)
            evaluate_overdue:state=>state.invite.invite.evaluate_overdue
        }),
        ...mapState({
            invest_count:state=>state.login.token.invest_count//出借状态
        }),
    },
    data(){
        return{
            show:false,//弹出窗变量
        }
    },
    methods:{
        //风险评估已过期弹出提示框
        changePop(){
            var risk = sessionStorage.getItem('risk');
            if(this.evaluate_overdue==0 && +this.invest_count && !risk){//风险评估状态+出借状态
                sessionStorage.setItem('risk','判断评估状态是否过期');
                this.show = true; 
            }
        },
    },
    created(){
        this.$store.state.invite.invite&&this.changePop();//断点操作--登录之后执行
    }
}
</script>

<style lang="scss" scoped>
.van-popup {
border-radius:0.1rem;
overflow: hidden;
    .bankBox{
        width:3.07rem;
        background:#f8f8fa;
        border-radius: .1rem;
        p:nth-child(1){
            width:100%;
            font-size:0.16rem;
            font-weight:bold;
            color:#030501;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:0.22rem 0 0.35rem 0;
        }
        p:nth-child(2){
            width:100%;
            line-height:0.20rem;
            font-size:0.15rem;
            color:#378cc3;
            display:flex;
            justify-content:center;
            padding:0 0.4rem 0.33rem 0.3rem;  
            border-bottom:1px solid #ddd;              
        }
        p:nth-child(3){
            width:100%;
            height:0.44rem;
            display:flex;
            span:nth-child(1){
                width:50%;
                border-right:1px solid #ddd;
                // display:flex;
                // justify-content:center;
                // align-items:center;
                text-align:center;
                line-height:0.44rem;
                font-size:0.15rem;
                color:#378cc3;
            }
            span:nth-child(2){
                width:50%;
                // display:flex;
                // justify-content:center;
                // align-items:center;
                text-align:center;
                line-height:0.44rem;
                font-size:0.15rem;
                color:#378cc3;
            }               
        }
    }
}
</style>
