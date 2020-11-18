<template>
      <div class="news">
        <ul>
          <router-link  v-for="item in list" :to="{name:'cjdetail',query:{acticle_id:item.article_id}}"  tag="li" :key="item.index" >
            <div class="left listw">
              <div class="listte">{{item.title}}</div>
              <div class="pt">
                <span class="left">{{item.addtime}}</span>
                <span class="right">融托金融</span>
              </div>
            </div>
            <div class="right t_img">
              <img  v-lazy="item.thumb" alt />
            </div>
          </router-link>
        </ul>
      </div>
</template>

<script>
export default {
  data(){
    return{
      list:[],
    }

  },
  methods:{
    // showDetail(){
    //   console.log(this.articleId);
    //   this.$router.push({
    //     name:'cjdetail',
    //     params:{ articleId: this.articleId }
    //   })
    // }
  },
  created(){ 
      this.$post("/rongtuojinrong/article/lists.json",{
        cate_id: 5,
      })
      .then(res=>{
        this.list = res.data.data.list;
      })
      .catch(err=>{
        console.log("查询失败");
      })
    }
  
};

</script>

<style lang="scss" scoped>
body {
  background: #f9f9f9;

  
}
</style>
