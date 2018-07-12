const sql=require('../config/default').sql;
const moment=require('moment');

module.exports={

    // 商品添加
    goodsAdd(){
        return sql.query(`INSERT INTO user (username,password,tel,roles) VALUES ();`);
    },

};