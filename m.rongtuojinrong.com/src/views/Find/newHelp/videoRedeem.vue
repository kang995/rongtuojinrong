<template>
<!-- 视频头部 -->
    <div class="videoRedeemBox">
        <!-- 头部 -->
        <headerBox title="融米学堂"></headerBox>
        <div class="videoBox">
            <!-- <video class="video" ref="video" controls>
                   <source  :src="data.video_path" type="video/mp4">
            </video> -->
            <!-- 视频 -->
            <video-player  class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
            ></video-player>
        </div>
        <!-- 内容 -->
        <div class="contentBox">
            <p>{{data.title}}</p>
            <p>官方视频&nbsp;{{data.addtime | formatDate}}</p>
            <p>
                <img @click="changeNum" src="../../../assets/dianzan_03.jpg" alt="">
                <i>{{data.like_num}}</i>
                <img src="../../../assets/dianzan_05.jpg" alt="">
            </p>
        </div>
    </div>
</template>

<script>
import { formatDate } from "../../../modules/datab.js";
// import headerBox from '@/components/header';
import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';
import { Toast } from 'mint-ui';//轻提示
import { Indicator } from 'mint-ui';//加载中
export default {
    components: {
        videoPlayer,
        // headerBox
    },
    data(){
        return{
            data:[],//详情数据
            num:[],//点赞数据
            fileUrl:'https://php.rongtuojinrong.com/Uploads/2017/video/chongzhi13mb.mp4',// 资源的url路径地址
            fileImg:'',// 资源的图片路径地址
        }
    },
    computed: {
	    playerOptions () {		// 使用计算属性
            const playerOptions = {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        src:this.fileUrl,  // 路径
                        type: 'video/mp4',
                    },{
                    src: '//path/to/video.webm',
                    type: 'video/webm'
                    }],
                    poster:this.fileImg, //你的封面地址
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            }
            // console.log(playerOptions);
	        return playerOptions
        }
	},
    methods:{
        changeNum(){
            this.data.like_num++;
            this.getNum();//点击图片请求点赞接口数据(请求时自动+1)
            Toast({
                message: '点赞成功',
                position: 'middle',
                duration: 1500
            });
        },
        // 详情页接口数据
        getDetails(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$post('/rongtuojinrong/article/detail.jsonl',{
                id:this.$route.query.article_id
            }).then(res=>{
                this.data = res.data.data;
                this.fileUrl = res.data.data.video_path;
                this.fileImg= res.data.data.video_thumb;
                this.playerOptions.sources[0].src =  this.fileUrl;
                this.playerOptions.poster =  this.fileImg;
                Indicator.close();
                // console.log(this.data)
            })
        },
        // 点赞接口数据
        getNum(){
            this.$post('/rongtuojinrong/article/like.json',{
                id:this.$route.query.article_id
            }).then(res=>{
                this.num =res.data.data;
                // console.log(this.num)
            })
        }
    },
    //时间戳
    filters: {//过滤器：在数据渲染的时候以某种格式呈现出来
        formatDate(time) {
            var date = new Date(time * 1000);//转成日期对象
            return formatDate(date, "y-MM-dd hh:mm");//将日期对象转换成某种格式
        },
        formatDate2(time) {
            var date = new Date(time * 1000);
            return formatDate(date, "hh:mm");
        }
    },
    created(){
        this.getDetails();
        // this.getNum();
    },
}
</script>

<style lang="scss">
    .videoRedeemBox{
        width:100%;
        height:100%;
        margin-top:0.5rem;
        position:absolute;
        background:#e2ebf4;
            .videoBox{
                width:100%;
                height:2.35rem;
                background:#fff;
            // .video-js .vjs-big-play-button{
            //     border:none;
            // }
            .vjs-poster{
                background-size:cover;
            }
        }
        .contentBox{
            width:100%;
            padding:0 0.17rem  0.17rem  0.11rem;
            background:#fff;
            p:nth-child(1){
                font-size:0.17rem;
                color:#353535;
                padding:0.16rem 0 0.11rem 0;

            }
            p:nth-child(2){
                width:100%;
                padding-bottom:0.17rem;
                font-size:0.11rem;
                color:#b9b9b9;
            }
            p:nth-child(3){
                width:100%;
                display:flex;
                align-items:center;
                justify-content:flex-end;
                img:nth-of-type(1){
                    width:0.19rem;
                    height:0.22rem;
                }
                i:nth-of-type(1){
                    font-size:0.09rem;
                    color:#a7a7a7;
                    margin: 0 0.24rem 0 0.05rem;
                }
                img:nth-of-type(2){
                    width:0.18rem;
                    height:0.22rem;
                }
            }
            
        }
    }
 
</style>