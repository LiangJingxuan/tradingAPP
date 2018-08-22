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
        };

        // 公司logo
        $http.get('/admin/user/companylogo').success(function(data){
            $scope.logoUrl=data.logo;
        });

        // 公司信息

        /**
         *  聚义商贸有限公司
         *  保定徐水区333省道遂城
         *  15100284122
         *  xuan03121994@163.com
         *  116.341221,39.743713
         */

        // 查询
        $scope.companyAct=function(){
            $http.get('/admin/user/companyquery').success(function(data){
                G.expire(data);
                if (data.id) {
                    $('#companyModel').modal('show');
                    $scope.c=data;
                } else {
                    $('#companyAddModel').modal('show');
                }
            });
        };

        // 添加
        $scope.companyAdd=function(){
            $('#companyAddId').ajaxForm({
                beforeSend:function(){
                    $scope.ADDCOIF = true;
                },
                success:function(data){
                    G.expire(data);
                    $scope.ADDCOIF = false;

                    $('.companyAddModel').modal('hide');
                    $('#alerts .modal-body').text(data.msg);
                    $('#alerts').modal('show');
                    document.getElementById("companyAddId").reset();
                }
            });
        };

        // 修改
        $scope.companyEditAct=function(){
            $('#companyEditModel').modal('show');
        };
        $scope.companyEdit=function(){
            $('#companyEditId').ajaxForm({
                beforeSend:function(){
                    $scope.EDITCOIF = true;
                },
                success:function(data){
                    G.expire(data);
                    $scope.EDITCOIF = false;

                    $('.companyEditModel').modal('hide');
                    $('#alerts .modal-body').text(data.msg);
                    $('#alerts').modal('show');
                    document.getElementById("companyEditId").reset();
                }
            });
        }

    }]);
