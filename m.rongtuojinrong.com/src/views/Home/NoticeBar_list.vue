<template>
  <!-- v-infinite-scroll指令为执行加载更多数据的方法loadMore -->
    <div class="NoticeBarBox"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
    >
        <!-- 头部 -->
        <!-- <mt-header title="平台公告" fixed>
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <headerBox title="平台公告">
            <!-- <img src="../../assets/img38s.png" alt="" slot="rightTo" class="right_content"> -->
        </headerBox>
        <!-- 循环生成cell -->
        <div class="listBox">
            <router-link :to="{name:'NoticeBarlistDetails',query:{article_id:notice.article_id}}" tag='div' class="list" v-for="notice in notices" :key="notice.id">
                <div class="list_top">
                    <p>【网站公告】&nbsp;{{notice.title}}</p>
                    <img src="../../assets/img63.png" alt="">
                </div>
                <div class="list_bottom">
                    <p>{{notice.addtime}}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
import headerBox from '@/components/header.vue';
//引入Toast组件
import {Toast} from "mint-ui"
export default {
    components:{
        headerBox
    },
    // watch:{
    //     type(){
    //         this.notices = [];  //数组内容要清空
    //         this.page = 1;     //页码从第一页开始
    //         this.hasMore = true; //默认都是有更多数据
    //         this.getList();//请求数据
    //     }
    // },
    data(){
        return{
            notices:[],
            page:1,
            limit:10,
            loading:false,//默认开启无限滚动   true的话就代表关闭无限滚动
            hasMore:true,//有更多数据
        }
    },
    methods:{
          loadMore(){ //加载更多的方法  
           if(!this.hasMore){ //如果没有更多数据了
                Toast({
                    message: '我是有底线的....',
                    duration:2000,
                    position:"bottom"
                });
                //关闭无限滚动
               this.loading = true;
               return false;//不在请求数据
            }
            this.getList() 
        },
        getList(){
            let {page,limit} = this; //不使用{}解构时的写法：let page = this.page
            // let postData = qs.stringify({ //向后台传入user_id
            //     cate_id:1,
            //     page,
            //     limit
            // });
            this.loading = true;//关闭无限滚动  5s
            let toast = Toast({
                message: '正在加载....',
                iconClass: 'fa fa-cog fa-spin',
                duration:-1
            });
            this.$post('/rongtuojinrong/article/lists.json',{
                cate_id:1,
                page,
                limit
            }).then(res=>{
                this.notices = this.notices.concat(res.data.data.list);
                // console.log( res.data)
                this.loading = false;//继续开启无限滚动
                toast.close();//关闭toast
                if(page*limit >= res.data.data.count){ //判断是否有更多数据
                    this.hasMore = false; //没有更多数据了
                    return false;
                }
                this.page++;
                // console.log(typeof this.notices)
            })
        }
    },
    activated(){
        this.loading = false;
    },
    deactivated(){
        this.loading = true;
    }
    // created(){
    //     this.getList();
    // }
}
</script>

<style lang="scss">
    .NoticeBarBox{
        // .right_content{//重置右侧样式
        //     width:0.16rem;
        //     height:0.16rem;
        //     position:absolute;
        //     top:0.13rem;
        // }
        background:#fff;
        height:100%;
        .mint-header {
            background: #fff;
            height: 0.5rem;
            border-bottom:1px solid #b6b6b6; 
            position:fixed;
            top:0;
            z-index:10;
            .mint-button-icon {
                color: #404040;
            }
            .mint-header-title {
                font-size: 0.18rem;
                color: #000000;
            }
        }
        .listBox{
            width:100%;
            padding:0 0.16rem 0 0.18rem;
            margin-top:0.5rem;
            .list{
                width:100%;
                height:0.7rem;
                border-bottom:1px solid #ededed;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                .list_top{
                    width:100%;
                    display:flex;
                    justify-content:space-between;
                    margin-top:0.15rem;
                    line-height:0.15rem;
                    p{
                        font-size:0.15rem;
                        color:#282828;
                        width:3.1rem;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                    }
                    img{
                        width:0.08rem;
                        height:0.15rem;
                    }
                }
                .list_bottom{
                    width:100%;
                    margin-bottom:0.10rem;
                    margin-left:8px;
                    p{
                        font-size:0.1rem;
                        color:#626262;
                    }
                }
            }
        }
    }
</style>
