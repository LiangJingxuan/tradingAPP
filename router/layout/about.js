/* 网站关于模块 */

const router=require('koa-router')();
const aboutModel=require('../../model/layoutCommon');

router
    .get('/', async (ctx)=>{
        const about=await aboutModel.companyInfo();
        const I=await aboutModel.webI();

        // 输出模板
        await ctx.render('about',{
            about: about[0],
            I:I[0]
        });
    });
module.exports=router.routes();