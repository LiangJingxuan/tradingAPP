/* 用户操作 */

const md5=require('md5');
const router=require('koa-router')();
const userModule=require('../../model/user');

router
    // 登录
    .post('/signin', async (ctx)=>{
        const user=ctx.request.body;
        const password=md5(md5(user.password).substr(4,7)+md5(user.password));
        const data=await userModule.userData(user.username);
        try{
            if(data[0]){
                // 判断密码是否正确
                if(password!==data[0].password){
                    ctx.body={
                        msg: '密码错误！',
                        i: false
                    }
                }else{
                    // 登录成功
                    ctx.body={
                        msg: '登录成功！',
                        i: true,
                        uid: data[0].id,
                        username: data[0].username,
                        roles: data[0].roles
                    };
                    // 设置session
                    ctx.session.uid=data[0].id
                }
            }else{
                // 用户不存在
                ctx.body={
                    msg: '此用户不存在！',
                    i: false
                }
            }
        }catch (e){
            ctx.body={
                msg: '服务器错误！',
                i: false
            }
        }
    })

    // 退出
    .get('/signout', async (ctx)=>{
        ctx.session = null;
        ctx.body = true;
    })

    // 用户列表
    .get('/userlist', async (ctx)=>{
        ctx.body=await userModule.userList();
    })

    // 用户添加
    .post('/useradd', async (ctx)=>{
        const user=ctx.request.body;
        const password=md5(md5(user.password).substr(4,7)+md5(user.password));
        const data=await userModule.userAdd(user.username,password,user.tel,user.roles);

        console.log(data);

        try{
            if(data.affectedRows){
                // 新增成功
                ctx.body={
                    msg: '新增成功！',
                    i: true
                }
            }else{
                // 新增失败
                ctx.body={
                    msg: '新增失败，请重试！',
                    i: false
                }
            }

        }catch (e){
            ctx.body={
                msg: '服务器错误！',
                i: false
            }
        }
    })

    ;

module.exports=router.routes();