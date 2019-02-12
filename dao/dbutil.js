var mysql = require("mysql");
// 创建连接

// 为了每次操作创建一个连接
function createConnection (){
    var connection  = mysql.createConnection({
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        password: "123456",
        database: "school"
    });
    return connection;
}
module.exports.createConnection = createConnection;
