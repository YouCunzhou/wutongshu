/**
 * Created by Administrator on 2017/7/14.
 */
$(function () {
    'use strict';
    (function () {
        var lis=$('.slider li');
        var first=lis.first().clone(true);
        var last=lis.last().clone(true);
        var slider=$('.slider');
        var indicator=$('.indicator');
        var indicatorlis=indicator.find('li');
        /*插入首尾*/
        slider.append(first);
        slider.prepend(last);
        /*重新计算*/
        lis=$('.slider li');
        var startX=0;
        var endX=0;
        var distance=0;
        var index=1;
        var timer=null;
        var outTimer=null;
        var fixedWidth=0;
        var isNow=true;
        var layout=$('.banner')[0];
        /*初始化函数*/
        init();
        function init() {
            /*动态设置相对单位*/
            $('html').css('fontSize',100*($(document.body).width())/750);
            /*固定宽度设置*/
            fixedWidth=$('.banner').width();
            /*轮播元素宽度设置*/
            slider.width(lis.length*fixedWidth);
            /*初始位置*/
            slider.css('left',-fixedWidth*index);
            /*初始化轮播子元素宽度*/
            lis.each(function (index) {
                $(lis[index]).width(fixedWidth);
            });
            /*开启自动轮播*/
            setTimer();
        }
        layout.addEventListener('touchstart',function (e) {
            startX=e.targetTouches[0].clientX;
        });
        layout.addEventListener('touchmove',function () {
            clearInterval(timer);
            clearTimeout(outTimer);
        });
        layout.addEventListener('touchend',function (e) {
            endX=e.changedTouches[0].clientX;
            distance=endX-startX;
            if(distance!=0){  //有滑动
                if(isNow){      //节流阀
                    isNow=false;
                    if(distance>0){   //右滑
                        index--;
                        Anima();
                    }
                    if(distance<0){ //左滑
                        index++;
                        Anima();
                    }
                }
            }
        });
        /*监听屏幕的大小改变*/
        $(window).on('resize',function () {
            clearInterval(timer);
            clearTimeout(outTimer);
            fixedWidth=$(window).width();
            init();
        });
        /*自动轮播模块*/
        function setTimer() {
            timer= setInterval(function () {
                index++;
                slider.animate({'left':-index*fixedWidth},500,'ease-in-out',function () {
                    if(index==lis.length-1){
                        index=1;
                        slider.css('left',-index*fixedWidth);
                    }
                    if(index==0){
                        index=lis.length-2;
                        slider.css('left',-index*fixedWidth);
                    }
                    active();
                })
            },1000)
        }
        /*动画模块*/
        function Anima() {
            slider.animate({'left':-index*fixedWidth},500,'ease-in-out',function () {
                if(index==lis.length-1){
                    index=1;
                    slider.css('left',-index*fixedWidth);
                }
                if(index==0){
                    index=lis.length-2;
                    slider.css('left',-index*fixedWidth);
                }
                active();
                isNow=true;
                outTimer=setTimeout(setTimer,2000)
            },100)
        }
        /*指示模块*/
        function active() {
            indicatorlis.removeClass('active').eq(index-1).addClass('active');
        }
    })();
    (function(){
        var dropdownBtn=$('.dropdown-btn');
        var mask=$('#mask');
        var disMenu=$('.dis-menu');
        dropdownBtn[0].addEventListener('touchend',function (e) {
            e.stopPropagation();
            mask.css('display','block');
            disMenu.css('display','block');
        });

        document.addEventListener('touchend',function (e) {
            if(e.target.id == 'mask'){
                mask.css('display','none');
                disMenu.css('display','none');
            }
        })
    })();
    (function () {
        var select=$('.select li');
        var content=$('.container .content');
        for(var i=0;i<select.length;i++){
            select[i].addEventListener('touchend',function () {
                $(this)
                    .addClass('active')
                    .siblings()
                    .removeClass('active');
                content
                    .eq($(this).index())
                    .css('display','block')
                    .siblings()
                    .css('display','none');
            })
        }
    })()
});

