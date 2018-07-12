const router=require('koa-router')();

// session失效设置
router.use(async (ctx,next)=>{
    await next();
    try{
        // 过滤登录请求
        if (ctx.request.path !== '/admin/user/signin') {
            if(!(ctx.session.uid)){
                ctx.body={ex:true};
            }
        }
    }catch (e) {

    }
});

// 静态页面展示
router.get('/', async (ctx)=>{
    if(ctx.session.uid){
        ctx.redirect('/admin/app.html');
    }else{
        ctx.redirect('/admin/signin.html');
    }
});

// 用户模块
router.use('/user',require('./user'));

// 新闻模块
router.use('/news',require('./news'));

// 商品模块
router.use('/goods',require('./goods'));


module.exports=router.routes();