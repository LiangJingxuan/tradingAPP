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

    // 修改回复状态
    .get('/upreply', async (ctx)=>{
        const params=ctx.query;
        try{
            const data = await customerModel.replyEdit(parseInt(params.id),parseInt(params.reply));
            if(data.affectedRows){
                // 修改成功
                ctx.body=info.suc('修改成功！');
            }else{
                // 修改失败
                ctx.body=info.err('修改失败，请重试！');
            }
        }catch (e) {
            ctx.body=info.err('操作失败，请重试！');
        }
    })

    ;

module.exports=router.routes();