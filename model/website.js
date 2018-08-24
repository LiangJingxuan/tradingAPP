const sql=require('../config/default').sql;

module.exports={

    // 获取指定字段中的图片路径
    webPicList(field){
        return sql.query(`SELECT ${field} FROM websiteinfo;`);
    },

    // 修改图片路径操作
    upEdit(field,value){
        return sql.query(`UPDATE websiteinfo SET ${field}='${value}';`);
    },

    // 品牌介绍编辑操作
    bradnEdit(brand='',goods=''){
        return sql.query(`UPDATE websiteinfo SET brand='{"brandInfo":"${brand.trim()}","goodsInfo":"${goods.trim()}"}';`);
    },

    // 轮播图信息编辑操作
    adEdit(data){
        return sql.query(`UPDATE websiteinfo SET adinfo='[${data}]';`);
    },

    // 添加日志信息操作
    webLogAdd(uid,info,time){
        return sql.query(`INSERT INTO websitelog (uid,info,time) VALUES (${uid},'${info}',${time});`);
    },

    // 日志信息查询
    webLogoQuery(){
        return sql.query(`SELECT websitelog.id,info,FROM_UNIXTIME(time,'%Y-%m-%d %H:%i:%S') AS time,username,roles FROM 
        websitelog LEFT JOIN user ON uid=user.id ORDER BY time DESC;`);
    }


};