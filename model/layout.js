const sql=require('../config/default').sql;

module.exports={

    // 免费咨询信息添加
    consultAdd(name,email,phone,content){
        
        return sql.query(`INSERT INTO customer (name,email,phone,content,reply) VALUES ('${name}','${email}','${phone}','${content}',0);`);
    }
};