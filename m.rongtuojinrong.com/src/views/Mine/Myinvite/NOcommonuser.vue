<template>
 <!-- 普通用户未邀请好友显示的页面 -->
  <div class="NOfriderlistBox">
   <headerBox title="邀请好友">
     <!--  <span slot="rightTo" class='right_content' @click="popupVisible=!popupVisible"><img src="../../../assets/img38s.png"></span> -->
    </headerBox>
    <iframe class="iframeBox" :src="conter.xiayibu" frameborder="0"></iframe>
     <!--  头部分享弹窗内容 -->
     <van-popup v-model="popupVisible"  position="bottom"  >
      <div class="popup_bottom">
        <P>选择要分享到的平台</P>
        <ol>
          <li>
            <img src="../../../assets/img16.png" alt />
            <span>微信好友</span>
          </li> 
          <li>
            <img src="../../../assets/img17.png" alt />
            <span>朋友圈</span>
          </li>
          <li>
            <img src="../../../assets/img19.png" alt />
            <span>QQ</span>
          </li>
          <li>
            <img src="../../../assets/img18.png" alt />
            <span>微博</span>
          </li>
        </ol>
        <div class="fxx"></div>
      <button class="priend" @click="popupShow">取消</button>
      </div>     
    </van-popup>
  </div>
</template>




<script>
export default {
data(){
    return{
            conter:'',
            popupVisible: false,
        }
},
methods:{
    popupShow() {
      this.popupVisible = false;
    },
},
   created(){
       this.$post('/rongtuojinrong/userCenter/invite/homeNoInvite.json',{
             defidenshuxing: this.$store.state.invite.defidenshuxing,
       }).then(res=>{
        this.conter =res.data.data;
           // console.log(this.cont.xiayibu)
       })
       .catch(err=>{
        })
   }
}
</script>


<style lang="scss" >
body,html{
    width:100%;
    height:100%;
    margin: 0 auto;
  .NOfriderlistBox {
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0 auto;
   .iframeBox{
            width:100%;
            height:100%;
            padding-top:0.5rem;
             margin: 0 auto;
            
        }
   .back .right_content img{
      width: 0.16rem;
      height: 0.165rem;
      margin-top:0.15rem;
   }
    .popup_bottom {
      width: 100%;
      height: auto;
     padding:0.15rem 0.27rem 0 0.27rem;
      p{text-align:center;line-height: 0.3rem;}
      ol {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.85rem;
        padding-top:0.2rem;
        li {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: column;
          height: 0.75rem;
          img {
            width: 0.3rem;
            height: 0.3rem;
          }
          span {
            color: #1c1c1c;
            height: 0.1rem;
            margin-top: 0.07rem;
          }
        }
      }
      .priend {
      border: none;
      width: 100%;
      background: none;
      text-align: center;
      color: #333;
      /* margin-top: 0.1rem; */
      height:0.4rem;
    }
     .fxx {
      height: 2px;
      border-top: 3px solid #f7f8fc;
      width: 100%;
    }
    }
    
  }
   .yqhyno .yqhynolijibtn{
               display: none;
             }
}
</style>
