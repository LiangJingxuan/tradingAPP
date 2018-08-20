/* 网站商品模块 */

const router=require('koa-router')();
const goodsModel=require('../../model/goods');
const homeModel=require('../../model/layoutModel');
const layout=require('../../model/layoutCommon');
const info=require('../../middlewares/info');

router
    .get('/', async (ctx)=>{

        // 商品类别数据
        const classify=await homeModel.classify('公司产品');

        // 热门产品数据
        const hotGoods=await layout.hotGoods();

        // 商品列表
        const params=ctx.query;
        const page=parseInt(params.page) || 1;
        const pagesize=parseInt(params.pagesize) || 10;

        const data=await goodsModel.goodsList(page,pagesize,params.sid,params.name,0,1);
        const dataList = await data.list;
        const totalRows = await data.totalRows;
        const totalPage=Math.ceil(totalRows[0].n/pagesize);

        // 输出模板
        await ctx.render('shop',{
            signId: 'goods', // 商品及案例区别标志
            classify, // 商品类别数据
            hotGoods, // 热门产品数据
            goodsList: info.paging(dataList,page,totalPage,totalRows) // 商品列表

        });
    });
module.exports=router.routes();