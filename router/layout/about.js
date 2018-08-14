/* 网站关于模块 */

const router=require('koa-router')();

router
    .get('/', async (ctx)=>{
        // 输出模板
        await ctx.render('about',{

        });
    });
module.exports=router.routes();