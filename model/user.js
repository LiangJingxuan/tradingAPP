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
    },
    // 用户修改
    userEdit(id,username,tel,password){
        if(password){
            return sql.query(`UPDATE user SET username='${username}',tel='${tel}',password='${password}' WHERE id=${id};`);
        }else{
            return sql.query(`UPDATE user SET username='${username}',tel='${tel}' WHERE id=${id};`);
        }
    },
    // 公司信息查询
    companyQuery(){
        return sql.query(`SELECT * FROM company;`);
    },
    // 公司信息添加
    companyAdd(name,adds,phone,email,location){
        return sql.query(`INSERT INTO company (name,adds,phone,email,location) VALUES ('${name}','${adds}','${phone}','${email}','${location}');`);
    },
    // 公司信息修改
    companyEdit(id,name,adds,phone,email,location){
        return sql.query(`UPDATE company SET name='${name}',adds='${adds}',phone='${phone}',email='${email}',location='${location}' WHERE id=${id};`);
    }
};