const sql=require('../config/default').sql;
const moment=require('moment');

module.exports={

    // 添加新闻
    newsAdd(title,content,sid,state,time,uid){
        return sql.query(`INSERT INTO news (title,content,sid,state,time,uid) VALUES 
            ('${title}','${content}',${sid},${state},${time},${uid});`);
    },

    // 查询新闻列表
    newsList(page,pagesize,sid,title){

        // 查询条件设置
        let condition=``;
        sid?condition=`WHERE sid=${sid}`:``;
        title?condition=`WHERE title LIKE '%${title}%'`:``;
        sid && title?condition=`WHERE sid=${sid} AND title LIKE '%${title}%'`:``;

        // 总记录数
        const totalRows=sql.query(`SELECT COUNT(id) AS n FROM news ${condition};`);

        // 查询语句
        const list=sql.query(
            `SELECT news.id,title,FROM_UNIXTIME(time,'%Y-%m-%d %H:%i:%S') AS time,sname,username,state FROM news 
            LEFT JOIN subcategory ON news.sid=subcategory.id LEFT JOIN user ON uid=user.id ${condition} ORDER BY news.id DESC 
            LIMIT ${(page-1)*pagesize},${pagesize};`
        );

        return {
            totalRows, // 总记录数
            list // 数据分页
        };
    },

    // 定时发布新闻
    newsTiming(){
        sql.query(`UPDATE news SET state=1 WHERE time<=${moment().unix()};`);
    },

    // 删除新闻
    newsDel(id){
        return sql.query(`DELETE FROM news WHERE id=${id};`);
    },

    // 查询新闻详情
    newsOnly(id){
        return sql.query(`SELECT id,title,FROM_UNIXTIME(time,'%Y-%m-%d %H:%i:%S') AS time,content,sid,state,uid FROM news WHERE id=${id};`);
    },

    // 修改新闻
    newsEdit(id,title,time,content,sid,state){

        // 更新条件设置
        /*let condition=`UPDATE news SET `,
            sole=`WHERE id=${id};`;

        title?condition+=`title='${title}',`:``;
        time?condition+=`time='${time}',`:``;
        content?condition+=`content='${content}',`:``;
        sid?condition+=`sid='${sid}',`:``;
        state?condition+=`state='${state}'`:``;
        if(!title && !time && !content && !sid && !state){
            condition=``;
            sole=``
        }
        return sql.query(condition+sole);*/
        return sql.query(`UPDATE news SET title='${title}',time=${time},content='${content}',sid=${sid},state=${state} WHERE id=${id};`);
    }









};