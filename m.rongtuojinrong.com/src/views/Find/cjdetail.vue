<template>
      <div class="newsdetail">       
        <div class="newsdetail-head">
          <div class="newsdetail-head-1">
            <a>
              <img src="../../assets/img61.png" @click="goback">
            </a>
          </div>
          <p class="newsdetail-head-2" ref="newsdet">{{title}}</p>
          <div class="newsdetail-head-3">
            <a>
              <img src="../../assets/img38s.png">
            </a>
          </div>
        </div>

        <div class="newsdetail-2" v-html="contentdel.content">

        </div>
        <!-- 评论 -->
        <div class="newsdetail-1">
          <input type="text" v-model="value" placeholder="请评论..." @change="clickChange">
          <span>
            <img src="../../assets/d7.png">
            <mt-badge size="small" color="#0159d5">{{contentdel.comment_count}}</mt-badge>
          </span>
        </div>
      </div>
</template>

<script>
import headerbar from "@/components/header";
export default {
  data(){
    return{
      contentdel:{},
      value:'',
      title:''
    }

  },
  components:{
    headerbar
  },
  methods:{
    goback(){
        this.$router.go(-1)
    },
    clickChange(){
      this.$post("/rongtuojinrong/article/comment.json",{
        id: this.$route.query.acticle_id,user_id:31753,content:this.value
      })
      .then(res=>{
        this.content = res.data.data;
      })
      .catch(err=>{
        console.log("查询失败");
      })
      this.loadDetail();
      this.value='';
    },
    loadDetail(){
      this.$post("/rongtuojinrong/article/detail.jsonl",{
        id: this.$route.query.acticle_id,
      })
      .then(res=>{
        this.contentdel = res.data.data;
        this.title = res.data.data.title;
        var sub = this.title.slice(0,13);
        var sub1 = sub+'...'
        this.title = sub1;
      })
      .catch(err=>{
        console.log("查询失败");
      })
    }
  },
  created(){
      this.loadDetail();     
  }
};

</script>

<style lang="scss">
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
        img{
          width: 0.15rem;   
        }
      }
    }
  }
  .newsdetail-2{
    margin-top: 0.5rem;
    .xw_contont{
      #content{
        p{
          img{
            max-width: 100%;
            margin:  0 auto;
          }
        }

      }
    }
  }
  .newsdetail-1{
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-evenly;
    position: fixed;
    bottom: 0;
    padding: 0.1rem 0;
    input{
      height: 0.3rem;
      width: 85%;
      border-radius: 0.04rem;
      border: 1px solid #A0A0A0;
    }
    span{
      display: flex;
      align-items: center;
      position: relative;
      img{
        width: 0.2rem;
      }
      span{
        position: absolute;
        top: -0.05rem;
        left: 0.05rem;
      }
    }
  }
</style>
