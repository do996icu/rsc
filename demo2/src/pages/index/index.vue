<template>
  <div class="menu-list">
    <div class="menu" @click="fnTurnSingleItem()" >
      <div class="icon-image1 icon"></div>
      <div class="title">单相电能表</div>
    </div>
    <div class="menu" @click="fnTurn33Item()">
      <div class="icon-image2 icon"></div>
      <div class="title">三相三线制电能表</div>
    </div>
    <div class="menu" @click="fnTurn34Item()">
      <div class="icon-image3 icon"></div>
      <div class="title">三相四线制电能表</div>
    </div>
    <div class="menu" @click="fnTurnDHItem()">
      <div class="icon-image4 icon"></div>
      <div class="title">电能表、互感器超差算费</div>
    </div>
  </div>
</template>

<script>
import mpButton from 'mpvue-weui/src/button'
import card from '@/components/card'

const events = {
  turnSingleItem : function(e) {
    const url = '../dxdnb/main'
    mpvue.navigateTo({ url })
  },
  turn33Item : function(e) {
    const url = '../xx33/main'
    mpvue.navigateTo({ url })
  },
  turn34Item : function(e) {
    const url = '../xx34/main'
    mpvue.navigateTo({ url })
  },
  turnDHItem : function(e) {
    const url = '../dh/main'
    mpvue.navigateTo({ url })
  },
}
export default {
  components: {mpButton},
  data () {
    return {
    }
  },

  methods: {
    fnTurnSingleItem(event) {
      events.turnSingleItem(event);
    },
    fnTurn33Item(event) {
      events.turn33Item(event);
    },
    fnTurn34Item(event) {
      events.turn34Item(event);
    },
    fnTurnDHItem(event) {
      events.turnDHItem(event);
    },
    fnTurnCMItem(event) {
      events.turnCMItem(event);
    },
     fnTurnHelpItem(event) {
      events.turnHelpItem(event);
    },
    bindViewTap () {
      const url = '../about/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>

</style>
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

.icon-image1{
  background-image: url("../../../static/images/dx.jpg");
  margin-right: 10px;
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
.icon-image2{
  background-image: url("../../../static/images/33.jpg");
  margin-right: 10px;
}
.icon-image3{
  background-image: url("../../../static/images/34.jpg");
  height: 60px;
  width: 60px;
  margin: 14px;
}
.icon-image4{
  background-image: url("../../../static/images/dh.jpg");
  margin-right: 10px;
}
</style>
