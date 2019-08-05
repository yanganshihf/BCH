var viewer;
var count = 0;
var intmoveLeft;
var intmoveRight;
$(document).ready(function() {
	
	$("#panorama").height($(window).height());
	$("#panorama").width($(window).width());
	$("#panorama").append('<div id="backInfo">'+
							 	'<div id="back"><i class="layui-icon layui-icon-left">返回</i></div>'+
							 	'<div id="Info"></div>'+
						   '</div>'+
						   '<div id="album">'+
						   	 	'<div class="panDiv" id="panDiv">'+
						   	 		'<ul class="panUl" id="panUl" ></ul>'+
						   	 	'</div>'+
						   	'</div>'+
						   	'<div id="controls">'+
						   		' <div class="ctrl" id="zoom-in">&plus;</div>'+
						   		'<div class="ctrl" id="zoom-out">&minus;</div>'+
						   		'<div class="ctrl" id="fullscreen">&#x2922;</div>'+
						   		'<input value="1" id="VrFlag" style="display:none;" />'+
						   	'</div>'+
						   	'<div id="hide"><i class="layui-icon layui-icon-prev"></i></div>'+
						   	'<div id="lastP"><i class="layui-icon layui-icon-prev"></i></div>'+
        					'<div id="nextP"><i class="layui-icon layui-icon-next"></i></div>');
	
	
	
	
	$("#panDiv").width($("#panorama").width()-60);
	
	 
	
	
	$("#zoom-in").click(function(){	
	    viewer.setHfov(viewer.getHfov() - 10);
	});
	$("#zoom-out").click(function(){
	    viewer.setHfov(viewer.getHfov() + 10);
	});
	$("#fullscreen").click(function(){
		viewer.toggleFullscreen();
	});
	$("#back").click(function(){
		backPan();
	});
	
	$("#hide").click(function(){
		var flag = $("#VrFlag").val();
		if(flag == "1"){
			$("#hide").css("transform","rotate(-90deg)");
			$("#VrFlag").val("0");
		}else{
			$("#hide").css("transform","rotate(90deg)");
			$("#VrFlag").val("1");
		}
		
		$("#album").fadeToggle("slow");
		$("#lastP").toggle();
		$("#nextP").toggle();
	});
	// 判断浏览器种类
	function exitFullscreen() {
	 if(document.exitFullscreen) {
	  document.exitFullscreen();
	 } else if(document.mozCancelFullScreen) {
	  document.mozCancelFullScreen();
	 } else if(document.webkitExitFullscreen) {
	  document.webkitExitFullscreen();
	 }
	}
	// 退出全屏模式!
	
	function backPan(){
		var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
		if(fullscreenEnabled){
			exitFullscreen();
		}
		$("#panorama").css("display","none");
		$("#panUl").empty();
		$("#Info").html("");
	}
	var firefox = navigator.userAgent.indexOf('Firefox') != -1; 
	  
	  function MouseWheel(e){
	    e=e||window.event;
	    if(e.stopPropagation){
	      e.stopPropagation();
	    }else{
	      e.cancelBubble=true;
	    }
	    
	    if(e.preventDefault){
	      e.preventDefault();
	    }else{
	      e.returnValue=false;
	    }
	    
	    // document.title=(e.wheelDelta+'|'+e.detail);
	    if(firefox){
	      if(e.detail<0){
	        $('#panDiv').scrollLeft($('#panDiv').scrollLeft()+60);
	        $("#lastP").css("color","#fff");
	      }else{
	        $('#panDiv').scrollLeft($('#panDiv').scrollLeft()-60);
	        $("#nextP").css("color","#fff");
	      }         
	    }else{
	      if(e.wheelDelta>0){
	        $('#panDiv').scrollLeft($('#panDiv').scrollLeft()+60);
	        $("#lastP").css("color","#fff");
	      }else{
	        $('#panDiv').scrollLeft($('#panDiv').scrollLeft()-60);
	        $("#nextP").css("color","#fff");
	      }
	    }
	    var a = $("#panDiv").width();
		var c = 152 +162 * count;
		var b = $("#panDiv").scrollLeft();
		if(a + b >= c){
			$("#nextP").css("color","#5c544a");
		}
		if(b == 0){
			$("#lastP").css("color","#5c544a");
		}
		
	  }
	  var abc=document.getElementById('panDiv');
	 firefox?abc.addEventListener('DOMMouseScroll',MouseWheel,false):(abc.onmousewheel=MouseWheel);
	 
	 $("#nextP").mouseenter(function(){
		intmoveLeft = setInterval(function(){
			var a = $("#panDiv").width();
			var c = 152 +162 * count;
			var b = $("#panDiv").scrollLeft();
			if(a + b >= c){
				clearInterval(intmoveLeft);
				$("#nextP").css("color","#5c544a");
			}else{
				$('#panDiv').scrollLeft($('#panDiv').scrollLeft()+10);
				$("#nextP").css("color","#fff");
				$("#lastP").css("color","#fff");	
			}
		},100);
	});
	 $("#nextP").mouseleave(function(){
		 clearInterval(intmoveLeft);
		 var a = $("#panDiv").width();
		 var c = 152 +162 * count;
		 var b = $("#panDiv").scrollLeft();
		if(a + b >= c){
			$("#nextP").css("color","#5c544a");
		}else{
			$("#nextP").css("color","#fff");
		}
	 }); 
	
	 $("#lastP").mouseenter(function(){
		 intmoveRight = setInterval(function(){
				var b = $("#panDiv").scrollLeft();
				if(b == 0){
					clearInterval(intmoveLeft);
					$("#lastP").css("color","#5c544a");
				}else{
					$('#panDiv').scrollLeft($('#panDiv').scrollLeft()-10);
					$("#nextP").css("color","#fff");
				}
			},100);
		});
		$("#lastP").mouseleave(function(){
			 clearInterval(intmoveRight);
			 var b = $("#panDiv").scrollLeft();
			if(b == 0){
				$("#lastP").css("color","#5c544a");
			}else{
				$("#lastP").css("color","#fff");	
			}
		}); 

 });

