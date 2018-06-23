var services = angular.module('Services',[]);
/**
 *  @loginHttp : 登录
 */
services.factory('loginHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var loginRes = {};
    return{
        // 登录操作
        getLoginAction:function(loginName,pwd){
            $http({
                url:G.apiUrl_dl+'loginByPhone',
                method:'post',
                data:{
                    'phone':loginName,
                    'pwd':pwd
                },
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).success(function(data){
                loginRes = data;
                $rootScope.$broadcast('getLoginAction.ok');
            });
        },
        // 返回登录信息
        backLoginMESS:function(){
            return loginRes;
        }
    };
}]);
/**
 *  @indexHttp : 主页
 */
services.factory('indexHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var noticeEnRes = {},
        noticehomeDATA = ''; // 接口更替
    // 全公司公告权限设置        *********  <-❤❤-<<
    if(sessionStorage.getItem("token")){
        var noticerightsall = sessionStorage.getItem('rights').split(','),
            gantf = noticerightsall.indexOf('gantf');
    }
    return{
        // 最新公告
        getnoticeEnData:function(){
            if(gantf === -1){
                noticehomeDATA = 'getNoticeTopFour';
            }else{
                noticehomeDATA = 'getAllNoticeTopFour';
            }

            $http({
                url:G.apiUrl_hs+noticehomeDATA+'?token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                noticeEnRes = data;
                $rootScope.$broadcast('getnoticeEnData.ok');
            });
        },
        // 返回信息
        backNoticeEnMESS:function(){
            // console.log(sessionStorage.getItem("token"));
            return noticeEnRes;
        }
    };
}]);
/**
 *  @noticeHttp : 公司公告
 */
services.factory('noticeHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var noticeRes = {};
    return{
        // 删除公告
        removeNoticeData:function(id){
            $http({
                url:G.apiUrl_hs+'deleteNotice'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id
                }
            }).success(function(data){
                noticeRes = data;
                $rootScope.$broadcast('removeNoticeData.ok');
            });
        },
        // 公告详情
        getNoticeDetail:function(id){
            $http({
                url:G.apiUrl_hs+'getNoticeById'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id
                }
            }).success(function(data){
                noticeRes = data;
                $rootScope.$broadcast('getNoticeDetail.ok');
            });
        },
        // 返回详情数据
        backNoticeDetail:function(){
            return noticeRes;
        }
    }

        ;
}]);
/**
 *  @clientManageHttp : 客源管理
 */
