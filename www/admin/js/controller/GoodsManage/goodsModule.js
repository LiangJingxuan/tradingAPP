/**
 *  商品管理模块_商品查询
 */
angular.module('app')
    .controller('goodsCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

    }]);
