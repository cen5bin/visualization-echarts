/**
 * Created by wubincen on 15/5/21.
 */

function show_pie_chart(container, chart_data) {

    var max_value = 0;
    for (var i = 0; i < chart_data['values'].length; ++i)
        if (chart_data['values'][i]['value'] > max_value)
        max_value = chart_data['values'][i]['value'];

    var option = {
        title : {
            text: chart_data['title'],
            //subtext: '纯属虚构',
            x:'left'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            //orient : 'horizon',
            x : 'center',
            y : 'bottom',
            data:chart_data['labels']
        },
        toolbox: {
            show : true,
            feature : {
                //mark : {show: true},
                //dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            height: '70%',
                            funnelAlign: 'left',
                            max: max_value
                        }
                    }
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:chart_data['name'],
                type:'pie',
                radius : '50%',
                center: ['50%', '50%'],
                data:chart_data['values']
            }
        ]
    };
    var myChart = echarts.init(document.getElementById(container));
    myChart.setOption(option);

}

function show_bar_chart(container, chart_data) {
    var option = {
        title : {
            text: chart_data['title'],
            //subtext: '纯属虚构'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['number of people'],
            y: 'bottom'
        },
        toolbox: {
            show : true,
            feature : {
                //mark : {show: true},
                //dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : chart_data['labels']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : chart_data['values']
    };
    var myChart = echarts.init(document.getElementById(container));
    myChart.setOption(option);

}

function show_user_star_average(kind) {
    if (kind == null) kind = 0;
    if (kind == 0) {
        var chart_data = {};
        chart_data['title'] = 'The Distribution Of Average Number Of User\'s Stars';
        chart_data['name'] = 'The number of people';
        chart_data['labels'] = ['0.0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'];
        chart_data['values'] = [
            {value: 0, name: '0.0'},
            {value: 57, name: '0.5'},
            {value: 0, name: '1.0'},
            {value: 21448, name: '1.5'},
            {value: 3930, name: '2.0'},
            {value: 15113, name: '2.5'},
            {value: 17065, name: '3.0'},
            {value: 57128, name: '3.5'},
            {value: 87008, name: '4.0'},
            {value: 76000, name: '4.5'},
            {value: 28088, name: '5.0'},
        ];

        for (var i = 0; i < chart_data['labels'].length; ++i) {
            chart_data['labels'][i] += ' stars';
            chart_data['values'][i]['name'] += ' stars';
        }

        show_pie_chart('sm-chart-container', chart_data);
    }
    else if (kind==1){
        var chart_data = {};
        chart_data['title'] = 'The Distribution Of Average Number Of User\'s Stars';
        chart_data['name'] = 'The number of people';
        chart_data['labels'] = ['0.0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'];
        for (var i = 0; i < chart_data['labels'].length; ++i)
        chart_data['labels'][i] = 'Average Stars: ' + chart_data['labels'][i];
        chart_data['values'] = [{
            name: 'number of people',
            type:'bar',
            data: [0, 57, 0, 21448, 3930, 15112, 17065, 57128, 87008, 76000, 28088],
            markPoint : {
                data : [
                    {name : 'maximum', value : 87008, xAxis: 8, yAxis: 87008, symbolSize:25},
                    {name : 'minimum', value : 0, xAxis: 0, yAxis: 10, symbolSize:15},
                    {name : 'minimum', value : 0, xAxis: 2, yAxis: 10, symbolSize:15}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : 'average'}
                ]
            }
        }];

        show_bar_chart('sm-chart-container', chart_data);
    }
}
