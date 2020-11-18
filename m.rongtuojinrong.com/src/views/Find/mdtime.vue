<template>
      <div class="news">
        <ul>
          <li v-for="item in list" :key="item.index">
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
          </li>
        </ul>
      </div>
</template>

<script>
import qs from "qs";
export default {
  data(){
    return{
      list:[]
    }

  },
  created(){
      let postData = qs.stringify({
        cate_id: 6,
      });
      this.$http
      .post("http://api.php.sit.rongtuojinrong.com/rongtuojinrong/article/lists.json",
      postData
      )
      .then(res=>{
        this.list = res.data.data.list;
        //console.log(res.data.data.list);
      })
      .catch(err=>{
        console.log("查询失败");
      })
    }

};

</script>

<style lang="scss" >
body {
  background: #f9f9f9;

  
}
</style>
