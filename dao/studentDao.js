var dbutil = require("./dbutil"); // 引用自己的加。/

function insertStudent(stuNum, name, stuClass, age, pwd, success) {
    // 执行连接
    var connection = dbutil.createConnection();
    connection.connect();
    var insertSql = "insert into student (stu_num, name, class, age, pwd) values (?,?,?,?,?)";
    var params = [stuNum, name, stuClass, age, pwd];
    // 执行操作、
    connection.query(insertSql, params, function (error, result) {
        if (error == null) { // 有结果就没异常
            console.log(result);
            success(result);
        } else {
            throw new  Error(error);
        }
    });
    // 查询完毕就关闭，不然会占用系统资源
    connection.end();
}

function queryAllStudent (success) {
    // 执行连接
    var connection = dbutil.createConnection();
    connection.connect();
    var querySql = "select * from student";
    // 执行操作、
    connection.query(querySql, function (error, result) {
        if (error == null) { // 有结果就没异常
            console.log(result);
            success(result);
        } else {
            throw new  Error(error);
        }
    });
    // 查询完毕就关闭，不然会占用系统资源
    connection.end();
}

function queryStudentByClassAndAge (classNum, age) {
    var connection = dbutil.createConnection();
    // 执行连接
    connection.connect();
    // 这样拼接容易出错，而且容易sql注入，所以用下面这种
    // var querySql = "select * from student where class = " + classNum + ";";
    // 传的参数用？站位、然后在回调函数之前传参
    var querySql = "select * from student where class = ? and age = ?";
    // 多个参数用数组
    var queryParams = [classNum,age];
    // 执行操作、
    connection.query(querySql, queryParams, function (error, result) {
        if (error == null) { // 有结果就没异常
            console.log(result);
        } else {
            throw new  Error(error);
        }
    });
    // 查询完毕就关闭，不然会占用系统资源
    connection.end();
}

function queryStudentByStuNum (stuNum, success) {
    var connection = dbutil.createConnection();
    connection.connect();
    var querySql = "select * from student where stu_num = ?";
    connection.query(querySql, stuNum, function (error, result) {
        if (error == null) { // 有结果就没异常
            console.log(result);
            success(result)
        } else {
            throw new  Error(error);
        }
    });
    // 查询完毕就关闭，不然会占用系统资源
    connection.end();
}

module.exports = {
    "queryAllStudent": queryAllStudent,
    "queryStudentByClassAndAge": queryStudentByClassAndAge,
    "queryStudentByStuNum": queryStudentByStuNum,
    "insertStudent": insertStudent
};