const sql=require('../config/default').sql;
const moment=require('moment');

module.exports={

    // 查询客户列表
    customerList(page,pagesize,reply,phone){

        // 查询条件设置
        let condition=``;
        reply?condition=`WHERE reply=${reply}`:``;
        phone?condition=`WHERE phone='${phone}'`:``;
        reply && phone?condition=`WHERE reply=${reply} AND phone='${phone}'`:``;

        // 总记录数
        const totalRows=sql.query(`SELECT COUNT(id) AS n FROM customer ${condition};`);

        // 查询语句
        const list=sql.query(
            `SELECT id,name,email,phone,content,reply,FROM_UNIXTIME(time,'%Y-%m-%d %H:%i:%S') AS time FROM customer ${condition} 
            ORDER BY time DESC LIMIT ${(page-1)*pagesize},${pagesize};`
        );

        return {
            totalRows, // 总记录数
            list // 数据分页
        };
    },

    // 删除新闻
    newsDel(id){
        return sql.query(`DELETE FROM news WHERE id=${id};`);
    }

};