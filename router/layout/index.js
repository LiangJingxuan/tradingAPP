const router=require('koa-router')();

// 网站主页模块
router.get('/', async (ctx)=>{
    // 输出模板
    await ctx.render('index',{

    });
});

router.use('/user',require('./user'));

module.exports=router.routes();