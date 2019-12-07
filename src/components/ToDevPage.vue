<template>
    <div class="{{show? '' : 'hidden'}}">
      <view class="center">待开发...</view>
    </div>
</template>

<script>
  export default {
    name: "ToDevPage",
    props:{
      show: {
        type: Boolean,
        default: ()=> false
      }
    }
  };
</script>

<style scoped>
  .center{
    text-align: center;
    margin-top: 50px;
  }
  .hidden{
    display:none;
  }
</style>
