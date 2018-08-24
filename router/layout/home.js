/* 网站主页模块 */

const router=require('koa-router')();
const homeModel=require('../../model/layoutModel');
const layoutModel=require('../../model/layoutCommon');

router
    // 主页数据分配
    .get('/', async (ctx)=>{

        const classify=await homeModel.classify('公司产品'); // 产品分类
        const heatGoods=await homeModel.heatGoods(); // 热门产品
        const newsQuery=await homeModel.newsQuery(); // 最新新闻
        const heatCase=await homeModel.heatCase(); // 热门案例
        const websiteInfo=await layoutModel.webInfoQuery(); // 网站信息查询
        const I=await layoutModel.webI();

        // 输出模板
        await ctx.render('index',{
            classify,
            heatGoods,
            newsQuery,
            heatCase,
            websiteInfo,
            I:I[0] // logo
        });
    })

    ;

module.exports=router.routes();