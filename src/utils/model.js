class Model{
  constructor(){}

  set w1(w){
    this._w1 = parseFloat(w);
  }

  set w2(w){
    this._w2 = parseFloat(w);
  }

  set k(k){
    this._k = parseFloat(k);
  }

  set gx(gx){
    this._gx = parseFloat(gx);
  }

  get k(){
    return this._k;
  }
  get gx(){
    return this._gx;
  }

  /**
   * 电价
   * @param dj
   * @constructor
   */
  set Dj(dj){
    this._dj = parseFloat(dj);
  }

  /**
   * 抄见电量
   * @returns {number}
   */
  get dW(){
   /* console.log("w2=" + this._w2);
    console.log("w1=" + this._w1);
    console.log("w=" + (this._w2 - this._w1));
    console.log("ww=" + (parseFloat(this._w2) - parseFloat(this._w1)));*/
    return (this._w2  - this._w1);
  }

  /**
   * 补电量
   * @returns {number}
   */
  get w(){
    var v = this.dW;
    if(this._gx > 0){
      return (1 - this._gx) * v * this._k;
    }else if(this._gx < 0 ) {
      return -1 * this._gx  * v * this._k;
    }
    return 0;
  }

  /**
   * 获取电费
   * @returns {number}
   */
  getP = function(){
    return this.w * this._dj;
  }


  getPreFix = function(){
    console.log(this._gx);
    return this._gx > 0 && this._gx < 1 ? '退' : '补';
  }

  /**
   * 获取退补标签名称
   * @param gx gx参数
   * @param subFix 标签后缀部分
   * @returns {string} 标签全名称
   */
  getLabel = function (gx, subFix){
    if(parseFloat(this._gx) > 0 && parseFloat(this._gx) < 1){
      return "退" + subFix;
    }else {
      return "补" + subFix;
    }
  }

  /**
   * 当gx == '∞'时，获取抄见电量内容
   * @param gx
   * @returns {string}
   */
  getWTxtValue = function(gx) {
    if(gx == '∞'){
      return "根据历年、月用电量确定";
    }
  }

  /**
   * 当gx == '∞'时，获取电价内容
   * @param gx
   * @returns {string}
   */
  getPTxtValue = function(gx) {
    if(gx == '∞'){
      return "根据历年、月缴纳电费确定";
    }
  }
}
export  default Model;
