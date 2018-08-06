/* 网站主页 */

const router=require('koa-router')();

router
    .get('/', async (ctx)=>{
        // 输出模板
        await ctx.render('index',{

        });
    })

    ;

module.exports=router.routes();