const router=require('koa-router')();

// 静态页面展示
router.get('/', async (ctx)=>{
    ctx.redirect('/admin/index.html');
    ctx.status = 301;
});

// 用户管理
router.use('/user',require('./user'));


module.exports=router.routes();