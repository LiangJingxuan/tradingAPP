/* 商品模块 */

const router=require('koa-router')();
const moment=require('moment');
const goodsModel=require('../../model/goods');
const info=require('../../middlewares/info');

router
    // 添加商品
    .post('/goodsadd', async ()=>{

    })

    ;

module.exports=router.routes();