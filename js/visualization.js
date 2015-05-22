/**
 * Created by wubincen on 15/5/21.
 */

/**
 * 绘制饼图
 * @param container  图容器的div id
 * @param chart_data 图数据
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

/**
 * 柱状图
 * @param container div容器
 * @param chart_data 图数据
 */
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
            data:chart_data['names'],
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

/**
 * 根据时间变化的图
 * @param container 容器
 * @param chart_data 数据
 */
function show_time_chart(container, chart_data) {
    var option = {
        timeline:{
            data:chart_data['times'],
            label : {
                formatter : function(s) {
                    return s.slice(0, 4);
                }
            },
            autoPlay : true,
            playInterval : 500
        },
        options:chart_data['datas']
    };
    var myChart = echarts.init(document.getElementById(container));
    myChart.setOption(option);
}

/**
 * 折线图
 * @param container
 * @param chart_data
 */
function show_line_chart(container, chart_data) {
    var option = {
        title : {
            text: chart_data['title'],
            //subtext: '纯属虚构'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:chart_data['names'],
            y:'bottom'
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
                boundaryGap : false,
                data : chart_data['labels']
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value}'
                }
            }
        ],
        series : chart_data['values']//[
    };
    var myChart = echarts.init(document.getElementById(container));
    myChart.setOption(option);
}



var infos = {};

function show_net_chart(container, chart_data) {
    var option = {
        title : {
            text: chart_data['title'],
            //subtext: '数据来自人立方',
            x:'left',
            y:'top'
        },
        tooltip : {
            show: false,
            trigger: 'item',
            formatter: '{a} : {b}'
        },
        toolbox: {
            show : true,
            feature : {
                restore : {show: true},
                magicType: {show: true, type: ['force', 'chord']},
                saveAsImage : {show: true}
            }
        },
        legend: {
            show: false,
            x: 'right',
            y: 'bottom',
            data:chart_data['labels']
        },
        series : [
            {
                type:'force',
                name : 'Relationship',
                ribbonType: false,
                categories : chart_data['categories'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#333'
                            }
                        },
                        nodeStyle : {
                            brushType : 'both',
                            borderColor : 'rgba(255,215,0,0.4)',
                            borderWidth : 1
                        },
                        linkStyle: {
                            type: 'curve'
                        }
                    },
                    emphasis: {
                        label: {
                            show: false
                            // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                        },
                        nodeStyle : {
                            //r: 30
                        },
                        linkStyle : {}
                    }
                },
                useWorker: false,
                minRadius : 20,
                maxRadius : 50,
                gravity: 1.1,
                scaling: 1.1,
                //roam: 'move',
                nodes:chart_data['nodes'],
                links : chart_data['links']
            }
        ]
    };



    require(
        [
            'echarts',
            'echarts/chart/line',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
            'echarts/chart/bar',
            'echarts/chart/force'
        ],
        function (ec) {

            var ecConfig = require('echarts/config');
            function focus(param) {
                var data = param.data;
                var links = option.series[0].links;
                var nodes = option.series[0].nodes;
                if (data.source !== undefined && data.target !== undefined) { //点击的是边
                    //$('#sm-chart-container').append('<div id="sm-chart-container-info">asd</div>');

                    var sourceNode = nodes.filter(function (n) {return n.name == data.source})[0];
                    var targetNode = nodes.filter(function (n) {return n.name == data.target})[0];
                    console.log("选中了边 " + sourceNode.name + ' -> ' + targetNode.name + ' (' + data.weight + ')');
                } else { // 点击的是点
                    console.log("选中了" + data.name + '(' + data.value + ')');

                    $('#sm-chart-info').html('Information: <br>' + infos[data.name]);
                }
            }
            var myChart = echarts.init(document.getElementById(container));
            myChart.on(ecConfig.EVENT.CLICK, focus)
            //myChart.on(ecConfig.EVENT.HOVER, focus);
            myChart.on(ecConfig.EVENT.MOUSEOVER, focus);



            //myChart.on(ecConfig.EVENT.FORCE_LAYOUT_END, function () {
            //    console.log(myChart.chart.force.getPosition());
            //});
            myChart.setOption(option);
            var myChart = ec.init(document.getElementById('main'));
            myChart.setOption(option);
}
);


}


/**
 * 生成饼图数据
 * @param title 图的标题
 * @param name 图中的元素代表的意义
 * @param labels 有多少块分块
 * @param raw_data 数组，分块对应的数据量
 */
function generate_pie_chart_data(title, name, labels, raw_data) {
    var ret = {
        title:title,
        name:name,
        labels:labels
    };
    var values = [];
    for (var i = 0; i < raw_data.length; ++i)
    values.push({value:raw_data[i], name:labels[i]});
    ret['values'] = values;
    return ret;
}

