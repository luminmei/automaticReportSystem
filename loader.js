var fs = require("fs");
var globalConfig = require("./config");

// 存放的是所有的controller
var controllerSet = [];

// 这个是所有的controller中的路径的汇总
var pathMap = new Map();

// 通过读取web的路径，路径存放在全局配置中(从一个文件夹中读出所有文件名字)
var files = fs.readdirSync(globalConfig["web_path"]);

for (var i = 0; i < files.length; i++) {
    // 拼接出文件的路径来
    // temp存放的是引入的文件的导出的路径的map
    var temp = require("./" + globalConfig["web_path"] + "/"  + files[i]);
    if (temp.path) { // 判断导入的这个文件是否导出了path
        for (var [key, value] of temp.path) { // 迭代器，遍历出值
            if (pathMap.get(key) == null) { // 判断本地的pathMap中是否存放了这个url了
                pathMap.set(key, value); // 如果没存过了就存进去,一个url只能交给一个方法处理
            } else {
                throw new Error("url path 异常, url: " + key);
            }
            controllerSet.push(temp);
        }
    }
}
module.exports = pathMap;