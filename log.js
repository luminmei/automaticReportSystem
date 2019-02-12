// 写日志的

var fs = require("fs");
// 获取时间的
var moment = require("moment");

var globalConfig = require("./config");

var fileName = globalConfig.log_path + globalConfig.log_name;

// 获取时间日期和时间戳
function nowDate() {
    var formatData = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    return formatData + " " + Date.now() + " ";
}

function log (data) {
    // 在这里打印，既能进日志，也打印在控制台
    console.log(data);
    fs.appendFile(fileName, nowDate() + data + "\r\n", {flag: "a"}, function () {});
}
module.exports = log;