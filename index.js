// 用于页面跳转的

var http = require("http");
var url  = require("url");
var fs = require("fs");
// 获取打印时间戳的函数
var log = require("./log");
// 引入全局配置
var globalConfig = require("./config.js");

// 引入所有的url
var loader = require("./loader");

// 创建服务，监听请求
http.createServer(function (request, response) {
     // 请求的url
     var pathname = url.parse(request.url).pathname;
     // 请求的参数
     // true参数是为了把他转换成对象
     var params = url.parse(request.url, true).query;

     log(pathname);

     // 请求分两种，一种是静态请求(请求页面后者其他静态文件)，一种的请求接口动态的
     var isStatic = isStaticRequest(pathname);
     if (isStatic) {
          // 如果是静态的我就给它去读文件后者是返回页面给它
          try {
               // 静态页面的路径在全局配置中
               var data = fs.readFileSync(globalConfig["page_path"] + pathname);
               // 读取到了就返回
               response.writeHead(200);
               response.write(data);
               response.end();
          } catch(e) {
               response.writeHead(404);
               response.write("<html><body><h1>404 NotFound</h1></body></html>");
               response.end();
          }
     } else {
          // console.log("调接口");
          // 根据接口的名字找到对应的方法
          var func = loader.get(pathname);
          if (func != null) {
               // 把请求和相应传进去
               func(request, response);
          } else {
               response.writeHead(404);
               response.write("<html><body><h1>404 NotFound</h1</body></html>");
               response.end();
          }
     }
}).listen(12306);
log("服务已启动");

// 判断请求是什么类型的
function isStaticRequest (pathname) {
     for (var i = 0; i < globalConfig.static_file_type.length; i++) {
          var temp = globalConfig.static_file_type[i];
          // 判断请求的路径的后缀是否是这个配置里面的静态文件，因为是后缀所以这样判断
          if (pathname.indexOf(temp) == pathname.length - temp.length) {
               return true
          }
     }
     return false
}