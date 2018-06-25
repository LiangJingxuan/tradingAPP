const mysql=require('mysql');
const co=require('co-mysql');

// 配置信息
const config={
    // 启动端口
    port: 9527,
    // 数据库配置
    db: {
        database: 'juyi',
        user: 'root',
        password: 'rootliang',
        host: '127.0.0.1',
        port: '3306'
    }
};

// 数据库操作设置
const sql=co(mysql.createPool(config.db));

module.exports={
    config,
    sql
};