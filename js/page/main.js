define( [ 'controller',  'tool/echarts.min' ], function( BaseController, EChart ){
    
    
    var controller = BaseController.extend({

        run: function( data ){

            
            
            // 基于准备好的dom，初始化echarts实例
            var myChart = EChart.init(this.$('#chartBox')[0]);

            // 指定图表的配置项和数据
            var option = {
                tooltip : {
                    trigger: 'axis'
                },
                grid: {
                    left: '1%',
                    right: '2%',
                    bottom: '3%',
                    top: 5,
                    containLabel: true
                },
                xAxis : [{
                    type : 'category',
                    boundaryGap : false,
                    axisLabel:{
                        textStyle:{
                            color: '#bdc8dd'
                        }
                    },
                    splitLine:{
                        lineStyle:{
                            color: '#f2fbfe'
                        }
                    },
                    axisLine:{
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    data : ['05.3-05.9','05.10-05.16','05.17-05.23','05.24-05.30','06.24-05.30','06.24-05.30','06.24-05.30']
                }],
                yAxis : [{
                    type : 'value',
                    axisLabel:{
                        show: false
                    },
                    splitLine:{
                        lineStyle:{
                            color: '#f2fbfe'
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle:{
                            color: '#80d7e3'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                }],
                series : [{
                    type:'line',
                    lineStyle: {
                        normal: {
                            color: '#80d7e3'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: '#80d7e3',
                            opacity: 0.7
                        }
                    },
                    itemStyle:{
                        normal: {
                            color: '#2dcfc3',
                            borderColor:'#2dcfc3',
                            borderWidth: 3
                        }
                    },
                    data:[0, 132, 101, 134, 90, 230, 210]
                }]
            }
            
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            
        }
    })

    var pt = controller.prototype;
    
    return controller;
    
})