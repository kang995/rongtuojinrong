<template>
  <div id="authentication-failure">
    <div class="failure">
      <img src="@/assets/sb.png" alt />
    </div>
    <div class="characte">
      注销失败
      <br />
      <span>请致电客服: 400-856-6677</span> 
    </div>
    <button  @click="returned" class="button">返回</button>
  </div>
</template>

<script>
export default {
  name: "authentication-failure",
  data() {
    return {};
  },
  methods:{
    //   返回方法
      returned(){
          try{
              window.demo.onClickToClose();
          }catch(e){

          }    

          try{
              onClickToClose();
          }catch(e){

          }          
      }
  }
};
</script>

<style lang='scss'>
#authentication-failure {
  .failure {
    position: fixed;
    width: 0.655rem;
    height: 0.635rem;
    top: 1.83rem;
    left: 40%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .characte {
    position: absolute;
    width: 2.27rem;
    top: 2.7rem;
    left: 19%;
    color: #373737;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    font-size: 0.14rem;
    font-weight: 550;
    letter-spacing:2px;
    span{
      letter-spacing: 0.02rem;
      font-size: 0.12rem;
      font-weight: 200;
      color:#333333;
    }
  }
  .button {
    position: absolute;
    width: 1.675rem;
    height: 0.415rem;
    border: 1px solid black;
    top: 3.2rem;
    left: 27%;
    border-radius: 20px 20px 20px 20px;
    line-height: 0.415rem;
    text-align: center;
    color: #333333;
    font-weight: bold;
    font-size: 0.14rem;
    display: block;
    background-color: #fff;
  }
}
</style>