/**
 *  网站编辑模块_主页
 */
angular.module('app')
    .controller('websiteCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

        // 公司logo
        $http.get('/admin/user/companylogo').success(function(data){
            $('.webLogoPic').css({'backgroundImage':'url('+data.logo+')'});
        });

        // logot图片浏览操作
        $scope.selectLogoPic = function(){
            $('#selectLogoPicId').click();
        };
        $scope.EDITLOGOIF = true;
        $('#selectLogoPicId').change(function(){
            var path = window.URL.createObjectURL(this.files[0]);
            $('.webLogoPic').css({'backgroundImage':'url('+path+')'});
            $scope.$apply(function(){
                $scope.EDITLOGOIF = false;
            });
        });

        // logo图片上传操作
        $scope.logoEdit=function(){
            $('.webLogoModel').modal('hide');
            $('#logoEditId').ajaxForm({
                beforeSend:function(){
                    $scope.EDITLOGOIF = true;
                },
                success:function(data){
                    G.expire(data);
                    $scope.EDITLOGOIF = false;
                    $('#alerts').modal('show');
                    $('#alerts .modal-body').text(data.msg);
                    if(data.i){
                        $scope.Tip = function(){
                            // 跳转到列表
                            setTimeout(function(){
                                location.reload();
                            },500);
                        }
                    }
                }
            });
        };

    }]);
