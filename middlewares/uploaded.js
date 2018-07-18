const koaBody=require('koa-body');
const paths=require('path');

module.exports={

    // 文件上传配置
    configure(site){
        return koaBody({
            multipart: true,
            formidable: {
                uploadDir: paths.join(__dirname, `../www/uploads/${site}`),
                keepExtensions: true,
                maxFieldsSize: 20 * 1024 * 1024, // 20M
                maxFileSize: 200 * 1024 * 1024, // 200M
                onFileBegin(name,file){

                }
            },
            onError(err){
                console.log('文件上传失败！',err);
            }
        })
    },

    // 文件路径处理
    pathHandle(ctx,field,site){
        let obj=ctx.request.files, path=[];
        // 文件存在
        if(JSON.stringify(obj)!=='{}'){
            // 路径获取
            for(let i=0,len=obj[field].length;i<len;i++){
                path.push(`/uploads/${site}/${paths.parse(obj[field][i].path).base}`);
            }
            !path.length?path=`/uploads/${site}/${paths.parse(obj[field].path).base}`:'';
        }else{
            path='';
        }

        return path;
    }

};