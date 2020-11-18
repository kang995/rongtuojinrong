<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <router-link :to="{name:'article',query:{url:banner.url,title:banner.title}}" tag="div" class="swiper-slide"
                v-for="banner in banners"
                :key="banner.id"
            >
                <img :src="banner.pic" alt="">
            </router-link>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    data(){
        return{
            banners:'',
            imgsrc:'http://api.php.sit.rongtuojinrong.com/',
        }
    },
    methods:{
        getBanners(){
            //发送请求
            this.$post("/rongtuojinrong/swipper/ArticleIndex.json").then(res=>{
                this.banners = res.data.data.list;
                // console.log(this.banners)
                //实例化swiper，实现滑动;注意：要等到数据更新引发视图重新渲染后再去实例化swiper，放在$nextTick()回到函数中
                this.$nextTick(()=>{
                    new Swiper(".swiper-container",{
                        loop:true, //循环模式选项，true 循环播放
                        autoplay:true, //可选选项，自动滑动
                        pagination:{//添加分页器
                            el:".swiper-pagination",
                            type: 'custom',
                            autoplayDisableOnInteraction : false,
                            renderCustom: function (swiper, current, total) {//改变分页器样式的方法（方块）
                                var paginationHtml = " ";
                                for (var i = 0; i < total; i++) {
                                    // 判断是不是激活焦点，是的话添加active类，不是就只添加基本样式类
                                    if (i === (current - 1)) {
                                        paginationHtml += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
                                    }else{
                                        paginationHtml += '<span class="swiper-pagination-customs"></span>';
                                    }						  
                                }
                                return paginationHtml;
                            },
                        }
                    }) 
                })
            })
        }
    },
    created(){
        this.getBanners();
    }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 1.35rem;
  margin: 0.5rem 0.11rem 0 0.11rem;
  border-radius: 0.1rem;
  .swiper-wrapper {
    width: 3.45rem;
    height: 1.35rem;
    .swiper-slide {
      width: 3.45rem;
      height: 1.35rem;
      img {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
  }
  // .swiper-pagination{
  //     width:auto;
  //     left:auto;
  //     right:10px;
  // }
  .swiper-pagination-customs {
    width: 0.1rem;
    height: 0.03rem;
    display: inline-block;
    background: #000;
    opacity: 0.3;
    border-radius: 1px;
    /* box-shadow: 0 0 2px  #000; */
    margin: 0 2px;
    outline: 0;
  }
  .swiper-pagination-customs-active {
    opacity: 1;
    background-color: #fff;
  }
  // .swiper-pagination-bullet-active{
  //     background:#fff;
  // }
}
</style>


