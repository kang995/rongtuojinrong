<template>
    <div class="notFound">
        <img src="../../assets/nodata.png" alt="">
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
   #app{
        width:100%;
        height:100%;     
        .notFound{
            width:100%;
            height:8.15rem;
            background:#ddd;
            overflow: hidden;
            img{
                display:block;
                position: absolute;
                top:0;
                bottom:0;
                left:0;
                right:0;
                margin:auto;
            }
        }
    }
</style>