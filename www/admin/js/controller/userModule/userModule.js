/**
 *  用户模块_主页
 */
angular.module('app')
    .controller('userCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

        // 用户数据列表
        $http.get('/admin/user/userlist').success(function(data){
            $scope.userList=data;
        });

        // 用户添加
        $scope.userAdd=function(){
            $('#userAddId').ajaxForm({
                beforeSend:function(){
                    $scope.ADDUSERIF = true;
                },
                success:function(data){
                    $scope.ADDUSERIF = false;
                    /*if(data.success){
                        $('.rrAddRentTip h4').text(data.msg);
                        $('.rrAddRentTip').modal({backdrop: 'static', keyboard: false, show: true});
                        $scope.rrAddRentTip = function(){
                            $('.rrAddRentTip').modal('hide');
                            setTimeout(function(){$state.go('residenceResource',{ID:'getRendHouseByCond'})},500)
                        }
                    }else{
                        $('.rrAddRentTip h4').text(data.msg);
                        $('.rrAddRentTip').modal({backdrop: 'static', keyboard: false, show: true});
                        $scope.rrAddRentTip = function(){
                            $('.rrAddRentTip').modal('hide');
                        }
                    }*/
                }
            });
        }

    }]);
