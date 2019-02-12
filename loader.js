// 用于加载的

var fs = require("fs");
var globalConfig = require("./config");

// var controllerSet = []; // 负责所有页面的请求
var pathMap = new Map(); // 所有的url

var files = fs.readdirSync(globalConfig["web_path"]); // 读路径

for (var i = 0; i < files.length; i++) {
    var temp = require("./" + globalConfig["web_path"] + "/" + files[i]);
    if (temp.path) { // 不同的框架和不同的公司不同的约定,这里我们约定有path的是controller
        for (var [key, value] of temp.path) { // 遍历map
            if (pathMap.get(key) == null) {
                pathMap.set(key, value);
            } else {
                throw new Error("url path异常," + key)
            }
        }
        // controllerSet.push(temp);
    }
}
module.exports = pathMap;