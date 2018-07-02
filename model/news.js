const sql=require('../config/default').sql;

module.exports={

    // 添加新闻
    newsAdd(title,content,sid,state,time,uid,timing){
       if(timing){
           return sql.query(`INSERT INTO news (title,content,sid,state,time,uid,timing) VALUES 
            ('${title}','${content}',${sid},${state},${time},${uid},${timing});`);
       }else{
           return sql.query(`INSERT INTO news (title,content,sid,state,time,uid) VALUES 
            ('${title}','${content}',${sid},${state},${time},${uid});`);
       }
    },

    // 查询新闻
    newsList(){
        return sql.query(`SELECT news.id,title,time,sname,username,state FROM news LEFT JOIN subcategory ON news.sid=subcategory.id LEFT JOIN user ON uid=user.id;`);
    }

};