/**
 *  商品管理模块_商品添加
 */
angular.module('app')
    .controller('goodsAddCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

    }]);
