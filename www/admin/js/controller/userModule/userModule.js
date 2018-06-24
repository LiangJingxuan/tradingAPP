/**
 *  用户模块_主页
 */
angular.module('app')
    .controller('userCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

    }]);
