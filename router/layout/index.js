const router=require('koa-router')();

// 网站主页模块
router.use(require('./home'));

// 网站商品模块
router.use('goods',require('./goods'));

// 网站案例模块
router.use('product',require('./product'));

// 网站商品详,网站案例详情 模块
router.use('goodsDetail',require('./goods_detail'));

// 网站新闻模块
router.use('news',require('./news'));

// 网站新闻详情模块
router.use('newsDetail',require('./news_detail'));

// 网站关于模块
router.use('about',require('./about'));

module.exports=router.routes();