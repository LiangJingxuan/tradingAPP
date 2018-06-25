const sql=require('../config/default').sql;

module.exports={

    // 用户查询
    userData(tel){
        return sql.query(`SELECT * FROM user WHERE tel='${tel}';`);
    }
};