services.factory('clientManageHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var clientaddRES = {}, clientDetailsRES = {}, clientFiltRES = {}, clientShiftRES = {}, clientFollowRES = {}, clientCphoneRES = {}, addWantHouseRES={};
    return{
        /**
         *  客源新增
         *
         */
        // 客源新增_城区数据
        getclientCityData:function(){
            $http({
                url:G.apiUrl_cs+'allDis'+'?token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                clientaddRES = data;
                $rootScope.$broadcast('getclientCityData.ok');
            });
        },
        // 返回城数据
        backclientCityData:function(){
            return clientaddRES;
        },
        /**
         *  客源详情
         *
         */
        // 客源详情_获取数据
        getclientDetailsData:function(id){
            $http({
                url:G.apiUrl_cs+'getCustomerById'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id
                }
            }).success(function(data){
                clientDetailsRES = data;
                $rootScope.$broadcast('getclientDetailsData.ok');
            });
        },
        // 客源详情_返回数据
        backclientDetailsData:function(){
            return clientDetailsRES;
        },
        /**
         *  客源分页
         *
         */
        // 筛选联动_部门
        getclientFiltrateData:function(){
            $http({
                url:G.apiUrl_dl+'getDepartmentsInfo'+'?token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                clientFiltRES = data;
                $rootScope.$broadcast('getclientFiltrateData.ok');
            });
        },
        // 返回筛选联动_部门
        backclientFiltrateData:function(){
            return clientFiltRES;
        },
        // 电话号码百度搜索下拉数据
        getCustomerCellphone:function(cellphone){
            $http({
                url:G.apiUrl_cs+'getCustomerCellphone'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    cellphone:cellphone
                }
            }).success(function(data){
                clientCphoneRES = data;
                $rootScope.$broadcast('getCustomerCellphone.ok');
            });
        },
        // 返回电话号码百度搜索下拉数据
        backCustomerCellphone:function(){
            return clientCphoneRES;
        },
        /**
         *  客源转移
         *
         */
        // 请求转移
        getclientShiftAction:function(departmentId,departmentName,entrustUserId,entrustUserName,customerId){
            $http({
                url:G.apiUrl_cs+'transferCustomer'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    departmentId:departmentId,
                    departmentName:departmentName,
                    entrustUserId:entrustUserId,
                    entrustUserName:entrustUserName,
                    customerId:customerId
                }
            }).success(function(data){
                clientShiftRES = data;
                $rootScope.$broadcast('getclientShiftAction.ok');
            });
        },
        // 返回转移数据
        backclientShiftAction:function(){
            return clientShiftRES;
        },
        /**
         *  客源跟进
         *
         */
        // 获取跟进数据
        getclientFollow:function(customerId,followType,followContent,followUserId,followUserName,departmentId,departmentName){
            $http({
                url:G.apiUrl_cs+'addCustomerFollow'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    customerId:customerId,
                    followType:followType,
                    followContent:followContent,
                    followUserId:followUserId,
                    followUserName:followUserName,
                    departmentId:departmentId,
                    departmentName:departmentName
                }
            }).success(function(data){
                clientFollowRES = data;
                $rootScope.$broadcast('getclientFollow.ok');
            });
        },
        // 删除跟进信息
        removeclientFollow:function(id){
            $http({
                url:G.apiUrl_cs+'deleteCustomerFollow'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id
                }
            }).success(function(data){
                clientFollowRES = data;
                $rootScope.$broadcast('removeclientFollow.ok');
            });
        },
        // 返回跟进数据
        backclientFollow:function(){
            return clientFollowRES;
        },
        /**
         *  添加意向房源
         *
         */
        // 添加
        bclientAddWantHouse:function(customerId,houseId,dealType){
            $http({
                url:G.apiUrl_cs+'addWantHouse'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    customerId:customerId,
                    houseId:houseId,
                    dealType:dealType
                }
            }).success(function(data){
                addWantHouseRES = data;
                $rootScope.$broadcast('bclientAddWantHouse.ok');
            });
        },
        // 返回
        backCAddWantHouse:function(){
            return addWantHouseRES;
        }

    }
}]);
/**
 *  @rentResourceHttp : 出租房源
 */
services.factory('rentResourceHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var addRentRES = {}, addHouseCollectRES = {}, tfHouseRES={}, BGHouseInfo={};
    return{
        // 住宅房源新增_房源信息
        getRentinfoADD:function(){
            $http({
                url:G.apiUrl_cs+'getAllHouses'+'?token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                addRentRES = data;
                $rootScope.$broadcast('getRentinfoADD.ok');
            });
        },
        // 住宅房源新增_房源信息返回
        backRentinfoADD:function(){
            return addRentRES;
        },
        // 住宅房源新增_房源信息(办公)
        BGgetRentinfoADD:function(){
            $http({
                url:G.apiUrl_cs+'getAllHousesBG'+'?token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                BGHouseInfo = data;
                $rootScope.$broadcast('BGgetRentinfoADD.ok');
            });
        },
        // 住宅房源新增_房源信息返回(办公)
        BGbackRentinfoADD:function(){
            return BGHouseInfo;
        },
        // 加入收藏, 取消收藏
        addHouseCollect:function(URL,houseNAME,houseID){
            $http({
                url:G.apiUrl_cs+URL+'?'+houseNAME+'='+houseID+'&token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                addHouseCollectRES = data;
                $rootScope.$broadcast('addHouseCollect.ok');
            });
        },
        // 返回加入收藏
        backAddHouseCollect:function(){
            return addHouseCollectRES;
        },
        // 房源转移
        transferHouseFn:function(URL,entrustUserDeptId,entrustUserDeptName,entrustUserId,entrustUserName,houseId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    entrustUserDeptId:entrustUserDeptId,
                    entrustUserDeptName:entrustUserDeptName,
                    entrustUserId:entrustUserId,
                    entrustUserName:entrustUserName,
                    houseId:houseId
                }
            }).success(function(data){
                tfHouseRES = data;
                $rootScope.$broadcast('transferHouseFn.ok');
            });
        },
        // 返回转移数据
        transferHouseFnback:function(){
            return tfHouseRES;
        }

    }
}]);
/**
 *  @TransferManageHttp : 转盘管理
 */
