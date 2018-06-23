const sql=require('../config/default').sql;

module.exports={

    // 用户查询
    userList(id){
        return sql.query(`SELECT * FROM district WHERE id=${id}`);
    }
};