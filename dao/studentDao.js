var DButil = require("./DButil");

function queryStudentByPage (offset, limit, success) {
    var querySql = "select * from student limit ?, ?";
    // 这种写法防止sql注入
    var queryParams = [offset, limit];

    var connection = DButil.createConnection();
    connection.connect();
    connection.query(querySql, queryParams, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log(error)
        }
    });
    // 连接一次一个线程，一定要end
    connection.end();
}
function getStudentCount (success) {
    var querySql = "select count(1) as count from student";
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(querySql, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log(error)
        }
    });
    // 连接一次一个线程，一定要end
    connection.end();
}

module.exports = {
    "queryStudentByPage": queryStudentByPage,
    "getStudentCount": getStudentCount
};