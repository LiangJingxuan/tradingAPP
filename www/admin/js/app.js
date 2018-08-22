var app = angular.module('app',['ui.router','ngAnimate','ngSanitize','Directives','Services','Configs']);
// 运行配置
app.run(['$rootScope','$http','$state','G',function($rootScope,$http,$state,G){
    // 拦截器
    if(!(sessionStorage.getItem("uid"))){
        location.replace('./signin.html');
    }
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
    $urlRouterProvider.otherwise('/home');
    $stateProvider
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
        // 客户信息
        .state('customer',{
            url:'/customer',
            views:{
                'view':{
                    controller:'customerCtrl',
                    templateUrl:'tpl/customer/customer.html'
                }
            }
        })
        // 用户管理
        .state('user',{
            url:'/user',
            views:{
                'view':{
                    controller:'userCtrl',
                    templateUrl:'tpl/user/user.html'
                }
            }
        })
        // 新闻管理
        .state('news',{
            url:'/news',
            views:{
                'view':{
                    controller:'newsCtrl',
                    templateUrl:'tpl/news/news.html'
                }
            }
        })
        // 新闻添加
        .state('news-add',{
            url:'/newsAdd',
            views:{
                'view':{
                    controller:'newsAddCtrl',
                    templateUrl:'tpl/news/newsAdd.html'
                }
            }
        })
        // 新闻编辑
        .state('news-edit',{
            url:'/newsEdit/:id',
            views:{
                'view':{
                    controller:'newsEditCtrl',
                    templateUrl:'tpl/news/newsEdit.html'
                }
            }
        })
        // 商品管理
        .state('goods',{
            url:'/goods',
            views:{
                'view':{
                    controller:'goodsCtrl',
                    templateUrl:'tpl/goodsManage/goods.html'
                }
            }
        })
        // 商品添加
        .state('goods-add',{
            url:'/goodsAdd',
            views:{
                'view':{
                    controller:'goodsAddCtrl',
                    templateUrl:'tpl/goodsManage/goodsAdd.html'
                }
            }
        })
        // 商品编辑
        .state('goods-edit',{
            url:'/goodsEdit/:id',
            views:{
                'view':{
                    controller:'goodsEditCtrl',
                    templateUrl:'tpl/goodsManage/goodsEdit.html'
                }
            }
        })
        // 案例管理
        .state('case',{
            url:'/case',
            views:{
                'view':{
                    controller:'caseCtrl',
                    templateUrl:'tpl/goodsManage/case.html'
                }
            }
        })
        // 案例添加
        .state('case-add',{
            url:'/caseAdd',
            views:{
                'view':{
                    controller:'caseAddCtrl',
                    templateUrl:'tpl/goodsManage/caseAdd.html'
                }
            }
        })
        // 案例编辑
        .state('case-edit',{
            url:'/caseEdit/:id',
            views:{
                'view':{
                    controller:'caseEditCtrl',
                    templateUrl:'tpl/goodsManage/caseEdit.html'
                }
            }
        })
        // 网站编辑
        .state('website',{
            url:'/websiteEdit',
            views:{
                'view':{
                    controller:'websiteCtrl',
                    templateUrl:'tpl/website/websiteEdit.html'
                }
            }
        })

}]);
