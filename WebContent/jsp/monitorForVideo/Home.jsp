<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>森林资源管护远程监控</title>
<link rel="shortcut icon" href="/ResourceMonitor/images/RTS.ico" />
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/viewer-0.5.1/viewer.min.css" />
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/js/layer/layui/css/layui.css" />
<script
	src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
<script
	src="${pageContext.request.contextPath}/js/layer/layui/layui.js"
	type="text/javascript"></script>
<script
	src="${pageContext.request.contextPath}/js/viewer-0.5.1/viewer.min.js"
	type="text/javascript"></script>
<style>
.headmenu {
	margin-top: 18px;
	cursor: pointer;
	font-weight: bold;
	color: white;
}

.layui-layer-title {
	font-size: 15px;
	font-weight: 700;
}

.top_menu_div {
	height: 28px;
	line-height: 28px;
	width: 10%;
	float: left;
	border-right: 1px solid #e6e6e6;
	margin-top: 3px;
	text-align: center;
	cursor: pointer;
}

img {
	margin-right: 5px;
	margin-bottom: 3px;
}


#body .layui-layer-btn .layui-layer-btn0{border-color:#058563;background-color:#058563;color:#fff}
#body a:hover, #body a:focus{
	text-decoration: none;
}
.layui-nav-child dd {
    margin-bottom: 5px;
}
.layui-nav-bar{
		display:none;
	}
.layui-nav .layui-nav-child dd.layui-this a, .layui-nav-child dd.layui-this{
	background-color: #fff;
    color: #333;
}
#header img{
	height:16px;
	width:16px;
	margin-right:3px;
	border-radius:0;
}
.layui-nav .layui-nav-child a {
   line-height:36px;
}
</style>
</head>
<body id="body" style="min-width: 1050px; min-height: 500px;" class="layui-layout-body">
	<div class="layui-layout layui-layout-admin">
		<div id="header" class="layui-header" style="height: 60px; background-color: #058563; background-image:url(/ResourceMonitor/images/login/videologo.png);background-repeat: no-repeat; border:solid #058563 2px;">
			<ul class="layui-nav layui-layout-right" style="font-weight:bold;">
				 <li class="layui-nav-item" id="menu1" style="margin-right: 20px;cursor:pointer;"><img class="layui-nav-img" src="/ResourceMonitor/images/menuIcon/user.png"></li>
				 <li class="layui-nav-item" id="realtimeEvent" onclick="showRealtimeEvent()" style="cursor:pointer;"><img  class="layui-nav-img" src="/ResourceMonitor/images/menuIcon/event.png">实时警报</li>
				 <li class="layui-nav-item" style="margin-right: 20px;">
		    		<a style="color:#FFF;" href="javascript:;"><img class="layui-nav-img" src="/ResourceMonitor/images/menuIcon/systemSwitch.png">系统切换<span class="layui-nav-more"></span></a>
		   		    <dl class="layui-nav-child" id="systemSwitch"> 
		      			<dd><a href="javascript:;" id="goHuLin" onclick="goHuLin()">护林员巡检管理系统</a></dd>
		      			<!-- <dd><a href="javascript:;" id="goWuRenJi" onclick="goWuRenJi()">无人机巡检管理系统</a></dd> -->
		      			<!-- <dd><a href="javascript:;" id="goShiPin" onclick="goShiPin()" style="color: rgb(230, 230, 230);">视频监管管理系统</a></dd> -->
		      			<dd><a href="javascript:;" id="goZongHeJianGuan" onclick="goZongHeJianGuan()">有害生物检测与预警系统</a></dd>
		      			<dd><a href="javascript:;" id="goYunXingWeiHu" onclick="goYunXingWeiHu()">运行维护管理系统</a></dd>
		      			<dd><a href="javascript:;" onclick="GoBack()">返回首页</a></dd>
		    		</dl>
		  		</li>
		  		<li class="layui-nav-item" id="" onclick="SystemOut()" style="cursor:pointer;"><img class="layui-nav-img" src="/ResourceMonitor/images/menuIcon/quit.png">退出</li>
			</ul>
		</div>
	</div>
	<div id="musicPlay" style="position:absolute;z-index:-1;"></div>
	<div id="menuslist" style="width: 100%; height: 35px;border-bottom: 2px solid rgb(221, 221, 221);">
	</div> 
	<div id="main">
		<iframe name="mapFrame" id="mapFrame"
		src="${pageContext.request.contextPath}/jsp/monitorForVideo/BaseStationMap/BaseStationMap.jsp"
		style="height: 100%; width: 100%;border:0"></iframe>
	</div>
</body>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/myJS/monitorForVideo/map/map_style.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/myJS/monitorForVideo/map/map_event.js"></script>
<script type="text/javascript">
var layer;
layui.use('layer', function(){
    layer = layui.layer;
});
layui.use('element', function(){
	  var element = layui.element;
});
	function showRealtimeEvent() {
		var imgSrc = $("#sssj_img").attr("src");
		if (imgSrc.indexOf(".png") == -1) {
			 layui.use('layer', function(){
			        layer = layui.layer;
			        layer.open({
						type : 2,
						shade : 0,
						area : [ '560px', '300px' ],
						title : '实时警报',
						id : 'sssj',
						content : '/ResourceMonitor/jsp/patrolForRanger/map/layers/realtimeEvents.jsp', // 这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
						offset : 'rb',
						maxmin : true,
						success: function(layero, index){
							 var minBtn = layero.find(".layui-layer-min");
							 var maxBtn = layero.find(".layui-layer-ico.layui-layer-max");
							 $(maxBtn).hide();
							 $(maxBtn).on("click",function(){
						        	$(maxBtn).hide(); 	
						     });
							 $(minBtn).on("click",function(){
								 	$(maxBtn).show();
								 	layero.css({
										  left: 'auto'
										  ,right: 0
										  ,bottom: 0
									});
						     });
						}
					});
			  });
		}
	}
</script>
<script type="text/javascript" src="/ResourceMonitor/js/myJS/systemSwitch.js"></script>
</html>