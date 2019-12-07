<template>
    <div class="{{hidden ? 'hidden' : '' }}">
      <view class="weui-cells__title section-mode-title">{{title}}</view>
      <view class="section">
        <checkbox-group class="checkbox-group"  >
          <div class="row-flex">
            <label class="label radio-item1 felix-chebox" v-for="(el, i) in items" :key='el.name'  @click="checkboxChange(i)">
              <checkbox :checked='el.checked'/> {{el.value}}
            </label>
          </div>
        </checkbox-group>
      </view>
    </div>
</template>

<script>
  export default {
    name: "felix-checkbox",
    data(){
      return {
        result: String
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
      title: {
        type: String,
        default: ''
      },
      hidden: {
        type: Boolean,
        default: ()=> false,
      }
    },
    methods: {
      checkboxChange(index) {
        this.items[index].checked = !this.items[index].checked;
        this.result = this.items[index].name;
        this.$emit('getResult', this.result);
      }
    }
  };
</script>

<style scoped>
.hidden{
  display: none;
}
</style>
