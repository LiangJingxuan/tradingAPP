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
            maxFileSize: 200 * 1024 * 1024 // 200M
        },
        onError(err){
            console.log('文件上传失败！',err);
        }
    }), async (ctx)=>{
        ctx.body='test';
        console.log(ctx.request.files,ctx.request.body);

    })

    ;

module.exports=router.routes();