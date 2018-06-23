/* 用户操作 */

const router=require('koa-router')();

router
    .get('/', async (ctx)=>{
        ctx.body='用户的首页-前台';
    })
    .get('/view', async (ctx)=>{
        // 输出模板
        await ctx.render('test',{
            test: 'test koa views ..'
        });
    });
module.exports=router.routes();