var dirt = angular.module('Directives',[]);
/**
 *  页面加载完成时
 *
 */
dirt.directive('onFinishRenderFilters',['$timeout',function($timeout){
    return {
        restrict:'A',
        link:function(scope){
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
}]);
/**
 *  设置主题
 *  @themeStart : 开启设置界面
 *  @themeEnd   : 关闭设置界面
 *
 */
dirt.directive('themeStart',function(){
    return {
        restrict:'A',
        replace:true,
        link:function(scope,element){
            $(element).on('click',function(){
                $('#adminTheme').stop(true,true).animate({'bottom':0},500);
            })
        }
    }
});
dirt.directive('themeEnd',function(){
    return {
        restrict:'A',
        replace:true,
        link:function(scope,element){
            $(element).on('click',function(){
                $('#adminTheme').stop(true,true).animate({'bottom':'-10%'},500);
            });
        }
    }
});
/**
 *  选项卡
 *  @xstsTab  : 切换盒显隐操作
 *
 */
dirt.directive('xstsTab',function(){
    return {
        restrict:'A',
        replace:true,
        link:function(scope,element){
            $(element).delegate('li','click',function(){
                $(this).addClass('active').siblings('li').removeClass('active');
                var index = $(this).index();
                var tabBox = $(this).parent().parent().next('.panel-body').find('.tab-pane');
                tabBox.eq(index).css({'display':'block'}).siblings('.tab-pane').css({'display':'none'});
                $(this).parent('ul').siblings('.filterClassCustom').find('button').removeClass('active');
            })
        }
    }
});
/**
 *  表格编辑功能
 *  @xstsTableEdit : 表格内点击编辑输入框可编辑可保存
 *
 */
dirt.directive('xstsTableEdit',function(){
    return {
        restrict:'A',
        replace:true,
        link:function(scope,element){
            $(element).delegate('.tableEdit','click',function(){
                var _this = $(this);
                // 按钮控制
                $(this).prevAll('.btn-xs').css({'display':'inline-block'});
                $(this).css({'display':'none'});
                // 输入框控制
                $(this).parent('td').prevAll('td').find('input').attr('readonly',false);
                // 取消操作
                $(this).siblings('.tableEditBtnClose').on('click',function(){
                    $(this).css({'display':'none'});
                    $(this).siblings('button').css({'display':'none'});
                    _this.css({'display':'inline-block'});
                    _this.parent('td').prevAll('td').find('input').attr('readonly',true);
                });
            })
        }
    }
});
/**
 *  全选
 *  @xstsCheckAll : 全选/不选
 *
 */
/*dirt.directive('xstsCheckAll',function(){
    return {
        restrict:'A',
        replace:true,
        link:function(scope,element){
            function iCheck(checkObj,boole){
                for(var i=0;i<checkObj.length;i++){
                    checkObj[i].checked = boole;
                }
            }
            var flag = false;
            $(element).delegate('#checkAll','click',function(){
                var itemCheck = $(this).parent().parent().parent().next().find('input[type="checkbox"]');
                flag = !flag;
                if(flag){
                    iCheck(itemCheck,true);
                }else{
                    iCheck(itemCheck,false);
                }
            })
        }
    }
});*/
dirt.directive('xstsCheckAll',function(){
    return {
        restrict:'A',
        replace:true,
        link:function(scope,element){
            function iCheck(checkObj,boole){
                for(var i=0;i<checkObj.length;i++){
                    checkObj[i].checked = boole;
                }
            }
            var flag = false;
            $(element).on('click',function(){
                var itemCheck = $(this).parents('#main-content').find('input[type="checkbox"]');
                flag = !flag;
                if(flag){
                    iCheck(itemCheck,true);
                }else{
                    iCheck(itemCheck,false);
                }
            })
        }
    }
});
/**
 *  展开收起
 *  @xstsToggleMess : 展开/收起
 *
 */
dirt.directive('xstsToggleMess',function(){
    return {
        restrict:'A',
        replace:true,
        scope:{
            xstsToggleMess:'@',
            xstsToggleMessInit:'@'
        },
        link:function(scope,element){
            var flag = false;
            $(element).delegate('p','click',function(){
                flag = !flag;
                if(flag){
                    $(this).parent().stop(true,true).animate({'height':parseInt($('.xstsToggleMess').attr('xsts-toggle-mess'))},500);
                    $(this).find('span').text('收起更多');
                    $(this).find('i').attr('class','icon-angle-up');
                }else{
                    $(this).parent().stop(true,true).animate({'height':parseInt($('.xstsToggleMess').attr('xsts-toggle-mess-init'))},500);
                    $(this).find('span').text('更多选项');
                    $(this).find('i').attr('class','icon-angle-down');
                }
            })
        }
    }
});
/**
 *  返回顶部
 *  @xstsGotop : 返回顶部
 *
 */
dirt.directive('xstsGotop',function(){
    return {
        restrict:'A',
        replace:true,
        link:function(scope,element){
            // 位置控制显隐
            $(document).scroll(function(){
                var oscrollHeight = $(document).scrollTop();
                if(oscrollHeight>300){
                    $(element).fadeIn();
                }else{
                    $(element).fadeOut();
                }
            });
            // 返回顶部
            $(element).on('click',function(){
                $("html,body").animate({"scrollTop":0},1000);
            })
        }
    }
});
/**
 *  置顶
 *  @xstsSetTop : 返回顶部
 *
 */
dirt.directive('xstsSetTop',function(){
    return {
        restrict:'A',
        replace:true,
        link:function(scope,element){
            var flag = true;
            $(element).delegate('.settop','click',function(){
                flag = !flag;
                if(!flag){
                    $(this).removeClass('btn-white');
                    $(this).addClass('btn-danger');
                    $(this).html('<i class="icon-star"></i>取消置顶');
                }else{
                    $(this).removeClass('btn-danger');
                    $(this).addClass('btn-white');
                    $(this).html('<i class="icon-star-empty"></i>置顶房源');
                }
            })
        }
    }
});
/**
 *  锚点导航
 *  @xstsAnchorNav : 锚点导航
 *
 */
dirt.directive('xstsAnchorNav',function(){
    return {
        restrict:'A',
        replace:true,
        link:function(scope,element){
            var a = $(element).offset().top, navs = $(element).find('li'), box = $('.content-wrapper');

            $(window).scroll(function(){
                // 固定位置
                var obj_height = document.documentElement.scrollTop || document.body.scrollTop;
                if(obj_height>=a){
                    $(element).css({"position":"fixed","left":0,"top":0,"zIndex":9});
                }else{
                    $(element).css({"position":"relative","left":0,"top":0,"zIndex":0});
                }
                // 跟随
            });

        }
    }
});
/**
 *  按钮切换
 *  @xstsBtnToggle : 按钮切换
 *
 */
dirt.directive('xstsBtnToggle',function(){
    return {
        restrict:'A',
        replace:true,
        link:function(scope,element){
            $(element).on('click',function(){
                $(this).css({'display':'none'});
                $(this).siblings('button').css({'display':'inline-block'});
                $(this).prev('button').on('click',function(){
                    $(this).css({'display':'none'});
                    $(this).siblings('.btn-danger').css({'display':'none'});
                    $(this).siblings('.btn-primary').css({'display':'inline-block'});
                });
                $(this).next('button').on('click',function(){
                    $(this).css({'display':'none'});
                    $(this).siblings('.btn-info').css({'display':'none'});
                    $(this).siblings('.btn-primary').css({'display':'inline-block'});
                });
            })

        }
    }
});
/**
 *  删除列表按钮
 *  @xstsItemsDeleteBtn : 删除列表按钮
 *
 */
dirt.directive('xstsItemsDeleteBtn',function(){
    return {
        restrict:'A',
        replace:true,
        link:function(scope,element){
            var itemsDeleF = false;
            $(element).on('click',function(){
                itemsDeleF = !itemsDeleF;
                if(itemsDeleF){
                    $(this).css({'background':'#849aae'});
                    $(this).text('取消删除');
                    // 控制子删除按钮
                    $(this).parent('.noticeItemsDeleteCtrl').find('.noticeItemsDeleteBTN').css({'display':'block'});

                }else{
                    $(this).css({'background':'#ff6c60'});
                    $(this).text('删除公告');
                    // 控制子删除按钮
                    $(this).parent('.noticeItemsDeleteCtrl').find('.noticeItemsDeleteBTN').css({'display':'none'});
                }
            })

        }
    }
});
/**
 *  自定义筛选条件输入框
 *  @xstsScreenInputBtn : 清除同级选项
 *
 */
dirt.directive('xstsScreenInputBtn',function(){
    return {
        restrict:'A',
        replace:true,
        link:function(scope,element){
            $(element).on('click',function(){
                $(this).addClass('active').parent('.filterClassCustom').siblings('ul').find('li.active').removeClass('active');
            });

        }
    }
});

