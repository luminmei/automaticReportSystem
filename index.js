var express = require("express");
var globalConfig  = require("./config");
var loader = require("./loader");
var cookie = require("cookie-parser");

var app = new express();
// 告诉express框架使用cookie
app.use(cookie());
// 告诉他静态页面全在这
app.use(express.static(globalConfig["page_path"]));

// 拦截器
app.get("/api/*", function (request, response, next) {
    console.log(request.cookies);
    if (request.cookies.id) {
        next();
    } else {
        // 重定向
        response.redirect("/login.html");
    }
});

// 添加路由
// get请求
app.get("/api/getAllStudent", loader.get("/api/getAllStudent"));

app.get("/api/addStudent", loader.get("/api/addStudent"));

app.get("/login", loader.get("/login"));

app.listen(globalConfig["port"]);