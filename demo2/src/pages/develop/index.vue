<template>
    <div class="page">
        <div class="body">
            <article>
                <p class="font-bold">开发人信息</p>
                <p>开发人：xxx、xxx、xxx</p>
                <p>开发单位：xxxxxxx公司</p>
                <p>联系电话：0931-854584578</p>
                <p>邮箱：1677212502@qq.com</p>
                <p class="font-bold">开发参考</p>
                <p>《电能计量装置接线检查与电能表现场检验》，宋文军，中国电力出版社，2013.4 </p>
                <p>《电能计量》，国网公司人力资源部，2010.11 </p>

            </article>
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
    }
}
</script>
<style>
.body {
    padding: 20px 20px 50px 20px;
    line-height: 1.5;
}
.font-bold {
    font-weight: bold;
}
</style>
