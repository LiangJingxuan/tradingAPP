const sql=require('../config/default').sql;
const moment=require('moment');

module.exports={

    // 添加新闻
    newsAdd(title,content,sid,state,time,uid){
        return sql.query(`INSERT INTO news (title,content,sid,state,time,uid) VALUES 
            ('${title}','${content}',${sid},${state},${time},${uid});`);
    },

    // 查询新闻
    newsList(page,pagesize,sid,title){
        const totalRows=sql.query(`SELECT COUNT(id) AS n FROM news;`);
        const list=sql.query(`SELECT news.id,title,FROM_UNIXTIME(time,'%Y-%m-%d %H:%i:%S') AS time,sname,username,state FROM news 
                              LEFT JOIN subcategory ON news.sid=subcategory.id LEFT JOIN user ON uid=user.id 
                              WHERE sid=${sid} AND title LIKE '%${title}%' 
                              LIMIT ${(page-1)*pagesize},${pagesize};`);
        return {
            totalRows, // 总记录数
            list // 数据分页
        };
    },

    // 定时发布新闻
    newsTiming(){
        sql.query(`UPDATE news SET state=1 WHERE time<=${moment().unix()};`);
    }

};