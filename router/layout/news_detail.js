/* 网站新闻详情模块 */

const router=require('koa-router')();

router
    .get('/', async (ctx)=>{
        // 输出模板
        await ctx.render('single-blog',{

        });
    });
module.exports=router.routes();