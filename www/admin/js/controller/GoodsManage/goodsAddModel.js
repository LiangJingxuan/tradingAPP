/**
 *  商品管理模块_商品添加
 */
angular.module('app')
    .controller('goodsAddCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G',function($scope,$rootScope,$location,$anchorScroll,$http,G){
        $location.hash('main-content');
        $anchorScroll();

        // 产品图片上传
        $(function() {
            var delParent,
                defaults = {
                    fileType: ["jpg", "png", "bmp", "jpeg"],
                    fileSize: 1024 * 1024 * 10
                };
            $(".file").change(function() {
                var idFile = $(this).attr("id"),
                    file = document.getElementById(idFile),
                    imgContainer = $(this).parents(".z_photo"),
                    fileList = file.files,
                    input = $(this).parent(),
                    imgArr = [],
                    numUp = imgContainer.find(".up-section").length,
                    totalNum = numUp + fileList.length;
                if (fileList.length > 5 || totalNum > 5) {
                    alert("上传图片数目不可以超过5个，请重新选择");
                } else if (numUp < 5) {
                    fileList = validateUp(fileList);
                    for (var i = 0; i < fileList.length; i++) {
                        var imgUrl = window.URL.createObjectURL(fileList[i]);
                        imgArr.push(imgUrl);
                        var $section = $("<section class='up-section fl loading'>");
                        imgContainer.prepend($section);
                        var $span = $("<span class='up-span'>");
                        $span.appendTo($section);
                        var $img0 = $("<img class='close-upimg'>").on("click", function(event) {
                            event.preventDefault();
                            event.stopPropagation();
                            // $(".works-mask").show();
                            delParent = $(this).parent();
                            var numUp = delParent.siblings().length;
                            if (numUp < 6) {
                                delParent.parent().find(".z_file").show();
                            }
                            delParent.remove();
                        });
                        $img0.attr("src", "img/a7.png").appendTo($section);
                        var $img = $("<img class='up-img up-opcity'>");
                        $img.attr("src", imgArr[i]);
                        $img.appendTo($section);
                        var $p = $("<p class='img-name-p'>");
                        $p.html(fileList[i].name).appendTo($section);
                        var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
                        $input.appendTo($section);
                        var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
                        $input2.appendTo($section);
                    }
                }
                setTimeout(function() {
                    $(".up-section").removeClass("loading");
                    $(".up-img").removeClass("up-opcity");
                }, 450);
                numUp = imgContainer.find(".up-section").length;
                if (numUp >= 5) {
                    $(this).parent().hide();
                }
                $(this).val("");
            });

            function validateUp(files) {
                var arrFiles = [];
                for (var i = 0, file; file = files[i]; i++) {
                    var newStr = file.name.split("").reverse().join("");
                    if (newStr.split(".")[0] != null) {
                        var type = newStr.split(".")[0].split("").reverse().join("");
                        console.log(type + "===type===");
                        if (jQuery.inArray(type, defaults.fileType) > -1) {
                            if (file.size >= defaults.fileSize) {
                                alert(file.size);
                                alert('您这个"' + file.name + '"文件大小过大');
                            } else {
                                arrFiles.push(file);
                            }
                        } else {
                            alert('您这个"' + file.name + '"上传类型不符合');
                        }
                    } else {
                        alert('您这个"' + file.name + '"没有类型, 无法识别');
                    }
                }
                return arrFiles;
            }
        });

        // 富文本编辑器配置
        CKEDITOR.replace('content',{
            toolbar:[
                ['Undo','Redo','-','Find','-','SelectAll','RemoveFormat'],
                ['FontSize'],['Bold', 'Italic'],['TextColor','BGColor'],
                ['NumberedList','BulletedList'],
                ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
                ['Link','Unlink'],
                ['Table','HorizontalRule','Smiley','-','Maximize']
            ],
            height: 250,
            removePlugins: 'elementspath' // 移除编辑器底部状态栏显示的元素路径和调整编辑器大小的按钮 elementspath,resize
        });

    }]);
