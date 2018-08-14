/* 网站新闻模块 */

const router=require('koa-router')();

router
    .get('/', async (ctx)=>{
        // 输出模板
        await ctx.render('news',{

        });
    });
module.exports=router.routes();