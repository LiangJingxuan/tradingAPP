/* 新闻模块 */

const router=require('koa-router')();
const newsModel=require('../../model/news');
const info=require('../../middlewares/info');

router
    // 添加新闻
    .post('/newsadd', async (ctx)=>{
        const news=ctx.request.body;
    })

    ;

module.exports=router.routes();