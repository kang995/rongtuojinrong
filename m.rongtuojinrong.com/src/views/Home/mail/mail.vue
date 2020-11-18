<template>
   <div style="width:100%;heiht:100%" v-show="flag">
       <!-- 用户暂无站内信 -->
        <div :class="isShow ? 'bg-Div':''"  v-if="isShow">
            <headerBox title="站内信"></headerBox>
            <img src="@/assets/nodata.png" alt="">
            <span>暂无站内信...</span>
        </div>
        <!-- 用户有站内信 -->
        <div class="mailBox" v-else
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <!-- 头部 -->
            <headerBox title="站内信">
                <span slot='rightTo' class="right_content" @click="changeZhuangtai('null')"> 全部标为已读</span>
            </headerBox>
            <!-- 列表 -->
            <router-link tag="div" :to="{name:'mailDetail',query:{id:list.id}}" class="contentBox" v-for="list in lists" :key="list.id" @click.native="changeZhuangtai(list.id)">
                <h2>
                    <img v-show="list.status==1" src="../../../assets/xin.png" alt="" ref="img">
                    <span>{{list.title}}</span>
                </h2> 
                <p>{{list.time}}</p>
                <div class="content">
                    {{list.content}}
                </div>
            </router-link>
        </div>
   </div>
</template>

<script>
import qs from 'qs';
import {Toast} from "mint-ui";
import {mapState} from 'vuex';
export default {
    data(){
        return{
            lists:[],
            page:1,//默认第一页
            loading:false,//默认开启无限滚动   true的话就代表关闭无限滚动
            hasMore:true,//有更多数据
            msg:[],//控制有无站内信
            isShow:false,//控制无站内信用户的变量
            flag:false//控制Dom结构显示
        }
    },
    computed:{
        is_unread:{//方式一
            get(){
                return this.$store.state.invite.invite.is_unread//is_unread：1为有未读站内信，0为无未读站内信
            }
        },
        // ...mapState({//方式二
        //     is_unread:state=>state.invite.invite.is_unread// 以回调函数的形式拿到状态
        // })
    },
    methods:{
        //1.无限滚动时加载更多数据的方法  
        loadMore(){ 
        // console.log(this.hasMore);
            if(!this.hasMore){ //如果没有更多数据了
                Toast({
                    message: '我是有底线的....',
                    duration:2000,
                    position:"bottom"
                });
                //关闭无限滚动
               this.loading = true;
               return false;//不在请求接口数据
            }
            this.getList() 
        },
        // 2.请求列表接口数据(接口中：status 1未读 2已读; type 1显示 2隐藏)
        getList(){
            let {page} = this;
            this.loading = true;//关闭上一页无限滚动  5s
            this.toast = Toast({//数据请求时显示Loading提示
                message: '正在加载....',
                iconClass: 'fa fa-cog fa-spin',
                duration:-1
            });
            this.$post('/rongtuojinrong/userCenter/mail/v1/lists.json',{
                page:page,
            }).then(res=>{
                this.flag = true;//接口请求成功后渲染对应的Dom结构
                this.toast.close();//数据请求完后关闭Loading提示
                this.loading = false; //接口请求完数据后继续开启下一页无限滚动
                // --page为1并且返回数据为空时
                if(page==1 && res.data.data.length==0){
                    this.isShow = true;//无站内信用户结构显示
                    this.loading = true;//关闭无限滚动
                    return
                }
                // --有站内信用户但无更多数据时
                if(res.data.data.length==0){//判断无更过数据时，需要关闭无限滚动(返回数据为空时关闭无限滚动)
                    this.hasMore = false;
                    return;
                }
                this.lists = this.lists.concat(res.data.data);
                this.page++;
            });
        },
        // 3.标为已读的方法,传mess_id为单条数据标已读，不传默认全部标为已读(后台将status置为2是已读)
        changeZhuangtai(mess_id){
            // for(var key in this.lists){
            //     this.lists[key].zhuangtai = 3;
            // }
            let postData = {};
            if(mess_id=='null'){//全部标已读
                
            }else{//单条数据标已读
                postData.mess_id = mess_id;
            }
            // console.log(mess_id)
            this.$post('/rongtuojinrong/userCenter/mail/v1/setread.json',postData).then(res=>{
                if(res.data.status==0){//status为0请求成功
                    this.lists = [];
                    this.page = 1;
                    if(mess_id=='null'){//只有全部标已读时请求列表接口，进入详情页时不需要请求
                        this.getList();
                    }
                }
            })
        }
    },
    created(){
        this.getList();
    },
    destroyed: function () {
        this.toast.close();
    }
}
</script>

<style lang="scss">
.mailBox{
    background:#fff;
    width:100%;
    height:100%;
    .contentBox{
        width:100%;
        padding:0 0.1rem;
        border-bottom:1px solid #d6d6d6;
        h2{
            width:100%;
            height:0.41rem;
            display:flex;
            align-items:center;
            img{
                width:0.1rem;
                height:0.1rem;
                margin-right:0.09rem;
            }
            span{
                font-size:0.14rem;
                color:#010101;
            }
        }
        p{
            width:100%;
            height:0.3rem;
            font-size:0.15rem;
            color:#010101;
        }
        .content{
            width:100%;
            // height:0.61rem;
            line-height:0.16rem;
            font-size:0.13rem;
            color:#767676;
            padding-right:0.25rem;
            padding-bottom:0.14rem;
        }
    }
    div:nth-child(2){
        margin-top:0.5rem;
    }
}
   
</style>
