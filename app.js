const koa=require('koa');
const views=require('koa-views');
const bodyparser=require('koa-bodyparser');
const session=require('koa-session');
const router=require('koa-router')();
const statics=require('koa-static-cache');
const paths=require('path');

const deploy=require('./config/default').config;

const app=new koa();

// 视图中间件
app.use(views('views',{extension: 'ejs'}));

// 静态资源中间件
app.use(statics(paths.join(__dirname,'./www'),{dynamic:true},{maxAge: 365*24*60*60}));

// post数据接收中间件
app.use(bodyparser({
    formLimit: '1mb'
}));

// session配置中间件
let arr=[];
for(let i=0;i<100000;i++){
    arr.push('liang'+Math.random()+'wanghaiqi_');
}
app.keys = arr;
app.use(session({
    key: 'uid', // cookie的键
    maxAge: 2*3600*1000, // 确定cookie的有效期，默认是一天
    httpOnly: true, // 不允许浏览器中的js代码来获取cookie，避免遭到一些恶意代码的攻击
    signed: true, // 会自动给cookie加上一个sha256的签名,从而防止cookie被篡改
    rolling: false, // 每次都更新session
    renew: true // 且有效期已经过了一半，需要更新session
}, app));

// 错误级中间件
app.use(async (ctx,next)=>{
    await next();
    if(ctx.status===404){
        // ctx.redirect('/404.html');
    }
});

// 路由
router.use('/', require('./router/layout/index'));
router.use('/admin', require('./router/admin/index'));

app.use(router.routes()).use(router.allowedMethods());
app.listen(deploy.port);
