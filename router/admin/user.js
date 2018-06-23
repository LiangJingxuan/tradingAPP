/* 用户操作 */

const router=require('koa-router')();
const userModule=require('../../model/user');

router
    .get('/i', async (ctx)=>{
        ctx.session.token='hq ai jx ...';
        ctx.body=await userModule.userList(1);
        ctx.body=ctx.session;

    });

module.exports=router.routes();