<template>
  <div class="bg-color">
    <view class="section">
      <picker class="row-picker" mode="selector" @change="bindEquipmentsChange" value="{{eIndex}}" range="{{equipments}}" style="height: 35px;">
        <div class="flex-h" style="position: absolute;width: 100%;">
          <view class="weui-cells__title section-title" style="z-index: 999; background: transparent;margin-top: 3px; width: 100%;">超差装置：</view>
          <view class="weui-cells weui-cells_after-title right-picker">
            <view class="right-center-view" style="right: 55px;">{{ equipments[eIndex]}} </view>
          </view>
        </div>
      </picker>
      <view class="right-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></view>
    </view>
    <div class="{{!showEmptyPage ? '': 'hiddenFrom'}}">
    <view class="section fr-inline">
      <picker class="row-picker" @change="bindTypesChange" value="{{sIndex}}" range="{{minusSigns}}">
        <div class="flex-h">
          <view class="weui-cells__title section-title">{{eIndex == 1 ? 'TV检定误差：' :  eIndex == 0 ? '检定误差：': ''}}</view>
          <view class="weui-cells weui-cells_after-title right-picker ms-center">
            <view class="ms-sign">{{ minusSignsObjects[sIndex].name}} </view>
          </view>
        </div>
      </picker>
      <view class="right-arrow" style="margin-top: -40px;"><i class="fa fa-angle-right ms-arrow" aria-hidden="true" style="margin-top: 42px;"></i></view>
      <view class="weui-cells weui-cells_after-title ms-input-box">
        <view class="weui-cell weui-cell_input ms-input-inner-box">
          <input class="weui-input ms-input" @blur="fnBlurInputWC(event)" @input="fnInputWC(event)"  type="digit" v-model="wc" maxlength="10" placeholder="请输入误差值" />
        </view>
      </view>
    </view>

      <view v-if="eIndex == 1" class="section fr-inline">
        <picker class="row-picker" @change="bindTypesTAChange" value="{{sIndexTA}}" range="{{minusSignsTA}}">
          <div class="flex-h">
            <view class="weui-cells__title section-title">TA检定误差：</view>
            <view class="weui-cells weui-cells_after-title right-picker ms-center">
              <view class="ms-sign">{{ minusSignsTA[sIndexTA]}} </view>
            </view>
          </div>
        </picker>
        <view class="right-arrow " style="margin-top: -40px;"><i class="fa fa-angle-right ms-arrow" aria-hidden="true"></i></view>
        <view class="weui-cells weui-cells_after-title ms-input-box">
          <view class="weui-cell weui-cell_input ms-input-inner-box">
            <input class="weui-input ms-input" @blur="fnBlurInputWC1(event)" @input="fnInputWC1(event)"  type="digit" v-model="wc1" maxlength="10" placeholder="请输入误差值" />
          </view>
        </view>
      </view>

    <view class="weui-cells__title section-mode-title"></view>
    <view class="section">
      <picker class="row-picker" @change="bindDYHGBSChange" value="{{dyhgbIndex}}" range="{{dyhgbs}}">
        <view class="flex-h">
          <view class="weui-cells__title section-title">电压互感器变比：</view>
          <view class="right-center-view">{{ objectdyhgbs[dyhgbIndex].name }} </view>
        </view>
      </picker>
      <view class="right-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></view>
    </view>

    <div class="section flex-h">
      <view class="weui-cells__title section-title half-width">电流互感器变比：</view>
      <view class="weui-cells weui-cells_after-title left-spl">
        <view class="weui-cell weui-cell_input right-center-view">
          <input class="weui-input  felix-input " @blur="fnBlurDLGHB(event)" @input="fnInputDLGHB(event)" maxlength="6"  type="number" v-model='dlhgb' placeholder="请输入变比"/>
        </view>
      </view>
    </div>

    <view class="weui-cells__title section-mode-title" v-if="getGx!='∞'">电能表抄见电量:</view>
    <div class="section flex-h" v-if="getGx!='∞'">
      <view class="weui-cells__title section-title half-width"><span class="strong red">上次校验或换装至误差更正之日二分之一时刻</span>总电量示值(kWh) ：</view>
      <view class="weui-cells weui-cells_after-title left-spl">
        <view class="weui-cell weui-cell_input right-center-view jz-input">
          <input class="weui-input  felix-input "  @blur="fnBlurInputW1(event)" @input="fnInputW1(event)" v-model="w1" maxlength="9" type="digit" placeholder="请输入总电量"/>
        </view>
      </view>
    </div>

    <div class="section flex-h" v-if="getGx!='∞'">
      <view class="weui-cells__title section-title half-width"><span class="strong red">误差更正完毕后</span>总电量示值(kWh) ：</view>
      <view class="weui-cells weui-cells_after-title left-spl">
        <view class="weui-cell weui-cell_input right-center-view wczl">
          <input class="weui-input  felix-input " v-model="w2" type="digit"   @blur="fnBlurInputW2(event)" @input="fnInputW2(event)" maxlength="9"  type="digit" placeholder="请输入总电量"/>
        </view>
      </view>
    </div>

    <div class="section flex-h" v-if="getGx!='∞'">
      <view class="weui-cells__title section-title half-width">电价(元/kWh)：</view>
      <view class="weui-cell weui-cell_input  right-center-view">
        <input class="weui-input felix-input" @blur="fnBlurInputDJ(event)" @input="fnInputDJ(event)" type="digit" v-model='dj' maxlength="6" placeholder="请输入电价" />
      </view>
    </div>

    <button type="primary" :disabled="calcBtnDisabled " class="btn-calc"  bindtap="primary" @click="fnCalcResult"> 计算 </button>
    <felix-dialog @close="fnCloseMark" v-bind:gx="dialog.gx" v-bind:hidden-dialog="dialog.hiddenDialog" :p="dialog.p" v-bind:wz="dialog.wz" v-bind:rate="dialog.rate" v-bind:bdl="dialog.bdl" >
      <span slot="title_bdl">
        <span class="red">{{preFix}}</span>电量(kWh)：
      </span>
      <span slot="title_p">
        <span class="red">{{preFix}}</span>电费(元)：
      </span>
    </felix-dialog>
    </div>
    <empty-page v-bind:show="showEmptyPage"/>
  </div>
