/* 网站商品详,网站案例详情 模块 */

const router=require('koa-router')();

router
    .get('/', async (ctx)=>{
        // 输出模板
        await ctx.render('single-product',{

        });
    });
module.exports=router.routes();