services.factory('TransferManageHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var addRendTurntableRES={};
    return{
        // 新增申请转盘
        addRendTurntable:function(U,proposerReason,houseId){
            $http({
                url:G.apiUrl_cs+U+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{ proposerReason:proposerReason, houseId:houseId }
            }).success(function(data){
                addRendTurntableRES = data;
                $rootScope.$broadcast('addRendTurntable.ok');
            });
        },
        backAddRendTurntable:function(){
            return addRendTurntableRES;
        }

    }
}]);
/**
 *  @rentResourceDetailHttp : 出租房源详情
 */
services.factory('rentResourceDetaliHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var addEntrustRES={}, removeEntrustRES={}, HousePicRES={}, HousePicRES2={}, deleteHousePicRES={},
        HouseCheckRES={}, getHouseCheckRES={}, deleteHouseCheckRES={}, addHouseCommentRES={}, getHouseCommentRES={}, deleteHouseCommentRES={},
        detailHouseRES={}, lookHouseRES={}, topHousePicRES={}, addHouseAuditRES={}, getHouseAuditRES={}, getHousePublishRES={},
        addHouseTopRES={}, abolishEntrustRES={};
    return{
        // 住宅房源详情查询
        detailHouse:function(URL,houseId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    HouseId:houseId
                }
            }).success(function(data){
                detailHouseRES = data;
                $rootScope.$broadcast('detailHouse.ok');
            });
        },
        // 住宅房源详情查询返回
        backDetailHouse:function(){
            return detailHouseRES;
        },
        // 住宅房源新增_房源信息_委托
        getEntrustADD:function(URL,houseId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    houseid:houseId
                }
            }).success(function(data){
                addEntrustRES = data;
                $rootScope.$broadcast('getEntrustADD.ok');
            });
        },
        // 住宅房源新增_委托_房源信息返回
        backEntrustADD:function(){
            return addEntrustRES;
        },
        // 住宅房源_委托_房源信息删除
        getEntrustRemove:function(URL,id,houseId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id,
                    houseid:houseId
                }
            }).success(function(data){
                removeEntrustRES = data;
                $rootScope.$broadcast('getEntrustRemove.ok');
            });
        },
        // 住宅房源_委托_房源信息删除返回
        backEntrustRemove:function(){
            return removeEntrustRES;
        },
        // 住宅房源_委托_房源信息修改失效
        getEntrustAbolish:function(URL,id,houseId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id,
                    houseid:houseId
                }
            }).success(function(data){
                abolishEntrustRES = data;
                $rootScope.$broadcast('getEntrustAbolish.ok');
            });
        },
        backEntrustAbolish:function(){
            return abolishEntrustRES;
        },





        // 住宅房源_房源图片
        getHousePic:function(URL,houseId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    houseId:houseId,
                    type:1
                }
            }).success(function(data){
                HousePicRES = data;
                $rootScope.$broadcast('getHousePic.ok');
            });
        },
        // 返回住宅房源_房源图片数据
        backHousePic:function(){
            return HousePicRES;
        },
        // 住宅房源_合同图片
        getHousePic2:function(URL,houseId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    houseId:houseId,
                    type:2
                }
            }).success(function(data){
                HousePicRES2 = data;
                $rootScope.$broadcast('getHousePic2.ok');
            });
        },
        // 返回住宅房源_合同图片数据
        backHousePic2:function(){
            return HousePicRES2;
        },
        // 住宅房源_房源图片删除
        deleteHousePic:function(URL,id){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id
                }
            }).success(function(data){
                deleteHousePicRES = data;
                $rootScope.$broadcast('deleteHousePic.ok');
            });
        },
        // 住宅房源_房源图片删除信息返回
        backdeleteHousePic:function(){
            return deleteHousePicRES;
        },
        // 核验记录_查询
        getHouseCheck:function(URL,houseId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    houseId:houseId
                }
            }).success(function(data){
                getHouseCheckRES = data;
                $rootScope.$broadcast('getHouseCheck.ok');
            });
        },
        // 返回核验记录_新增
        backGetHouseCheck:function(){
            return getHouseCheckRES;
        },
        // 核验记录_新增
        addHouseCheck:function(URL,userId,userName,deptName,checkTime,remark,hidname,hid){
            $http({
                url:G.apiUrl_cs+URL+'?'+hidname+'='+hid+'&token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    userId:userId,
                    userName:userName,
                    deptName:deptName,
                    checkTime:checkTime,
                    remark:remark
                }
            }).success(function(data){
                HouseCheckRES = data;
                $rootScope.$broadcast('addHouseCheck.ok');
            });
        },
        // 返回核验记录_新增
        backAddHouseCheck:function(){
            return HouseCheckRES;
        },
        // 核验记录_删除
        deleteHouseCheck:function(URL,houseCheckId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    houseCheckId:houseCheckId
                }
            }).success(function(data){
                deleteHouseCheckRES = data;
                $rootScope.$broadcast('deleteHouseCheck.ok');
            });
        },
        // 返回核验记录_删除
        backDeleteHouseCheck:function(){
            return deleteHouseCheckRES;
        },
        // 房源评价_新增
        addHouseComment:function(URL,chidname,chid,comment){
            $http({
                url:G.apiUrl_cs+URL+'?'+chidname+'='+chid+'&token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    comment:comment
                }
            }).success(function(data){
                addHouseCommentRES = data;
                $rootScope.$broadcast('addHouseComment.ok');
            });
        },
        // 返回房源评价新增
        backAddHouseComment:function(){
            return addHouseCommentRES;
        },
        // 房源评价_查询
        getHouseComment:function(URL,houseId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    houseId:houseId
                }
            }).success(function(data){
                getHouseCommentRES = data;
                $rootScope.$broadcast('getHouseComment.ok');
            });
        },
        // 返回房源评价_查询
        backGetHouseComment:function(){
            return getHouseCommentRES;
        },
        // 房源评价_删除
        deleteHouseComment:function(URL,houseCommentId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    houseCommentId:houseCommentId
                }
            }).success(function(data){
                deleteHouseCommentRES = data;
                $rootScope.$broadcast('deleteHouseComment.ok');
            });
        },
        // 返回房源评价_删除
        backDeleteHouseComment:function(){
            return deleteHouseCommentRES;
        },
        // 看房源
        lookHouse:function(URL,id){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    houseId:id
                }
            }).success(function(data){
                lookHouseRES = data;
                $rootScope.$broadcast('lookHouse.ok');
            });
        },
        // 看房源返回
        backLookHouse:function(){
            return lookHouseRES;
        },
        // 房源图片设为首页
        topHousePic:function(URL,pichidName,houseId,path){
            $http({
                url:G.apiUrl_cs+URL+'?'+pichidName+'='+houseId+'&token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    picPath:path
                }
            }).success(function(data){
                topHousePicRES = data;
                $rootScope.$broadcast('topHousePic.ok');
            });
        },
        backTopHousePic:function(){
            return topHousePicRES;
        },
        // 新增审核
        addHouseAudit:function(URL,tache,operation,comment,addAuditIDname,addAuditID){
            $http({
                url:G.apiUrl_cs+URL+'?'+addAuditIDname+'='+addAuditID+'&token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    tache:tache,
                    operation:operation,
                    comment:comment
                }
            }).success(function(data){
                addHouseAuditRES = data;
                $rootScope.$broadcast('addHouseAudit.ok');
            });
        },
        // 返回新增审核
        backAddHouseAudit:function(){
            return addHouseAuditRES;
        },
        // 获取审核环节_房源审核
        getHouseAudit:function(URL,houseId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    houseId:houseId
                }
            }).success(function(data){
                getHouseAuditRES = data;
                $rootScope.$broadcast('getHouseAudit.ok');
            });
        },
        // 返回审核环节
        backGetHouseAudit:function(){
            return getHouseAuditRES;
        },
        // 获取审核环节_房源发布
        getHousePublish:function(URL,houseId){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    houseId:houseId
                }
            }).success(function(data){
                getHousePublishRES = data;
                $rootScope.$broadcast('getHousePublish.ok');
            });
        },
        // 返回审核环节_房源发布
        backGetHousePublish:function(){
            return getHousePublishRES;
        },
        // 房源锁定
        lockHouse:function(URL,houseId,lockState){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:houseId,
                    lockState:lockState
                }
            });
        },
        // 房源置顶
        addHouseTop:function(URL,topIdName,topId){
            $http({
                url:G.apiUrl_cs+URL+'?'+topIdName+'='+topId+'&token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                addHouseTopRES=data;
                $rootScope.$broadcast('addHouseTop.ok');
            });
        },
        // 返回置顶
        addHouseTopback:function(){
            return addHouseTopRES
        }
    }
}]);
/**
 *  @contractResourceHttp : 成交管理合同号房源
 */
