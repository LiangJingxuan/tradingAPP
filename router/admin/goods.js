/* 商品模块 */

const router=require('koa-router')();
const koaBody=require('koa-body');
const paths=require('path');
const moment=require('moment');
const goodsModel=require('../../model/goods');
const info=require('../../middlewares/info');

router
    // 添加商品
    .post('/goodsadd', koaBody({
        multipart: true,
        formidable: {
            uploadDir: paths.join(__dirname, '../../www/uploads/goods'),
            keepExtensions: true,
            maxFieldsSize: 20 * 1024 * 1024, // 20M
            maxFileSize: 200 * 1024 * 1024, // 200M
            onFileBegin(name,file){

            }
        },
        onError(err){
            console.log('文件上传失败！',err);
        }
    }), async (ctx)=>{
        const goods=ctx.request.body,
              goodsTime=moment().unix(),
              pic=ctx.request.files;

        // 图片路径获取
        let pics=[];
        for(let i=0,len=pic.goodsPic.length;i<len;i++){
            pics.push(`/uploads/goods/${paths.parse(pic.goodsPic[i].path).base}`);
        }
        !pics.length?pics=`/uploads/goods/${paths.parse(pic.goodsPic.path).base}`:'';

        // 添加操作
        try {
            const data=await goodsModel.goodsAdd(goods.goodsName,goods.goodsPoint,pics,goods.goodsSummary,goods.state,goods.nice,goods.sId,goodsTime);
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

    // 查询商品列表
    .get('/goodslist', async (ctx)=>{
        const params=ctx.query;
        const page=parseInt(params.page);
        const pagesize=parseInt(params.pagesize);

        const data=await goodsModel.goodsList(page,pagesize,params.sid,params.name);
        const dataList = await data.list;
        const totalRows = await data.totalRows;
        const totalPage=Math.ceil(totalRows[0].n/pagesize);

        ctx.body=info.paging(dataList,page,totalPage,totalRows);
    })

    // 删除商品
    .get('/goodsdel', async (ctx)=>{
        try{
            const data = await goodsModel.goodsDel(ctx.query.id);
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

    // 查询商品详情
    .get('/goodsonly', async (ctx)=>{
        const data=await goodsModel.goodsOnly(ctx.query.id);
        ctx.body=data[0];
    })

    // 修改商品
    .post('/goodsedit', async (ctx)=>{
        const goods=ctx.request.body;
        try {
            const data = await goodsModel.goodsEdit(goods.id,goods.goodsName,goods.goodsPoint,goods.goodsSummary,goods.state,goods.nice,goods.sId);
            if (data.affectedRows) {
                // 修改成功
                ctx.body = info.suc('修改成功！');
            } else {
                // 修改失败
                ctx.body = info.err('修改失败，请重试！');
            }
        }catch (e) {
            console.log(e);
            ctx.body=info.err('操作失败，请重试！');
        }
    })

    ;

module.exports=router.routes();