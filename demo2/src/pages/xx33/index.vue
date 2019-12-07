<template>
    <div class="bg-color">
      <view class="section">
        <picker class="row-picker" @change="bindFaultTypesChange" value="{{faultIndex}}" range="{{faultTypes}}">
          <div class="flex-h">
          <view class="weui-cells__title section-title">故障类型：</view>
            <view class="weui-cells weui-cells_after-title right-picker">
              <view class="right-center-view">{{ faultTypes[faultIndex]}} </view>
            </view>
          </div>
        </picker>
        <view class="right-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></view>
      </view>

      <felix-radio v-bind:hidden="faultIndex != 0" title="表尾电压接线：" :items="vConnections" @getResult="onFRVchange"></felix-radio>

      <felix-radio v-bind:hidden="faultIndex != 1" title="电压断开相(点选表示断相)：" :items="vSplitConnections" @getResult="onFRVSplitchange"></felix-radio>

      <felix-radio v-bind:hidden="faultIndex != 2" title="电流失流相(点选表示失流)：" :items="iMissConnections" @getResult="onIMISSchange"></felix-radio>

      <felix-radio v-bind:hidden="faultIndex != 0" v-bind:is-mark="true" title="表尾电流接线：" :items="iConnections"  @getResult="onFRIchange"></felix-radio>

      <felix-checkbox v-bind:hidden="faultIndex != 0" title="表尾电流进出反接(点选表示反接)：" :items="elements" @getResult="onFCchange"></felix-checkbox>


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
            <input class="weui-input  felix-input " @blur="fnBlurDLGHB(event)" @input="fnInputDLGHB(event)" maxlength="6"  type="digit" v-model='dlhgb' placeholder="请输入变比"/>
          </view>
        </view>
      </div>

      <view class="section">
        <picker class="row-picker" mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" value="{{multiIndex}}" range="{{multiArray}}">
          <view class="flex-h">
            <view class="weui-cells__title section-title ">平均功率因数cosφ：</view>
            <view class="right-center-view">{{multiArray[0][multiIndex[0]]}} {{multiArray[1][multiIndex[1]]}} </view>
          </view>
        </picker>
        <view class="right-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></view>
      </view>

      <view class="weui-cells__title section-mode-title" v-if="getGx!='∞'">电能表<span class="red">{{!isGx ? '正向有功' : '反向有功'}}</span>抄见电量：</view>
      <div class="section flex-h" v-if="getGx!='∞'">
        <view class="weui-cells__title section-title half-width">故障发生时刻<span class="red">{{!isGx ? '正向有功' : '反向有功'}}</span>总电量示值(kWh)</view>
          <view class="weui-cell weui-cell_input line-2-v-center">
            <input class="weui-input  felix-input felix-right-input" @blur="fnBlurInputW1(event)" @input="fnInputW1(event)" v-model="w1" type="digit"  maxlength="9" placeholder="请输入{{!isGx ? '正向' : '反向'}}有功总电量"/>
          </view>
      </div>
      <div class="section flex-h" v-if="getGx!='∞'">
        <view class="weui-cells__title section-title half-width">故障处理完毕<span class="red">{{!isGx ? '正向有功' : '反向有功'}}</span>总电量示值(kWh)</view>
          <view class="weui-cell weui-cell_input  line-2-v-center">
            <input class="weui-input  felix-input felix-right-input" v-model="w2" type="digit"   @blur="fnBlurInputW2(event)" @input="fnInputW2(event)" maxlength="9" placeholder="请输入{{!isGx ? '正向' : '反向'}}有功总电量"/>
          </view>
      </div>
      <div class="section flex-h" v-if="getGx!='∞'">
        <view class="weui-cells__title section-title half-width">电价(元/kWh)：</view>
          <view class="weui-cell weui-cell_input  right-center-view">
            <input class="weui-input felix-input" @blur="fnBlurInputDJ(event)" @input="fnInputDJ(event)" type="digit" v-model='dj' maxlength="6" placeholder="请输入电价" />
          </view>
      </div>

  <button type="primary" :disabled="calcBtnDisabled" class="btn-calc"  bindtap="primary" @click="fnCalcResult"> 计算 </button>
  <felix-dialog @close="fnCloseMark" :gx="parseFloat(dialog.gx).toFixed(4)" :hidden-dialog="dialog.hiddenDialog" :p="parseFloat(dialog.p).toFixed(2)" :wz="parseFloat(dialog.wz).toFixed(2)" :rate="dialog.rate" :bdl="parseFloat(dialog.bdl).toFixed(2)" >
    <span slot="title_bdl">
          <span class="red">{{preFix}}</span>电量(kWh)：
       </span>
    <span slot="title_p">
        <span class="red">{{preFix}}</span>电费(元)：
      </span>
  </felix-dialog>

  </div>