services.factory('contractResourceHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var contractResourceRES={};
    return{
        // 编辑合同号
        updateContractNum:function(id,departmentId,departmentName,contractType){
            $http({
                url:G.apiUrl_cs+'updateContractNum?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id,
                    departmentId:departmentId,
                    departmentName:departmentName,
                    contractType:contractType
                }
            }).success(function(data){
                contractResourceRES = data;
                $rootScope.$broadcast('updateContractNum.ok');
            });
        },
        // 编辑合同号返回
        backUpdateContractNum:function(){
            return contractResourceRES;
        },
        // 回收合同号
        recycleContractNum:function(id){
            $http({
                url:G.apiUrl_cs+'recycleContractNum?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id
                }
            }).success(function(data){
                contractResourceRES = data;
                $rootScope.$broadcast('recycleContractNum.ok');
            });
        },
        // 回收合同号返回
        backRecycleContractNum:function(){
            return contractResourceRES;
        },
        // 标注合同号
        labelContractNum:function(id,type,useDetails,contractType){
            $http({
                url:G.apiUrl_cs+'labelContractNum?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id,
                    type:type,
                    useDetails:useDetails,
                    contractType:contractType
                }
            }).success(function(data){
                contractResourceRES = data;
                $rootScope.$broadcast('labelContractNum.ok');
            });
        },
        // 标注合同号返回
        backlabelContractNum:function(){
            return contractResourceRES;
        },
        // 删除合同号
        deleteContractNum:function(id,contractType){
            $http({
                url:G.apiUrl_cs+'deleteContractNum?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id,
                    contractType:contractType
                }
            }).success(function(data){
                contractResourceRES = data;
                $rootScope.$broadcast('deleteContractNum.ok');
            });
        },
        // 删除合同号返回
        backdeleteContractNum:function(){
            return contractResourceRES;
        }
    };
}]);
/**
 *  @contractResourceHttp : 成交管理出租成交/出售成交-详情
 */
