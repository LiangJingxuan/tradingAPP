/* 用户操作 */

const md5=require('md5');
const router=require('koa-router')();
const userModel=require('../../model/user');
const info=require('../../middlewares/info');

router
    // 登录
    .post('/signin', async (ctx)=>{
        const user=ctx.request.body;
        const password=md5(md5(user.password).substr(4,7)+md5(user.password));
        // console.log(password);
        const data=await userModel.userData(user.username);
        try{
            if(data[0]){
                // 判断密码是否正确
                if(password!==data[0].password){
                    ctx.body=info.err('密码错误！');
                }else{
                    // 登录成功
                    ctx.body={
                        uid: data[0].id,
                        username: data[0].username,
                        roles: data[0].roles
                    };
                    // 设置session
                    ctx.session.uid=data[0].id
                }
            }else{
                // 用户不存在
                ctx.body=info.err('此用户不存在！');
            }
        }catch (e){
            ctx.body=info.err('操作失败！');
        }
    })

    // 退出
    .get('/signout', async (ctx)=>{
        ctx.session = null;
        ctx.body = true;
    })

    // 用户列表
    .get('/userlist', async (ctx)=>{
        ctx.body=await userModel.userList();
    })

    // 用户添加
    .post('/useradd', async (ctx)=>{
        const user=ctx.request.body;
        const password=md5(md5(user.password).substr(4,7)+md5(user.password));
        try{
            const telCheck=await userModel.userTel(user.tel);
            // 电话查重
            if(telCheck.length===0){
                const data=await userModel.userAdd(user.username,password,user.tel,user.roles);
                if(data.affectedRows){
                    // 新增成功
                    ctx.body=info.suc('新增成功！');
                }else{
                    // 新增失败
                    ctx.body=info.err('新增失败，请重试！');
                }
            }else{
                // 新增失败 电话重复
                ctx.body=info.err('新增失败，电话号码不能重复！');
            }

        }catch (e){
            ctx.body=info.err('操作失败，请重试！');
        }
    })

    // 用户删除
    .get('/userdel', async (ctx)=>{
        try{
            if(ctx.session.uid===parseInt(ctx.query.id)){
                // 不能删除正在使用的账号
                ctx.body=info.err('不能删除正在使用的账号！');
            }else{
                const data = await userModel.userDel(ctx.query.id);
                if(data.affectedRows){
                    // 删除成功
                    ctx.body=info.suc('删除成功！');
                }else{
                    // 删除失败
                    ctx.body=info.err('删除失败，请重试！');
                }
            }
        }catch (e) {
            ctx.body=info.err('操作失败，请重试！');
        }
    })

    // 用户修改
    .post('/useredit', async (ctx)=>{
        const user=ctx.request.body;
        if(user.password){
            user.password=md5(md5(user.password).substr(4,7)+md5(user.password));
        }
        try{
            if(ctx.session.uid===parseInt(user.id)){
                // 不能修改正在使用的账号
                ctx.body=info.err('不能修改正在使用的账号！');
            }else{
                // 电话未修改设置
                if(user.orTel!==user.tel){
                    const telCheck=await userModel.userTel(user.tel);
                    // 电话查重
                    if(telCheck.length!==0){
                        // 修改失败 电话重复
                        ctx.body=info.err('修改失败，电话号码不能重复！');
                        return;
                    }
                }
                const data=await userModel.userEdit(user.id,user.username,user.tel,user.password);
                if(data.affectedRows){
                    // 修改成功
                    ctx.body=info.suc('修改成功！');
                }else{
                    // 修改失败
                    ctx.body=info.err('修改失败，请重试！');
                }
            }

        }catch (e){
            ctx.body=info.err('操作失败，请重试！');
        }
    })

    ;

module.exports=router.routes();