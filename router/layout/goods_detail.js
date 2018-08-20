/* 网站商品详,网站案例详情 模块 */

const router=require('koa-router')();
const goodsModel=require('../../model/goods');
const layout=require('../../model/layoutCommon');

router
    .get('/', async (ctx)=>{

        const hotGoods=await layout.hotGoods(0,6); // 热门商品推荐
        const hotCase=await layout.hotGoods(1,6); // 热门案例推荐

        const goodsDetail=await goodsModel.goodsOnly(ctx.query.id); // 商品详情数据

        // 输出模板
        await ctx.render('single-product',{
            hotGoods, // 热门商品推荐
            hotCase, // 热门案例推荐
            goodsDetail: goodsDetail[0] // 商品详情数据
        });

    });
module.exports=router.routes();