services.factory('detailTransactionHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var detailTransactionDataRES={};
    return{
        // 成交详情查询
        detailTransactionData:function(U,id){
            $http({
                url:G.apiUrl_cs+U+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    TransactionId:id
                }
            }).success(function(data){
                detailTransactionDataRES = data;
                $rootScope.$broadcast('detailTransactionData.ok');
            });
        },
        // 成交详情查询返回
        backDetailTransactionData:function(){
            return detailTransactionDataRES;
        },
        // 佣金记录查询
        getCommissionQuery:function(U,id){
            $http({
                url:G.apiUrl_cs+U+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    transactionId:id
                }
            }).success(function(data){
                detailTransactionDataRES = data;
                $rootScope.$broadcast('getCommissionQuery.ok');
            });
        },
        // 佣金记录查询返回
        backCommissionQuery:function(){
            return detailTransactionDataRES;
        },
        // 分成信息查询
        getDivideQuery:function(U,id){
            $http({
                url:G.apiUrl_cs+U+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    transactionId:id
                }
            }).success(function(data){
                detailTransactionDataRES = data;
                $rootScope.$broadcast('getDivideQuery.ok');
            });
        },
        // 分成信息查询返回
        backDivideQuery:function(){
            return detailTransactionDataRES;
        },
        // 分成信息详情查询
        getDivideDetile:function(U,id){
            $http({
                url:G.apiUrl_cs+U+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id
                }
            }).success(function(data){
                detailTransactionDataRES = data;
                $rootScope.$broadcast('getDivideDetile.ok');
            });
        },
        // 分成信息详情查询返回
        backDivideDetile:function(){
            return detailTransactionDataRES;
        }
    };
}]);
/**
 *  @commissionControlHttp : 成交管理-佣金管理
 */
