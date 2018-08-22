/**
 *  商品管理模块_商品添加
 */
angular.module('app')
    .controller('goodsAddCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G','$state',function($scope,$rootScope,$location,$anchorScroll,$http,G,$state){
        $location.hash('main-content');
        $anchorScroll();

        // 产品图片上传

        // 富文本编辑器配置
        CKEDITOR.replace('goodsSummary',{
            toolbar:[
                ['Undo','Redo','-','Find','-','SelectAll','RemoveFormat'],
                ['FontSize'],['Bold', 'Italic'],['TextColor','BGColor'],
                ['NumberedList','BulletedList'],
                ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
                ['Link','Unlink'],
                ['Table','HorizontalRule','Smiley','-','Maximize']
            ],
            height: 250,
            removePlugins: 'elementspath' // 移除编辑器底部状态栏显示的元素路径和调整编辑器大小的按钮 elementspath,resize
        });

        // 添加商品
        $scope.goodsAdd=function(){
            $('#goodsAddId').ajaxForm({
                beforeSend:function(){
                    $scope.ADDGOODSIF = true;
                },
                success:function(data){
                    G.expire(data);
                    $scope.ADDGOODSIF = false;
                    $('#alerts .modal-body').text(data.msg);
                    $('#alerts').modal('show');
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


    }]);
