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

    ;

module.exports=router.routes();