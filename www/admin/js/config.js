/*
*   公共对象
*/
var Configs = angular.module('Configs',[]);
Configs.constant('G',{

    // 后台session过期后跳转到登录页面
    expire: function(data){
        if(data.ex){
            location.replace('./signin.html');
        }
    },

    // 操作成功后更新数据列表视图
    upview: function(http,G,URL,callback){
        http.get(URL).success(function(data){
            G.expire(data);
            callback(data);
        });
    }


});