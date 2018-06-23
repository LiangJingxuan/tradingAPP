自己搭建的koa2项目脚手架，方便开发使用。

<h3>目录结构</h3>

> /config/default : 项目启动端口及数据库连接配置信息

> /middlewares : 自定义中间件

> /model : 模型，存放数据库的操作

> /router : 路由，设置请求接口地址及分配数据

> /views : 视图，视图模板引擎文件资源

> /www : 静态资源，前端静态页面的文件资源

> /www/uploads : 存放上传的文件资源

> /test : 测试文件

> app.js : 项目入口文件


<h3>使用方法</h3>

修改项目端口及数据库的正确连接信息。 打开 config目录下的default.js文件，将 config 对象中的信息进行正确的修改：

```javascript
	// 配置信息
    const config={
        // 启动端口
        port: 8001,
        // 数据库配置
        db: {
            database: '',
            user: '',
            password: '',
            host: '',
            port: ''
        }
    };
```

基本信息修改完成后在命令行中切换到当前项目输入以下命令：

> npm install

> npm start


访问 http://127.0.0.1:8001/index.html 测试项目是否成功开启。