services.factory('commissionControlHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var commissionControlRES={};
    return{
        // 确认操作
        confirmRentCommission:function(URL,id){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    commissionId:id
                }
            }).success(function(data){
                commissionControlRES = data;
                $rootScope.$broadcast('confirmRentCommission.ok');
            });
        },
        // 确认操作返回
        backConfirmRentCommission:function(){
            return commissionControlRES;
        },
        // 审核操作
        auditRentCommission:function(URL,id,money){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    commissionId:id,
                    money:money
                }
            }).success(function(data){
                commissionControlRES = data;
                $rootScope.$broadcast('auditRentCommission.ok');
            });
        },
        // 审核操作返回
        backAuditRentCommission:function(){
            return commissionControlRES;
        },
        // 确认时间
        updateRentCommissionConfirmTime:function(URL,id,time){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id, time:time
                }
            }).success(function(data){
                commissionControlRES = data;
                $rootScope.$broadcast('updateRentCommissionConfirmTime.ok');
            });
        },
        // 确认时间返回
        backUpdateRentCommissionConfirmTime:function(){
            return commissionControlRES;
        },
        // 审核时间
        updateRentCommissionAuditTime:function(URL,id,time){
            $http({
                url:G.apiUrl_cs+URL+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id, time:time
                }
            }).success(function(data){
                commissionControlRES = data;
                $rootScope.$broadcast('updateRentCommissionAuditTime.ok');
            });
        },
        // 审核时间返回
        backUpdateRentCommissionAuditTime:function(){
            return commissionControlRES;
        }
    };
}]);
/**
 *  @transferVerifyHttp : 成交管理-过户确认
 */
services.factory('transferVerifyHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var transferVerifyRES={};
    return{
        // 收件确认
        addSellTransfer:function(U,tache,operation,fitPerson,personRemark,transactionId,status){
            $http({
                url:G.apiUrl_cs+U+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    tache:tache, operation:operation, fitPerson:fitPerson, personRemark:personRemark, transactionId:transactionId, status:status
                }
            }).success(function(data){
                transferVerifyRES = data;
                $rootScope.$broadcast('addSellTransfer.ok');
            });

        },
        addSellTransferBACK:function(){
            return transferVerifyRES;
        },
        // 流程查询
        getSellTransactionList:function(U,id){
            $http({
                url:G.apiUrl_cs+U+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id
                }
            }).success(function(data){
                transferVerifyRES = data;
                $rootScope.$broadcast('getSellTransactionList.ok');
            });
        },
        getSellTransactionListBACK:function(){
            return transferVerifyRES
        },
        // 修改过户确认人员
        editUSERActionOk:function(U,id,transferUserId,transferUserName){
            $http({
                url:G.apiUrl_cs+U+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id, transferUserId:transferUserId, transferUserName:transferUserName
                }
            }).success(function(data){
                transferVerifyRES = data;
                $rootScope.$broadcast('editUSERActionOk.ok');
            });
        },
        editUSERActionOkBACK:function(){
            return transferVerifyRES;
        }

    };
}]);
/**
 *  @cityAreaHttp : 城市片区
 */
