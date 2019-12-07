<template>
    <div class="bg-color">
        <div class="condition-01">
            <label class="label">表尾接线相别：</label>
            <radio-group class="radio-group">
                <div class="h-flex">
                    <label class="radio felix-radio" v-for="(item, index) in items" :key="item.name">
                        <radio :key="'key_' + index" @click="radioChange" :id="item.name" :value="item.name" :checked="item.checked"/> {{item.value}}
                    </label>
                </div>
            </radio-group>

            <felix-checkbox  title="表尾进出反接(点选表示反接)：" :items="elements" @getResult="checkboxChange"></felix-checkbox>
        </div>

        <div class="condition-01">
            <div class="h-section">
                <view class="weui-cells__title section-title line-height-2-5">电压互感器变比：</view>
                <view class="weui-cells weui-cells_after-title">
                    <view class="weui-cell weui-cell_input">
                        <input class="weui-input read felix-input input-disabled" disabled="true" value="220V/220V"/>
                    </view>
                </view>
            </div>
            <div class="h-section">
                <view class="weui-cells__title section-title line-height-2-5">电流互感器变比：</view>
                <view class="weui-cells weui-cells_after-title">
                    <view class="weui-cell weui-cell_input">
                        <input class="weui-input  felix-input" @blur="fnBlurDLGHB(event)" @input="fnInputDLGHB(event)" maxlength="2"  type="number" v-model='dlhgb' placeholder="请输入变比"/>
                    </view>
                </view>
            </div>
        </div>
        <div class="condition-01">
          <view class="weui-cells__title section-mode-title">电能表<span class="red">{{isGx ? '正向有功' : '反向有功'}}</span>抄见电量：</view>
            <div class="h-section">
              <view class="weui-cells__title section-title">故障发生时刻<span class="red">{{isGx ? '正向有功' : '反向有功'}}</span>总电量示值(kWh)</view>
              <view class="weui-cell weui-cell_input">
                  <input class="weui-input  felix-input" @blur="fnBlurInputW1(event)" @input="fnInputW1(event)" v-model="w1" type="digit"  maxlength="9" placeholder="输入{{isGx ? '正向' : '反向'}}有功总电量"/>
              </view>
            </div>
            <div class="h-section">
                <view class="weui-cells__title section-title">故障处理完毕<span class="red">{{isGx ? '正向有功' : '反向有功'}}</span>总电量示值(kWh)</view>
                <view class="weui-cells weui-cells_after-title">
                    <view class="weui-cell weui-cell_input">
                        <input class="weui-input  felix-input" v-model="w2" type="digit"   @blur="fnBlurInputW2(event)" @input="fnInputW2(event)" maxlength="9" placeholder="输入{{isGx ? '正向' : '反向'}}有功总电量"/>
                    </view>
                </view>
            </div>
            <div class="h-section">
                <view class="weui-cells__title section-title line-height-2-5 ">电价(元/kWh)：</view>
                <view class="weui-cells weui-cells_after-title">
                    <view class="weui-cell weui-cell_input">
                        <input class="weui-input felix-input" @blur="fnBlurInputDJ(event)" @input="fnInputDJ(event)" type="digit" v-model='dj' maxlength="6" placeholder="请输入{{isGx ? '正向' : '反向'}}有功总电量"/>
                    </view>
                </view>
            </div>
        </div>

        <button type="primary"  :disabled="calcBtnDisabled"  class="btn-calc"  bindtap="primary" @click="fnCalcResult"> 计算 </button>

        <view class="felix-dialog {{hiddenDialog ? 'showDialog' : ''}}">
            <view class="gray-mark"></view>
            <view class="dialog-view">
                <view class="dialog-title">计算结果</view>
                <view class="dialog-body">
                    <div class="row">
                        <view class="label-left">更正系数：</view>
                        <view class="value-right">{{dialog.gx}}</view>
                    </div>
                    <div class="row">
                        <view class="label-left">综合倍率：</view>
                        <view class="value-right">{{dialog.rate}}</view>
                    </div>
                    <div class="row">
                        <view class="label-left">抄见电量(kWh)：</view>
                        <view class="value-right">{{dialog.wz }}</view>
                    </div>
                    <div class="row">
                        <view class="label-left"><span class="red">{{preFix}}</span>电量(kWh)：</view>
                        <view class="value-right">{{ dialog.bdl}}</view>
                    </div>
                    <div class="row">
                        <view class="label-left"><span class="red">{{ preFix }}</span>电费(元)：</view>
                        <view class="value-right">{{ dialog.p}}</view>
                    </div>
                </view>
                <div class="dialog-menus">
                    <div class="dialog-close" @click="fnCloseDialog">关闭</div>
                </div>
            </view>
        </view>

    </div>
</template>
<script>
  import Model from '../../utils/model';
  import FelixCheckbox from '../../components/Felix-Checkbox'
