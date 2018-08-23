/* 网站编辑模块 */

const router=require('koa-router')();
const websiteModel=require('../../model/website');
const upload=require('../../middlewares/uploaded');
const info=require('../../middlewares/info');

router
    .post('/websiteup', upload.configure(), async (ctx)=>{

        let params=ctx.request.body, // 获取参数
            data=null; // 返回数据

        try {
            switch (parseInt(params.i)){

                // logo编辑操作
                case 1 :
                {
                    let item=await websiteModel.webPicList('logo'), // 全部logo图片路径
                        pics=upload.pathHandle(ctx,'logo'); // 获取图片路径logo

                    // 如果没有logo新增路径，否则修改路径
                    if(item.length>0){
                        // 修改
                        data=await websiteModel.upEdit('logo',pics);
                        // 删除之前logo
                        upload.fileDelete(item,'logo');
                    }else{
                        // 新增
                        data=await websiteModel.upAdd('logo',pics);
                    }
                }
                    break;

                // 品牌介绍编辑操作
                case 2 :
                {
                    data=await websiteModel.bradnEdit(params.brandInfo,params.goodsInfo);
                }
                    break;

                // 活动宣传编辑操作
                case 3 :
                {

                    let item=await websiteModel.webPicList('sales'), // 全部sales图片路径
                        pics=upload.pathHandle(ctx,'sales'); // 获取图片路径sales

                    // 如果没有sales新增路径，否则修改路径
                    if(item.length>0){
                        // 修改
                        data=await websiteModel.upEdit('sales',pics);
                        // 删除之前logo
                        upload.fileDelete(item,'sales');
                    }else{
                        // 新增
                        data=await websiteModel.upAdd('sales',pics);
                    }
                }
                    break;
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
            console.log(e)
        }

    })

    ;

module.exports=router.routes();