services.factory('cityAreaHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var cityRes = {},   // 城区数据
        areaRes = {},   // 片区数据
        infoMESS = {};  // 返回信息
    return{
        // 城区列表
        getCityList:function(){
            $http({
                url:G.apiUrl+'allDis'+'?token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                cityRes = data;
                $rootScope.$broadcast('getCityList.ok');
            });
        },
        // 返回城区列表数据
        backCityList:function(){
            return cityRes;
        },
        // 片区列表
        getAreaList:function(disId){
            $http({
                url:G.apiUrl+'getArea'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    disId:disId
                }
            }).success(function(data){
                areaRes = data;
                $rootScope.$broadcast('getAreaList.ok');
            });
        },
        // 新增片区
        addAreaData:function(name,districtId,state){
            $http({
                url:G.apiUrl+'addArea'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    name:name,
                    districtId:districtId,
                    state:state
                }
            }).success(function(data){
                infoMESS = data;
                $rootScope.$broadcast('addAreaData.ok');
            });
        },
        // 返回片区列表数据
        backAreaList:function(){
            return areaRes;
        },
        // 片区删除功能
        removeAreaData:function(areaId){
            $http({
                url:G.apiUrl+'delArea'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    areaId:areaId
                }
            }).success(function(data){
                infoMESS = data;
                $rootScope.$broadcast('removeAreaData.ok');
            });
        },
        // 片区编辑功能
        EditAreaData:function(name,id){
            $http({
                url:G.apiUrl+'updateArea'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    name:name,
                    id:id
                }
            }).success(function(data){

            });
        },
        // 城区新增功能
        addCityData:function(name,id){
            $http({
                url:G.apiUrl+'addDis'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    name:name,
                    pid:id
                }
            }).success(function(data){
                infoMESS = data;
                $rootScope.$broadcast('addCityData.ok');
            });
        },
        // 返回提示信息
        backInfoMESS:function(){
            return infoMESS;
        }
    };
}]);
/**
 *  @housesDictionaryHttp : 楼盘字典列表+新增
 */
services.factory('housesDictionaryHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var housesRes = {}, addhousesRes = {};   // 楼盘默认列表
    return{
        // 楼盘默认列表
        getHousesList:function(){
            $http({
                url:G.apiUrl+'getHouses'+'?token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                housesRes = data;
                $rootScope.$broadcast('getHousesList.ok');
            });
        },
        // 条件搜索
        searchHousesList:function(state,areaId,name,rows){
            $http({
                url:G.apiUrl+'getHouses'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    state:state,
                    areaId:areaId,
                    name:name,
                    rows:rows
                }
            }).success(function(data){
                housesRes = data;
                $rootScope.$broadcast('getHousesList.ok');
            });
        },
        // 返回楼盘列表
        backHousesList:function(){
            return housesRes;
        },
        // 楼盘字典新增_责任部门
        gteaddHousesDep:function(){
            $http({
                url:G.apiUrl_dl+'getHighDepartments'+'?token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                addhousesRes = data;
                $rootScope.$broadcast('gteaddHousesDep.ok');
            });
        },
        backaddHousesDep:function(){
            return addhousesRes
        }
    };
}]);
/**
 *  @housesDictionaryHttp : 楼盘字典详情
 */
services.factory('housesDicDetailsHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var housesDetailsRes={}, housesnumRes={};
    return{
        // 楼盘详情信息查询
        getHousesDetails:function(housesId){
            $http({
                url:G.apiUrl+'detailHouses'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    housesId:housesId
                }
            }).success(function(data){
                housesDetailsRes = data;
                $rootScope.$broadcast('getHousesDetails.ok');
            });
        },
        // 返回楼盘详情信息数据
        backHousesDetails:function(){
            return housesDetailsRes;
        },
        // 物业表格编辑
        EditpropertyData:function(id,developers,packingSpace,packingMoney,propertyManagement,propertyPhone,propertyMoney,heatingMoney){
            $http({
                url:G.apiUrl+'updateDevelopers'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id,
                    developers:developers,
                    packingSpace:packingSpace,
                    packingMoney:packingMoney,
                    propertyManagement:propertyManagement,
                    propertyPhone:propertyPhone,
                    propertyMoney:propertyMoney,
                    heatingMoney:heatingMoney
                }
            }).success(function(data){

            });
        },

        // 房号删除
        deleteHnum:function(id){
            $http({
                url:G.apiUrl_cs+'deleteHouseNo'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    id:id
                }
            }).success(function(data){
                housesnumRes = data;
                $rootScope.$broadcast('deleteHnum.ok');
            });
        },
        // 返回房号删除
        backDeleteHnum:function(){
            return housesnumRes;
        }
    };
}]);
/**
 *  @dutyHouseHttp : 责任盘_区域经理_店长
 */
