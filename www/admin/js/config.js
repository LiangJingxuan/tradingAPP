/*
    正式系统 ------------------------------------------

var tsConfig = angular.module('tsConfig',[]);
tsConfig.constant('G',{
    // apiUrl:'http://192.168.0.155:9102/ts/',
    apiUrl:'http://140.143.185.192:9102/ts/',
    // apiUrl_hs:'http://192.168.0.132:9102/ts-rightsframe/'
    // apiUrl_hs:'http://192.168.0.155:9102/ts/',
    apiUrl_hs:'http://140.143.185.192:9102/ts/',
    // apiUrl_login:'http://192.168.0.155:9102/ts-rightsframe/'
    apiUrl_login:'http://140.143.185.192:9102/ts-rightsframe/',
    // 客源管理 测试
    /!*apiUrl_cs:'http://192.168.0.155:9102/ts/',
    apiUrl_dl:'http://192.168.0.155:9102/ts-rightsframe/'*!/

    // 正式
    apiUrl_cs:'http://140.143.185.192:9102/ts/',
    apiUrl_dl:'http://140.143.185.192:9102/ts-rightsframe/',

    // 二维码打卡地址  140.143.195.20
    apiUrl_QR:'http://140.143.195.20/ts-tool/',
    // 二维码登录地址
    apiUrl_LogoIn:'http://140.143.195.20:8000/',

    // IP
    IP:'http://140.143.185.192:9102/'
    // IP:'http://192.168.0.155:9102/'
});*/



/*
*   测试系统 ----------------------------------------------
*/
var Configs = angular.module('Configs',[]);
Configs.constant('G',{
    /*// apiUrl:'http://192.168.0.155:9102/ts/',
     apiUrl:'http://123.57.71.181:9102/ts/',
     // apiUrl_hs:'http://192.168.0.132:9102/ts-rightsframe/'
     // apiUrl_hs:'http://192.168.0.155:9102/ts/',
     apiUrl_hs:'http://123.57.71.181:9102/ts/',
     // apiUrl_login:'http://192.168.0.155:9102/ts-rightsframe/'
     apiUrl_login:'http://123.57.71.181:9102/ts-rightsframe/',
     // 客源管理 测试
     /!*apiUrl_cs:'http://192.168.0.155:9102/ts/',
     apiUrl_dl:'http://192.168.0.155:9102/ts-rightsframe/'*!/

     // 正式
     apiUrl_cs:'http://123.57.71.181:9102/ts/',
     apiUrl_dl:'http://123.57.71.181:9102/ts-rightsframe/',

     // 二维码打卡地址
     apiUrl_QR:'http://192.168.0.155/ts-tool/'*/


    apiUrl:'http://192.168.0.155:9102/ts/',


    apiUrl_hs:'http://192.168.0.155:9102/ts/',
    // apiUrl_login:'http://192.168.0.155:9102/ts-rightsframe/'
    // 客源管理 测试
    apiUrl_cs:'http://192.168.0.155:9102/ts/',
    apiUrl_dl:'http://192.168.0.155:9102/ts-rightsframe/',


    // 二维码打卡地址
    apiUrl_QR:'http://192.168.0.155/ts-tool/',
    // 二维码登录地址
    apiUrl_LogoIn:'http://192.168.0.155:8000/',


    // IP
    // IP:'http://123.57.71.181:9102/'
    IP:'http://192.168.0.155:9102/'

});