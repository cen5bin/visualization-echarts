/**
 * Created by wubincen on 15/5/22.
 */

//用户加入数量  按年月
var user_join = [['2011-07', 6718], ['2011-08', 6144], ['2011-03', 6121], ['2013-08', 6120], ['2011-06', 6059],
    ['2013-07', 6046], ['2011-05', 5958], ['2012-07', 5866], ['2011-04', 5762], ['2012-10', 5757], ['2013-06', 5756],
    ['2011-02', 5755], ['2010-07', 5729], ['2011-01', 5722], ['2013-05', 5703], ['2012-08', 5524], ['2013-03', 5495],
    ['2012-06', 5493], ['2012-03', 5485], ['2013-01', 5480], ['2012-09', 5472], ['2012-01', 5467], ['2011-10', 5466],
    ['2014-07', 5446], ['2010-08', 5400], ['2014-03', 5363], ['2011-11', 5284], ['2011-09', 5268], ['2014-05', 5251],
    ['2014-01', 5174], ['2013-04', 5138], ['2014-06', 5127], ['2013-09', 5086], ['2012-05', 5066], ['2014-04', 5019],
    ['2012-04', 5014], ['2012-12', 4965], ['2013-02', 4963], ['2011-12', 4953], ['2012-02', 4915], ['2012-11', 4873],
    ['2013-10', 4855], ['2010-12', 4563], ['2010-09', 4552], ['2014-02', 4531], ['2010-06', 4523], ['2014-08', 4485],
    ['2013-12', 4444], ['2013-11', 4397], ['2010-10', 4064], ['2010-11', 4060], ['2010-03', 3793], ['2010-01', 3662],
    ['2010-04', 3475], ['2010-05', 3470], ['2009-08', 3448], ['2010-02', 3431], ['2014-09', 3250], ['2009-07', 3127],
    ['2009-09', 2993], ['2014-10', 2950], ['2009-06', 2910], ['2009-04', 2817], ['2009-05', 2747], ['2009-10', 2652],
    ['2009-12', 2597], ['2009-01', 2511], ['2009-03', 2467], ['2009-02', 2351], ['2009-11', 2348], ['2014-11', 2176],
    ['2008-07', 1965], ['2008-08', 1896], ['2008-11', 1836], ['2008-12', 1802], ['2008-09', 1798], ['2014-12', 1733],
    ['2008-10', 1665], ['2008-06', 1642], ['2008-05', 1431], ['2008-03', 1393], ['2008-04', 1380], ['2008-01', 1303],
    ['2008-02', 1279], ['2007-08', 1103], ['2007-07', 1093], ['2007-12', 972], ['2007-11', 951],
    ['2007-06', 938], ['2007-09', 898], ['2007-10', 893], ['2007-05', 892], ['2007-04', 791], ['2007-01', 743],
    ['2007-03', 720], ['2007-02', 682], ['2006-08', 542], ['2006-12', 509], ['2006-10', 455], ['2006-09', 445],
    ['2006-11', 386], ['2006-07', 303], ['2006-06', 263], ['2006-03', 238], ['2006-04', 234], ['2006-05', 222],
    ['2006-01', 192], ['2006-02', 185], ['2005-12', 116], ['2005-08', 85], ['2005-07', 69], ['2005-10', 68],
    ['2005-11', 68], ['2005-09', 53], ['2005-04', 52], ['2005-05', 49], ['2005-03', 48], ['2005-06', 46], ['2004-10', 33],
    ['2005-02', 21], ['2005-01', 16], ['2004-12', 12], ['2004-11', 6]];

function deal_with_user_join() {
    var ret = [];
    for (var i = 0; i < 11; ++i) {
        var tmp = [];
        for (var j = 0; j < 12; ++j)
        tmp.push(0);
        ret.push(tmp);
    }
    for (var i = 0; i < user_join.length; ++i) {
        var date = user_join[i][0];
        var num = user_join[i][1];
        var year = parseInt(date.split('-')[0]) - 2004;
        var month = parseInt(date.split('-')[1]) - 1;
        ret[year][month] = num;
    }
    return ret;
}