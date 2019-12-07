<template>
  <view class="felix-dialog {{hiddenDialog ? 'showDialog' : ''}}">
    <view class="gray-mark"></view>
    <view class="dialog-view">
      <view class="dialog-title">计算结果</view>
      <view class="dialog-body">
        <div class="row">
          <view class="label-left">更正系数：</view>
          <view class="value-right">{{ getGx }}</view>
        </div>
        <div class="row">
          <view class="label-left">综合倍率：</view>
          <view class="value-right">{{rate}}</view>
        </div>
        <div class="row {{gx == '∞' ? 'showDialog' : ''}}">
          <view class="label-left">抄见电量(kWh)：</view>
          <view class="value-right">{{ getWz }}</view>
        </div>
        <div class="row">
          <view class="label-left">
            <slot name="title_bdl"></slot>
          </view>
          <view class="value-right">{{ getBDL }}</view>
        </div>
        <div class="row">
          <view class="label-left">
            <slot name="title_p"></slot>
          </view>
          <view class="value-right">{{ getP }}</view>
        </div>
      </view>
      <div class="dialog-menus">
        <div class="dialog-close" @click="fnCloseDialog">关闭</div>
      </div>
    </view>
  </view>
</template>

<script>
  export default {
    name: "felix-dialog",
    props: {
      hiddenDialog: {
        type: Boolean,
        default: ()=> true
      },
      title_bdl:{
        type: String,
        default: ()=> '补电量(kWh)：'
      },
      title_p: {
        type: String,
        default: ()=> '补电费(元)：'
      },
      gx: {
        type: String,
        default: ()=> '∞'
      },
      rate: {
        type: Number,
        default: ()=> 0
      },
      wz: {
        type: Number,
        default: () => 0
      },
      bdl: {
        type: Number,
        default: ()=> 0
      },
      p: {
        type: Number,
        default: ()=> 0
      }
    },
    methods: {
      fnCloseDialog(e) {
        this.hiddenDialog = true;
        this.$emit('close');
      }
    },
    computed: {
      getGx(){
        this.gx = isNaN(this.gx) ? '∞' : this.gx;
        return this.gx;
      },
      getP() {
        this.gx = isNaN(this.gx) ? '∞' : this.gx;
        if(this.gx == '∞')
          return '根据历年、月缴纳电费确定';
        return parseFloat(Math.abs(this.p)).toFixed(2)
      },
      getWz(){

        return parseFloat(Math.abs(this.wz)).toFixed(2)
      },
      getBDL(){
        this.gx = isNaN(this.gx) ? '∞' : this.gx;
        if(this.gx == '∞')
          return '根据历年、月用电量确定';
        return parseFloat(Math.abs(this.bdl)).toFixed(2)
      }
    }
  };
</script>

<style scoped>
  .felix-dialog{
    z-index: 999;
  }
  .gray-mark{
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: #666;
    opacity: 0.70;
    z-index: 999;
  }
  .red{
    color: #F00;
    font-weight: bold!important;
  }
  .dialog-view{
    background-color: #fff;
    width: 80%;
    position: fixed;
    margin: 0 auto;
    margin-top: 40%;
    padding: 20px;
    border-radius: 16px;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 999;
  }
  .dialog-title{
    text-align: center;
    font-size: 20px;
    border-bottom: solid 1px #EEE;
    line-height: 1;
    padding-bottom: 10px;

  }
  .dialog-body{
    margin-top: 10px;
  }
  .dialog-menus{
    font-size: 20px;
    margin: 0 auto;
  }
  .dialog-close{
    text-align: center;
    margin-top: 15px;
    color: #666;
  }
  .row{
    border-bottom: solid 1px #EEE;
    margin: 0 auto;
    display: flex;
    width: 80%;
    line-height: 2;
  }
  .label-left {
    width: 65%;
    text-align: left;
  }
  .value-right {
    width: 50%;
    text-align: right;
  }
  .showDialog {
    display: none;
  }
  .hide{
    display: none;
  }
</style>
