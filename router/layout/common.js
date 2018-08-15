/* 网站公共功能模块 */

const router=require('koa-router')();
const moment=require('moment');
const layout=require('../../model/layout');
const info=require('../../middlewares/info');

router
    // 客户咨询信息添加
    .post('/consult', async (ctx)=>{
        const custom=ctx.request.body,
              time=moment().unix();
        try{
            const data=await layout.consultAdd(custom.name,custom.email,custom.phone,custom.content,time);
            if(data.affectedRows){
                // 新增成功
                ctx.body=info.suc('您的消息已发送成功，我们会在最短时间内给您答复！');
            }else{
                // 新增失败
                ctx.body=info.err('您的消息发送失败，请重试！');
            }

        }catch (e) {
            ctx.body=info.err('操作失败，请重试！');
        }
    })

    // 获取公司信息
    .get('/company', async (ctx)=>{
        const data=await layout.companyInfo();
        ctx.body=data[0];
    })

    ;

module.exports=router.routes();