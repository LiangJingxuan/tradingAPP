const router=require('koa-router')();

router.use('/user',require('./user'));

module.exports=router.routes();