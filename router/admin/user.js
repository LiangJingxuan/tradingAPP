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

    // 测试
    .get('/i', async (ctx)=>{
        ctx.session.token='hq ai jx ...';
        let a=await userModule.userData();
        console.log(a);
        ctx.body=ctx.session;

    });

module.exports=router.routes();