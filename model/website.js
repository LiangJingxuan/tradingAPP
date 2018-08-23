const sql=require('../config/default').sql;

module.exports={

    // 获取指定字段中的图片路径
    webPicList(field){
        return sql.query(`SELECT ${field} FROM websiteinfo;`);
    },

    // 添加logo图片路径操作
    upAdd(field,value){
        return sql.query(`INSERT INTO websiteinfo (${field}) VALUES ('${value}');`);
    },

    // 修改logo图片路径操作
    upEdit(field,value){
        return sql.query(`UPDATE websiteinfo SET ${field}='${value}';`);
    },

    // 品牌介绍编辑操作
    bradnEdit(brand='',goods=''){
        return sql.query(`UPDATE websiteinfo SET brand='{"brandInfo":"${brand.trim()}","goodsInfo":"${goods.trim()}"}';`);
    }



};