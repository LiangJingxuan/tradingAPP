var app = angular.module('app',['ui.router','ngAnimate','ngSanitize','Directives','Services','Configs']);
// 运行配置
app.run(['$rootScope','$http','$state','G',function($rootScope,$http,$state,G){
    // 防止翻墙
    /*if(!(sessionStorage.getItem("token"))){
        document.location.replace(G.IP+'tsadmin/#/register');
    }*/
    $rootScope.$on('$stateChangeStart',function(event,toState){
        // 隐藏导航操作
        $rootScope.navScope = true;
        if(toState.name === 'register'){
            $rootScope.navScope = false;
        }else{
            $rootScope.navScope = true;
        }
    });

}]);
// 路由配置
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/register');
    $stateProvider
        // 登录注册
        .state('register',{
            url:'/register',
            views:{
                'view':{
                    controller:'registerCtrl',
                    templateUrl:'tpl/commons/register.html'
                }
            }
        })
        // 系统首页
        .state('home',{
            url:'/home',
            views:{
                'view':{
                    controller:'homeCtrl',
                    templateUrl:'tpl/home/home.html'
                }
            }
        })

}]);
