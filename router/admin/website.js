/* 网站编辑模块 */

const router=require('koa-router')();
const moment=require('moment');
const websiteModel=require('../../model/website');
const upload=require('../../middlewares/uploaded');
const info=require('../../middlewares/info');

router
    .post('/websiteup', upload.configure(), async (ctx)=>{

        let params=ctx.request.body, // 获取参数
            data=null, // 返回数据
            logInfo=''; // 日志信息

        try {
            switch (parseInt(params.i)){

                // logo编辑操作
                case 1 :
                {
                    let item=await websiteModel.webPicList('logo'), // 全部logo图片路径
                        pics=upload.pathHandle(ctx,'logo'); // 获取图片路径logo

                    // 修改
                    data=await websiteModel.upEdit('logo',pics);

                    // 删除之前logo
                    item.length>0 && item[0].logo?upload.fileDelete(item,'logo'):'';

                    logInfo='修改了网站logo图片。';
                }
                    break;

                // 品牌介绍编辑操作
                case 2 :
                {
                    data=await websiteModel.bradnEdit(params.brandInfo,params.goodsInfo);
                    logInfo='编辑了网站品牌介绍信息。';
                }
                    break;

                // 活动宣传编辑操作
                case 3 :
                {

                    let item=await websiteModel.webPicList('sales'), // 全部sales图片路径
                        pics=upload.pathHandle(ctx,'sales'); // 获取图片路径sales

                    // 修改
                    data=await websiteModel.upEdit('sales',pics);

                    // // 删除之前sales
                    item.length>0 && item[0].sales?upload.fileDelete(item,'sales'):'';

                    logInfo='修改了活动宣传的图片。';
                }
                    break;

                // 轮播图编辑操作
                case 4 :
                {
                    let item=await websiteModel.webPicList('adpics'), // 全部sales图片路径
                        pics=upload.pathHandle(ctx,'ad'), // 获取图片路径sales
                        str=''; // 存储json字符串

                    // 修改
                    data=await websiteModel.upEdit('adpics',pics);

                    // 删除之前轮播图
                    item.length>0 && item[0].adpics?upload.fileDelete(item,'adpics'):'';

                    // 信息处理
                    for(let i=0,len=params.title.length;i<len;i++){
                        str+=`{"id":"${i}","title":"${params.title[i]}","info":"${params.info[i]}","href":"${params.href[i]}","pic":"${pics[i]}"}${i<params.title.length-1?',':''}`;
                    }
                    data=await websiteModel.adEdit(str);

                    logInfo='修改了广告轮播图片信息。';
                }
                    break;
            }

            // 返回信息
            if(data.affectedRows){
                // 新增成功
                ctx.body=info.suc('编辑成功！');

                // 添加日志信息
                websiteModel.webLogAdd(ctx.session.uid,logInfo,moment().unix());

            }else{
                // 新增失败
                ctx.body=info.err('编辑失败，请重试！');
            }

        }catch (e) {
            ctx.body=info.err('操作失败，请重试！');
        }

    })

    .get('/log', async (ctx)=>{
        ctx.body=await websiteModel.webLogoQuery();
    })

    ;

module.exports=router.routes();