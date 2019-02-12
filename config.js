var fs = require("fs");

// 用键值对的形式去拆分全局配置，然后存放在这个变量当中
var globalConfig = {}

// 同步读取文件
var conf = fs.readFileSync("./server.conf");

// 将序列转为字符串，按行拆分，
var configArr = conf.toString().split("\r\n");
// 然后分类成键值对的形式
for (var i = 0; i < configArr.length; i++) {
    kv = configArr[i].split("=");
    if (kv.length != 2) {
        continue;
    }
    globalConfig[kv[0]] = kv[1]
}
// 如果静态文件这个属性存在
if (globalConfig.static_file_type) {
   // 我们用竖线拆分一下，等下用的时候好用
    globalConfig.static_file_type = globalConfig.static_file_type.split("|");
} else {
    // 这个属性是必须存在的，如果真的不存在了，我们就抛出一个异常
    throw new  Error ("配置文件异常,缺少static_file_type");
}
module.exports = globalConfig;



