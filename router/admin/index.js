const router=require('koa-router')();

// session失效设置
router.use(async (ctx,next)=>{
    await next();
    try{
        if(!(ctx.session.uid)){
            ctx.body=false;
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

// 用户操作
router.use('/user',require('./user'));


module.exports=router.routes();