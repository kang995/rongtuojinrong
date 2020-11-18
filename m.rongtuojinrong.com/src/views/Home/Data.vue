<template>
    <!-- 实时数据 -->
    <div class="Project-list6">
      <span>实时数据</span>
      <div class="Project-list6-data">
        <div class="Project-list6-data-img1">
          <div class="Project-list6-data-img1-sum">
            <span class="Project-list6-data-img1-sum-span1">{{Datas.invest_amount/100000000 | jiner}}</span>
            <span class="Project-list6-data-img1-sum-span2">亿</span>
          </div>
            <span class="Project-list6-data-img1-monuy-a">累计出借金额(元)</span>
        </div>
        <div class="Project-list6-data-img2">
          <div class="Project-list6-data-img1-sum">
            <span class="Project-list6-data-img1-sum-span1">{{Datas.invest_count}}</span>
            <span class="Project-list6-data-img1-sum-span2">笔</span>
          </div>
            <span class="Project-list6-data-img1-monuy-a">累计交易笔数(笔)</span>
        </div>
        <div class="Project-list6-data-img3">
          <div class="Project-list6-data-img1-sum">
            <span class="Project-list6-data-img1-sum-span11">{{Datas.interest/10000 | jiner}}</span>
            <span class="Project-list6-data-img1-sum-span2">万</span>
          </div>
            <span class="Project-list6-data-img1-monuy-a">累计收益金额(元)</span>
        </div>
      </div>
      <div class="kong">
      <!-- 因为ios不兼容底部的  margin-bottom 所以直接弄一个空的div进行设置-->
      </div>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            Datas:''
        }
    },
    methods:{
        getData(){
            this.$post('/rongtuojinrong/total/IndexPageTotal.json').then(res=>{
               this.Datas = res.data.data
              //  console.log(this.Datas)
            })
        },
        
    },
    // 累计收益金额
    filters:{
     jiner(obj){
     return obj = (obj).toFixed(2);  
     }
    },
    created(){
        this.getData();
    }
}
</script>

<style lang='scss' scoped>
.Project-list6 {
  width: 100%;
  height: 1.295rem;
  background-color: #ffffff;
  margin-top: 0.08rem ;
  padding: 3%;
  z-index: 99;
}
.Project-list6>span{
  font-size:0.14rem;
   color:#333;
   font-weight:bold;
}

.Project-list6-data {
  width: 100%;
  height: 0.94rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.Project-list6-data .Project-list6-data-img1,
.Project-list6-data .Project-list6-data-img2,
.Project-list6-data .Project-list6-data-img3 {
  width: 1.09rem;
  height: 0.58rem;
  background-color: #02d8c0;
  border-radius: 7px;
  // font-size: 0.14rem;
}
.Project-list6-data .Project-list6-data-img2 {
  background-color: #ff7932;
}
.Project-list6-data .Project-list6-data-img3 {
  background-color: #32acff;
}
.Project-list6-data .Project-list6-data-img1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/img97.png");
  background-size: 100%;
}

.Project-list6-data-img1-sum-span2 {
  font-size: 9px;
  padding: 3px;
  color: #fefffe;
}

 .Project-list6-data-img1-monuy-a {
  color: #fefffe;
  font-size: 0.13rem;
}

.Project-list6-data-img1-sum .Project-list6-data-img1-sum-span1 {
  color: #fefffe;
}
.Project-list6-data-img1-sum-span11{
  white-space: nowrap;
  overflow: hidden;         
  text-overflow: ellipsis;
  color:#fefffe;
  width: 0.3rem;
}

.Project-list6-data .Project-list6-data-img2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/img98.png");
  background-size: 100%;
}

.Project-list6-data .Project-list6-data-img3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/img99.png");
  background-size: 100%;
}
.kong{
  height: 0.5rem;
}
</style>
