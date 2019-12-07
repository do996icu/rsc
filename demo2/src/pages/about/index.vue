
<template>
  <div class="menu-list">
    <div class="menu" @click="fnTurnCMItem()" >
      <div class="icon-image5 icon"></div>
      <div class="title">计量装置现场检验常用方法</div>
    </div>
    <div class="menu" @click="fnTurnHelpItem()">
      <div class="icon-image6 icon"></div>
      <div class="title">使用说明及帮助</div>
    </div>
    <div class="menu" @click="fnTurnDevelopItem()" style="background-color: #ebeef3;">
      <div class="icon-image7 icon"></div>
      <div class="title">关于开发</div>
    </div>
  </div>
</template>
<script>
  const events = {
    turnCMItem: function(e) {
      const url = '../descr/main'
      mpvue.navigateTo({ url })
    },
    turnHelpItem: function(e) {
      const url = '../help/main'
      mpvue.navigateTo({ url })
    },
    turnDevelopItem: function(e) {
      const url = '../develop/main'
      mpvue.navigateTo({ url })
    }
  }
  export default {
    data () {
      return {
      }
    },
    methods: {
      fnTurnCMItem(event) {
        events.turnCMItem(event);
      },
      fnTurnHelpItem(event) {
        events.turnHelpItem(event);
      },
      fnTurnDevelopItem(event) {
        events.turnDevelopItem(event);
      },
    }
  }
</script>
<style>
  page{
    height: 100%;
    background: linear-gradient(to bottom, rgba(21,216,246), rgba(68,132,232));
  }
  .menu{
    height: 90px;
    width: 80%;
    margin: 0 auto;
    border: 1px solid #EEE;
    border-radius: 8px;
    margin-bottom: 20px;
    background:#fff;
    border:1px solid #eee;
    box-shadow:0 0 5px rgba(0,0,0,0.27),0 0 20px  rgba(0,0,0,.1) inset;
    display: flex;
  }
  .menu::after,.menu::before {
    content:'';
    position:absolute;
    bottom:6px;
    width:100px;
    height:1px;
    z-index:-1;
  }
  .menu::after {
    left:4px;
    transform:rotate(-6deg);
  }
  .menu::before {
    right:4px;
    transform:rotate(6deg);
  }
  .menu-list{
    padding: 50px 0;
  }
  .menu-list button {
    margin-bottom: 15px;
  }

  .icon {
    height: 80px;
    width: 80px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
  }
  .title{
    margin-top: 30px;
    font-weight: bold;
    font-size: 18px;
    color: rgba(68,132,232);
  }
  .icon-image5{
    background-image: url("../../../static/images/descr.jpg");
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 10px;
    width: 70px;
    height: 70px;
  }
  .icon-image6{
    background-image: url("../../../static/images/help.jpg");
    height: 65px;
    width: 65px;
    margin: 12px 10px;
  }
  .icon-image7{
    background-image: url("../../../static/images/develop.png");
    margin: 5px;
  }
</style>
