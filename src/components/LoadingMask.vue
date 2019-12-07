<template>
  <view class="loading-mark" v-if="mask"></view>
</template>

<script>
  export default {
    name: "LoadingMask",
    data(){
      return {
        mask: true
      }
    },
    mounted(){
      let that = this;
      let hideLoaddingMask = function(){
        that.mask = false;
      }
      setTimeout(hideLoaddingMask, 5000);

    },
  };
</script>

<style scoped>
  .loading-mark{
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: #FFF;
    z-index: 9999;
  }
</style>