</template>
<script>
  import gxParam from '../../utils/gx33Util';
  import felixDialog from '../../components/Felix-Dialog'
  import felixRadio from '../../components/Felix-Radio'
  import felixCheckbox from '../../components/Felix-Checkbox'
  import Model from '../../utils/model'
  const faultTypes = ['错误接线', '电压断相', '电流失流'];
  let vConnections = [{name: 'ABC', checked: true},
                          {name: 'BCA',checked: false},
                          {name: 'CAB', checked: false},
                          {name: 'ACB', checked: false},
                          {name: 'BAC', checked: false},
                          {name: 'CBA', checked: false}];

  let vSplitConnections = [{name: 'A', checked: true},
                          {name: 'B', checked: false},
                          {name: 'C', checked: false},
                          {name: 'AB', checked: false},
                          {name: 'BC', checked: false},
                          {name: 'AC', checked: false},
                          {name: 'ABC', checked: false}];

  let iMissConnections = [{name: 'A', checked: true}, {name: 'C', checked: false},{name:'AC', checked: false}];

  let iConnections = [{name: 'IaIc', checked: true}, {name: 'IcIa', checked: false}];
  let elements = [{
    name: 'first',
    checked: false,
    value: '一元件'
  },{
    name: 'second',
    checked: false,
    value: '二元件'
  }];
  const dyhgbs = ['10kV/0.1kV', '35kV/0.1kV', '66kV/0.1kV'];
  const objectdyhgbs = [{name:'10kV/0.1kV',  rate: 100 }, {name:'35kV/0.1kV',rate: 350}, {name:'66kV/0.1kV', rate: 660}];
  const mulitLeftArr = [];
  for(let i = 0.8; i<= 1; i+=0.01){
    mulitLeftArr.push(parseFloat(i).toFixed(2) + '');
  }
