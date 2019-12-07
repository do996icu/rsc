<template>
    <div class="{{hidden ? 'hidden' : '' }}">
      <view class="weui-cells__title section-mode-title">{{title}}</view>
      <view class="section">
        <radio-group class="radio-group-i">
          <div class="row-flex">
            <label class="radio radio-item1 felix-radio" v-for="(item, i) in items" :key='item.name'  @click ="radioIChange(i)">
              <input type="radio" :checked='item.checked '/>
                <span v-if="isMark == true" v-for="(char, t) in item.name" :key="t">
                  <span  class="{{char == 'I' ? 'I' : 'a'}}">{{char}}</span>
                </span>
                <span v-if="isMark==false">{{item.name}}</span>
            </label>
          </div>
        </radio-group>
      </view>
    </div>
</template>
<script>
  export default {
    name: "felix-radio",
    data(){
      return {
        idx: 0
      }
    },
    props: {
      class:{
        type: String,
        default: ()=> ''
      },
      items: {
        type: Array,
        default: ()=>[]
      },
      isMark: {
        type: Boolean,
        default: ()=> false
      },
      title: {
        type: String,
        default: ''
      },
      hidden: {
        type: Boolean,
        default: ()=> false
      }
    },
    methods: {
      radioIChange(index) {
        this.idx = index;
        this.items.map(function(item){item.checked = false});
        this.items[this.idx].checked = true;
        console.log( this.items[this.idx].name);
        this.$emit('getResult', this.items[this.idx].name);
      }
    }
  };
</script>

<style scoped>
.hidden{
  display:none;
}
  .a{
    font-family: "Times New Roman";
    font-size: 10px;
  }
  .I{
    font-family: "Times New Roman";
  }
</style>
