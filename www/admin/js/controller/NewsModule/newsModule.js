/**
 *  新闻模块_主页
 */
angular.module('app')
    .controller('newsCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

        // 查询新闻
        $http.get('/admin/news/newslist',{params:{page:1,pagesize:2}}).success(function(data){
            G.expire(data);
            $scope.newsList=data;
        });


    }]);
