const sql=require('../config/default').sql;

module.exports={

    // 获取指定字段中的图片路径
    webPicList(field){
        return sql.query(`SELECT ${field} FROM websiteinfo;`);
    },

    // 添加logo图片路径操作
    logoAdd(logo){
        return sql.query(`INSERT INTO websiteinfo (logo) VALUES ('${logo}');`);
    },

    // 修改logo图片路径操作
    logoUp(logo){
        return sql.query(`UPDATE websiteinfo SET logo='${logo}';`);
    },



};