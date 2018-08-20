const sql=require('../config/default').sql;

module.exports={

    // 客户咨询信息添加
    consultAdd(name='',email='',phone,content='',time){
        return sql.query(`INSERT INTO customer (name,email,phone,content,reply,time) VALUES ('${name}','${email}','${phone}','${content}',0,${time});`);
    },

    // 公司信息查询
    companyInfo(){
        return sql.query(`SELECT * FROM company`);
    },

    // 热门产品最新三条数据查询
    hotGoods(item=0,i=3){
        return sql.query(`SELECT id,goods_name,goods_pic FROM goods WHERE nice=1 AND i=${item} ORDER BY goods_time DESC LIMIT ${i};`);
    }
};