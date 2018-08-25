/**
 *  主页模块_主页
 */
angular.module('app')
    .controller('homeCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

        // 用户数据列表
        $http.get('/admin/user/userlist').success(function(data){
            G.expire(data);
            for(var i=0,len=data.length;i<len;i++){
                if(data[i].id===parseInt(sessionStorage.getItem('uid'))){
                    $scope.userItem=data[i];
                }
            }
        });
        $scope.copyright=sessionStorage.getItem('copyright');

    }]);
