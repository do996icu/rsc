<template>
    <div class="page">
        <div class="title">小程序使用说明及帮助</div>
        <div class="body">
            <article>
                <p>1 三相三线电能表错误接线检查常用方法：</p>
                <p class="font-bold">力矩法</p>
                <p class="font-bold">向量图法</p>
                <p>2 三相四线电能表错误接线检查常用方法：</p>
                <p class="font-bold">实负荷比较法</p>
                <p style="text-indent: 2em;">将电能表反映的功率与电能计量装置实际所承载的功率进行比较，也可将线路中的实际功率计算电能表转动一定圈数所需的时间与实际测得时间进行比较，以判断电能计量装置是否正常，这种方法就是实负荷比较法，一般称为瓦秒法。</p>
                <p style="text-indent: 2em;">在反窃电或计量装置周期检查时，瓦秒法运用最为广泛。在现场有负荷情况下，通过钳形电流表测量实际负荷电流大小，并换算为功率，然后计算电能表转动一定圈数(脉冲闪烁一定次数)所需要的时间，判断电能表走度是否正常。在现场没有负荷情况下，使用自带的1Kw电吹风或灯泡，再用上述方法判断电能表走度是否正常。</p>
                <p class="font-bold">逐项检查法</p>
                <p style="text-indent: 2em;">在电能表三相接入有效负荷的条件下，断开另外两个元件的电压连接片，让某一元件单独工作，观察电能表转动或脉冲闪烁频率，若正常，则说明该相接线正确，这种现场 检查方法就是逐项检查法。</p>
                <p class="font-bold">电压电流法</p>
                <p style="text-indent: 2em;">使用万用表和钳形电流表测量电能表接入的电压，电流值，通过与正常运行状态下电压电流值比较，从而判断计量装置是否正常，这种方法就是电压电流法。</p>
                <p class="font-bold">向量图法</p>
                <p>3 电能表现场检验方法：</p>
                <p>瓦秒法(定转测时法、定时测转法)</p>
                <p class="font-bold">定转测时法</p>
                <p class="font-bold">定时测转法</p>
                <p>标准电能表法(定低频脉冲数比较法、高频脉冲预置法)</p>
                <p class="font-bold">定低频脉冲数比较法</p>
                <p class="font-bold">高频脉冲预置法</p>
                
                

                <p>4 其他常用方法</p>
                <p class="font-bold">比较法</p>
                <p style="text-indent: 2em;">比较法又称估算法，在难以推导出电量更正系数的情况下，利用此方法推算出需退补的电量值。此方法有以下几种方式：</p>
                <p style="text-indent: 2em;">(1)以电能量采集系统的有段数据为参考，并综合考虑正常时期电力线路同比功率时的计量状况，推断出需退补的电量值。</p>
                <p style="text-indent: 2em;">(2)以下一级或对侧电能计量装置所计电量，并考虑相应的损耗情况。</p>
                <p style="text-indent: 2em;">(3)以计量正常月份电量或同期正常月份电量为基准，以及用户值班记录，用电负荷等情况，进行综合考虑，推算出需退补的电量值。</p>
                <p style="text-indent: 2em;">(4)以更正后的计量装置所计电量(一般为一个抄表周期)为基准，以及用电负荷等情况，进行综合考虑，推算出徐腿部的电量值。</p>
                <p style="text-indent: 2em;">(5)以同一计量装置中其他正确计量单元(副)或以主(副)计量装置正确计量的电量为基准，以及用户值班记录，用电负荷等情况，进行综合考虑，推算出需退补的电量值。</p>


                <p class="font-bold">测试法</p>
                <p style="text-indent: 2em;">通过在保持电能计量装置错误计量的同时，在该计量回路中另按正确接线接入正确的电能计量装置，并选取具有代表性的负荷运行计量一段时间，然后用正确接线电能表所计量电能量w，除以同事间内错误计量的电能量w’推导出电量更正系数k=w /w’，计算出需退补的电量值。</p>
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
    font-size: 2em;
    width: 100%;
    text-align:center;

}
.body {
    padding: 20px 20px 50px 20px;
    line-height: 1.5;
}
.font-bold {
    font-weight: bold;
}
</style>