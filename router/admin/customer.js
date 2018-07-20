/* 客户模块 */

const router=require('koa-router')();
const moment=require('moment');
const customerModel=require('../../model/customer');
const info=require('../../middlewares/info');

router

    // 查询新闻列表
    .get('/customerlist', async (ctx)=>{
        const params=ctx.query;
        const page=parseInt(params.page);
        const pagesize=parseInt(params.pagesize);

        const data=await customerModel.customerList(page,pagesize,params.reply,params.phone);
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

    ;

module.exports=router.routes();