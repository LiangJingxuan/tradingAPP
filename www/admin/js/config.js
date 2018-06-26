/*
*   公共对象
*/
var Configs = angular.module('Configs',[]);
Configs.constant('G',{

    // 后台session过期后跳转到登录页面
    expire: function(){
        location.replace('./signin.html');
    }


});