services.factory('dutyHouseHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var dutyDepRES={}, dutyEditRES={}, dutyEditGRES={};
    return{
        // 店组数据
        getdutyDep:function(api){
            $http({
                url:G.apiUrl_dl+api+'?token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                dutyDepRES = data;
                $rootScope.$broadcast('getdutyDep.ok');
            });
        },
        backdutyDep:function(){
            return dutyDepRES;
        },
        // 指定店组
        getdutyEdit:function(ridgepoleId,departmentId){
            $http({
                url:G.apiUrl_cs+'updateRidgepoleDepartmentId'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    ridgepoleId:ridgepoleId,
                    departmentId:departmentId
                }
            }).success(function(data){
                dutyEditRES = data;
                $rootScope.$broadcast('getdutyEdit.ok');
            });
        },
        // 返回指定店组信息
        backdutyEdit:function(){
            return dutyEditRES;
        },
        // 指定经纪人
        getdutyGEdit:function(ridgepoleId,entrustUserId){
            $http({
                url:G.apiUrl_cs+'updateRidgepoleEntrustUserId'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    ridgepoleId:ridgepoleId,
                    entrustUserId:entrustUserId
                }
            }).success(function(data){
                dutyEditGRES = data;
                $rootScope.$broadcast('getdutyGEdit.ok');
            });
        },
        // 返回指定经纪人信息
        backdutyGEdit:function(){
            return dutyEditGRES;
        }
    };
}]);
/**
 *  @distributePageHttp : 分页服务
 */
services.factory('distributePageHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    return {

    }

}]);
/**
 *  @rightsActionHttp : 权限操作服务
 */
services.factory('rightsActionHttp',function(){
    return {
        rightsAction:function(){
            if(sessionStorage.getItem("token")){
                var rights = sessionStorage.getItem('rights').split(',');
                for(var i=0;i<arguments.length;i++){
                    var Rootrights = rights.indexOf(arguments[i]);
                    if(Rootrights === -1){
                        $('.'+arguments[i]).hide();
                    }else{
                        $('.'+arguments[i]).show();
                    }
                }
            }
        }
    }

});
/**
 *  @LinkDataHttp : 数据联动服务
 */
services.factory('LinkDataHttp',['$rootScope','$http','G',function($rootScope,$http,G){
    var gangedDataRES={};
    return{
        // 城区
        DistrictHTTP:function(){
            $http({
                url:G.apiUrl_cs+'allDistrictNameAndId?token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                gangedDataRES = data;
                $rootScope.$broadcast('DistrictHTTP.ok');
            });
        },
        DistrictHTTPBACK:function(){
            return gangedDataRES;
        },
        // 片区
        Area:function(disId){
            $http({
                url:G.apiUrl_cs+'getAreaNameAndId?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    disId:disId
                }
            }).success(function(data){
                gangedDataRES = data;
                $rootScope.$broadcast('Area.ok');
            });
        },
        AreaBACK:function(){
            return gangedDataRES;
        },
        // 部门
        DEPHTTP:function(){
            $http({
                url:G.apiUrl_dl+'getTransactDepartments?token='+sessionStorage.getItem("token"),
                method:'GET'
            }).success(function(data){
                gangedDataRES = data;
                $rootScope.$broadcast('DEPHTTP.ok');
            });
        },
        DEPHTTPBACK:function(){
            return gangedDataRES;
        },
        // 人员
        USERHTTP:function(departmentsId){
            $http({
                url:G.apiUrl_dl+'getTransactUserByDepartmentsId'+'?token='+sessionStorage.getItem("token"),
                method:'GET',
                params:{
                    departmentsId:departmentsId
                }
            }).success(function(data){
                gangedDataRES=data;
                $rootScope.$broadcast('USERHTTP.ok');
            });
        },
        USERHTTPBACK:function(){
            return gangedDataRES;
        }

    };
}]);