const sql=require('../config/default').sql;

module.exports={

    // 用户登录查询
    userData(tel){
        return sql.query(`SELECT * FROM user WHERE tel='${tel}';`);
    },
    // 用户列表
    userList(){
        return sql.query(`SELECT id,username,tel,roles FROM user;`);
    },
    // 用户电话号码查重
    userTel(tel){
        return sql.query(`SELECT tel FROM user WHERE tel='${tel}';`);
    },
    // 用户添加
    userAdd(username,password,tel,roles){
        return sql.query(`INSERT INTO user (username,password,tel,roles) VALUES ('${username}','${password}','${tel}','${roles}');`);
    },
    // 用户删除
    userDel(id){
        return sql.query(`DELETE FROM user WHERE id=${id};`);
    }
};