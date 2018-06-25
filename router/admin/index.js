const router=require('koa-router')();

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