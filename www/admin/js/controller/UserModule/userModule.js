/**
 *  用户模块_主页
 */
angular.module('app')
    .controller('userCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

        // 用户数据列表
        $http.get('/admin/user/userlist').success(function(data){
            G.expire(data);
            $scope.userList=data;
        });

        // 用户添加
        $scope.userAdd=function(){
            $('#userAddId').ajaxForm({
                beforeSend:function(){
                    $scope.ADDUSERIF = true;
                },
                success:function(data){
                    G.expire(data);
                    $scope.ADDUSERIF = false;

                    $('.addUserModel').modal('hide');
                    $('#alerts .modal-body').text(data.msg);
                    $('#alerts').modal('show');
                    document.getElementById("userAddId").reset();
                    if(data.i){
                        $scope.Tip = function(){
                            // 更新数据
                            G.upview($http,G,'/admin/user/userlist',function(data){
                                $scope.userList=data;
                            });
                        }
                    }
                }
            });
        };

        // 用户删除
        $scope.userDel=function(id){
            $scope.del=function(){
                $http.get('/admin/user/userdel',{params:{id:id}}).success(function(data){
                    G.expire(data);
                    // 提交删除
                    $('.confirms').modal('hide');
                    $('#alerts .modal-body').text(data.msg);
                    $('#alerts').modal('show');
                    if(data.i){
                        $scope.Tip = function(){
                            // 更新数据
                            G.upview($http,G,'/admin/user/userlist',function(data){
                                $scope.userList=data;
                            });
                        }
                    }

                });
            }
        };

        // 用户修改
        $scope.userEdit=function(id){
            // 查询要修改的信息
            G.upview($http,G,'/admin/user/userlist',function(data){
                for(var i=0,len=data.length;i<len;i++){
                    if(data[i].id===id){
                        $scope.userDetail=data[i];
                        $scope.tel=parseInt(data[i].tel); // 电话处理
                    }
                }
            });
            // 修改数据
            $('#userEditId').ajaxForm({
                beforeSend:function(){
                    $scope.EDITUSERIF = true;
                },
                success:function(data){
                    G.expire(data);
                    $scope.EDITUSERIF = false;

                    $('.editUserModel').modal('hide');
                    $('#alerts .modal-body').text(data.msg);
                    $('#alerts').modal('show');
                    document.getElementById("userEditId").reset();
                    if(data.i){
                        $scope.Tip = function(){
                            // 更新数据
                            G.upview($http,G,'/admin/user/userlist',function(data){
                                $scope.userList=data;
                            });
                        }
                    }
                }
            });
        };

        // 释放模态框 重置表单
        $scope.dismiss=function(m){
            $('.'+m).modal('hide');
        }

    }]);
