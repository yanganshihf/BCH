$(function(){
    // nav收缩展开
    $('.nav-item>a').on('click',function(){
        if (!$('#nav').hasClass('nav-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
            }else{
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.nav-item.nav-show').removeClass('nav-show');
            }
        }
    });
    //nav-mini切换
    $('#mini').on('click',function(){
    	
    	var awidth = $(window).width();
    	var aheight = $(window).height();
        if (!$('#nav').hasClass('nav-mini')) {
        	setLayerStyle2(100);
        	$('#nav').css('overflow-y','');
        	$("#nav img").css({"transform":"rotate(0deg)","transition-duration":"0.5s"});
            $('.nav-item.nav-show').removeClass('nav-show');
            $('.nav-item').children('ul').removeAttr('style');
            $('#nav').addClass('nav-mini');
            $('#drawResourceQueryLi').css('left','75px');
            $('#topSearchDiv').css('left','75px');
            $('#topSearchDivButton').css('left','75px');
            $("[id^='panel']").css('left','75px');
            $('#intelQueryDiv').css('left','75px');
            $('#PositionInfo').css('left','60px');
            $('#drawResourceQuery').css('left','75px');
            $('#time_slider_div').css('left','75px');
            
          //重新给指定层设定width、top等
            
            $('#resourceQueryResultDiv').css('width',(awidth-60)+'px');
        }else{
        	setLayerStyle2(-100);
        	$('#nav').css('overflow-y','auto');
        	$("#nav img").css({"transform":"rotate(180deg)","transition-duration":"0.5s"});
            $('#nav').removeClass('nav-mini');
            $('#drawResourceQueryLi').css('left','175px');
            $('#topSearchDiv').css('left','175px');
            $('#topSearchDivButton').css('left','175px');
            $("[id^='panel']").css('left','175px');
            $('#intelQueryDiv').css('left','175px');
            $('#PositionInfo').css('left','160px');
            $('#drawResourceQuery').css('left','175px');
            $('#time_slider_div').css('left','175px');
            
            
            $('#resourceQueryResultDiv').css('width',(awidth-160)+'px');
        }
    });
});