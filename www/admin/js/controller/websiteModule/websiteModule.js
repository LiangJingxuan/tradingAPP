/**
 *  网站编辑模块_主页
 */
angular.module('app')
    .controller('websiteCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

        // website信息查询
        $http.get('/common/webinfoquery').success(function(data){
            G.expire(data);
            // logo图片路径查询
            $('.webLogoPic').css({'backgroundImage':'url('+data.logo+')'});

            try {
                // 品牌介绍信息查询
                $scope.brandScope=JSON.parse(data.brand);
                $scope.brandInfoModel=$scope.brandScope.brandInfo;
                $scope.goodsInfoModel=$scope.brandScope.goodsInfo;

                // 活动图片路径查询
                var sales = data.sales.split(','),
                    box = $('.webSalesPic');
                for(var i=0,len=sales.length;i<len;i++){
                    for(var k=0,len2=box.length;k<len2;k++){
                        if(k===i){
                            $(box[k]).css({'backgroundImage':'url('+sales[i]+')'});
                        }
                    }
                }

                // 轮播图信息查询
                $scope.adItem=JSON.parse(data.adinfo);

            }catch (e) {

            }
        });

        /**
         * 图片上传操作封装
         *
         * 图片浏览操作参数
         * @param files：input file 文件选择框
         * @param btns：点击选中图片 div 按钮
         *
         * 图片上传操作参数
         * @param submitBtn：提交上传 按钮
         * @param modal：需要关闭的模态框
         * @param upForm：对应的form表单
         * @param rId：上传成功是否需要操作标志
         *
         */
        function upImageAct(files,btns,submitBtn,modal,upForm,rId){

            // 确认修改按钮控制禁用
            $('.award-item').click(function(){
                $scope.$apply(function() {
                    $scope.EDITUPIF = true;
                });
            });

            // 图片浏览操作
            for(var i=0,len=btns.length;i<len;i++){
                (function(i){
                    // 打开图片
                    $(btns[i]).click(function(){
                        $(files[i]).click();
                    });
                    // 显示图片
                    $(files[i]).change(function(){
                        var path = window.URL.createObjectURL(this.files[0]);
                        $(btns[i]).css({'backgroundImage':'url('+path+')'});

                        // 按钮控制禁用
                        if((btns.length-1)===i){
                            $scope.$apply(function() {
                                $scope.EDITUPIF = false;
                            });
                        }
                    });
                })(i);
            }

            // 图片上传操作
            submitBtn.click(function(){
                modal.modal('hide');
                upForm.ajaxForm({
                    beforeSend:function(){
                        $scope.EDITUPIF = true;
                    },
                    success:function(data){
                        G.expire(data);
                        $scope.EDITUPIF = false;
                        $('#webAlerts').modal('show');
                        $('#webAlerts .modal-body').text(data.msg);
                        if(data.i){
                            $scope.Tip = function(){
                                if(rId){
                                    // 刷新页面
                                    setTimeout(function(){
                                        location.reload();
                                    },500);
                                }else {
                                    // 修改日志信息查询
                                    $http.get('/admin/website/log').success(function(data){
                                        G.expire(data);
                                        $scope.logList=data;
                                    })
                                }
                            }

                        }
                    }
                });
            });

        }

        // logo图片上传
        var logoFiles=$('#logoEditId input[name="logo"]'), logoBtns=$('#logoEditId .webLogoPic'),
            logoSubmitBtn=$('#logoSubmitBtnId'), logoModal=$('.webLogoModel'), logoUpForm=$('#logoEditId');
        upImageAct(logoFiles,logoBtns,logoSubmitBtn,logoModal,logoUpForm,true);

        // 活动宣传图片上传
        var salesFiles=$('#salesEditId input[name="sales"]'), salesdBtns=$('#salesEditId .webSalesPic'),
            salesSubmitBtn=$('#salesSubmitBtnId'), salesModal=$('.webSalesModel'), salesUpForm=$('#salesEditId');
        upImageAct(salesFiles,salesdBtns,salesSubmitBtn,salesModal,salesUpForm,false);

        // 轮播图片上传
        var adFiles=$('#adEditId input[name="ad"]'), adBtns=$('#adEditId .webAdPic'),
            adSubmitBtn=$('#adSubmitBtnId'), adModal=$('.webAdModel'), adUpForm=$('#adEditId');
        upImageAct(adFiles,adBtns,adSubmitBtn,adModal,adUpForm,false);

        // 品牌介绍编辑操作
        $scope.brandEdit=function(){
            $('.webBrandModel').modal('hide');
            $('#brandEditId').ajaxForm({
                beforeSend:function(){
                    $scope.EDITBRANDIF = true;
                },
                success:function(data){
                    G.expire(data);
                    $scope.EDITBRANDIF = false;
                    $('#webAlerts').modal('show');
                    $('#webAlerts .modal-body').text(data.msg);
                    $scope.Tip = function(){
                        // 修改日志信息查询
                        $http.get('/admin/website/log').success(function(data){
                            G.expire(data);
                            $scope.logList=data;
                        })
                    }
                }
            });
        };

        // 修改日志信息查询
        $http.get('/admin/website/log').success(function(data){
            G.expire(data);
            $scope.logList=data;
        })

    }]);