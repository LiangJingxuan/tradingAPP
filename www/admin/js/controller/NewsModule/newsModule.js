/**
 *  新闻模块_主页
 */
angular.module('app')
    .controller('newsCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

        // 查询新闻
        var page=G.paging.page, pagesize=G.paging.pagesize,
            sid=null, title=null;

        (function queryNews(page,pagesize,sid,title){
            $http.get('/admin/news/newslist',{
                params:{
                    page:page,
                    pagesize:pagesize,
                    sid:sid,
                    title:title
                }
            }).success(function(data){
                G.expire(data);
                $scope.newsList=data;
                $scope.pagesize=pagesize;
            });
            // 分页查询
            $scope.PagingAct = function(page,pagesize){
                queryNews(page,pagesize,sid,title);
            };
            // 条件查询
            $scope.filterCond = function(genre,kw){
                var mark=false;
                if(genre || kw){
                    sid=genre; title=kw;
                    queryNews(1,pagesize,sid,title);
                    mark=true;
                }
                // 重置查询
                $scope.resetFilter = function(){
                    if(mark){
                        mark=false;
                        // 清除视图
                        var selects = $('#genreBox .select2-selection__rendered');
                        selects.text('全部新闻');
                        selects.attr('title','全部新闻');
                        // 数据清除
                        $scope.genre=undefined; $scope.kw=undefined;
                        // 查询
                        queryNews(1,pagesize);
                    }
                }
            };

        })(page,pagesize,sid,title);


    }]);
