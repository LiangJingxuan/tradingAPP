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

            // 请求查询
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

                // 处理删除之后更新数据出现的页数与数据不匹配问题
                if(page>1 && data.dataList.length===0){
                    queryNews(1,pagesize,sid,title);
                }
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

            // 删除新闻
            $scope.newsDel=function(id){
                $scope.del=function(){
                    $http.get('/admin/news/newsdel',{params:{id:id}}).success(function(data){
                        G.expire(data);
                        // 提交删除
                        $('.confirms').modal('hide');
                        $('.alerts .modal-body').text(data.msg);
                        $('.alerts').modal('show');
                        if(data.i){
                            $scope.Tip = function(){
                                // 更新数据
                                queryNews(page,pagesize,sid,title);
                            }
                        }

                    });
                }
            };

        })(page,pagesize,sid,title);


    }]);
