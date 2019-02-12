// 前端一个url对应一个方法，这个方法和url进行绑定

var url = require("url");

var studetnDao = require("../dao/StudentDao");

// 把这些url都存放在这个map中
// key是url的名字，value是对应的这个方法
var path = new Map();

function getStudentPage(request, response) {
    var params = url.parse(request.url, true).query;

    studetnDao.queryStudentByPage(parseInt(params.offset), parseInt(params.limit), function (result) {
        studetnDao.getStudentCount(function (countResult) {
            // mysql查询出来的东西全是数组所以这个总数是数组的第一位
            response.writeHead(200);
            response.write(JSON.stringify({total: countResult[0].count, rows: result}));
            response.end();
        });
    })
}
path.set("/getStudentPage", getStudentPage);

// 是为了等下别人引入的时候判断是否导出了这个path
module.exports.path = path;