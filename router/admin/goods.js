/* 商品模块 */

const router=require('koa-router')();
const moment=require('moment');
const goodsModel=require('../../model/goods');
const upload=require('../../middlewares/uploaded');
const info=require('../../middlewares/info');

router
    // 添加商品
    .post('/goodsadd', upload.configure('goods'), async (ctx)=>{
        const goods=ctx.request.body,
              goodsTime=moment().unix(),
              pics=upload.pathHandle(ctx,'goodsPic','goods'); // 获取图片路径

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

        // 删除图片文件
        const list=await goodsModel.goodsPicDel(ctx.query.id).picList(); // 获取全部图片
        upload.fileDelete(list,'goods_pic');

        // 删除操作
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
    .post('/goodsedit', upload.configure('goods'), async (ctx)=>{
        let goods=ctx.request.body,
            picList=await goodsModel.goodsPicDel(goods.id).picList(), // 全部图片路径
            site=upload.fileUpdate(ctx,'goodsPic','goods',picList,'goods_pic'); // 修改图片路径

        try {
            const data = await goodsModel.goodsEdit(goods.id,goods.goodsName,goods.goodsPoint,site,goods.goodsSummary,goods.state,goods.nice,goods.sId);
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

    // 删除商品图片
    .get('/goodspicdel', async (ctx)=>{
        const params=ctx.query,
              list=await goodsModel.goodsPicDel(params.id).picList(); // 获取全部图片

        // 删除图片文件及地址处理
        const pic=upload.fileDelete(list,'goods_pic',params.path);

        // 执行删除
        try{
            const data=await goodsModel.goodsPicDel(params.id,pic).upPic();
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