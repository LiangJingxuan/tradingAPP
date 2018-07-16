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

};