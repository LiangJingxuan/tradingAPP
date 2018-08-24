/* 网站新闻详情模块 */

const router=require('koa-router')();
const newsModel=require('../../model/news');
const homeModel=require('../../model/layoutModel');
const layout=require('../../model/layoutCommon');

router
    .get('/', async (ctx)=>{

        if(ctx.query.id){

            // 新闻分类数据
            const classify=await homeModel.classify('新闻中心');

            // 热门产品数据
            const hotGoods=await layout.hotGoods();

            // 新闻详情数据
            const newsDetail=await newsModel.newsOnly(ctx.query.id);
            const I=await layout.webI();

            // 输出模板
            await ctx.render('single-blog',{
                classify, // 新闻分类数据
                hotGoods, // 热门产品数据
                newsDetail: newsDetail[0], // 新闻详情数据
                I:I[0] // logo
            });
        }
    });
module.exports=router.routes();