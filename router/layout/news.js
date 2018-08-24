/* 网站新闻模块 */

const router=require('koa-router')();
const newsModel=require('../../model/news');
const homeModel=require('../../model/layoutModel');
const info=require('../../middlewares/info');
const layout=require('../../model/layoutCommon');

router
    // 主页数据分配
    .get('/', async (ctx)=>{

        // 全部已发布新闻分页查询
        newsModel.newsTiming(); // 定时发布新闻
        const params=ctx.query;
        const page=parseInt(params.page) || 1;
        const pagesize=parseInt(params.pagesize) || 10;

        const data=await newsModel.newsList(page,pagesize,params.sid,params.title,1);
        const dataList = await data.list;

        const totalRows = await data.totalRows;
        const totalPage=Math.ceil(totalRows[0].n/pagesize);

        // 新闻分类数据
        const classify=await homeModel.classify('新闻中心');
        const I=await layout.webI();

        // 输出模板
        await ctx.render('news',{
            newsList: info.paging(dataList,page,totalPage,totalRows), // 全部已发布新闻分页查询
            classify, // 新闻分类数据
            I:I[0] // logo
        });
    });
module.exports=router.routes();