const items = [{
    name: 'ln',
    checked: true,
    value: 'LN'
},{
    name: 'nl',
    checked: false,
    value: 'NL'
}];
let elements = [{
    name: 'first',
    checked: false,
    value: '一元件'
},{
    name: 'second',
    checked: false,
    value: '二元件'
}];
export default {
  components:{FelixCheckbox},
    data() {
        return {
          model: new Model(),
          items: items,
          elements: elements,
          hiddenDialog: true,
          isGx: true,
          dlhgb: 1,
          w1: '0.00',
          w2: '0.00',
          dj: '1.0000',
          preFix: "退",
          dialog: {
            p: 0,
            gx: 0,
            rate: 0,
            wz:0,
            bdl: 0,
            hiddenDialog: true
          },
        }
    },
    methods: {
        radioChange(e) {
            let same = this.items.filter(function(item){
                if(item.name == e.currentTarget.id && item.checked) {
                    return true;
                }
            });
            if(same.length > 0) return;
            this.items.map(function(item){
                item.checked = !item.checked;
            });

        },
        fnCalcResult(e) {
          this.hiddenDialog = false;
          this.model.w1 = this.w1;
          this.model.w2 = this.w2;
          this.model.Dj = this.dj;
          this.model.k = this.dlhgb;
          this.dialog.hiddenDialog = false;
          this.model.gx = this.isGx ? '1.0000' : '-1.0000';
          this.preFix = this.model.getPreFix();
          console.table(this.isGx ? '1.0000' : '-1.0000')
            this.dialog.rate = parseFloat(this.model.k).toFixed(4);
            this.dialog.gx = parseFloat(this.model.gx).toFixed(4);
            this.dialog.wz = parseFloat(this.model.dW * this.model.k).toFixed(2);
            this.dialog.bdl = parseFloat(this.model.w).toFixed(2);
            this.dialog.p = parseFloat(this.model.getP()).toFixed(2);
            console.table(this.dialog)
        },
        checkboxChange(e){
          this.isGx = !this.elements[0].checked;
          this.model.gx = this.isGx ? '1.0000' : '-1.0000';
        },
        fnInputDLGHB(e) {
            this.dlhgb = (this.dlhgb + "").replace(/[^0-9]/ig,"")
            if(this.dlhgb !='' && this.dlhgb <= 1) this.dlhgb = 1;
            if(this.dlhgb >=10) this.dlhgb = 10;
        },
        fnBlurDLGHB(e) {
            if(this.dlhgb <= 1) this.dlhgb = 1;
            if(this.dlhgb >=10) this.dlhgb = 10;
        },
        fnInputW1(e){
            this.w1 = this.validateDigitInput(this.w1);
            if(this.w1.length>=6 && this.w1.indexOf(".") == -1){
              this.w1 = this.w1.substr(0,6);
            }
            this.model.w1
        },
        fnInputW2(e){
            this.w2 = this.validateDigitInput(this.w2);
          if(this.w2.length>=6 && this.w2.indexOf(".") == -1){
            this.w2 = this.w2.substr(0,6);
          }
        },
        fnInputDJ(e){
            this.dj = this.validateDigitInput(this.dj);
            this.model.Dj = this.dj;
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
            if(v == '') v = 0;
            v = parseFloat(v).toFixed(digitNum);
            return v;
        },

        fnBlurInputW1(e){
            this.w1 = this.validateBlurDigit(this.w1)
            if(parseFloat(this.w1) > parseFloat(this.w2)) {
                this.w2 = this.w1;
            }
            this.model.w1 = this.w1;
        },
        fnBlurInputW2(e){
            this.w2 = this.validateBlurDigit(this.w2)
            if(parseFloat(this.w1) > parseFloat(this.w2)) {
                this.w2 = this.w1;
            }
            this.model.w2 = this.w2;
        },
        fnBlurInputDJ(e){
            this.dj = this.validateBlurDigit(this.dj, 4);
            if(parseFloat(this.dj) > 2) {
                this.dj = '2.0000';
            }else if(parseFloat(this.dj) < 0.0001) {
                this.dj = '0.0001';
            }
            this.model.Dj = this.dj;
        },
        fnCloseDialog(e) {
            this.hiddenDialog = true;
        },
        getGxParam () {
            this.model.gx = this.isGx ? '1.0000' : '-1.0000';
            return this.model.gx;
        },
        getKParam() {
            /**电流互感变比 */
            this.model.k = this.dlhgb;
            return this.dlhgb;
        }
    },
    computed: {
        calcBtnDisabled() {
          return !(this.w1 != '' && parseFloat(this.w1) >= 0 && parseFloat(this.w2) >= parseFloat(this.w1));
         },
        cjkwh: function(){
            return this.model.dW;
        },
        bdlkwh: function(){
            return this.model.w;
        },
        bdf: function(){
            return this.model.getP();
        }
    },
}
</script>
<style>
page{
  height: 100%;
  background-color: #DDD;
}
 .bg-color {
     padding-top: 20px;
 }
 .btn-calc {
   width: 90%;
   margin-top: 40px;
   margin-bottom: 40px;
 }
 .condition-01 {
    border: solid 1px #999;
    margin: 0px 20px 20px 20px;
    height: auto;
    padding: 10px;
    line-height: 2;
    border-radius: 8px;
 }
  .condition-02 {
    margin: 0px 20px;
  }
  .felix-input {
    background-color: #fff;
    text-align: center;
    height: 40px;
    border: 1px solid #999;
    border-radius: 6px;
    padding-top: 5px;
    width: 100%;
  }
  .h-section {
      display: flex;
      margin: 10px 0px;
  }
  .section-mode-title {
    line-height: 2;
    font-size: 20px;
    color: #666;
  }
  .h-flex {
      display: flex;
  }
  .section-title {
      width: 60%;
      padding: 0px 10px 0px 0px;
  }
  .felix-chebox:nth-child(2) {
      margin-left: 40px;
  }
  .felix-radio:nth-child(2) {
      margin-left: 40px;
  }
  .line-height-2-5 {
    line-height: 2.5;
  }
  .input-disabled {
      background-color: #EEE;
  }

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
      width: 34%;
      text-align: right;
  }
  .red{
    color: #F00;
  }
  .showDialog {
      display: none;
  }
</style>
