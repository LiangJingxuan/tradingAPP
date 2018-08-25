/**
 *  新闻模块_主页
 */
angular.module('app')
    .controller('customerCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

        // 查询新闻
        var page=G.paging.page, pagesize=G.paging.pagesize,
            rid=null, phone=null;

        (function queryNews(page,pagesize,rid,phone){

            // 请求查询
            $http.get('/admin/customer/customerlist',{
                params:{
                    page:page,
                    pagesize:pagesize,
                    reply:rid,
                    phone:phone
                }
            }).success(function(data){
                G.expire(data);
                $scope.customerList=data;
                $scope.pagesize=pagesize;

                // 处理删除之后更新数据出现的页数与数据不匹配问题
                if(page>1 && data.dataList.length===0){
                    queryNews(1,pagesize,rid,phone);
                }
            });

            // 分页查询
            $scope.PagingAct = function(page,pagesize){
                queryNews(page,pagesize,rid,phone);
            };

            // 条件查询
            $scope.filterCond = function(genre,kw){
                var mark=false;
                if(genre || kw){
                    rid=genre; phone=kw;
                    queryNews(1,pagesize,rid,phone);
                    mark=true;
                }
                // 重置查询
                $scope.resetFilter = function(){
                    if(mark){
                        mark=false;
                        // 清除视图
                        var selects = $('#genreBox .select2-selection__rendered');
                        selects.text('全部状态');
                        selects.attr('phone','全部状态');
                        // 数据清除
                        $scope.genre=undefined; $scope.kw=undefined;
                        // 查询
                        queryNews(1,pagesize);
                    }
                }
            };

            // 修改回复状态
            $scope.upReply=function(id,reply){
                $http.get('/admin/customer/upreply',{params:{id:id,reply:reply}}).success(function(data){
                    G.expire(data);
                    // 确认修改
                    if(data.i){
                        queryNews(page,pagesize,rid,phone);
                    }

                });
            };

            // 刷新
            $scope.resetReload=function(){
                queryNews(1,pagesize);
            }

        })(page,pagesize,rid,phone);


    }]);