export default {
    components: {felixRadio, felixCheckbox, felixDialog},
    data(){
      return {
        faultTypes: faultTypes,
        objectFaultTypes: [
          {id: 0 , name: '错误接线'},
          {id: 1 , name: '电压断相'},
          {id: 2 , name: '电流失流'}
        ],
        preFix: "补",
        model: new Model(),
        dialog: {
          p: 0,
          gx: 0,
          rate: 0,
          wz:0,
          bdl: 0,
          hiddenDialog: true
        },
        faultIndex: 0,
        vConnections: vConnections,
        iConnections: iConnections,
        vSplitConnections: vSplitConnections,
        iMissConnections: iMissConnections,
        elements: elements,
        dyhgbs: dyhgbs,
        objectdyhgbs: objectdyhgbs,
        dyhgbIndex: 0,
        dlhgb: 1,
        multiIndex: [0,0],
        multiArray: [mulitLeftArr, ['L', 'C']],
        w1: '0.00',
        w2: '0.00',
        w: 0,
        dj: '1.0000',
        isGx: false,
        vc: 'ABC',
        vi: 'IaIc'
      }
    },
  methods: {
    bindFaultTypesChange(e){
      this.faultIndex = e.target.value;
      if(this.faultIndex == 0) {
        this.vConnections.map(function(item){item.checked = false});
        this.vConnections[0].checked = true;
        this.vc = this.vConnections[0].name;
      }else if(this.faultIndex == 1) {
        this.vSplitConnections.map(function(item){item.checked =false});
        this.vSplitConnections[0].checked = true;
        this.vc = this.vSplitConnections[0].name;
      }else if(this.faultIndex == 2){
        this.iMissConnections.map(function(item){item.checked = false});
        this.iMissConnections[0].checked = true;
        this.vc = this.iMissConnections[0].name;
      }
    },
    onFRVchange(result){
      this.vc = result;
      console.log(result);
    },
    onFRVSplitchange(result){
      this.vc = result;
      console.log(result);
    },
    onIMISSchange(result){
      this.vc = result;
      console.log(result);
    },
    onFRIchange(result){
      this.vi = result;
      console.log(result);
    },
    onFCchange(result){
      /*this.isGx = this.elements[0].checked;
      console.log(result);*/
    },
    bindDYHGBSChange(e) {
      this.dyhgbIndex = e.target.value;
      console.log(this.objectdyhgbs[this.dyhgbIndex].rate);
    },
    bindMultiPickerChange(e) {
      this.multiIndex = e.target.value;
    },
    bindMultiPickerColumnChange(e){
      console.log(e)
    },
    fnInputDLGHB(e) {
      this.dlhgb = this.validateDigitInput(this.dlhgb);
      if(this.dlhgb >=2000) this.dlhgb = 2000;
    },
    fnBlurDLGHB(e) {
      if(this.dlhgb <= 0.5) this.dlhgb = 0.5;
      if(this.dlhgb >= 2000) this.dlhgb = 2000;
      if(this.dlhgb % 0.5 > 0) {
        console.log("数值错误");
      }
    },
    fnCloseMark(){
      this.dialog.hiddenDialog = true;
      console.log();
    },
    fnCalcResult() {
      this.error_conn_calc();
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
    fnInputDJ(e){
      this.dj = this.validateDigitInput(this.dj);
    },
    validateDigitInput(d){
      d = (d + '').replace(/[^(0-9.)]/ig,"");
      if(d.indexOf(".") > 0) {
        d = (d + '').replace(/[.]+/ig,".");
      }
      return d;
    },
    validateBlurDigit(v, digitNum){
      digitNum = digitNum || 2;
      v = (v + '').replace(/[^(0-9.)]/ig,"");
      if(v.indexOf(".") > 0) {
        v = (v + '').replace(/[.]+/ig,".");
      }
      if(v == '') return '';
      v = parseFloat(v).toFixed(digitNum);
      return v;
    },
    fnBlurInputW1(e){
      this.w1 = this.validateBlurDigit(this.w1)
      if(parseFloat(this.w1) > parseFloat(this.w2)) {
        this.w2 = this.w1;
      }
    },
    fnBlurInputW2(e){
      this.w2 = this.validateBlurDigit(this.w2)
      if(parseFloat(this.w1) > parseFloat(this.w2)) {
        this.w2 = this.w1;
      }
    },
    fnBlurInputDJ(e){
      this.dj = this.validateBlurDigit(this.dj, 4);
      if(parseFloat(this.dj) > 2) {
        this.dj = '2.0000';
      }else if(parseFloat(this.dj) < 0.0001) {
        this.dj = '0.0001';
      }
    },
    error_conn_calc(){
      let gxId = this.faultIndex == 0 ? [this.vc, this.vi, 'first', !this.elements[0].checked, 'second', !this.elements[1].checked].join('_') : this.vc;
      let gxFns = gxParam[this.faultIndex].filter((item)=>item[gxId]);

      let gxFn = gxFns && gxFns[0] ? gxFns[0] : null;
      let gx = 0;
      let cos = this.multiArray[0][this.multiIndex[0]];
      if( typeof gxFn[gxId] == 'function'){
        gx = gxFn[gxId](cos);
      }
      this.model.gx = gx == null ? '∞' : parseFloat(gx).toFixed(4);
      this.isGx = parseFloat(gx) > 0 ? false : true;
      this.preFix = this.model.getPreFix();
      var rate =this.objectdyhgbs[this.dyhgbIndex].rate * this.dlhgb;
      this.model.k = rate;
      this.model.w1 = this.w1;
      this.model.w2 = this.w2;
      this.model.Dj = this.dj;
      this.w = gx *(this.w2 - this.w1);

      var tdl = this.isGx ? (1- this.isGx)* this.w : (0- this.isGx)* this.w ;

      var p = Math.abs(this.dj * tdl);

      this.dialog.hiddenDialog = false;
      this.dialog.p = this.model.getP();
      this.dialog.rate = this.model.k;
      this.dialog.gx = this.model.gx;
      this.dialog.wz = this.model.dW;
      this.dialog.bdl = this.model.w;
    },
  },
  computed:{
    calcBtnDisabled(){
      return !(this.w1 !='' && parseFloat(this.w1) >=0 &&  parseFloat(this.w2) >= parseFloat(this.w1 ));
    },
    getGx(){
      let gxId = this.faultIndex == 0 ? [this.vc, this.vi, 'first', !this.elements[0].checked, 'second', !this.elements[1].checked].join('_') : this.vc;
      let gxFns = gxParam[this.faultIndex].filter((item)=>item[gxId]);

      let gxFn = gxFns && gxFns[0] ? gxFns[0] : null;
      let gx = 0;
      let cos = this.multiArray[0][this.multiIndex[0]];
      if( typeof gxFn[gxId] == 'function'){
        gx = gxFn[gxId](cos);
      }
      gx == null ? '∞' : parseFloat(gx).toFixed(4);
      this.isGx = parseFloat(gx) > 0 ? false : true;
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
  .row-flex {
    display: flex;
    flex-flow: row wrap;
  }
  .radio-item1{
    width: 33%;
  }
  .flex-h {
    display: flex;
  }
  .left-spl{
    border-left: solid 1px #EEE;
  }
  .half-width{
    width: 50%;
  }
  .right-center-view{
    margin-top: 1px;
    position: absolute;
    right: 40px;
    text-align: right;
  }
  .line-2-v-center {
    margin-top: 20px;
    text-align: right;
  }
  .btn-calc {
    width: 90%;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .right-picker{
    position: absolute;
    right: 5px;
    margin-top: 2px;
    width: 100%;
  }
  .felix-right-input {
    margin-right: 20px;
  }
  .red{
    color:#F00;
    font-weight: bold;
  }
  .hidden{
    display: none;
  }
</style>