</template>
<script>
  import emptyPage from '../../components/ToDevPage'
  import felixDialog from '../../components/Felix-Dialog';
  import Model from '../../utils/model'
  const equipments = ['电能表', '互感器', '二次回路压降'];
  const minusSigns = ['+', '-'];
  const dyhgbs = ['220V/220V','0.38kV/0.38kV', '10kV/0.1kV', '35kV/0.1kV', '66kV/0.1kV', '110kV/0.1kV', '220kV/0.1kV'];
  const objectdyhgbs = [{name:'220V/220V', rate: 1}, {name:'0.38kV/0.38kV', rate: 1},{name:'10kV/0.1kV',  rate: 100 },
    {name:'35kV/0.1kV',rate: 350}, {name:'66kV/0.1kV', rate: 660},{name: '110kV/0.1kV', rate: 1100},{name: '220kV/0.1kV', rate: 2200}];
  const minusSignsObjects=[{name: '+'},{name: '-'}];
  const minusSignsTA =  ['+', '-'];

  export default {
  components: {emptyPage, felixDialog},
  data(){
    return {
      eIndex: 0,
      sIndex: 0,
      sIndexTA: 0,
      minusSignsTA: minusSignsTA,
      showEmptyPage: false,
      equipments: equipments,
      minusSigns: minusSigns,
      dyhgbs: dyhgbs,
      objectdyhgbs: objectdyhgbs,
      minusSignsObjects: minusSignsObjects,
      dyhgbIndex: 0,
      dlhgb: 1,
      wc: '1.0000',
      wc1: '1.0000',
      model:new Model(),
      preFix: "补",
      dialog: {
        p: 0,
        gx: 0,
        rate: 0,
        wz:0,
        bdl: 0,
        hiddenDialog: true
      },
      w1: '0.00',
      w2: '0.00',
      dj: '1.0000'
    }
  },
  methods: {
    bindEquipmentsChange(e){
      this.eIndex = e.target.value;
      if(this.eIndex == 2){
        this.showEmptyPage = true;
      }else{
        this.showEmptyPage = false;
      }
    },
    bindTypesTAChange(e){
      this.sIndexTA = e.target.value;
    },
    bindTypesChange(e){
      this.sIndex = e.target.value;
    },
    bindDYHGBSChange(e){
      this.dyhgbIndex = e.target.value;
    },
    fnInputWC(e){
      this.wc = this.validateDigitInput(this.wc);
    },
    fnInputWC1(e){
      this.wc1 = this.validateDigitInput(this.wc1);
    },
    validateDigitInput(d){
      d = (d + '').replace(/[^(0-9.)]/ig,"");
      if(d.indexOf(".") > 0) {
        d = (d + '').replace(/[.]+/ig,".");
      }
      return d;
    },
    fnInputDLGHB(e) {
      this.dlhgb = this.validateDigitInput(this.dlhgb);
      if(this.dlhgb >=2000) this.dlhgb = 2000;
    },
    fnBlurDLGHB(e) {
      if(this.dlhgb <= 1) this.dlhgb = 1;
      if(this.dlhgb >= 2000) this.dlhgb = 2000;
      if(this.dlhgb % 0.5 > 0) {
        console.log("数值错误");
      }
    },
    fnBlurInputWC(e){
      this.wc = this.validateBlurDigit(this.wc, 4);
      if(parseFloat(this.wc) >= 1) {
        this.wc = '1.0000';
      }else if(parseFloat(this.wc) <= 0) {
        this.wc = '0.0000';
      }
    },
    fnBlurInputWC1(e){
      this.wc1 = this.validateBlurDigit(this.wc1, 4);
      if(parseFloat(this.wc1) >= 1) {
        this.wc1 = '1.0000';
      }else if(parseFloat(this.wc1) <= 0) {
        this.wc1 = '0.0000';
      }
    },
    fnInputDJ(e){
      this.dj = this.validateDigitInput(this.dj);
    },
    validateBlurDigit(v, digitNum){
      digitNum = digitNum || 2;
      v = (v + '').replace(/[^(0-9.)]/ig,"");
      if(v.indexOf(".") > 0) {
        v = (v + '').replace(/[.]+/ig,".");
      }
      if(v === '') return '';
      v = parseFloat(v).toFixed(digitNum);
      return v;
    },
    fnBlurInputDJ(e){
      this.dj = this.validateBlurDigit(this.dj, 4);
      if(parseFloat(this.dj) > 2) {
        this.dj = '2.0000';
      }else if(parseFloat(this.dj) < 0.0001) {
        this.dj = '0.0001';
      }
    },
    fnInputW1(e){
      this.w1 = this.validateDigitInput(this.w1)
      if(this.w1.length>=6 && this.w1.indexOf(".") == -1){
        this.w1 = this.w1.substr(0,6);
      }
    },
    fnInputW2(e){
      this.w2 = this.validateDigitInput(this.w2)
      if(this.w2.length>=6 && this.w2.indexOf(".") == -1){
        this.w2 = this.w2.substr(0,6);
      }
    },
    fnBlurInputW1(e){
      this.w1 = this.validateBlurDigit(this.w1);
      if(this.w1 === 0) this.w1='0.0000';
      if(parseFloat(this.w1) > parseFloat(this.w2)) {
        this.w2 = this.w1;
      }
    },
    fnBlurInputW2(e){
      this.w2 = this.validateBlurDigit(this.w2);
      if(this.w2 == 0) this.w2='';
      if(parseFloat(this.w1) > parseFloat(this.w2)) {
        this.w2 = this.w1;
      }
    },
    fnCalcResult() {
      let digitSign = this.minusSignsObjects[this.sIndex].name;
      let f = parseFloat(this.wc) * (digitSign == '+' ? 1 : -1);
      let f2 = parseFloat(this.wc1) * (digitSign == '+' ? 1 : -1);
      let gx = this.sIndex == 0 ? (f == -1 ? '∞' : 1/(1+f)) : this.sIndex == 1 ? (1+f)*(1+f2) == 0 ? '∞' : 1/((1+f)*(1+f2)) : '∞';
      let k = parseFloat(this.objectdyhgbs[this.dyhgbIndex].rate) * this.dlhgb;
      let w = this.w2 - this.w1;
      let vW = gx == '∞' ? 1 : gx ? (1-gx) * w : (0-gx) * w ;
      let vS = this.dj * vW;
      this.model.gx = gx == '∞' ? '∞' : parseFloat(gx).toFixed(4);
      this.model.w1 = this.w1;
      this.model.w2 = this.w2;
      this.model.Dj = this.dj;
      this.model.k = k;
      this.preFix = this.model.getPreFix();
      this.dialog.gx = this.model.gx;
      this.dialog.rate = this.model.k;
      this.dialog.p = this.model.getP();
      this.dialog.wz = this.model.dW * k;
      this.dialog.bdl = this.model.w;
      this.dialog.hiddenDialog =false;/*
      this.dialog.title_bdl = digitSign == '+' ? '<span class="red">退</span>电量(kWh)：' : '<span class="red">补</span>电量(kWh)：';
      this.dialog.title_p = digitSign == '-' ? '<span class="red">退</span>电费(元)：' : '<span class="red">补</span>电费(元)：';*/

    },
    fnCloseMark(){
      this.dialog.hiddenDialog = true;
    },
  },
  computed: {
    calcBtnDisabled() {
      return !(this.w1 != '' && parseFloat(this.w1) >= 0 && parseFloat(this.w2) >= parseFloat(this.w1));
    },
    getGx(){
      let digitSign = this.minusSignsObjects[this.sIndex].name;
      let f = parseFloat(this.wc) * (digitSign == '+' ? 1 : -1);
      let f2 = parseFloat(this.wc1) * (digitSign == '+' ? 1 : -1);
      let gx = this.sIndex == 0 ? (f == -1 ? '∞' : 1/(1+f)) : this.sIndex == 1 ? (1+f)*(1+f2) == 0 ? '∞' : 1/((1+f)*(1+f2)) : '∞';
      return gx;
    }
  }

}
</script>
<style>
  page{
    height: 100%;
    background-color: #DDD;
  }
  .section {
    height: auto;
    padding: 10px 20px;
    line-height: 2;
    background-color: #FFF;
    border-bottom: solid 1px #EEE;
    border-top: solid 1px #EEE;
  }
  .section-mode-title {
    margin-top: 10px;
    color: #999;
    margin-bottom: 4px;
    margin-left: 20px;
  }
  .row-picker {
    width: 100%;
  }
  .right-arrow {
    right: 0px;
    font-size: 30px;
    position: absolute;
    margin-right: 20px;
    margin-top: -46.25px;
  }
  .row-picker{
    display: flex;
  }
  .flex-h, .fr-inline {
    display: flex;
  }
  .btn-calc {
    width: 90%;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .ms-arrow{
    margin-top: 44px;
    margin-right: 180px;
  }
  .strong{
    font-weight: bold;
  }
  .ms-input-box {
    margin-top: 5px;
    border-left: solid 1px #EEE;
    width: 100%;
  }
  .right-center-view{
    margin-top: 1px;
    width: 50%;
    position: absolute;
    right: 40px;
    text-align: right;
  }
  .right-picker{
    position: absolute;
    right: 5px;
    margin-top: 2px;
    width: 100%;
  }
  .ms-input-inner-box{
    margin-left: 20px;
  }
  .ms-input{
    width: 80%;
    margin-right: 10px;
    text-align: right;
  }
  .ms-center{
    margin-left: 20px;
  }
  .ms-sign {
    margin-left: 130px;
  }

  .half-width{
    width: 50%;
  }
  .wczl{
    width: 40%;
    margin-top: 20px;
  }
  .jz-input{
    width: 40%;
    margin-top: 35px;
  }
  .hiddenFrom{
    display: none;
  }
  .red{
    color: #F00;
    font-weight: bold;

  }
</style>
