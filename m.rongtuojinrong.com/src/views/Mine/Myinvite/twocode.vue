<template>
    <div class="twocodeBox">
         <headerBox title="我的二维码"/> 
        <!-- <div class="newsdetail-head">
          <div class="newsdetail-head-1">
            <a>
              <img src="../../../assets/img61.png" @click="goback">
            </a>
          </div>
          <p class="newsdetail-head-2" ref="newsdet">我的二维码</p>
          <div class="newsdetail-head-3">
           <a>
              分享
            </a>
          </div>
        </div> -->
        <div class="twocodeBox-1">
            <img :src="code.picurl">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            code: {}
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
    },
    created(){
        let invite = this.$store.state.invite;
        this.$post('/rongtuojinrong/userCenter/invite/myQrcode.json',{
            defidenshuxing: invite.defidenshuxing
        })
        .then(res=>{
            this.code = res.data.data;
        })
        .catch(err=>{

        })   
    }
}
</script>

<style lang="scss" scoped>
.twocodeBox{
  .newsdetail-head{
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    padding: 0 0.13rem;
    top: 0;
    height: 0.5rem;
    .newsdetail-head-1{
      a{
        img{
          width: 0.08rem;
          height: 0.12rem;
        }
      }
    }
    .newsdetail-head-2{
      font-size: 0.17rem;
      color: #404040;
    }
    .newsdetail-head-3{
      a{
        font-size: 0.15rem;
        font-weight: bold;
      }
    }
  }

    .twocodeBox-1{
        width: 100%;
        padding-top: 0.5rem;
        img{
            max-width: 100%;
            height: auto;
            margin: 0 auto;
        }
    }
}
</style>