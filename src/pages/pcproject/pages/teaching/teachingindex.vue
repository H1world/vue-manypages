<template>
  <div>
      <div id='mainscore' style="width: 800px;height:400px;margin:0 auto;">
      </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/lines')
    export default{
        mounted(){
            this.indexechart();
        },
        methods:{
            indexechart(){
                var myChart = echarts.init(document.getElementById('mainscore'));

                var data = [["2018-07",116],["2018-08",129],["2018-09",135],["2018-10",86],["2018-11",500],["2018-12",85]];

                var dateList = data.map(function (item) {
                    return item[0];
                });
                var valueList = data.map(function (item) {
                    return item[1];
                });

                var option = {
                        // Make gradient line here
                    visualMap: [{
                        show: false,
                        type: 'continuous',
                        seriesIndex: 0,
                        min: 0,
                        max: 400
                    }],
                    title: [{
                        left: 'left',
                        text: '授课足迹：'
                    }],
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: [{
                        data: dateList
                    }],
                    yAxis: [{
                        splitLine: {show: false}
                    }, 
                    ],
                    grid: [{
                        // bottom: '60%'
                    }],
                    series: [{
                        type: 'line',
                        showSymbol: false,
                        data: valueList,
                    }]
                };

                myChart.setOption(option);
            }
        },
    }
</script>