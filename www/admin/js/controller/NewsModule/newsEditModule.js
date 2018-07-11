/**
 *  新闻模块_新闻添加
 */
angular.module('app')
    .controller('newsEditCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G','$state','$stateParams',function($scope,$rootScope,$location,$anchorScroll,$http,G,$state,$stateParams){
        $location.hash('main-content');
        $anchorScroll();

        // 查询新闻详情
        $scope.unique=$stateParams.id;
        $http.get('/admin/news/newsonly',{params:{id:$stateParams.id}}).success(function(data){
            G.expire(data);
            $scope.news=data;

            // 文章详情初始化
            (function msgInit(){
                // 文章分类下拉框处理
                var selects = $('#genreBox .select2-selection__rendered'),
                    options = $('#genreBox option[value='+$scope.news.sid+']');
                options.attr('selected',true);
                selects.text(options.text());
                selects.attr('title',options.text());

                // 定时发布时间选择框处理
                $scope.datetime=!$scope.news.state;
                if(!$scope.news.state){
                    $scope.dates=$scope.news.time;
                }

                // 重置操作
                $scope.restNewsEdit=function(){
                    msgInit();
                    // 富文本
                    CKEDITOR.instances. content .setData($scope.news.content);
                };

                // 富文本编辑器配置
                CKEDITOR.replace('content',{
                    toolbar:[
                        ['Undo','Redo','-','Find','-','SelectAll','RemoveFormat'],
                        ['FontSize'],['Bold', 'Italic'],['TextColor','BGColor'],
                        ['NumberedList','BulletedList'],
                        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
                        ['Link','Unlink'],
                        ['Table','HorizontalRule','Smiley','-',/*'Image',*/'Maximize']
                    ],
                    height: 250,
                    removePlugins: 'elementspath' // 移除编辑器底部状态栏显示的元素路径和调整编辑器大小的按钮 elementspath,resize
                    // removeDialogTabs: '/uploads', // 配置图片上传路径
                    // filebrowserImageUploadUrl: '/uploads?type=images'
                });

                // 发布时间控制
                $scope.dataIn = function(){
                    $scope.dates=null;
                    if($scope.now){
                        $scope.datetime=false;
                    }
                };
                $scope.dataOut = function(){
                    if($scope.timing){
                        $scope.datetime=true;
                    }
                };

                // 修改新闻
                $scope.newsEdit=function(){
                    $('#newsEditId').ajaxForm({
                        beforeSend:function(){
                            $scope.EDITNEWSIF = true;
                        },
                        success:function(data){
                            G.expire(data);
                            $scope.EDITNEWSIF = false;
                            $('.alerts .modal-body').text(data.msg);
                            $('.alerts').modal('show');
                            if(data.i){
                                $scope.Tip = function(){
                                    // 跳转到列表
                                    setTimeout(function(){
                                        $state.go('news')
                                    },500);
                                }
                            }
                        }
                    });
                };
            })();
        });

    }]);
