/**
 *  新闻模块_主页
 */
angular.module('app')
    .controller('newsCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

        // 查询新闻
        var page=G.paging.page, pagesize=G.paging.pagesize;
        (function queryNews(page,pagesize){
            $http.get('/admin/news/newslist',{params:{page:page,pagesize:pagesize}}).success(function(data){
                G.expire(data);
                $scope.newsList=data;
                $scope.pagesize=pagesize;
            });
            // 分页控制
            $scope.PagingAct = function(page,pagesize){
                queryNews(page,pagesize);
            }
        })(page,pagesize);


    }]);
