/**
 *  公共模块_导航
 */
angular.module('app')
    .controller('navCtrl',['$scope','$state','$filter','$http','G','$location','$anchorScroll','$timeout',function($scope,$state,$filter,$http,G,$location,$anchorScroll,$timeout){
        // active样式控制
        $scope.state=$state;

        // 用户信息
        $scope.username=sessionStorage.getItem('username');

        // 退出登录
        $scope.signout=function(){
            $http.get('/admin/user/signout').success(function(data){
                if(data){
                    sessionStorage.removeItem('uid');
                    sessionStorage.removeItem('username');
                    sessionStorage.removeItem('roles');
                    location.replace('./signin.html');
                }
            });
        }
    }]);
