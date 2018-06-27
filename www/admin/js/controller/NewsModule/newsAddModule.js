/**
 *  新闻模块_新闻添加
 */
angular.module('app')
    .controller('newsAddCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

    }]);
