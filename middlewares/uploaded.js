const koaBody=require('koa-body');
const paths=require('path');
const fs=require('fs');

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
    },

    // 文件删除操作
    fileDelete(list,picname,site){
        let record=list[0][picname],
            arr=record.split(',');

        for(let i=0,len=arr.length;i<len;i++){
            if(site){
                // 删除指定文件
                if(site===arr[i]){
                    // 删除图片文件
                    fs.unlinkSync(paths.join(__dirname,`../www${arr[i]}`),(err)=>{
                        if(err) return false;
                    });
                    // 删除路径
                    arr.splice(i,1);
                }
                record=arr.join();
            }else{
                // 删除全部文件
                if(record){
                    // 删除图片文件
                    fs.unlinkSync(paths.join(__dirname,`../www${arr[i]}`),(err)=>{
                        if(err) return false;
                    });
                }

            }
        }

        return record;
    },

    // 文件修改操作
    fileUpdate(ctx,field,site,list,picname,){
        let path=this.pathHandle(ctx,field,site), // 文件路径处理
            up=''; // 更新文件路径存储

        if(list[0][picname] && JSON.stringify(ctx.request.files)!=='{}'){
            up=list[0][picname]+','+path;
        }else if(JSON.stringify(ctx.request.files)==='{}'){
            up=list[0][picname];
        }else{
            up=path;
        }
        return up;
    }

};