/**
 *  新闻模块_新闻添加
 */
angular.module('app')
    .controller('caseEditCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G','$state','$stateParams',function($scope,$rootScope,$location,$anchorScroll,$http,G,$state,$stateParams){
        $location.hash('main-content');
        $anchorScroll();

        // 查询新闻详情
        $scope.unique=$stateParams.id;
        // 文章详情
        (function msgInit(){
            $http.get('/admin/goods/goodsonly',{params:{id:$stateParams.id}}).success(function(data){
                G.expire(data);
                $scope.goods=data;

                // 商品分类下拉框处理
                var selects = $('#genreBox .select2-selection__rendered'),
                    options = $('#genreBox option[value='+$scope.goods.sid+']');
                options.attr('selected',true);
                selects.text(options.text());
                selects.attr('title',options.text());

                // 富文本编辑器配置
                CKEDITOR.replace('goodsSummary',{
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

                // 商品图片展示
                $scope.pic=$scope.goods.goods_pic;
                if($scope.pic){
                    $scope.pic=$scope.pic.split(',');
                }
                // 删除图片操作
                $scope.removePic = function(path){
                    $scope.del = function(){
                        $http.get('/admin/goods/goodspicdel',{params:{id:$stateParams.id,path:path}}).success(function(data){
                            $('.confirms').modal('hide');
                            $('.alerts .modal-body').text(data.msg);
                            $('.alerts').modal('show');
                            if(data.i){
                                $scope.Tip = function(){
                                    // 更新数据
                                    setTimeout(function(){location.reload()},500)
                                }
                            }
                        });
                    };
                };

                // 修改新闻
                $scope.goodsEdit=function(){
                    $('#goodsEditId').ajaxForm({
                        beforeSend:function(){
                            $scope.EDITGOODSIF = true;
                        },
                        success:function(data){
                            G.expire(data);
                            $scope.EDITGOODSIF = false;
                            $('.alerts .modal-body').text(data.msg);
                            $('.alerts').modal('show');
                            if(data.i){
                                $scope.Tip = function(){
                                    // 跳转到列表
                                    setTimeout(function(){
                                        $state.go('goods')
                                    },500);
                                }
                            }
                        }
                    });
                };

            });
        })();

    }]);