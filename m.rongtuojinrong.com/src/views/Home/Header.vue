<template>
    <div class="headerBox">
        <div class="header">
            <div class="header_left">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="header_right" @click="popupVisible=!popupVisible">
                <!-- 未读 -->
                <img v-if="this.$store.state.invite.invite&&is_unread==1" src="../../assets/椭圆11.png" alt="">
                <!-- 已读 -->
                <img v-else src="../../assets/增加加号.png" alt="">
            </div>
            <mt-popup v-model="popupVisible"  position="top">
              <ul class="showBox">
                    <!-- <li>
                        <img src="../../assets/扫一扫.png" alt=""><span>扫一扫</span>
                    </li> -->
                    <router-link :to="{name:'service'}" tag="li">
                        <img src="../../assets/客服.png" alt=""><span>客服</span>
                    </router-link>
                    <router-link :to="{name:'mail'}" tag="li">
                        <!-- 未读 -->
                        <img v-if="this.$store.state.invite.invite&&is_unread==1" src="../../assets/椭圆11_99.png" alt="">
                        <!-- 已读 -->
                        <img v-else src="../../assets/站内信.png" alt="">
                        <span>站内信</span>
                    </router-link>
                    <!-- <img src="../../assets/sanjiao_03.jpg" alt=""> -->
                </ul> 
            </mt-popup>
            <!-- <div class="header_right" @click="isShow=!isShow">
                <div v-if="isShow" class="glyphicon glyphicon-plus"></div>
                <div v-else  class="glyphicon glyphicon-remove">
                    <ul class="showBox">
                        <li>
                            <img src="../../assets/扫一扫.png" alt=""><span>扫一扫</span>
                        </li>
                        <li>
                            <img src="../../assets/客服.png" alt=""><span>客服</span>
                        </li>
                        <li>
                            <img src="../../assets/站内信.png" alt=""><span>站内信</span>
                        </li>
                    </ul> 
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            isShow:true,
            popupVisible:false,
            lists:[]
        }
    },
    computed:{
        is_unread:{//方式一
            get(){//没有登录时is_unread为null，不能当做判断条件；所以渲染时要写成断点操作的形式
                return this.$store.state.invite.invite.is_unread//is_unread：1为有未读站内信，0为无未读站内信
            }
        },
        // ...mapState({//方式二
        //     is_unread:state=>state.invite.invite.is_unread// 以回调函数的形式拿到状态
        // })
    },
    methods:{
        //定义请求用户信息接口方法(当用户将站内信全部标已读后，首页的未读状态不会实时改变,需要请求接口将已读的状态实时渲染到首页中才能实现状态同步)
        receiveUserInfo(){
            if(this.is_unread){//登录后才能发送请求(解决退出账户时，在登录页跳不进首页问题)
                    this.$post('/rongtuojinrong/userCenter/accountInformation/userInformation.json').then(res=>{
                    this.$store.dispatch('changeInvite',res.data.data);
                })
            }
        }
    //    getList(){
    //        if(this.token){
    //         // 站内信列表接口 
    //         this.$post('/rongtuojinrong/userCenter/mail/v1/lists.json').then(res=>{
    //                 this.lists = res.data.data;
    //                 // // 对lists数组遍历，取出每个对象中的zhuangtai
    //                 // this.lists.forEach(item => {
    //                 //     // this.$store.dispatch('changeStatus',item.zhuangtai);
    //                 //     this.status1 = item.zhuangtai;
    //                 //     console.log(this.status1)
    //                 // });
    //                 // console.log(this.lists)
    //             });
    //        }
    //    }
    },
    created(){
        this.$store.state.invite.invite&&this.receiveUserInfo();//断点操作--登录之后执行
        // console.log( this.$store.state.invite.invite.is_unread)
    }
    
}
</script>

<style lang="scss" scoped>
    .headerBox{
        width:100%;
        height:0.5rem;
        background:#fff;
        padding:0 0.20rem 0 0.20rem;
        position:fixed;
        top:0;
        z-index:10;
        .header{
            width:100%;
            height:0.5rem;
            display:flex;
            justify-content:space-between;
            align-items:center;
           .header_left{
               width:100%;
               display:flex;
               flex-direction:column;
                img{
                    width:0.85rem;
                    height:0.30rem;
                }
           }
           .header_right{
               img{
                   width:0.18rem;
                   height:0.18rem;
               }
            
            }
            .mint-popup-top{
                width:1.17rem;
                // position:fixed;
                // right:-1.15rem;
                .showBox{
                   width:1.17rem;
                    height:1.05rem;
                   background:#fff;
                   position:fixed;
                   top:0.45rem;
                   right:-1.20rem;
                   z-index:1000;
                   display:flex;
                   justify-content:center;
                   align-items:center;
                   flex-direction:column; 
                   border-radius:0.06rem; 
                   li{
                       width:1.17rem;
                       height:0.325rem;
                       line-height:0.325rem;
                       padding:0 0.24rem;
                       width:100%;
                       display:flex;
                       justify-content:space-between;
                       align-items:center;
                        img{
                            width:0.15rem;
                            height:0.15rem;
                        }
                        span{
                           color:#0062c0;
                           font-size:0.1rem;
                           font-weight:bold;
                        }
                   }
                   li:nth-child(1) span{
                       margin-right:11px;
                   }
                   li:nth-child(1){
                        margin-bottom:0.05rem;
                   }
               }
                .showBox::before {
                    content: '';
                    display: block;
                    width: 0;
                    height: 0;
                    border: 0.08rem solid transparent;
                    border-bottom-color: #fff;
                    position: absolute;
                    left: 50%;
                    top: 0;
                    margin-top: -16px;
                    margin-left:0.30rem;
                }
        }
        //    .header_right{
        //     position:relative;
        //        .showBox{
        //            width:1.17rem;
        //            height:0.98rem;
        //            background:#fff;
        //            position:fixed;
        //            right:0.1rem;
        //            z-index:10;  
        //            li{
        //                width:1.17rem;
        //                height:0.325rem;
        //                line-height:0.325rem;
        //                padding:0 0.24rem;
        //                width:100%;
        //                display:flex;
        //                justify-content:space-between;
        //                align-items:center;
        //             //    i{
        //             //        margin:0 0.2rem 0 0.18rem;
        //             //        color:#0062c0;
        //             //    }
        //                 img{
        //                     width:0.15rem;
        //                     height:0.15rem;
        //                 }
        //                span{
        //                    color:#0062c0;
        //                    font-size:0.1rem;
        //                    font-weight:bold;
        //                }
        //            }
        //            li:nth-child(2) span{
        //                margin-right:11px;
        //            }
        //        }
        //    }
        }
    }
</style>
