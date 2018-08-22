/* 网站编辑模块 */

const router=require('koa-router')();
const websiteModel=require('../../model/website');
const upload=require('../../middlewares/uploaded');
const info=require('../../middlewares/info');

router
    .post('/logoedit', upload.configure(), async (ctx)=>{

        let item=await websiteModel.webPicList('logo'), // 全部图片路径
            pics=upload.pathHandle(ctx,'logo'), // 获取图片路径
            data=null; // 返回数据

        // 添加操作
        try {
            // 如果没有logo新增路径，否则修改路径
            if(item.length>0){
                // 修改
                data=await websiteModel.logoUp(pics);
                // 删除之前logo
                upload.fileDelete(item,'logo');
            }else{
                // 新增
                data=await websiteModel.logoAdd(pics);
            }

            // 返回信息
            if(data.affectedRows){
                // 新增成功
                ctx.body=info.suc('编辑成功！');
            }else{
                // 新增失败
                ctx.body=info.err('编辑失败，请重试！');
            }

        }catch (e) {
            ctx.body=info.err('操作失败，请重试！');
        }


    })

    ;

module.exports=router.routes();