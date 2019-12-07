<template>
    <div class="page">
        <div class="title">小程序使用说明及帮助</div>
        <div class="body">
            <article>
                <p>1 小程序退补算费的对象为结算计量点</p>
                <p>2 默认计量装置在故障或超差状态其综合倍率(k)不变</p>
                <p>3 电能表、互感器的有效退补算费条件为超过其最大容许误差</p>
                <p>4 小程序暂不支持直接输入抄见电量</p>
                <p>5 小程序中的“电价”均指电度电价</p>
                <p>6 小程序的计算负荷默认均为“感性”</p>
                <p>7 平均功率因数的选择：其取值首先采用电能计量装置故障期间的平均功率因数，其次可根据实际情况采用正常月份的平均功率因数</p>
                <p>8 小程序中的“退”、“补” 均为供电方相对于购电方，例如</p>
                <p>(1)当事人为供电公司与用电客户时</p>
                <p style="text-indent: 2em;">退：供电公司向用电客户退还电量电费</p>
                <p style="text-indent: 2em;"> 补：供电公司向用电客户追补电量电费</p>
                <p>(2)当事人为供电公司与发电客户时</p>
                <p style="text-indent: 2em;">退：发电客户向供电公司退还电量电费</p>
                <p style="text-indent: 2em;">补：发电客户向供电公司追补电量电费</p>
                <p>9 当更正系数的计算结果为∞时，本小程序不再适用，应选择比较法或测试法(详见 计量装置现场检验常用方法)</p>

            </article>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
.title {
    margin-top: 30px;
    font-size: 24px;
    width: 100%;
    text-align:center;

}
.body {
    padding: 20px 20px 50px 20px;
    line-height: 1.5;
}
</style>