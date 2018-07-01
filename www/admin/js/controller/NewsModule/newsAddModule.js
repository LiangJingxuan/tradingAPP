/**
 *  新闻模块_新闻添加
 */
angular.module('app')
    .controller('newsAddCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

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
        }
    }]);
