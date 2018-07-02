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
        const time=moment().unix();
        if(news.timing){
            news.timing=moment(news.timing).unix();
        }
        try{
            const data=await newsModel.newsAdd(news.title,news.content,news.sid,news.state,time,uid,news.timing);
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
        const page=ctx.query.page;
        const pagesize=ctx.query.pagesize;
        const data=await newsModel.newsList(page,pagesize);
        const dataList = await data.dataList;
        const totalPage = await data.totalPage;
        const totalRows = await data.totalRows;
        ctx.body={
            dataList: dataList,
            page: data.page,
            totalPage: totalPage,
            totalRows: totalRows
        }
    })

    ;

module.exports=router.routes();