function pashowVR(id){
	$("#panorama").css("display","");
	$.ajax({
		url : '/ResourceMonitor/OperationLog/queryphoto',
		type : 'POST',
		data : {
			id : id
		},
		success : function(resp) {
			count = resp.rows.length - 1;
			$("#Info").html(resp.rows[0].photoGroup);
			var url = "/ResourceMonitor/IdentifyPhoto/" + resp.rows[0].photo;
			viewer = pannellum.viewer('panorama',{
			    "panorama": url,
			    "autoLoad": true,
			    "showControls": false,
			});
			$(".pnlm-about-msg").remove();
			$(".pnlm-load-box p").html("加载中");
			$(".pnlm-load-box pnlm-lmsg").html("");
			for(i=0;i<resp.rows.length;i++){
				var src = "/ResourceMonitor/IdentifyPhoto/small/" + resp.rows[i].photo;
				var title = resp.rows[i].title;
				$("#panUl").append('<li><div class="photo-item"  id= "'+i+'"><img src='+ src +' /><div class="photo-desc"><i class=""></i> <span title='+title+'>'+title+'</span></div></div></li>')
				if(i == 0){
					$("#panUl li").css("margin-left","0");
					$("#panUl li").append('<div class="select"></div>');
				}
			}
			
			
			$(".photo-item").click(function(){
				$("#panUl li .select").remove();
				$(this).after('<div class="select"></div>');
				
				var i = $(this).attr('id');
				var url = "/ResourceMonitor/IdentifyPhoto/" + resp.rows[i].photo;
				viewer = pannellum.viewer('panorama',{
				    "panorama": url,
				    "autoLoad": true,
				    "showControls": false
				});
				$(".pnlm-about-msg").remove();
				$(".pnlm-load-box p").html("加载中");
				$(".pnlm-load-box pnlm-lmsg").html("");;
			});
			
		}
	});
}
$(window).resize(function() {
	$("#panorama").height($(window).height());
	$("#panorama").width($(window).width());
	$("#panDiv").width($("#panorama").width()-60);
});