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

    // 查询新闻列表
    .get('/newslist', async (ctx)=>{
        newsModel.newsTiming();
        const params=ctx.query; // 定时发布新闻
        const page=parseInt(params.page);
        const pagesize=parseInt(params.pagesize);

        const data=await newsModel.newsList(page,pagesize,params.sid,params.title);
        const dataList = await data.list;
        const totalRows = await data.totalRows;
        const totalPage=Math.ceil(totalRows[0].n/pagesize);

        ctx.body=info.paging(dataList,page,totalPage,totalRows);
    })

    // 删除新闻
    .get('/newsdel', async (ctx)=>{
        try{
            const data = await newsModel.newsDel(ctx.query.id);
            if(data.affectedRows){
                // 删除成功
                ctx.body=info.suc('删除成功！');
            }else{
                // 删除失败
                ctx.body=info.err('删除失败，请重试！');
            }
        }catch (e) {
            ctx.body=info.err('操作失败，请重试！');
        }
    })

    // 查询新闻详情
    .get('/newsonly', async (ctx)=>{
        const data=await newsModel.newsOnly(ctx.query.id);
        ctx.body=data[0];
    })

    // 修改新闻
    .post('/newsedit', async (ctx)=>{
        const news=ctx.request.body;
        let time=0;
        parseInt(news.state)?time=moment().unix():time=moment(news.timing).unix();
        try {
            if(ctx.session.uid!==parseInt(news.uid)){
                ctx.body=info.err('不能修改非本人发布的新闻！');
            }else {
                const data = await newsModel.newsEdit(news.id, news.title, time, news.content, news.sid, news.state);
                if (data.affectedRows) {
                    // 修改成功
                    ctx.body = info.suc('修改成功！');
                } else {
                    // 修改失败
                    ctx.body = info.err('修改失败，请重试！');
                }
            }
        }catch (e) {
            ctx.body=info.err('操作失败，请重试！');
        }
    })

    ;

module.exports=router.routes();