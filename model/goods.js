const sql=require('../config/default').sql;
const moment=require('moment');

module.exports={

    // 商品添加
    goodsAdd(goods_name,goods_point,goods_pic,goods_summary,state,nice,sid,goods_time){

        // 默认值判断
        !goods_pic?goods_pic=``:``;
        !goods_summary?goods_summary=``:``;
        !state?state=0:``;
        !nice?nice=0:``;

        // 插入数据
        return sql.query(`INSERT INTO goods (goods_name,goods_point,goods_pic,goods_summary,state,nice,sid,goods_time) VALUES 
            ('${goods_name}','${goods_point}','${goods_pic}','${goods_summary}',${state},${nice},${sid},${goods_time});`);
    },

    // 查询商品列表
    goodsList(page,pagesize,sid,name){

        // 查询条件设置
        let condition=``;
        sid?condition=`WHERE sid=${sid}`:``;
        name?condition=`WHERE goods_name LIKE '%${name}%'`:``;
        sid && name?condition=`WHERE sid=${sid} AND goods_name LIKE '%${name}%'`:``;

        // 总记录数
        const totalRows=sql.query(`SELECT COUNT(id) AS n FROM goods ${condition};`);

        // 查询语句
        const list=sql.query(
            `SELECT goods.id,FROM_UNIXTIME(goods_time,'%Y-%m-%d %H:%i:%S') AS time,goods_name,state,nice,sname FROM goods 
            LEFT JOIN subcategory ON goods.sid=subcategory.id ${condition} ORDER BY goods.id DESC LIMIT ${(page-1)*pagesize},${pagesize};`
        );

        return {
            totalRows, // 总记录数
            list // 数据分页
        };
    },

    // 删除商品
    goodsDel(id){
        return sql.query(`DELETE FROM goods WHERE id=${id};`);
    },

};