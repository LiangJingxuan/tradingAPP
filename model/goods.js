const sql=require('../config/default').sql;
const moment=require('moment');

module.exports={

    // 商品添加
    goodsAdd(goods_name,goods_point,goods_pic,goods_summary,state,nice,sid,goods_time,i){

        // 默认值判断
        !goods_point?goods_point=``:``;
        !goods_pic?goods_pic=``:``;
        !goods_summary?goods_summary=``:``;
        !state?state=0:state=1;
        !nice?nice=0:nice=1;
        !i?i=0:i=1;

        // 插入数据
        return sql.query(`INSERT INTO goods (goods_name,goods_point,goods_pic,goods_summary,state,nice,sid,goods_time,i) VALUES 
            ('${goods_name}','${goods_point}','${goods_pic}','${goods_summary}',${state},${nice},${sid},${goods_time},${i});`);
    },

    // 查询商品列表
    goodsList(page,pagesize,sid,name,i){

        // 查询条件设置
        let condition=`WHERE i=${i}`;
        sid?condition=`WHERE i=${i} AND sid=${sid}`:``;
        name?condition=`WHERE i=${i} AND goods_name LIKE '%${name}%'`:``;
        sid && name?condition=`WHERE i=${i} AND sid=${sid} AND goods_name LIKE '%${name}%'`:``;

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

    // 查询商品详情
    goodsOnly(id){
        return sql.query(`SELECT id,goods_name,goods_point,goods_pic,goods_summary,state,nice,sid FROM goods WHERE id=${id};`);
    },

    // 修改商品
    goodsEdit(id,goods_name,goods_point,goods_pic,goods_summary,state,nice,sid){

        // 默认值判断
        !goods_summary?goods_summary=``:``;
        !state?state=0:``;
        !nice?nice=0:``;

        // 修改数据
        return sql.query(`UPDATE goods SET goods_name='${goods_name}',goods_point='${goods_point}',goods_pic='${goods_pic}',goods_summary='${goods_summary}',
            state=${state},nice=${nice},sid=${sid} WHERE id=${id};`);
    },

    // 删除商品图片
    goodsPicDel(id,path){
        return {
            picList(){
                return sql.query(`SELECT goods_pic FROM goods WHERE id=${id};`);  // 全部商品图片
            },
            upPic(){
                return sql.query(`UPDATE goods SET goods_pic='${path}' WHERE id=${id};`);  // 更新商品图片
            }
        };
    },

};