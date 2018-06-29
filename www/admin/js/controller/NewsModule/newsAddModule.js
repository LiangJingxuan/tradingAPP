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
                ['Table','HorizontalRule','Smiley','-','Image','Maximize']
            ]
        });

    }]);
