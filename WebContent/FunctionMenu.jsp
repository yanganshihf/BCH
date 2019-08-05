<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<META http-equiv=Content-Language content=zh-cn>
<META http-equiv=Content-Type content="text/html; utf-8">
<META content="MSHTML 6.00.2800.1611" name=GENERATOR>
<title>功能菜单</title>
<link rel="shortcut icon" href="/ResourceMonitor/images/RTS.ico" />

<link rel="stylesheet" type="text/css"
   href="${pageContext.request.contextPath}/js/bootstrap-3.3.5-dist/css/bootstrap.css" />

<style type='text/css'>
.FuncMenus{
	height:20%;
	position: relative;
	cursor: not-allowed;
	/* border:1px #ddd solid; */
}

</style>

</head>
<body style="width: 100%; height: 100%; min-height: 650px; overflow: hidden; margin: 0; padding: 0;min-width: 1270px;">
	<div style="width: 100%; height: 100%; text-align: center; background-image: url(/ResourceMonitor/images/login/bg.png); background-repeat: no-repeat; background-attachment: scroll; background-position: center center; background-size: 100% 100%;">
		<div id="loginOut" style="height: 26px;width:13%;line-height:26px;font-size: 15px;cursor:pointer;color:#fff;float:right;" onclick="SystemOut()">退出系统</div>
		<div style="width: 60%; height: 100%; min-height: 360px; position: relative; margin: 0px auto">
			<div class="FuncMenus" id="patrolForRanger" style="width:32%;top:42%;float:left;"><img src="/ResourceMonitor/images/login/xunhu1.png" style="width: 100%; height: 100%;"  alt=""></div> <!-- patrolForRanger 护林员巡检 -->
			<!-- <div class="FuncMenus" id="patrolForUAV" style="width:49%;right:0;top:32%;float:right;"><img src="/ResourceMonitor/images/login/wurenji1.png" style="width: 100%; height: 100%;"  alt=""></div>  --><!-- patrolForUAV 无人机巡检 -->
			<!-- <div class="FuncMenus" id="monitoringForVideo" style="width:32%;left:2px;top:36%;float:left;"><img src="/ResourceMonitor/images/login/shipin1.png" style="width: 100%; height: 100%;"  alt=""></div> --><!-- monitoringForVideo 视频监控 -->
			<div class="FuncMenus" id="commandForFire" style="width:32%;margin-left:15px;top:42%;float:left;"><img  src="/ResourceMonitor/images/login/zonghe1.png" style="width: 100%; height: 100%;" alt=""></div><!-- commandForFire 火灾应急指挥平台  -->
			<div class="FuncMenus" id="maintenanceSystem" style="width:32%;margin-left:15px;top:42%;float:left;"><img src="/ResourceMonitor/images/login/yunwei1.png" style="width: 100%; height: 100%;" alt=""></div> <!-- maintenanceSystem 维护系统 -->
		</div>
	</div>
</body>
<script type="text/javascript"
	src="js/jquery-ui-1.9.2/js/jquery-1.8.3.js"></script>
<script type='text/javascript'>
/* window.location.href = "/ResourceMonitor/jsp/patrolForRanger/map/map.jsp"; */

$(function() {
	var menus = '${cookie_menu}';  
	
  	$.ajax({
  	    url:"/ResourceMonitor/datalib/department",    //请求的url地址
  	    dataType:"json",   //返回格式为json
  	    async:true,//请求是否异步，默认为异步，这也是ajax重要特性
  	   //  data:{"id":"value"},    //参数值
  	    type:"POST",
  	    success:function(req){
  	        //请求成功时处理
  	        localStorage.setItem('cookie_department',req.msg);
  	    }
  	});
  	
    var cookie_id = '${cookie_id}';
    var cookie_logingUser = '${cookie_logingUser}';
    var cookie_mobile = '${cookie_mobile}';
    var cookie_userDepartmentVal = '${cookie_userDepartmentVal}';
    localStorage.setItem('cookie_menu',menus);
    //localStorage.setItem('cookie_department',cookie_department);
    localStorage.setItem('cookie_id',cookie_id);
    localStorage.setItem('cookie_logingUser',cookie_logingUser);
    localStorage.setItem('cookie_mobile',cookie_mobile);
    localStorage.setItem('cookie_userDepartmentVal',cookie_userDepartmentVal);
	if (menus.indexOf("实时监控") > -1) {
		$("#patrolForRanger").css("cursor","pointer");
		$("#patrolForRanger img").attr("src","/ResourceMonitor/images/login/xunhu.png");
		$("#patrolForRanger").on('click', function() {
			window.location.href = "/ResourceMonitor/jsp/patrolForRanger/map/map.jsp";
		});
	}
	if (menus.indexOf("实时监控") > -1) {
		$("#patrolForUAV").css("cursor","pointer");
		$("#patrolForUAV img").attr("src","/ResourceMonitor/images/login/wurenji.png");
		$("#patrolForUAV").on('click', function() {
			window.location.href = "/ResourceMonitor/jsp/videoManager/map.jsp";
		});
	}
	if (menus.indexOf("实时监控") > -1) {
		$("#monitoringForVideo").css("cursor","pointer");
		$("#monitoringForVideo img").attr("src","/ResourceMonitor/images/login/shipin.png");
		$("#monitoringForVideo").on('click', function() {
			 window.location.href = "/ResourceMonitor/jsp/monitorForVideo/Home.jsp";
		});
	}
	
    if (menus.indexOf("实时监控") > -1) {
		$("#commandForFire").css("cursor","pointer");
		$("#commandForFire img").attr("src","/ResourceMonitor/images/login/zonghe.png");
		$("#commandForFire").on('click', function() {
			window.location.href = "/ResourceMonitor/jsp/commandForFire/Home.jsp";
		});
	}
	
	if (menus.indexOf("用户管理") > -1) {
		$("#maintenanceSystem").css("cursor","pointer");
		$("#maintenanceSystem img").attr("src","/ResourceMonitor/images/login/yunwei.png");
		$("#maintenanceSystem").on('click', function() {
			window.location.href = "/ResourceMonitor/jsp/system/systemHome.jsp";
		});
	}
	
	
	
});
 
function SystemOut() {
	localStorage.clear();
	window.location.href = "/ResourceMonitor/login.jsp";
/* 	var curWwwPath = window.document.location.href;
	var pathname = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathname);
	localhostPath = curWwwPath.substring(0, pos);
	// 获取项目名
	projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);

	$.post(localhostPath + projectName + '/user/logout.action', function(
			respText) {
		respText = $.parseJSON(respText);
		if (respText.msg == "success") {
			// 跳转
			window.location.href = "/ResourceMonitor/login.jsp";
		}
	}); */
} 

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1)
				c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}
</script>
</html>
