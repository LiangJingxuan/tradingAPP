const sql=require('../config/default').sql;

module.exports={

    // 添加新闻
    newsAdd(title,content,sid,state){
       return sql.query(`INSERT INTO news (title,content,cid,state) VALUES 
            ('${title}','${content}',${sid},${state});`);
    }

};