/**
 * 生成柱状图数据
 * @param title
 * @param names
 * @param labels
 * @param raw_data
 * @returns {{title: *, names: *, labels: *}}
 */
function generate_bar_chart_data(title, names, labels, raw_data) {
    var ret = {
        title:title,
        names:names,
        labels:labels
    };

    ret['values'] = [];
    for (var i = 0; i < names.length; ++i) {
        var tmp = {
            name: names[i],
            type:'bar',
            data:raw_data[i]
        };
        ret['values'].push(tmp);
    }


    return ret;
}

/**
 * 生成折线图数据
 * @param title
 * @param names
 * @param labels
 * @param raw_data
 */
function generate_line_chart_data(title, names, labels, raw_data) {
    var ret = {
        title:title,
        names:names,
        labels:labels
    };
    ret['values'] = [];
    for (var i = 0; i < names.length; ++i) {
        var tmp = {
            name: names[i],
            type:'line',
            data:raw_data[i]
        };
        ret['values'].push(tmp);
    }
    return ret;
}

function show_user_star_average(kind) {
    if (kind == null) kind = 0;
    if (kind == 0) {
        var chart_data = generate_pie_chart_data('The Distribution Of Average Number Of User\'s Stars',
            'The number of people',
            ['0.0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'],
            [0, 57, 0, 21448, 3930, 15113, 17065, 57128, 87008, 76000, 28088]
        );

        for (var i = 0; i < chart_data['labels'].length; ++i) {
            chart_data['labels'][i] += ' stars';
            chart_data['values'][i]['name'] += ' stars';
        }

        show_pie_chart('sm-chart-container', chart_data);
    }
    else if (kind==1){
        //var chart_data = {};
        //chart_data['title'] = 'The Distribution Of Average Number Of User\'s Stars';
        //chart_data['names'] = ['The number of people'];
        //chart_data['labels'] = ['0.0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'];


        var chart_data = generate_bar_chart_data('The Distribution Of Average Number Of User\'s Stars',
            ['The number of people'],
            ['0.0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'],
            [[0, 57, 0, 21448, 3930, 15112, 17065, 57128, 87008, 76000, 28088]]
        );


        for (var i = 0; i < chart_data['labels'].length; ++i)
        chart_data['labels'][i] = 'Average Stars: ' + chart_data['labels'][i];
        chart_data['values'][0]['markPoint'] = {
            data : [
                {name : 'maximum', value : 87008, xAxis: 8, yAxis: 87008, symbolSize:25},
                {name : 'minimum', value : 0, xAxis: 0, yAxis: 10, symbolSize:15},
                {name : 'minimum', value : 0, xAxis: 2, yAxis: 10, symbolSize:15}
            ]
        };
        chart_data['values'][0]['markLine'] = {
            data : [
                {type : 'average', name : 'average'}
            ]
        };
        show_bar_chart('sm-chart-container', chart_data);
    }
}

function show_user_fans(kind) {
    var raw_data = [[10, 354270], [20, 6880], [30, 2353], [40, 1107], [50, 612], [60, 339],
        [70, 258], [80, 186], [90, 127], [100, 95], [110, 74], [120, 60], [130, 35], [140, 39]];
    if (kind == null) kind = 0;
    if (kind == 0) {
        var labels = [];
        var datas = [];
        for (var i = 0; i < raw_data.length; ++i) {
            labels.push('[' + (raw_data[i][0] - 10) + ', ' + raw_data[i][0] + ')');
            datas.push(raw_data[i][1]);
        }
        console.log(labels);

        var chart_data = generate_pie_chart_data('The Distribution of Number of User\'s Fans',
        'The number of people', labels, datas
        );
        show_pie_chart('sm-chart-container', chart_data);
    }
    else if (kind == 1) {
        var labels = [];
        var datas = [];
        var tmp = [];
        for (var i = 0; i < raw_data.length; ++i) {
            labels.push('[' + (raw_data[i][0] - 10) + ', ' + raw_data[i][0] + ')');
            tmp.push(raw_data[i][1]);
        }
        datas.push(tmp);

        var chart_data = generate_bar_chart_data('The Distribution of Number of User\'s Fans',
            ['The number of people'], labels, datas);
        show_bar_chart('sm-chart-container', chart_data);
    }
}

