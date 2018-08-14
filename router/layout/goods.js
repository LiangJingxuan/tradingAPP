/* 网站商品模块 */

const router=require('koa-router')();

router
    .get('/', async (ctx)=>{
        // 输出模板
        await ctx.render('shop',{

        });
    });
module.exports=router.routes();