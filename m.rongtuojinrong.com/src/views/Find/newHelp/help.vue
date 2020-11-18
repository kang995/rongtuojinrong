<!-- 新手帮助 客户服务--> 
<template>
  <div class="helpBoxs">
    <!-- 客户服务内容区域 -->
    <router-link class="help_img" tag="div" :to="{path:'/newbies'}">
      <img src="../../../assets/img.jpg" alt />
    </router-link>
    <div class="help_lei">
      <div class="help_box">
        <ul class="introduce">
          <router-link tag="li" :to="{name:'helpLogin'}">
            <img src="../../../assets/img20.png" alt />
            <span>注册登录篇</span>
          </router-link>
          <router-link tag="li" :to="{name:'helpRecharge'}">
            <img src="../../../assets/img21.png" alt />
            <span>充值篇</span>
          </router-link>
          <router-link tag="li" :to="{name:'helpLend'}">
            <img src="../../../assets/img22.png" alt />
            <span>出借篇</span>
          </router-link>
        </ul>
        <div class="xian"></div>
        <ul class="introduce">
          <router-link tag="li" :to="{name:'helpRoperty'}">
            <img src="../../../assets/img23.png" alt />
            <span>资产篇</span>
          </router-link>
          <router-link tag="li" :to="{name:'helpDeposit'}">
            <img src="../../../assets/img24.png" alt />
            <span>提现篇</span>
          </router-link>
          <router-link tag="li" :to="{name:'service'}">
            <img src="../../../assets/img25.png" alt />
            <span>联系客服</span>
          </router-link>
        </ul>
      </div>
    </div>
    

  </div>
</template>

<script>

export default {
  
};
</script>

<style lang="scss">

</style>
 