function show_user_join(kind) {
    if (kind == null) kind = 0;
    if (kind == 0) {
        var chart_data = {};
        var raw_data = deal_with_user_join();
        chart_data['times'] = [];
        for (var i = 0; i < raw_data.length; ++i)
        chart_data['times'].push((2004+i)+'');
        chart_data['datas'] = [];
        for (var i = 0; i < raw_data.length; ++i) {
            var tmp = {
                title:{
                    text:'The Number of People Join in ' + (2004 + i)
                },
                tooltip : {'trigger':'axis'},
                legend : {
                    x:'right',
                    'data':['the number of people'],
                    'selected':{
                        'the number of people':true,
                    }
                },
                toolbox : {
                    'show':true,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    'feature':{
                        //'mark':{'show':true},
                        //'dataView':{'show':true,'readOnly':false},
                        'magicType':{'show':true,'type':['line','bar']},
                        'restore':{'show':true},
                        'saveAsImage':{'show':true}
                    }
                },
                calculable : true,
                grid : {'y':80,'y2':100},
                xAxis : [{
                    'type':'category',
                    'axisLabel':{'interval':0},
                    'data':[
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                    ]
                }],

                yAxis : [
                    {
                        'type':'value',
                        'name':'The Num of People',
                        'max':7000
                    }
                ],
                series:[
                    {
                        'name':'the number of people',
                        'type':'bar',
                        'markLine':{
                            symbol : ['arrow','none'],
                            symbolSize : [4, 2],
                            itemStyle : {
                                normal: {
                                    lineStyle: {color:'orange'},
                                    barBorderColor:'orange',
                                    label:{
                                        position:'left',
                                        formatter:function(params){
                                            return Math.round(params.value);
                                        },
                                        textStyle:{color:'orange'}
                                    }
                                }
                            },
                            'data':[{'type':'average','name':'average'}]
                        },
                        'data': raw_data[i]
                    }
                ]
            };
            chart_data['datas'].push(tmp);
        }


        show_time_chart('sm-chart-container', chart_data);
    }
    else if (kind == 1) {
        var raw_data = deal_with_user_join_year();
        console.log(raw_data);
        var labels = [];
        var datas = [];
        var tmp = [];
        for (var i = 0; i < raw_data.length; ++i) {
            labels.push((2004 + i) + '');
            tmp.push(raw_data[i][1]);
        }
        datas.push(tmp);
        console.log(datas);

        var chart_data = generate_line_chart_data('The Number Of People Join', ['the number of people'], labels, datas);
        show_line_chart('sm-chart-container', chart_data);
    }
}

function show_user_relationship(kind) {
    if (kind == null) kind = 0;
    if (kind == 0) {
        var raw_data = deal_with_user_relationship();
        var nodes = [];
        //var kk = 1;

        var mm = 0;
        for (var key in raw_data['nodes']) {

            infos[raw_data['nodes'][key]['name']] = 'Name: ' + raw_data['nodes'][key]['name'] + '<br>' +
            'Fans: ' + raw_data['nodes'][key]['fans'] + '<br>Stars: ' + raw_data['nodes'][key]['stars'] + '<br><br>'
            + 'Votes:<br>&nbsp;&nbsp;Funny: ' + raw_data['nodes'][key]['votes']['funny'] + '<br>'
            + '&nbsp;&nbsp;Useful: ' + raw_data['nodes'][key]['votes']['useful'] + '<br>&nbsp;&nbsp;Cool: ' + raw_data['nodes'][key]['votes']['cool'];

            if (raw_data['nodes'][key]['fans'] / 100 > mm) mm = raw_data['nodes'][key]['fans'] / 100 > mm;
            var tmp = {
                category:raw_data['nodes'][key]['fans'] / 100,
                name: raw_data['nodes'][key]['name'],
                value:raw_data['nodes'][key]['fans'] / 20 + 1
            };
            nodes.push(tmp);
        }

        var links = [];
        for (var i = 0; i < raw_data['edges'].length; ++i) {
            //console.log(raw_data['edges'][i]);
            var tmp = {
                source: raw_data['nodes'][raw_data['edges'][i][0]]['name'],
                target: raw_data['nodes'][raw_data['edges'][i][1]]['name'],
                weight: raw_data['nodes'][raw_data['edges'][i][0]]['fans'] + raw_data['nodes'][raw_data['edges'][i][1]]['fans'],
                name: 'Friend'
            };

            links.push(tmp);
        }

        var categories = [];
        var labels = [];
        for (var i = 0; i <= mm; ++i) {
            categories.push({name:'level' + i});
            labels.push('level' + i);
        }

        var chart_data = {
            title: 'Relationship',
            labels: labels,
            categories:categories,
            nodes: nodes,
            links: links
        };


        console.log('ooo');

        var left = $('#sm-chart-container').offset().left;
        var top = $('#sm-chart-container').offset().top;
        var height = $('#sm-chart-container').height();
        var width = $('#sm-chart-container').width();
        var ww = 150;
        var hh = 200;
        left = left + width - ww;
        top = top + height - hh;
        console.log('zz');
        $('body').append('<div id = "sm-chart-info" style=" left: ' + left +'px; top: ' +
        top + 'px; width:' + ww +'px; height:'+ hh +'px;">Information:</div>');


        show_net_chart('sm-chart-container', chart_data);

        console.log('uuu');




    }
}