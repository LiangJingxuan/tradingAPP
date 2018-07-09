/* 新闻模块 */

const router=require('koa-router')();
const moment=require('moment');
const newsModel=require('../../model/news');
const info=require('../../middlewares/info');

router
    // 添加新闻
    .post('/newsadd', async (ctx)=>{
        const news=ctx.request.body;
        const uid=ctx.session.uid;
        let time=0;
        parseInt(news.state)?time=moment().unix():time=moment(news.timing).unix();
        try{
            const data=await newsModel.newsAdd(news.title,news.content,news.sid,news.state,time,uid);
            if(data.affectedRows){
                // 新增成功
                ctx.body=info.suc('新增成功！');
            }else{
                // 新增失败
                ctx.body=info.err('新增失败，请重试！');
            }

        }catch (e) {
            ctx.body=info.err('操作失败，请重试！');
        }
    })

    // 查询新闻
    .get('/newslist', async (ctx)=>{
        newsModel.newsTiming();
        const page=parseInt(ctx.query.page);
        const pagesize=parseInt(ctx.query.pagesize);

        const data=await newsModel.newsList(page,pagesize);
        const dataList = await data.list;
        const totalRows = await data.totalRows;
        const totalPage=Math.ceil(totalRows[0].n/pagesize);

        ctx.body=info.paging(dataList,page,totalPage,totalRows);
    })

    ;

module.exports=router.routes();